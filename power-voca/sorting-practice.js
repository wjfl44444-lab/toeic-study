(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.PowerVocaSorting = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const VERSION = '20261026-sorting1';
  const PREFIX = 'semantic1-sorting-';
  const TOPICS = ['verb-forms', 'noun-countability', 'quantity-expressions', 'suffix-forms', 'verb-complements', 'link-usage', 'comparison-modifiers'];
  const PHASES = ['sorting', 'sort-feedback', 'meaning', 'meaning-feedback', 'finished'];
  const clean = value => typeof value === 'string' ? value.trim() : '';
  const copy = value => JSON.parse(JSON.stringify(value));
  const positive = value => Number.isInteger(value) && value > 0;
  function freeze(value) {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      Object.keys(value).forEach(key => freeze(value[key]));
      Object.freeze(value);
    }
    return value;
  }
  function idFor(topic, card) {
    const id = PREFIX + topic + '-' + card;
    if (!/^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,119}$/.test(id)) throw new Error('Invalid sorting question ID');
    return id;
  }
  function sourceOf(raw, fallback) {
    const source = raw && typeof raw === 'object' ? raw : {};
    const parent = fallback && typeof fallback === 'object' ? fallback : {};
    const normalized = { book: source.book === 'quickstart' ? 'quickstart' : 'power-voca' };
    const page = positive(source.bookPage) ? source.bookPage : positive(parent.bookPage) ? parent.bookPage : null;
    if (page !== null) normalized.bookPage = page;
    ['entry', 'scope', 'section', 'headword', 'unit', 'target'].forEach(key => {
      if (clean(source[key])) normalized[key] = clean(source[key]);
    });
    if (positive(source.step)) normalized.step = source.step;
    if (positive(source.pdfPage)) normalized.pdfPage = source.pdfPage;
    if (Array.isArray(source.pages)) normalized.pages = Array.from(new Set(source.pages.filter(positive)));
    return normalized;
  }
  function selection(stage) {
    return stage.selected === null ? [] : Array.isArray(stage.selected) ? stage.selected : [stage.selected];
  }
  function answered(stage) { return selection(stage).length > 0; }
  function correct(stage) {
    const selected = selection(stage), sets = stage.data.acceptedAnswerSets || [stage.data.multiple ? stage.data.answers : [stage.data.answer]];
    return sets.some(answers => selected.length === answers.length && answers.every(index => selected.includes(index)));
  }
  function validSelection(stage) {
    if (!stage || !stage.data || !Array.isArray(stage.data.options)) return false;
    const value = stage.selected, selected = selection(stage);
    return (value === null || (stage.data.multiple ? Array.isArray(value) && value.length > 0 : Number.isInteger(value))) &&
      new Set(selected).size === selected.length && selected.every(index => Number.isInteger(index) && index >= 0 && index < stage.data.options.length);
  }

  function validBins(bins) {
    return Array.isArray(bins) && bins.length >= 2 && bins.length <= 5 &&
      bins.every(bin => bin && clean(bin.id) && clean(bin.label)) &&
      new Set(bins.map(bin => bin.id)).size === bins.length && new Set(bins.map(bin => bin.label)).size === bins.length;
  }

  function checkCompatibility(card, stage) {
    const sets = card.acceptedAnswerSets;
    if (!Array.isArray(sets) || !sets.length || sets.length > 32 || sets.some(set =>
      !Array.isArray(set) || !set.length || set.length > stage.options.length || new Set(set).size !== set.length ||
      set.some(index => !Number.isInteger(index) || index < 0 || index >= stage.options.length)) ||
      !sets.some(set => set.length === stage.answers.length && stage.answers.every(index => set.includes(index)))) {
      throw new Error('Invalid compatibility classification: ' + card.id);
    }
  }

  function create(data) {
    const input = Array.isArray(data) ? data : data && data.groups;
    if (!Array.isArray(input) || !input.length) throw new Error('Sorting groups are required');
    const groups = copy(input).sort((a, b) => TOPICS.indexOf(a.id) - TOPICS.indexOf(b.id));
    const byTopic = new Map(), byId = new Map(), sourceCards = new Map(), cardClassifications = new Map();
    const questions = [], assignments = Object.create(null);
    groups.forEach(group => {
      if (!group || !TOPICS.includes(group.id) || byTopic.has(group.id) || !clean(group.title) || !clean(group.instruction) ||
          !validBins(group.bins) || !Array.isArray(group.cards) || !group.cards.length) {
        throw new Error('Invalid sorting topic');
      }
      byTopic.set(group.id, group);
      const cardIds = new Set();
      group.cards.forEach(card => {
        const bins = card && card.bins !== undefined ? card.bins : group.bins;
        const instruction = card && card.classificationInstruction !== undefined ? card.classificationInstruction : group.instruction;
        if (!card || !clean(card.id) || cardIds.has(card.id) || !clean(card.text) || !validBins(bins) || !clean(instruction) || !Array.isArray(card.correctBins) ||
            !card.correctBins.length || new Set(card.correctBins).size !== card.correctBins.length ||
            !card.correctBins.every(id => bins.some(bin => bin.id === id)) || !Array.isArray(card.steps) || card.steps.length > 11 ||
            !Array.isArray(card.examples) || !card.examples.every(value => clean(value)) || typeof card.note !== 'string') {
          throw new Error('Invalid sorting card: ' + (card && card.id));
        }
        cardIds.add(card.id);
        const correctLabels = bins.filter(bin => card.correctBins.includes(bin.id)).map(bin => bin.label);
        const references = card.source && Array.isArray(card.source.references) && card.source.references.length ? card.source.references : [card.source || {}];
        const sources = references.map(source => sourceOf(source, card.source));
        const mainSource = sources[0];
        const id = idFor(group.id, card.id);
        const stages = [{
          kind: 'sorting-classification', sortingClassification: true, multiple: true, fixedOrder: true,
          instruction, prompt: card.text, context: '',
          options: bins.map(bin => bin.label),
          answers: bins.map((bin, index) => card.correctBins.includes(bin.id) ? index : -1).filter(index => index >= 0),
          explanation: card.text + ' → ' + correctLabels.join(' · ') + (clean(card.note) ? '\n' + clean(card.note) : ''),
          optionReasons: bins.map(bin => card.correctBins.includes(bin.id) ? card.text + '의 핵심 쓰임은 ' + bin.label + '에 해당해요.' : card.text + '의 이번 핵심 쓰임은 ' + bin.label + '에 해당하지 않아요.')
        }];
        if (card.acceptedAnswerSets !== undefined) {
          checkCompatibility(card, stages[0]);
          stages[0].acceptedAnswerSets = copy(card.acceptedAnswerSets);
          stages[0].compatibilityNote = clean(card.compatibilityNote);
          if (stages[0].compatibilityNote) stages[0].explanation += '\n' + stages[0].compatibilityNote;
        }
        const stepIds = new Set();
        card.steps.forEach(step => {
          if (!step || !clean(step.id) || stepIds.has(step.id) || !clean(step.label) || !clean(step.prompt) ||
              !Array.isArray(step.options) || step.options.length < 4 || step.options.length > 8 ||
              !step.options.every(value => clean(value)) || new Set(step.options).size !== step.options.length ||
              !Number.isInteger(step.answer) || step.answer < 0 || step.answer >= step.options.length) {
            throw new Error('Invalid sorting meaning: ' + card.id);
          }
          stepIds.add(step.id);
          const expression = clean(step.expression) || card.text, answer = step.options[step.answer];
          stages.push({
            kind: 'meaning', sortingStepId: step.id, sortingLabel: step.label,
            instruction: step.prompt, prompt: expression, context: step.label,
            options: step.options.slice(), answer: step.answer, fixedOrder: step.fixedOrder === true,
            explanation: expression + ' → ' + answer + (clean(card.note) ? '\n' + clean(card.note) : ''),
            optionReasons: step.options.map((option, index) => index === step.answer ? expression + '의 핵심 뜻은 ‘' + option + '’이에요.' : '이번 표현의 핵심 뜻은 ‘' + answer + '’이에요.')
          });
        });
        const question = freeze({
          id, format: 'semantic-set1', stageMode: 'set', sortingTopic: group.id, sortingCardId: card.id,
          displayExpression: card.text, category: group.title,
          answerSummary: { expression: card.text, meaning: correctLabels.join(' · ') + (card.steps.length ? ' / ' + card.steps.map(step => (clean(step.expression) || card.text) + ': ' + step.options[step.answer]).join(' / ') : '') },
          learningPoint: [clean(card.note), card.examples.join('\n')].filter(Boolean).join('\n') || card.text + ' → ' + correctLabels.join(' · '),
          source: mainSource, sources, sourceBook: mainSource.book, sourcePage: mainSource.bookPage || null, stages
        });
        questions.push(question); byId.set(id, question); sourceCards.set(id, card);
        cardClassifications.set(id, { bins, instruction, key: JSON.stringify(bins.map(bin => [bin.id, bin.label])) });
        assignments[id] = freeze({ group: 'sorting-practice', scope: 'sorting-' + group.id });
      });
    });
    freeze(groups); freeze(questions); freeze(assignments);
    const has = question => Boolean(question && byId.has(question.id) && byId.get(question.id).sortingTopic === question.sortingTopic && byId.get(question.id).sortingCardId === question.sortingCardId);

    function validateSession(session) {
      if (!session || !session.sorting || !Array.isArray(session.cards) || !session.cards.length ||
          !Number.isInteger(session.index) || session.index < 0 || session.index >= session.cards.length) return false;
      const meta = session.sorting;
      if (!byTopic.has(meta.topic) || !PHASES.includes(meta.phase) || typeof meta.active !== 'string' ||
          !meta.checked || typeof meta.checked !== 'object' || Array.isArray(meta.checked) ||
          meta.classificationOnly !== undefined && typeof meta.classificationOnly !== 'boolean' ||
          meta.classificationOnly === true && !['sorting', 'sort-feedback', 'finished'].includes(meta.phase)) return false;
      const ids = new Set(), cardMap = new Map();
      let classificationKey = null;
      for (const card of session.cards) {
        const q = card && card.question;
        if (!has(q) || q.sortingTopic !== meta.topic || ids.has(q.id) || typeof card.graded !== 'boolean' ||
            !Number.isInteger(card.stageIndex) || card.stageIndex < 0 || card.stageIndex >= q.stages.length ||
            !Array.isArray(card.stages) || card.stages.length !== q.stages.length ||
            !card.stages.every((stage, index) => validSelection(stage) &&
              JSON.stringify(stage.data.options) === JSON.stringify(q.stages[index].options) &&
              stage.data.multiple === q.stages[index].multiple &&
              (q.stages[index].multiple ? JSON.stringify(stage.data.answers) === JSON.stringify(q.stages[index].answers) : stage.data.answer === q.stages[index].answer) &&
              JSON.stringify(stage.data.acceptedAnswerSets) === JSON.stringify(q.stages[index].acceptedAnswerSets) &&
              Array.isArray(stage.choices) && stage.choices.length === stage.data.options.length &&
              new Set(stage.choices.map(choice => choice.originalIndex)).size === stage.data.options.length &&
              stage.choices.every(choice => Number.isInteger(choice.originalIndex) && choice.originalIndex >= 0 &&
                choice.originalIndex < stage.data.options.length && choice.text === stage.data.options[choice.originalIndex]))) return false;
        const classification = cardClassifications.get(q.id);
        if (classificationKey !== null && classification.key !== classificationKey) return false;
        classificationKey = classification.key;
        const checked = meta.checked[q.id];
        if (!Array.isArray(checked) || new Set(checked).size !== checked.length ||
            !checked.every(index => Number.isInteger(index) && index > 0 && index < card.stages.length && answered(card.stages[index]))) return false;
        if (meta.classificationOnly === true && (card.stageIndex !== 0 || checked.length || card.stages.slice(1).some(answered))) return false;
        const complete = answered(card.stages[0]) && (meta.classificationOnly === true || checked.length === card.stages.length - 1);
        if (card.graded && (!complete || meta.phase === 'sorting') || meta.phase !== 'sorting' && card.graded !== complete ||
            meta.phase === 'sorting' && (checked.length || card.stageIndex !== 0 || card.stages.slice(1).some(answered))) return false;
        if (meta.phase !== 'sorting' && !answered(card.stages[0])) return false;
        ids.add(q.id); cardMap.set(q.id, card);
      }
      if (!ids.has(meta.active) || Object.keys(meta.checked).some(id => !ids.has(id))) return false;
      const active = cardMap.get(meta.active);
      if (meta.phase === 'sort-feedback' && session.cards.some(card => meta.checked[card.question.id].length)) return false;
      if ((meta.phase === 'meaning' || meta.phase === 'meaning-feedback') && (active.stageIndex < 1 ||
          (meta.phase === 'meaning-feedback') !== meta.checked[meta.active].includes(active.stageIndex))) return false;
      return meta.phase !== 'finished' || session.cards.every(card => card.graded);
    }

    function createController(host) {
      if (!host || !['getSession', 'save', 'record', 'showView', 'showResults', 'announce', 'getView', 'ready', 'el', 'node'].every(key => typeof host[key] === 'function')) {
        throw new Error('Sorting host is incomplete');
      }
      const doc = host.el('sorting-view') && host.el('sorting-view').ownerDocument;
      if (!doc) throw new Error('Sorting view is required');
      const win = doc.defaultView;
      const elements = Object.create(null);
      let mounted = false, composing = false, tableAtGrade = false, reviewIndex = null, reviewSession = null;
      let tableInputs = new Map(), tableRows = new Map(), renderedTableSession = null;
      let resultSelection = null, selectedPractice = null, selectionSession = null, resultScroll = null;
      const session = () => host.getSession();
      const meta = () => session().sorting;
      const currentGroup = () => {
        const group = byTopic.get(meta().topic), classification = cardClassifications.get(session().cards[0].question.id);
        return { ...group, title: group.displayTitle || group.title, bins: classification.bins, instruction: classification.instruction };
      };
      const sourceCard = card => sourceCards.get(card.question.id);
      const activeIndex = () => session().cards.findIndex(card => card.question.id === meta().active);
      const current = () => session().cards[activeIndex()];
      const checked = (card, index) => meta().checked[card.question.id].includes(index);
      const queue = () => meta().classificationOnly === true ? [] : session().cards.flatMap((card, cardIndex) => card.stages.slice(1).map((stage, index) => ({ card, cardIndex, stage, stageIndex: index + 1 })));
      function element(tag, cls, text) { return host.node(tag, cls, text); }
      function meaningText(value) {
        return currentGroup().id === 'noun-countability' ? String(value).replace(/\(\s*n\s*\)\s*/gi, '').trim() : value;
      }
      function named(tag, id, cls, text) {
        const item = element(tag, cls, text); item.id = 'sorting-' + id; elements[id] = item; return item;
      }
      function button(id, cls, text, action) {
        const item = named('button', id, cls, text); item.type = 'button'; item.addEventListener('click', action); return item;
      }
      function bookmarked(label, question, cls) {
        const bookmark = typeof host.bookmarkButton === 'function' && host.bookmarkButton(question);
        if (!bookmark) return label;
        const wrap = element('span', cls); wrap.append(label, bookmark); return wrap;
      }
      function heading(id, text) { const item = named('h1', id, 'sort-title', text); item.tabIndex = -1; return item; }
      function actions() { return element('div', 'sort-actions'); }
      function mount() {
        if (mounted) return;
        const root = host.el('sorting-view'); root.classList.add('sorting-practice'); root.replaceChildren();
        const table = named('div', 'table-panel', 'panel question-panel sort-workspace');
        table.append(named('p', 'counter', 'sort-counter'), heading('title', '단어에 해당하는 칸을 모두 체크하세요.'),
          named('p', 'instruction', 'table-instruction'), named('div', 'table-wrap', 'classification-table-wrap'));
        const tableActions = actions(); tableActions.classList.add('table-actions');
        tableActions.append(button('previous-word', 'text-button', '이전 단어', previousTableWord), named('span', 'table-progress', 'table-progress'), button('grade-table', 'primary-button', '세트 채점하기', gradeSort));
        elements['grade-table'].addEventListener('focus', () => { tableAtGrade = true; updateTableNavigation(); });
        table.append(tableActions);
        const feedback = named('div', 'feedback-panel', 'panel feedback-panel');
        const selectedActions = element('div', 'result-meaning-actions');
        selectedActions.append(named('p', 'selected-meaning-label', 'table-instruction', '단어를 선택하세요.'), button('selected-meaning', 'primary-button', '선택한 뜻 풀기', openSelectedMeaning));
        feedback.append(named('p', 'result-topic', 'sort-counter'), heading('result-title', ''), named('p', 'result-description', 'table-instruction', '분류별로 어떤 단어들이 있는지 함께 확인해 보세요.'),
          selectedActions, named('div', 'category-results', 'category-results'), named('div', 'sort-results', 'card-results'));
        const feedbackActions = actions(); feedbackActions.append(button('skip-meaning', 'secondary-button', '분류만 마치기', skipMeaning), button('begin-meaning', 'primary-button', '뜻 확인하기', beginMeaning)); feedback.append(feedbackActions);
        const meaning = named('div', 'meaning-panel', 'panel question-panel');
        const options = named('div', 'meaning-options', 'meaning-options'); options.setAttribute('role', 'group'); options.setAttribute('aria-label', '뜻 보기');
        const meaningTitle = heading('meaning-title', '');
        const meaningMeta = named('p', 'meaning-meta', 'meaning-meta');
        let meaningTopline = meaningMeta;
        if (typeof host.bookmarkButton === 'function') {
          meaningTopline = element('div', 'sort-meaning-topline');
          meaningTopline.append(meaningMeta, named('span', 'meaning-bookmark', 'sort-bookmark-slot'));
        }
        meaning.append(meaningTopline, meaningTitle, named('p', 'meaning-expression', 'question-example'), named('p', 'meaning-prompt', 'sorting-note'), options);
        const meaningActions = actions(); meaningActions.append(button('previous-meaning', 'text-button', '이전 단계', previousMeaning), button('grade-meaning', 'primary-button', '채점하기', gradeMeaning)); meaning.append(meaningActions);
        const meaningFeedback = named('section', 'meaning-feedback', 'panel feedback-panel');
        const feedbackTitle = named('h2', 'meaning-feedback-title'); feedbackTitle.tabIndex = -1;
        meaningFeedback.append(feedbackTitle, named('p', 'meaning-answer', 'answer-main'), named('div', 'meaning-explanation', 'result-detail'));
        const nextActions = actions(); nextActions.append(button('next-meaning', 'primary-button', '다음 뜻 확인', nextMeaning)); meaningFeedback.append(nextActions);
        const review = named('div', 'review-panel', 'panel feedback-panel');
        review.append(heading('review-title', ''), named('div', 'review-content', 'card-results'));
        const reviewActions = actions(); reviewActions.append(button('previous-review', 'text-button', '이전 단어', () => moveReview(-1)), button('next-review', 'secondary-button', '다음 단어', () => moveReview(1)), button('close-review', 'primary-button', '풀이 현황 보기', closeReview)); review.append(reviewActions);
        root.append(table, feedback, meaning, meaningFeedback, review); mounted = true;
      }
      function focusHeading(id) {
        const item = elements[id]; if (!item) return;
        item.focus({ preventScroll: true });
        const panel = item.closest('.panel'); if (panel) panel.scrollIntoView({ block: 'start', behavior: 'auto' });
      }
      function showPanel(id, focus) {
        ['table-panel', 'feedback-panel', 'meaning-panel', 'review-panel'].forEach(key => { elements[key].hidden = key !== id; });
        elements['meaning-feedback'].hidden = id !== 'meaning-panel' || !(selectedPractice ? selectedPractice.graded : meta().phase === 'meaning-feedback');
        host.showView('sorting');
        if (focus) focusHeading(focus);
      }
      function save() { host.save(); }
      function selectWord(id) {
        if (!host.ready()) return;
        tableAtGrade = false;
        if (meta().active !== id) { meta().active = id; session().index = activeIndex(); save(); }
        updateTableNavigation();
      }
      function updateTableNavigation() {
        if (elements['previous-word']) elements['previous-word'].disabled = !tableAtGrade && activeIndex() <= 0;
      }
      function updateTable() {
        const cards = session().cards, placed = cards.filter(card => answered(card.stages[0])).length;
        elements.counter.textContent = currentGroup().title + ' · ' + placed + ' / ' + cards.length + '개 체크';
        elements['table-progress'].textContent = placed + ' / ' + cards.length + '개 선택 완료';
        elements['grade-table'].disabled = placed !== cards.length;
        for (const card of cards) {
          const id = card.question.id;
          tableRows.get(id).classList.toggle('has-selection', answered(card.stages[0]));
          currentGroup().bins.forEach((bin, index) => {
            const input = tableInputs.get(id + ':' + index);
            input.checked = selection(card.stages[0]).includes(index); input.parentElement.classList.toggle('checked', input.checked);
          });
        }
        updateTableNavigation();
      }
      function toggleClassification(card, index, value) {
        if (!host.ready() || meta().phase !== 'sorting') return;
        const selected = selection(card.stages[0]).filter(choice => choice !== index);
        if (value) selected.push(index);
        selected.sort((a, b) => a - b); card.stages[0].selected = selected.length ? selected : null;
        tableAtGrade = false; meta().active = card.question.id; session().index = activeIndex(); save(); updateTable();
      }
      function renderSort(focus) {
        const s = session(), group = currentGroup();
        if (renderedTableSession !== s) {
          renderedTableSession = s; tableAtGrade = false; tableInputs = new Map(); tableRows = new Map();
          const table = element('table', 'classification-table'); table.style.setProperty('--bin-count', group.bins.length);
          table.append(element('caption', 'sr-only', group.title + ' · 단어별 분류 체크표'));
          const thead = element('thead'), headers = element('tr'), corner = element('th', '', '단어'); corner.scope = 'col'; headers.append(corner);
          group.bins.forEach(bin => { const cell = element('th', '', bin.label); cell.scope = 'col'; headers.append(cell); }); thead.append(headers); table.append(thead);
          const tbody = element('tbody');
          s.cards.forEach(card => {
            const id = card.question.id, row = element('tr'), word = element('th'), wordButton = element('button', 'table-word', sourceCard(card).text);
            row.dataset.sortingCard = id; word.scope = 'row'; wordButton.type = 'button'; wordButton.dataset.sortingWord = id;
            wordButton.addEventListener('click', () => selectWord(id)); wordButton.addEventListener('focus', () => selectWord(id)); word.append(bookmarked(wordButton, card.question, 'sort-bookmark-word')); row.append(word);
            group.bins.forEach((bin, index) => {
              const cell = element('td'), label = element('label', 'table-check'), input = element('input'); input.type = 'checkbox';
              input.dataset.sortingCard = id; input.dataset.sortingBin = String(index); input.setAttribute('aria-label', sourceCard(card).text + ' · ' + bin.label);
              input.addEventListener('focus', () => selectWord(id)); input.addEventListener('change', () => toggleClassification(card, index, input.checked));
              label.append(input); cell.append(label); row.append(cell); tableInputs.set(id + ':' + index, input);
            });
            tbody.append(row); tableRows.set(id, row);
          });
          table.append(tbody); elements['table-wrap'].replaceChildren(table);
        }
        elements.instruction.textContent = group.instruction; updateTable(); showPanel('table-panel', focus ? 'title' : null);
      }
      function focusWord(id) {
        selectWord(id); const input = tableInputs.get(id + ':0');
        if (input) input.focus({ preventScroll: true });
        const row = tableRows.get(id); if (!row) return;
        const wrap = elements['table-wrap'], head = wrap.querySelector('thead');
        const headerHeight = head && typeof head.getBoundingClientRect === 'function' ? head.getBoundingClientRect().height : 0;
        if (headerHeight) wrap.style.setProperty('--classification-header-offset', (headerHeight + 8) + 'px');
        row.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        if (typeof wrap.getBoundingClientRect !== 'function' || typeof row.getBoundingClientRect !== 'function') return;
        const viewport = wrap.getBoundingClientRect(), bounds = row.getBoundingClientRect();
        const visibleTop = viewport.top + headerHeight + 8, visibleBottom = viewport.bottom - 8;
        if (bounds.top < visibleTop) wrap.scrollTop -= visibleTop - bounds.top;
        else if (bounds.bottom > visibleBottom) wrap.scrollTop += bounds.bottom - visibleBottom;
      }
      function previousTableWord() {
        if (!host.ready() || meta().phase !== 'sorting') return;
        const index = tableAtGrade ? session().cards.length : activeIndex();
        if (index > 0) focusWord(session().cards[index - 1].question.id);
      }
      function nextTableWord() {
        const cards = session().cards, next = cards[activeIndex() + 1] || cards.find(card => !answered(card.stages[0]));
        if (next) focusWord(next.question.id);
        else { elements['grade-table'].focus({ preventScroll: true }); elements['grade-table'].scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
      }
      function finishCard(card) {
        if (card.graded || meta().phase === 'sorting' || !answered(card.stages[0]) ||
            meta().classificationOnly !== true && !card.stages.slice(1).every((stage, index) => answered(stage) && checked(card, index + 1))) return;
        card.graded = true; host.record(card);
      }
      function gradeSort() {
        if (!host.ready() || meta().phase !== 'sorting') return;
        if (session().cards.some(card => !answered(card.stages[0]))) { host.announce('아직 선택하지 않은 단어가 있어요.'); return; }
        meta().phase = 'sort-feedback'; session().cards.forEach(finishCard); save(); render(true);
      }
      function formExplanation(card) {
        if (card.question.sortingTopic !== 'verb-forms') return null;
        const note = clean(sourceCard(card).note);
        if (!note) return null;
        const lines = note.replace(/\s*(?:\/\s*)?\(([1-5])v\)/gi, '\n($1V)').trim();
        return element('p', 'result-detail result-note form-lines', lines);
      }
      function resultRow(card, meanings) {
        const source = sourceCard(card), group = currentGroup(), classified = correct(card.stages[0]);
        const allCorrect = classified && (!meanings || card.stages.slice(1).every(correct));
        const row = element('article', 'card-result ' + (allCorrect ? 'correct' : 'incorrect'));
        const head = element('div', 'card-result-head'); head.append(bookmarked(element('strong', '', source.text), card.question, 'sort-bookmark-title'), element('span', 'status-tag ' + (allCorrect ? 'correct' : 'incorrect'), allCorrect ? '정답' : classified ? '뜻 확인' : '분류 오답')); row.append(head);
        const answer = source.correctBins.map(id => group.bins.find(bin => bin.id === id).label).join(' · ');
        const classification = element('p', 'classification-answer');
        if (!classified) {
          classification.append(element('span', 'result-selection', '내 선택: ' + selection(card.stages[0]).map(index => group.bins[index].label).join(' · ')),
            element('span', 'result-arrow', '→'));
        }
        classification.append(element('span', 'result-correct', '정답: ' + answer)); row.append(classification);
        if (meanings) {
          const meaningResults = element('div', 'meaning-results');
          card.stages.slice(1).forEach((stage, index) => {
            const step = source.steps[index];
            const meaning = element('p', 'result-detail meaning-result' + (correct(stage) ? '' : ' incorrect'));
            meaning.append(element('span', 'meaning-result-label', (step.expression || source.text) + ' · ' + step.label),
              element('span', 'meaning-result-answer', (!correct(stage) ? '내 선택: ' + selection(stage).map(choice => meaningText(stage.data.options[choice])).join(' · ') + ' → 정답: ' : '') + meaningText(stage.data.options[stage.data.answer])));
            meaningResults.append(meaning);
          });
          if (card.stages.length > 1) row.append(meaningResults);
        }
        const labels = Array.from(new Set(card.question.sources.filter(item => positive(item.bookPage)).map(item => (item.book === 'quickstart' ? '퀵스타트 ' : '파워토익 VOCA ') + item.bookPage + '쪽')));
        if (source.examples.length || clean(source.note) || labels.length) {
          const details = element('details', 'result-disclosure');
          details.append(element('summary', '', '예문·설명 보기'));
          if (source.examples.length) details.append(element('p', 'result-detail result-examples', source.examples.join('\n')));
          const forms = formExplanation(card);
          if (forms) details.append(forms);
          else if (clean(source.note)) details.append(element('p', 'result-detail result-note', source.note));
          if (labels.length) details.append(element('p', 'source-note', labels.join(' · ')));
          row.append(details);
        }
        return row;
      }
      function renderSortFeedback(focus) {
        const group = currentGroup(), cards = session().cards, count = cards.filter(card => correct(card.stages[0])).length;
        elements['result-topic'].textContent = group.title + (meta().classificationOnly === true ? ' · 분류만' : ''); elements['result-title'].textContent = '분류 ' + count + ' / ' + cards.length + '개 정답';
        const compatibility = cards.some(card => card.stages[0].data.compatibilityNote);
        const extras = card => correct(card.stages[0]) ? [] : selection(card.stages[0]).filter(index => !sourceCard(card).correctBins.includes(group.bins[index].id));
        const hasExtras = cards.some(card => extras(card).length);
        elements['result-description'].textContent = [compatibility ? '보완된 형식을 확인하세요. 진행 중인 풀이의 기존 정답도 인정했어요.' : '', hasExtras ? '취소선은 잘못 선택한 분류예요.' : ''].filter(Boolean).join(' ');
        elements['result-description'].hidden = !compatibility && !hasExtras;
        const target = elements['category-results']; target.replaceChildren(); target.style.setProperty('--bin-count', group.bins.length);
        const shared = cards.filter(card => sourceCard(card).correctBins.length > 1 || extras(card).length).sort((a, b) =>
          sourceCard(b).correctBins.length - sourceCard(a).correctBins.length || sourceCard(a).text.localeCompare(sourceCard(b).text, 'en'));
        const singles = cards.filter(card => sourceCard(card).correctBins.length === 1 && !extras(card).length);
        function wordLabel(card, binIndex) {
          const source = sourceCard(card), stage = card.stages[0];
          const expected = source.correctBins.includes(group.bins[binIndex].id), picked = selection(stage).includes(binIndex);
          const incorrect = !correct(stage) && expected !== picked, extra = incorrect && !expected;
          const item = meaningFor(card, binIndex);
          const word = element(item ? 'button' : 'span', 'category-word' + (incorrect ? ' incorrect' : '') + (extra ? ' extra-choice' : ''));
          if (extra) { word.setAttribute('aria-label', source.text + ' · ' + group.bins[binIndex].label + '는 선택한 오답'); word.title = '선택한 오답 · 이번 정답에 없는 분류'; }
          if (item) {
            word.type = 'button'; word.dataset.resultMeaning = card.question.id + ':' + binIndex;
            word.setAttribute('aria-label', source.text + ' · ' + group.bins[binIndex].label + ' 뜻 선택');
            word.addEventListener('click', () => {
              resultSelection = { id: card.question.id, binIndex };
              updateResultSelection();
            });
          }
          word.append(element('span', 'category-word-text', source.text));
          if (incorrect) { const badge = element('span', 'category-badge incorrect', '오답'); badge.setAttribute('aria-hidden', 'true'); word.append(badge); }
          word.append(element('span', 'sr-only', ' · 해당 분류: ' + group.bins.filter(bin => source.correctBins.includes(bin.id)).map(bin => bin.label).join(' · ') + (incorrect ? ' · 분류 오답' : '')));
          return word;
        }
        const wrap = element('div', 'category-comparison-wrap'), table = element('table', 'category-comparison');
        wrap.tabIndex = 0; wrap.setAttribute('role', 'region'); wrap.setAttribute('aria-label', '분류별 단어 표');
        table.setAttribute('aria-label', '분류별 단어 비교');
        const head = element('thead'), header = element('tr');
        group.bins.forEach(bin => {
          const cell = element('th', '', bin.label); cell.setAttribute('scope', 'col');
          header.append(cell);
        });
        head.append(header); table.append(head); const body = element('tbody');
        let hasMultiple = false, singleBoundary = false;
        function appendRow(words, cls, id) {
          const row = element('tr', cls); if (id) row.dataset.categoryRow = id;
          const multiple = words.some(card => card && sourceCard(card).correctBins.length > 1);
          if (!multiple && hasMultiple && !singleBoundary) { row.classList.add('category-single-start'); singleBoundary = true; }
          if (multiple) hasMultiple = true;
          words.forEach((card, index) => {
            const cell = element('td');
            if (card) cell.append(wordLabel(card, index));
            else { const empty = element('span', 'category-missing', '—'); empty.setAttribute('aria-label', '해당 없음'); cell.append(empty); }
            row.append(cell);
          });
          body.append(row);
        }
        shared.forEach(card => appendRow(group.bins.map((bin, index) => sourceCard(card).correctBins.includes(bin.id) || extras(card).includes(index) ? card : null), 'category-shared-row', card.question.id));
        const singleColumns = group.bins.map(bin => singles.filter(card => sourceCard(card).correctBins.includes(bin.id)));
        for (let index = 0; index < Math.max(...singleColumns.map(words => words.length)); index++) {
          appendRow(singleColumns.map(words => words[index] || null), 'category-single-row');
        }
        table.append(body); wrap.append(table); target.append(wrap);
        updateResultSelection();
        const meanings = queue().length > 0, results = elements['sort-results']; results.replaceChildren();
        cards.filter(card => !correct(card.stages[0])).forEach(card => results.append(resultRow(card, false)));
        if (count === cards.length) results.append(element('p', 'table-instruction', '모두 정확하게 분류했어요.'));
        elements['skip-meaning'].hidden = !meanings;
        elements['begin-meaning'].textContent = meanings ? '뜻 확인하기' : '결과 보기'; showPanel('feedback-panel', focus ? 'result-title' : null);
      }
      function meaningFor(card, binIndex) {
        const source = sourceCard(card), bin = currentGroup().bins[binIndex];
        if (!source || !bin || !source.correctBins.includes(bin.id) || !source.steps.length) return null;
        let index = source.steps.findIndex(step => step.id.endsWith('-' + bin.id) || step.label.replace(/\s*뜻$/, '').trim() === bin.label);
        if (index < 0 && source.steps.length === 1) index = 0;
        return index < 0 ? null : { card, cardIndex: session().cards.indexOf(card), stage: card.stages[index + 1], stageIndex: index + 1 };
      }
      function selectedMeaning() {
        const card = resultSelection && session().cards.find(card => card.question.id === resultSelection.id);
        return card ? meaningFor(card, resultSelection.binIndex) : null;
      }
      function updateResultSelection() {
        const item = selectedMeaning();
        elements['category-results'].querySelectorAll('[data-result-meaning]').forEach(word => {
          const selected = Boolean(item && word.dataset.resultMeaning === resultSelection.id + ':' + resultSelection.binIndex);
          word.classList.toggle('selected-meaning-word', selected); word.setAttribute('aria-pressed', String(selected));
        });
        elements['selected-meaning'].disabled = !item;
        elements['selected-meaning-label'].textContent = item ? sourceCard(item.card).text + ' · ' + currentGroup().bins[resultSelection.binIndex].label : '단어를 선택하세요.';
      }
      function moveResultSelection(key, target) {
        const rows = Array.from(elements['category-results'].querySelectorAll('tbody tr'));
        const words = Array.from(elements['category-results'].querySelectorAll('[data-result-meaning]'));
        let word = words.find(item => item.getAttribute('aria-pressed') === 'true');
        if (!word && target && target.closest) word = target.closest('[data-result-meaning]');
        let next = null;
        if (!word) next = words[0];
        else {
          const cell = word.closest('td'), row = cell && cell.parentElement;
          const rowIndex = rows.indexOf(row), column = row ? Array.from(row.children).indexOf(cell) : -1;
          const horizontal = key === 'ArrowLeft' || key === 'ArrowRight';
          const direction = key === 'ArrowLeft' || key === 'ArrowUp' ? -1 : 1;
          if (horizontal) next = words[words.indexOf(word) + direction];
          else for (let index = rowIndex + direction; index >= 0 && index < rows.length; index += direction) {
            const candidates = Array.from(rows[index].children).map((cell, col) => ({
              word: cell.querySelector('[data-result-meaning]'), column: col, distance: Math.abs(col - column)
            })).filter(item => item.word).sort((a, b) => a.distance - b.distance || a.column - b.column);
            if (candidates.length) { next = candidates[0].word; break; }
          }
        }
        if (next) {
          next.click(); next.focus({ preventScroll: true });
          next.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
      }
      function openSelectedMeaning() {
        if (!host.ready() || meta().phase !== 'sort-feedback') return;
        const item = selectedMeaning(); if (!item) return;
        const wrap = elements['category-results'].querySelector('.category-comparison-wrap');
        resultScroll = { top: win.scrollY || 0, left: wrap ? wrap.scrollLeft || 0 : 0 };
        selectedPractice = { ...item, stage: { ...item.stage, selected: null }, graded: false };
        renderMeaning(true);
      }
      function closeSelectedMeaning() {
        if (!selectedPractice) return;
        selectedPractice = null; renderSortFeedback(false);
        const wrap = elements['category-results'].querySelector('.category-comparison-wrap');
        if (wrap && resultScroll) wrap.scrollLeft = resultScroll.left;
        const selected = Array.from(elements['category-results'].querySelectorAll('[data-result-meaning]')).find(word => word.getAttribute('aria-pressed') === 'true');
        if (selected) selected.focus({ preventScroll: true });
        if (resultScroll) win.scrollTo({ top: resultScroll.top, behavior: 'auto' });
      }
      function pointTo(item) {
        session().index = item.cardIndex; meta().active = item.card.question.id; item.card.stageIndex = item.stageIndex;
        meta().phase = checked(item.card, item.stageIndex) ? 'meaning-feedback' : 'meaning';
      }
      function beginMeaning() {
        if (!host.ready() || meta().phase !== 'sort-feedback') return;
        const first = queue()[0];
        if (!first) { finish(); return; }
        pointTo(first); save(); render(true);
      }
      function skipMeaning() {
        if (!host.ready() || meta().phase !== 'sort-feedback' || !queue().length ||
            session().cards.some(card => card.stageIndex !== 0 || card.stages.slice(1).some(answered))) return;
        meta().classificationOnly = true;
        finish();
      }
      function meaningItem() {
        if (selectedPractice) return selectedPractice;
        const card = current(); return queue().find(item => item.card === card && item.stageIndex === card.stageIndex);
      }
      function chooseMeaning(originalIndex) {
        if (selectedPractice) {
          if (selectedPractice.graded) return;
          selectedPractice.stage.selected = originalIndex; renderMeaning(false); return;
        }
        if (!host.ready() || meta().phase !== 'meaning') return;
        const item = meaningItem(); if (!item || checked(item.card, item.stageIndex)) return;
        item.stage.selected = originalIndex; save(); renderMeaning(false);
      }
      function renderMeaning(focus) {
        const item = meaningItem(); if (!item) return;
        const items = queue(), index = items.findIndex(row => row.card === item.card && row.stageIndex === item.stageIndex);
        const source = sourceCard(item.card), step = source.steps[item.stageIndex - 1], graded = selectedPractice ? selectedPractice.graded : checked(item.card, item.stageIndex);
        elements['meaning-meta'].textContent = selectedPractice ? '선택 뜻 연습 · 누적 점수에 합산하지 않아요' : currentGroup().title + ' · 뜻 확인 ' + (index + 1) + ' / ' + items.length + '단계';
        elements['meaning-title'].textContent = source.text + ' · ' + step.label;
        const bookmarkSlot = elements['meaning-bookmark'];
        if (bookmarkSlot && bookmarkSlot.dataset.questionId !== item.card.question.id) {
          const bookmark = host.bookmarkButton(item.card.question);
          bookmarkSlot.replaceChildren(...(bookmark ? [bookmark] : [])); bookmarkSlot.dataset.questionId = item.card.question.id;
        }
        elements['meaning-expression'].textContent = step.expression || source.text; elements['meaning-prompt'].textContent = step.prompt;
        const list = elements['meaning-options']; list.replaceChildren();
        item.stage.choices.forEach((choice, displayIndex) => {
          const selected = item.stage.selected === choice.originalIndex, right = choice.originalIndex === item.stage.data.answer;
          const option = element('button', 'meaning-option' + (selected ? ' selected' : '') + (graded && right ? ' correct' : '') + (graded && selected && !right ? ' incorrect' : ''));
          option.type = 'button'; option.disabled = graded; option.dataset.sortingMeaning = String(displayIndex); option.setAttribute('aria-pressed', String(selected));
          option.append(element('span', 'option-number', String(displayIndex + 1)), element('span', '', meaningText(choice.text))); option.addEventListener('click', () => chooseMeaning(choice.originalIndex)); list.append(option);
        });
        elements['previous-meaning'].hidden = !selectedPractice && index === 0; elements['previous-meaning'].textContent = selectedPractice ? '표로 돌아가기' : '이전 단계';
        elements['grade-meaning'].hidden = graded; elements['grade-meaning'].disabled = !answered(item.stage);
        if (graded) {
          elements['meaning-feedback-title'].textContent = correct(item.stage) ? '✓ 정답' : '다시 확인';
          elements['meaning-answer'].textContent = (step.expression || source.text) + ' → ' + meaningText(item.stage.data.options[item.stage.data.answer]);
          const forms = formExplanation(item.card);
          elements['meaning-explanation'].replaceChildren(...(forms ? [forms] : [element('p', '', clean(source.note))]));
          elements['next-meaning'].textContent = selectedPractice ? '표로 돌아가기' : index === items.length - 1 ? '세트 결과 보기' : '다음 뜻 확인';
        }
        showPanel('meaning-panel', focus ? graded ? 'meaning-feedback-title' : 'meaning-title' : null);
      }
      function gradeMeaning() {
        if (selectedPractice) {
          if (!answered(selectedPractice.stage) || selectedPractice.graded) return;
          selectedPractice.graded = true; renderMeaning(true); return;
        }
        if (!host.ready() || meta().phase !== 'meaning') return;
        const item = meaningItem(); if (!item || !answered(item.stage)) { host.announce('뜻을 먼저 선택해 주세요.'); return; }
        if (!checked(item.card, item.stageIndex)) meta().checked[item.card.question.id].push(item.stageIndex);
        meta().checked[item.card.question.id].sort((a, b) => a - b); meta().phase = 'meaning-feedback'; finishCard(item.card); save(); render(true);
      }
      function previousMeaning() {
        if (selectedPractice) { closeSelectedMeaning(); return; }
        if (!host.ready() || !['meaning', 'meaning-feedback'].includes(meta().phase)) return;
        const item = meaningItem(), items = queue(), index = items.findIndex(row => row.card === item.card && row.stageIndex === item.stageIndex);
        if (index > 0) { pointTo(items[index - 1]); save(); render(true); }
      }
      function nextMeaning() {
        if (selectedPractice) { closeSelectedMeaning(); return; }
        if (!host.ready() || meta().phase !== 'meaning-feedback') return;
        const item = meaningItem(), items = queue(), index = items.findIndex(row => row.card === item.card && row.stageIndex === item.stageIndex);
        if (index < items.length - 1) { pointTo(items[index + 1]); save(); render(true); }
        else {
          const missing = items.find(row => !checked(row.card, row.stageIndex));
          if (missing) { pointTo(missing); save(); render(true); }
          else finish();
        }
      }
      function finish() {
        session().cards.forEach(finishCard);
        if (!session().cards.every(card => card.graded)) return;
        meta().phase = 'finished'; reviewIndex = null; reviewSession = null; save(); host.showResults();
      }
      function renderReview(focus) {
        const card = session().cards[reviewIndex]; if (!card || !card.graded) { reviewIndex = null; host.showResults(); return; }
        elements['review-title'].textContent = sourceCard(card).text + ' · 풀이 확인'; elements['review-content'].replaceChildren(resultRow(card, meta().classificationOnly !== true));
        elements['previous-review'].disabled = !session().cards.slice(0, reviewIndex).some(item => item.graded);
        elements['next-review'].disabled = !session().cards.slice(reviewIndex + 1).some(item => item.graded);
        showPanel('review-panel', focus ? 'review-title' : null);
      }
      function moveReview(direction) {
        if (reviewIndex === null) return;
        for (let index = reviewIndex + direction; index >= 0 && index < session().cards.length; index += direction) {
          if (session().cards[index].graded) { reviewIndex = index; renderReview(true); return; }
        }
      }
      function closeReview() { reviewIndex = null; reviewSession = null; host.showResults(); }
      function start(value) {
        if (!value || !Array.isArray(value.cards) || !value.cards.length || !value.cards.every(card => has(card.question)) ||
            new Set(value.cards.map(card => card.question.sortingTopic)).size !== 1 ||
            new Set(value.cards.map(card => cardClassifications.get(card.question.id).key)).size !== 1) return false;
        const first = value.cards[0];
        value.sorting = { topic: first.question.sortingTopic, phase: 'sorting', active: first.question.id, checked: {} };
        value.index = 0; value.cards.forEach(card => { card.stageIndex = 0; value.sorting.checked[card.question.id] = []; });
        reviewIndex = null; reviewSession = null; renderedTableSession = null; save(); return true;
      }
      function render(focus) {
        const s = session(); if (!s || !s.sorting) return;
        mount();
        if (selectionSession !== s) { resultSelection = null; selectedPractice = null; resultScroll = null; selectionSession = s; }
        if (selectedPractice) { renderMeaning(focus); return; }
        if (reviewSession !== s) { reviewIndex = null; reviewSession = null; }
        if (reviewIndex !== null) { renderReview(focus); return; }
        // The saved active word, rather than a results-list click, owns resume.
        s.index = activeIndex();
        if (s.sorting.phase === 'sorting') renderSort(focus);
        else if (s.sorting.phase === 'sort-feedback') renderSortFeedback(focus);
        else if (s.sorting.phase === 'finished') host.showResults();
        else renderMeaning(focus);
      }
      function openCard(index) {
        const s = session(); if (!s || !s.sorting || !Number.isInteger(index) || !s.cards[index]) return;
        if (s.cards[index].graded) { reviewIndex = index; reviewSession = s; mount(); renderReview(true); }
        else { reviewIndex = null; reviewSession = null; render(true); }
      }
      function keyboard(event) {
        const s = session();
        if (event.defaultPrevented || !s || !s.sorting || !host.ready() || host.getView() !== 'sorting' ||
            event.ctrlKey || event.metaKey || event.altKey || event.isComposing || composing || event.keyCode === 229 ||
            (event.shiftKey && !(event.key === 'Enter' && ['sorting', 'meaning', 'meaning-feedback'].includes(s.sorting.phase))) || reviewIndex !== null ||
            Array.from(doc.querySelectorAll('dialog[open], [role="dialog"][aria-modal="true"]')).some(dialog => !dialog.hidden && !dialog.closest('[hidden]'))) return;
        const target = event.target, field = target && target.closest && target.closest('input,textarea,select,[contenteditable],[role="textbox"]');
        if (field && !(field.type === 'checkbox' && field.dataset.sortingCard)) return;
        const control = target && target.closest && target.closest('button,a,summary');
        const allowed = ['sorting-previous-word', 'sorting-grade-table', 'sorting-begin-meaning', 'sorting-skip-meaning', 'sorting-previous-meaning', 'sorting-grade-meaning', 'sorting-next-meaning'];
        if (control && !control.dataset.sortingWord && control.dataset.sortingMeaning === undefined && control.dataset.resultMeaning === undefined && control.id !== 'sorting-selected-meaning' && !allowed.includes(control.id)) return;
        if (s.sorting.phase === 'sort-feedback' && !selectedPractice && /^Arrow(?:Left|Right|Up|Down)$/.test(event.key)) {
          event.preventDefault(); moveResultSelection(event.key, target); return;
        }
        const number = /^[1-8]$/.test(event.key) ? Number(event.key) - 1 : null;
        if (number === null && event.key !== 'Enter') return;
        if (event.repeat) { event.preventDefault(); return; }
        if (selectedPractice) {
          if (event.key === 'Enter') {
            event.preventDefault();
            if (control && control.id === 'sorting-previous-meaning' || selectedPractice.graded) closeSelectedMeaning();
            else gradeMeaning();
          } else if (number !== null && !selectedPractice.graded && number < selectedPractice.stage.choices.length) {
            event.preventDefault(); chooseMeaning(selectedPractice.stage.choices[number].originalIndex);
          }
          return;
        }
        if (s.sorting.phase === 'sorting') {
          if (number !== null && number < currentGroup().bins.length) {
            event.preventDefault(); const input = tableInputs.get(s.sorting.active + ':' + number); if (input) input.click();
          } else if (event.key === 'Enter') {
            event.preventDefault();
            if (event.shiftKey || control && control.id === 'sorting-previous-word') previousTableWord();
            else if (control && control.id === 'sorting-grade-table') gradeSort(); else nextTableWord();
          }
        } else if (s.sorting.phase === 'sort-feedback' && event.key === 'Enter') {
          event.preventDefault();
          if (control && control.id === 'sorting-skip-meaning') skipMeaning();
          else if (control && control.id === 'sorting-begin-meaning') beginMeaning();
          else if (control && control.dataset.resultMeaning && control.getAttribute('aria-pressed') !== 'true') control.click();
          else if (selectedMeaning()) openSelectedMeaning();
          else beginMeaning();
        }
        else if (s.sorting.phase === 'meaning' || s.sorting.phase === 'meaning-feedback') {
          const item = meaningItem(); if (!item) return;
          if (event.key === 'Enter' && event.shiftKey) { event.preventDefault(); previousMeaning(); return; }
          if (number !== null && s.sorting.phase === 'meaning' && number < item.stage.choices.length) {
            event.preventDefault(); chooseMeaning(item.stage.choices[number].originalIndex);
          } else if (event.key === 'Enter') { event.preventDefault(); if (s.sorting.phase === 'meaning-feedback') nextMeaning(); else gradeMeaning(); }
        }
      }
      win.addEventListener('compositionstart', () => { composing = true; });
      win.addEventListener('compositionend', () => { composing = false; });
      win.addEventListener('keydown', keyboard);
      return { start, render, openCard };
    }
    return { version: data && data.version || VERSION, questions, assignments, groups, byId, has, validateSession, createController,
      subscopes: freeze(groups.map(group => ({ id: 'sorting-' + group.id, label: group.displayTitle || group.title, group: 'sorting-practice' }))) };
  }
  return { VERSION, idFor, create };
});
