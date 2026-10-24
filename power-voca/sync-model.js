(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) { module.exports = api; }
  if (root) { root.PowerVocaSyncModel = api; }
}(typeof window !== "undefined" ? window : null, function () {
  "use strict";
  var LIMIT = 999999999, MAX_RECORDS = 10000, MAX_BYTES = 800 * 1024;
  var counters = ["attempts", "correct", "stagesGraded", "stagesCorrect"];
  function object(value) { return value && typeof value === "object" && !Array.isArray(value); }
  function key(value) { return typeof value === "string" && /^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,119}$/.test(value) && !["__proto__", "constructor", "prototype"].includes(value); }
  function signature(value) { return typeof value === "string" && /^[a-zA-Z0-9_-]{1,40}$/.test(value); }
  function date(value) { return typeof value === "string" && value.length <= 30 && /^\d{4}-\d\d-\d\dT/.test(value) && Number.isFinite(Date.parse(value)); }
  function count(value) { return Number.isSafeInteger(value) && value >= 0 && value <= LIMIT; }
  function defaults() { return { roundSize: "20", step: "all", shuffleQuestions: true, shuffleOptions: true }; }
  function empty() { return { version: 1, session: null, history: Object.create(null), archivedHistory: [], settings: defaults() }; }
  function nativeId(id) { return typeof id === "string" && /^semantic1-[a-zA-Z0-9_.:-]+$/.test(id); }
  function item(value, id) {
    if (!object(value) || !signature(value.signature) || !counters.every(function (name) { return count(value[name]); }) ||
        value.correct > value.attempts || value.stagesCorrect > value.stagesGraded || value.stagesGraded < value.attempts ||
        value.stagesGraded > value.attempts * (nativeId(id) ? 12 : 2) || value.stagesCorrect < value.correct ||
        value.lastCorrect !== undefined && typeof value.lastCorrect !== "boolean" ||
        value.lastStudiedAt !== undefined && !date(value.lastStudiedAt)) { return null; }
    var result = { signature: value.signature };
    counters.forEach(function (name) { result[name] = value[name]; });
    if (value.lastCorrect !== undefined) { result.lastCorrect = value.lastCorrect; }
    if (value.lastStudiedAt !== undefined) { result.lastStudiedAt = value.lastStudiedAt; }
    return result;
  }
  function session(value, compact) {
    if (value === null) { return null; }
    if (!object(value) || !["all", "wrong"].includes(value.mode) || !date(value.startedAt) ||
        value.practiceVersion !== undefined && !signature(value.practiceVersion) || !Array.isArray(value.cards) ||
        !value.cards.length || value.cards.length > MAX_RECORDS || !Number.isInteger(value.index) || value.index < 0 || value.index >= value.cards.length) { throw new Error("Invalid session"); }
    var seen = new Set();
    var result = { mode: value.mode, index: value.index, startedAt: value.startedAt, cards: value.cards.map(function (stored) {
      var card = compact && Array.isArray(stored) && stored.length === 5 ? {
        id: stored[0], signature: stored[1], stageIndex: stored[2], graded: (stored[3] & 1) !== 0, deferred: (stored[3] & 2) !== 0,
        stages: Array.isArray(stored[4]) ? stored[4].map(function (s) { return Array.isArray(s) && s.length === 2 ? { selected: s[0], order: typeof s[1] === "string" ? s[1].split("").map(Number) : null } : null; }) : null
      } : stored;
      if (compact && (!Array.isArray(stored) || stored.length !== 5 || !Number.isInteger(stored[3]) || stored[3] < 0 || stored[3] > 3)) { throw new Error("Invalid compact card"); }
      if (!object(card) || !key(card.id) || seen.has(card.id) || !signature(card.signature) || !Number.isInteger(card.stageIndex) ||
          !Array.isArray(card.stages) || card.stages.length < 1 || card.stages.length > (nativeId(card.id) ? 12 : 2) || card.stageIndex < 0 || card.stageIndex >= card.stages.length ||
          typeof card.graded !== "boolean" || card.deferred !== undefined && typeof card.deferred !== "boolean") { throw new Error("Invalid card"); }
      seen.add(card.id);
      // New gated rounds end after a wrong first choice. Only that precise
      // checkpoint shape may have an unanswered stage on a graded card.
      // The app additionally checks the actual first-stage answer on restore.
      var endedAfterFirst = ["20261019-linked1", "20261019-hard2", "20261019-gated-legacy1", "20261023-memory3"].includes(value.practiceVersion) && card.graded && card.stageIndex === 0 &&
        card.stages.length === 2 && card.stages[0] && Number.isInteger(card.stages[0].selected) &&
        card.stages[1] && card.stages[1].selected === null;
      return { id: card.id, signature: card.signature, stageIndex: card.stageIndex, graded: card.graded, deferred: card.deferred === true,
        stages: card.stages.map(function (s, stageIndex) {
          var native = nativeId(card.id), size = s && Array.isArray(s.order) ? s.order.length : 0;
          var selected = s && s.selected;
          var validSelection = selected === null || Number.isInteger(selected) && selected >= 0 && selected < size ||
            native && Array.isArray(selected) && selected.length > 0 && selected.length <= size && new Set(selected).size === selected.length &&
            selected.every(function (n) { return Number.isInteger(n) && n >= 0 && n < size; });
          if (!object(s) || !validSelection || card.graded && selected === null && !(endedAfterFirst && stageIndex === 1) ||
              !Array.isArray(s.order) || size < 4 || size > (native ? 8 : 4) || new Set(s.order).size !== size ||
              !s.order.every(function (n) { return Number.isInteger(n) && n >= 0 && n < size; })) { throw new Error("Invalid stage"); }
          return { selected: Array.isArray(selected) ? selected.slice().sort(function (a,b) { return a-b; }) : selected, order: s.order.slice() };
        }) };
    }) };
    // An absent version means the original printed question choices. Never
    // silently reinterpret an existing round using newer practice overlays.
    if (value.practiceVersion !== undefined) { result.practiceVersion = value.practiceVersion; }
    return result;
  }
  function fromTuple(tuple) {
    if (!Array.isArray(tuple) || tuple.length !== 8 || !key(tuple[0]) || !(tuple[6] === null || typeof tuple[6] === "boolean") || !(tuple[7] === null || date(tuple[7]))) { throw new Error("Invalid history tuple"); }
    var value = { signature: tuple[1], attempts: tuple[2], correct: tuple[3], stagesGraded: tuple[4], stagesCorrect: tuple[5] };
    if (tuple[6] !== null) { value.lastCorrect = tuple[6]; }
    if (tuple[7] !== null) { value.lastStudiedAt = tuple[7]; }
    return { id: tuple[0], value: value };
  }
  function parse(raw) {
    try {
      if (typeof raw !== "string" || raw.length > 4000000) { return null; }
      var value = JSON.parse(raw), result = empty();
      if (!object(value) || ![1, 2, 3].includes(value.version) || !Object.prototype.hasOwnProperty.call(value, "session")) { return null; }
      result.session = session(value.session, value.version !== 1);
      if (value.settings !== undefined) {
        var settings = value.settings;
        if (!object(settings) || !["20", "50", "100", "all"].includes(settings.roundSize) || typeof settings.step !== "string" ||
            !/^[a-zA-Z0-9 _-]{1,40}$/.test(settings.step) || typeof settings.shuffleQuestions !== "boolean" || typeof settings.shuffleOptions !== "boolean") { return null; }
        result.settings = { roundSize: settings.roundSize, step: settings.step, shuffleQuestions: settings.shuffleQuestions, shuffleOptions: settings.shuffleOptions };
      }
      var records;
      if (value.version !== 1) {
        if (!Array.isArray(value.history)) { return null; }
        records = value.history.map(fromTuple);
      } else {
        if (!object(value.history)) { return null; }
        records = Object.keys(value.history).map(function (id) { return { id: id, value: value.history[id] }; });
      }
      if (value.archivedHistory !== undefined) {
        if (!Array.isArray(value.archivedHistory)) { return null; }
        records = records.concat(value.version !== 1 ? value.archivedHistory.map(fromTuple) : value.archivedHistory.map(function (record) {
          if (!object(record)) { throw new Error("Invalid archived record"); }
          return { id: record.id, value: record };
        }));
      }
      if (records.length > MAX_RECORDS) { return null; }
      var revisions = new Set();
      records.forEach(function (record) {
        var checked = item(record.value, record.id), revision = record.id + "\t" + (checked && checked.signature);
        if (!key(record.id) || !checked || revisions.has(revision)) { throw new Error("Invalid history"); }
        revisions.add(revision);
        if (!result.history[record.id]) { result.history[record.id] = checked; }
        else { result.archivedHistory.push(Object.assign({ id: record.id }, checked)); }
      });
      if (value._studySync !== undefined) {
        var ledger = value._studySync;
        if (!object(ledger) || ledger.version !== 1 || !Array.isArray(ledger.commits) || ledger.commits.length > 256 ||
            !ledger.commits.every(function (id) { return typeof id === "string" && /^[a-zA-Z0-9-]{8,100}$/.test(id); }) || new Set(ledger.commits).size !== ledger.commits.length) { return null; }
        result._studySync = { version: 1, commits: ledger.commits.slice() };
      }
      return result;
    } catch (_) { return null; }
  }
  function tuple(id, value) { return [id, value.signature, value.attempts, value.correct, value.stagesGraded, value.stagesCorrect, value.lastCorrect === undefined ? null : value.lastCorrect, value.lastStudiedAt || null]; }
  function stringify(value, compact) {
    // Old records keep their exact v1/v2 wire format. Only new semantic sets
    // require v3, which adds bounded checkbox arrays and up to twelve stages.
    var native = Object.keys(value.history || {}).some(nativeId) ||
      (value.archivedHistory || []).some(function (r) { return nativeId(r.id); }) ||
      value.session && value.session.cards.some(function (c) { return nativeId(c.id); });
    if (native) { compact = true; }
    var result = { version: native ? 3 : compact ? 2 : 1, session: value.session, history: value.history, settings: value.settings || defaults() };
    if (compact) {
      result.session = value.session && { mode: value.session.mode, index: value.session.index, startedAt: value.session.startedAt,
        cards: value.session.cards.map(function (card) { return [card.id, card.signature, card.stageIndex, (card.graded ? 1 : 0) + (card.deferred ? 2 : 0), card.stages.map(function (s) { return [s.selected, s.order.join("")]; })]; }) };
      if (result.session && value.session.practiceVersion !== undefined) { result.session.practiceVersion = value.session.practiceVersion; }
      result.history = Object.keys(value.history).sort().map(function (id) { return tuple(id, value.history[id]); });
    }
    if (value.archivedHistory && value.archivedHistory.length) {
      result.archivedHistory = value.archivedHistory.slice().sort(function (a, b) { return (a.id + a.signature).localeCompare(b.id + b.signature); }).map(function (record) { return compact ? tuple(record.id, record) : record; });
    }
    if (value._studySync) { result._studySync = value._studySync; }
    var raw = JSON.stringify(result);
    if (!parse(raw)) { throw new Error("Invalid VOCA state"); }
    return raw;
  }
  function semantic(raw) {
    var value = parse(raw);
    if (!value) { throw new Error("Invalid VOCA state"); }
    delete value._studySync;
    return stringify(value, true);
  }
  function revisionMap(value) {
    var map = new Map();
    if (!value) { return map; }
    Object.keys(value.history).forEach(function (id) { map.set(id + "\t" + value.history[id].signature, Object.assign({ id: id }, value.history[id])); });
    value.archivedHistory.forEach(function (record) { map.set(record.id + "\t" + record.signature, record); });
    return map;
  }
  function merge(baseRaw, localRaw, remoteRaw) {
    var local = parse(localRaw), remote = parse(remoteRaw), base = baseRaw === null ? null : parse(baseRaw);
    if (!local || !remote || baseRaw !== null && !base) { throw new Error("Invalid VOCA merge input"); }
    var ls = revisionMap(local), rs = revisionMap(remote), bs = revisionMap(base), ids = new Set(Array.from(ls.keys()).concat(Array.from(rs.keys())).concat(Array.from(bs.keys())));
    var result = empty(); result.session = local.session; result.settings = local.settings;
    Array.from(ids).sort().forEach(function (revision) {
      var l = ls.get(revision), r = rs.get(revision), b = bs.get(revision), chosen = l || r || b, record = { signature: chosen.signature };
      counters.forEach(function (name) {
        var left = l ? l[name] : b ? b[name] : 0, right = r ? r[name] : b ? b[name] : 0;
        record[name] = base ? Math.max(right, b ? b[name] : 0) + Math.max(0, left - (b ? b[name] : 0)) : Math.max(left, right);
        if (!count(record[name])) { throw new Error("VOCA counter overflow; original records retained"); }
      });
      var latest = [l, r, b].filter(Boolean).sort(function (a, z) {
        return (z.lastStudiedAt ? Date.parse(z.lastStudiedAt) : 0) - (a.lastStudiedAt ? Date.parse(a.lastStudiedAt) : 0) ||
          JSON.stringify(z).localeCompare(JSON.stringify(a));
      })[0];
      if (latest.lastStudiedAt !== undefined) { record.lastStudiedAt = latest.lastStudiedAt; }
      if (latest.lastCorrect !== undefined) { record.lastCorrect = latest.lastCorrect; }
      if (!item(record, chosen.id)) { throw new Error("Invalid merged VOCA history"); }
      var id = chosen.id, preferred = local.history[id] || remote.history[id] || base && base.history[id];
      if (record.signature === preferred.signature) { result.history[id] = record; }
      else { result.archivedHistory.push(Object.assign({ id: id }, record)); }
    });
    var receipts = [].concat(base && base._studySync ? base._studySync.commits : [], local._studySync ? local._studySync.commits : [], remote._studySync ? remote._studySync.commits : []);
    if (receipts.length) { result._studySync = { version: 1, commits: Array.from(new Set(receipts)).slice(-256) }; }
    return stringify(result, true);
  }
  return Object.freeze({ parse: parse, stringify: stringify, semantic: semantic, merge: merge, empty: empty, maxBytes: MAX_BYTES, counterLimit: LIMIT });
}));
