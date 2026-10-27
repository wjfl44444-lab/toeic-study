(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) { module.exports = api; }
  if (root) { root.PowerVocaWrongReview = api; }
}(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";
  var own = function (value, key) { return Object.prototype.hasOwnProperty.call(value, key); };
  function threshold(value) {
    var n = Number(value);
    return Number.isSafeInteger(n) && n >= 1 ? Math.min(n, 999999999) : 1;
  }
  // A read-only projection of the existing history. Replacements affect which
  // question is offered next; original IDs, revisions and counters stay intact.
  function create(options) {
    options = options || {};
    var catalog = new Map(), links = new Map(), active = new Set();
    (options.questions || []).forEach(function (q) {
      if (!q || typeof q.id !== "string") { return; }
      catalog.set(q.id, q);
      if (!options.isActive || options.isActive(q)) { active.add(q.id); }
      if (q.routeRoot) { links.set(q.id, q.routeRoot); }
    });
    (options.replacements || []).forEach(function (map) {
      if (!map || typeof map !== "object") { return; }
      Object.keys(map).forEach(function (id) {
        if (typeof map[id] === "string" && map[id]) { links.set(id, map[id]); }
      });
    });
    var grammar = options.grammar;
    if (grammar && Array.isArray(grammar.legacyCards) && grammar.mapByLegacyId) {
      grammar.legacyCards.forEach(function (card) {
        var q = own(grammar.mapByLegacyId, card.id) && grammar.mapByLegacyId[card.id];
        if (!q) { return; }
        (card.sourceIds || []).forEach(function (id) {
          // A later review may already map the source card to a more precise
          // active edition. Grammar aliases only fill gaps in those chains.
          if (!links.has(id)) { links.set(id, q.id); }
        });
      });
    }
    function resolve(id) {
      var visited = new Set();
      while (typeof id === "string" && !visited.has(id)) {
        visited.add(id);
        if (links.has(id)) { id = links.get(id); continue; }
        var q = catalog.get(id);
        return q && active.has(id) ? q : null;
      }
      return null;
    }
    function aggregate(history, archivedHistory) {
      var revisions = new Map(), totals = new Map(), unavailable = 0;
      function add(id, record) {
        if (typeof id !== "string" || !record || typeof record.signature !== "string" ||
            !Number.isSafeInteger(record.attempts) || !Number.isSafeInteger(record.correct) ||
            record.attempts < 0 || record.correct < 0 || record.correct > record.attempts) { return; }
        var identity = id + "\t" + record.signature, wrong = record.attempts - record.correct;
        // Duplicate snapshots are one revision, not extra attempts. Wrong
        // counters are cumulative, so a stale duplicate cannot erase mistakes.
        var previous = revisions.get(identity);
        if (!previous || wrong > previous.wrong) { revisions.set(identity, { id: id, wrong: wrong }); }
      }
      if (history && typeof history === "object" && !Array.isArray(history)) {
        Object.keys(history).forEach(function (id) { add(id, history[id]); });
      }
      (Array.isArray(archivedHistory) ? archivedHistory : []).forEach(function (record) {
        if (record) { add(record.id, record); }
      });
      revisions.forEach(function (revision) {
        if (!revision.wrong) { return; }
        var q = resolve(revision.id);
        if (!q) { unavailable += revision.wrong; return; }
        var entry = totals.get(q.id);
        if (!entry) {
          var label = typeof options.label === "function" ? options.label(q) : q.displayExpression || q.answerSummary && q.answerSummary.expression;
          entry = { id: q.id, question: q, expression: typeof label === "string" && label.trim() ? label : q.id, wrongCount: 0 };
          totals.set(q.id, entry);
        }
        entry.wrongCount += revision.wrong;
      });
      var entries = Array.from(totals.values()).sort(function (a, b) {
        return b.wrongCount - a.wrongCount || a.expression.localeCompare(b.expression, "ko") || a.id.localeCompare(b.id);
      });
      return { entries: entries, byId: totals, unavailableWrongCount: unavailable };
    }
    return { resolve: resolve, aggregate: aggregate };
  }
  return { create: create, threshold: threshold };
}));
