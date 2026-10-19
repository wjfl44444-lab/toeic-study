(function () {
  "use strict";

  var data = window.POWER_VOCA_SAMPLE;
  var practice = window.POWER_VOCA_PRACTICE;
  var hardPractice = window.POWER_VOCA_HARD_PRACTICE;
  var practiceVersion = "20261019-hard2";
  var previousPracticeVersion = "20261019-linked1";
  var legacyGatedVersion = "20261019-gated-legacy1";
  var session = null;
  var storageKey = "power-voca-full-v1";
  var history = Object.create(null);
  var questionMap = new Map();
  var signatures = new Map();
  var storageWarning = "";
  var connectionWarning = "";
  var studySync = null;
  var syncModel = window.PowerVocaSyncModel || null;
  var syncReceipts = null;
  var archivedHistory = [];
  var unavailableSession = null;
  var view = "loading";
  var applyingPayload = false;
  var unreadableOriginal = null;
  var originalBackupKey = storageKey + ":unreadable-backup:" + Date.now();
  var accountEpoch = 0;
  var letters = ["A", "B", "C", "D"];
  var views = ["loading", "error", "start", "quiz", "results"];
  // Textbook contents, grouped without changing question data or saved signatures.
  // Keep the existing settings.step field so older records and backups still load.
  var textbookScopes = [
    { id: "verb-noun", label: "동사 + 명사", steps: [1, 2, 3] },
    { id: "adj-noun", label: "형용사 + 명사", steps: [4] },
    { id: "adv-verb", label: "부사 + 동사", steps: [5, 6] },
    { id: "adv-adj", label: "부사 + 형용사", steps: [7] },
    { id: "verb-prep", label: "동사 + 전치사", steps: [8, 9] },
    { id: "prep-noun", label: "전치사 + 명사", steps: [10, 11] },
    { id: "noun-prep", label: "명사 + 전치사", steps: [12] },
    { id: "adj-prep", label: "형용사 + 전치사", steps: [13, 14] },
    { id: "multi-pos", label: "다품사 어휘", steps: [15, 16, 17] },
    { id: "polysemy", label: "다의어", steps: [18, 19] },
    { id: "compound-nouns", label: "복합 명사", steps: [20] },
    { id: "verb-patterns", label: "혼동 문법 · to부정사·동명사", steps: [21] },
    { id: "lc-vocabulary", label: "LC 빈출 어휘 · PART 1~4", steps: [22, 23, 24] },
    { id: "rc-vocabulary", label: "RC 빈출 어휘 · PART 7", steps: [25, 26, 27] },
    { id: "paraphrasing", label: "어휘 재표현 · 패러프레이징", steps: [28, 29, 30] }
  ];
  var scopeByStep = Object.create(null);
  textbookScopes.forEach(function (scope) {
    scope.steps.forEach(function (step) { scopeByStep[String(step)] = scope.id; });
  });

  function el(id) { return document.getElementById(id); }
  function text(id, value) { el(id).textContent = value; }
  function announce(message) { text("live-status", message); }
  function node(tag, className, value) {
    var result = document.createElement(tag);
    if (className) { result.className = className; }
    if (value != null) { result.textContent = value; }
    return result;
  }
  function showView(name) {
    view = name;
    views.forEach(function (view) { el(view + "-view").hidden = view !== name; });
    el("home-button").hidden = name === "start" || name === "error" || name === "loading";
  }
  function focusHeading(id) {
    el(id).focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  function shuffled(items) {
    var copy = items.slice();
    for (var i = copy.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i]; copy[i] = copy[j]; copy[j] = temp;
    }
    return copy;
  }
  function fingerprint(value) {
    var valueText = JSON.stringify(value), hash = 2166136261;
    for (var i = 0; i < valueText.length; i += 1) { hash = Math.imul(hash ^ valueText.charCodeAt(i), 16777619); }
    return (hash >>> 0).toString(36);
  }
  function reportStorage(message) {
    storageWarning = message;
    text("storage-status", message || connectionWarning);
    text("record-state", message ? "기록 저장 상태 확인" : connectionWarning ? "기기 저장만 사용 중" : studySync && studySync.isAccountActive() ? "Google 계정에 학습 기록 연결" : "이 브라우저에 기록 저장");
  }
  function serializedSession() {
    if (!session) { return unavailableSession; }
    var saved = { mode: session.mode, index: session.index, startedAt: session.startedAt,
      cards: session.cards.map(function (card) {
        return { id: card.question.id, signature: signatures.get(card.question.id),
          stageIndex: card.stageIndex, graded: card.graded, deferred: card.deferred,
          stages: card.stages.map(function (stage) {
            return { selected: stage.selected, order: stage.choices.map(function (choice) { return choice.originalIndex; }) };
          }) };
      }) };
    if (session.practiceVersion) { saved.practiceVersion = session.practiceVersion; }
    return saved;
  }
  function currentSettings() {
    return { roundSize: el("round-size").value, step: el("step-filter").value,
      shuffleQuestions: el("shuffle-questions").checked, shuffleOptions: el("shuffle-options").checked };
  }
  function currentPayload(compact) {
    var saved = { version: 1, session: serializedSession(), history: history, settings: currentSettings() };
    if (archivedHistory.length) { saved.archivedHistory = archivedHistory; }
    if (syncReceipts) { saved._studySync = syncReceipts; }
    return syncModel ? syncModel.stringify(saved, compact) : JSON.stringify(saved);
  }
  function preserveOriginal() {
    if (unreadableOriginal === null) { return true; }
    try {
      window.localStorage.setItem(originalBackupKey, unreadableOriginal);
      if (window.localStorage.getItem(originalBackupKey) !== unreadableOriginal) { return false; }
      unreadableOriginal = null;
      return true;
    } catch (_) { return false; }
  }
  function saveState() {
    if (applyingPayload) { return; }
    try {
      if (!preserveOriginal()) { throw new Error("Original guest record cannot be backed up"); }
      var raw = currentPayload(Boolean(studySync));
      if (studySync) {
        if (!studySync.saveLocal(raw)) { throw new Error("Local account save failed"); }
      } else { window.localStorage.setItem(storageKey, raw); }
      if (storageWarning) { reportStorage(""); }
      return true;
    } catch (error) {
      reportStorage("이 브라우저에서 기록을 저장하지 못했어요. 현재 창에서는 계속 풀 수 있지만, 새로고침하면 최근 풀이가 사라질 수 있어요.");
      return false;
    }
  }
  function restoreSession(saved) {
    if (!saved || !Array.isArray(saved.cards) || !saved.cards.length || saved.cards.length > data.questions.length ||
        !Number.isInteger(saved.index) || saved.index < 0 || saved.index >= saved.cards.length) { return null; }
    if (saved.practiceVersion && saved.practiceVersion !== legacyGatedVersion && !hasPracticeOptions(saved.practiceVersion)) { return null; }
    // Only unanswered replacement choices may adopt the new edition. A chosen
    // meaning, any graded card, or an already advanced old wrong answer pins
    // the entire saved round to its original choice meanings.
    var version = saved.practiceVersion, latest = latestPracticeVersion();
    if ((!version || version === previousPracticeVersion) && latest !== legacyGatedVersion && version !== latest && saved.cards.every(function (stored) {
      var q = stored && questionMap.get(stored.id);
      if (!q || stored.graded || !Array.isArray(stored.stages) || stored.stages.length !== q.stages.length ||
          stored.stageIndex > 0 && stored.stages[0].selected !== q.stages[0].answer) { return false; }
      return stored.stages.every(function (stage, index) {
        if (!stage) { return false; }
        var original = practiceStage(q, index, version);
        var revised = practiceStage(q, index, latest);
        var changed = revised.options.some(function (option, i) { return option !== original.options[i]; });
        return !changed || stage.selected === null;
      });
    })) { version = latest; }
    var ids = new Set(), cards = [];
    for (var i = 0; i < saved.cards.length; i += 1) {
      var stored = saved.cards[i], q = stored && questionMap.get(stored.id);
      if (!q || ids.has(q.id) || stored.signature !== signatures.get(q.id) ||
          !Array.isArray(stored.stages) || stored.stages.length !== q.stages.length ||
          !Number.isInteger(stored.stageIndex) || stored.stageIndex < 0 || stored.stageIndex >= q.stages.length ||
          typeof stored.graded !== "boolean") { return null; }
      var earlyEnd = stored.graded && saved.practiceVersion && stored.stageIndex === 0 && q.stages.length === 2 &&
        stored.stages[0] && stored.stages[0].selected !== null && stored.stages[0].selected !== q.stages[0].answer &&
        stored.stages[1] && stored.stages[1].selected === null;
      var stages = [];
      for (var j = 0; j < q.stages.length; j += 1) {
        var stage = stored.stages[j], order = stage && stage.order, stageData = practiceStage(q, j, version);
        if (!stage || !Array.isArray(order) || order.length !== 4 || new Set(order).size !== 4 ||
            !order.every(function (n) { return Number.isInteger(n) && n >= 0 && n < 4; }) ||
            !(stage.selected === null || Number.isInteger(stage.selected) && stage.selected >= 0 && stage.selected < 4) ||
            stored.graded && stage.selected === null && !(earlyEnd && j === 1)) { return null; }
        stages.push({ data: stageData, selected: stage.selected, choices: order.map(function (n) { return { text: stageData.options[n], originalIndex: n }; }) });
      }
      cards.push({ question: q, stageIndex: stored.stageIndex, graded: stored.graded, deferred: stored.deferred === true, stages: stages });
      ids.add(q.id);
    }
    var restored = { mode: saved.mode === "wrong" ? "wrong" : "all", index: saved.index,
      startedAt: typeof saved.startedAt === "string" ? saved.startedAt : new Date().toISOString(), cards: cards };
    if (version) { restored.practiceVersion = version; }
    return restored;
  }
  function restoreState() {
    try {
      var raw = window.localStorage.getItem(storageKey);
      if (!raw) { return; }
      var saved = JSON.parse(raw);
      if (syncModel) {
        saved = syncModel.parse(raw);
        if (!saved) { throw new Error("invalid state"); }
        history = saved.history;
        archivedHistory = saved.archivedHistory;
        syncReceipts = saved._studySync || null;
      }
      if (!saved || saved.version !== 1 || typeof saved !== "object") { throw new Error("invalid state"); }
      if (saved.history && typeof saved.history === "object" && !Array.isArray(saved.history)) {
        Object.keys(saved.history).forEach(function (id) {
          var item = saved.history[id];
          if (!syncModel && questionMap.has(id) && item && item.signature === signatures.get(id) &&
              [item.attempts, item.correct, item.stagesGraded, item.stagesCorrect].every(function (n) { return Number.isSafeInteger(n) && n >= 0 && n < 1000000000; }) &&
              item.correct <= item.attempts && item.stagesCorrect <= item.stagesGraded) {
            history[id] = item;
          }
        });
      }
      if (saved.session) {
        session = restoreSession(saved.session);
        if (!session && syncModel) { unavailableSession = saved.session; }
        if (!session) { reportStorage("저장된 풀이가 현재 문제 데이터와 맞지 않아 이어 풀기는 불러오지 않았어요. 새 연습을 시작할 수 있어요."); }
      }
      var settings = saved.settings;
      if (settings && typeof settings === "object") {
        if (["20", "50", "100", "all"].indexOf(settings.roundSize) !== -1) { el("round-size").value = settings.roundSize; }
        el("step-filter").value = normalizedScope(settings.step);
        if (typeof settings.shuffleQuestions === "boolean") { el("shuffle-questions").checked = settings.shuffleQuestions; }
        if (typeof settings.shuffleOptions === "boolean") { el("shuffle-options").checked = settings.shuffleOptions; }
      }
    } catch (error) {
      if (typeof raw === "string") { unreadableOriginal = raw; }
      reportStorage("저장된 기록을 읽지 못했어요. 현재 문제는 정상적으로 풀 수 있고, 새 풀이부터 이 브라우저에 다시 저장해요.");
      session = null;
    }
  }
  function applySettings(settings) {
    if (["20", "50", "100", "all"].indexOf(settings.roundSize) !== -1) { el("round-size").value = settings.roundSize; }
    el("step-filter").value = normalizedScope(settings.step);
    el("shuffle-questions").checked = settings.shuffleQuestions;
    el("shuffle-options").checked = settings.shuffleOptions;
  }
  function applyStudyPayload(raw, options) {
    var saved = syncModel && syncModel.parse(raw);
    if (!saved) { throw new Error("Invalid VOCA account record"); }
    options = options || {};
    if (options.accountSwitch === true) { accountEpoch += 1; }
    // A delayed first server response is not permission to navigate away from
    // an already opened question. Explicit login/logout/account changes are.
    var background = options.reason === "background" ||
      view !== "start" && options.accountSwitch !== true && options.reason !== "restore";
    applyingPayload = true;
    try {
      if (background) {
        // The controller normally already merged deltas. MAX here only guards
        // against an older first snapshot arriving after a local grade; it does
        // not add attempts again and does not move the local round or settings.
        var merged = syncModel.parse(syncModel.merge(null, currentPayload(true), raw));
        history = merged.history; archivedHistory = merged.archivedHistory;
        syncReceipts = merged._studySync || null;
        renderHistory();
      } else {
        history = saved.history; archivedHistory = saved.archivedHistory;
        syncReceipts = saved._studySync || null;
        session = saved.session ? restoreSession(saved.session) : null;
        unavailableSession = saved.session && !session ? saved.session : null;
        applySettings(saved.settings);
        clearFeedback();
        showStart();
        if (unavailableSession) { reportStorage("다른 버전의 문제로 저장된 이어 풀기는 보관했어요. 현재 문제로 새 연습을 시작할 수 있고, 누적 학습 기록은 유지돼요."); }
      }
      reportStorage(storageWarning);
      return true;
    } finally { applyingPayload = false; }
  }
  function summarizeStudyPayload(raw) {
    var saved = syncModel.parse(raw);
    if (!saved) { return "기록 형식을 확인해 주세요."; }
    var attempts = Object.keys(saved.history).reduce(function (sum, id) { return sum + saved.history[id].attempts; }, 0) +
      saved.archivedHistory.reduce(function (sum, item) { return sum + item.attempts; }, 0);
    return "누적 채점 " + attempts + "회" + (saved.session ? " · " + saved.session.cards.length + "문제 풀이 저장됨" : " · 이어 풀기 없음");
  }
  function connectAccountSync() {
    if (window.location.protocol !== "https:" && window.location.protocol !== "http:") { return; }
    if (!syncModel) {
      connectionWarning = "기기 저장 사용 중 · 계정 연결에 필요한 파일을 불러오지 못했어요. 다시 열어 주세요.";
      reportStorage(storageWarning);
      return;
    }
    import("../shared/study-sync.js?v=20261019-voca1").then(function (module) {
      // Lossless migration before the controller reads the legacy guest key.
      // Compact checkpoints also fit an entire-book round in one cloud record.
      try {
        var existing = window.localStorage.getItem(storageKey);
        var parsed = syncModel.parse(existing);
        if (parsed) { window.localStorage.setItem(storageKey, syncModel.stringify(parsed, true)); }
      } catch (_) { /* The controller can preserve the original even if storage is full. */ }
      studySync = module.connectStudySync({
        appId: "power-voca", legacyKey: storageKey,
        mount: el("account-sync") || document.querySelector(".page-shell") || document.body,
        getPayload: function () { return currentPayload(true); },
        createEmptyPayload: function () { return syncModel.stringify(syncModel.empty(), true); },
        canUploadPayload: preserveOriginal,
        validatePayload: function (raw) { return syncModel.parse(raw) !== null; },
        applyPayload: applyStudyPayload,
        mergePayload: syncModel.merge,
        semanticPayload: syncModel.semantic,
        summarizePayload: summarizeStudyPayload,
        hasLocalData: function (raw) {
          var saved = syncModel.parse(raw);
          return Boolean(saved && (saved.session || Object.keys(saved.history).length || saved.archivedHistory.length));
        }
      });
      reportStorage(storageWarning);
    }).catch(function () {
      connectionWarning = "기기 저장 사용 중 · 계정 연결을 불러오지 못했어요. 인터넷 연결을 확인하고 다시 열어 주세요.";
      reportStorage(storageWarning);
    });
  }
  function exportRecords() {
    try {
      var raw = currentPayload(Boolean(syncModel));
      var url = URL.createObjectURL(new Blob([raw], { type: "application/json;charset=utf-8" }));
      var link = document.createElement("a"); link.href = url;
      link.download = "power-voca-records-" + new Date().toISOString().replace(/[:.]/g, "-") + ".json";
      link.click();
      window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      announce("현재 풀이와 누적 기록의 백업 파일을 내려받아요. 다른 기기의 기록 가져오기에서 선택할 수 있어요.");
    } catch (_) { reportStorage("기록 백업 파일을 만들지 못했어요. 현재 기록은 그대로 유지돼요."); }
  }
  async function importRecords(event) {
    var input = event.target, file = input.files && input.files[0];
    input.value = "";
    if (!file) { return; }
    if (!syncModel || file.size > 4000000) { reportStorage("이 백업 파일을 읽을 수 없어요. 4MB 이하의 파워토익 VOCA 기록 파일을 선택해 주세요."); return; }
    var before = currentPayload(true), epoch = accountEpoch;
    try {
      var imported = syncModel.parse(await file.text());
      if (!imported) { throw new Error("invalid-backup"); }
      if (epoch !== accountEpoch || syncModel.semantic(before) !== syncModel.semantic(currentPayload(true))) {
        reportStorage("파일을 읽는 동안 계정이나 풀이가 바뀌었어요. 현재 기록을 확인하고 다시 가져와 주세요."); return;
      }
      if (!window.confirm("백업 파일의 풀이 위치와 설정을 불러올까요? 누적 기록은 현재 기록과 합치며, 같은 기록은 중복 계산하지 않아요. 현재 기록도 이 브라우저에 별도 백업합니다.")) { return; }
      var merged = syncModel.parse(syncModel.merge(null, before, syncModel.stringify(imported, true)));
      merged.session = imported.session; merged.settings = imported.settings;
      var raw = syncModel.stringify(merged, Boolean(studySync));
      // Do not replace either checkpoint unless the current one is recoverable.
      var backupKey = storageKey + ":import-backup:" + (studySync && studySync.isAccountActive() ? "account:" : "guest:") + Date.now();
      window.localStorage.setItem(backupKey, before);
      if (window.localStorage.getItem(backupKey) !== before || !preserveOriginal()) { throw new Error("backup-failed"); }
      applyStudyPayload(raw, { reason: "restore" });
      if (saveState()) { announce("백업 기록을 가져왔어요. 시작 화면에서 이어 풀기를 선택하면 저장된 단계부터 풀 수 있어요."); }
    } catch (error) {
      reportStorage(error && error.message === "invalid-backup" ? "파워토익 VOCA 백업 형식이 아니거나 일부 기록이 손상됐어요. 현재 기록은 바꾸지 않았어요." : "현재 기록의 안전한 백업을 저장하지 못해 가져오기를 멈췄어요. 저장 공간을 확인해 주세요.");
    }
  }
  function recordCard(card) {
    var id = card.question.id;
    var item = history[id];
    if (!item || item.signature !== signatures.get(id)) {
      if (item && syncModel) { archivedHistory.push(Object.assign({ id: id }, item)); }
      var archivedIndex = archivedHistory.findIndex(function (record) { return record.id === id && record.signature === signatures.get(id); });
      item = archivedIndex === -1 ? { signature: signatures.get(id), attempts: 0, correct: 0, stagesGraded: 0, stagesCorrect: 0 } : archivedHistory.splice(archivedIndex, 1)[0];
    }
    item.attempts += 1;
    if (isAllCorrect(card)) { item.correct += 1; }
    item.stagesGraded += card.stages.filter(function (stage) { return stage.selected !== null; }).length;
    item.stagesCorrect += card.stages.filter(function (stage) { return stage.selected === stage.data.answer; }).length;
    item.lastCorrect = isAllCorrect(card); item.lastStudiedAt = new Date().toISOString();
    history[id] = item;
  }
  function renderHistory() {
    var items = Object.keys(history).map(function (id) { return history[id]; }).concat(archivedHistory);
    var attempts = items.reduce(function (sum, item) { return sum + item.attempts; }, 0);
    var correct = items.reduce(function (sum, item) { return sum + item.stagesCorrect; }, 0);
    var graded = items.reduce(function (sum, item) { return sum + item.stagesGraded; }, 0);
    text("history-summary", attempts ? "학습한 문제 " + new Set(Object.keys(history).concat(archivedHistory.map(function (item) { return item.id; }))).size + "개 · 누적 채점 " + attempts + "회 · 단계별 정답률 " + Math.round(correct / Math.max(graded, 1) * 100) + "%" : "아직 채점한 문제가 없어요.");
  }
  function scopeForStep(value) {
    var match = /^(?:step\s*)?(\d+)$/i.exec(String(value == null ? "" : value).trim());
    return match && scopeByStep[String(Number(match[1]))] || "other-vocabulary";
  }
  function scopeOf(q) { return scopeForStep(q.source && q.source.step); }
  function normalizedScope(value) {
    var scope = /^(?:step\s*)?\d+$/i.test(String(value).trim()) ? scopeForStep(value) : value;
    return Array.from(el("step-filter").options).some(function (option) { return option.value === scope; }) ? scope : "all";
  }
  function filteredQuestions() {
    var scope = el("step-filter").value;
    return data.questions.filter(function (q) { return scope === "all" || scopeOf(q) === scope; });
  }
  function updateSettings() {
    var pool = filteredQuestions(), size = el("round-size").value;
    var count = size === "all" ? pool.length : Math.min(Number(size), pool.length);
    text("pool-summary", "선택 범위 " + pool.length + "문제 중 이번에는 " + count + "문제를 풀어요. 각 카드에는 1~2단계가 있어요.");
    text("start-button", el("shuffle-questions").checked || el("shuffle-options").checked ? "섞어서 시작하기 ↗" : "시작하기 ↗");
    el("start-button").disabled = pool.length === 0;
  }
  function startSelected() {
    if (session && totals().ungraded && !window.confirm("새 연습을 시작하면 저장된 이어 풀기가 새 풀이로 바뀌어요. 누적 채점 기록은 남아요. 시작할까요?")) { return; }
    var pool = filteredQuestions(), size = el("round-size").value;
    if (el("shuffle-questions").checked) { pool = shuffled(pool); }
    if (size !== "all") { pool = pool.slice(0, Number(size)); }
    if (pool.length) { begin(pool, "all", false); }
  }
  function validStage(stage) {
    return stage && typeof stage.prompt === "string" && stage.prompt.trim() &&
      Array.isArray(stage.options) && stage.options.length === 4 &&
      stage.options.every(function (value) { return typeof value === "string" && value.trim(); }) &&
      Number.isInteger(stage.answer) && stage.answer >= 0 && stage.answer < 4 &&
      typeof stage.explanation === "string" && stage.explanation.trim() &&
      Array.isArray(stage.optionReasons) && stage.optionReasons.length === 4 &&
      stage.optionReasons.every(function (value) { return typeof value === "string" && value.trim(); });
  }
  function hasPracticeOptions(version) {
    var previousReady = practice && practice.version === previousPracticeVersion && practice.stages && typeof practice.stages === "object";
    if (version === previousPracticeVersion) { return previousReady; }
    return version === practiceVersion && previousReady && hardPractice && hardPractice.version === practiceVersion &&
      hardPractice.stages && typeof hardPractice.stages === "object";
  }
  function latestPracticeVersion() {
    return hasPracticeOptions(practiceVersion) ? practiceVersion : hasPracticeOptions(previousPracticeVersion) ? previousPracticeVersion : legacyGatedVersion;
  }
  function practiceStage(question, index, version) {
    var original = question.stages[index];
    if (!hasPracticeOptions(version)) { return original; }
    var patch = practice.stages[question.id] && practice.stages[question.id][index];
    var harder = version === practiceVersion && hardPractice.stages[question.id] && hardPractice.stages[question.id][index];
    if (!patch && !harder) { return original; }
    var revised = Object.assign({}, original, patch || {}, harder || {}, { answer: original.answer });
    return validStage(revised) && new Set(revised.options).size === 4 ? revised : original;
  }
  function stagePrompt(card, index) {
    var prompt = card.stages[index].data.prompt, first = card.stages[0];
    if (index > 0 && /_{2,}/.test(first.data.prompt) && /_{2,}/.test(prompt)) {
      var selected = card.graded ? first.data.answer : first.selected;
      if (selected !== null) { prompt = prompt.replace(/_{2,}/g, function () { return first.data.options[selected]; }); }
    }
    return prompt;
  }
  function validateData(value) {
    if (!value || !Array.isArray(value.questions) || !value.questions.length) {
      return "같은 폴더의 questions.js에 문제 데이터가 준비되어 있는지 확인해 주세요.";
    }
    var ids = new Set();
    for (var i = 0; i < value.questions.length; i += 1) {
      var q = value.questions[i];
      if (!q || !q.id || ids.has(q.id) || !Array.isArray(q.stages) ||
          q.stages.length < 1 || q.stages.length > 2 || !q.stages.every(validStage) ||
          typeof q.learningPoint !== "string" || !q.answerSummary ||
          typeof q.answerSummary.expression !== "string" || !q.answerSummary.expression.trim() ||
          typeof q.answerSummary.meaning !== "string" || !q.answerSummary.meaning.trim()) {
        return (i + 1) + "번째 문제의 단계·선택지·정답·표현 요약·해설 데이터가 아직 완성되지 않았어요. 데이터가 준비되면 다시 불러와 주세요.";
      }
      ids.add(q.id);
    }
    return null;
  }
  function isAllCorrect(card) {
    return card.graded && card.stages.every(function (stage) { return stage.selected === stage.data.answer; });
  }
  function totals() {
    var result = { correct: 0, wrong: 0, ungraded: 0, stagesCorrect: 0, stagesGraded: 0 };
    session.cards.forEach(function (card) {
      if (!card.graded) { result.ungraded += 1; return; }
      if (isAllCorrect(card)) { result.correct += 1; } else { result.wrong += 1; }
      card.stages.forEach(function (stage) {
        if (stage.selected === null) { return; }
        result.stagesGraded += 1;
        if (stage.selected === stage.data.answer) { result.stagesCorrect += 1; }
      });
    });
    return result;
  }
  function showStart() {
    showView("start");
    if (session) {
      var count = totals();
      el("resume-panel").hidden = false;
      text("resume-summary", session.cards.length + "문제 중 " + (count.correct + count.wrong) + "문제 채점 · 모두 맞힌 문제 " + count.correct + " · 다시 볼 문제 " + count.wrong);
      if (session.practiceVersion !== latestPracticeVersion()) {
        el("resume-summary").append(document.createTextNode(" · 이미 고른 답을 보존한 이전 보기 풀이예요. 개선된 보기로 풀려면 새 연습을 시작해 주세요."));
      }
      text("resume-button", count.ungraded ? "이어서 풀기" : "풀이 결과 보기");
    } else { el("resume-panel").hidden = true; }
    renderHistory();
    updateSettings();
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  function begin(questions, mode, forceShuffle) {
    unavailableSession = null;
    var mixQuestions = forceShuffle || el("shuffle-questions").checked;
    var mixOptions = forceShuffle || el("shuffle-options").checked;
    var ordered = mixQuestions ? shuffled(questions) : questions.slice();
    var version = latestPracticeVersion();
    session = { mode: mode, index: 0, startedAt: new Date().toISOString(), practiceVersion: version, cards: ordered.map(function (question) {
      return { question: question, stageIndex: 0, graded: false, deferred: false,
        stages: question.stages.map(function (_, index) {
          var stage = practiceStage(question, index, version);
          var choices = stage.options.map(function (option, index) { return { text: option, originalIndex: index }; });
          return { data: stage, choices: mixOptions ? shuffled(choices) : choices, selected: null };
        }) };
    }) };
    renderQuestion(true);
  }
  function currentCard() { return session.cards[session.index]; }
  function currentStage() { var card = currentCard(); return card.stages[card.stageIndex]; }
  function createOption(card, stage, choice, displayIndex) {
    var label = node("label", "option");
    if (stage.selected === choice.originalIndex) { label.classList.add("selected"); }
    if (card.graded) {
      label.classList.add("locked");
      if (choice.originalIndex === stage.data.answer) { label.classList.add("correct"); }
      else if (stage.selected === choice.originalIndex) { label.classList.add("incorrect"); }
    }
    var input = document.createElement("input");
    input.type = "radio"; input.name = "answer"; input.value = String(choice.originalIndex);
    input.checked = stage.selected === choice.originalIndex; input.disabled = card.graded;
    input.setAttribute("aria-label", letters[displayIndex] + ". " + choice.text);
    var letter = node("span", "option-letter", letters[displayIndex]); letter.setAttribute("aria-hidden", "true");
    label.append(input, letter, node("span", "option-text", choice.text));
    if (card.graded && (choice.originalIndex === stage.data.answer || choice.originalIndex === stage.selected)) {
      label.append(node("span", "option-tag", choice.originalIndex === stage.data.answer ? "정답" : "선택한 답"));
    }
    input.addEventListener("change", function () {
      if (card.graded) { return; }
      if (card.stageIndex === 0 && stage.selected !== choice.originalIndex) {
        card.stages.slice(1).forEach(function (later) { later.selected = null; });
      }
      stage.selected = choice.originalIndex; card.deferred = false;
      saveState();
      Array.prototype.forEach.call(el("options-list").children, function (item) {
        item.classList.toggle("selected", item.querySelector("input").checked);
      });
      el("grade-button").disabled = false;
      text("question-state", "선택 완료 · 아직 미채점");
      announce(letters[displayIndex] + "번을 선택했어요. " + (card.stageIndex < card.stages.length - 1 ? "답 확인을 누르면 맞았을 때만 다음 단계로 넘어가요." : "채점하기를 누르면 해설이 공개돼요."));
    });
    return label;
  }
  function feedbackSection(title, content) {
    var section = node("div", "feedback-section");
    section.append(node("h3", "", title), node("p", "", content));
    return section;
  }
  function renderFeedback(card) {
    var correctCount = card.stages.filter(function (stage) { return stage.selected === stage.data.answer; }).length;
    var allCorrect = correctCount === card.stages.length;
    var attempted = card.stages.filter(function (stage) { return stage.selected !== null; }).length;
    el("feedback-panel").classList.toggle("wrong", !allCorrect);
    text("feedback-title", allCorrect ? "모두 정확하게 풀었어요." : "이 쓰임을 다시 확인해요.");
    text("correct-answer", attempted < card.stages.length ? "1단계 오답으로 이 문제를 종료했어요. 2단계는 진행하지 않았어요." :
      card.stages.length + "단계 중 " + correctCount + "단계 정답 · 아래에서 각 선택지를 확인해 보세요.");
    text("answer-summary-expression", card.question.answerSummary.expression);
    text("answer-summary-meaning", card.question.answerSummary.meaning);
    el("answer-summary").hidden = false;
    var feedbackList = el("stage-feedback-list"); feedbackList.replaceChildren();
    card.stages.forEach(function (stage, stageIndex) {
      var stageData = stage.data;
      var box = node("section", "stage-feedback");
      var isCorrect = stage.selected === stageData.answer;
      var skipped = stage.selected === null;
      box.append(node("h3", "stage-feedback-title" + (skipped ? "" : isCorrect ? " correct" : " wrong"), (stageIndex + 1) + "단계 · " + (skipped ? "미진행 · 복습용 해설" : isCorrect ? "정답" : "오답")));
      box.append(node("p", "stage-feedback-prompt", stagePrompt(card, stageIndex)));
      var answerIndex = stage.choices.findIndex(function (choice) { return choice.originalIndex === stageData.answer; });
      var selectedIndex = stage.choices.findIndex(function (choice) { return choice.originalIndex === stage.selected; });
      box.append(node("p", "stage-answer-line", "정답 " + letters[answerIndex] + " · " + stageData.options[stageData.answer]));
      box.append(node("p", "stage-selected-line", skipped ? "1단계에서 틀려 진행하지 않았어요. 이 단계는 채점 횟수에 포함하지 않아요." :
        "선택한 답 " + letters[selectedIndex] + " · " + stageData.options[stage.selected]));
      if (stageData.translation) { box.append(feedbackSection("문장 해석", stageData.translation)); }
      box.append(feedbackSection("정답 근거", stageData.explanation));
      var reasons = node("div", "feedback-section"); reasons.append(node("h3", "", "선택지 하나씩 확인하기"));
      var list = node("ol", "reason-list");
      stage.choices.forEach(function (choice, index) {
        var item = node("li", "reason-item" + (choice.originalIndex === stageData.answer ? " is-answer" : ""));
        var heading = node("div", "reason-item-heading");
        heading.append(node("span", "reason-letter", letters[index]), node("span", "reason-option", choice.text));
        if (choice.originalIndex === stageData.answer) { heading.append(node("span", "reason-mark", "정답")); }
        else if (choice.originalIndex === stage.selected) { heading.append(node("span", "reason-mark", "선택한 답")); }
        item.append(heading, node("p", "", stageData.optionReasons[choice.originalIndex])); list.append(item);
      });
      reasons.append(list); box.append(reasons); feedbackList.append(box);
    });
    text("learning-point", card.question.learningPoint);
    var q = card.question, source = q.source || {}, sourceParts = [];
    if (source.bookPage != null && source.bookPage !== "") { sourceParts.push("교재 " + String(source.bookPage).replace(/^p\.?\s*/i, "") + "쪽"); }
    if (source.entry != null && source.entry !== "") { sourceParts.push("항목 " + source.entry); }
    if (source.headword) { sourceParts.push(source.headword); }
    if (q.category) { sourceParts.push("학습 포인트: " + q.category); }
    text("question-source", sourceParts.join(" · ") + (sourceParts.length ? "\n" : "") + "교재의 인쇄된 학습 내용을 바탕으로 만든 응용 문제입니다.");
  }
  function clearFeedback() {
    ["feedback-title", "correct-answer", "answer-summary-expression", "answer-summary-meaning", "learning-point", "question-source"].forEach(function (id) { text(id, ""); });
    el("answer-summary").hidden = true;
    el("stage-feedback-list").replaceChildren();
  }
  function renderQuestion(focus) {
    showView("quiz");
    var card = currentCard(), stage = currentStage(), count = totals();
    text("round-label", session.mode === "wrong" ? "오답 다시 연습" : "기본 연습");
    text("question-counter", "문제 " + (session.index + 1) + " / " + session.cards.length);
    text("score-counter", "채점 " + (count.correct + count.wrong) + " · 모두 맞힌 문제 " + count.correct);
    var progress = count.correct + count.wrong;
    el("progress-bar").setAttribute("aria-valuemax", String(session.cards.length));
    el("progress-bar").setAttribute("aria-valuenow", String(progress));
    el("progress-fill").style.width = (progress / session.cards.length * 100) + "%";
    text("question-number", "QUESTION " + String(session.index + 1).padStart(2, "0"));
    text("question-state", card.graded ? "채점 완료" : card.deferred ? "나중에 풀기로 남긴 문제" : stage.selected != null ? "선택 완료 · 아직 미채점" : "미채점");
    text("stage-indicator", (card.stageIndex + 1) + " / " + card.stages.length + "단계" + (card.stages.length > 1 && !card.graded ? " · 첫 답을 맞히면 다음 단계" : ""));
    el("previous-stage-button").hidden = card.stageIndex === 0;
    text("question-instruction", card.stageIndex > 0 && /_{2,}/.test(card.stages[0].data.prompt) ? "완성된 표현의 뜻을 고르세요." :
      stage.data.instruction || "문맥에 가장 알맞은 답을 하나 고르세요.");
    text("question-heading", stagePrompt(card, card.stageIndex));
    var list = el("options-list"); list.replaceChildren();
    stage.choices.forEach(function (choice, index) { list.append(createOption(card, stage, choice, index)); });
    el("previous-button").disabled = session.index === 0;
    el("skip-button").hidden = card.graded;
    el("grade-button").hidden = card.graded;
    el("grade-button").disabled = stage.selected == null;
    text("grade-button", card.stageIndex < card.stages.length - 1 ? "답 확인 →" : "채점하기");
    el("next-button").hidden = !card.graded;
    var nextLabel = session.index === session.cards.length - 1 ? "풀이 결과 보기" : "다음 문제 →";
    text("next-button", nextLabel); text("feedback-next-button", nextLabel);
    text("choice-hint", card.graded ? "선택한 답은 채점 후 변경되지 않아요. 오답 연습에서 다시 도전할 수 있어요." : card.stages.length > 1 ?
      "첫 답이 틀리면 바로 오답 처리해요. 맞히면 다음 단계로 넘어가고, 마지막 채점 후 해설을 보여줘요." : "선택만으로 정답이 공개되지 않아요.");
    el("feedback-panel").hidden = !card.graded;
    if (card.graded) { renderFeedback(card); } else { clearFeedback(); }
    saveState();
    if (focus) { focusHeading("question-instruction"); }
  }
  function submitStage() {
    var card = currentCard(), stage = currentStage();
    if (card.graded || stage.selected == null) { return; }
    if (card.stageIndex === 0 && card.stages.length > 1 && stage.selected !== stage.data.answer) {
      card.stages.slice(1).forEach(function (later) { later.selected = null; });
      if (!session.practiceVersion) { session.practiceVersion = legacyGatedVersion; }
      finishCard(card);
      announce("1단계가 오답이어서 이 문제를 종료했어요. 올바른 표현과 뜻을 확인해 보세요.");
      return;
    }
    if (card.stageIndex < card.stages.length - 1) {
      card.stageIndex += 1; renderQuestion(true);
      announce("1단계 정답이에요. " + (card.stageIndex + 1) + "단계의 답을 골라 주세요.");
      return;
    }
    var missing = card.stages.findIndex(function (item) { return item.selected == null; });
    if (missing !== -1) { card.stageIndex = missing; renderQuestion(true); announce("아직 선택하지 않은 단계가 있어요."); return; }
    finishCard(card);
    announce(isAllCorrect(card) ? "모든 단계가 정답이에요. 각 단계의 해석과 해설이 공개됐어요." : "다시 확인할 답이 있어요. 각 단계의 해석과 해설이 공개됐어요.");
  }
  function finishCard(card) {
    card.graded = true; card.deferred = false; recordCard(card); renderQuestion(false);
    el("feedback-title").focus({ preventScroll: true });
    el("feedback-panel").scrollIntoView({ block: "start", behavior: "auto" });
  }
  function next() {
    if (session.index < session.cards.length - 1) { session.index += 1; renderQuestion(true); }
    else { showResults(); }
  }
  function showResults() {
    if (!session) { return; }
    var count = totals(); showView("results");
    saveState();
    text("result-correct", count.correct); text("result-wrong", count.wrong); text("result-ungraded", count.ungraded);
    text("results-description", count.ungraded ? session.cards.length + "문제 중 아직 " + count.ungraded + "문제를 채점하지 않았어요. 남은 문제를 이어서 풀 수 있어요." : "이번 " + session.cards.length + "문제를 모두 확인했어요. 한 단계라도 틀린 문제는 오답 연습에 포함돼요.");
    var accuracy = count.stagesGraded ? Math.round(count.stagesCorrect / count.stagesGraded * 100) + "%" : "—";
    text("stage-score", "단계별 정답률 " + accuracy + " · 채점한 " + count.stagesGraded + "단계 중 " + count.stagesCorrect + "단계 정답\n위의 ‘정답’은 모든 단계를 맞힌 문제 카드 수예요. 미채점 단계는 정답률에 포함하지 않아요.");
    el("continue-button").hidden = count.ungraded === 0;
    el("wrong-only-button").disabled = count.wrong === 0;
    var list = el("review-list"); list.replaceChildren();
    session.cards.forEach(function (card, index) {
      var item = node("li"), button = node("button", "review-button"); button.type = "button";
      var status = node("span", "review-status");
      if (!card.graded) { status.textContent = "미채점"; }
      else if (isAllCorrect(card)) { status.textContent = "정답"; status.classList.add("correct"); }
      else { status.textContent = "오답"; status.classList.add("wrong"); }
      button.append(node("span", "review-index", String(index + 1).padStart(2, "0")), node("span", "review-text", card.question.stages[0].prompt), status);
      button.addEventListener("click", function () { session.index = index; renderQuestion(true); });
      item.append(button); list.append(item);
    });
    focusHeading("results-title");
    announce("풀이 현황. 모두 맞힌 문제 " + count.correct + "개, 오답 " + count.wrong + "문제, 미채점 " + count.ungraded + "문제.");
  }
  function continueUnfinished() {
    var index = session.cards.findIndex(function (card) { return !card.graded; });
    if (index >= 0) { session.index = index; renderQuestion(true); } else { showResults(); }
  }

  el("reload-button").addEventListener("click", function () { window.location.reload(); });
  var error = validateData(data);
  if (error) { text("error-message", error); showView("error"); return; }
  data.questions.forEach(function (q) { questionMap.set(q.id, q); signatures.set(q.id, fingerprint(q)); });
  var scopeCounts = Object.create(null);
  data.questions.forEach(function (q) {
    var scope = scopeOf(q); scopeCounts[scope] = (scopeCounts[scope] || 0) + 1;
  });
  var availableScopes = textbookScopes.filter(function (scope) { return scopeCounts[scope.id]; });
  if (scopeCounts["other-vocabulary"]) { availableScopes.push({ id: "other-vocabulary", label: "기타 어휘" }); }
  availableScopes.forEach(function (scope) {
    var option = node("option", "", scope.label + " (" + scopeCounts[scope.id].toLocaleString("ko-KR") + "문제)");
    option.value = scope.id; el("step-filter").append(option);
  });
  el("step-filter-label").hidden = availableScopes.length < 2;
  restoreState();
  document.querySelectorAll("[data-total]").forEach(function (item) { item.textContent = data.questions.length; });
  if (data.coverage && el("coverage-summary")) {
    text("coverage-summary", "교재 목차 " + availableScopes.length + "개 분류 · 표제어 " + data.coverage.headwords.toLocaleString("ko-KR") + "개 · 추가 표현 " + data.coverage.extras.toLocaleString("ko-KR") + "개를 반영했어요. 다의어와 유사 표현을 나눠 전체 " + data.questions.length.toLocaleString("ko-KR") + "문제 카드로 연습해요. 문장 문제와 표현 자체를 완성하는 문제가 함께 있어요.");
  }
  text("source-title", "학습 자료: " + (data.sourceTitle || "박혜원 파워토익 VOCA") + " · 인쇄 내용만 반영");
  el("start-button").addEventListener("click", startSelected);
  ["shuffle-questions", "shuffle-options", "round-size", "step-filter"].forEach(function (id) {
    el(id).addEventListener("change", function () { updateSettings(); saveState(); });
  });
  el("home-link").addEventListener("click", function (event) { event.preventDefault(); showStart(); });
  el("home-button").addEventListener("click", showStart);
  el("resume-button").addEventListener("click", function () { if (!totals().ungraded) { showResults(); } else { renderQuestion(true); } });
  el("grade-button").addEventListener("click", submitStage);
  el("previous-stage-button").addEventListener("click", function () { if (currentCard().stageIndex > 0) { currentCard().stageIndex -= 1; renderQuestion(true); } });
  el("previous-button").addEventListener("click", function () { if (session.index > 0) { session.index -= 1; renderQuestion(true); } });
  el("skip-button").addEventListener("click", function () { if (!currentCard().graded) { currentCard().deferred = true; } next(); });
  el("next-button").addEventListener("click", next);
  el("feedback-next-button").addEventListener("click", next);
  el("results-button").addEventListener("click", showResults);
  el("continue-button").addEventListener("click", continueUnfinished);
  el("wrong-only-button").addEventListener("click", function () {
    var wrong = session.cards.filter(function (card) { return card.graded && !isAllCorrect(card); }).map(function (card) { return card.question; });
    if (wrong.length && (!totals().ungraded || window.confirm("미채점 문제의 이어 풀기를 대신해 오답 연습을 시작할까요? 누적 채점 기록은 남아요."))) { begin(wrong, "wrong", true); }
  });
  el("restart-button").addEventListener("click", function () {
    if (!totals().ungraded || window.confirm("현재 이어 풀기 대신 이번 문제를 처음부터 다시 풀까요?")) {
      begin(session.cards.map(function (card) { return card.question; }), "all", true);
    }
  });
  window.addEventListener("pageshow", function (event) { if (event.persisted) { showStart(); } });
  showStart();
  if (window.location.protocol === "file:") {
    var siteRoutes = ["", "vocabulary/", "quiz/"];
    document.querySelectorAll(".study-page-nav a").forEach(function (link, index) {
      link.href = index < 3 ? "https://wjfl44444-lab.github.io/toeic-study/" + siteRoutes[index] : "index.html";
    });
  }
  window.__powerVocaTest = Object.freeze({
    getPayload: function () { return currentPayload(false); },
    getView: function () { return view; },
    applyPayload: applyStudyPayload,
    summarizePayload: summarizeStudyPayload,
    getSync: function () { return studySync; },
    fingerprint: fingerprint
  });
  if (el("export-records")) { el("export-records").addEventListener("click", exportRecords); }
  if (el("import-records") && el("import-records-file")) {
    el("import-records").addEventListener("click", function () { el("import-records-file").click(); });
    el("import-records-file").addEventListener("change", importRecords);
  }
  connectAccountSync();
}());
