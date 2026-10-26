(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.PowerVocaVerbFormsReview = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const FORMS = ['1V', '2V', '3V', '4V', '5V'];
  const NORMAL = 'semantic1-grammar-forms-core-';
  const SORTING = 'semantic1-sorting-verb-forms-';
  const COMPAT_NOTE = '수정 전에 시작한 풀이의 선택은 유지했어요. 기존 정답을 모두 포함하고 새로 확인된 형식만 더한 선택도 이번 풀이에서는 정답으로 인정해요.';
  const copy = value => JSON.parse(JSON.stringify(value));
  const text = value => typeof value === 'string' && value.trim().length > 0;
  const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
  function check(condition, message) { if (!condition) throw new Error('Verb forms review: ' + message); }
  function freeze(value) {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      Object.keys(value).forEach(key => freeze(value[key])); Object.freeze(value);
    }
    return value;
  }
  function word(value) {
    check(text(value), 'word is required');
    const normalized = value.trim().toLowerCase();
    check(/^[a-z]+(?:[ -][a-z]+)*$/.test(normalized), 'invalid word ' + normalized);
    return normalized;
  }
  function slug(value) { return word(value).replace(/ /g, '-'); }
  function id(value) {
    check(/^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,119}$/.test(value), 'invalid question ID'); return value;
  }
  function forms(value, label) {
    check(Array.isArray(value) && value.length > 0 && value.length <= FORMS.length &&
      new Set(value).size === value.length && value.every(form => FORMS.includes(form)), 'invalid ' + label);
    return FORMS.filter(form => value.includes(form));
  }
  const equal = (left, right) => JSON.stringify(left) === JSON.stringify(right);
  function rowsFrom(facts) {
    check(facts && text(facts.version) && Array.isArray(facts.rows) && facts.rows.length > 0, 'review facts are required');
    const rows = new Map(), slugs = new Set();
    facts.rows.forEach(raw => {
      check(raw && typeof raw === 'object', 'invalid fact row');
      const name = word(raw.word), key = slug(name);
      check(!rows.has(name) && !slugs.has(key), 'duplicate reviewed word ' + name);
      const recommended = forms(raw.recommendedForms || raw.forms, 'recommended forms for ' + name);
      check(Array.isArray(raw.usages) && raw.usages.length > 0 && raw.usages.length <= 11, 'invalid usage count for ' + name);
      const used = new Set();
      const usages = raw.usages.map(usage => {
        check(usage && FORMS.includes(usage.form) && !used.has(usage.form), 'duplicate or invalid usage form for ' + name);
        used.add(usage.form);
        check(text(usage.pattern) && text(usage.meaning) && text(usage.example) && !/[가-힣]/.test(usage.example), 'invalid usage text for ' + name);
        check(Array.isArray(usage.options) && usage.options.length === 4 && usage.options.every(text) &&
          new Set(usage.options).size === usage.options.length && Number.isInteger(usage.answer) && usage.answer >= 0 && usage.answer < usage.options.length &&
          usage.options[usage.answer] === usage.meaning, 'invalid meaning choices for ' + name);
        check(Array.isArray(usage.sourceUrls) && usage.sourceUrls.length > 0 && new Set(usage.sourceUrls).size === usage.sourceUrls.length &&
          usage.sourceUrls.every(url => typeof url === 'string' && /^https:\/\/[^\s/]+\/\S*$/.test(url)), 'invalid source URLs for ' + name);
        return copy(usage);
      }).sort((a, b) => FORMS.indexOf(a.form) - FORMS.indexOf(b.form));
      check(equal(usages.map(usage => usage.form), recommended), 'forms and usages disagree for ' + name);
      rows.set(name, { word: name, slug: key, forms: recommended, usages }); slugs.add(key);
    });
    return rows;
  }
  function sourceForms(stage) {
    check(stage && stage.multiple === true && Array.isArray(stage.options) && stage.options.length === 5 &&
      stage.options.every(option => FORMS.includes(option)) && new Set(stage.options).size === 5 &&
      Array.isArray(stage.answers) && stage.answers.length > 0 && new Set(stage.answers).size === stage.answers.length &&
      stage.answers.every(index => Number.isInteger(index) && index >= 0 && index < stage.options.length), 'invalid original classification stage');
    return forms(stage.answers.map(index => stage.options[index]), 'original classification answers');
  }
  function answerIndices(row, options) {
    check(row.forms.every(form => options.includes(form)), 'classification is missing a form option');
    return options.map((option, index) => row.forms.includes(option) ? index : -1).filter(index => index >= 0);
  }
  function acceptedSets(oldAnswers, newAnswers) {
    const old = oldAnswers.slice().sort((a, b) => a - b), revised = newAnswers.slice().sort((a, b) => a - b);
    const alternatives = [revised], seen = new Set([JSON.stringify(revised)]);
    // Only additive corrections receive grandfather credit. Removed answers
    // cannot be made valid by retaining an outdated selection.
    if (old.every(index => revised.includes(index))) {
      const additions = revised.filter(index => !old.includes(index));
      for (let mask = 0; mask < 2 ** additions.length; mask++) {
        const picked = old.concat(additions.filter((_, index) => mask & (1 << index))).sort((a, b) => a - b), key = JSON.stringify(picked);
        if (!seen.has(key)) { alternatives.push(picked); seen.add(key); }
      }
    }
    return alternatives.sort((a, b) => a.length - b.length || JSON.stringify(a).localeCompare(JSON.stringify(b)));
  }
  function usageExplanation(row, usage) {
    return row.word + ': (' + usage.form + ') ' + usage.pattern + ' — ' + usage.meaning + '\n예문: ' + usage.example;
  }
  function summary(row) { return row.usages.map(usage => '(' + usage.form + ') ' + usage.pattern + ': ' + usage.meaning).join('\n'); }
  function classification(old, row, compat) {
    const stage = copy(old), revised = answerIndices(row, stage.options);
    stage.answers = revised; delete stage.answer;
    stage.instruction = '자주 쓰는 동사 형식을 모두 고르세요.'; stage.prompt = row.word; stage.context = '';
    stage.explanation = summary(row) + (compat ? '\n' + COMPAT_NOTE : '');
    stage.optionReasons = stage.options.map(form => row.forms.includes(form) ? form + ': ' + row.usages.find(usage => usage.form === form).pattern + ' — ' + row.usages.find(usage => usage.form === form).meaning : form + '는 이 카드에서 확인하는 핵심 형식에 해당하지 않아요.');
    stage.sourceUrls = Array.from(new Set(row.usages.flatMap(usage => usage.sourceUrls)));
    if (compat) { stage.acceptedAnswerSets = acceptedSets(old.answers, revised); stage.compatibilityNote = COMPAT_NOTE; }
    else { delete stage.acceptedAnswerSets; delete stage.compatibilityNote; }
    return stage;
  }
  function meaningStage(row, usage) {
    return { kind: 'meaning', instruction: usage.form + ' 쓰임의 핵심 뜻을 고르세요.', prompt: row.word + ' · ' + usage.form,
      context: usage.example, options: usage.options.slice(), answer: usage.answer, fixedOrder: false,
      explanation: usageExplanation(row, usage), sourceUrls: usage.sourceUrls.slice(),
      optionReasons: usage.options.map((option, index) => index === usage.answer ? '정답: ' + usage.meaning + '. ' + usage.pattern : '이 문형의 핵심 뜻은 「' + usage.meaning + '」예요.') };
  }
  function normalRevision(old, row, version, compat) {
    const question = copy(old), origin = 'forms2-' + (compat ? 'compat-' : 'core-') + row.slug;
    question.id = id('semantic1-grammar-' + origin); question.grammarOriginId = origin;
    question.grammarPool = 'forms'; question.reviewVersion = version;
    question.grammarSummary = row.usages.map(usage => ({ structure: '(' + usage.form + ') ' + usage.pattern, meaning: usage.meaning }));
    question.answerSummary = { expression: row.word, meaning: row.usages.map(usage => '(' + usage.form + ') ' + usage.meaning).join(' / ') };
    question.learningPoint = summary(row) + (compat ? '\n' + COMPAT_NOTE : '');
    question.stages = [classification(old.stages[0], row, compat)].concat(compat ? copy(old.stages.slice(1)) : row.usages.map(usage => meaningStage(row, usage)));
    check(question.stages.length <= 12, 'too many revised normal stages');
    delete question.historyKey;
    if (compat) question.compatibilityNote = COMPAT_NOTE;
    return freeze(question);
  }
  function tableRevision(old, row, version, bins, compat) {
    const card = copy(old); card.id = 'forms2-' + (compat ? 'compat-' : '') + row.slug;
    card.text = row.word; card.correctBins = row.forms.slice(); card.reviewVersion = version;
    card.note = summary(row) + (compat ? '\n' + COMPAT_NOTE : '');
    card.examples = row.usages.map(usage => usage.example);
    card.sourceUrls = Array.from(new Set(row.usages.flatMap(usage => usage.sourceUrls)));
    if (compat) {
      card.steps = copy(old.steps);
      card.acceptedAnswerSets = acceptedSets(bins.map((bin, index) => old.correctBins.includes(bin.id) ? index : -1).filter(index => index >= 0),
        bins.map((bin, index) => row.forms.includes(bin.id) ? index : -1).filter(index => index >= 0));
      card.compatibilityNote = COMPAT_NOTE;
    } else {
      card.steps = row.usages.map(usage => ({ id: row.slug + '-' + usage.form, label: usage.form, prompt: '다음 문장 속 동사의 핵심 뜻을 고르세요.',
        expression: usage.example, options: usage.options.slice(), answer: usage.answer, sourceUrls: usage.sourceUrls.slice() }));
      delete card.acceptedAnswerSets; delete card.compatibilityNote;
    }
    check(card.steps.length + 1 <= 12, 'too many revised sorting stages');
    return freeze(card);
  }
  function create(options) {
    options = options || {};
    check(Array.isArray(options.normalQuestions), 'normal questions are required');
    check(options.sortingData && Array.isArray(options.sortingData.groups), 'sorting groups are required');
    const rows = rowsFrom(options.facts), version = options.facts.version;
    const normalQuestions = [], assignments = Object.create(null), retired = new Set(), replacements = Object.create(null), migration = new Map();
    const sortingData = copy(options.sortingData), allIds = new Set(), normalWords = new Set(), sortingWords = new Set(), changes = [];
    options.normalQuestions.forEach(question => {
      check(question && text(question.id) && !allIds.has(question.id), 'duplicate original question ID'); allIds.add(question.id);
    });
    function register(oldId, freshId, compatId, row, source) {
      check(!allIds.has(freshId) && !allIds.has(compatId), 'duplicate revised question ID'); allIds.add(freshId); allIds.add(compatId);
      retired.add(oldId); retired.add(compatId); replacements[oldId] = freshId; replacements[compatId] = freshId; migration.set(oldId, compatId);
      changes.push({ word: row.word, source, oldId, freshId, compatId, forms: row.forms.slice() });
    }
    options.normalQuestions.filter(question => question.id.startsWith(NORMAL)).forEach(old => {
      const name = word(old.displayExpression); check(!normalWords.has(name), 'duplicate normal source word ' + name); normalWords.add(name);
      check(Array.isArray(old.stages) && old.stages.length > 0 && old.stages.length <= 12, 'invalid original normal stages');
      const before = sourceForms(old.stages[0]), row = rows.get(name);
      if (!row || equal(before, row.forms)) return;
      const fresh = normalRevision(old, row, version, false), compat = normalRevision(old, row, version, true);
      register(old.id, fresh.id, compat.id, row, 'normal'); normalQuestions.push(fresh, compat);
      assignments[fresh.id] = { group: 'grammar-structures', scope: 'grammar-forms' };
      assignments[compat.id] = { group: 'grammar-structures', scope: 'grammar-forms' };
    });
    const topics = new Set();
    sortingData.groups.forEach(group => {
      check(group && text(group.id) && !topics.has(group.id) && Array.isArray(group.cards), 'duplicate or invalid sorting topic'); topics.add(group.id);
      const cardIds = new Set();
      group.cards.forEach(card => { check(card && text(card.id) && !cardIds.has(card.id), 'duplicate sorting source card ID'); cardIds.add(card.id); });
      if (group.id !== 'verb-forms') return;
      check(Array.isArray(group.bins) && group.bins.length === 5 && equal(forms(group.bins.map(bin => bin.id), 'sorting bins'), FORMS), 'invalid sorting form bins');
      const revisions = [];
      group.cards.forEach(old => {
        const name = word(old.text); check(!sortingWords.has(name), 'duplicate sorting source word ' + name); sortingWords.add(name);
        const before = forms(old.correctBins, 'original sorting answers'), row = rows.get(name);
        if (!row || equal(before, row.forms)) return;
        check(Array.isArray(old.steps) && old.steps.length + 1 <= 12, 'invalid original sorting stages');
        const fresh = tableRevision(old, row, version, group.bins, false), compat = tableRevision(old, row, version, group.bins, true);
        check(!cardIds.has(fresh.id) && !cardIds.has(compat.id), 'duplicate revised source card ID'); cardIds.add(fresh.id); cardIds.add(compat.id);
        register(SORTING + old.id, id(SORTING + fresh.id), id(SORTING + compat.id), row, 'sorting'); revisions.push(fresh, compat);
      });
      group.cards.push(...revisions);
    });
    check(topics.has('verb-forms'), 'verb-forms sorting topic is required');
    sortingData.reviewVersion = version;
    function migrateSession(session, questionMap) {
      if (!session || !Array.isArray(session.cards)) return session;
      const changed = new Map(), existing = new Set(session.cards.map(card => card.question && card.question.id));
      const cards = session.cards.map(card => {
        const oldId = card.question && card.question.id, compatId = migration.get(oldId);
        if (!compatId || card.graded) return card;
        check(!existing.has(compatId), 'migration would duplicate a card');
        const question = questionMap && typeof questionMap.get === 'function' ? questionMap.get(compatId) : questionMap && own(questionMap, compatId) ? questionMap[compatId] : null;
        check(question && question.id === compatId && Array.isArray(question.stages) && question.stages.length === card.stages.length, 'compatibility question is unavailable');
        const stages = card.stages.map((stage, index) => {
          const data = question.stages[index];
          check(stage && stage.data && Array.isArray(stage.choices) && equal(stage.data.options, data.options), 'compatibility choices changed');
          return Object.assign({}, stage, { data, selected: Array.isArray(stage.selected) ? stage.selected.slice() : stage.selected,
            choices: stage.choices.map(choice => Object.assign({}, choice, { text: data.options[choice.originalIndex] })) });
        });
        changed.set(oldId, compatId); return Object.assign({}, card, { question, stages });
      });
      if (!changed.size) return session;
      const result = Object.assign({}, session, { cards });
      if (session.sorting) {
        const meta = copy(session.sorting), checked = Object.create(null);
        Object.keys(meta.checked).forEach(oldId => {
          const nextId = changed.get(oldId) || oldId; check(!own(checked, nextId), 'migration would duplicate checked stages'); checked[nextId] = meta.checked[oldId].slice();
        });
        meta.checked = checked; meta.active = changed.get(meta.active) || meta.active; result.sorting = meta;
      }
      return result;
    }
    const report = { version, auditedWords: rows.size, normalWords: normalWords.size, sortingWords: sortingWords.size,
      normalChanged: changes.filter(change => change.source === 'normal').length,
      sortingChanged: changes.filter(change => change.source === 'sorting').length, changes };
    return { normalQuestions: freeze(normalQuestions), sortingData: freeze(sortingData), assignments: freeze(assignments), retired, replacements: freeze(replacements), migrateSession, report: freeze(report) };
  }
  return { create };
});
