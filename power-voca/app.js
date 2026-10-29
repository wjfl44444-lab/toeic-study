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
  var semanticReview = window.POWER_VOCA_SEMANTIC_REVIEW;
  var semanticReady = semanticReview && semanticReview.version === "20261024-semantic1" &&
    Array.isArray(semanticReview.questions) && semanticReview.replacements && semanticReview.assignments;
  if (data && semanticReady) {
    data = Object.assign({}, data, { questions: data.questions.concat(semanticReview.questions) });
  }
  var timeReview = window.POWER_VOCA_TIME_REVIEW;
  var timeReady = timeReview && timeReview.version === "20261024-time1" &&
    Array.isArray(timeReview.questions) && timeReview.replacements && timeReview.assignments;
  if (data && timeReady) {
    data = Object.assign({}, data, { questions: data.questions.concat(timeReview.questions) });
  }
  var experienceReview = window.POWER_VOCA_EXPERIENCE_REVIEW;
  var experienceReady = experienceReview && experienceReview.version === "20261025-experience1" &&
    Array.isArray(experienceReview.questions) && experienceReview.replacements && experienceReview.assignments;
  if (data && experienceReady) {
    data = Object.assign({}, data, { questions: data.questions.concat(experienceReview.questions) });
  }
  var unifiedGrammar = window.PowerGrammarAdapter && window.GRAMMAR_PREVIEW && window.PowerGrammarEmbedded ?
    window.PowerGrammarAdapter.create(window.GRAMMAR_PREVIEW.cards, window.PowerGrammarEmbedded) : null;
  if (data && unifiedGrammar) { data = Object.assign({}, data, { questions: data.questions.concat(unifiedGrammar.questions) }); }
  var verbFormsReview = window.PowerVocaVerbFormsReview && window.POWER_VOCA_VERB_FORMS && unifiedGrammar && window.POWER_VOCA_SORTING ?
    window.PowerVocaVerbFormsReview.create({ normalQuestions: unifiedGrammar.questions, sortingData: window.POWER_VOCA_SORTING, facts: window.POWER_VOCA_VERB_FORMS }) : null;
  if (data && verbFormsReview) { data = Object.assign({}, data, { questions: data.questions.concat(verbFormsReview.normalQuestions) }); }
  var sortingReview = window.PowerVocaSortingReview && window.PowerSortingOptionsReview && window.POWER_SORTING_CLASSIFICATION_REVIEW ?
    window.PowerVocaSortingReview.create({ sortingData: verbFormsReview ? verbFormsReview.sortingData : window.POWER_VOCA_SORTING,
      retired: verbFormsReview && verbFormsReview.retired, previousSorting: verbFormsReview && verbFormsReview.previousSorting,
      verbReplacements: verbFormsReview && verbFormsReview.replacements, optionsReview: window.PowerSortingOptionsReview,
      classifications: window.POWER_SORTING_CLASSIFICATION_REVIEW }) : null;
  var sortingPractice = window.PowerVocaSorting && window.POWER_VOCA_SORTING ? window.PowerVocaSorting.create(sortingReview ? sortingReview.sortingData : verbFormsReview ? verbFormsReview.sortingData : window.POWER_VOCA_SORTING) : null;
  var sortingController = null;
  if (data && sortingPractice) { data = Object.assign({}, data, { questions: data.questions.concat(sortingPractice.questions) }); }
  var questionReview = null;
  var questionCuration = null;
  function activeQuestion(q) {
    if (sortingReview && sortingReview.retired.has(q.id)) { return false; }
    if (verbFormsReview && verbFormsReview.retired.has(q.id)) { return false; }
    if (questionCuration && questionCuration.retired.has(q.id)) { return false; }
    if (sortingPractice && sortingPractice.has(q)) { return true; }
    if (unifiedGrammar && !q.grammarOriginId && classifyQuestion(q).group === "grammar-structures") { return false; }
    return !q.internalRoute && (!lexicalReady || !Object.prototype.hasOwnProperty.call(lexicalReview.replacements, q.id)) &&
      (!usageReady || !Object.prototype.hasOwnProperty.call(usageReview.replacements, q.id)) &&
      (!semanticReady || !Object.prototype.hasOwnProperty.call(semanticReview.replacements, q.id)) &&
      (!timeReady || !Object.prototype.hasOwnProperty.call(timeReview.replacements, q.id)) &&
      (!experienceReady || !Object.prototype.hasOwnProperty.call(experienceReview.replacements, q.id)) &&
      (!questionReview || !Object.prototype.hasOwnProperty.call(questionReview.replacements, q.id));
  }
  var activeCount = 0;
  var practice = window.POWER_VOCA_PRACTICE;
  var hardPractice = window.POWER_VOCA_HARD_PRACTICE;
  var practiceVersion = "20261019-hard2";
  var previousPracticeVersion = "20261019-linked1";
  var legacyGatedVersion = "20261019-gated-legacy1";
  var session = null;
  var storageKey = "power-voca-full-v1";
  var history = Object.create(null);
  var bookmarks = Object.create(null), bookmarkIndex = Object.create(null);
  var studyProgress = null, starredStudyProgress = null;
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
  var grammarImported = false;
  var grammarImportOwner = null;
  var unifiedImportReady = !unifiedGrammar;
  var unifiedImportRunning = false;
  var unifiedImportEpoch = -1;
  var syncReader = null;
  var migrationOriginals = null;
  var observedOwner = null;
  var pendingLegacySource = null;
  var unreadableOriginal = null;
  var originalBackupKey = storageKey + ":unreadable-backup:" + Date.now();
  var accountEpoch = 0;
  var requestedCategory = new URLSearchParams(window.location.search || "").get("category") === "grammar-structures";
  var letters = ["1", "2", "3", "4", "5", "6", "7", "8"];
  var keyboardComposing = false;
  var views = ["loading", "error", "start", "quiz", "sorting", "results"];
  // Taxonomy is external: do not alter any question object or saved fingerprint.
  // One existing settings.step string stores either a subgroup or group-<id>.
  var taxonomy = window.PowerVocaTaxonomy;
  if (usageReady) { taxonomy = window.PowerVocaUsageRouting.createTaxonomy(taxonomy, usageReview); }
  if (unifiedGrammar) {
    taxonomy = Object.assign({}, taxonomy, { subscopes: taxonomy.subscopes.filter(function (item) { return item.group !== "grammar-structures"; }).concat(unifiedGrammar.subscopes) });
  }
  if (sortingPractice) {
    taxonomy = Object.assign({}, taxonomy, {
      groups: taxonomy.groups.concat([{ id: "sorting-practice", label: "표로 분류하기" }]),
      subscopes: taxonomy.subscopes.concat(sortingPractice.subscopes)
    });
  }
  if (data && window.PowerVocaQuestionReview && typeof window.PowerVocaQuestionReview.create === "function") {
    questionReview = window.PowerVocaQuestionReview.create(data.questions, classifyQuestion);
    data = Object.assign({}, data, { questions: data.questions.concat(questionReview.questions) });
  }
  if (data && window.PowerVocaQuestionCuration) { questionCuration = window.PowerVocaQuestionCuration.create(data.questions, classifyQuestion); }
  activeCount = data ? data.questions.filter(activeQuestion).length : 0;
  var wrongReview = window.PowerVocaWrongReview && data ? window.PowerVocaWrongReview.create({
    questions: data.questions, isActive: activeQuestion, grammar: unifiedGrammar, label: wrongReviewLabel,
    replacements: [lexicalReady && lexicalReview.replacements, usageReady && usageReview.replacements,
      semanticReady && semanticReview.replacements, timeReady && timeReview.replacements,
      experienceReady && experienceReview.replacements, questionReview && questionReview.replacements,
      questionCuration && questionCuration.replacements, verbFormsReview && verbFormsReview.replacements,
      sortingReview && sortingReview.replacements]
  }) : null;
  var wrongReviewPage = 0;
  var starredReviewPage = 0;
  var progressManager = window.PowerVocaStudyProgress ? window.PowerVocaStudyProgress.create({
    resolve: function (id) { return wrongReview ? wrongReview.resolve(id) : questionMap.get(id); }
  }) : null;
  var wrongReviewPageSize = 10;
  var questionScopes = new Map();
  var groupCounts = Object.create(null);
  var scopeCounts = Object.create(null);
  var mixedScope = "mixed-verb-patterns";
  var mixedVerbScopes = ["second-pattern", "fourth-pattern", "fifth-pattern", "verb-arguments", "verb-that",
    "verb-to-infinitive", "object-to-infinitive", "verb-gerund"];
  var groupDescriptions = {
    "sorting-practice": "단어를 한눈에 모아 보고 해당하는 분류를 모두 체크해요. 분류 후에는 단어별 뜻을 확인해요.",
    "grammar-structures": "어떤 동사가 목적어·보어·that절·to V·V-ing를 받는지 단어별로 익혀요. depend on 같은 자동사 + 전치사도 여기에 있어요.",
    "collocations": "place an order, strongly recommend처럼 함께 쓰이는 특정 단어의 조합을 모았어요.",
    "word-forms": "명사 쓰임·어형·복합명사·수식 표현을 단어별로 익혀요. 어떤 형태와 결합이 가능한지 직접 확인해요.",
    "time-expressions": "현재·과거·미래·완료 시제와 관련된 부사·시간 표현을 모았어요.",
    "sentence-links": "원인·양보·조건 등 의미 관계 안에서 전치사·접속사·접속부사를 함께 연습해요. 표현의 뜻과 실제 연결 방식을 확인해요.",
    "meanings": "다의어·다품사어와 혼동 어휘, 비슷한 뜻의 재표현을 함께 확인해요."
  };

  function nativeQuestion(q) { return q && q.format === "semantic-set1" && /^semantic1-/.test(q.id); }
  function blindSet(card) { return nativeQuestion(card.question) && card.question.stageMode === "set" && (!card.question.firstAnswerGate || card.stageIndex > 0); }
  function answerIndices(stage) { return stage.multiple ? stage.answers : [stage.answer]; }
  function selectedIndices(stage) { return stage.selected === null ? [] : Array.isArray(stage.selected) ? stage.selected : [stage.selected]; }
  function chose(stage, index) { return selectedIndices(stage).indexOf(index) !== -1; }
  function stageCorrect(stage) {
    var selected = selectedIndices(stage), sets = stage.data.acceptedAnswerSets || [answerIndices(stage.data)];
    return sets.some(function (answers) { return selected.length === answers.length && answers.every(function (n) { return selected.indexOf(n) !== -1; }); });
  }
  function validSelection(selected, data) {
    if (selected === null) { return true; }
    var values = data.multiple ? selected : [selected];
    return Array.isArray(values) && values.length > 0 && new Set(values).size === values.length &&
      values.every(function (n) { return Number.isInteger(n) && n >= 0 && n < data.options.length; });
  }
  function describeChoices(stage, indices) {
    return stage.choices.filter(function (choice) { return indices.indexOf(choice.originalIndex) !== -1; })
      .map(function (choice) { return letters[stage.choices.indexOf(choice)] + " · " + cleanOption(choice.text); }).join(" / ");
  }
  function cleanOption(value) { return String(value).replace(/^뜻은\s*[「『\[](.+)[」』\]](?:이다)?\.?$/, "$1"); }
  function visiblePrompt(card, index) {
    var raw = stagePrompt(card,index), match = raw.match(/\n\s*대상 표현:\s*([^\n]+)\s*$/);
    return match ? raw.slice(0,match.index).trim() || match[1] : raw;
  }
  function visibleInstruction(card, index) {
    var s = card.stages[index].data, raw = stagePrompt(card,index), match = raw.match(/대상 표현:\s*([^\n]+)\s*$/);
    if (match && /뜻|의미/.test(s.instruction || "")) { return match[1] + "의 뜻을 고르세요."; }
    if (match && /유사|비슷|가까운/.test(s.instruction || "")) { return match[1] + "와 비슷한 표현을 고르세요."; }
    return s.instruction || "문맥에 가장 알맞은 답을 하나 고르세요.";
  }
  function questionPresentation(card, index) {
    var content = { instruction: isLinkedMeaningStage(card, index) ? "완성된 표현의 뜻을 고르세요." : visibleInstruction(card, index),
      prompt: visiblePrompt(card, index), context: card.stages[index].data.context || "" };
    return window.PowerVocaQuestionView && typeof window.PowerVocaQuestionView.present === "function" ?
      window.PowerVocaQuestionView.present(card.question, index, content) : content;
  }
  function wrongReviewLabel(question) {
    var preview = { question: question, stages: [{ data: practiceStage(question, 0, latestPracticeVersion()) }] };
    var content = questionPresentation(preview, 0);
    return content.prompt || content.instruction;
  }
  function classifyQuestion(q) {
    return verbFormsReview && verbFormsReview.assignments[q.id] || sortingPractice && sortingPractice.assignments[q.id] || questionReview && questionReview.assignments[q.id] || unifiedGrammar && unifiedGrammar.assignments[q.id] || experienceReady && experienceReview.assignments[q.id] || timeReady && timeReview.assignments[q.id] || semanticReady && semanticReview.assignments[q.id] || taxonomy.classify(q);
  }

  function el(id) { return document.getElementById(id); }
  function text(id, value) {
    if (id === "pool-summary") {
      var pool = String(value).match(/^선택 범위 ([\d,]+)문제 중 이번에는 ([\d,]+)문제/);
      if (pool) { value = pool[1] === pool[2] ? "총 " + pool[1] + "문제" : "총 " + pool[1] + "문제 중 " + pool[2] + "문제"; }
    }
    if (id === "resume-summary") {
      var progress = String(value).match(/^(\d+)문제 중 (\d+)문제 채점/);
      if (progress) { value = progress[2] + " / " + progress[1] + "문제 완료"; }
    }
    el(id).textContent = value;
  }
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
    renderReviewContinuation();
  }
  function focusHeading(id) {
    el(id).focus({ preventScroll: true });
    (el(id).closest(".question-panel") || el(id)).scrollIntoView({ block: "start", behavior: "auto" });
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
    text("record-state", message ? "저장 상태 확인" : connectionWarning ? "기기 저장 중" : studySync && studySync.isAccountActive() ? "계정 연결" : "기기 저장");
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
    if (session.studyRun) { saved.studyRun = Object.assign({}, session.studyRun); }
    if (session.resumeStudyRun) { saved.resumeStudyRun = Object.assign({}, session.resumeStudyRun); }
    if (session.sorting) { saved.sorting = JSON.parse(JSON.stringify(session.sorting)); }
    return saved;
  }
  function currentSettings() {
    var scope = el("step-filter").value, group = el("group-filter").value;
    return { roundSize: el("round-size").value, step: scope !== "all" ? scope : group === "all" ? "all" : "group-" + group,
      shuffleQuestions: el("shuffle-questions").checked, shuffleOptions: el("shuffle-options").checked };
  }
  function currentPayload(compact) {
    var saved = { version: 1, session: serializedSession(), history: history, settings: currentSettings() };
    if (Object.keys(bookmarks).length) { saved.bookmarks = bookmarks; }
    if (archivedHistory.length) { saved.archivedHistory = archivedHistory; }
    if (syncReceipts) { saved._studySync = syncReceipts; }
    if (grammarImported) { saved.grammarImported = true; }
    if (grammarImportOwner) { saved.grammarImportOwner = grammarImportOwner; }
    if (studyProgress) { saved.studyProgress = studyProgress; }
    if (starredStudyProgress) { saved.starredStudyProgress = starredStudyProgress; }
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
      var firstPicked = stored.stages[0] && stored.stages[0].selected;
      var firstValues = firstPicked === null ? [] : Array.isArray(firstPicked) ? firstPicked : [firstPicked];
      var wrongFirst = firstValues.length > 0 && !stageCorrect({ data: q.stages[0], selected: firstPicked });
      var earlyEnd = stored.graded && stored.stageIndex === 0 && wrongFirst &&
        (q.firstAnswerGate && q.stages.length > 1 || q.stageMode !== "set" && saved.practiceVersion && q.stages.length === 2) &&
        stored.stages.slice(1).every(function (s) { return s && s.selected === null; });
      var classificationEnd = saved.sorting && saved.sorting.classificationOnly === true && sortingPractice && sortingPractice.has(q) &&
        stored.stageIndex === 0 && firstValues.length > 0 && stored.stages.slice(1).every(function (s) { return s && s.selected === null; });
      var stages = [];
      for (var j = 0; j < q.stages.length; j += 1) {
        var stage = stored.stages[j], order = stage && stage.order, stageData = practiceStage(q, j, version);
        if (!stage || !Array.isArray(order) || order.length !== stageData.options.length || new Set(order).size !== order.length ||
            !order.every(function (n) { return Number.isInteger(n) && n >= 0 && n < order.length; }) ||
            !validSelection(stage.selected, stageData) ||
          stored.graded && stage.selected === null && !((earlyEnd || classificationEnd) && j > 0)) { return null; }
        stages.push({ data: stageData, selected: stage.selected, choices: order.map(function (n) { return { text: stageData.options[n], originalIndex: n }; }) });
      }
      var sharedOrders = Object.create(null);
      if (stages.some(function (s) {
        var key = s.data.choiceGroup, order = s.choices.map(function (c) { return c.originalIndex; }).join("");
        if (!key) { return false; }
        if (sharedOrders[key] && sharedOrders[key] !== order) { return true; }
        sharedOrders[key] = order; return false;
      })) { return null; }
      if (q.routeRoot && (stored.graded || stored.stageIndex > 0)) {
        var rootQuestion = questionMap.get(q.routeRoot), picked = selectedIndices(stages[0]);
        if (!rootQuestion || posRouteId(rootQuestion,picked) !== q.id ||
            picked.some(function (n) { return answerIndices(stages[0].data).indexOf(n) === -1; })) { return null; }
      }
      cards.push({ question: q, stageIndex: stored.stageIndex, graded: stored.graded, deferred: stored.deferred === true, stages: stages });
      ids.add(q.id);
    }
    var restored = { mode: saved.mode === "starred" ? "starred" : saved.mode === "wrong" ? "wrong" : "all", index: saved.index,
      startedAt: typeof saved.startedAt === "string" ? saved.startedAt : new Date().toISOString(), cards: cards };
    if (version) { restored.practiceVersion = version; }
    if (saved.studyRun) { restored.studyRun = Object.assign({}, saved.studyRun); }
    if (saved.resumeStudyRun) { restored.resumeStudyRun = Object.assign({}, saved.resumeStudyRun); }
    if (saved.sorting) {
      restored.sorting = JSON.parse(JSON.stringify(saved.sorting));
      if (!sortingPractice || !sortingPractice.validateSession(restored)) { return null; }
    }
    if (verbFormsReview) {
      restored = verbFormsReview.migrateSession(restored, questionMap);
      if (restored.sorting && !sortingPractice.validateSession(restored)) { return null; }
    }
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
        bookmarks = saved.bookmarks || Object.create(null); rebuildBookmarkIndex();
        studyProgress = saved.studyProgress || null;
        starredStudyProgress = saved.starredStudyProgress || null;
        grammarImported = saved.grammarImported === true;
        grammarImportOwner = saved.grammarImportOwner || null;
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
    if (options.accountSwitch === true) { accountEpoch += 1; unifiedImportReady = !unifiedGrammar; unifiedImportEpoch = -1; migrationOriginals = null; }
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
        bookmarks = merged.bookmarks || Object.create(null); rebuildBookmarkIndex(); renderBookmarkButtons();
        studyProgress = merged.studyProgress || null;
        starredStudyProgress = merged.starredStudyProgress || null;
        grammarImported = merged.grammarImported === true;
        grammarImportOwner = merged.grammarImportOwner || null;
        syncReceipts = merged._studySync || null;
        renderHistory();
        renderWrongReview();
        if (view === "start") { updateSettings(); }
        if (view === "results") { renderStudyContinuation(); }
        if (view === "quiz" && session) {
          text("question-wrong-count", "누적 오답 " + cumulativeWrongCount(currentCard().question) + "회");
          if (currentCard().graded) { text("feedback-wrong-count", "이 문제 누적 오답 " + cumulativeWrongCount(currentCard().question) + "회"); }
        }
      } else {
        history = saved.history; archivedHistory = saved.archivedHistory;
        bookmarks = saved.bookmarks || Object.create(null); rebuildBookmarkIndex(); renderBookmarkButtons();
        if (options.accountSwitch === true) { el("bookmarks-only").checked = false; }
        studyProgress = saved.studyProgress || null;
        starredStudyProgress = saved.starredStudyProgress || null;
        grammarImported = saved.grammarImported === true;
        grammarImportOwner = saved.grammarImportOwner || null;
        if (!options.deferReady && grammarImported && currentOwner() && grammarImportOwner === fingerprint(currentOwner())) { unifiedImportReady = true; }
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
    import("../shared/study-sync.js?v=20261025-unified1").then(function (module) {
      syncReader = module.readLegacyGrammarRecord;
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
        },
        onStatusChange: function (status) {
          var owner = currentOwner();
          if (owner && observedOwner && owner !== observedOwner) {
            accountEpoch += 1; unifiedImportEpoch = -1; unifiedImportReady = false; migrationOriginals = null; pendingLegacySource = null;
            showView("loading");
          }
          if (owner) { observedOwner = owner; }
          if (status.ready && unifiedImportEpoch !== accountEpoch) { void prepareUnifiedPractice(); }
        }
      });
      reportStorage(storageWarning);
    }).catch(function () {
      connectionWarning = "기기 저장 사용 중 · 계정 연결을 불러오지 못했어요. 인터넷 연결을 확인하고 다시 열어 주세요.";
      reportStorage(storageWarning);
    });
  }
  function currentOwner() {
    return studySync && studySync.getOwnerKey ? studySync.getOwnerKey() : window.location.protocol !== "https:" && window.location.protocol !== "http:" ? "guest" : null;
  }
  async function prepareUnifiedPractice(cloudOnly) {
    if (!unifiedGrammar) { unifiedImportReady = true; return; }
    var expectedOwner = currentOwner();
    if (grammarImported && expectedOwner && grammarImportOwner === fingerprint(expectedOwner)) {
      unifiedImportReady = true; unifiedImportEpoch = accountEpoch;
      var owner = expectedOwner;
      if (owner) {
        try {
          var priorKey = window.localStorage.getItem("toeic-unified-originals:" + fingerprint(owner));
          var prior = priorKey && priorKey.indexOf("toeic-unified-backup:") === 0 && JSON.parse(window.localStorage.getItem(priorKey));
          if (prior && prior.owner === owner) { migrationOriginals = prior; el("legacy-restore").hidden = false; }
        } catch (_) { /* A backup lookup never blocks an already unified round. */ }
      }
      updateSettings(); return;
    }
    if (unifiedImportRunning && unifiedImportEpoch === accountEpoch) { return; }
    var ticket = accountEpoch;
    unifiedImportRunning = true; unifiedImportEpoch = ticket; unifiedImportReady = false;
    updateSettings();
    try {
      var hosted = window.location.protocol === "https:" || window.location.protocol === "http:";
      var source = cloudOnly && pendingLegacySource || (hosted ? await syncReader() : { owner: "guest", payload: window.localStorage.getItem("toeic-power-grammar:v1"), revision: 0 });
      if (ticket !== accountEpoch || !expectedOwner || source.owner !== expectedOwner || currentOwner() !== expectedOwner) { return; }
      var before = currentPayload(true);
      var backup = JSON.stringify({ kind: "toeic-unified-originals", version: 1, owner: source.owner, nativeRaw: before, grammarRaw: source.payload, grammarCacheRaw: source.cacheRaw || null });
      var backupKey = "toeic-unified-backup:" + fingerprint({ owner: source.owner, native: before, grammar: source.payload, cache: source.cacheRaw || null });
      var existing = window.localStorage.getItem(backupKey);
      if (existing && existing !== backup) { backupKey += ":" + Date.now(); }
      window.localStorage.setItem(backupKey, backup);
      if (window.localStorage.getItem(backupKey) !== backup) { throw new Error("이전 풀이의 원본 백업을 저장하지 못했어요. 저장 공간을 확인해 주세요."); }
      var pointerKey = "toeic-unified-originals:" + fingerprint(source.owner);
      var pointer = window.localStorage.getItem(pointerKey);
      var original = null;
      if (pointer && pointer.indexOf("toeic-unified-backup:") === 0) {
        try { original = JSON.parse(window.localStorage.getItem(pointer)); } catch (_) { /* Retain the fresh verified backup. */ }
      }
      if (!original || original.owner !== source.owner) {
        window.localStorage.setItem(pointerKey, backupKey);
        if (window.localStorage.getItem(pointerKey) !== backupKey) { throw new Error("이전 풀이의 백업 위치를 저장하지 못했어요."); }
        original = JSON.parse(backup);
      }
      migrationOriginals = original;
      var reconciled = window.PowerVocaUnifiedMigration.reconcileLegacySource(source);
      if (!reconciled.resolved && !cloudOnly) {
        pendingLegacySource = source; el("migration-cloud-button").hidden = false;
        throw new Error("이전 기기의 미확인 풀이를 원본 백업에 보관했어요. 계정 기록으로 통합할지 선택해 주세요.");
      }
      var plan = window.PowerVocaUnifiedMigration.plan(before, reconciled.resolved ? reconciled.payload : source.payload, { adapter: unifiedGrammar, practiceVersion: latestPracticeVersion() });
      plan.payload.grammarImportOwner = fingerprint(expectedOwner); plan.raw = syncModel.stringify(plan.payload, true);
      if (ticket !== accountEpoch || currentOwner() !== expectedOwner) { return; }
      applyStudyPayload(plan.raw, { reason: "restore", deferReady: true });
      unifiedImportReady = false;
      if (!saveState()) {
        applyStudyPayload(before, { reason: "restore", deferReady: true }); unifiedImportReady = false;
        throw new Error("통합한 풀이를 저장하지 못했어요. 이전 원본은 백업에 보관돼 있어요.");
      }
      if (ticket !== accountEpoch) { return; }
      unifiedImportReady = true; reportStorage("");
      el("migration-retry-button").hidden = true;
      el("migration-cloud-button").hidden = true; pendingLegacySource = null;
      el("legacy-restore").hidden = !migrationOriginals;
      showStart();
    } catch (error) {
      if (ticket !== accountEpoch) { return; }
      unifiedImportReady = false;
      reportStorage(error.message || "이전 기록을 확인하지 못했어요. 원본 기록은 그대로 보관돼 있어요.");
      el("migration-retry-button").hidden = false;
    } finally {
      if (ticket === accountEpoch) { unifiedImportRunning = false; updateSettings(); }
    }
  }
  function restorePreviousDraft() {
    if (!unifiedImportReady || !migrationOriginals) { return; }
    var owner = currentOwner();
    if (!owner || owner !== migrationOriginals.owner) { return; }
    if (!window.confirm("진행 중인 연습을 선택한 이전 풀이로 바꿀까요? 현재 풀이를 백업하고 누적 기록은 유지해요.")) { return; }
    try {
      var current = currentPayload(true), next;
      if (el("legacy-round-select").value === "grammar") {
        next = window.PowerVocaUnifiedMigration.plan(current, migrationOriginals.grammarRaw, { adapter: unifiedGrammar, practiceVersion: latestPracticeVersion(), selectSession: "grammar" }).payload;
      } else {
        var old = syncModel.parse(migrationOriginals.nativeRaw);
        if (!old || !old.session) { throw new Error("보관된 이전 풀이가 없어요."); }
        next = syncModel.parse(syncModel.merge(null, current, migrationOriginals.nativeRaw));
        next.session = old.session; next.settings = old.settings; next.grammarImported = true;
      }
      if (!next.session) { throw new Error("보관된 이전 풀이가 없어요."); }
      var key = "toeic-unified-restore-backup:" + Date.now();
      window.localStorage.setItem(key, current);
      if (window.localStorage.getItem(key) !== current) { throw new Error("현재 풀이를 백업하지 못했어요."); }
      if (currentOwner() !== owner) { return; }
      applyStudyPayload(syncModel.stringify(next, true), { reason: "restore" });
      if (saveState()) { showStart(); }
      else { applyStudyPayload(current, { reason: "restore" }); throw new Error("풀이 전환을 저장하지 못해 기존 풀이로 돌아왔어요."); }
    } catch (error) { reportStorage(error.message || "이전 풀이를 불러오지 못했어요."); }
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
    var id = card.question.historyKey || card.question.id;
    var item = history[id];
    if (!item || item.signature !== signatures.get(id)) {
      if (item && syncModel) { archivedHistory.push(Object.assign({ id: id }, item)); }
      var archivedIndex = archivedHistory.findIndex(function (record) { return record.id === id && record.signature === signatures.get(id); });
      item = archivedIndex === -1 ? { signature: signatures.get(id), attempts: 0, correct: 0, stagesGraded: 0, stagesCorrect: 0 } : archivedHistory.splice(archivedIndex, 1)[0];
    }
    item.attempts += 1;
    if (isAllCorrect(card)) { item.correct += 1; }
    item.stagesGraded += card.stages.filter(function (stage) { return stage.selected !== null; }).length;
    item.stagesCorrect += card.stages.filter(stageCorrect).length;
    item.lastCorrect = isAllCorrect(card); item.lastStudiedAt = new Date().toISOString();
    history[id] = item;
    if (progressManager && session && session.mode === "all") {
      ensureStudyProgress();
      studyProgress = progressManager.mark(studyProgress, id, session.studyRun ? session.studyRun.pass : 1);
    }
    if (progressManager && session && session.mode === "starred") {
      ensureStarredStudyProgress();
      starredStudyProgress = progressManager.mark(starredStudyProgress, id, session.studyRun ? session.studyRun.pass : 1);
    }
  }
  function renderHistory() {
    var items = Object.keys(history).map(function (id) { return history[id]; }).concat(archivedHistory);
    var attempts = items.reduce(function (sum, item) { return sum + item.attempts; }, 0);
    var correct = items.reduce(function (sum, item) { return sum + item.stagesCorrect; }, 0);
    var graded = items.reduce(function (sum, item) { return sum + item.stagesGraded; }, 0);
    var learned = new Set(Object.keys(history).concat(archivedHistory.map(function (item) { return item.id; }))).size;
    text("history-summary", attempts ? "학습한 문제 " + learned + "개 · 누적 채점 " + attempts + "회 · 단계별 정답률 " + Math.round(correct / Math.max(graded, 1) * 100) + "%" : "아직 채점한 문제가 없어요.");
  }
  function bookmarkKey(question) {
    var q = wrongReview && wrongReview.resolve(question.historyKey || question.routeRoot || question.id) || question;
    var first = q.stages[0], name = q.displayExpression;
    if ((q.sortingTopic === "verb-forms" || q.grammarPool === "forms" && first.multiple &&
        first.options.length === 5 && first.options.every(function (value) { return /^[1-5]V$/.test(value); })) &&
        typeof name === "string" && /^[a-z]+(?:[ -][a-z]+)*$/.test(name)) {
      return "verb-form-" + name.replace(/ /g, "-");
    }
    return q.routeRoot || q.id;
  }
  function rebuildBookmarkIndex() {
    bookmarkIndex = Object.create(null);
    Object.keys(bookmarks).forEach(function (id) {
      var q = questionMap.get(id), key = q ? bookmarkKey(q) : id;
      var value = bookmarks[id], previous = bookmarkIndex[key];
      if (!previous || value.updatedAt > previous.updatedAt || value.updatedAt === previous.updatedAt && !value.starred) { bookmarkIndex[key] = value; }
    });
  }
  function isBookmarked(question) {
    var value = bookmarkIndex[bookmarkKey(question)]; return Boolean(value && value.starred);
  }
  function paintBookmarkButton(button) {
    var value = bookmarkIndex[button.dataset.bookmarkKey], starred = Boolean(value && value.starred);
    button.setAttribute("aria-pressed", String(starred));
    button.setAttribute("aria-label", starred ? "별표 해제" : "별표 표시");
    button.title = starred ? "별표 해제" : "별표 표시";
  }
  function renderBookmarkButtons() { document.querySelectorAll("[data-bookmark-key]").forEach(paintBookmarkButton); }
  function toggleBookmark(question) {
    var key = bookmarkKey(question), previous = bookmarkIndex[key], before = bookmarks[key];
    bookmarks[key] = { starred: !(previous && previous.starred), updatedAt: new Date(Math.max(Date.now(), previous ? Date.parse(previous.updatedAt) + 1 : 0)).toISOString() };
    rebuildBookmarkIndex();
    if (!saveState()) { if (before) { bookmarks[key] = before; } else { delete bookmarks[key]; } rebuildBookmarkIndex(); }
    renderBookmarkButtons(); if (view === "start") { updateSettings(); }
    announce(isBookmarked(question) ? "별표를 표시했어요." : "별표를 해제했어요.");
  }
  function bookmarkButton(question) {
    var button = node("button", "bookmark-button"); button.type = "button";
    button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3.2 14.7 8.65 20.7 9.52 16.35 13.76 17.38 19.76 12 16.92 6.62 19.76 7.65 13.76 3.3 9.52 9.3 8.65Z"/></svg>';
    button.dataset.bookmarkKey = bookmarkKey(question); paintBookmarkButton(button);
    button.addEventListener("keydown", function (event) { if (event.key === " ") { event.stopPropagation(); } });
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleBookmark(question);
    });
    return button;
  }
  function wrongReviewEntries() {
    if (!wrongReview) { return []; }
    var minimum = window.PowerVocaWrongReview.threshold(el("wrong-review-min").value);
    return wrongReview.aggregate(history, archivedHistory).entries.filter(function (entry) { return entry.wrongCount >= minimum; });
  }
  function cumulativeWrongCount(question) {
    if (!wrongReview) { return 0; }
    var active = wrongReview.resolve(question.historyKey || question.id);
    var entry = active && wrongReview.aggregate(history, archivedHistory).byId.get(active.id);
    return entry ? entry.wrongCount : 0;
  }
  function renderWrongReview() {
    if (!el("wrong-review-panel")) { return; }
    var entries = wrongReviewEntries(), minimum = window.PowerVocaWrongReview ? window.PowerVocaWrongReview.threshold(el("wrong-review-min").value) : 1;
    var pages = Math.max(1, Math.ceil(entries.length / wrongReviewPageSize));
    wrongReviewPage = Math.min(wrongReviewPage, pages - 1);
    var total = entries.reduce(function (sum, entry) { return sum + entry.wrongCount; }, 0);
    text("wrong-review-summary", entries.length ? "누적 " + minimum + "회 이상 틀린 문제 " + entries.length + "개 · 오답 " + total + "회" : "누적 " + minimum + "회 이상 틀린 문제가 아직 없어요.");
    var list = el("wrong-review-list"); list.replaceChildren();
    entries.slice(wrongReviewPage * wrongReviewPageSize, (wrongReviewPage + 1) * wrongReviewPageSize).forEach(function (entry) {
      var row = node("li", "wrong-review-row");
      row.append(node("span", "wrong-review-expression", entry.expression), node("span", "wrong-review-count", "누적 오답 " + entry.wrongCount + "회"));
      list.append(row);
    });
    list.hidden = !entries.length;
    el("wrong-review-pagination").hidden = pages === 1;
    text("wrong-review-page", (wrongReviewPage + 1) + " / " + pages);
    el("wrong-review-previous").disabled = wrongReviewPage === 0;
    el("wrong-review-next").disabled = wrongReviewPage >= pages - 1;
    text("wrong-review-start", entries.length ? "오답 " + entries.length + "문제 풀기" : "오답 풀기");
    el("wrong-review-start").disabled = !entries.length || !unifiedImportReady;
  }
  function startWrongReview() {
    if (!unifiedImportReady) { announce("이전 풀이를 안전하게 준비하고 있어요."); return; }
    var entries = wrongReviewEntries();
    if (!entries.length) { return; }
    if (session && totals().ungraded && !window.confirm("새 연습을 시작하면 저장된 이어 풀기가 새 풀이로 바뀌어요. 누적 채점 기록은 남아요. 시작할까요?")) { return; }
    begin(entries.map(function (entry) { return entry.question; }), "wrong", false);
  }
  function starredReviewEntries() {
    var entries = new Map();
    data.questions.forEach(function (question) {
      if (!activeQuestion(question) || !isBookmarked(question)) { return; }
      var key = bookmarkKey(question), previous = entries.get(key);
      // Normal and table verb cards share one star. Offer the normal card once,
      // while retaining table-only cards in this all-category collection.
      if (!previous || sortingPractice && sortingPractice.has(previous.question) && !sortingPractice.has(question)) {
        entries.set(key, { key: key, question: question, expression: question.displayExpression || wrongReviewLabel(question), updatedAt: bookmarkIndex[key].updatedAt });
      }
    });
    return Array.from(entries.values()).sort(function (a, b) {
      return b.updatedAt.localeCompare(a.updatedAt) || a.expression.localeCompare(b.expression, "ko") || a.key.localeCompare(b.key);
    });
  }
  function renderStarredReview() {
    var entries = starredReviewEntries(), pages = Math.max(1, Math.ceil(entries.length / wrongReviewPageSize));
    var progress = unifiedImportReady && progressForRun({ scope: "all", collection: "starred" });
    starredReviewPage = Math.min(starredReviewPage, pages - 1);
    text("starred-review-summary", entries.length ? "별표한 문제 " + entries.length + "개" + (progress ? " · 남은 " + progress.remaining + "문제" : "") : "아직 별표한 문제가 없어요.");
    var list = el("starred-review-list"); list.replaceChildren();
    entries.slice(starredReviewPage * wrongReviewPageSize, (starredReviewPage + 1) * wrongReviewPageSize).forEach(function (entry) {
      var row = node("li", "wrong-review-row");
      row.append(node("span", "wrong-review-expression", entry.expression), bookmarkButton(entry.question));
      list.append(row);
    });
    list.hidden = !entries.length;
    el("starred-review-pagination").hidden = pages === 1;
    text("starred-review-page", (starredReviewPage + 1) + " / " + pages);
    el("starred-review-previous").disabled = starredReviewPage === 0;
    el("starred-review-next").disabled = starredReviewPage >= pages - 1;
    var size = currentSettings().roundSize, count = progress ? size === "all" ? progress.remaining : Math.min(Number(size), progress.remaining) : entries.length;
    text("starred-review-start", progress && progress.complete ? "별표 " + (progress.pass + 1) + "회독 시작" : entries.length ? "별표 " + count + "문제 풀기" : "별표 문제 풀기");
    el("starred-review-start").disabled = !entries.length || !unifiedImportReady;
  }
  function startStarredReview() {
    if (!unifiedImportReady) { announce("이전 풀이를 안전하게 준비하고 있어요."); return; }
    var entries = starredReviewEntries();
    if (!entries.length) { return; }
    if (session && totals().ungraded && !window.confirm("새 연습을 시작하면 저장된 이어 풀기가 새 풀이로 바뀌어요. 누적 채점 기록은 남아요. 시작할까요?")) { return; }
    var state = progressForRun({ scope: "all", collection: "starred" });
    if (state && state.complete) { advanceStudyPass("all", currentSettings().roundSize, "starred"); }
    else { beginStarredRemaining("all", currentSettings().roundSize); }
  }
  function showReviewCollection(mode) {
    ["wrong", "starred"].forEach(function (name) {
      el(name + "-review-panel").hidden = name !== mode;
      el("review-mode-" + name).setAttribute("aria-pressed", String(name === mode));
    });
  }
  function scopeOf(q) { return questionScopes.get(q.id); }
  function populateSubscopes(selected) {
    var group = el("group-filter").value, select = el("step-filter");
    select.replaceChildren();
    var all = node("option", "", group === "all" ? "모든 세부 범위" : "이 분류 전체");
    all.value = "all"; select.append(all);
    if (group === "sorting-practice" && sortingPractice) {
      select.replaceChildren();
      sortingPractice.subscopes.forEach(function (scope) {
        var option = node("option", "", scope.label + " (" + (scopeCounts[scope.id] || 0) + "개)");
        option.value = scope.id; select.append(option);
      });
      select.value = sortingPractice.subscopes.some(function (scope) { return scope.id === selected; }) ? selected : sortingPractice.subscopes[0].id;
      return;
    }
    if (group === "grammar-structures" && unifiedGrammar) {
      unifiedGrammar.subscopes.forEach(function (scope) {
        var option = node("option", "", scope.label + " (" + (scopeCounts[scope.id] || 0) + "문제)");
        option.value = scope.id; select.append(option);
      });
      select.value = unifiedGrammar.subscopes.some(function (s) { return s.id === selected; }) ? selected : "all"; return;
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
  function normalizeScopeSetting(value) {
    var normalized = taxonomy.normalizeLegacy(value);
    if (sortingPractice && sortingPractice.subscopes.some(function (s) { return s.id === value; })) { normalized = { group: "sorting-practice", scope: value }; }
    if (unifiedGrammar && unifiedGrammar.subscopes.some(function (s) { return s.id === value; })) { normalized = { group: "grammar-structures", scope: value }; }
    if (memoryReady && value === mixedScope) { normalized = { group: "grammar-structures", scope: mixedScope }; }
    if (String(value).indexOf("group-") === 0) { normalized = { group: String(value).slice(6), scope: "all" }; }
    return normalized;
  }
  function applyScopeSetting(value) {
    var normalized = normalizeScopeSetting(value), group = normalized.group;
    el("group-filter").value = taxonomy.groups.some(function (item) { return item.id === group; }) ? group : "all";
    populateSubscopes(normalized.scope);
  }
  function poolForScope(setting) {
    var normalized = normalizeScopeSetting(setting), scope = normalized.scope, group = normalized.group;
    if (setting !== "all" && scope === "all" && group === "all") { return []; }
    return data.questions.filter(function (q) {
      if (!activeQuestion(q)) { return false; }
      var assigned = scopeOf(q);
      if (group === "all" && assigned.group === "sorting-practice") { return false; }
      return (group === "all" || assigned.group === group) &&
        (scope === "all" || scope === mixedScope && mixedVerbScopes.indexOf(assigned.scope) !== -1 || assigned.scope === scope);
    });
  }
  function filteredQuestions() {
    var pool = poolForScope(currentSettings().step);
    return el("bookmarks-only").checked ? pool.filter(isBookmarked) : pool;
  }
  function ensureStudyProgress() {
    if (!progressManager || !unifiedImportReady) { return null; }
    if (!studyProgress) {
      studyProgress = progressManager.initialize(history, archivedHistory);
      if (session && session.mode === "all" && !session.studyRun) {
        session.cards.filter(function (card) { return card.graded; }).forEach(function (card) {
          studyProgress = progressManager.mark(studyProgress, card.question.historyKey || card.question.id, 1);
        });
      }
    }
    if (questionCuration || verbFormsReview || sortingReview) {
      var projected = null;
      [questionCuration && questionCuration.replacements, verbFormsReview && verbFormsReview.replacements, sortingReview && sortingReview.replacements].filter(Boolean).forEach(function (aliases) {
        Object.keys(aliases).forEach(function (oldId) {
          var canonical = aliases[oldId], pass = (projected || studyProgress).completed[oldId] || 0;
          if (pass > ((projected || studyProgress).completed[canonical] || 0)) {
            if (!projected) { projected = window.PowerVocaStudyProgress.normalize(studyProgress); }
            projected.completed[canonical] = pass;
          }
        });
      });
      if (projected) { studyProgress = projected; }
    }
    return studyProgress;
  }
  function progressFor(pool, scope) {
    return progressManager ? progressManager.snapshot(ensureStudyProgress() || window.PowerVocaStudyProgress.empty(), pool, scope) : null;
  }
  function ensureStarredStudyProgress() {
    if (!progressManager || !unifiedImportReady) { return null; }
    ensureStudyProgress();
    if (!starredStudyProgress) {
      starredStudyProgress = window.PowerVocaStudyProgress.empty();
      if (session && session.mode === "starred") {
        session.cards.filter(function (card) { return card.graded; }).forEach(function (card) {
          starredStudyProgress = progressManager.mark(starredStudyProgress, card.question.historyKey || card.question.id, session.studyRun ? session.studyRun.pass : 1);
        });
      }
    }
    return starredStudyProgress;
  }
  function starredPool(scope) {
    return scope === "all" ? starredReviewEntries().map(function (entry) { return entry.question; }) : poolForScope(scope).filter(isBookmarked);
  }
  function progressLabel(state) {
    return state.pass + "회독 · " + state.completed + " / " + state.total + "문제 완료 · 남은 " + state.remaining + "문제";
  }
  function scopeLabel(setting) {
    var info = normalizeScopeSetting(setting), scope = taxonomy.subscopes.find(function (s) { return s.id === info.scope; });
    if (scope) { return scope.label; }
    var group = taxonomy.groups.find(function (g) { return g.id === info.group; });
    return group ? group.label : "모든 분류";
  }
  function sessionStudyRun() {
    if (!session) { return null; }
    // A cumulative wrong review has no ordinary range to resume. Only an
    // explicit transition from an ordinary round carries its frozen context.
    if (session.mode === "wrong") { return session.resumeStudyRun ? Object.assign({}, session.resumeStudyRun) : null; }
    if (session.studyRun) {
      var run = Object.assign({}, session.studyRun);
      if (!run.size) {
        var storedLength = String(session.cards.length);
        run.size = ["20", "50", "100"].indexOf(storedLength) !== -1 ? storedLength : currentSettings().roundSize;
      }
      return run;
    }
    // Old rounds retain every stored choice. Infer their range only when a
    // continuation is requested; their historic work belongs to the first pass.
    var setting = currentSettings().step, allowed = new Set(poolForScope(setting).map(function (q) { return q.id; }));
    var questions = session.cards.map(function (card) { return wrongReview && wrongReview.resolve(card.question.historyKey || card.question.id) || card.question; });
    if (!questions.every(function (q) { return allowed.has(q.id); })) {
      var assigned = questions.map(scopeOf).filter(Boolean), groups = Array.from(new Set(assigned.map(function (s) { return s.group; }))), scopes = Array.from(new Set(assigned.map(function (s) { return s.scope; })));
      setting = scopes.length === 1 ? scopes[0] : groups.length === 1 ? "group-" + groups[0] : "all";
    }
    var length = String(session.cards.length), size = ["20", "50", "100"].indexOf(length) !== -1 ? length : currentSettings().roundSize;
    var inferred = { scope: setting, pass: 1, size: size };
    if (session.mode === "starred") { inferred.collection = "starred"; }
    return inferred;
  }
  function progressForRun(run) {
    var starred = run.collection === "starred";
    var progress = starred ? ensureStarredStudyProgress() : ensureStudyProgress();
    var state = progressManager && progressManager.snapshot(progress || window.PowerVocaStudyProgress.empty(), starred ? starredPool(run.scope) : poolForScope(run.scope), run.scope);
    if (!state) { return null; }
    if (!run.pass) { return state; }
    var completed = (progress || window.PowerVocaStudyProgress.empty()).completed;
    state.pass = run.pass;
    state.remainingQuestions = state.questions.filter(function (q) { return (completed[q.id] || 0) < run.pass; });
    state.remaining = state.remainingQuestions.length;
    state.completed = state.total - state.remaining;
    state.complete = state.total > 0 && state.remaining === 0;
    return state;
  }
  function beginStarredRemaining(scope, size, pass) {
    var state = progressForRun({ scope: scope, pass: pass, collection: "starred" });
    if (!state || !state.remaining) { return false; }
    var questions = el("shuffle-questions").checked ? shuffled(state.remainingQuestions) : state.remainingQuestions;
    if (size !== "all") { questions = questions.slice(0, Number(size)); }
    el("round-size").value = size;
    begin(questions, "starred", false, { scope: scope, pass: state.pass, size: size, collection: "starred" });
    return true;
  }
  function beginRemaining(scope, size, pass) {
    var pool = poolForScope(scope), progress = pass ? progressForRun({ scope: scope, pass: pass }) : progressFor(pool, scope);
    var remaining = progress ? progress.remainingQuestions : pool;
    if (!remaining.length) { return false; }
    if (el("shuffle-questions").checked) { remaining = shuffled(remaining); }
    if (size !== "all") { remaining = remaining.slice(0, Number(size)); }
    applyScopeSetting(scope); el("round-size").value = size;
    begin(remaining, "all", false, progress ? { scope: scope, pass: progress.pass, size: size } : null);
    return true;
  }
  function advanceStudyPass(scope, size, collection) {
    var starred = collection === "starred";
    var pool = starred ? starredPool(scope) : poolForScope(scope), state = progressForRun({ scope: scope, collection: collection });
    if (!state || !state.complete || !unifiedImportReady) { return; }
    var before = starred ? starredStudyProgress : studyProgress;
    if (starred) { starredStudyProgress = progressManager.nextPass(starredStudyProgress, pool, scope); }
    else { studyProgress = progressManager.nextPass(studyProgress, pool, scope); }
    if (!saveState()) { if (starred) { starredStudyProgress = before; } else { studyProgress = before; } return; }
    if (starred) { beginStarredRemaining(scope, size); } else { beginRemaining(scope, size); }
  }
  function renderStudyContinuation() {
    var run = sessionStudyRun(), state = run && progressForRun(run);
    var available = Boolean(state && state.total && unifiedImportReady);
    el("results-study-progress").hidden = !available;
    text("results-study-progress", available ? (run.collection === "starred" ? "별표 · " : "") + scopeLabel(run.scope) + " · " + progressLabel(state) : "");
    el("next-batch-button").hidden = !available || session.mode !== "wrong" && totals().ungraded > 0 || state.complete;
    el("next-pass-button").hidden = !available || totals().ungraded > 0 || !state.complete;
    if (available) {
      text("next-batch-button", session.mode === "wrong" || run.collection === "starred" ? reviewNextBatchLabel(run, state) : "남은 문제 계속 풀기 (" + state.remaining + "개)");
      text("next-pass-button", (state.pass + 1) + "회독 시작");
    }
  }
  function reviewNextBatchLabel(run, state) {
    var size = run.size || "20", count = size === "all" ? state.remaining : Math.min(Number(size), state.remaining);
    return (size !== "all" && count === Number(size) ? "다음 " : "남은 ") + count + "문제 풀기 · " + (run.collection === "starred" ? "별표 연습" : "일반 연습");
  }
  function mountReviewContinuation() {
    var parent = el("quiz-view") && el("quiz-view").parentNode;
    if (!parent || el("review-next-batch-panel")) { return; }
    var panel = node("aside", "panel review-next-batch-panel"); panel.id = "review-next-batch-panel"; panel.hidden = true;
    var summary = node("p", "study-progress-summary"); summary.id = "review-next-batch-summary";
    var button = node("button", "primary-button"); button.id = "review-next-batch-button"; button.type = "button";
    button.setAttribute("aria-describedby", summary.id);
    panel.append(summary, button); parent.append(panel);
  }
  function renderReviewContinuation() {
    var panel = el("review-next-batch-panel");
    if (!panel) { return; }
    var run = session && session.mode === "wrong" && sessionStudyRun();
    var state = run && unifiedImportReady && progressForRun(run);
    var available = Boolean(state && state.total && !state.complete && (view === "quiz" || view === "sorting"));
    panel.hidden = !available;
    if (!available) { return; }
    text("review-next-batch-button", reviewNextBatchLabel(run, state));
    text("review-next-batch-summary", (run.collection === "starred" ? "별표 · " : "") + scopeLabel(run.scope) + " · 남은 " + state.remaining + "문제");
  }
  function continueStudyRun() {
    var run = sessionStudyRun();
    if (run && unifiedImportReady && (session.mode === "wrong" || !totals().ungraded)) {
      if (run.collection === "starred") { beginStarredRemaining(run.scope, run.size || "20", run.pass); }
      else { beginRemaining(run.scope, run.size || "20", run.pass); }
    }
  }
  function updateSettings() {
    el("step-filter-label").hidden = false;
    el("option-shuffle-setting").hidden = false;
    if (el("group-filter").value === "sorting-practice") { el("option-shuffle-setting").hidden = true; }
    text("question-shuffle-label", "문제 순서 섞기");
    el("step-filter-label").hidden = false;
    var starred = el("bookmarks-only").checked;
    var pool = starred ? starredPool(currentSettings().step) : filteredQuestions(), size = el("round-size").value;
    var state = starred ? progressForRun({ scope: currentSettings().step, collection: "starred" }) : progressFor(pool, currentSettings().step);
    var available = state ? state.remaining : pool.length;
    var count = size === "all" ? available : Math.min(Number(size), available);
    text("pool-summary", state ? state.complete ? state.pass + "회독을 모두 마쳤어요." : "남은 " + available + "문제 중 " + count + "문제" : "선택 범위 " + pool.length + "문제 중 이번에는 " + count + "문제를 풀어요.");
    el("study-progress-summary").hidden = !state || !unifiedImportReady;
    text("study-progress-summary", state ? progressLabel(state) : "");
    text("scope-description", groupDescriptions[el("group-filter").value] || "교재 구분 없이 학습 목표로 모았어요. 큰 분류와 세부 범위를 골라 연습하세요.");
    if (el("step-filter").value === mixedScope) {
      text("scope-description", "2·4·5형식, that절, to V·목적어 + to V·V-ing를 섞어요. 범위 이름으로 답을 짐작하지 않고 단어별로 필요한 구조를 떠올려 보세요.");
    }
    if (!pool.length) { text("pool-summary", "이 범위에 등록된 문제는 아직 없어요. 다른 범위를 선택해 주세요. 기존 문제와 학습 기록은 그대로 유지돼요."); }
    if (starred) { text("pool-summary", pool.length ? "별표한 " + pool.length + "문제 중 " + count + "문제" : "이 범위에는 별표한 문제가 없어요."); }
    text("start-button", state && state.completed ? "남은 문제 풀기" : "연습 시작");
    el("start-button").hidden = Boolean(state && state.complete);
    el("start-button").disabled = !available || !unifiedImportReady;
    el("start-next-pass-button").hidden = !state || !state.complete;
    el("start-next-pass-button").disabled = !unifiedImportReady;
    text("start-next-pass-button", state ? (state.pass + 1) + "회독 시작" : "다음 회독 시작");
    renderResume();
    renderWrongReview();
    renderStarredReview();
  }
  function startSelected() {
    if (!unifiedImportReady) { announce("이전 풀이를 안전하게 준비하고 있어요."); return; }
    if (session && totals().ungraded && !window.confirm("새 연습을 시작하면 저장된 이어 풀기가 새 풀이로 바뀌어요. 누적 채점 기록은 남아요. 시작할까요?")) { return; }
    if (el("bookmarks-only").checked) {
      beginStarredRemaining(currentSettings().step, el("round-size").value); return;
    }
    beginRemaining(currentSettings().step, el("round-size").value);
  }
  function validStage(stage, native, sorting) {
    return stage && typeof stage.prompt === "string" && stage.prompt.trim() &&
      Array.isArray(stage.options) && stage.options.length >= (sorting ? 2 : 4) && stage.options.length <= (native ? 8 : 4) &&
      new Set(stage.options).size === stage.options.length &&
      stage.options.every(function (value) { return typeof value === "string" && value.trim(); }) &&
      (native && stage.multiple ? Array.isArray(stage.answers) && stage.answers.length > 0 &&
        stage.answers.length <= stage.options.length && (sorting || stage.answers.length < stage.options.length) && new Set(stage.answers).size === stage.answers.length &&
        stage.answers.every(function (n) { return Number.isInteger(n) && n >= 0 && n < stage.options.length; }) :
        Number.isInteger(stage.answer) && stage.answer >= 0 && stage.answer < stage.options.length) &&
      (stage.acceptedAnswerSets === undefined || native && stage.multiple && Array.isArray(stage.acceptedAnswerSets) &&
        stage.acceptedAnswerSets.length > 0 && stage.acceptedAnswerSets.length <= 32 &&
        stage.acceptedAnswerSets.every(function (set) { return Array.isArray(set) && set.length > 0 && set.length <= stage.options.length &&
          new Set(set).size === set.length && set.every(function (n) { return Number.isInteger(n) && n >= 0 && n < stage.options.length; }); }) &&
        stage.acceptedAnswerSets.some(function (set) { return set.length === stage.answers.length && stage.answers.every(function (n) { return set.indexOf(n) !== -1; }); })) &&
      typeof stage.explanation === "string" && stage.explanation.trim() &&
      Array.isArray(stage.optionReasons) && stage.optionReasons.length === stage.options.length &&
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
    if (card.question.grammarOriginId) { return false; }
    var meta = session && session.practiceVersion === memoryVersion && memoryPractice.metadata && memoryPractice.metadata[card.question.id];
    return index > 0 && !blindSet(card) && !(meta && meta.independent) && card.question.stageMode !== "independent" && /_{2,}/.test(card.stages[0].data.prompt);
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
          q.stages.length < 1 || q.stages.length > (nativeQuestion(q) ? 12 : 2) || !q.stages.every(function (s, index) { return validStage(s, nativeQuestion(q), sortingPractice && sortingPractice.has(q) && index === 0); }) ||
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
    if (session && session.sorting && session.sorting.classificationOnly === true && sortingPractice && sortingPractice.has(card.question)) {
      return card.graded && stageCorrect(card.stages[0]);
    }
    return card.graded && card.stages.every(stageCorrect);
  }
  function totals() {
    var result = { correct: 0, wrong: 0, ungraded: 0, stagesCorrect: 0, stagesGraded: 0 };
    session.cards.forEach(function (card) {
      if (!card.graded) { result.ungraded += 1; return; }
      if (isAllCorrect(card)) { result.correct += 1; } else { result.wrong += 1; }
      card.stages.forEach(function (stage) {
        if (stage.selected === null) { return; }
        result.stagesGraded += 1;
        if (stageCorrect(stage)) { result.stagesCorrect += 1; }
      });
    });
    return result;
  }
  function nativeResumeLabel() {
    var assigned = session.cards.map(function (card) { return scopeOf(card.question); }).filter(Boolean);
    var groups = Array.from(new Set(assigned.map(function (item) { return item.group; })));
    var scopes = Array.from(new Set(assigned.map(function (item) { return item.scope; })));
    var group = groups.length === 1 && taxonomy.groups.find(function (item) { return item.id === groups[0]; });
    var scope = scopes.length === 1 && taxonomy.subscopes.find(function (item) { return item.id === scopes[0]; });
    var label = scope ? (group ? group.label + " · " : "") + scope.label : group ? group.label + " · 전체 혼합" : "여러 분류 섞어 풀기";
    return (session.mode === "starred" ? "별표 · " : "") + label;
  }
  function renderResume() {
    if (session) {
      var count = totals();
      text("resume-scope", nativeResumeLabel());
      text("resume-summary", session.cards.length + "문제 중 " + (count.correct + count.wrong) + "문제 채점 · 모두 맞힌 문제 " + count.correct + " · 다시 볼 문제 " + count.wrong);
      if (session.practiceVersion !== latestPracticeVersion()) {
        el("resume-summary").append(document.createTextNode(" · 이미 고른 답을 보존한 이전 보기 풀이예요. 개선된 보기로 풀려면 새 연습을 시작해 주세요."));
      }
      text("resume-button", count.ungraded ? "이어서 풀기" : "풀이 결과 보기");
    }
    el("resume-row").hidden = !session;
    var pending = !unifiedImportReady;
    el("resume-status").hidden = !pending;
    text("resume-status", pending ? "이전 풀이를 안전하게 준비하고 있어요." : "");
    el("resume-button").disabled = pending;
    el("resume-panel").hidden = !session && !pending;
  }
  function showStart() {
    if (requestedCategory) { el("group-filter").value = "grammar-structures"; populateSubscopes("all"); }
    showView("start");
    renderResume();
    renderHistory();
    updateSettings();
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  function begin(questions, mode, forceShuffle, studyRun) {
    unavailableSession = null;
    var mixQuestions = forceShuffle || el("shuffle-questions").checked;
    var mixOptions = forceShuffle || el("shuffle-options").checked;
    questions = questions.map(function (q) { return q.routeRoot && questionMap.get(q.routeRoot) || q; });
    var ordered = mixQuestions ? shuffled(questions) : questions.slice();
    var version = latestPracticeVersion();
    session = { mode: mode, index: 0, startedAt: new Date().toISOString(), practiceVersion: version, cards: ordered.map(function (question) {
      var sharedChoices = Object.create(null);
      return { question: question, stageIndex: 0, graded: false, deferred: false,
        stages: question.stages.map(function (_, index) {
          var stage = practiceStage(question, index, version);
          var choices = stage.options.map(function (option, index) { return { text: option, originalIndex: index }; });
          choices = mixOptions && !stage.fixedOrder ? shuffled(choices) : choices;
          if (stage.choiceGroup) {
            if (sharedChoices[stage.choiceGroup]) { choices = sharedChoices[stage.choiceGroup].map(function (i) { return { text: stage.options[i], originalIndex: i }; }); }
            else { sharedChoices[stage.choiceGroup] = choices.map(function (choice) { return choice.originalIndex; }); }
          }
          return { data: stage, choices: choices, selected: null };
        }) };
    }) };
    if (studyRun) { session[mode === "wrong" ? "resumeStudyRun" : "studyRun"] = Object.assign({}, studyRun); }
    if (sortingController && session.cards.every(function (card) { return sortingPractice.has(card.question) && card.question.sortingTopic === session.cards[0].question.sortingTopic; })) {
      sortingController.start(session);
    }
    renderQuestion(true);
  }
  function currentCard() { return session.cards[session.index]; }
  function currentStage() { var card = currentCard(); return card.stages[card.stageIndex]; }
  function posFlowRoot(card) {
    var q = card.question.routeRoot ? questionMap.get(card.question.routeRoot) : card.question;
    return q && q.flow === "chosen-pos" ? q : null;
  }
  function posRouteId(root, selected) { return root.id + "-r" + selected.reduce(function (mask, n) { return mask | 1 << n; }, 0); }
  function submitPosChoice(card) {
    var root = posFlowRoot(card), first = card.stages[0];
    if (!root || card.stageIndex !== 0) { return false; }
    var picked = selectedIndices(first), answers = answerIndices(first.data);
    if (picked.some(function (n) { return answers.indexOf(n) === -1; })) {
      card.question = root; card.stages = [first]; card.stageIndex = 0; finishCard(card);
      announce("학습한 품사에 해당하지 않는 선택이 있어 이 문제를 종료했어요. 정답과 뜻을 확인해 보세요."); return true;
    }
    var routed = questionMap.get(posRouteId(root, picked));
    if (!routed) { announce("선택한 품사의 문제를 준비하지 못했어요. 답은 그대로 보관돼요."); return true; }
    if (card.question.id !== routed.id) {
      var mixOptions = el("shuffle-options").checked;
      card.question = routed;
      card.stages = [first].concat(routed.stages.slice(1).map(function (s) {
        var choices = s.options.map(function (text, n) { return { text: text, originalIndex: n }; });
        return { data: s, choices: mixOptions && !s.fixedOrder ? shuffled(choices) : choices, selected: null };
      }));
    }
    card.stageIndex = 1; renderQuestion(true);
    announce("선택한 품사의 뜻을 이어서 골라 주세요."); return true;
  }
  function createOption(card, stage, choice, displayIndex) {
    var label = node("label", "option");
    if (chose(stage, choice.originalIndex)) { label.classList.add("selected"); }
    if (card.graded) {
      label.classList.add("locked");
      if (answerIndices(stage.data).indexOf(choice.originalIndex) !== -1) { label.classList.add("correct"); }
      else if (chose(stage, choice.originalIndex)) { label.classList.add("incorrect"); }
    }
    var input = document.createElement("input");
    input.type = stage.data.multiple ? "checkbox" : "radio"; input.name = "answer"; input.value = String(choice.originalIndex);
    input.checked = chose(stage, choice.originalIndex); input.disabled = card.graded;
    input.setAttribute("aria-label", letters[displayIndex] + ". " + choice.text);
    var letter = node("span", "option-letter", letters[displayIndex]); letter.setAttribute("aria-hidden", "true");
    label.append(input, letter, node("span", "option-text", cleanOption(choice.text)));
    if (card.graded && (answerIndices(stage.data).indexOf(choice.originalIndex) !== -1 || chose(stage, choice.originalIndex))) {
      label.append(node("span", "option-tag", answerIndices(stage.data).indexOf(choice.originalIndex) !== -1 ? "정답" : "선택한 답"));
    }
    input.addEventListener("change", function () {
      if (card.graded) { return; }
      if (!blindSet(card) && card.stageIndex === 0 && stage.selected !== choice.originalIndex) {
        card.stages.slice(1).forEach(function (later) { later.selected = null; });
      }
      if (stage.data.multiple) {
        var selected = selectedIndices(stage).filter(function (n) { return n !== choice.originalIndex; });
        if (input.checked) { selected.push(choice.originalIndex); }
        stage.selected = selected.length ? selected.sort(function (a,b) { return a-b; }) : null;
      } else { stage.selected = choice.originalIndex; }
      card.deferred = false;
      if (posFlowRoot(card) && card.stageIndex === 0) { card.stages.slice(1).forEach(function (s) { s.selected = null; }); }
      saveState();
      Array.prototype.forEach.call(el("options-list").children, function (item) {
        item.classList.toggle("selected", item.querySelector("input").checked);
      });
      el("grade-button").disabled = stage.selected === null;
      text("question-state", stage.selected === null ? "미채점" : "선택 완료 · 아직 미채점");
      announce(letters[displayIndex] + (input.checked ? "번을 선택했어요. " : "번 선택을 해제했어요. ") + (posFlowRoot(card) && card.stageIndex === 0 ? "답 확인을 누르면 선택한 품사에 맞춰 진행해요." : blindSet(card) ? "세트가 끝난 뒤 한 번에 채점해요." : card.stageIndex < card.stages.length - 1 ? "답 확인을 누르면 맞았을 때만 다음 단계로 넘어가요." : "채점하기를 누르면 해설이 공개돼요."));
    });
    return label;
  }
  function feedbackSection(title, content) {
    var section = node("div", "feedback-section");
    section.append(node("h3", "", title), node("p", "", content));
    return section;
  }
  var feedbackLexicon = null;
  function keywordFeedback(card, summary, passed) {
    if (!window.PowerFeedbackCore || !window.PowerFeedbackView) { return false; }
    if (!feedbackLexicon) { feedbackLexicon = window.PowerFeedbackCore.createLexicon(data.questions.filter(activeQuestion)); }
    var assigned = scopeOf(card.question) || {};
    var model = window.PowerFeedbackCore.build({
      id: card.question.id, word: card.question.displayExpression || summary.expression,
      meaning: summary.meaning, passed: passed, question: card.question,
      scope: assigned.scope, group: assigned.group, grammar: Boolean(card.question.grammarOriginId), summaryRows: card.question.grammarSummary,
      stages: card.stages.map(function (stage) {
        return Object.assign({}, stage.data, { correct: answerIndices(stage.data), selected: selectedIndices(stage), skipped: stage.selected === null });
      })
    }, feedbackLexicon);
    el("feedback-keywords").innerHTML = window.PowerFeedbackView.renderCore(model);
    return true;
  }
  function renderFeedback(card) {
    var correctCount = card.stages.filter(stageCorrect).length;
    var allCorrect = correctCount === card.stages.length;
    var attempted = card.stages.filter(function (stage) { return stage.selected !== null; }).length;
    el("feedback-panel").classList.toggle("wrong", !allCorrect);
    var summary = questionDetail(card, "answerSummary");
    var keywords = keywordFeedback(card, summary, allCorrect);
    el("feedback-panel").classList.toggle("keyword-feedback-panel", keywords);
    ["feedback-answer-details", "feedback-explanation-details", "feedback-source-details"].forEach(function (id) { el(id).open = !keywords; });
    text("feedback-title", keywords ? allCorrect ? "✓ 정답" : "↺ 다시 확인" : allCorrect ? "모두 정확하게 풀었어요." : "이 쓰임을 다시 확인해요.");
    text("feedback-wrong-count", "이 문제 누적 오답 " + cumulativeWrongCount(card.question) + "회");
    text("correct-answer", attempted < card.stages.length ? "1단계 오답으로 이 문제를 종료했어요. 2단계는 진행하지 않았어요." :
      card.stages.length + "단계 중 " + correctCount + "단계 정답 · 아래에서 각 선택지를 확인해 보세요.");
    text("answer-summary-expression", card.question.displayExpression || summary.expression);
    text("answer-summary-meaning", summary.meaning);
    el("answer-summary").hidden = keywords;
    var feedbackList = el("stage-feedback-list"); feedbackList.replaceChildren();
    card.stages.forEach(function (stage, stageIndex) {
      var stageData = stage.data;
      var box = node("section", "stage-feedback");
      var isCorrect = stageCorrect(stage);
      var skipped = stage.selected === null;
      box.append(node("h3", "stage-feedback-title" + (skipped ? "" : isCorrect ? " correct" : " wrong"), (stageIndex + 1) + "단계 · " + (skipped ? "미진행 · 복습용 해설" : isCorrect ? "정답" : "오답")));
      box.append(node("p", "stage-feedback-prompt", visiblePrompt(card, stageIndex)));
      box.append(node("p", "stage-answer-line", "정답 " + describeChoices(stage, answerIndices(stageData))));
      box.append(node("p", "stage-selected-line", skipped ? "1단계에서 틀려 진행하지 않았어요. 이 단계는 채점 횟수에 포함하지 않아요." :
        "선택한 답 " + describeChoices(stage, selectedIndices(stage))));
      if (stageData.multiple && !skipped) {
        var missing = answerIndices(stageData).filter(function (n) { return !chose(stage,n); });
        var extra = selectedIndices(stage).filter(function (n) { return answerIndices(stageData).indexOf(n) === -1; });
        if (missing.length) { box.append(node("p", "stage-selected-line", (stageData.kind === "semantic-pos" ? "빠뜨린 품사 · " : stageData.options.indexOf("명사구") !== -1 && stageData.options.indexOf("S + V") !== -1 ? "빠뜨린 연결 · " : "빠뜨린 뜻 · ") + describeChoices(stage, missing))); }
        if (extra.length) { box.append(node("p", "stage-selected-line", "다시 볼 선택 · " + describeChoices(stage, extra))); }
      }
      if (stageData.translation) { box.append(feedbackSection("문장 해석", stageData.translation)); }
      box.append(feedbackSection("정답 근거", stageData.explanation));
      var reasons = node("div", "feedback-section"); reasons.append(node("h3", "", "선택지 하나씩 확인하기"));
      var list = node("ol", "reason-list");
      stage.choices.forEach(function (choice, index) {
        var correctChoice = answerIndices(stageData).indexOf(choice.originalIndex) !== -1;
        var item = node("li", "reason-item" + (correctChoice ? " is-answer" : ""));
        var heading = node("div", "reason-item-heading");
        heading.append(node("span", "reason-letter", letters[index]), node("span", "reason-option", cleanOption(choice.text)));
        if (correctChoice) { heading.append(node("span", "reason-mark", "정답")); }
        else if (chose(stage, choice.originalIndex)) { heading.append(node("span", "reason-mark", "선택한 답")); }
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
    el("feedback-keywords").replaceChildren();
    el("stage-feedback-list").replaceChildren();
  }
  function renderQuestion(focus) {
    if (session && session.sorting && sortingController) { sortingController.render(focus); return; }
    showView("quiz");
    var card = currentCard(), stage = currentStage(), count = totals();
    text("round-label", session.mode === "starred" ? "별표 연습" : session.mode === "wrong" ? "오답 다시 연습" : "기본 연습");
    el("question-bookmark").replaceChildren(bookmarkButton(card.question));
    text("question-counter", "문제 " + (session.index + 1) + " / " + session.cards.length);
    text("score-counter", "채점 " + (count.correct + count.wrong) + " · 모두 맞힌 문제 " + count.correct);
    var progress = count.correct + count.wrong;
    el("progress-bar").setAttribute("aria-valuemax", String(session.cards.length));
    el("progress-bar").setAttribute("aria-valuenow", String(progress));
    el("progress-fill").style.width = (progress / session.cards.length * 100) + "%";
    text("question-number", "QUESTION " + String(session.index + 1).padStart(2, "0"));
    text("question-state", card.graded ? "채점 완료" : card.deferred ? "나중에 풀기로 남긴 문제" : stage.selected != null ? "선택 완료 · 아직 미채점" : "미채점");
    text("question-wrong-count", "누적 오답 " + cumulativeWrongCount(card.question) + "회");
    var posFirst = Boolean(posFlowRoot(card) && card.stageIndex === 0 && !card.graded);
    text("stage-indicator", posFirst ? "품사 선택 · 선택한 품사의 뜻으로 이어져요" : (card.stageIndex + 1) + " / " + card.stages.length + "단계" + (!card.graded ? blindSet(card) ? " · 세트 마지막에 한 번에 채점" : card.stages.length > 1 ? " · 첫 답을 맞히면 다음 단계" : "" : ""));
    el("previous-stage-button").hidden = card.stageIndex === 0;
    var content = questionPresentation(card, card.stageIndex);
    text("question-instruction", content.instruction);
    text("question-heading", content.prompt);
    text("question-context", content.context);
    el("question-context").hidden = !content.context;
    var wordList = el("semantic-words"); wordList.replaceChildren();
    wordList.hidden = !Array.isArray(card.question.words);
    if (!wordList.hidden) {
      card.question.words.forEach(function (word) {
        var active = word === stage.data.focusWord;
        var chip = node(active ? "strong" : "span", "semantic-word" + (active ? " active" : ""), word);
        if (active) { chip.setAttribute("aria-current", "step"); }
        wordList.append(chip);
      });
    }
    var list = el("options-list"); list.replaceChildren();
    list.classList.toggle("options-grid", stage.choices.length > 4);
    list.style.gridTemplateRows = stage.choices.length > 4 ? "repeat(" + Math.ceil(stage.choices.length / 2) + ", auto)" : "";
    text("options-legend", stage.data.multiple ? "해당하는 답을 모두 선택하세요." : "정답을 하나 선택하세요.");
    stage.choices.forEach(function (choice, index) { list.append(createOption(card, stage, choice, index)); });
    el("previous-button").disabled = session.index === 0;
    el("grade-button").hidden = card.graded;
    el("grade-button").disabled = stage.selected == null;
    text("grade-button", posFirst ? "답 확인 →" : card.stageIndex < card.stages.length - 1 ? blindSet(card) ? "다음 단계 →" : "답 확인 →" : blindSet(card) ? "세트 채점하기" : "채점하기");
    el("next-button").hidden = !card.graded;
    el("next-button").disabled = !card.graded;
    var nextLabel = session.index === session.cards.length - 1 ? "풀이 결과 보기" : "다음 문제 →";
    text("next-button", nextLabel); text("feedback-next-button", nextLabel);
    text("choice-hint", card.graded ? "선택한 답은 채점 후 변경되지 않아요. 오답 연습에서 다시 도전할 수 있어요." : posFirst ? "학습한 품사가 아닌 것을 고르면 이 문제를 종료해요. 선택한 정답 품사의 뜻만 이어서 물어요." : blindSet(card) ?
      (stage.data.multiple ? "해당하는 답을 모두 선택하세요. " : "") + "중간에는 정오답을 표시하지 않아요. 세트를 마친 뒤 선택한 답과 정답을 함께 확인해요." : card.stages.length > 1 ?
      "첫 답이 틀리면 바로 오답 처리해요. 맞히면 다음 단계로 넘어가고, 마지막 채점 후 해설을 보여줘요." : "선택만으로 정답이 공개되지 않아요.");
    el("feedback-panel").hidden = !card.graded;
    if (card.graded) { renderFeedback(card); } else { clearFeedback(); }
    saveState();
    if (focus) { focusHeading("question-instruction"); }
  }
  function submitStage() {
    if (!unifiedImportReady) { return; }
    var card = currentCard(), stage = currentStage();
    if (card.graded || stage.selected == null) { return; }
    if (submitPosChoice(card)) { return; }
    if (!blindSet(card) && card.stageIndex === 0 && card.stages.length > 1 && !stageCorrect(stage)) {
      card.stages.slice(1).forEach(function (later) { later.selected = null; });
      if (!session.practiceVersion) { session.practiceVersion = legacyGatedVersion; }
      finishCard(card);
      announce("1단계가 오답이어서 이 문제를 종료했어요. 올바른 표현과 뜻을 확인해 보세요.");
      return;
    }
    if (card.stageIndex < card.stages.length - 1) {
      card.stageIndex += 1; renderQuestion(true);
      announce((blindSet(card) ? "선택을 저장했어요. " : "1단계 정답이에요. ") + (card.stageIndex + 1) + "단계의 답을 골라 주세요.");
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
    if (!currentCard().graded) { return; }
    if (session.index < session.cards.length - 1) { session.index += 1; renderQuestion(true); }
    else { showResults(); }
  }
  function previousStep() {
    if (!session || !unifiedImportReady || view !== "quiz") { return; }
    if (currentCard().stageIndex > 0) { currentCard().stageIndex -= 1; }
    else if (session.index > 0) { session.index -= 1; }
    else { return; }
    renderQuestion(true);
  }
  function shortcutTargetAllowed(target, key, backward) {
    if (!(target instanceof Element)) { return true; }
    var editable = target.closest("[contenteditable]");
    if (target.isContentEditable || editable && editable.getAttribute("contenteditable") !== "false") { return false; }
    var field = target.closest("input, textarea, select");
    if (field && !(el("options-list").contains(field) && (field.type === "radio" || field.type === "checkbox"))) { return false; }
    var control = target.closest("button, a, summary, [role='button']");
    var allowed = ["grade-button", "next-button", "feedback-next-button"];
    if (backward) { allowed = allowed.concat(["previous-stage-button", "previous-button"]); }
    return !control || control.dataset.bookmarkKey || key === "0" || key === "Enter" && allowed.indexOf(control.id) !== -1;
  }
  function handleQuizShortcut(event) {
    if (event.defaultPrevented || view !== "quiz" || !session || !unifiedImportReady ||
        event.ctrlKey || event.metaKey || event.altKey || (event.shiftKey && event.key !== "Enter") ||
        event.isComposing || keyboardComposing || event.keyCode === 229 || document.querySelector("dialog[open]")) { return; }
    var digit = /^[1-8]$/.test(event.key), enter = event.key === "Enter", bookmark = event.key === "0";
    if ((!digit && !enter && !bookmark) || !shortcutTargetAllowed(event.target, event.key, event.shiftKey)) { return; }
    // Suppress held-key repetitions as well as the native button activation;
    // a fresh Enter is required to leave the explanation after grading.
    if (event.repeat) { event.preventDefault(); return; }
    if (event.shiftKey) { event.preventDefault(); previousStep(); return; }
    var card = currentCard();
    if (bookmark) { event.preventDefault(); toggleBookmark(card.question); }
    else if (digit) {
      if (card.graded) { return; }
      var input = el("options-list").querySelectorAll("input")[Number(event.key) - 1];
      if (!input || input.disabled) { return; }
      event.preventDefault();
      input.click();
    } else {
      event.preventDefault();
      if (card.graded) { next(); }
      else { submitStage(); }
    }
  }
  function showResults() {
    if (!session) { return; }
    var count = totals(); showView("results");
    saveState();
    text("result-correct", count.correct); text("result-wrong", count.wrong); text("result-ungraded", count.ungraded);
    text("results-description", count.ungraded ? session.cards.length + "문제 중 아직 " + count.ungraded + "문제를 채점하지 않았어요. 남은 문제를 이어서 풀 수 있어요." : "이번 " + session.cards.length + "문제를 모두 확인했어요. 한 단계라도 틀린 문제는 오답 연습에 포함돼요.");
    var accuracy = count.stagesGraded ? Math.round(count.stagesCorrect / count.stagesGraded * 100) + "%" : "—";
    text("stage-score", "단계별 정답률 " + accuracy + " · 채점한 " + count.stagesGraded + "단계 중 " + count.stagesCorrect + "단계 정답\n위의 ‘정답’은 모든 단계를 맞힌 문제 카드 수예요. 미채점 단계는 정답률에 포함하지 않아요.");
    if (session.sorting && session.sorting.classificationOnly === true) {
      text("results-description", "이번 " + session.cards.length + "개 단어의 분류를 확인했어요.");
      text("stage-score", "분류 정답률 " + accuracy + " · " + count.stagesGraded + "개 중 " + count.stagesCorrect + "개 정답");
    }
    el("continue-button").hidden = count.ungraded === 0;
    el("wrong-only-button").disabled = count.wrong === 0;
    renderStudyContinuation();
    var list = el("review-list"); list.replaceChildren();
    session.cards.forEach(function (card, index) {
      var item = node("li"), button = node("button", "review-button"); button.type = "button";
      var status = node("span", "review-status");
      if (!card.graded) { status.textContent = "미채점"; }
      else if (isAllCorrect(card)) { status.textContent = "정답"; status.classList.add("correct"); }
      else { status.textContent = "오답"; status.classList.add("wrong"); }
      button.append(node("span", "review-index", String(index + 1).padStart(2, "0")), node("span", "review-text", stagePrompt(card, 0)), status);
      button.addEventListener("click", function () { session.index = index; if (session.sorting && sortingController) { sortingController.openCard(index); } else { renderQuestion(true); } });
      item.className = "bookmark-review-row"; item.append(button, bookmarkButton(card.question)); list.append(item);
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
  mountReviewContinuation();
  if (sortingPractice) {
    sortingController = sortingPractice.createController({
      el: el, node: node, getSession: function () { return session; }, getView: function () { return view; },
      ready: function () { return unifiedImportReady; }, save: saveState, record: recordCard,
      showView: showView, showResults: showResults, announce: announce, bookmarkButton: bookmarkButton, toggleBookmark: toggleBookmark
    });
  }
  data.questions.forEach(function (q) { questionMap.set(q.id, q); signatures.set(q.id, fingerprint(q)); });
  data.questions.forEach(function (q) {
    var assigned = classifyQuestion(q); questionScopes.set(q.id, assigned);
    if (!activeQuestion(q)) { return; }
    scopeCounts[assigned.scope] = (scopeCounts[assigned.scope] || 0) + 1;
    groupCounts[assigned.group] = (groupCounts[assigned.group] || 0) + 1;
    if (mixedVerbScopes.indexOf(assigned.scope) !== -1) { scopeCounts[mixedScope] = (scopeCounts[mixedScope] || 0) + 1; }
  });
  taxonomy.groups.forEach(function (group) {
    var option = node("option", "", group.label + " (" + (groupCounts[group.id] || 0).toLocaleString("ko-KR") + "문제)");
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
  if (semanticReady && el("coverage-summary")) {
    text("coverage-summary", "다품사어·다의어는 단어별로, 혼동 어휘는 비교 세트로 연습해요. 해당하는 뜻을 모두 고르고 세트 마지막에 한 번에 채점해요. 기존에 저장한 풀이와 점수는 유지돼요.");
  }
  if (timeReady && timeReview.report && el("coverage-summary")) {
    el("coverage-summary").append(document.createTextNode(" 시제·시간 표현 87개를 모두 점검하고, " + timeReview.report.revisedCards + "문제의 문맥과 보기를 보완했어요."));
  }
  if (experienceReady && el("coverage-summary")) {
    text("coverage-summary", "문형·구조도 같은 화면에서 풀어요. 연결 구조는 낱개 복수 선택으로, 뜻과 어형은 단어별 쓰임을 구별하도록 보완했어요. 저장된 이전 풀이와 기록은 유지돼요.");
  }
  text("source-title", "학습 자료: " + (data.sourceTitle || "박혜원 파워토익 VOCA") + (quickstartData ? " · 파워토익 퀵스타트 지정 범위" : "") + " · 인쇄 내용만 반영");
  el("start-button").addEventListener("click", startSelected);
  el("start-next-pass-button").addEventListener("click", function () {
    if (session && totals().ungraded && !window.confirm("새 회독을 시작하면 저장된 이어 풀기가 새 풀이로 바뀌어요. 누적 기록은 남아요. 시작할까요?")) { return; }
    advanceStudyPass(currentSettings().step, el("round-size").value, el("bookmarks-only").checked ? "starred" : undefined);
  });
  el("next-batch-button").addEventListener("click", function () {
    continueStudyRun();
  });
  if (el("review-next-batch-button")) { el("review-next-batch-button").addEventListener("click", continueStudyRun); }
  el("next-pass-button").addEventListener("click", function () {
    var run = sessionStudyRun();
    if (run && !totals().ungraded) { advanceStudyPass(run.scope, run.size || currentSettings().roundSize, run.collection); }
  });
  window.addEventListener("compositionstart", function () { keyboardComposing = true; });
  window.addEventListener("compositionend", function () { keyboardComposing = false; });
  window.addEventListener("keydown", handleQuizShortcut);
  el("wrong-review-start").addEventListener("click", startWrongReview);
  el("wrong-review-min").addEventListener("change", function () {
    el("wrong-review-min").value = String(window.PowerVocaWrongReview ? window.PowerVocaWrongReview.threshold(el("wrong-review-min").value) : 1);
    wrongReviewPage = 0; renderWrongReview();
  });
  el("wrong-review-previous").addEventListener("click", function () { wrongReviewPage = Math.max(0, wrongReviewPage - 1); renderWrongReview(); });
  el("wrong-review-next").addEventListener("click", function () { wrongReviewPage += 1; renderWrongReview(); });
  el("starred-review-start").addEventListener("click", startStarredReview);
  el("review-mode-wrong").addEventListener("click", function () { showReviewCollection("wrong"); });
  el("review-mode-starred").addEventListener("click", function () { showReviewCollection("starred"); });
  el("starred-review-previous").addEventListener("click", function () { starredReviewPage = Math.max(0, starredReviewPage - 1); renderStarredReview(); });
  el("starred-review-next").addEventListener("click", function () { starredReviewPage += 1; renderStarredReview(); });
  el("migration-retry-button").addEventListener("click", function () { void prepareUnifiedPractice(); });
  el("migration-cloud-button").addEventListener("click", function () {
    if (window.confirm("미확인 기기 풀이 원본은 백업에 남기고, 계정에서 확인된 기록을 기준으로 통합할까요?")) { void prepareUnifiedPractice(true); }
  });
  el("legacy-restore-button").addEventListener("click", restorePreviousDraft);
  el("group-filter").addEventListener("change", function () { requestedCategory = false; if (window.history && window.location.search) window.history.replaceState(null, "", window.location.pathname); populateSubscopes("all"); updateSettings(); saveState(); });
  el("step-filter").addEventListener("change", function () {
    var scope = taxonomy.subscopes.find(function (item) { return item.id === el("step-filter").value; });
    if (memoryReady && el("step-filter").value === mixedScope) { scope = { id: mixedScope, group: "grammar-structures" }; }
    if (scope && el("group-filter").value === "all") { el("group-filter").value = scope.group; populateSubscopes(scope.id); }
  });
  ["shuffle-questions", "shuffle-options", "round-size", "step-filter"].forEach(function (id) {
    el(id).addEventListener("change", function () { updateSettings(); saveState(); });
  });
  el("bookmarks-only").addEventListener("change", updateSettings);
  el("home-link").addEventListener("click", function (event) { event.preventDefault(); showStart(); });
  el("home-button").addEventListener("click", showStart);
  el("resume-button").addEventListener("click", function () { if (!unifiedImportReady || !session) { return; } if (!totals().ungraded) { showResults(); } else { renderQuestion(true); } });
  el("grade-button").addEventListener("click", submitStage);
  el("previous-stage-button").addEventListener("click", function () { if (currentCard().stageIndex > 0) { currentCard().stageIndex -= 1; renderQuestion(true); } });
  el("previous-button").addEventListener("click", function () { if (session.index > 0) { session.index -= 1; renderQuestion(true); } });
  el("next-button").addEventListener("click", next);
  el("feedback-next-button").addEventListener("click", next);
  el("results-button").addEventListener("click", showResults);
  el("continue-button").addEventListener("click", continueUnfinished);
  el("wrong-only-button").addEventListener("click", function () {
    var wrong = session.cards.filter(function (card) { return card.graded && !isAllCorrect(card); }).map(function (card) { return card.question; });
    if (wrong.length && (!totals().ungraded || window.confirm("미채점 문제의 이어 풀기를 대신해 오답 연습을 시작할까요? 누적 채점 기록은 남아요."))) { begin(wrong, "wrong", true, sessionStudyRun()); }
  });
  el("restart-button").addEventListener("click", function () {
    if (!totals().ungraded || window.confirm("현재 이어 풀기 대신 이번 문제를 처음부터 다시 풀까요?")) {
      begin(session.cards.map(function (card) { return card.question; }), session.mode, true, sessionStudyRun());
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
  if (window.location.protocol !== "https:" && window.location.protocol !== "http:") { void prepareUnifiedPractice(); }
  connectAccountSync();
}());
