(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.PowerVocaSortingReview = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const VERSION = '20261026-sorting2';
  const copy = value => JSON.parse(JSON.stringify(value));
  const idFor = (topic, card) => 'semantic1-sorting-' + topic + '-' + card;
  function check(value, message) { if (!value) throw new Error('Sorting review: ' + message); }
  function create(options) {
    check(options && options.sortingData && Array.isArray(options.sortingData.groups), 'source groups required');
    check(options.optionsReview && typeof options.optionsReview.apply === 'function', 'meaning review required');
    const facts = options.classifications;
    check(facts && Array.isArray(facts.links) && Array.isArray(facts.linkBins) && facts.quantityGroup, 'classification review required');
    const retiredBefore = options.retired || new Set();
    const data = copy(options.sortingData);
    const active = copy(data.groups).map(group => Object.assign(group, {
      cards: group.cards.filter(card => !retiredBefore.has(idFor(group.id, card.id)))
    }));
    const reviewed = options.optionsReview.apply(active);
    check(Array.isArray(reviewed) && reviewed.length === active.length, 'review changed topic count');
    const linkRows = new Map(facts.links.map(row => [row.id, row]));
    check(linkRows.size === facts.links.length, 'duplicate link fact');
    const retired = new Set(), replacements = Object.create(null), changes = [];
    data.groups.forEach(group => {
      if (group.id === 'link-usage') group.displayTitle = '연결 표현의 품사·용법';
      const before = active.find(item => item.id === group.id);
      const after = reviewed.find(item => item.id === group.id);
      check(before && after && before.cards.length === after.cards.length, 'review changed source count');
      const byCard = new Map(after.cards.map(card => [card.id, card]));
      before.cards.forEach(old => {
        const next = copy(byCard.get(old.id));
        check(next && JSON.stringify(next.correctBins) === JSON.stringify(old.correctBins), 'meaning review changed classification');
        check(next.steps.length === old.steps.length && next.steps.every((step, i) =>
          step.id === old.steps[i].id && step.options[step.answer] === old.steps[i].options[old.steps[i].answer]), 'meaning review changed correct meaning');
        if (group.id === 'link-usage') {
          const row = linkRows.get(old.id); check(row, 'missing link review ' + old.id);
          next.bins = copy(facts.linkBins);
          next.correctBins = row.correctBins.slice();
          next.classificationInstruction = '가능한 연결 용법을 모두 고르세요.';
          if (row.note) next.note = row.note;
          if (row.sourceUrls) next.sourceUrls = row.sourceUrls.slice();
          if (row.stepLabels) next.steps.forEach(step => { if (row.stepLabels[step.id]) step.label = row.stepLabels[step.id]; });
        }
        if (JSON.stringify(old) === JSON.stringify(next)) return;
        const oldId = idFor(group.id, old.id);
        next.id = 'q2-' + old.id;
        const newId = idFor(group.id, next.id);
        check(newId.length <= 120 && !group.cards.some(card => card.id === next.id), 'invalid reviewed ID');
        next.reviewVersion = VERSION;
        group.cards.push(next); retired.add(oldId); replacements[oldId] = newId;
        changes.push({ topic: group.id, oldId, newId, meaningSteps: next.steps.length });
      });
    });
    check(!data.groups.some(group => group.id === facts.quantityGroup.id), 'duplicate quantity group');
    data.groups.push(copy(facts.quantityGroup)); data.reviewVersion = VERSION;
    if (options.previousSorting) {
      const previous = create(Object.assign({}, options, {
        sortingData: options.previousSorting.sortingData, retired: options.previousSorting.retired, previousSorting: null
      }));
      previous.report.changes.forEach(change => {
        const group = data.groups.find(item => item.id === change.topic);
        const oldGroup = previous.sortingData.groups.find(item => item.id === change.topic);
        const old = oldGroup.cards.find(card => idFor(change.topic, card.id) === change.newId);
        if (group.cards.some(card => card.id === old.id)) return;
        // Retain published choice snapshots for saved rounds; fresh rounds use
        // the current verb edition, including its reviewed meaning choices.
        group.cards.push(copy(old)); retired.add(change.newId);
        const current = options.verbReplacements && options.verbReplacements[change.oldId] || change.oldId;
        replacements[change.newId] = replacements[current] || current;
      });
    }
    return { sortingData: data, retired, replacements,
      report: { version: VERSION, changes, revisedCards: changes.length, quantityCards: facts.quantityGroup.cards.length,
        activeCounts: active.map(group => ({ topic: group.id, count: group.cards.length })).concat([{ topic: facts.quantityGroup.id, count: facts.quantityGroup.cards.length }]) } };
  }
  return { create, VERSION };
});
