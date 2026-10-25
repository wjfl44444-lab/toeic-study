(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PowerFeedbackCore = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  // Presentation only. Neither this model nor its lexicon writes to a question or an answer.
  const pos = { n: '명사', v: '동사', adj: '형용사', adv: '부사', prep: '전치사', modal: '조동사', conj: '접속사' };
  const clean = value => String(value == null ? '' : value).trim()
    .replace(/^뜻은\s*「([\s\S]*)」이다\.?$/, '$1')
    .replace(/\bplural nouns?\b/gi, '복수명사').replace(/\bsingular nouns?\b/gi, '단수명사')
    .replace(/\buncountable nouns?\b/gi, '불가산명사').replace(/\bcountable nouns?\b/gi, '가산명사')
    .replace(/\bnoun phrases?\b/gi, '명사구').replace(/\bclauses?\b/gi, 'S + V')
    .replace(/\badjectives?\b/gi, '형용사').replace(/\badverbs?\b/gi, '부사')
    .replace(/\bnouns?\b/gi, '명사').replace(/\bprepositions?\b/gi, '전치사');
  const unique = values => [...new Set(values.filter(Boolean))];
  const correct = stage => stage.correct || stage.answers || (Number.isInteger(stage.answer) ? [stage.answer] : []);
  const key = (word, meaning) => clean(word).toLowerCase() + '\u0000' + clean(meaning).replace(/\s+/g, ' ');
  const isSynonym = stage => /유사 표현|비슷한 (?:뜻|의미)|(?:뜻|의미)(?:가|이) (?:가장 )?(?:가까운|비슷한)|같은 의미|재표현/.test((stage.instruction || '') + ' ' + (stage.prompt || ''));
  function createLexicon(questions) {
    const index = new Map();
    (questions || []).forEach(q => {
      const summary = q.answerSummary;
      if (!summary) return;
      const values = (q.stages || []).filter(isSynonym).flatMap(s => correct(s).map(i => clean(s.options[i])))
        .filter(value => /[a-z]/i.test(value) && !/[가-힣]/.test(value));
      if (!values.length) return;
      const k = key(summary.expression, summary.meaning);
      index.set(k, unique((index.get(k) || []).concat(values)));
    });
    return index;
  }
  function build(input, lexicon) {
    const q = input.question || {}, stages = input.stages || [];
    const model = { kind: input.grammar ? '문형·구조' : input.scope || '', word: clean(input.word), meaning: clean(input.meaning), rows: [], mistakes: [] };
    const addRow = row => {
      const next = { ...row, label: clean(row.label), meaning: clean(row.meaning) };
      if (!next.label && !next.meaning) return;
      const prior = model.rows.find(r => r.label === next.label && r.meaning === next.meaning);
      if (prior) { prior.missing = prior.missing || next.missing; return; }
      model.rows.push(next);
    };
    const rootPos = stages.find(s => s.kind === 'semantic-pos');
    const structureStage = stages.find(s => (s.options || []).includes('명사구') && (s.options || []).includes('S + V'));
    const represented = new Set();
    if (input.grammar && input.summaryRows && input.summaryRows.length) {
      model.meaning = '';
      input.summaryRows.forEach(row => {
        const label = clean(row.structure).replace(/^(\(\dV\))\s*S\s*\+\s*V\b/, (_, form) => form + ' ' + model.word)
          .replace(/^(\(\dV\))\s*S\s*\+\s*/, '$1 '), form = label.match(/^\((\dV)\)/);
        const first = stages[0];
        const compact = value => clean(value).replace(/\s+/g, '');
        const matched = form && first ? first.options.indexOf(form[1]) : first && first.kind === 'structure' ?
          first.options.findIndex(value => compact(label) === compact(model.word + ' ' + value)) : -1;
        const missing = Number.isInteger(matched) && matched >= 0 && !first.skipped && !first.selected.includes(matched);
        if (missing) represented.add('0:' + matched);
        addRow({ label, meaning: row.meaning, missing: missing ? form ? '빠뜨린 형식' : '빠뜨린 연결' : false });
      });
    } else if (Array.isArray(q.words) && q.words.length > 1) {
      model.meaning = '';
      model.pairs = q.words.map(word => {
        const stage = stages.find(s => s.focusWord === word);
        return { word: clean(word), meaning: stage ? correct(stage).map(i => clean(stage.options[i])).join(' / ') : '' };
      });
    } else if (Array.isArray(q.semanticSenses) && q.semanticSenses.length) {
      model.meaning = '';
      const byPos = new Map();
      q.semanticSenses.forEach(sense => {
        const label = '(' + sense.pos + ')';
        if (!byPos.has(label)) byPos.set(label, []);
        byPos.get(label).push(clean(sense.meaning));
      });
      byPos.forEach((meanings, label) => {
        const p = label.slice(1, -1), i = rootPos ? rootPos.options.indexOf(pos[p]) : -1;
        const missed = rootPos && !rootPos.skipped && i >= 0 && !rootPos.selected.includes(i);
        if (missed) represented.add(stages.indexOf(rootPos) + ':' + i);
        // Separate genuinely different senses; close Korean glosses stay together.
        unique(meanings).forEach(meaning => {
          const s = stages.find(s => s.kind === 'semantic-meanings' && correct(s).some(i => clean(s.options[i]) === meaning));
          const n = s ? s.options.findIndex(v => clean(v) === meaning) : -1;
          const missingMeaning = s && !s.skipped && !s.selected.includes(n);
          if (missingMeaning) represented.add(stages.indexOf(s) + ':' + n);
          addRow({ label, meaning, missing: missed ? '빠뜨린 품사' : missingMeaning ? '빠뜨린 뜻' : false });
        });
      });
    } else if (structureStage) {
      model.word = model.word.split(/\s+\+\s+/)[0];
      correct(structureStage).forEach(i => {
        const value = clean(structureStage.options[i]);
        const label = value === '단독 부사' ? model.word + ' · 단독 부사' : value === '대등 연결' ? 'A ' + model.word + ' B' : model.word + ' + ' + value;
        const missing = !structureStage.skipped && !structureStage.selected.includes(i);
        if (missing) represented.add(stages.indexOf(structureStage) + ':' + i);
        addRow({ label, missing: missing ? '빠뜨린 연결' : false });
      });
    } else {
      // Keep correct forms verbatim. Do not infer a rule from a generated explanation.
      stages.forEach(s => {
        if (isSynonym(s)) return;
        correct(s).forEach(i => {
          const value = clean(s.options[i]);
          if (/[a-z]/i.test(value) && !/[가-힣]/.test(value) && !model.word.toLowerCase().includes(value.toLowerCase())) addRow({ label: value });
        });
      });
    }
    const ownSynonyms = stages.filter(isSynonym).flatMap(s => correct(s).map(i => clean(s.options[i])))
      .filter(value => /[a-z]/i.test(value) && !/[가-힣]/.test(value));
    const pooled = lexicon && lexicon.get(key(input.word, input.meaning)) || [];
    const synonyms = unique(ownSynonyms.concat(pooled)).filter(value => value !== model.word);
    if (synonyms.length) model.synonyms = synonyms;
    if (!input.passed) stages.forEach((stage, stageIndex) => {
      if (stage.skipped) return;
      const answers = correct(stage), selected = stage.selected || [];
      selected.filter(i => !answers.includes(i)).forEach(i => {
        const value = clean(stage.options[i]), reason = String((stage.reasons || stage.optionReasons || [])[i] || '');
        const prefix = value + ':';
        const gloss = reason.startsWith(prefix) ? reason.slice(prefix.length).split(/[.。\n]/)[0].trim() : '';
        model.mistakes.push({ label: stage.focusWord ? stage.focusWord + ' · 내 선택' : stage.kind === 'semantic-pos' ? '선택한 품사' : '내 선택', value,
          meaning: /[가-힣]/.test(gloss) && !/정답|교재|구별|이 문제|써요|아니/.test(gloss) ? clean(gloss) : '' });
      });
      if (answers.length > 1) answers.filter(i => !selected.includes(i) && !represented.has(stageIndex + ':' + i)).forEach(i => {
        model.mistakes.push({ label: stage.kind === 'semantic-pos' ? '빠뜨린 품사' : stage.kind === 'structure' || stage === structureStage ? '빠뜨린 연결' : '빠뜨린 뜻', value: clean(stage.options[i]) });
      });
    });
    model.mistakes = model.mistakes.filter((item, index, list) => list.findIndex(other => other.label === item.label && other.value === item.value) === index);
    return model;
  }
  return { build, createLexicon, clean };
});
