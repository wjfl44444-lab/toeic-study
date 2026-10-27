import { handwrittenWordTemplates } from "./handwritten-words.js";
import { lessonWordTemplates } from "./lesson-words.js";
import { octoberWordTemplates } from "./lesson-words-1001.js";

export const STORAGE_KEY = "toeic-pocket-state-v1";
export const STORAGE_VERSION = 5;
export const WORD_STATUSES = ["new", "learning", "mastered"];

const seedWordTemplates = [
  { id: "appointment", word: "appointment", meanings: ["약속", "예약"], partOfSpeech: "명사", example: "Please confirm your appointment by Friday.", translation: "금요일까지 예약을 확인해 주세요.", memo: "시간을 정해 둔 약속", tags: ["일정", "기초"] },
  { id: "available", word: "available", meanings: ["이용 가능한", "시간이 되는"], partOfSpeech: "형용사", example: "The conference room is available after 2 p.m.", translation: "회의실은 오후 2시 이후에 이용할 수 있습니다.", memo: "쓸 수 있거나 시간이 되는 상태", tags: ["회의", "기초"] },
  { id: "approve", word: "approve", meanings: ["승인하다", "찬성하다"], partOfSpeech: "동사", example: "The manager approved the new budget yesterday.", translation: "관리자는 어제 새 예산을 승인했습니다.", memo: "공식적으로 OK를 주다", tags: ["결재", "업무"] },
  { id: "attend", word: "attend", meanings: ["참석하다", "출석하다"], partOfSpeech: "동사", example: "All employees must attend the safety workshop.", translation: "모든 직원은 안전 교육에 참석해야 합니다.", memo: "행사나 회의에 가서 함께하다", tags: ["회의", "교육"] },
  { id: "cancel", word: "cancel", meanings: ["취소하다"], partOfSpeech: "동사", example: "The airline canceled the morning flight because of the storm.", translation: "항공사는 폭풍 때문에 오전 항공편을 취소했습니다.", memo: "잡힌 계획을 없애다", tags: ["여행", "일정"] },
  { id: "deadline", word: "deadline", meanings: ["마감일", "마감 시한"], partOfSpeech: "명사", example: "The deadline for the application is September 30.", translation: "지원서 제출 마감일은 9월 30일입니다.", memo: "반드시 지켜야 하는 마지막 날짜", tags: ["일정", "채용"] },
  { id: "department", word: "department", meanings: ["부서", "학과"], partOfSpeech: "명사", example: "Please send the document to the accounting department.", translation: "그 서류를 회계 부서로 보내 주세요.", memo: "회사 안에서 업무별로 나뉜 조직", tags: ["회사", "조직"] },
  { id: "discount", word: "discount", meanings: ["할인", "할인액"], partOfSpeech: "명사", example: "Customers receive a ten percent discount on online orders.", translation: "고객들은 온라인 주문 시 10퍼센트 할인을 받습니다.", memo: "원래 가격에서 깎아 주는 금액", tags: ["쇼핑", "가격"] },
  { id: "equipment", word: "equipment", meanings: ["장비", "설비"], partOfSpeech: "명사", example: "The technician inspected all the office equipment.", translation: "기술자가 모든 사무 장비를 점검했습니다.", memo: "equipment는 셀 수 없는 명사", tags: ["사무", "시설"] },
  { id: "invoice", word: "invoice", meanings: ["송장", "청구서"], partOfSpeech: "명사", example: "The supplier emailed the invoice to our accounting team.", translation: "공급업체가 우리 회계팀에 청구서를 이메일로 보냈습니다.", memo: "물건값을 청구하는 거래 문서", tags: ["회계", "거래"] },
  { id: "maintain", word: "maintain", meanings: ["유지하다", "관리하다"], partOfSpeech: "동사", example: "The company regularly maintains its delivery vehicles.", translation: "그 회사는 배송 차량을 정기적으로 관리합니다.", memo: "좋은 상태가 계속되게 관리하다", tags: ["관리", "운송"] },
  { id: "notify", word: "notify", meanings: ["알리다", "통지하다"], partOfSpeech: "동사", example: "We will notify applicants of the results by email.", translation: "저희는 지원자들에게 결과를 이메일로 알려 드릴 것입니다.", memo: "중요한 정보를 공식적으로 알리다", tags: ["연락", "채용"] },
  { id: "purchase", word: "purchase", meanings: ["구매하다", "구입하다"], partOfSpeech: "동사", example: "The hotel purchased new furniture for its lobby.", translation: "그 호텔은 로비에 둘 새 가구를 구매했습니다.", memo: "buy보다 격식 있는 구매 표현", tags: ["구매", "비즈니스"] },
  { id: "receipt", word: "receipt", meanings: ["영수증", "수령"], partOfSpeech: "명사", example: "Keep the receipt in case you need a refund.", translation: "환불이 필요할 경우를 대비해 영수증을 보관하세요.", memo: "결제했다는 증거 종이", tags: ["결제", "쇼핑"] },
  { id: "require", word: "require", meanings: ["요구하다", "필요로 하다"], partOfSpeech: "동사", example: "This position requires at least two years of experience.", translation: "이 직책은 최소 2년의 경력을 요구합니다.", memo: "조건으로 꼭 필요하다고 요구하다", tags: ["채용", "조건"] },
  { id: "schedule", word: "schedule", meanings: ["일정", "시간표"], partOfSpeech: "명사", example: "The updated training schedule is posted on the notice board.", translation: "수정된 교육 일정이 게시판에 게시되어 있습니다.", memo: "시간순으로 정리한 계획표", tags: ["일정", "교육"] },
  { id: "shipment", word: "shipment", meanings: ["배송품", "선적 화물"], partOfSpeech: "명사", example: "The shipment will arrive at the warehouse on Monday.", translation: "배송품은 월요일에 창고에 도착할 예정입니다.", memo: "한 번에 보내지는 물품", tags: ["배송", "물류"] },
  { id: "submit", word: "submit", meanings: ["제출하다"], partOfSpeech: "동사", example: "Employees must submit their expense reports by Monday.", translation: "직원들은 월요일까지 경비 보고서를 제출해야 합니다.", memo: "서류를 담당자에게 내다", tags: ["서류", "업무"] },
  { id: "vacancy", word: "vacancy", meanings: ["공석", "빈자리"], partOfSpeech: "명사", example: "The company has a vacancy in its marketing department.", translation: "그 회사의 마케팅 부서에 공석이 하나 있습니다.", memo: "사람을 새로 뽑아야 하는 빈자리", tags: ["채용", "회사"] },
  { id: "warranty", word: "warranty", meanings: ["보증", "품질 보증서"], partOfSpeech: "명사", example: "The printer comes with a two-year warranty.", translation: "그 프린터에는 2년 보증이 제공됩니다.", memo: "고장이나 결함에 대한 제품 보증", tags: ["제품", "서비스"] }
];

export function createId(prefix = "word") {
  if (globalThis.crypto?.randomUUID) return `${prefix}-${globalThis.crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function normalizeText(value) {
  return String(value ?? "").normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US");
}

export function normalizeAnswer(value) {
  return normalizeText(value).replace(/^[~∼〜.,!?;:'"“”‘’()\[\]{}]+|[.,!?;:'"“”‘’()\[\]{}]+$/g, "").trim();
}

const wordAliases = {
  "small to medium enterprise": "small and medium enterprise",
  "pride onself on": "pride oneself on",
  "commercial distric": "commercial district",
  "enviromental": "environmental"
};
export function wordIdentity(value) {
  const key = normalizeText(value).replace(/[‐‑–—]/g, "-").replace(/[’‘]/g, "'");
  return wordAliases[key] || key;
}

export function uniqueStrings(values) {
  const seen = new Set();
  return (Array.isArray(values) ? values : []).map((value) => String(value ?? "").trim()).filter((value) => {
    const key = normalizeText(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function listFrom(value) {
  if (Array.isArray(value)) return uniqueStrings(value);
  return uniqueStrings(String(value ?? "").split(/[,;|]/));
}

function finiteCount(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : 0;
}

export function normalizeWordRecord(raw, now = new Date().toISOString()) {
  if (!raw || typeof raw !== "object") return null;
  const originalWord = String(raw.word ?? "").normalize("NFKC").trim().replace(/\s+/g, " ");
  const word = wordAliases[normalizeText(originalWord)] || originalWord;
  const meanings = listFrom(raw.meanings ?? raw.meaning);
  if (!word || meanings.length === 0) return null;
  const status = WORD_STATUSES.includes(raw.status) ? raw.status : "new";
  return {
    id: String(raw.id || createId("word")),
    word,
    meanings,
    partOfSpeech: String(raw.partOfSpeech ?? raw.part_of_speech ?? "").trim(),
    example: String(raw.example ?? "").trim(),
    translation: String(raw.translation ?? "").trim(),
    memo: String(raw.memo ?? "").trim(),
    tags: listFrom(raw.tags),
    aliases: uniqueStrings([...(Array.isArray(raw.aliases) ? raw.aliases : []), ...(word !== originalWord ? [originalWord] : [])]),
    status,
    correctCount: finiteCount(raw.correctCount ?? raw.correct_count),
    wrongCount: finiteCount(raw.wrongCount ?? raw.wrong_count),
    lastStudiedAt: raw.lastStudiedAt ?? raw.last_studied_at ?? null,
    lastWrongAt: raw.lastWrongAt ?? raw.last_wrong_at ?? null,
    createdAt: raw.createdAt ?? raw.created_at ?? now
  };
}

export function createSeedWords(now = new Date().toISOString()) {
  return seedWordTemplates.map((word) => normalizeWordRecord({
    ...word,
    status: "new",
    correctCount: 0,
    wrongCount: 0,
    lastStudiedAt: null,
    lastWrongAt: null,
    createdAt: now
  }, now));
}

export function createHandwrittenWords(now = new Date().toISOString()) {
  return handwrittenWordTemplates.map((word) => normalizeWordRecord({
    ...word,
    status: "new",
    correctCount: 0,
    wrongCount: 0,
    lastStudiedAt: null,
    lastWrongAt: null,
    createdAt: now
  }, now));
}

export function createInitialState(now = new Date().toISOString()) {
  return {
    version: STORAGE_VERSION,
    words: mergeWordCollections(createHandwrittenWords(now), [...lessonWordTemplates, ...octoberWordTemplates], now).words,
    sessions: [],
    updatedAt: now
  };
}

export function normalizeState(raw, now = new Date().toISOString()) {
  if (!raw || typeof raw !== "object" || !Array.isArray(raw.words)) return null;
  if (Number(raw.version) > STORAGE_VERSION) return null;
  const words = raw.words.map((word) => normalizeWordRecord(word, now)).filter(Boolean);
  if (words.length !== raw.words.length) return null;
  const sessions = Array.isArray(raw.sessions) ? raw.sessions.filter((session) => session && typeof session === "object").slice(-80) : [];
  return { version: STORAGE_VERSION, words, sessions, activeStudy: raw.activeStudy || null, activeQuiz: raw.activeQuiz || null, updatedAt: raw.updatedAt || now };
}

export function mergeWordCollections(existing, incoming, now = new Date().toISOString()) {
  const words = [];
  const known = new Map();
  const ids = new Set();
  const idMap = {};
  let addedCount = 0;
  let duplicateCount = 0;
  let updatedCount = 0;
  let invalidCount = 0;
  for (const [index, raw] of [...existing, ...incoming].entries()) {
    const word = normalizeWordRecord(raw, now);
    if (!word) {
      invalidCount += 1;
      continue;
    }
    const key = wordIdentity(word.word);
    if (known.has(key)) {
      duplicateCount += 1;
      const position = known.get(key);
      const prior = words[position];
      const latest = (a, b) => Date.parse(b || "") > Date.parse(a || "") || !a ? b : a;
      const merged = {
        ...prior,
        meanings: uniqueStrings([...prior.meanings, ...word.meanings]),
        tags: uniqueStrings([...prior.tags, ...word.tags]),
        aliases: uniqueStrings([...prior.aliases, ...word.aliases, ...(prior.word !== word.word ? [word.word] : [])]),
        partOfSpeech: uniqueStrings([...prior.partOfSpeech.split("·"), ...word.partOfSpeech.split("·")]).join("·"),
        memo: uniqueStrings([...prior.memo.split("\n"), ...word.memo.split("\n")]).join("\n"),
        example: prior.example || word.example,
        translation: prior.example ? prior.translation : word.translation,
        correctCount: Math.max(prior.correctCount, word.correctCount),
        wrongCount: Math.max(prior.wrongCount, word.wrongCount),
        lastStudiedAt: latest(prior.lastStudiedAt, word.lastStudiedAt),
        lastWrongAt: latest(prior.lastWrongAt, word.lastWrongAt)
      };
      if (Date.parse(word.lastStudiedAt || "") > Date.parse(prior.lastStudiedAt || "") || (prior.status === "new" && word.status !== "new")) merged.status = word.status;
      if (JSON.stringify(merged) !== JSON.stringify(prior)) updatedCount += 1;
      words[position] = merged;
      if (word.id !== prior.id) idMap[word.id] = prior.id;
      continue;
    }
    if (ids.has(word.id)) word.id = createId("word");
    ids.add(word.id);
    known.set(key, words.length);
    words.push(word);
    if (index >= existing.length) addedCount += 1;
  }
  return { words, addedCount, duplicateCount, updatedCount, invalidCount, idMap };
}

export function upgradeState(raw, now = new Date().toISOString()) {
  const sourceVersion = Number(raw?.version) || 1;
  const state = normalizeState(raw, now);
  if (!state) return null;
  let words = state.words;
  let sessions = state.sessions;
  let addedCount = 0;
  let duplicateCount = 0;
  let invalidCount = 0;
  let removedCount = 0;
  if (sourceVersion < 3) {
    const legacySeedById = new Map(seedWordTemplates.map((word) => [word.id, normalizeText(word.word)]));
    const removedIds = new Set();
    const kept = words.filter((word) => {
      const legacyWord = legacySeedById.get(word.id);
      const shouldRemove = Boolean(legacyWord && legacyWord === normalizeText(word.word));
      if (shouldRemove) removedIds.add(word.id);
      return !shouldRemove;
    });
    removedCount = words.length - kept.length;
    words = kept;
    if (removedIds.size > 0) {
      sessions = sessions.map((session) => Array.isArray(session.wrongWordIds)
        ? { ...session, wrongWordIds: session.wrongWordIds.filter((id) => !removedIds.has(id)) }
        : session);
    }
  }
  if (sourceVersion < 2) {
    const merged = mergeWordCollections(words, createHandwrittenWords(now), now);
    words = merged.words;
    addedCount = merged.addedCount;
    duplicateCount = merged.duplicateCount;
    invalidCount = merged.invalidCount;
  }
  const consolidated = mergeWordCollections(words, [
    ...(sourceVersion < 4 ? lessonWordTemplates : []),
    ...(sourceVersion < 5 ? octoberWordTemplates : [])
  ], now);
  words = consolidated.words;
  addedCount += consolidated.addedCount;
  duplicateCount += consolidated.duplicateCount;
  sessions = sessions.map((session) => Array.isArray(session.wrongWordIds)
    ? { ...session, wrongWordIds: uniqueStrings(session.wrongWordIds.map((id) => consolidated.idMap[id] || id)) }
    : session);
  const migrated = sourceVersion < STORAGE_VERSION || JSON.stringify(state.words) !== JSON.stringify(words);
  return {
    state: { ...state, version: STORAGE_VERSION, words, sessions, activeStudy: sourceVersion < 4 ? null : state.activeStudy, activeQuiz: sourceVersion < 4 ? null : state.activeQuiz, updatedAt: migrated ? now : state.updatedAt },
    migrated,
    addedCount,
    removedCount,
    duplicateCount,
    updatedCount: consolidated.updatedCount,
    invalidCount
  };
}

export function answerIsCorrect(word, direction, answer) {
  const normalized = normalizeAnswer(answer);
  if (!normalized) return false;
  if (direction === "meaning-to-word") return [word.word, ...(word.aliases || [])].some((value) => normalized === normalizeAnswer(value));
  const koreanKey = (value) => normalizeAnswer(value).replace(/\s+/g, "");
  return word.meanings.some((meaning) => koreanKey(answer) === koreanKey(meaning));
}

export function getPrompt(word, direction) {
  return direction === "meaning-to-word" ? word.meanings.join(", ") : word.word;
}

export function getAnswerLabel(word, direction) {
  return direction === "meaning-to-word" ? word.word : word.meanings.join(", ");
}

export function filterWords(words, { tag = "all", onlyWrong = false } = {}) {
  return words.filter((word) => (tag === "all" || word.tags.includes(tag)) && (!onlyWrong || word.wrongCount > 0));
}

function daysSince(value, now = Date.now()) {
  if (!value) return Number.POSITIVE_INFINITY;
  const time = new Date(value).getTime();
  if (!Number.isFinite(time)) return Number.POSITIVE_INFINITY;
  return Math.max(0, (now - time) / 86_400_000);
}

export function wordPriority(word, now = Date.now()) {
  let weight = 1 + Math.min(12, word.wrongCount * 2.2);
  if (word.correctCount + word.wrongCount === 0) weight += 4;
  if (word.status === "learning") weight += 2;
  if (word.status === "mastered") weight *= 0.35;
  const wrongAge = daysSince(word.lastWrongAt, now);
  if (wrongAge <= 1) weight += 5;
  else if (wrongAge <= 7) weight += 2;
  const studyAge = daysSince(word.lastStudiedAt, now);
  if (studyAge > 14) weight += 1.5;
  return Math.max(0.2, weight);
}

export function selectWeightedWords(words, count, options = {}) {
  const random = options.random ?? Math.random;
  const pool = filterWords(words, options);
  const safeCount = Math.max(1, Math.min(Number(count) || 10, pool.length));
  return pool.map((word) => {
    const randomValue = Math.max(Number.EPSILON, Math.min(1 - Number.EPSILON, random()));
    return { word, key: Math.pow(randomValue, 1 / wordPriority(word, options.now ?? Date.now())) };
  }).sort((a, b) => b.key - a.key).slice(0, safeCount).map(({ word }) => word);
}

export function shuffled(values, random = Math.random) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

// Compare complete sets, not substrings: 부사 must not match 명사, and 명사·동사
// must not be matched with a noun-only answer that gives away the question.
export function quizPartKey(word) {
  const aliases = { "복합명사": "명사", "명사구": "명사", "동사구": "동사", "부사구": "부사", "접속부사": "부사", "전치사구": "전치사", "접속표현": "접속사" };
  const parts = uniqueStrings(String(word.partOfSpeech || "").split(/[·,/]/).map((part) => part.replace(/\s+/g, "")).map((part) => aliases[part] || part));
  if (!parts.length || parts.includes("기타")) return "";
  // Phrases were entered as 숙어/관용 표현/구문. Compare the displayed Korean
  // answer forms too, rather than mixing '할당하다' and '미리' as distractors.
  if (parts.some((part) => ["숙어", "관용표현", "구문"].includes(part))) {
    const forms = uniqueStrings(word.meanings.map((meaning) => {
      const text = meaning.trim();
      if (/다$/.test(text)) return "동사형";
      if (/(한|된|는|의)$/.test(text)) return "수식형";
      return "기타표현";
    }));
    return `표현:${forms.sort().join("·")}`;
  }
  return parts.sort().join("·");
}

export function buildQuizOptions(target, allWords, direction, random = Math.random) {
  const correct = getAnswerLabel(target, direction);
  const targetKey = normalizeText(correct);
  const partKey = quizPartKey(target);
  const samePart = partKey ? allWords.filter((word) => word.id !== target.id && wordIdentity(word.word) !== wordIdentity(target.word) && quizPartKey(word) === partKey) : [];
  const seen = new Set([targetKey]);
  const distractors = [];
  const targetMeanings = new Set(target.meanings.map((meaning) => normalizeAnswer(meaning).replace(/\s+/g, "")));
  // Prefer a similar number of meanings so answer length is less of a hint.
  const candidates = shuffled(samePart, random).sort((a, b) => Math.abs(a.meanings.length - target.meanings.length) - Math.abs(b.meanings.length - target.meanings.length));
  for (const candidate of candidates) {
    // Synonyms such as inform/notify must not both be offered as different answers.
    if (candidate.meanings.some((meaning) => targetMeanings.has(normalizeAnswer(meaning).replace(/\s+/g, "")))) continue;
    const label = getAnswerLabel(candidate, direction);
    const key = normalizeText(label);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    distractors.push(label);
    if (distractors.length === 3) break;
  }
  return shuffled([correct, ...distractors], random);
}

export function insertRetry(queue, currentIndex, question, gap = 3) {
  const result = [...queue];
  const targetIndex = Math.min(result.length, currentIndex + Math.max(1, gap) + 1);
  result.splice(targetIndex, 0, question);
  return result;
}

export function isoDateKey(value) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function calculateRecentAccuracy(sessions) {
  const recent = sessions.filter((session) => session.mode === "multiple" || session.mode === "typing").slice(-10);
  const total = recent.reduce((sum, session) => sum + finiteCount(session.total), 0);
  const correct = recent.reduce((sum, session) => sum + finiteCount(session.correct), 0);
  return total === 0 ? null : Math.round((correct / total) * 100);
}

export function computeDashboardStats(state, now = new Date()) {
  const today = isoDateKey(now);
  return {
    total: state.words.length,
    studiedToday: state.words.filter((word) => isoDateKey(word.lastStudiedAt) === today).length,
    mastered: state.words.filter((word) => word.status === "mastered").length,
    mistakes: state.words.filter((word) => word.wrongCount > 0).length,
    recentAccuracy: calculateRecentAccuracy(state.sessions)
  };
}

function csvCell(value) {
  let text = String(value ?? "");
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export const CSV_HEADERS = ["word", "meanings", "partOfSpeech", "example", "translation", "memo", "tags", "status", "correctCount", "wrongCount", "lastStudiedAt", "lastWrongAt", "createdAt"];

export function wordsToCsv(words) {
  const rows = words.map((word) => [
    word.word,
    word.meanings.join("; "),
    word.partOfSpeech,
    word.example,
    word.translation,
    word.memo,
    word.tags.join("; "),
    word.status,
    word.correctCount,
    word.wrongCount,
    word.lastStudiedAt || "",
    word.lastWrongAt || "",
    word.createdAt || ""
  ].map(csvCell).join(","));
  return `\uFEFF${CSV_HEADERS.map(csvCell).join(",")}\r\n${rows.join("\r\n")}`;
}

export function parseCsv(text) {
  const source = String(text ?? "").replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }
  if (quoted) throw new Error("따옴표가 닫히지 않은 CSV 파일입니다.");
  row.push(field.replace(/\r$/, ""));
  if (row.some((cell) => cell.trim())) rows.push(row);
  return rows;
}

export function csvToWordRecords(text) {
  const rows = parseCsv(text);
  if (rows.length === 0) throw new Error("내용이 없는 CSV 파일입니다.");
  const headers = rows[0].map((header) => normalizeText(header));
  const wordIndex = headers.indexOf("word");
  const meaningsIndex = headers.indexOf("meanings");
  if (wordIndex < 0 || meaningsIndex < 0) throw new Error("CSV에 word와 meanings 열이 필요합니다.");
  const indexOf = (name) => headers.indexOf(normalizeText(name));
  return rows.slice(1).map((cells) => {
    const get = (name) => {
      const index = indexOf(name);
      const value = index >= 0 ? String(cells[index] ?? "") : "";
      return value.startsWith("'") && /^[=+\-@]/.test(value.slice(1)) ? value.slice(1) : value;
    };
    return {
      word: cells[wordIndex] ?? "",
      meanings: cells[meaningsIndex] ?? "",
      partOfSpeech: get("partOfSpeech"),
      example: get("example"),
      translation: get("translation"),
      memo: get("memo"),
      tags: get("tags"),
      status: get("status"),
      correctCount: get("correctCount"),
      wrongCount: get("wrongCount"),
      lastStudiedAt: get("lastStudiedAt") || null,
      lastWrongAt: get("lastWrongAt") || null,
      createdAt: get("createdAt") || undefined
    };
  });
}

export function parseBulkLines(text) {
  const records = [];
  let invalidCount = 0;
  for (const rawLine of String(text ?? "").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    const cells = line.includes("\t") ? line.split("\t") : line.includes("|") ? line.split("|") : line.split(/\s*[:：]\s*/, 2);
    const [word, meanings, partOfSpeech = "", example = "", translation = "", tags = ""] = cells.map((value) => value.trim());
    if (!word || !meanings) {
      invalidCount += 1;
      continue;
    }
    records.push({ word, meanings, partOfSpeech, example, translation, tags });
  }
  return { records, invalidCount };
}

export function statusLabel(status) {
  return { new: "학습 전", learning: "학습 중", mastered: "암기 완료" }[status] || "학습 전";
}
