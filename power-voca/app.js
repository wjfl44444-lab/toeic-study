(function () {
  "use strict";

  var originalData = window.POWER_VOCA_SAMPLE;
  var quickstartData = window.TOEIC_QUICKSTART || null;
  var memoryPractice = window.POWER_VOCA_MEMORY_PRACTICE || null;
  var memoryVersion = "20261023-memory3";
  var memoryReady = memoryPractice && memoryPractice.version === memoryVersion &&
    memoryPractice.stages && Array.isArray(memoryPractice.questions);
  // Never append to or annotate the original corpus: fingerprints for old
  // cards include the entire original object and must remain unchanged.
  var data = originalData && quickstartData ? Object.assign({}, originalData, {
    questions: originalData.questions.concat(quickstartData.questions || [])
  }) : originalData;
  if (data && memoryReady) {
    data = Object.assign({}, data, { questions: data.questions.concat(memoryPractice.questions) });
  }
  var lexicalReview = window.POWER_VOCA_LEXICAL_REVIEW;
  var lexicalReady = lexicalReview && lexicalReview.version === "20261024-lexical1" &&
    Array.isArray(lexicalReview.questions) && lexicalReview.replacements && typeof lexicalReview.replacements === "object";
  // Old IDs and immutable question objects remain available to saved rounds.
  // Only fresh rounds substitute reviewed cards; additions do not inflate counts.
  if (data && lexicalReady) {
    data = Object.assign({}, data, { questions: data.questions.concat(lexicalReview.questions) });
  }
  var usageReview = window.POWER_VOCA_USAGE_REVIEW;
  var usageReady = usageReview && usageReview.version === "20261024-usage1" &&
    Array.isArray(usageReview.questions) && usageReview.replacements && usageReview.assignments &&
    Array.isArray(usageReview.subscopes) && window.PowerVocaUsageRouting &&
    typeof window.PowerVocaUsageRouting.createTaxonomy === "function";
  if (data && usageReady) {
    data = Object.assign({}, data, { questions: data.questions.concat(usageReview.questions) });
  }
  function activeQuestion(q) {
    return (!lexicalReady || !Object.prototype.hasOwnProperty.call(lexicalReview.replacements, q.id)) &&
      (!usageReady || !Object.prototype.hasOwnProperty.call(usageReview.replacements, q.id));
  }
  var activeCount = data ? data.questions.filter(activeQuestion).length : 0;
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
  var requestedCategory = new URLSearchParams(window.location.search || "").get("category") === "grammar-structures";
  var letters = ["A", "B", "C", "D"];
  var views = ["loading", "error", "start", "quiz", "results"];
  // Taxonomy is external: do not alter any question object or saved fingerprint.
  // One existing settings.step string stores either a subgroup or group-<id>.
  var taxonomy = window.PowerVocaTaxonomy;
  if (usageReady) { taxonomy = window.PowerVocaUsageRouting.createTaxonomy(taxonomy, usageReview); }
  var questionScopes = new Map();
  var groupCounts = Object.create(null);
  var scopeCounts = Object.create(null);
  var mixedScope = "mixed-verb-patterns";
  var mixedVerbScopes = ["second-pattern", "fourth-pattern", "fifth-pattern", "verb-arguments", "verb-that",
    "verb-to-infinitive", "object-to-infinitive", "verb-gerund"];
  var groupDescriptions = {
    "grammar-structures": "어떤 동사가 목적어·보어·that절·to V·V-ing를 받는지 단어별로 익혀요. depend on 같은 자동사 + 전치사도 여기에 있어요.",
    "collocations": "place an order, strongly recommend처럼 함께 쓰이는 특정 단어의 조합을 모았어요.",
    "word-forms": "명사 쓰임·어형·복합명사·수식 표현을 단어별로 익혀요. 어떤 형태와 결합이 가능한지 직접 확인해요.",
    "time-expressions": "현재·과거·미래·완료 시제와 관련된 부사·시간 표현을 모았어요.",
    "sentence-links": "원인·양보·조건 등 의미 관계 안에서 전치사·접속사·접속부사를 함께 연습해요. 표현의 뜻과 실제 연결 방식을 확인해요.",
    "meanings": "다의어·다품사어와 혼동 어휘, 비슷한 뜻의 재표현을 함께 확인해요."
  };

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
    var scope = el("step-filter").value, group = el("group-filter").value;
    return { roundSize: el("round-size").value, step: scope !== "all" ? scope : group === "all" ? "all" : "group-" + group,
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
    // New memory editions can change a prompt, not just the option labels.
    // Keep every existing round on its exact edition, even if unanswered.
    // Retain the older, options-only migration solely when memory3 is absent.
    var version = saved.practiceVersion, latest = memoryReady ? version : latestPracticeVersion();
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
        applyScopeSetting(settings.step);
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
    applyScopeSetting(settings.step);
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
  function scopeOf(q) { return questionScopes.get(q.id); }
  function populateSubscopes(selected) {
    var group = el("group-filter").value, select = el("step-filter");
    select.replaceChildren();
    var all = node("option", "", group === "all" ? "모든 세부 범위" : "이 분류 전체");
    all.value = "all"; select.append(all);
    if (group === "grammar-structures" && window.PowerGrammarRoute) {
      window.PowerGrammarRoute.choices.forEach(function (scope) {
        var option = node("option", "", scope.label + " (" + scope.count + "문제)");
        option.value = scope.id; select.append(option);
      });
      select.value = window.PowerGrammarRoute.normalizeScope(selected); return;
    }
    taxonomy.groups.forEach(function (section) {
      if (group !== "all" && group !== section.id) { return; }
      var target = select;
      if (group === "all") { target = node("optgroup"); target.label = section.label; }
      taxonomy.subscopes.filter(function (scope) { return scope.group === section.id; }).forEach(function (scope) {
        var count = scopeCounts[scope.id] || 0;
        var option = node("option", "", scope.label + " (" + count.toLocaleString("ko-KR") + "문제)");
        option.value = scope.id; option.disabled = count === 0; target.append(option);
      });
      if (memoryReady && section.id === "grammar-structures") {
        var mixed = node("option", "", "동사 문형 섞어 복습 (" + (scopeCounts[mixedScope] || 0).toLocaleString("ko-KR") + "문제)");
        mixed.value = mixedScope; target.append(mixed);
      }
      if (group === "all") { select.append(target); }
    });
    select.value = Array.from(select.options).some(function (option) { return option.value === selected && !option.disabled; }) ? selected : "all";
  }
  function applyScopeSetting(value) {
    var normalized = taxonomy.normalizeLegacy(value);
    if (memoryReady && value === mixedScope) { normalized = { group: "grammar-structures", scope: mixedScope }; }
    var group = normalized.group;
    if (String(value).indexOf("group-") === 0) { group = String(value).slice(6); normalized.scope = "all"; }
    el("group-filter").value = taxonomy.groups.some(function (item) { return item.id === group; }) ? group : "all";
    populateSubscopes(normalized.scope);
  }
  function filteredQuestions() {
    var scope = el("step-filter").value, group = el("group-filter").value;
    return data.questions.filter(function (q) {
      if (!activeQuestion(q)) { return false; }
      var assigned = scopeOf(q);
      if (window.PowerGrammarRoute) { return window.PowerGrammarRoute.include(group, scope, assigned); }
      return (group === "all" || assigned.group === group) &&
        (scope === "all" || scope === mixedScope && mixedVerbScopes.indexOf(assigned.scope) !== -1 || assigned.scope === scope);
    });
  }
  function updateSettings() {
    var grammar = Boolean(window.PowerGrammarRoute && el("group-filter").value === "grammar-structures");
    el("step-filter-label").hidden = false;
    el("grammar-resume-button").hidden = !grammar;
    el("option-shuffle-setting").hidden = grammar;
    text("question-shuffle-label", grammar ? "문제·보기 순서 함께 섞기" : "문제 순서 섞기");
    if (window.PowerGrammarRoute && el("group-filter").value === "grammar-structures") {
      var chosen = window.PowerGrammarRoute.choices.find(function (scope) { return scope.id === el("step-filter").value; });
      var total = chosen ? chosen.count : window.PowerGrammarRoute.count;
      var size = el("round-size").value, count = size === "all" ? total : Math.min(Number(size), total);
      text("scope-description", "형식·단어 뒤 연결·전치사·어순을 단어별로 확인해요. 1V~5V 보기는 고정 순서이며, 예전 풀이와 기록은 그대로 보존해요.");
      text("pool-summary", "선택 범위 " + total + "문제 중 이번에는 " + count + "문제를 풀어요.");
      text("start-button", el("shuffle-questions").checked ? "섞어서 시작하기 ↗" : "시작하기 ↗"); el("start-button").disabled = false; return;
    }
    el("step-filter-label").hidden = false;
    var pool = filteredQuestions(), size = el("round-size").value;
    var count = size === "all" ? pool.length : Math.min(Number(size), pool.length);
    text("pool-summary", "선택 범위 " + pool.length + "문제 중 이번에는 " + count + "문제를 풀어요. 각 카드에는 1~2단계가 있어요.");
    text("scope-description", groupDescriptions[el("group-filter").value] || "교재 구분 없이 학습 목표로 모았어요. 큰 분류와 세부 범위를 골라 연습하세요.");
    if (el("step-filter").value === mixedScope) {
      text("scope-description", "2·4·5형식, that절, to V·목적어 + to V·V-ing를 섞어요. 범위 이름으로 답을 짐작하지 않고 단어별로 필요한 구조를 떠올려 보세요.");
    }
    if (!pool.length) { text("pool-summary", "이 범위에 등록된 문제는 아직 없어요. 다른 범위를 선택해 주세요. 기존 문제와 학습 기록은 그대로 유지돼요."); }
    text("start-button", el("shuffle-questions").checked || el("shuffle-options").checked ? "섞어서 시작하기 ↗" : "시작하기 ↗");
    el("start-button").disabled = pool.length === 0;
  }
  function startSelected() {
    var grammarUrl = window.PowerGrammarRoute && window.PowerGrammarRoute.launch(el("group-filter").value, el("step-filter").value, { count: el("round-size").value, shuffle: el("shuffle-questions").checked });
    if (grammarUrl) { window.location.assign(grammarUrl); return; }
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
    if (version === memoryVersion) { return Boolean(memoryReady && hasPracticeOptions(practiceVersion)); }
    return version === practiceVersion && previousReady && hardPractice && hardPractice.version === practiceVersion &&
      hardPractice.stages && typeof hardPractice.stages === "object";
  }
  function latestPracticeVersion() {
    return hasPracticeOptions(memoryVersion) ? memoryVersion : hasPracticeOptions(practiceVersion) ? practiceVersion : hasPracticeOptions(previousPracticeVersion) ? previousPracticeVersion : legacyGatedVersion;
  }
  function practiceStage(question, index, version) {
    var original = question.stages[index];
    if (!hasPracticeOptions(version)) { return original; }
    var patch = practice.stages[question.id] && practice.stages[question.id][index];
    var harder = (version === practiceVersion || version === memoryVersion) && hardPractice.stages[question.id] && hardPractice.stages[question.id][index];
    var memory = version === memoryVersion && memoryPractice.stages[question.id] && memoryPractice.stages[question.id][index];
    if (!patch && !harder && !memory) { return original; }
    var revised = Object.assign({}, original, patch || {}, harder || {}, memory || {}, { answer: original.answer });
    return validStage(revised) && new Set(revised.options).size === 4 ? revised : original;
  }
  function isLinkedMeaningStage(card, index) {
    var meta = session && session.practiceVersion === memoryVersion && memoryPractice.metadata && memoryPractice.metadata[card.question.id];
    return index > 0 && !(meta && meta.independent) && card.question.stageMode !== "independent" && /_{2,}/.test(card.stages[0].data.prompt);
  }
  function questionDetail(card, key) {
    var meta = session && session.practiceVersion === memoryVersion && memoryPractice.metadata && memoryPractice.metadata[card.question.id];
    return meta && meta[key] || card.question[key];
  }
  function stagePrompt(card, index) {
    var prompt = card.stages[index].data.prompt, first = card.stages[0];
    if (isLinkedMeaningStage(card, index) && /_{2,}/.test(prompt)) {
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
    if (requestedCategory) { el("group-filter").value = "grammar-structures"; populateSubscopes("all"); }
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
    var summary = questionDetail(card, "answerSummary");
    text("answer-summary-expression", summary.expression);
    text("answer-summary-meaning", summary.meaning);
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
    text("learning-point", questionDetail(card, "learningPoint"));
    var q = card.question, source = q.source || {}, sourceParts = [];
    if (source.bookPage != null && source.bookPage !== "") { sourceParts.push((source.book === "quickstart" ? "퀵스타트 " : "파워토익 VOCA ") + String(source.bookPage).replace(/^p\.?\s*/i, "") + "쪽"); }
    if (source.entry != null && source.entry !== "") { sourceParts.push("항목 " + source.entry); }
    if (source.headword) { sourceParts.push(source.headword); }
    if (q.category) { sourceParts.push("학습 포인트: " + q.category); }
    var linkedSources = quickstartData && quickstartData.references && quickstartData.references[q.id] || [];
    var quickstartPages = linkedSources.map(function (item) { return item.bookPage; });
    if (source.book === "quickstart" && Array.isArray(source.pages)) { quickstartPages = quickstartPages.concat(source.pages); }
    quickstartPages = Array.from(new Set(quickstartPages)).sort(function (a, b) { return a - b; });
    if (quickstartPages.length && !(source.book === "quickstart" && quickstartPages.length === 1 && quickstartPages[0] === source.bookPage)) {
      sourceParts.push("함께 학습: 퀵스타트 " + quickstartPages.join(", ") + "쪽");
    }
    text("question-source", sourceParts.join(" · ") + (sourceParts.length ? "\n" : "") + "교재의 인쇄된 학습 내용을 바탕으로 만든 응용 문제입니다. 예문은 학습을 위해 새로 구성했어요.");
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
    text("question-instruction", isLinkedMeaningStage(card, card.stageIndex) ? "완성된 표현의 뜻을 고르세요." :
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
      button.append(node("span", "review-index", String(index + 1).padStart(2, "0")), node("span", "review-text", stagePrompt(card, 0)), status);
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
  if (!taxonomy || !Array.isArray(taxonomy.groups) || !Array.isArray(taxonomy.subscopes) || typeof taxonomy.classify !== "function" || typeof taxonomy.normalizeLegacy !== "function") {
    error = "학습 분류 파일(taxonomy.js)을 불러오지 못했어요. 새로고침하거나 파일이 함께 있는지 확인해 주세요.";
  }
  if (error) { text("error-message", error); showView("error"); return; }
  data.questions.forEach(function (q) { questionMap.set(q.id, q); signatures.set(q.id, fingerprint(q)); });
  data.questions.forEach(function (q) {
    var assigned = taxonomy.classify(q); questionScopes.set(q.id, assigned);
    if (!activeQuestion(q)) { return; }
    scopeCounts[assigned.scope] = (scopeCounts[assigned.scope] || 0) + 1;
    groupCounts[assigned.group] = (groupCounts[assigned.group] || 0) + 1;
    if (mixedVerbScopes.indexOf(assigned.scope) !== -1) { scopeCounts[mixedScope] = (scopeCounts[mixedScope] || 0) + 1; }
  });
  taxonomy.groups.forEach(function (group) {
    var option = node("option", "", group.label + " (" + (group.id === "grammar-structures" && window.PowerGrammarRoute ? window.PowerGrammarRoute.count : groupCounts[group.id] || 0).toLocaleString("ko-KR") + "문제)");
    option.value = group.id; el("group-filter").append(option);
  });
  populateSubscopes("all");
  el("step-filter-label").hidden = false;
  restoreState();
  document.querySelectorAll("[data-total]").forEach(function (item) { item.textContent = activeCount; });
  if (data.coverage && el("coverage-summary")) {
    text("coverage-summary", quickstartData ? "학습 목표에 따른 " + taxonomy.groups.length + "개 큰 분류 · 기존 " + originalData.questions.length.toLocaleString("ko-KR") + "문제에 퀵스타트 " + quickstartData.questions.length.toLocaleString("ko-KR") + "문제를 더했어요. 같은 표현·학습 목표는 기존 문제에 연결하고, 구조·형태를 묻는 새 문제는 따로 연습해요. 전체 " + data.questions.length.toLocaleString("ko-KR") + "문제이며 문제 수는 단어 수와 달라요." : "학습 목표에 따른 " + taxonomy.groups.length + "개 큰 분류 · 기존 " + data.questions.length.toLocaleString("ko-KR") + "문제예요. 퀵스타트 추가 자료를 불러오지 못했다면 새로고침해 주세요. 기존 기록은 유지돼요.");
  }
  if (memoryReady && el("coverage-summary")) {
    text("coverage-summary", "전체 " + activeCount.toLocaleString("ko-KR") + "문제 · 단어별 결합·문형 암기 연습. " +
      Object.keys(memoryPractice.stages).length.toLocaleString("ko-KR") + "문제의 출제 방식을 개선하고, 빠진 쓰임 " + memoryPractice.questions.length + "문제를 더했어요. 저장된 풀이는 이전 문제 그대로 이어져요.");
  }
  if (lexicalReady && lexicalReview.report && el("coverage-summary")) {
    text("coverage-summary", "교재 표현과 분류는 그대로 · " + lexicalReview.report.revisedCards + "문제의 뜻 보기·결합 단계를 보완했어요. 저장된 풀이와 기존 점수는 이전 문제 그대로 유지돼요.");
  }
  if (usageReady && usageReview.report && el("coverage-summary")) {
    text("coverage-summary", "문장 연결은 의미 관계로, 어형·수식은 단어별 쓰임으로 정리했어요. " + usageReview.report.revisedCards + "문제를 보완했으며 시제·시간 표현과 저장된 풀이·점수는 그대로 유지해요.");
  }
  text("source-title", "학습 자료: " + (data.sourceTitle || "박혜원 파워토익 VOCA") + (quickstartData ? " · 파워토익 퀵스타트 지정 범위" : "") + " · 인쇄 내용만 반영");
  el("start-button").addEventListener("click", startSelected);
  el("group-filter").addEventListener("change", function () { requestedCategory = false; if (window.history && window.location.search) window.history.replaceState(null, "", window.location.pathname); populateSubscopes("all"); updateSettings(); saveState(); });
  el("grammar-resume-button").addEventListener("click", function () { window.location.assign(window.PowerGrammarRoute.launch("grammar-structures", el("step-filter").value, {mode:"resume"})); });
  el("step-filter").addEventListener("change", function () {
    var scope = taxonomy.subscopes.find(function (item) { return item.id === el("step-filter").value; });
    if (memoryReady && el("step-filter").value === mixedScope) { scope = { id: mixedScope, group: "grammar-structures" }; }
    if (scope && el("group-filter").value === "all") { el("group-filter").value = scope.group; populateSubscopes(scope.id); }
  });
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
    fingerprint: fingerprint,
    getCatalogStats: function () { return { original: originalData.questions.length, added: quickstartData ? quickstartData.questions.length : 0, memory: memoryReady ? memoryPractice.questions.length : 0, total: activeCount }; }
  });
  if (el("export-records")) { el("export-records").addEventListener("click", exportRecords); }
  if (el("import-records") && el("import-records-file")) {
    el("import-records").addEventListener("click", function () { el("import-records-file").click(); });
    el("import-records-file").addEventListener("change", importRecords);
  }
  connectAccountSync();
}());
