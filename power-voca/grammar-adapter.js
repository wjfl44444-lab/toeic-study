(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.PowerGrammarAdapter = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const VERSION = '20261025-grammar1';
  const PREFIX = 'semantic1-grammar-';
  const definitions = [
    ['forms', '동사 형식 구별'],
    ['connections', '단어 뒤 연결'],
    ['prepositions', '전치사·구동사'],
    ['patterns', '표현별 어순·고정 문형']
  ];
  const pools = new Map(definitions);
  const copy = value => JSON.parse(JSON.stringify(value));
  const text = value => typeof value === 'string' && value.trim().length > 0;

  // These IDs are independent from the legacy corpus. Neither source objects nor
  // their historical fingerprints are annotated or reinterpreted by this adapter.
  function idFor(legacyId) {
    const id = PREFIX + legacyId;
    if (typeof legacyId !== 'string' || !legacyId ||
        !/^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,119}$/.test(id)) {
      throw new Error('Invalid grammar question ID');
    }
    return id;
  }

  function create(cards, presenter) {
    const present = typeof presenter === 'function' ? presenter : presenter && presenter.questionContent;
    if (!Array.isArray(cards) || !cards.length || typeof present !== 'function') {
      throw new Error('Grammar cards and question presenter are required');
    }
    const questions = [], assignments = Object.create(null), mapByLegacyId = Object.create(null);
    cards.forEach(card => {
      if (!card || !pools.has(card.pool) || !text(card.target) ||
          !Array.isArray(card.stages) || !card.stages.length || card.stages.length > 12 ||
          !Array.isArray(card.summary) || !card.summary.length ||
          !card.summary.every(row => row && text(row.structure) && text(row.meaning)) ||
          !Array.isArray(card.sources) || !card.sources.length) {
        throw new Error('Invalid grammar card');
      }
      const id = idFor(card.id);
      if (mapByLegacyId[card.id]) throw new Error('Duplicate grammar card ID');
      const summary = copy(card.summary);
      const question = {
        id, format: 'semantic-set1', stageMode: 'set', firstAnswerGate: true,
        grammarOriginId: card.id, grammarPool: card.pool, grammarSummary: summary,
        displayExpression: card.target,
        category: pools.get(card.pool),
        answerSummary: {
          expression: card.target,
          meaning: summary.map(row => row.meaning).filter((value, i, all) => all.indexOf(value) === i).join(' / ')
        },
        learningPoint: card.note || summary.map(row => row.structure + ': ' + row.meaning).join('\n'),
        source: copy(card.sources[0]),
        sources: copy(card.sources),
        stages: card.stages.map(stage => {
          const multiple = stage && stage.mode === 'multi';
          if (!stage || !['single', 'multi'].includes(stage.mode) || !text(stage.prompt) ||
              !Array.isArray(stage.options) || stage.options.length < 4 || stage.options.length > 5 ||
              !stage.options.every(text) || new Set(stage.options).size !== stage.options.length ||
              !Array.isArray(stage.correct) || !stage.correct.length ||
              (!multiple && stage.correct.length !== 1) || stage.correct.length >= stage.options.length ||
              new Set(stage.correct).size !== stage.correct.length ||
              !stage.correct.every(i => Number.isInteger(i) && i >= 0 && i < stage.options.length) ||
              !Array.isArray(stage.reasons) || stage.reasons.length !== stage.options.length ||
              !stage.reasons.every(text) || !text(stage.explanation)) {
            throw new Error('Invalid grammar stage: ' + card.id);
          }
          // Only supplied question cues enter the active question. Targets,
          // summaries, answers and explanations are reserved for final feedback.
          const cue = present(card, stage);
          if (!cue || !text(cue.instruction) || !text(cue.example) ||
              typeof cue.context !== 'string') throw new Error('Invalid grammar cue: ' + card.id);
          const result = {
            kind: stage.kind,
            instruction: cue.instruction,
            prompt: cue.example,
            context: cue.context,
            options: stage.options.slice(),
            fixedOrder: stage.fixedOrder === true,
            explanation: stage.explanation,
            optionReasons: stage.reasons.slice()
          };
          if (multiple) { result.multiple = true; result.answers = stage.correct.slice(); }
          else result.answer = stage.correct[0];
          return result;
        })
      };
      questions.push(question);
      mapByLegacyId[card.id] = question;
      assignments[id] = { group: 'grammar-structures', scope: 'grammar-' + card.pool };
    });
    return {
      version: VERSION, questions, assignments, mapByLegacyId,
      subscopes: definitions.map(([pool, label]) => ({ id: 'grammar-' + pool, label, group: 'grammar-structures' })),
      // Migration reads these originals with the legacy engine's own signature
      // and restore rules. The live controller uses only the native questions.
      legacyCards: cards
    };
  }
  return { VERSION, idFor, create };
});
