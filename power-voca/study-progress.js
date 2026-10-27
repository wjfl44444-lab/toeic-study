(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) { module.exports = api; }
  if (root) { root.PowerVocaStudyProgress = api; }
}(typeof window !== "undefined" ? window : null, function () {
  "use strict";
  var LIMIT = 999999999, MAX_RECORDS = 10000, MAX_SCOPES = 256;
  var own = function (value, name) { return Object.prototype.hasOwnProperty.call(value, name); };
  function object(value) { return value && typeof value === "object" && !Array.isArray(value); }
  function safeName(value) { return !["__proto__", "constructor", "prototype"].includes(value); }
  function id(value) { return typeof value === "string" && /^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,119}$/.test(value) && safeName(value); }
  function scope(value) { return typeof value === "string" && /^[a-zA-Z0-9 _-]{1,40}$/.test(value) && safeName(value); }
  function pass(value) { return Number.isSafeInteger(value) && value > 0 && value <= LIMIT; }
  function empty() { return { version: 1, completed: Object.create(null), scopes: Object.create(null) }; }
  function normalize(value) {
    if (!object(value) || value.version !== 1 || Object.keys(value).some(function (name) { return !["version", "completed", "scopes"].includes(name); }) ||
        !object(value.completed) || !object(value.scopes) || Object.keys(value.completed).length > MAX_RECORDS || Object.keys(value.scopes).length > MAX_SCOPES) { throw new Error("Invalid study progress"); }
    var result = empty();
    [[value.completed, result.completed, id], [value.scopes, result.scopes, scope]].forEach(function (entry) {
      Object.keys(entry[0]).forEach(function (name) {
        if (!entry[2](name) || !pass(entry[0][name])) { throw new Error("Invalid study progress entry"); }
        entry[1][name] = entry[0][name];
      });
    });
    return result;
  }
  // Completed values are pass watermarks, not attempt counters. Every public
  // operation is pure: callers explicitly save a returned progress object.
  function create(options) {
    options = options || {};
    function resolve(value) {
      var name = typeof value === "string" ? value : value && value.id;
      if (!id(name)) { return null; }
      var question = typeof options.resolve === "function" ? options.resolve(name) : typeof value === "string" ? { id: name } : value;
      return question && id(question.id) ? question : null;
    }
    function poolQuestions(pool) {
      var questions = [], seen = new Set();
      (Array.isArray(pool) ? pool : []).forEach(function (value) {
        var q = resolve(value);
        if (!q || seen.has(q.id)) { return; }
        seen.add(q.id); questions.push(q);
      });
      return questions;
    }
    // Call only when metadata is absent. Historical wrong-review attempts are
    // included in this one-time first-pass seed, then never consulted again.
    function initialize(history, archivedHistory) {
      var result = empty();
      function add(name, record) {
        if (!record || !Number.isSafeInteger(record.attempts) || record.attempts < 1) { return; }
        var q = resolve(name);
        if (q) { result.completed[q.id] = 1; }
      }
      if (object(history)) { Object.keys(history).forEach(function (name) { add(name, history[name]); }); }
      (Array.isArray(archivedHistory) ? archivedHistory : []).forEach(function (record) { if (record) { add(record.id, record); } });
      return normalize(result);
    }
    function snapshot(progress, pool, scopeKey) {
      var value = normalize(progress), questions = poolQuestions(pool);
      if (!scope(scopeKey)) { throw new Error("Invalid study scope"); }
      var minimum = questions.length ? questions.reduce(function (n, q) { return Math.min(n, value.completed[q.id] || 0); }, LIMIT) : 0;
      var target = Math.max(own(value.scopes, scopeKey) ? value.scopes[scopeKey] : 1, minimum || 1);
      var remaining = questions.filter(function (q) { return (value.completed[q.id] || 0) < target; });
      return { scope: scopeKey, pass: target, total: questions.length, completed: questions.length - remaining.length,
        remaining: remaining.length, complete: questions.length > 0 && remaining.length === 0,
        questions: questions, remainingQuestions: remaining };
    }
    function mark(progress, question, targetPass) {
      var value = normalize(progress), q = resolve(question);
      if (!pass(targetPass)) { throw new Error("Invalid study pass"); }
      if (q) { value.completed[q.id] = Math.max(value.completed[q.id] || 0, targetPass); }
      return normalize(value);
    }
    function nextPass(progress, pool, scopeKey) {
      var value = normalize(progress), state = snapshot(value, pool, scopeKey);
      if (!state.complete) { return value; }
      if (state.pass === LIMIT) { throw new Error("Study pass limit reached"); }
      value.scopes[scopeKey] = state.pass + 1;
      return normalize(value);
    }
    function context(progress, pool, scopeKey) {
      var state = snapshot(progress, pool, scopeKey);
      return { scope: state.scope, pass: state.pass };
    }
    return Object.freeze({ initialize: initialize, snapshot: snapshot, mark: mark, nextPass: nextPass, context: context });
  }
  return Object.freeze({ create: create, empty: empty, normalize: normalize });
}));
