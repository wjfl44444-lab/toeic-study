import {
  STORAGE_KEY,
  STORAGE_VERSION,
  WORD_STATUSES,
  answerIsCorrect,
  buildQuizOptions,
  computeDashboardStats,
  createInitialState,
  createId,
  csvToWordRecords,
  getAnswerLabel,
  getPrompt,
  insertRetry,
  isoDateKey,
  mergeWordCollections,
  normalizeText,
  normalizeAnswer,
  normalizeWordRecord,
  parseBulkLines,
  quizPartKey,
  selectWeightedWords,
  statusLabel,
  upgradeState,
  uniqueStrings,
  wordsToCsv,
  wordIdentity
} from "./core.js?v=20261031-features1";
import { readStoredState, writeStoredState } from "./storage.js?v=20261031-features1";

import { progressScopeKey, eligibleStudyWords, selectNextBatch, markStudyWord, mergeBookmarks, mergeStudyProgress } from "./progress.js?v=20261031-features1";

const VIEW_NAMES = {
  home: "홈",
  wordbook: "단어 목록",
  study: "암기 카드",
  quiz: "퀴즈",
  mistakes: "복습"
};

const viewRoot = document.querySelector("#view-root");
const wordDialog = document.querySelector("#word-dialog");
const bulkDialog = document.querySelector("#bulk-dialog");
const wordForm = document.querySelector("#word-form");
const bulkForm = document.querySelector("#bulk-form");
const importFile = document.querySelector("#import-file");
const toastNode = document.querySelector("#toast");

// Defer browser storage access so restricted/private contexts cannot crash startup.
const browserStorage = {
  getItem: (key) => window.localStorage.getItem(key),
  setItem: (key, value) => window.localStorage.setItem(key, value)
};
const loaded = readStoredState(browserStorage);
let storageNotice = loaded.notice;
let storageNoticeTone = loaded.error ? "error" : "success";
let storageBlocked = loaded.blocked;
let state = loaded.state;
let currentView = validView(location.hash.slice(1)) ? location.hash.slice(1) : "home";
let toastTimer;
let studySession = validSavedStudy(state.activeStudy) ? state.activeStudy : null;
let quizSession = validSavedQuiz(state.activeQuiz) ? state.activeQuiz : null;
let studyDefaults = studySettings(studySession);
let quizDefaults = quizSettings(quizSession);
let homeMode = studySession && !studySession.completed && !(quizSession && !quizSession.completed) ? "flashcard" : quizDefaults.mode;
let wordFilters = { search: "", status: "all", tag: "all", mistakes: "all", sort: "alpha", page: 1 };
let mistakeFilter = "all";
let reviewKind = "wrong";
let reviewMinWrong = 1;
let reviewCount = 20;
let reviewMode = "multiple";
const payloadChecks = new Map();
let studySync = null;
let payloadRevision = 0;
// An open card/question keeps its original wording even if another device edits
// or deletes the shared word. These display-only snapshots are never uploaded.
const sessionWordSnapshots = new WeakMap();

const syncSeedWords = createInitialState("2000-01-01T00:00:00.000Z").words;
const syncSeedContent = wordCollectionContent(syncSeedWords);

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isCount(value) {
  return Number.isInteger(value) && value >= 0;
}

function isTimestamp(value) {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function stringList(value, nonempty = false) {
  return Array.isArray(value) && (!nonempty || value.length > 0)
    && value.every((item) => typeof item === "string" && (!nonempty || item.trim().length > 0));
}

// Cloud data must be a complete, readable backup. The normalizer is intentionally
// permissive for imports, so check the original shape before it can drop fields.
function decodeStudyPayload(raw) {
  if (typeof raw !== "string" || !raw) throw new Error("단어장 동기화 데이터가 비어 있습니다.");
  const parsed = JSON.parse(raw);
  if (!isRecord(parsed) || !Number.isInteger(parsed.version) || parsed.version < 1
    || parsed.version > STORAGE_VERSION || !Array.isArray(parsed.words)
    || !Array.isArray(parsed.sessions) || !isTimestamp(parsed.updatedAt)) {
    throw new Error("단어장 동기화 데이터 형식이 올바르지 않습니다.");
  }
  for (const word of parsed.words) {
    if (!isRecord(word) || typeof word.id !== "string" || !word.id.trim()
      || typeof word.word !== "string" || !word.word.trim()
      || !stringList(word.meanings, true)
      || !WORD_STATUSES.includes(word.status)
      || !isCount(word.correctCount) || !isCount(word.wrongCount)
      || !stringList(word.tags) || (word.aliases !== undefined && !stringList(word.aliases))
      || ["partOfSpeech", "example", "translation", "memo"].some((key) => word[key] !== undefined && typeof word[key] !== "string")
      || ["lastStudiedAt", "lastWrongAt"].some((key) => word[key] !== null && word[key] !== undefined && !isTimestamp(word[key]))
      || !isTimestamp(word.createdAt)) {
      throw new Error("단어장 동기화 데이터에 읽을 수 없는 단어가 있습니다.");
    }
  }
  for (const session of parsed.sessions) {
    if (!isRecord(session) || !["flashcard", "multiple", "typing"].includes(session.mode)
      || !["word-to-meaning", "meaning-to-word"].includes(session.direction)
      || ["total", "correct", "wrong"].some((key) => !isCount(session[key]))
      || (session.retryCount !== undefined && !isCount(session.retryCount))
      || !stringList(session.wrongWordIds) || !isTimestamp(session.finishedAt)) {
      throw new Error("단어장 동기화 데이터에 읽을 수 없는 학습 기록이 있습니다.");
    }
  }
  for (const key of ["activeStudy", "activeQuiz"]) {
    if (parsed[key] !== undefined && parsed[key] !== null && !isRecord(parsed[key])) {
      throw new Error("진행 중인 학습 데이터 형식이 올바르지 않습니다.");
    }
  }
  if (parsed.version >= 4 && ((parsed.activeStudy && !validSavedStudy(parsed.activeStudy, false))
    || (parsed.activeQuiz && !validSavedQuiz(parsed.activeQuiz, false)))) {
    throw new Error("진행 중인 학습 데이터를 읽을 수 없습니다.");
  }
  const upgraded = upgradeState(parsed);
  if (!upgraded) throw new Error("단어장 동기화 데이터를 읽을 수 없습니다.");
  return upgraded.state;
}

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (isRecord(value)) return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}

function wordCollectionContent(words) {
  return canonicalJson(words.map(({ id, createdAt, ...word }) => word)
    .sort((first, second) => wordIdentity(first.word).localeCompare(wordIdentity(second.word), "en")));
}

function checkedPayloadSemantic(raw) {
  if (payloadChecks.has(raw)) return payloadChecks.get(raw);
  const { updatedAt, ...next } = decodeStudyPayload(raw);
  const value = canonicalJson(next);
  payloadChecks.set(raw, value);
  if (payloadChecks.size > 2) payloadChecks.delete(payloadChecks.keys().next().value);
  return value;
}

function validateStudyPayload(raw) {
  try { checkedPayloadSemantic(raw); return true; }
  catch { return false; }
}

function rememberSessionWords(session, words = state.words) {
  if (!session) return;
  let snapshots = sessionWordSnapshots.get(session);
  if (!snapshots) {
    snapshots = new Map();
    sessionWordSnapshots.set(session, snapshots);
  }
  const ids = new Set(session.wordIds || session.queue?.map((question) => question.wordId) || []);
  for (const word of words) {
    if (ids.has(word.id) && !snapshots.has(word.id)) {
      snapshots.set(word.id, JSON.parse(JSON.stringify(word)));
    }
  }
}

function sessionWord(session, wordId) {
  rememberSessionWords(session);
  return sessionWordSnapshots.get(session)?.get(wordId) || state.words.find((word) => word.id === wordId);
}

function applyStudyPayload(raw, { reason = "initial" } = {}) {
  const next = decodeStudyPayload(raw);
  payloadRevision += 1;
  if (reason === "background") {
    // Refresh shared learning records without touching the active work surface:
    // DOM, focus, filters, editor text, selected answer and session identities.
    rememberSessionWords(studySession);
    rememberSessionWords(quizSession);
    state = { ...next, activeStudy: studySession, activeQuiz: quizSession };
    return;
  }
  state = next;
  studySession = validSavedStudy(next.activeStudy) ? next.activeStudy : null;
  quizSession = validSavedQuiz(next.activeQuiz) ? next.activeQuiz : null;
  state.activeStudy = studySession;
  state.activeQuiz = quizSession;
  // Close editors tied to the previous account before showing another payload.
  if (wordDialog.open) wordDialog.close();
  if (bulkDialog.open) bulkDialog.close();
  wordForm.reset();
  wordForm.dataset.editId = "";
  bulkForm.reset();
  importFile.value = "";
  wordFilters = { search: "", status: "all", tag: "all", mistakes: "all", sort: "alpha", page: 1 };
  mistakeFilter = "all";
  reviewKind = "wrong";
  reviewMinWrong = 1;
  studyDefaults = studySettings(studySession);
  quizDefaults = quizSettings(quizSession);
  render(false);
}

function mergeStudyPayload(baseRaw, localRaw, remoteRaw) {
  let local = decodeStudyPayload(localRaw);
  let remote = decodeStudyPayload(remoteRaw);
  let base = baseRaw ? decodeStudyPayload(baseRaw) : null;
  // Devices can add the same word independently with different ids. Align ALL
  // three snapshots before calculating deletion or deltas, not just the final
  // word list: base/cloud id B and local id A refer to one learning counter.
  // Matching by id as well as spelling keeps ordinary word renames connected.
  const parents = new Map();
  const logicalRoot = (id) => {
    if (!parents.has(id)) parents.set(id, id);
    let root = id;
    while (parents.get(root) !== root) root = parents.get(root);
    while (parents.get(id) !== id) {
      const next = parents.get(id);
      parents.set(id, root);
      id = next;
    }
    return root;
  };
  const spellings = new Map();
  const allWords = [...local.words, ...(base?.words || []), ...remote.words];
  for (const word of allWords) {
    const key = wordIdentity(word.word);
    const root = logicalRoot(word.id);
    if (spellings.has(key)) parents.set(root, logicalRoot(spellings.get(key)));
    else spellings.set(key, word.id);
  }
  const canonicalIds = new Map();
  // Local ids come first so the already-open queue keeps the same references.
  for (const word of allWords) {
    const root = logicalRoot(word.id);
    if (!canonicalIds.has(root)) canonicalIds.set(root, word.id);
  }
  const idAliases = new Map(allWords.map((word) => [word.id, canonicalIds.get(logicalRoot(word.id))]));
  const alignId = (id) => idAliases.get(id) || id;
  const align = (payload) => {
    if (!payload) return null;
    const alignedWords = new Map();
    for (const word of payload.words) {
      const id = alignId(word.id);
      const prior = alignedWords.get(id);
      if (!prior) alignedWords.set(id, { ...word, id });
      else alignedWords.set(id, {
        ...word, ...prior, id,
        meanings: uniqueStrings([...prior.meanings, ...word.meanings]),
        tags: uniqueStrings([...prior.tags, ...word.tags]),
        aliases: uniqueStrings([...(prior.aliases || []), ...(word.aliases || [])]),
        correctCount: prior.correctCount + word.correctCount,
        wrongCount: prior.wrongCount + word.wrongCount,
      });
    }
    return {
      ...payload, words: [...alignedWords.values()],
      sessions: payload.sessions.map((session) => ({ ...session, wrongWordIds: uniqueStrings(session.wrongWordIds.map(alignId)) })),
      activeStudy: payload.activeStudy ? { ...payload.activeStudy, wordIds: payload.activeStudy.wordIds.map(alignId) } : null,
      activeQuiz: payload.activeQuiz ? {
        ...payload.activeQuiz,
        queue: payload.activeQuiz.queue.map((question) => ({ ...question, wordId: alignId(question.wordId) })),
        scheduledWordIds: uniqueStrings(payload.activeQuiz.scheduledWordIds.map(alignId)),
        wrongWordIds: uniqueStrings(payload.activeQuiz.wrongWordIds.map(alignId)),
      } : null,
    };
  };
  local = align(local);
  base = align(base);
  remote = align(remote);
  const equal = (a, b) => canonicalJson(a) === canonicalJson(b);
  const preferLocal = Date.parse(local.updatedAt) > Date.parse(remote.updatedAt)
    || (local.updatedAt === remote.updatedAt && canonicalJson(local.words) >= canonicalJson(remote.words));
  const field = (before, ours, theirs) => equal(ours, before) ? theirs
    : equal(theirs, before) || equal(ours, theirs) ? ours : preferLocal ? ours : theirs;
  const latest = (...values) => values.filter(isTimestamp)
    .sort((a, b) => Date.parse(b) - Date.parse(a) || b.localeCompare(a))[0] || null;
  const setField = (before = [], ours = [], theirs = []) => {
    const beforeKeys = new Set(before.map(normalizeText));
    const ourKeys = new Set(ours.map(normalizeText));
    const theirKeys = new Set(theirs.map(normalizeText));
    return uniqueStrings([...ours, ...theirs].filter((value) => !beforeKeys.has(normalizeText(value))
      || (ourKeys.has(normalizeText(value)) && theirKeys.has(normalizeText(value)))));
  };
  const byId = (words) => new Map(words.map((word) => [word.id, word]));
  const baseWords = byId(base?.words || []);
  const localWords = byId(local.words);
  const remoteWords = byId(remote.words);
  const mergedWords = [];
  for (const id of new Set([...localWords.keys(), ...remoteWords.keys()])) {
    const before = baseWords.get(id);
    const ours = localWords.get(id);
    const theirs = remoteWords.get(id);
    // Existing-word deletion wins over concurrent edits; an unrelated local
    // render must not recreate a word deliberately removed on another device.
    if (before && (!ours || !theirs)) continue;
    if (!ours || !theirs) {
      mergedWords.push(ours || theirs);
      continue;
    }
    const merged = { ...theirs, ...ours };
    for (const key of ["word", "partOfSpeech", "example", "translation", "memo", "status"]) {
      merged[key] = field(before?.[key], ours[key], theirs[key]);
    }
    for (const key of ["meanings", "tags", "aliases"]) {
      merged[key] = setField(before?.[key], ours[key], theirs[key]);
    }
    // Simultaneous replacement of the last meaning must still be readable.
    if (!merged.meanings.length) merged.meanings = (preferLocal ? ours : theirs).meanings;
    for (const key of ["correctCount", "wrongCount"]) {
      // A transaction retry must always use the SAME original base/local pair.
      // Unknown common history (legacy import) is conservatively non-additive.
      merged[key] = base ? Math.max(0, theirs[key] + ours[key] - (before?.[key] || 0))
        : Math.max(ours[key], theirs[key]);
    }
    merged.lastStudiedAt = latest(ours.lastStudiedAt, theirs.lastStudiedAt);
    merged.lastWrongAt = merged.wrongCount ? latest(ours.lastWrongAt, theirs.lastWrongAt) : null;
    merged.createdAt = [ours.createdAt, theirs.createdAt].sort((a, b) => Date.parse(a) - Date.parse(b) || a.localeCompare(b))[0];
    mergedWords.push(merged);
  }

  // Independently added copies of the same word are a single shared word.
  // Keep the local id so an open local queue is not rewritten by a background
  // update, and preserve both copies' meanings and learning counts.
  const identities = new Map();
  const words = [];
  for (const word of mergedWords) {
    const key = wordIdentity(word.word);
    if (!identities.has(key)) {
      identities.set(key, words.length);
      words.push(word);
      continue;
    }
    const index = identities.get(key);
    const prior = words[index];
    idAliases.set(word.id, prior.id);
    words[index] = {
      ...word, ...prior,
      meanings: uniqueStrings([...prior.meanings, ...word.meanings]),
      tags: uniqueStrings([...prior.tags, ...word.tags]),
      aliases: uniqueStrings([...(prior.aliases || []), ...(word.aliases || [])]),
      correctCount: base ? prior.correctCount + word.correctCount : Math.max(prior.correctCount, word.correctCount),
      wrongCount: base ? prior.wrongCount + word.wrongCount : Math.max(prior.wrongCount, word.wrongCount),
      lastStudiedAt: latest(prior.lastStudiedAt, word.lastStudiedAt),
      lastWrongAt: latest(prior.lastWrongAt, word.lastWrongAt),
    };
  }
  const sessionKey = (session) => typeof session.id === "string" && session.id
    ? session.id : canonicalJson(session);
  const baseSessions = new Set((base?.sessions || []).map(sessionKey));
  const ourSessions = new Map(local.sessions.map((session) => [sessionKey(session), session]));
  const theirSessions = new Map(remote.sessions.map((session) => [sessionKey(session), session]));
  const sessions = [];
  for (const key of new Set([...ourSessions.keys(), ...theirSessions.keys()])) {
    const ours = ourSessions.get(key);
    const theirs = theirSessions.get(key);
    if (baseSessions.has(key) && (!ours || !theirs)) continue;
    const session = !ours ? theirs : !theirs || equal(ours, theirs) ? ours
      : preferLocal ? ours : theirs;
    sessions.push({ ...session, wrongWordIds: uniqueStrings(session.wrongWordIds.map((id) => idAliases.get(id) || id)) });
  }
  sessions.sort((a, b) => Date.parse(a.finishedAt) - Date.parse(b.finishedAt)
    || sessionKey(a).localeCompare(sessionKey(b)));
  const merged = {
    ...local, version: STORAGE_VERSION, words, sessions: sessions.slice(-80),
    bookmarks: mergeBookmarks(local.bookmarks, remote.bookmarks, idAliases),
    studyProgress: mergeStudyProgress(base?.studyProgress, local.studyProgress, remote.studyProgress, idAliases),
    // Progress is device-local while the page is open; the full payload still
    // lets a freshly opened device resume the last cloud-saved session.
    activeStudy: local.activeStudy, activeQuiz: local.activeQuiz,
    updatedAt: latest(local.updatedAt, remote.updatedAt),
  };
  const raw = JSON.stringify(merged);
  if (!validateStudyPayload(raw)) throw new Error("합친 단어장 기록을 읽을 수 없습니다.");
  return raw;
}

function summarizeStudyPayload(raw) {
  const next = decodeStudyPayload(raw);
  const attempts = next.words.reduce((sum, word) => sum + word.correctCount + word.wrongCount, 0);
  return `단어 ${next.words.length}개 · 완료 학습 ${next.sessions.length}회 · 답변 ${attempts}회`;
}

function hasStudyData(raw) {
  const next = decodeStudyPayload(raw);
  return next.sessions.length > 0 || Boolean(next.activeStudy || next.activeQuiz)
    || wordCollectionContent(next.words) !== syncSeedContent;
}

function semanticStudyPayload(raw) {
  return checkedPayloadSemantic(raw);
}

async function connectVocabularySync() {
  try {
    const { connectStudySync } = await import("../shared/study-sync.js?v=20261002-sync3");
    studySync = connectStudySync({
      appId: "vocabulary",
      mount: document.querySelector(".app-shell"),
      legacyKey: STORAGE_KEY,
      getPayload: () => JSON.stringify({ ...state, activeStudy: studySession, activeQuiz: quizSession }),
      validatePayload: validateStudyPayload,
      applyPayload: applyStudyPayload,
      mergePayload: mergeStudyPayload,
      summarizePayload: summarizeStudyPayload,
      hasLocalData: hasStudyData,
      semanticPayload: semanticStudyPayload,
      canUploadPayload: () => !storageBlocked,
      createEmptyPayload: () => JSON.stringify(createInitialState())
    });
  } catch (error) {
    console.warn("단어장 계정 동기화를 시작하지 못했습니다.", error);
  }
}

function validView(view) {
  return Object.hasOwn(VIEW_NAMES, view);
}

function validSavedStudy(session, checkReferences = true) {
  return isRecord(session) && stringList(session.wordIds, true) && Number.isInteger(session.index)
    && session.index >= 0 && session.index < session.wordIds.length && isRecord(session.results)
    && ["known", "confused", "unknown"].every((key) => isCount(session.results[key]))
    && ["word-to-meaning", "meaning-to-word"].includes(session.direction)
    && ["revealed", "completed", "recorded"].every((key) => typeof session[key] === "boolean")
    && (!checkReferences || session.wordIds.every((id) => state.words.some((word) => word.id === id)));
}
function validSavedQuiz(session, checkReferences = true) {
  return isRecord(session) && Array.isArray(session.queue) && session.queue.length && Number.isInteger(session.index)
    && session.index >= 0 && session.index < session.queue.length && ["multiple", "typing"].includes(session.mode)
    && ["word-to-meaning", "meaning-to-word"].includes(session.direction)
    && ["originalTotal", "originalAnswered", "originalCorrect", "originalWrong", "retriesCompleted"].every((key) => isCount(session[key]))
    && ["completed", "recorded"].every((key) => typeof session[key] === "boolean")
    && stringList(session.scheduledWordIds) && stringList(session.wrongWordIds)
    && (session.feedback === null || (isRecord(session.feedback) && typeof session.feedback.correct === "boolean"
      && typeof session.feedback.retryScheduled === "boolean" && isCount(session.feedback.wrongCount)))
    && session.queue.every((question) => isRecord(question) && typeof question.wordId === "string"
      && (!checkReferences || state.words.some((word) => word.id === question.wordId))
      && typeof question.answered === "boolean" && typeof question.isRetry === "boolean"
      && (question.selected === null || typeof question.selected === "string")
      && (session.mode === "typing" || (stringList(question.options, true) && question.options.length === 4)));
}

function saveState() {
  if (storageBlocked) return false;
  state.version = STORAGE_VERSION;
  state.updatedAt = new Date().toISOString();
  state.activeStudy = studySession;
  state.activeQuiz = quizSession;
  const saved = studySync ? studySync.saveLocal(JSON.stringify(state)) : writeStoredState(browserStorage, state);
  document.querySelectorAll(".storage-note").forEach((node) => { node.textContent = saved ? "이 브라우저에 저장됨" : "저장 실패 · JSON 백업 필요"; });
  if (!saved) showToast("저장하지 못했어요. JSON 백업을 내려받아 주세요.", "error");
  return saved;
}

function h(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value, includeYear = false) {
  if (!value) return "학습 기록 없음";
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "학습 기록 없음";
  return new Intl.DateTimeFormat("ko-KR", includeYear ? { year: "numeric", month: "short", day: "numeric" } : { month: "short", day: "numeric" }).format(date);
}

function formatPercent(correct, wrong) {
  const total = correct + wrong;
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}

function allTags() {
  return uniqueStrings(state.words.flatMap((word) => word.tags)).sort((a, b) => a.localeCompare(b, "ko"));
}

function setView(view, options = {}) {
  if (!validView(view)) return;
  currentView = view;
  if (options.quizMode) quizDefaults.mode = options.quizMode;
  if (typeof options.onlyWrong === "boolean") quizDefaults.onlyWrong = options.onlyWrong;
  history.replaceState(null, "", `#${view}`);
  render(false);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message, tone = "") {
  clearTimeout(toastTimer);
  toastNode.textContent = message;
  toastNode.className = `toast show ${tone}`.trim();
  toastTimer = setTimeout(() => {
    toastNode.className = "toast";
  }, 3600);
}

function render(persist = true) {
  document.querySelectorAll("[data-view]").forEach((button) => {
    const active = button.dataset.view === currentView;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  document.title = `${VIEW_NAMES[currentView]} · 토익 단어장`;
  const renderers = { home: renderHome, wordbook: renderWordbook, study: renderStudy, quiz: renderQuiz, mistakes: renderMistakes };
  document.body.classList.toggle("is-studying", (currentView === "study" && studySession && !studySession.completed) || (currentView === "quiz" && quizSession && !quizSession.completed));
  viewRoot.innerHTML = `${loaded.error ? `<div class="storage-alert" role="alert">${h(storageNotice)}</div>` : ""}<div class="screen-enter">${renderers[currentView]()}</div>`;
  if (currentView === "wordbook") renderWordbookResults();
  if (currentView === "quiz" && quizSession && !quizSession.completed && quizSession.mode === "typing" && !quizSession.feedback) {
    requestAnimationFrame(() => document.querySelector("#typing-answer")?.focus());
  }
  if (currentView === "quiz" && quizSession?.feedback) requestAnimationFrame(() => document.querySelector('[data-action="next-quiz"]')?.focus());
  if (persist) saveState();
}

function renderPageHeader(eyebrow, title, description, actions = "") {
  return `
    <header class="page-header">
      <div><h1>${h(title)}</h1>${description ? `<p>${h(description)}</p>` : ""}</div>
      ${actions ? `<div class="page-actions">${actions}</div>` : ""}
    </header>`;
}

function batchSettings(session, mode = session?.mode || "multiple") {
  return { mode, direction: session?.direction || "word-to-meaning", tag: session?.tag || "all",
    count: session?.requestedCount || 10, collection: session?.collection || (session?.onlyWrong ? "wrong" : "regular"),
    minWrong: session?.minWrong || 1 };
}

function adoptBatch(session, mode) {
  if (!session || session.scopeKey) return;
  const settings = batchSettings(session, mode);
  session.scopeKey = progressScopeKey(settings);
  const previous = state.studyProgress[session.scopeKey];
  session.pass = previous?.pass || 1;
  state.studyProgress[session.scopeKey] ||= { pass: session.pass, completedIds: [], updatedAt: new Date().toISOString() };
  const ids = mode === "flashcard" ? session.wordIds.slice(0, session.completed ? session.wordIds.length : session.index) : session.queue.filter(q => q.answered && !q.isRetry).map(q => q.wordId);
  for (const id of ids) state.studyProgress = markStudyWord(state.studyProgress, session.scopeKey, id, { pass: session.pass });
}

function batchSummary(session, mode) {
  if (!session) return "";
  const settings = batchSettings(session, mode);
  const entry = state.studyProgress[session.scopeKey || progressScopeKey(settings)];
  const excluded = new Set(session.unavailableIds || (quizSession?.scopeKey === (session.scopeKey || progressScopeKey(settings)) ? quizSession.unavailableIds : []) || []);
  const eligible = eligibleStudyWords(state.words, settings, state.bookmarks).filter(word => !excluded.has(word.id));
  const done = new Set(entry?.completedIds || []);
  const remaining = eligible.filter(word => !done.has(word.id)).length;
  return `<p class="batch-progress">${entry?.pass || 1}회독 · 남은 ${remaining} / ${eligible.length}개</p>`;
}

function bookmarkButton(wordId) {
  const starred = state.bookmarks[wordId]?.starred === true;
  return `<button type="button" class="bookmark-button ${starred ? "is-starred" : ""}" data-action="toggle-bookmark" data-word-id="${h(wordId)}" aria-label="${starred ? "별표 해제" : "별표 표시"}" aria-pressed="${starred}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.3.9-4.5 4.4 1 6.2L12 17.3l-5.6 2.9 1-6.2-4.5-4.4 6.3-.9Z"/></svg></button>`;
}

function toggleBookmark(wordId) {
  if (!state.words.some(word => word.id === wordId)) return;
  const prior = state.bookmarks[wordId];
  state.bookmarks[wordId] = { starred: !prior?.starred, updatedAt: new Date(Math.max(Date.now(), Date.parse(prior?.updatedAt || "") + 1 || 0)).toISOString() };
  saveState();
  if (currentView === "mistakes") render(false);
  else document.querySelectorAll('[data-action="toggle-bookmark"]').forEach(button => {
    const active = state.bookmarks[button.dataset.wordId]?.starred === true;
    button.classList.toggle("is-starred", active);
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute("aria-label", active ? "별표 해제" : "별표 표시");
    button.blur?.();
  });
}

function nextBatch() {
  const session = currentView === "study" ? studySession : quizSession;
  if (!session) return;
  adoptBatch(session, currentView === "study" ? "flashcard" : session.mode);
  const settings = session.returnBatchSettings || batchSettings(session, currentView === "study" ? "flashcard" : session.mode);
  currentView = settings.mode === "flashcard" ? "study" : "quiz";
  if (settings.mode === "flashcard") startStudy({ data: null }, settings);
  else {
    const result = beginQuiz(settings);
    if (!result.ok) showToast(result.error, "error");
  }
  history.replaceState(null, "", `#${currentView}`);
}

function nextBatchButton(session) {
  const settings = session.returnBatchSettings || batchSettings(session, currentView === "study" ? "flashcard" : session.mode);
  const label = settings.collection === "starred" ? "별표" : settings.collection === "wrong" ? "오답" : "일반";
  return `<button class="primary-button" type="button" data-action="next-batch">${settings.count === "all" ? "남은" : "다음 " + settings.count + "개"} ${label} 묶음 풀기</button>`;
}

function renderHome() {
  const stats = computeDashboardStats(state);
  const settings = homeMode === "flashcard" ? studyDefaults : quizDefaults;
  const saved = [];
  if (studySession && !studySession.completed) saved.push({ view: "study", label: "암기 카드", completed: studySession.index, total: studySession.wordIds.length });
  if (quizSession && !quizSession.completed) saved.push({ view: "quiz", label: quizSession.mode === "typing" ? "직접 입력" : "객관식 퀴즈", completed: quizSession.originalAnswered, total: quizSession.originalTotal });
  return `
    <form id="home-config" class="home-study-panel">
      <h1>${state.words.length ? "단어 학습" : "단어를 추가해 주세요"}</h1>
      <p class="home-intro">뜻을 익히고, 헷갈린 단어를 다시 확인해요.</p>
      <div class="home-stats" aria-label="학습 현황"><span>전체 단어 <strong>${stats.total}</strong></span><span>암기 완료 <strong>${stats.mastered}</strong></span><span>오답 단어 <strong>${stats.mistakes}</strong></span></div>
      <div class="form-grid two-columns home-settings">
        <label><span>학습 방식</span><select name="mode"><option value="multiple" ${homeMode === "multiple" ? "selected" : ""}>객관식 퀴즈</option><option value="typing" ${homeMode === "typing" ? "selected" : ""}>직접 입력</option><option value="flashcard" ${homeMode === "flashcard" ? "selected" : ""}>암기 카드</option></select></label>
        <label><span>학습 범위</span><select name="tag">${configTagOptions(settings.tag)}</select></label>
        <label><span>출제 방향</span><select name="direction"><option value="word-to-meaning" ${settings.direction === "word-to-meaning" ? "selected" : ""}>단어 → 뜻</option><option value="meaning-to-word" ${settings.direction === "meaning-to-word" ? "selected" : ""}>뜻 → 단어</option></select></label>
        <label><span>${homeMode === "flashcard" ? "카드 수" : "문제 수"}</span><select name="count">${configCountOptions(settings.count, homeMode === "flashcard" ? "개" : "문제")}</select></label>
      </div>
      <div class="home-start-actions"><button class="text-button" type="button" data-view="wordbook">단어 목록 보기</button><button class="primary-button" type="submit" ${state.words.length ? "" : "disabled"}>학습 시작</button></div>
      ${batchSummary({ ...settings, mode: homeMode, collection: "regular" }, homeMode)}
    </form>
    ${saved.length ? `<section class="home-continuation"><div><h2>저장된 학습</h2>${saved.map((item) => `<p>${item.label} · ${item.completed} / ${item.total}개 완료</p>`).join("")}</div><div class="button-row">${saved.map((item) => `<button class="secondary-button" type="button" data-view="${item.view}">${saved.length > 1 ? `${item.label} 이어서` : "이어서 풀기"}</button>`).join("")}</div></section>` : ""}
    <section class="home-continuation"><div><h2>오답·별표 복습</h2><p>${stats.mistakes ? `${stats.mistakes}개의 헷갈린 단어를 다시 확인해요.` : "헷갈린 단어를 모아서 다시 풀어요."}</p></div><button class="secondary-button" type="button" data-view="mistakes">복습하기</button></section>`;
}

function getFilteredWordbookWords() {
  const query = normalizeText(wordFilters.search);
  return state.words.filter((word) => {
    const searchable = normalizeText([word.word, ...word.meanings, word.partOfSpeech, word.example, word.memo, ...(word.aliases || []), ...word.tags].join(" "));
    return (!query || searchable.includes(query))
      && (wordFilters.status === "all" || word.status === wordFilters.status)
      && (wordFilters.tag === "all" || word.tags.includes(wordFilters.tag))
      && (wordFilters.mistakes === "all" || (wordFilters.mistakes === "wrong" ? word.wrongCount > 0 : word.wrongCount === 0));
  }).sort((a, b) => wordFilters.sort === "wrong" ? b.wrongCount - a.wrongCount || a.word.localeCompare(b.word, "en")
    : wordFilters.sort === "recent" ? Date.parse(b.createdAt) - Date.parse(a.createdAt) || a.word.localeCompare(b.word, "en")
    : a.word.localeCompare(b.word, "en"));
}

function renderWordbook() {
  const tags = allTags();
  return `
    ${renderPageHeader("내 단어 모음", "단어 목록", "", `<button class="secondary-button" type="button" data-action="open-bulk-dialog">여러 단어 추가</button><button class="primary-button" type="button" data-action="open-word-dialog">＋ 단어 추가</button>`)}
    <div class="toolbar">
      <label class="search-box"><span class="sr-only">단어 검색</span><input id="word-search" type="search" value="${h(wordFilters.search)}" placeholder="단어, 뜻, 예문, 태그 검색" autocomplete="off" /></label>
      <div class="filters" aria-label="단어 필터">
        <select id="status-filter" aria-label="암기 상태"><option value="all">모든 상태</option>${WORD_STATUSES.map((status) => `<option value="${status}" ${wordFilters.status === status ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}</select>
        <select id="tag-filter" aria-label="태그"><option value="all">모든 태그</option>${tags.map((tag) => `<option value="${h(tag)}" ${wordFilters.tag === tag ? "selected" : ""}>${h(tag)}</option>`).join("")}</select>
        <select id="mistake-filter" aria-label="오답 여부"><option value="all">오답 여부 전체</option><option value="wrong" ${wordFilters.mistakes === "wrong" ? "selected" : ""}>틀린 적 있음</option><option value="clean" ${wordFilters.mistakes === "clean" ? "selected" : ""}>오답 없음</option></select>
        <select id="sort-filter" aria-label="정렬"><option value="alpha" ${wordFilters.sort === "alpha" ? "selected" : ""}>알파벳순</option><option value="recent" ${wordFilters.sort === "recent" ? "selected" : ""}>최근 추가순</option><option value="wrong" ${wordFilters.sort === "wrong" ? "selected" : ""}>많이 틀린순</option></select>
      </div>
    </div>
    <div class="list-caption"><p id="result-count" class="result-count" aria-live="polite"></p><button class="text-button" type="button" data-action="reset-word-filters">필터 초기화</button></div>
    <div id="word-results"></div>
    <details class="data-tools"><summary>백업·가져오기</summary><div class="button-row"><button class="small-button" type="button" data-action="open-bulk-dialog">＋ 일괄 추가</button><button class="small-button" type="button" data-action="export-json">JSON 백업</button><button class="small-button" type="button" data-action="export-csv">CSV 백업</button><button class="small-button" type="button" data-action="import-data">파일 가져오기</button></div></details>`;
}

function renderWordbookResults() {
  const words = getFilteredWordbookWords();
  const countNode = document.querySelector("#result-count");
  const resultsNode = document.querySelector("#word-results");
  if (!countNode || !resultsNode) return;
  countNode.textContent = `전체 ${state.words.length}개 중 ${words.length}개 표시`;
  const pages = Math.max(1, Math.ceil(words.length / 24));
  wordFilters.page = Math.max(1, Math.min(wordFilters.page || 1, pages));
  const visible = words.slice((wordFilters.page - 1) * 24, wordFilters.page * 24);
  resultsNode.innerHTML = words.length ? `<div class="word-list">${visible.map(renderWordCard).join("")}</div><nav class="pagination" aria-label="단어 목록 페이지"><button class="secondary-button" type="button" data-action="word-page" data-page="${wordFilters.page - 1}" ${wordFilters.page === 1 ? "disabled" : ""}>이전</button><span>${wordFilters.page} / ${pages} 페이지</span><button class="secondary-button" type="button" data-action="word-page" data-page="${wordFilters.page + 1}" ${wordFilters.page === pages ? "disabled" : ""}>다음</button></nav>` : `<div class="empty-state"><div><span class="empty-icon" aria-hidden="true">A</span><h2>조건에 맞는 단어가 없어요</h2><p>검색어나 필터를 바꾸거나 새 단어를 추가해 보세요.</p><div class="button-row" style="justify-content:center"><button class="secondary-button" type="button" data-action="reset-word-filters">필터 초기화</button><button class="primary-button" type="button" data-action="open-word-dialog">단어 추가</button></div></div></div>`;
}

function renderWordCard(word) {
  return `<article class="word-card ${word.status === "mastered" ? "mastered" : ""}">
    <div class="word-main"><h3>${h(word.word)}</h3></div>
    <div class="word-meaning"><strong>${h(word.meanings.join(", "))}</strong></div>
    <div class="word-actions">${bookmarkButton(word.id)}<select class="status-select" data-status-id="${h(word.id)}" aria-label="${h(word.word)} 암기 상태">${WORD_STATUSES.map((status) => `<option value="${status}" ${word.status === status ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}</select><button class="small-button edit-button" type="button" data-action="edit-word" data-word-id="${h(word.id)}" aria-label="${h(word.word)} 수정">수정</button></div>
    <details class="word-details"><summary>품사·쓰임·학습 기록 보기</summary><div class="detail-grid">
      <div><span>품사</span><p>${h(word.partOfSpeech || "품사 미지정")}</p></div><div><span>태그</span><div class="tag-row">${word.tags.map((tag) => `<span class="tag">${h(tag)}</span>`).join("")}</div></div>
      <div><span>영어 예문</span><p>${h(word.example || "등록된 예문이 없습니다.")}</p></div><div><span>예문 해석</span><p>${h(word.translation || "등록된 해석이 없습니다.")}</p></div><div><span>메모</span><p>${h(word.memo || "등록된 메모가 없습니다.")}</p></div><div><span>학습 기록</span><p>정답 ${word.correctCount}회 · 오답 ${word.wrongCount}회 · ${formatDate(word.lastStudiedAt)}</p></div>
      <div><button class="small-button delete-button" type="button" data-action="delete-word" data-word-id="${h(word.id)}" aria-label="${h(word.word)} 삭제">단어 삭제</button></div>
    </div></details></article>`;
}

function studySettings(session) {
  return { direction: session?.direction || "word-to-meaning", tag: session?.tag || "all", count: session?.requestedCount || 10 };
}

function quizSettings(session) {
  return { ...studySettings(session), mode: session?.mode || "multiple", onlyWrong: Boolean(session?.onlyWrong) };
}

function rememberStudyTag(tag) {
  wordFilters.tag = tag;
  wordFilters.page = 1;
  studyDefaults.tag = tag;
  quizDefaults.tag = tag;
}

function configTagOptions(selected = "all", wrongOnly = false) {
  // A scope without mistakes must stay selected, never silently broaden to all.
  const tags = uniqueStrings([...allTags(), ...(selected !== "all" ? [selected] : [])])
    .filter((tag) => tag === selected || !wrongOnly || state.words.some((word) => word.wrongCount > 0 && word.tags.includes(tag)));
  return `<option value="all" ${selected === "all" ? "selected" : ""}>모든 태그</option>${tags.map((tag) => `<option value="${h(tag)}" ${tag === selected ? "selected" : ""}>${h(tag)}</option>`).join("")}`;
}

function configCountOptions(selected = 10, unit = "문제") {
  const counts = [5, 10, 20, 30, 50];
  const numeric = Number(selected);
  if (Number.isInteger(numeric) && numeric > 0 && numeric <= 50 && !counts.includes(numeric)) counts.push(numeric);
  return `${counts.sort((a, b) => a - b).map((count) => `<option value="${count}" ${String(selected) === String(count) ? "selected" : ""}>${count}${unit}</option>`).join("")}<option value="all" ${selected === "all" ? "selected" : ""}>전체</option>`;
}

function renderStudy() {
  if (state.words.length === 0 && !studySession) return `${renderPageHeader("단어 익히기", "암기 카드", "뜻을 가리고 빠르게 기억을 확인하세요.")}${renderNoWords()}`;
  if (!studySession) return renderStudySetup();
  if (studySession.completed && !studySession.reviewing) return renderStudyResult();
  return renderStudyCard();
}

function renderStudySetup() {
  return `${renderPageHeader("단어 익히기", "암기 카드", "카드를 누르면 정답과 예문을 볼 수 있어요.")}
    <form id="study-config" class="setup-card">
      <header><span class="setup-symbol" aria-hidden="true">▣</span><div><h2>학습 범위를 정해 주세요</h2><p>오답이 많거나 오래 보지 않은 단어가 먼저 나옵니다.</p></div></header>
      <div class="form-grid three-columns">
        <label><span>문제 방향</span><select name="direction"><option value="word-to-meaning" ${studyDefaults.direction === "word-to-meaning" ? "selected" : ""}>영어 → 한글 뜻</option><option value="meaning-to-word" ${studyDefaults.direction === "meaning-to-word" ? "selected" : ""}>한글 뜻 → 영어</option></select></label>
        <label><span>태그</span><select name="tag">${configTagOptions(studyDefaults.tag)}</select></label>
        <label><span>카드 수</span><select name="count">${configCountOptions(studyDefaults.count, "개")}</select></label>
      </div>
      <div class="setup-footer"><p>평가 결과는 다음 출제 우선순위에 반영됩니다.</p><button class="primary-button" type="submit">암기 카드 시작 →</button></div>
    </form>`;
}

function renderStudyCard() {
  const word = sessionWord(studySession, studySession.wordIds[studySession.index]);
  if (!word) {
    studySession = null;
    return renderStudySetup();
  }
  const progress = Math.round((studySession.index / studySession.wordIds.length) * 100);
  const front = getPrompt(word, studySession.direction);
  const back = getAnswerLabel(word, studySession.direction);
  const alreadyRated = Boolean(studySession.ratings?.[studySession.index]) || studySession.index < (studySession.furthestIndex || 0) || studySession.completed;
  return `<section class="session-shell" aria-label="암기 카드 학습">
      <div class="session-top"><button class="ghost-button" type="button" data-action="end-study">← 학습 설정</button><div class="session-progress"><div class="progress-label"><span>${studySession.index + 1} / ${studySession.wordIds.length}</span><span>${progress}%</span></div><div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}"><div class="progress-fill" style="width:${progress}%"></div></div></div></div>
      <div class="card-meta">${batchSummary(studySession, "flashcard")}${bookmarkButton(word.id)}</div>
      <div class="study-card-wrap"><button class="study-card ${studySession.revealed ? "revealed" : ""}" type="button" data-action="reveal-card" aria-label="${studySession.revealed ? "정답이 공개된 카드" : "뜻 보기"}" aria-live="polite">
        <span class="card-face front" aria-hidden="${studySession.revealed ? "true" : "false"}"><span class="card-kicker">${studySession.direction === "word-to-meaning" ? "이 단어의 뜻은?" : "이 뜻의 영단어는?"}</span><strong class="card-prompt">${h(front)}</strong><span class="part-label">${h(word.partOfSpeech || "품사 미지정")}</span><span class="card-hint">카드를 눌러 정답 보기</span></span>
        <span class="card-face back" aria-hidden="${studySession.revealed ? "false" : "true"}"><span class="card-kicker">${h(word.word)}</span><strong class="card-prompt">${h(back)}</strong>${word.example ? `<span class="example-box"><span>${h(word.example)}</span><small>${h(word.translation)}</small></span>` : ""}${word.memo ? `<span class="study-memo">${h(word.memo)}</span>` : ""}<span class="card-hint">아래에서 기억 정도를 선택해 주세요</span></span>
      </button></div>
      <div class="quiz-nav"><button class="text-button" type="button" data-action="previous-study" ${studySession.index === 0 ? "disabled" : ""}>← 이전 문제</button>${alreadyRated ? `<button class="primary-button" type="button" data-action="next-study">${studySession.index === studySession.wordIds.length - 1 ? "결과 보기" : "다음 문제"}</button>` : ""}</div>
      ${alreadyRated ? "" : studySession.revealed ? `<div class="rating-row" aria-label="기억 정도"><button class="rating-button unknown" type="button" data-action="rate-card" data-rating="unknown">! 모름</button><button class="rating-button confused" type="button" data-action="rate-card" data-rating="confused">? 헷갈림</button><button class="rating-button known" type="button" data-action="rate-card" data-rating="known">✓ 알고 있음</button></div>` : `<div class="reveal-row"><button class="primary-button" type="button" data-action="reveal-card">뜻 보기</button></div>`}
    </section>`;
}

function renderStudyResult() {
  const total = studySession.wordIds.length;
  return `<section class="result-card"><span class="result-emblem" aria-hidden="true">✓</span><p class="eyebrow">암기 카드 완료</p><h1>오늘의 카드 학습을 마쳤어요</h1><p>헷갈리거나 모른 단어는 다음 학습에서 더 자주 나옵니다.</p><div class="result-stats"><div><strong>${total}</strong><span>학습 카드</span></div><div><strong>${studySession.results.known}</strong><span>알고 있음</span></div><div><strong>${studySession.results.confused + studySession.results.unknown}</strong><span>다시 볼 단어</span></div></div>${batchSummary(studySession, "flashcard")}<div class="result-actions"><button class="text-button" type="button" data-action="previous-study">← 이전 문제</button><button class="secondary-button" type="button" data-action="restart-study">학습 설정</button>${nextBatchButton(studySession)}${studySession.results.confused + studySession.results.unknown > 0 ? `<button class="primary-button" type="button" data-action="start-wrong-quiz">오답 퀴즈 풀기</button>` : `<button class="primary-button" type="button" data-view="home">홈으로</button>`}</div></section>`;
}

function renderQuiz() {
  if (state.words.length === 0 && !quizSession) return `${renderPageHeader("실전 확인", "퀴즈", "객관식 또는 직접 입력으로 기억을 확인하세요.")}${renderNoWords()}`;
  if (!quizSession) return renderQuizSetup();
  if (quizSession.completed && !quizSession.reviewing) return renderQuizResult();
  return renderQuizQuestion();
}

function renderQuizSetup() {
  const wrongCount = state.words.filter((word) => word.wrongCount > 0 && (quizDefaults.tag === "all" || word.tags.includes(quizDefaults.tag))).length;
  return `${renderPageHeader("실전 확인", "퀴즈", "정답률은 첫 출제 문제를 기준으로 기록되고, 틀린 단어는 세 문제 뒤 한 번 더 나옵니다.")}
    <form id="quiz-config" class="setup-card">
      <header><span class="setup-symbol" aria-hidden="true">✓</span><div><h2>퀴즈 방식을 골라 주세요</h2><p>약 3분이면 10문제를 풀 수 있어요.</p></div></header>
      <div class="form-grid">
        <div><span class="field-label">퀴즈 유형</span><div class="choice-group">
          <label class="choice-card"><input type="radio" name="mode" value="multiple" ${quizDefaults.mode === "multiple" ? "checked" : ""} /><span><strong>객관식</strong><small>같은 품사의 네 보기</small></span></label>
          <label class="choice-card"><input type="radio" name="mode" value="typing" ${quizDefaults.mode === "typing" ? "checked" : ""} /><span><strong>직접 입력</strong><small>뜻이나 철자를 직접 입력</small></span></label>
        </div></div>
        <div class="form-grid three-columns">
          <label><span>문제 방향</span><select name="direction"><option value="word-to-meaning" ${quizDefaults.direction === "word-to-meaning" ? "selected" : ""}>영어 → 한글 뜻</option><option value="meaning-to-word" ${quizDefaults.direction === "meaning-to-word" ? "selected" : ""}>한글 뜻 → 영어</option></select></label>
          <label><span>태그</span><select name="tag">${configTagOptions(quizDefaults.tag, quizDefaults.onlyWrong)}</select></label>
          <label><span>문제 수</span><select name="count">${configCountOptions(quizDefaults.count)}</select></label>
        </div>
        <label class="choice-card"><input type="checkbox" name="onlyWrong" ${quizDefaults.onlyWrong ? "checked" : ""} ${wrongCount === 0 && !quizDefaults.onlyWrong ? "disabled" : ""} /><span><strong>오답 단어만 출제</strong><small>${wrongCount ? `선택한 범위에 ${wrongCount}개의 오답 단어가 있어요.` : "선택한 범위에는 오답 단어가 없어요."}</small></span></label>
      </div>
      <p class="quiz-help">전체를 선택하면 선택한 태그·오답 조건에서 출제 가능한 단어를 모두 풉니다. 객관식은 단어장 전체에서 같은 품사의 보기를 찾습니다. 복합 품사는 같은 조합끼리, 숙어는 비슷한 뜻의 형태끼리 묶습니다. 보기가 부족한 단어는 제외하며 카드·직접 입력으로 학습할 수 있어요.</p>
      <div class="setup-footer"><p>직접 입력의 영어 답은 대소문자와 앞뒤 공백을 구분하지 않습니다.</p><button class="primary-button" type="submit">퀴즈 시작 →</button></div>
    </form>`;
}

function renderQuizQuestion() {
  const question = quizSession.queue[quizSession.index];
  const word = sessionWord(quizSession, question.wordId);
  if (!word) {
    quizSession.queue.splice(quizSession.index, 1);
    if (quizSession.index >= quizSession.queue.length) finishQuiz();
    return quizSession.completed ? renderQuizResult() : renderQuizQuestion();
  }
  const totalQueue = quizSession.queue.length;
  const progress = Math.round((quizSession.index / totalQueue) * 100);
  const scoreText = `${quizSession.originalCorrect} / ${quizSession.originalAnswered}`;
  const prompt = getPrompt(word, quizSession.direction);
  const answers = quizSession.mode === "multiple" ? renderMultipleAnswers(question, word) : renderTypingAnswer();
  const feedback = quizSession.feedback ? renderFeedback(word) : "";
  return `<section class="session-shell" aria-label="퀴즈 진행"><div class="session-top"><button class="ghost-button" type="button" data-action="end-quiz">← 퀴즈 설정</button><div class="session-progress"><div class="progress-label"><span>${quizSession.index + 1} / ${totalQueue}${question.isRetry ? " · 복습" : ""}</span><span>첫 시도 점수 ${scoreText}</span></div><div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}"><div class="progress-fill" style="width:${progress}%"></div></div></div></div>${batchSummary(quizSession, quizSession.mode)}<article class="quiz-card"><div class="question-meta">${bookmarkButton(word.id)}<span class="mode-badge">${quizSession.mode === "multiple" ? "객관식" : "직접 입력"}</span>${question.isRetry ? `<span class="retry-badge">형광펜 복습 문제</span>` : `<span class="mode-badge">${h(word.partOfSpeech || "품사 미지정")}</span>`}</div><p class="question-label">${quizSession.direction === "word-to-meaning" ? "이 단어의 뜻을 맞혀 보세요" : "이 뜻에 해당하는 영단어를 맞혀 보세요"}</p><h1 class="question-prompt">${h(prompt)}</h1>${answers}${feedback}${quizSession.feedback ? "" : `<button class="text-button" type="button" data-action="previous-quiz" ${quizSession.index === 0 ? "disabled" : ""}>← 이전 문제</button>`}${quizSession.returnBatchSettings ? nextBatchButton(quizSession) : ""}</article></section>`;
}

function renderMultipleAnswers(question, word) {
  if (!Array.isArray(question.options)) question.options = buildQuizOptions(word, state.words, quizSession.direction);
  return `<div class="option-list" role="group" aria-label="정답 보기">${question.options.map((option, index) => {
    let resultClass = "";
    if (quizSession.feedback) {
      const correctLabel = getAnswerLabel(word, quizSession.direction);
      if (normalizeText(option) === normalizeText(correctLabel)) resultClass = "correct";
      else if (option === question.selected) resultClass = "wrong";
    }
    const selected = question.selected === option;
    return `<button class="option-button ${resultClass} ${selected && !quizSession.feedback ? "selected" : ""}" type="button" data-action="choose-option" data-answer="${h(option)}" aria-pressed="${selected}" ${quizSession.feedback ? "disabled" : ""}><span class="option-letter" aria-hidden="true">${resultClass === "correct" ? "✓" : resultClass === "wrong" ? "×" : index + 1}</span><span>${h(option)}${resultClass ? `<small>${resultClass === "correct" ? "정답" : "선택한 오답"}</small>` : ""}</span></button>`;
  }).join("")}</div>${!quizSession.feedback ? `<div class="quiz-question-actions"><button class="primary-button" type="button" data-action="confirm-option" ${question.selected === null ? "disabled" : ""}>채점하기</button></div>` : ""}`;
}

function renderTypingAnswer() {
  if (quizSession.feedback) return "";
  return `<form id="typing-form" class="typing-form"><label for="typing-answer">정답 입력</label><div class="typing-row"><input id="typing-answer" name="answer" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="정답을 입력하세요" required /><button class="primary-button" type="submit">정답 확인</button></div></form>`;
}

function renderFeedback(word) {
  const feedback = quizSession.feedback;
  const question = quizSession.queue[quizSession.index];
  return `<div class="feedback ${feedback.correct ? "correct" : "wrong"}" role="status" aria-live="polite"><span class="feedback-icon" aria-hidden="true">${feedback.correct ? "✓" : "!"}</span><div><h3>${feedback.correct ? "정답입니다" : "오답입니다"}</h3>${!feedback.correct ? `<p class="submitted-answer">내 답: ${h(question.selected)}</p>` : ""}<p>정답: <strong>${h(getAnswerLabel(word, quizSession.direction))}</strong></p>${!feedback.correct ? `<small>누적 오답 ${feedback.wrongCount}회${feedback.retryScheduled ? " · 잠시 뒤 한 번 더 복습합니다." : ""}</small>` : ""}${word.example ? `<small>${h(word.example)}${word.translation ? `<br>${h(word.translation)}` : ""}</small>` : ""}${word.memo ? `<small class="feedback-memo">${h(word.memo)}</small>` : ""}</div><div class="quiz-nav"><button class="text-button" type="button" data-action="previous-quiz" ${quizSession.index === 0 ? "disabled" : ""}>← 이전 문제</button><button class="primary-button" type="button" data-action="next-quiz">${quizSession.index === quizSession.queue.length - 1 ? "결과 보기" : "다음 문제"} →</button></div></div>`;
}

function renderQuizResult() {
  const total = quizSession.originalTotal;
  const accuracy = total ? Math.round((quizSession.originalCorrect / total) * 100) : 0;
  const wrongWords = uniqueStrings(quizSession.wrongWordIds.map((id) => state.words.find((word) => word.id === id)?.word).filter(Boolean));
  return `<section class="result-card"><span class="result-emblem" aria-hidden="true">${accuracy >= 80 ? "✓" : "A"}</span><p class="eyebrow">퀴즈 완료</p><h1>${accuracy >= 80 ? "아주 잘했어요!" : accuracy >= 60 ? "조금만 더 복습해요" : "오답부터 차근차근 볼까요?"}</h1><p>점수는 복습 재출제를 제외한 첫 시도 ${total}문제를 기준으로 계산했습니다.</p><div class="score-ring" style="--score:${accuracy}%" aria-label="정답률 ${accuracy}퍼센트"><strong>${accuracy}%</strong></div><div class="result-stats"><div><strong>${total}</strong><span>출제 문제</span></div><div><strong>${quizSession.originalCorrect}</strong><span>정답</span></div><div><strong>${quizSession.originalWrong}</strong><span>오답</span></div></div>${wrongWords.length ? `<div class="wrong-summary"><h2>이번에 틀린 단어</h2><div class="wrong-chips">${wrongWords.map((word) => `<span class="wrong-chip">${h(word)}</span>`).join("")}</div></div>` : `<div class="empty-note"><span aria-hidden="true">✓</span><p><strong>전부 맞혔어요</strong><br />현재 범위의 단어를 잘 기억하고 있습니다.</p></div>`}${batchSummary(quizSession, quizSession.mode)}<div class="result-actions"><button class="text-button" type="button" data-action="previous-quiz">← 이전 문제</button>${nextBatchButton(quizSession)}<button class="secondary-button" type="button" data-action="restart-quiz">학습 설정</button>${state.words.some((word) => word.wrongCount > 0) ? `<button class="primary-button" type="button" data-action="start-wrong-quiz">오답 복습하기</button>` : `<button class="primary-button" type="button" data-view="home">홈으로</button>`}</div></section>`;
}

function getMistakeWords() {
  return eligibleStudyWords(state.words, { tag: quizDefaults.tag, collection: reviewKind, minWrong: reviewMinWrong }, state.bookmarks)
    .sort((a,b) => reviewKind === "wrong" ? b.wrongCount - a.wrongCount || a.word.localeCompare(b.word,"en") : a.word.localeCompare(b.word,"en"));
}

function renderMistakes() {
  const words = getMistakeWords();
  return `${renderPageHeader("", "복습", "")}
    <div class="review-tabs" role="tablist" aria-label="복습 종류"><button role="tab" type="button" data-action="review-kind" data-kind="wrong" aria-selected="${reviewKind === "wrong"}">오답</button><button role="tab" type="button" data-action="review-kind" data-kind="starred" aria-selected="${reviewKind === "starred"}">별표</button></div>
    <form id="review-config" class="setup-card"><div class="review-settings">
      <label><span>학습 범위</span><select name="tag">${configTagOptions(quizDefaults.tag)}</select></label>
      ${reviewKind === "wrong" ? `<label><span>누적 오답</span><input type="number" name="minWrong" min="1" max="999999" value="${reviewMinWrong}" aria-label="누적 오답 횟수"/><span>회 이상</span></label>` : ""}
      <label><span>학습 방식</span><select name="mode"><option value="multiple" ${reviewMode === "multiple" ? "selected" : ""}>객관식</option><option value="typing" ${reviewMode === "typing" ? "selected" : ""}>직접 입력</option><option value="flashcard" ${reviewMode === "flashcard" ? "selected" : ""}>암기 카드</option></select></label>
      <label><span>문제 수</span><select name="count">${configCountOptions(reviewCount)}</select></label>
      <button type="submit" class="primary-button" ${words.length ? "" : "disabled"}>${reviewKind === "wrong" ? "오답" : "별표"} 풀기</button>
    </div>${batchSummary({ mode: reviewMode, tag: quizDefaults.tag, direction: quizDefaults.direction, collection: reviewKind, minWrong: reviewMinWrong }, reviewMode)}</form>
    <p class="result-count">${words.length}개 단어</p>
    ${words.length ? `<div class="word-list">${words.map(word => `<div class="review-word"><strong>${h(word.word)}</strong><span>${h(word.meanings.join(", "))}</span>${reviewKind === "wrong" ? `<span>오답 ${word.wrongCount}회</span>` : ""}${bookmarkButton(word.id)}</div>`).join("")}</div>` : `<div class="empty-note">현재 조건에 해당하는 단어가 없어요.</div>`}`;
}

function renderNoWords() {
  return `<div class="empty-state"><div><span class="empty-icon" aria-hidden="true">A</span><h2>학습할 단어가 없어요</h2><p>새 단어를 직접 입력하거나 여러 단어를 한 번에 추가해 주세요.</p><div class="button-row" style="justify-content:center"><button class="secondary-button" type="button" data-action="open-bulk-dialog">여러 단어 추가</button><button class="primary-button" type="button" data-action="open-word-dialog">단어 추가</button></div></div></div>`;
}

function startHome(form) {
  const data = new FormData(form);
  const mode = String(data.get("mode"));
  if (!["flashcard", "multiple", "typing"].includes(mode)) return;
  const pending = mode === "flashcard" ? studySession : quizSession;
  if (pending && !pending.completed && !confirm("새 학습을 시작하면 이 방식의 이어 풀기가 새 풀이로 바뀌어요. 누적 학습 기록은 유지돼요. 시작할까요?")) return;
  homeMode = mode;
  const previousView = currentView;
  currentView = mode === "flashcard" ? "study" : "quiz";
  const result = mode === "flashcard" ? { ok: startStudy(form) } : beginQuiz({
    mode, direction: String(data.get("direction")), tag: String(data.get("tag")), onlyWrong: false, collection: "regular",
    count: data.get("count") === "all" ? "all" : Number(data.get("count"))
  });
  if (!result.ok) {
    currentView = previousView;
    render();
    if (result.error) showToast(result.error, "error");
    return;
  }
  history.replaceState(null, "", `#${currentView}`);
}

function startStudy(form, settings = null) {
  const data = settings ? null : new FormData(form);
  const options = settings || { mode: "flashcard", direction: String(data.get("direction")), tag: String(data.get("tag")), count: data.get("count") === "all" ? "all" : Number(data.get("count")), collection: "regular" };
  studyDefaults = { ...options, mode: "flashcard" };
  rememberStudyTag(options.tag);
  const batch = selectNextBatch(state.words, options.count, { ...options, mode: "flashcard" }, state.studyProgress, state.bookmarks, selectWeightedWords);
  if (!batch.words.length) { showToast("선택한 범위에 학습할 단어가 없습니다.", "error"); return false; }
  state.studyProgress[batch.scopeKey] = batch.entry;
  studySession = { wordIds: batch.words.map(word => word.id), index: 0, direction: options.direction, tag: options.tag, requestedCount: options.count,
    collection: options.collection || "regular", minWrong: options.minWrong || 1, scopeKey: batch.scopeKey, pass: batch.pass,
    ratings: {}, furthestIndex: 0, revealed: false, results: { known: 0, confused: 0, unknown: 0 }, completed: false, recorded: false };
  render();
  window.scrollTo({ top: 0, behavior: "instant" });
  return true;
}

function rateStudy(rating) {
  if (!studySession?.revealed || studySession.completed || !["known", "confused", "unknown"].includes(rating)) return;
  const wordId = studySession.wordIds[studySession.index];
  if (studySession.ratings?.[studySession.index] || studySession.index < (studySession.furthestIndex || 0)) return;
  adoptBatch(studySession, "flashcard");
  studySession.ratings ||= {};
  studySession.ratings[studySession.index] = rating;
  studySession.furthestIndex = Math.max(studySession.furthestIndex || 0, studySession.index + 1);
  state.studyProgress = markStudyWord(state.studyProgress, studySession.scopeKey, wordId, { pass: studySession.pass });
  studySession.results[rating] += 1;
  updateWordStats(wordId, rating === "known");
  if (studySession.index >= studySession.wordIds.length - 1) {
    studySession.completed = true;
    if (!studySession.recorded) {
      addSession({ mode: "flashcard", direction: studySession.direction, total: studySession.wordIds.length, correct: studySession.results.known, wrong: studySession.results.confused + studySession.results.unknown, wrongWordIds: [] });
      studySession.recorded = true;
    }
  } else {
    studySession.index += 1;
    studySession.revealed = false;
  }
  render();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function startQuiz(form) {
  const data = new FormData(form);
  const result = beginQuiz({
    mode: String(data.get("mode")),
    direction: String(data.get("direction")),
    tag: String(data.get("tag")),
    onlyWrong: data.get("onlyWrong") === "on",
    count: String(data.get("count")) === "all" ? "all" : Number(data.get("count"))
  });
  if (!result.ok) showToast(result.error, "error");
}

function beginQuiz({ mode, direction, tag = "all", onlyWrong = false, collection = onlyWrong ? "wrong" : "regular", minWrong = 1, count = 10, returnBatchSettings = null }) {
  if (!["multiple", "typing"].includes(mode)) return { ok: false, error: "지원하지 않는 퀴즈 유형입니다." };
  if (!["word-to-meaning", "meaning-to-word"].includes(direction)) return { ok: false, error: "지원하지 않는 문제 방향입니다." };
  const settings = { mode, direction, tag, onlyWrong: collection === "wrong", collection, minWrong, count };
  const wordsByPart = new Map();
  let pool = state.words;
  const scoped = eligibleStudyWords(state.words, settings, state.bookmarks);
  if (mode === "multiple") {
    const labels = new Map(), meanings = new Map();
    for (const word of state.words) {
      const key = quizPartKey(word);
      if (!wordsByPart.has(key)) wordsByPart.set(key, []);
      wordsByPart.get(key).push(word);
      labels.set(word.id, normalizeText(getAnswerLabel(word, direction)));
      meanings.set(word.id, new Set(word.meanings.map(value => normalizeAnswer(value).replace(/\s+/g, ""))));
    }
    // Cheap eligibility check; generate randomized choices only for this batch.
    pool = scoped.filter(word => {
      const seen = new Set([labels.get(word.id)]), target = meanings.get(word.id);
      for (const other of wordsByPart.get(quizPartKey(word)) || []) {
        if (word.id === other.id || wordIdentity(word.word) === wordIdentity(other.word)
          || other.meanings.some(value => target.has(normalizeAnswer(value).replace(/\s+/g, "")))) continue;
        seen.add(labels.get(other.id));
        if (seen.size >= 4) return true;
      }
      return false;
    });
  }
  const batch = selectNextBatch(pool, count, settings, state.studyProgress, state.bookmarks, selectWeightedWords);
  const selected = batch.words;
  if (!selected.length) return { ok: false, error: mode === "multiple" ? "현재 조건에서 같은 품사의 보기 4개를 만들 수 없어요. 직접 입력을 선택하거나 단어를 더 추가해 주세요." : "선택한 범위에 출제할 단어가 없습니다." };
  const preparedQueue = selected.map(word => ({ qid: createId("question"), wordId: word.id, isRetry: false, answered: false, selected: null,
    options: mode === "multiple" ? buildQuizOptions(word, wordsByPart.get(quizPartKey(word)), direction) : null }));
  if (mode === "multiple" && preparedQueue.some(question => question.options.length !== 4)) return { ok:false, error:"객관식 보기를 만들 수 없는 단어가 있어요. 직접 입력을 선택해 주세요." };
  state.studyProgress[batch.scopeKey] = batch.entry;
  quizDefaults = settings;
  rememberStudyTag(tag);
  const availableIds = new Set(pool.map(word => word.id));
  quizSession = { unavailableIds: mode === "multiple" ? scoped.filter(word => !availableIds.has(word.id)).map(word => word.id) : [], mode, direction, tag, onlyWrong: collection === "wrong", collection, minWrong, requestedCount: count,
    scopeKey: batch.scopeKey, pass: batch.pass, returnBatchSettings, queue: preparedQueue, index: 0, originalTotal: selected.length,
    originalAnswered: 0, originalCorrect: 0, originalWrong: 0, retriesCompleted: 0, scheduledWordIds: [], wrongWordIds: [],
    feedback: null, completed: false, recorded: false };
  render();
  window.scrollTo({ top: 0, behavior: "instant" });
  if (count !== "all" && selected.length < Number(count)) showToast(`남은 ${selected.length}문제로 시작합니다.`);
  return { ok: true, count: selected.length, mode, direction, onlyWrong: collection === "wrong" };
}

function selectQuizOption(answer) {
  if (!quizSession || quizSession.mode !== "multiple" || quizSession.feedback || quizSession.completed) return;
  const question = quizSession.queue[quizSession.index];
  if (!question || question.answered || !question.options.includes(answer)) return;
  question.selected = answer;
  // Selection changes only these controls, preserving the page and keyboard focus.
  document.querySelectorAll('[data-action="choose-option"]').forEach(button => {
    const selected = button.dataset.answer === answer;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  const confirm = document.querySelector('[data-action="confirm-option"]');
  if (confirm) confirm.disabled = false;
  saveState();
}

function submitQuizAnswer(answer) {
  if (!quizSession || quizSession.feedback || quizSession.completed) return;
  const question = quizSession.queue[quizSession.index];
  if (!question || question.answered) return;
  const word = sessionWord(quizSession, question.wordId);
  if (!word) return;
  const correct = quizSession.mode === "multiple"
    ? normalizeText(answer) === normalizeText(getAnswerLabel(word, quizSession.direction))
    : answerIsCorrect(word, quizSession.direction, answer);
  adoptBatch(quizSession, quizSession.mode);
  if (!question.isRetry) state.studyProgress = markStudyWord(state.studyProgress, quizSession.scopeKey, word.id, { pass: quizSession.pass });
  question.answered = true;
  question.selected = String(answer);
  let retryScheduled = false;
  if (question.isRetry) {
    quizSession.retriesCompleted += 1;
  } else {
    quizSession.originalAnswered += 1;
    if (correct) quizSession.originalCorrect += 1;
    else {
      quizSession.originalWrong += 1;
      quizSession.wrongWordIds.push(word.id);
      if (!quizSession.scheduledWordIds.includes(word.id)) {
        quizSession.scheduledWordIds.push(word.id);
        quizSession.queue = insertRetry(quizSession.queue, quizSession.index, {
          qid: createId("retry"),
          wordId: word.id,
          isRetry: true,
          answered: false,
          selected: null,
          options: quizSession.mode === "multiple" ? buildQuizOptions(word, state.words, quizSession.direction) : null
        }, 3);
        retryScheduled = true;
      }
    }
  }
  const updated = updateWordStats(word.id, correct);
  quizSession.feedback = { correct, retryScheduled, wrongCount: updated?.wrongCount ?? word.wrongCount };
  question.feedback = { ...quizSession.feedback };
  render();
}

function questionFeedback(question) {
  if (!question?.answered) return null;
  if (question.feedback) return { ...question.feedback };
  const word = sessionWord(quizSession, question.wordId);
  if (!word) return null;
  return { correct: quizSession.mode === "multiple"
    ? normalizeText(question.selected) === normalizeText(getAnswerLabel(word, quizSession.direction))
    : answerIsCorrect(word, quizSession.direction, question.selected), retryScheduled: false, wrongCount: word.wrongCount };
}

function previousQuiz() {
  if (!quizSession) return;
  if (quizSession.completed && !quizSession.reviewing) {
    quizSession.reviewing = true;
    quizSession.index = quizSession.queue.length - 1;
  } else if (quizSession.index > 0) quizSession.index -= 1;
  else return;
  quizSession.feedback = questionFeedback(quizSession.queue[quizSession.index]);
  render();
}

function nextQuiz() {
  if (!quizSession?.feedback) return;
  if (quizSession.index >= quizSession.queue.length - 1) {
    if (quizSession.completed) quizSession.reviewing = false;
    else finishQuiz();
  } else {
    quizSession.index += 1;
    quizSession.feedback = questionFeedback(quizSession.queue[quizSession.index]);
  }
  render();
  document.querySelector(".session-shell, .result-card")?.scrollIntoView({ block: "start", behavior: "instant" });
}

function previousStudy() {
  if (!studySession) return;
  studySession.furthestIndex ??= studySession.index;
  if (studySession.completed && !studySession.reviewing) { studySession.reviewing = true; studySession.index = studySession.wordIds.length - 1; }
  else if (studySession.index > 0) studySession.index -= 1;
  else return;
  studySession.revealed = true;
  render();
}

function nextStudy() {
  if (!studySession) return;
  const rated = studySession.ratings?.[studySession.index] || studySession.index < (studySession.furthestIndex || 0) || studySession.completed;
  if (!rated) return;
  if (studySession.index >= studySession.wordIds.length - 1) studySession.reviewing = false;
  else { studySession.index += 1; studySession.revealed = Boolean(studySession.ratings?.[studySession.index]) || studySession.index < (studySession.furthestIndex || 0); }
  render();
}

function finishQuiz() {
  if (!quizSession || quizSession.completed) return;
  quizSession.completed = true;
  quizSession.feedback = null;
  if (!quizSession.recorded) {
    addSession({ mode: quizSession.mode, direction: quizSession.direction, total: quizSession.originalTotal, correct: quizSession.originalCorrect, wrong: quizSession.originalWrong, retryCount: quizSession.retriesCompleted, wrongWordIds: uniqueStrings(quizSession.wrongWordIds) });
    quizSession.recorded = true;
  }
}

function updateWordStats(wordId, correct) {
  const now = new Date().toISOString();
  let updatedWord;
  state.words = state.words.map((word) => {
    if (word.id !== wordId) return word;
    const nextCorrect = word.correctCount + (correct ? 1 : 0);
    const nextWrong = word.wrongCount + (correct ? 0 : 1);
    let status = word.status;
    if (!correct) status = "learning";
    else if (nextCorrect >= 3 && nextCorrect >= nextWrong + 2) status = "mastered";
    else if (status === "new") status = "learning";
    updatedWord = { ...word, correctCount: nextCorrect, wrongCount: nextWrong, status, lastStudiedAt: now, lastWrongAt: correct ? word.lastWrongAt : now };
    return updatedWord;
  });
  return updatedWord;
}

function addSession(session) {
  state.sessions = [...state.sessions, { id: createId("session"), ...session, finishedAt: new Date().toISOString() }].slice(-80);
}

function openWordEditor(wordId = "") {
  const word = state.words.find((item) => item.id === wordId);
  wordForm.dataset.editId = word?.id || "";
  document.querySelector("#word-dialog-title").textContent = word ? "단어 수정" : "새 단어 추가";
  document.querySelector("#word-input").value = word?.word || "";
  document.querySelector("#meanings-input").value = word?.meanings.join(", ") || "";
  const partInput = document.querySelector("#part-input");
  if (word?.partOfSpeech && ![...partInput.options].some((option) => option.value === word.partOfSpeech)) partInput.add(new Option(word.partOfSpeech, word.partOfSpeech));
  partInput.value = word?.partOfSpeech || "";
  document.querySelector("#example-input").value = word?.example || "";
  document.querySelector("#translation-input").value = word?.translation || "";
  document.querySelector("#memo-input").value = word?.memo || "";
  document.querySelector("#tags-input").value = word?.tags.join(", ") || "";
  document.querySelector("#word-form-error").textContent = "";
  wordDialog.showModal();
  requestAnimationFrame(() => document.querySelector("#word-input")?.focus());
}

function submitWordForm() {
  const data = new FormData(wordForm);
  const editId = wordForm.dataset.editId;
  const record = normalizeWordRecord({
    word: data.get("word"),
    meanings: String(data.get("meanings") || "").split(/[,;]/),
    partOfSpeech: data.get("partOfSpeech"),
    example: data.get("example"),
    translation: data.get("translation"),
    memo: data.get("memo"),
    tags: String(data.get("tags") || "").split(/[,;]/)
  });
  const errorNode = document.querySelector("#word-form-error");
  if (!record) {
    errorNode.textContent = "영어 단어와 한글 뜻을 모두 입력해 주세요.";
    return;
  }
  const duplicate = state.words.find((word) => word.id !== editId && wordIdentity(word.word) === wordIdentity(record.word));
  if (duplicate) {
    errorNode.textContent = `‘${duplicate.word}’ 단어가 이미 등록되어 있습니다.`;
    return;
  }
  if (editId) {
    state.words = state.words.map((word) => word.id === editId ? { ...word, ...record, aliases: wordIdentity(word.word) === wordIdentity(record.word) ? uniqueStrings([...(word.aliases || []), ...record.aliases]) : record.aliases, id: word.id, correctCount: word.correctCount, wrongCount: word.wrongCount, lastStudiedAt: word.lastStudiedAt, lastWrongAt: word.lastWrongAt, createdAt: word.createdAt, status: word.status } : word);
    showToast("단어를 수정했습니다.", "success");
  } else {
    state.words = [...state.words, record];
    showToast("새 단어를 추가했습니다.", "success");
  }
  saveState();
  wordDialog.close();
  render(false);
}

function submitBulkForm() {
  const source = document.querySelector("#bulk-input").value;
  const parsed = parseBulkLines(source);
  const result = mergeWordCollections(state.words, parsed.records);
  const invalidCount = parsed.invalidCount + result.invalidCount;
  if (result.addedCount === 0 && result.updatedCount === 0) {
    document.querySelector("#bulk-form-error").textContent = invalidCount ? "추가할 수 있는 줄이 없습니다. 입력 형식을 확인해 주세요." : "모든 단어가 이미 등록되어 있습니다.";
    return;
  }
  state.words = result.words;
  saveState();
  bulkDialog.close();
  bulkForm.reset();
  render(false);
  showToast(`${result.addedCount}개 추가 · ${result.updatedCount}개 뜻·메모 보충 · 형식 오류 ${invalidCount}개`, "success");
}

function downloadBlob(contents, type, filename) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

async function importData(file) {
  if (!file) return;
  const importRevision = payloadRevision;
  try {
    const text = await file.text();
    if (importRevision !== payloadRevision) {
      showToast("학습 데이터가 바뀌었어요. 파일을 다시 선택해 주세요.", "error");
      return;
    }
    let records;
    let fullBackup = null;
    if (file.name.toLocaleLowerCase().endsWith(".csv")) records = csvToWordRecords(text);
    else {
      const parsed = JSON.parse(text);
      fullBackup = !Array.isArray(parsed) && Array.isArray(parsed?.words) ? upgradeState(parsed)?.state ?? null : null;
      if (!Array.isArray(parsed) && Array.isArray(parsed?.words) && !fullBackup) throw new Error("백업 형식이 손상되었거나 더 새로운 앱 버전의 파일입니다. 기존 단어장은 변경하지 않았어요.");
      if (fullBackup) {
        if (!confirm(`JSON 전체 백업입니다.\n\n현재 단어 ${state.words.length}개와 학습 기록을 백업 내용으로 바꿀까요?`)) return;
        state = fullBackup;
        studySession = null;
        quizSession = null;
        storageBlocked = false;
        loaded.error = false;
        storageNotice = "";
        saveState();
        render();
        showToast(`전체 백업을 복원했습니다. 단어 ${state.words.length}개`, "success");
        return;
      }
      records = Array.isArray(parsed) ? parsed : parsed?.words;
      if (!Array.isArray(records)) throw new Error("JSON 안에서 단어 목록을 찾을 수 없습니다.");
    }
    const result = mergeWordCollections(state.words, records);
    const summary = `추가 ${result.addedCount}개, 내용 보충 ${result.updatedCount}개, 중복 ${result.duplicateCount}개, 형식 오류 ${result.invalidCount}개`;
    if (result.addedCount === 0 && result.updatedCount === 0) {
      showToast(`가져올 새 단어가 없습니다. ${summary}`, "error");
      return;
    }
    if (!confirm(`${summary}\n\n기존 단어장에 추가하시겠어요?`)) return;
    state.words = result.words;
    saveState();
    render(false);
    showToast(`파일 가져오기 완료 · ${summary}`, "success");
  } catch (error) {
    showToast(error instanceof Error ? error.message : "파일을 읽을 수 없습니다.", "error");
  } finally {
    importFile.value = "";
  }
}

document.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    setView(viewButton.dataset.view);
    return;
  }
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "open-word-dialog") openWordEditor();
  else if (action === "close-word-dialog") wordDialog.close();
  else if (action === "open-bulk-dialog") {
    document.querySelector("#bulk-form-error").textContent = "";
    bulkDialog.showModal();
    requestAnimationFrame(() => document.querySelector("#bulk-input")?.focus());
  }
  else if (action === "close-bulk-dialog") bulkDialog.close();
  else if (action === "edit-word") openWordEditor(button.dataset.wordId);
  else if (action === "delete-word") {
    const word = state.words.find((item) => item.id === button.dataset.wordId);
    if (word && confirm(`‘${word.word}’ 단어와 학습 기록을 삭제할까요?`)) {
      state.words = state.words.filter((item) => item.id !== word.id);
      saveState();
      render(false);
      showToast("단어를 삭제했습니다.");
    }
  }
  else if (action === "reset-word-filters") {
    wordFilters = { search: "", status: "all", tag: "all", mistakes: "all", sort: "alpha", page: 1 };
    rememberStudyTag("all");
    render(false);
  }
  else if (action === "word-page") {
    wordFilters.page = Number(button.dataset.page);
    renderWordbookResults();
    document.querySelector(".toolbar")?.scrollIntoView({ block: "start", behavior: "smooth" });
  }
  else if (action === "reveal-card" && studySession && !studySession.revealed) {
    studySession.revealed = true;
    render();
  }
  else if (action === "rate-card") rateStudy(button.dataset.rating);
  else if (action === "end-study") {
    if (!studySession || confirm("진행 중인 카드 학습을 끝낼까요? 학습한 기록은 저장되어 있습니다.")) {
      studySession = null;
      render();
    }
  }
  else if (action === "restart-study") {
    studySession = null;
    render();
  }
  else if (action === "open-quiz-multiple") {
    quizSession = null;
    quizDefaults = { ...quizDefaults, mode: "multiple", onlyWrong: false, collection: "regular" };
    saveState();
    setView("quiz");
  }
  else if (action === "open-quiz-typing") {
    quizSession = null;
    quizDefaults = { ...quizDefaults, mode: "typing", onlyWrong: false, collection: "regular" };
    saveState();
    setView("quiz");
  }
  else if (action === "toggle-bookmark") toggleBookmark(button.dataset.wordId);
  else if (action === "previous-quiz") previousQuiz();
  else if (action === "previous-study") previousStudy();
  else if (action === "next-study") nextStudy();
  else if (action === "next-batch") nextBatch();
  else if (action === "review-kind") { reviewKind = button.dataset.kind === "starred" ? "starred" : "wrong"; render(false); }
  else if (action === "start-wrong-quiz") {
    const previous = currentView === "study" ? studySession : quizSession;
    const parent = previous && batchSettings(previous, currentView === "study" ? "flashcard" : previous.mode);
    if (previous) quizDefaults = { ...quizDefaults, ...studySettings(previous) };
    const result = beginQuiz({ ...quizDefaults, mode: "multiple", collection: "wrong", onlyWrong: true, minWrong: 1, returnBatchSettings: parent });
    if (result.ok) { currentView = "quiz"; history.replaceState(null, "", "#quiz"); render(false); }
    else showToast(result.error, "error");
  }
  else if (action === "choose-option") selectQuizOption(button.dataset.answer);
  else if (action === "confirm-option" && quizSession && quizSession.queue[quizSession.index]?.selected !== null) submitQuizAnswer(quizSession.queue[quizSession.index].selected);
  else if (action === "next-quiz") nextQuiz();
  else if (action === "end-quiz") {
    if (!quizSession || confirm("진행 중인 퀴즈를 끝낼까요? 이미 푼 단어의 기록은 저장되어 있습니다.")) {
      quizSession = null;
      render();
    }
  }
  else if (action === "restart-quiz") {
    quizSession = null;
    render();
  }
  else if (action === "mistake-filter") {
    mistakeFilter = button.dataset.filter;
    render(false);
  }
  else if (action === "reset-wrong") {
    const word = state.words.find((item) => item.id === button.dataset.wordId);
    if (word && confirm(`‘${word.word}’의 오답 횟수를 0으로 초기화할까요?`)) {
      state.words = state.words.map((item) => item.id === word.id ? { ...item, wrongCount: 0, lastWrongAt: null } : item);
      saveState();
      render(false);
      showToast("오답 횟수를 초기화했습니다.", "success");
    }
  }
  else if (action === "export-json") {
    downloadBlob(JSON.stringify(state, null, 2), "application/json;charset=utf-8", `toeic-pocket-${isoDateKey(new Date())}.json`);
    showToast("JSON 백업을 내려받았습니다.", "success");
  }
  else if (action === "export-csv") {
    downloadBlob(wordsToCsv(state.words), "text/csv;charset=utf-8", `toeic-pocket-${isoDateKey(new Date())}.csv`);
    showToast("CSV 백업을 내려받았습니다.", "success");
  }
  else if (action === "import-data") importFile.click();
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.id === "review-config") {
    const data = new FormData(event.target);
    reviewMinWrong = Math.max(1, Math.floor(Number(data.get("minWrong")) || 1));
    reviewCount = data.get("count") === "all" ? "all" : Number(data.get("count"));
    reviewMode = String(data.get("mode"));
    const settings = { mode: reviewMode, direction: quizDefaults.direction, tag: String(data.get("tag")), count: reviewCount, minWrong: reviewMinWrong, collection: reviewKind };
    const previousView = currentView; currentView = reviewMode === "flashcard" ? "study" : "quiz";
    const ok = reviewMode === "flashcard" ? startStudy(null, settings) : beginQuiz(settings).ok;
    if (!ok) { currentView = previousView; render(false); }
    else history.replaceState(null, "", `#${currentView}`);
  }
  else if (event.target.id === "home-config") startHome(event.target);
  else if (event.target === wordForm) submitWordForm();
  else if (event.target === bulkForm) submitBulkForm();
  else if (event.target.id === "study-config") startStudy(event.target);
  else if (event.target.id === "quiz-config") startQuiz(event.target);
  else if (event.target.id === "typing-form" && !composing) submitQuizAnswer(new FormData(event.target).get("answer"));
});

document.addEventListener("input", (event) => {
  if (event.target.id === "word-search") {
    wordFilters.search = event.target.value;
    wordFilters.page = 1;
    renderWordbookResults();
  }
});

document.addEventListener("change", (event) => {
  if (["status-filter", "tag-filter", "mistake-filter", "sort-filter"].includes(event.target.id)) wordFilters.page = 1;
  if (event.target.id === "status-filter") {
    wordFilters.status = event.target.value;
    renderWordbookResults();
  } else if (event.target.id === "tag-filter") {
    rememberStudyTag(event.target.value);
    renderWordbookResults();
  } else if (event.target.id === "mistake-filter") {
    wordFilters.mistakes = event.target.value;
    renderWordbookResults();
  } else if (event.target.id === "sort-filter") {
    wordFilters.sort = event.target.value;
    renderWordbookResults();
  } else if (event.target.closest?.("#review-config")) {
    const data = new FormData(event.target.closest("#review-config"));
    reviewMinWrong = Math.max(1, Math.floor(Number(data.get("minWrong")) || 1));
    reviewCount = data.get("count") === "all" ? "all" : Number(data.get("count"));
    reviewMode = String(data.get("mode"));
    rememberStudyTag(String(data.get("tag")));
    render(false);
  } else if (event.target.closest?.("#home-config")) {
    const data = new FormData(event.target.closest("#home-config"));
    homeMode = String(data.get("mode"));
    const settings = { direction: String(data.get("direction")), tag: String(data.get("tag")), count: data.get("count") === "all" ? "all" : Number(data.get("count")) };
    if (homeMode === "flashcard") studyDefaults = settings;
    else quizDefaults = { ...settings, mode: homeMode, onlyWrong: false };
    rememberStudyTag(settings.tag);
    if (event.target.name === "mode") render(false);
  } else if (event.target.closest?.("#quiz-config")) {
    const data = new FormData(event.target.closest("#quiz-config"));
    quizDefaults = { mode: String(data.get("mode")), direction: String(data.get("direction")), tag: String(data.get("tag")), onlyWrong: data.get("onlyWrong") === "on", count: String(data.get("count")) === "all" ? "all" : Number(data.get("count")) };
    rememberStudyTag(quizDefaults.tag);
    render(false);
  } else if (event.target.closest?.("#study-config")) {
    const data = new FormData(event.target.closest("#study-config"));
    studyDefaults = { direction: String(data.get("direction")), tag: String(data.get("tag")), count: String(data.get("count")) === "all" ? "all" : Number(data.get("count")) };
    rememberStudyTag(studyDefaults.tag);
  } else if (event.target.matches("[data-status-id]")) {
    state.words = state.words.map((word) => word.id === event.target.dataset.statusId ? { ...word, status: event.target.value } : word);
    saveState();
    render(false);
    showToast("암기 상태를 변경했습니다.", "success");
  }
});

let composing = false;
document.addEventListener("compositionstart", () => { composing = true; });
document.addEventListener("compositionend", () => { composing = false; });
document.addEventListener("keydown", (event) => {
  if (event.isComposing || composing || event.keyCode === 229 || event.repeat || event.ctrlKey || event.metaKey || event.altKey || document.querySelector("dialog[open]")) return;
  const editable = event.target.closest("input, textarea, select, [contenteditable]");
  const current = currentView === "quiz" ? quizSession : currentView === "study" ? studySession : null;
  if (!current) return;
  if (event.shiftKey && event.key === "Enter" && currentView === "quiz" && event.target.id === "typing-answer") { event.preventDefault(); previousQuiz(); return; }
  if (editable) return;
  const wordId = currentView === "quiz" ? current.queue[current.index]?.wordId : current.wordIds[current.index];
  if (!event.shiftKey && event.key === "0" && wordId && (!current.completed || current.reviewing)) { event.preventDefault(); toggleBookmark(wordId); return; }
  if (event.shiftKey && event.key === "Enter") { event.preventDefault(); currentView === "quiz" ? previousQuiz() : previousStudy(); return; }
  if (event.shiftKey) return;
  const control = event.target.closest("button");
  const allowed = !control || ["choose-option", "confirm-option", "next-quiz", "previous-quiz", "toggle-bookmark", "reveal-card", "rate-card", "previous-study", "next-study"].includes(control.dataset.action);
  if (!allowed) return;
  if (currentView === "quiz" && (!current.completed || current.reviewing)) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (current.feedback) nextQuiz();
      else if (current.mode === "multiple" && current.queue[current.index].selected !== null) submitQuizAnswer(current.queue[current.index].selected);
    } else if (current.mode === "multiple" && !current.feedback && /^[1-4]$/.test(event.key)) {
      event.preventDefault(); selectQuizOption(current.queue[current.index].options[Number(event.key)-1]);
    }
  } else if (currentView === "study" && (!current.completed || current.reviewing)) {
    if (event.key === "Enter" && (current.ratings?.[current.index] || current.index < (current.furthestIndex || 0) || current.completed)) { event.preventDefault(); nextStudy(); }
    else if ((event.code === "Space" || event.key === "Enter") && !current.revealed) { event.preventDefault(); current.revealed = true; render(); }
    else if (current.revealed && ["1","2","3"].includes(event.key)) { event.preventDefault(); rateStudy({"1":"unknown","2":"confused","3":"known"}[event.key]); }
  }
});

importFile.addEventListener("change", () => importData(importFile.files?.[0]));

window.addEventListener("hashchange", () => {
  const view = location.hash.slice(1);
  if (validView(view) && view !== currentView) {
    currentView = view;
    render(false);
  }
});

window.addEventListener("storage", (event) => {
  if (studySync?.isAccountActive() || storageBlocked || event.key !== STORAGE_KEY || !event.newValue) return;
  try {
    const next = upgradeState(JSON.parse(event.newValue))?.state;
    if (!next || new Date(next.updatedAt).getTime() <= new Date(state.updatedAt).getTime()) return;
    state = next;
    studySession = validSavedStudy(state.activeStudy) ? state.activeStudy : null;
    quizSession = validSavedQuiz(state.activeQuiz) ? state.activeQuiz : null;
    render(false);
    showToast("다른 탭에서 변경한 내용을 불러왔습니다.");
  } catch {
    showToast("다른 탭의 저장 데이터를 읽지 못했습니다.", "error");
  }
});

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const lifecycle = new AbortController();
  const register = (tool) => {
    try {
      void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch((error) => console.warn("WebMCP tool registration failed", error));
    } catch (error) {
      console.warn("WebMCP tool registration failed", error);
    }
  };
  const assertObject = (input, allowedKeys) => {
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("입력은 객체여야 합니다.");
    const unknown = Object.keys(input).filter((key) => !allowedKeys.includes(key));
    if (unknown.length) throw new Error(`지원하지 않는 입력 항목입니다: ${unknown.join(", ")}`);
  };

  register({
    name: "list_vocabulary",
    title: "단어장 조회",
    description: "현재 토익 단어장에서 검색어, 태그, 암기 상태에 맞는 단어와 학습 횟수를 조회합니다.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        tag: { type: "string" },
        status: { type: "string", enum: ["new", "learning", "mastered"] },
        onlyWrong: { type: "boolean" }
      },
      additionalProperties: false
    },
    annotations: { readOnlyHint: true, untrustedContentHint: true },
    execute(input = {}) {
      assertObject(input, ["query", "tag", "status", "onlyWrong"]);
      if (input.query !== undefined && typeof input.query !== "string") throw new Error("query는 문자열이어야 합니다.");
      if (input.tag !== undefined && typeof input.tag !== "string") throw new Error("tag는 문자열이어야 합니다.");
      if (input.status !== undefined && !WORD_STATUSES.includes(input.status)) throw new Error("status는 new, learning, mastered 중 하나여야 합니다.");
      if (input.onlyWrong !== undefined && typeof input.onlyWrong !== "boolean") throw new Error("onlyWrong은 참 또는 거짓이어야 합니다.");
      const query = normalizeText(input.query || "");
      const words = state.words.filter((word) => {
        const searchable = normalizeText([word.word, ...word.meanings, word.example, ...word.tags].join(" "));
        return (!query || searchable.includes(query))
          && (!input.tag || word.tags.includes(input.tag))
          && (!input.status || word.status === input.status)
          && (!input.onlyWrong || word.wrongCount > 0);
      });
      return { count: words.length, words: words.map((word) => ({ id: word.id, word: word.word, meanings: word.meanings, partOfSpeech: word.partOfSpeech, tags: word.tags, status: word.status, correctCount: word.correctCount, wrongCount: word.wrongCount })) };
    }
  });

  register({
    name: "add_vocabulary_words",
    title: "단어 여러 개 추가",
    description: "영어 단어와 한글 뜻을 단어장에 추가합니다. 같은 단어는 뜻과 메모를 합칩니다.",
    inputSchema: {
      type: "object",
      properties: {
        words: {
          type: "array",
          minItems: 1,
          maxItems: 100,
          items: {
            type: "object",
            properties: {
              word: { type: "string", minLength: 1 },
              meanings: { type: "array", minItems: 1, items: { type: "string", minLength: 1 } },
              partOfSpeech: { type: "string" },
              example: { type: "string" },
              translation: { type: "string" },
              memo: { type: "string" },
              tags: { type: "array", items: { type: "string" } }
            },
            required: ["word", "meanings"],
            additionalProperties: false
          }
        }
      },
      required: ["words"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: false, untrustedContentHint: true },
    execute(input) {
      assertObject(input, ["words"]);
      if (!Array.isArray(input.words) || input.words.length < 1 || input.words.length > 100) throw new Error("words에는 1개 이상 100개 이하의 단어가 필요합니다.");
      const allowedWordKeys = ["word", "meanings", "partOfSpeech", "example", "translation", "memo", "tags"];
      input.words.forEach((word, index) => {
        assertObject(word, allowedWordKeys);
        if (typeof word.word !== "string" || !word.word.trim()) throw new Error(`${index + 1}번째 word가 비어 있습니다.`);
        if (!Array.isArray(word.meanings) || word.meanings.length === 0 || word.meanings.some((meaning) => typeof meaning !== "string" || !meaning.trim())) throw new Error(`${index + 1}번째 meanings가 올바르지 않습니다.`);
        for (const key of ["partOfSpeech", "example", "translation", "memo"]) if (word[key] !== undefined && typeof word[key] !== "string") throw new Error(`${index + 1}번째 ${key}는 문자열이어야 합니다.`);
        if (word.tags !== undefined && (!Array.isArray(word.tags) || word.tags.some((tag) => typeof tag !== "string"))) throw new Error(`${index + 1}번째 tags가 올바르지 않습니다.`);
      });
      const result = mergeWordCollections(state.words, input.words);
      if (result.addedCount === 0 && result.updatedCount === 0) return { addedCount: 0, updatedCount: 0, duplicateCount: result.duplicateCount, totalWords: state.words.length };
      state.words = result.words;
      saveState();
      currentView = "wordbook";
      history.replaceState(null, "", "#wordbook");
      render();
      showToast(`${result.addedCount}개 추가 · ${result.updatedCount}개 뜻·메모 보충`, "success");
      return { addedCount: result.addedCount, updatedCount: result.updatedCount, duplicateCount: result.duplicateCount, invalidCount: result.invalidCount, totalWords: state.words.length };
    }
  });

  register({
    name: "start_vocabulary_quiz",
    title: "단어 퀴즈 시작",
    description: "현재 단어장에서 객관식 또는 직접 입력 퀴즈를 바로 시작하고 퀴즈 화면을 엽니다.",
    inputSchema: {
      type: "object",
      properties: {
        mode: { type: "string", enum: ["multiple", "typing"] },
        direction: { type: "string", enum: ["word-to-meaning", "meaning-to-word"] },
        count: { oneOf: [{ type: "integer", minimum: 1, maximum: 50 }, { type: "string", const: "all" }] },
        tag: { type: "string" },
        onlyWrong: { type: "boolean" }
      },
      required: ["mode", "direction", "count"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      assertObject(input, ["mode", "direction", "count", "tag", "onlyWrong"]);
      if (input.count !== "all" && (!Number.isInteger(input.count) || input.count < 1 || input.count > 50)) throw new Error("문제 수는 1부터 50 사이의 정수 또는 all이어야 합니다.");
      if (!["multiple", "typing"].includes(input.mode)) throw new Error("mode는 multiple 또는 typing이어야 합니다.");
      if (!["word-to-meaning", "meaning-to-word"].includes(input.direction)) throw new Error("direction이 올바르지 않습니다.");
      if (input.tag !== undefined && typeof input.tag !== "string") throw new Error("tag는 문자열이어야 합니다.");
      if (input.onlyWrong !== undefined && typeof input.onlyWrong !== "boolean") throw new Error("onlyWrong은 참 또는 거짓이어야 합니다.");
      const previousView = currentView;
      currentView = "quiz";
      history.replaceState(null, "", "#quiz");
      const result = beginQuiz({ mode: input.mode, direction: input.direction, count: input.count, tag: input.tag || "all", onlyWrong: Boolean(input.onlyWrong) });
      if (!result.ok) {
        currentView = previousView;
        history.replaceState(null, "", `#${previousView}`);
        throw new Error(result.error);
      }
      return { started: true, ...result };
    }
  });
}

render(false);
registerWebMcpTools();
if (storageNotice) requestAnimationFrame(() => showToast(storageNotice, storageNoticeTone));
void connectVocabularySync();
