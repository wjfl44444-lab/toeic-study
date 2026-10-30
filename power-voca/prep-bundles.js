(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.PowerVocaPrepBundles = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const INSTRUCTION = '알맞은 전치사·부사를 선택하세요.';
  const copy = value => JSON.parse(JSON.stringify(value));
  const text = value => typeof value === 'string' && value.trim().length > 0;
  const unique = values => Array.from(new Set(values));
  const wordOf = question => {
    const word = String(question.displayExpression || '').toLowerCase().trim().split(' · ')[0].trim();
    return word === 'set a' ? 'set' : word;
  };
  function mix(values) {
    const result = values.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function answerWords(question) {
    const source = question.stages[0];
    return (source.multiple ? source.answers : [source.answer]).map(index => source.options[index]);
  }
  function validSource(question) {
    if (!question || !text(question.id) || !text(question.displayExpression) || question.grammarPool !== 'prepositions' ||
        !Array.isArray(question.stages) || question.stages.length !== 1) return false;
    const source = question.stages[0];
    if (!source || source.kind !== 'structure' || !Array.isArray(source.options) || source.options.length < 4 ||
        source.options.length > 8 || !source.options.every(text) || unique(source.options).length !== source.options.length) return false;
    const answers = source.multiple ? source.answers : [source.answer];
    return Array.isArray(answers) && answers.length > 0 && unique(answers).length === answers.length &&
      answers.every(index => Number.isInteger(index) && index >= 0 && index < source.options.length);
  }
  function signature(question) { return JSON.stringify(answerWords(question).slice().sort()); }
  function groups(pool) {
    const byWord = new Map();
    (Array.isArray(pool) ? pool : []).forEach(question => {
      if (!validSource(question)) return;
      const word = wordOf(question);
      if (!byWord.has(word)) byWord.set(word, []);
      byWord.get(word).push(question);
    });
    const priority = word => word === 'fill' ? 0 : word === 'look' ? 1 : 2;
    return Array.from(byWord, ([word, questions]) => ({ word, questions }))
      .filter(group => unique(group.questions.map(signature)).length >= 2)
      .sort((a, b) => priority(a.word) - priority(b.word) || a.word.localeCompare(b.word, 'en'));
  }
  function metadata(input, options) {
    options = options || {};
    const meta = { version: 1, groups: input.map(group => {
      const answers = unique(group.questions.flatMap(answerWords));
      const others = unique(group.questions.flatMap(question => question.stages[0].options)).filter(word => !answers.includes(word));
      const bank = answers.concat((options.shuffleOptions ? mix(others) : others).slice(0, Math.max(0, 8 - answers.length)));
      return { word: group.word, ids: (options.shuffleQuestions ? mix(group.questions) : group.questions).map(question => question.id),
        bank: options.shuffleOptions ? mix(bank) : bank };
    }) };
    if (!validMetadata(meta, input.flatMap(group => group.questions))) throw new Error('Invalid preposition bundle metadata');
    return meta;
  }
  function validMetadata(meta, questions) {
    if (!meta || meta.version !== 1 || !Array.isArray(meta.groups) || !meta.groups.length || !Array.isArray(questions) ||
        !questions.length || questions.some(question => !validSource(question))) return false;
    const byId = new Map(questions.map(question => [question.id, question]));
    if (byId.size !== questions.length) return false;
    const seen = new Set(), words = new Set();
    for (const group of meta.groups) {
      if (!group || !text(group.word) || group.word.length > 80 || words.has(group.word) || !Array.isArray(group.ids) ||
          group.ids.length < 2 || unique(group.ids).length !== group.ids.length || !Array.isArray(group.bank) ||
          group.bank.length < 4 || group.bank.length > 8 || unique(group.bank).length !== group.bank.length ||
          !group.bank.every(word => text(word) && word.length <= 500)) return false;
      const sources = [];
      for (const id of group.ids) {
        const question = byId.get(id);
        if (!question || seen.has(id) || wordOf(question) !== group.word) return false;
        seen.add(id); sources.push(question);
      }
      if (unique(sources.map(signature)).length < 2) return false;
      const options = new Set(sources.flatMap(question => question.stages[0].options));
      if (group.bank.some(word => !options.has(word)) || sources.some(question => answerWords(question).some(word => !group.bank.includes(word)))) return false;
      words.add(group.word);
    }
    return seen.size === questions.length;
  }
  function stage(question, index, meta) {
    const group = meta && Array.isArray(meta.groups) && meta.groups.find(group => group.ids.includes(question.id));
    if (index !== 0 || !validSource(question) || !group) throw new Error('Invalid preposition bundle stage');
    const source = question.stages[0], result = copy(source), answers = answerWords(question);
    if (answers.some(word => !group.bank.includes(word))) throw new Error('Missing preposition bundle answer');
    result.options = group.bank.slice(); result.multiple = true; result.fixedOrder = true;
    result.answers = result.options.map((word, i) => answers.includes(word) ? i : -1).filter(i => i >= 0);
    delete result.answer;
    result.instruction = INSTRUCTION;
    result.optionReasons = result.options.map(word => {
      const original = source.options.indexOf(word), reason = original >= 0 && source.optionReasons && source.optionReasons[original];
      return text(reason) ? reason : '‘' + word + '’이 문장의 뜻과 결합 조건에 맞는지 확인해 주세요.';
    });
    return result;
  }

  function createController(host) {
    if (!host || !['el', 'node', 'getSession', 'getView', 'ready', 'save', 'record', 'showView', 'showResults', 'announce'].every(key => typeof host[key] === 'function')) {
      throw new Error('Preposition bundle host is incomplete');
    }
    const root = host.el('prep-bundles-view');
    if (!root || !root.ownerDocument) throw new Error('Preposition bundle view is required');
    const doc = root.ownerDocument, win = doc.defaultView, elements = Object.create(null);
    let mounted = false, composing = false;
    const session = () => host.getSession();
    const selected = card => Array.isArray(card.stages[0].selected) ? card.stages[0].selected : [];
    const correct = card => {
      const values = selected(card), answers = card.stages[0].data.answers;
      return values.length === answers.length && answers.every(index => values.includes(index));
    };
    const groupIndex = () => {
      const current = session(), card = current && current.cards[current.index];
      return card && current.prepBundles ? current.prepBundles.groups.findIndex(group => group.ids.includes(card.question.id)) : -1;
    };
    const group = () => session().prepBundles.groups[groupIndex()];
    const cards = () => group().ids.map(id => session().cards.find(card => card.question.id === id));
    const active = () => session().cards[session().index];
    const canAct = () => host.ready() && host.getView() === 'prep-bundles' && groupIndex() >= 0;
    const node = (tag, cls, value) => host.node(tag, cls, value);
    function named(tag, id, cls, value) {
      const item = node(tag, cls, value); item.id = 'prep-bundles-' + id; elements[id] = item; return item;
    }
    function button(id, cls, label, action) {
      const item = named('button', id, cls, label); item.type = 'button'; item.addEventListener('click', action); return item;
    }
    function mount() {
      if (mounted) return;
      const topline = named('div', 'topline', 'quiz-topline');
      topline.append(node('span', 'pill', '같은 동사 결합'), named('p', 'progress', 'subtle'));
      const heading = named('section', 'heading', 'bundle-heading'); heading.setAttribute('aria-labelledby', 'prep-bundles-word');
      const title = named('h1', 'word'); title.tabIndex = -1;
      heading.append(title, node('p', '', INSTRUCTION));
      const dock = named('div', 'answer-dock', 'panel');
      const bank = named('section', 'choice-bank'); bank.setAttribute('aria-labelledby', 'prep-bundles-active-label');
      bank.append(named('p', 'active-label'), named('fieldset', 'shared-options', 'bundle-options'));
      const footer = named('footer', 'actions', 'bundle-actions'), summary = named('p', 'summary'); summary.setAttribute('aria-live', 'polite');
      footer.append(button('previous', 'secondary-button', '이전 세트', previous), summary,
        button('retry', 'text-button', '다시 풀기', retry), button('grade', 'primary-button', '세트 채점하기', grade), button('next', 'primary-button', '다음 세트 →', next));
      dock.append(bank, footer);
      const status = named('p', 'status', 'sr-only'); status.setAttribute('role', 'status');
      root.replaceChildren(topline, heading, named('div', 'questions', 'panel'), dock, status);
      win.addEventListener('compositionstart', () => { composing = true; });
      win.addEventListener('compositionend', () => { composing = false; });
      win.addEventListener('keydown', keyboard);
      win.addEventListener('resize', measureDock);
      mounted = true;
    }
    function announce(message) { elements.status.textContent = message; host.announce(message); }
    function measureDock() {
      if (mounted && typeof elements['answer-dock'].getBoundingClientRect === 'function') {
        elements.questions.style.setProperty('--dock-offset', elements['answer-dock'].getBoundingClientRect().height + 24 + 'px');
      }
    }
    function paint() {
      const current = active(), rows = cards(), graded = rows.every(card => card.graded), count = rows.filter(card => selected(card).length).length;
      elements['active-label'].textContent = '문제 ' + (group().ids.indexOf(current.question.id) + 1) + '에 넣을 표현';
      elements.questions.querySelectorAll('.bundle-question').forEach(row => {
        const card = session().cards[Number(row.dataset.prepBundlesIndex)], values = selected(card);
        row.classList.toggle('active', card === current);
        const chosen = row.querySelector('.chosen-values'); chosen.textContent = values.map(index => card.stages[0].data.options[index]).join(' / ') || '—';
        chosen.classList.toggle('empty', !values.length);
      });
      elements['shared-options'].querySelectorAll('.option').forEach(label => {
        const input = label.querySelector('input'), index = Number(input.value), chosen = selected(current).includes(index), right = current.stages[0].data.answers.includes(index);
        input.checked = chosen; input.disabled = graded;
        label.classList.toggle('selected', chosen); label.classList.toggle('locked', graded);
        label.classList.toggle('correct', graded && right); label.classList.toggle('incorrect', graded && chosen && !right);
      });
      elements.grade.hidden = graded; elements.grade.disabled = count !== rows.length;
      elements.next.hidden = !graded; elements.retry.hidden = !graded;
      elements.previous.disabled = groupIndex() === 0;
      elements.next.textContent = groupIndex() === session().prepBundles.groups.length - 1 ? '결과 보기' : '다음 세트 →';
      elements.summary.textContent = graded ? rows.filter(correct).length + ' / ' + rows.length + '문제 정답' : count + ' / ' + rows.length + '문제 선택';
    }
    function focusCard(card) {
      const row = Array.from(elements.questions.children).find(item => item.dataset.prepBundlesCard === card.question.id);
      if (!row) return;
      row.querySelector('.bundle-prompt').focus({ preventScroll: true });
      row.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
    function markActive(index, focus) {
      if (!canAct() || !session().cards[index] || !group().ids.includes(session().cards[index].question.id)) return;
      if (session().index !== index) { session().index = index; host.save(); }
      paint(); if (focus) focusCard(active());
    }
    function choose(index, value) {
      if (!canAct() || active().graded || !Number.isInteger(index) || index < 0 || index >= group().bank.length) return;
      const card = active(), values = selected(card).filter(choice => choice !== index);
      if (value === undefined ? !selected(card).includes(index) : value) values.push(index);
      card.stages[0].selected = values.length ? values.sort((a, b) => a - b) : null;
      card.deferred = false; host.save(); paint();
    }
    function presentation(card) {
      const data = card.stages[0].data, content = { instruction: INSTRUCTION, prompt: data.prompt, context: data.context || '' };
      return win.PowerVocaQuestionView && typeof win.PowerVocaQuestionView.present === 'function' ? win.PowerVocaQuestionView.present(card.question, 0, content) : content;
    }
    function render(focus) {
      if (groupIndex() < 0) return;
      mount();
      const currentGroup = group(), rows = cards(), graded = rows.every(card => card.graded);
      elements.word.textContent = currentGroup.word;
      elements.progress.textContent = '세트 ' + (groupIndex() + 1) + ' / ' + session().prepBundles.groups.length + ' · ' + rows.length + '문제';
      elements.questions.replaceChildren();
      rows.forEach((card, position) => {
        const index = session().cards.indexOf(card), content = presentation(card), row = node('article', 'bundle-question');
        row.dataset.prepBundlesCard = card.question.id; row.dataset.prepBundlesIndex = String(index);
        row.addEventListener('click', () => markActive(index, false)); row.addEventListener('focusin', () => markActive(index, false));
        const heading = node('div', 'bundle-question-heading'), marks = node('div', 'question-mark');
        heading.append(node('p', 'eyebrow', '문제 ' + (position + 1)));
        if (graded) marks.append(node('span', 'question-result' + (correct(card) ? '' : ' incorrect'), correct(card) ? '정답' : '오답'));
        const bookmark = typeof host.bookmarkButton === 'function' && host.bookmarkButton(card.question);
        if (bookmark) {
          bookmark.addEventListener('click', () => markActive(index, false)); bookmark.addEventListener('focus', () => markActive(index, false)); marks.append(bookmark);
        }
        heading.append(marks); row.append(heading);
        const prompt = node('h2', 'bundle-prompt', content.prompt); prompt.tabIndex = -1; row.append(prompt);
        if (content.context) row.append(node('p', 'bundle-context', content.context));
        const chosen = node('p', 'chosen-values'); chosen.setAttribute('aria-label', '선택한 답'); row.append(chosen);
        if (graded) {
          const feedback = node('div', 'bundle-feedback'), data = card.stages[0].data, answer = data.answers.map(index => data.options[index]).join(' / ');
          feedback.append(node('p', 'bundle-answer', content.prompt.replace(/_{2,}/g, answer)), node('p', 'bundle-note', String(data.explanation || '').split('여기서는')[0].trim())); row.append(feedback);
        }
        elements.questions.append(row);
      });
      const bank = elements['shared-options']; bank.replaceChildren(node('legend', 'sr-only', '공통 보기'));
      currentGroup.bank.forEach((word, index) => {
        const label = node('label', 'option'), input = node('input'); input.type = 'checkbox'; input.value = String(index);
        input.dataset.prepBundlesOption = String(index); input.setAttribute('aria-label', (index + 1) + '. ' + word);
        input.addEventListener('change', () => choose(index, input.checked));
        label.append(input, node('span', 'option-letter', String(index + 1)), node('span', 'option-text', word)); bank.append(label);
      });
      paint(); host.showView('prep-bundles'); measureDock(); if (focus) focusCard(active());
    }
    function grade() {
      if (!canAct()) return;
      const rows = cards(); if (rows.some(card => card.graded)) return;
      const missing = rows.find(card => !selected(card).length);
      if (missing) {
        markActive(session().cards.indexOf(missing), true); announce('아직 선택하지 않은 문제를 확인해 주세요.'); return;
      }
      rows.forEach(card => { card.graded = true; card.deferred = false; });
      rows.forEach(card => host.record(card));
      session().index = session().cards.indexOf(rows[0]); host.save(); render(true);
    }
    function openCard(index) {
      if (!session() || !session().prepBundles || !Number.isInteger(index) || !session().cards[index]) return;
      session().index = index; host.save(); render(true);
    }
    function previous() {
      if (!canAct() || groupIndex() <= 0) return;
      const previous = session().prepBundles.groups[groupIndex() - 1];
      openCard(session().cards.findIndex(card => card.question.id === previous.ids[0]));
    }
    function next() {
      if (!canAct() || !cards().every(card => card.graded)) return;
      const index = groupIndex() + 1;
      if (index >= session().prepBundles.groups.length) { host.showResults(); return; }
      const id = session().prepBundles.groups[index].ids[0];
      openCard(session().cards.findIndex(card => card.question.id === id));
    }
    function retry() {
      if (!canAct() || !cards().every(card => card.graded)) return;
      const rows = cards();
      rows.forEach(card => { card.graded = false; card.deferred = false; card.stageIndex = 0; card.stages[0].selected = null; });
      session().index = session().cards.indexOf(rows[0]); host.save(); render(true);
    }
    function keyboard(event) {
      if (!canAct() || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.isComposing || composing ||
          event.keyCode === 229 || event.shiftKey && event.key !== 'Enter' ||
          Array.from(doc.querySelectorAll('dialog[open], [role="dialog"][aria-modal="true"]')).some(dialog => !dialog.hidden && !dialog.closest('[hidden]'))) return;
      const target = event.target, field = target && target.closest && target.closest('input,textarea,select,[contenteditable],[role="textbox"]');
      if (field && !(field.type === 'checkbox' && elements['shared-options'].contains(field))) return;
      if (!/^[0-8]$/.test(event.key) && event.key !== 'Enter') return;
      if (event.repeat) { event.preventDefault(); return; }
      const control = target && target.closest && target.closest('button,a,summary');
      if (control && event.key === 'Enter' && !event.shiftKey && !control.dataset.bookmarkKey) return;
      if (control && !root.contains(control) && event.key !== '0') return;
      event.preventDefault();
      if (event.key === '0') { if (typeof host.toggleBookmark === 'function') host.toggleBookmark(active().question); return; }
      if (event.key !== 'Enter') { choose(Number(event.key) - 1); return; }
      const ids = group().ids, position = ids.indexOf(active().question.id);
      if (event.shiftKey) {
        if (position > 0) markActive(session().cards.findIndex(card => card.question.id === ids[position - 1]), true);
        else if (groupIndex() > 0) {
          const previous = session().prepBundles.groups[groupIndex() - 1].ids;
          openCard(session().cards.findIndex(card => card.question.id === previous[previous.length - 1]));
        }
      } else if (cards().every(card => card.graded)) next();
      else if (position < ids.length - 1) markActive(session().cards.findIndex(card => card.question.id === ids[position + 1]), true);
      else grade();
    }
    return { mount, render, openCard };
  }
  return { groups, metadata, validMetadata, stage, createController };
});
