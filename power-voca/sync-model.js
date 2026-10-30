(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) { module.exports = api; }
  if (root) { root.PowerVocaSyncModel = api; }
}(typeof window !== "undefined" ? window : null, function () {
  "use strict";
  var LIMIT = 999999999, MAX_RECORDS = 10000, MAX_BYTES = 800 * 1024, MAX_SCOPES = 256;
  var counters = ["attempts", "correct", "stagesGraded", "stagesCorrect"];
  function object(value) { return value && typeof value === "object" && !Array.isArray(value); }
  function key(value) { return typeof value === "string" && /^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,119}$/.test(value) && !["__proto__", "constructor", "prototype"].includes(value); }
  function signature(value) { return typeof value === "string" && /^[a-zA-Z0-9_-]{1,40}$/.test(value); }
  function date(value) { return typeof value === "string" && value.length <= 30 && /^\d{4}-\d\d-\d\dT/.test(value) && Number.isFinite(Date.parse(value)); }
  function count(value) { return Number.isSafeInteger(value) && value >= 0 && value <= LIMIT; }
  function studyScope(value) { return typeof value === "string" && /^[a-zA-Z0-9 _-]{1,40}$/.test(value) && !["__proto__", "constructor", "prototype"].includes(value); }
  function studyPass(value) { return count(value) && value > 0; }
  function studyRun(value) {
    if (!object(value) || Object.keys(value).some(function (name) { return !["scope", "pass", "size", "collection", "bundleByVerb"].includes(name); }) || !studyScope(value.scope) || !studyPass(value.pass) ||
        value.size !== undefined && !["20", "50", "100", "all"].includes(value.size) || value.collection !== undefined && value.collection !== "starred" ||
        value.bundleByVerb !== undefined && typeof value.bundleByVerb !== "boolean") { throw new Error("Invalid study run"); }
    var result = { scope: value.scope, pass: value.pass };
    if (value.size !== undefined) { result.size = value.size; }
    if (value.collection !== undefined) { result.collection = value.collection; }
    if (value.bundleByVerb === true) { result.bundleByVerb = true; }
    return result;
  }
  function studyProgress(value) {
    if (!object(value) || value.version !== 1 || Object.keys(value).some(function (name) { return !["version", "completed", "scopes"].includes(name); }) ||
        !object(value.completed) || !object(value.scopes) || Object.keys(value.completed).length > MAX_RECORDS || Object.keys(value.scopes).length > MAX_SCOPES) { throw new Error("Invalid study progress"); }
    var result = { version: 1, completed: Object.create(null), scopes: Object.create(null) };
    [[value.completed, result.completed, key], [value.scopes, result.scopes, studyScope]].forEach(function (entry) {
      Object.keys(entry[0]).sort().forEach(function (name) {
        if (!entry[2](name) || !studyPass(entry[0][name])) { throw new Error("Invalid study progress entry"); }
        entry[1][name] = entry[0][name];
      });
    });
    return result;
  }
  function bookmarks(value) {
    if (!object(value) || Object.keys(value).length > MAX_RECORDS) { throw new Error("Invalid bookmarks"); }
    var result = Object.create(null);
    Object.keys(value).sort().forEach(function (id) {
      var entry = value[id];
      if (!key(id) || !object(entry) || Object.keys(entry).some(function (name) { return !["starred", "updatedAt"].includes(name); }) ||
          typeof entry.starred !== "boolean" || !date(entry.updatedAt)) { throw new Error("Invalid bookmark entry"); }
      result[id] = { starred: entry.starred, updatedAt: new Date(entry.updatedAt).toISOString() };
    });
    // Valid IDs, timestamps, and field names are ASCII, so this also bounds bytes.
    if (JSON.stringify(result).length > MAX_BYTES) { throw new Error("Bookmarks exceed size limit"); }
    return result;
  }
  function defaults() { return { roundSize: "20", step: "all", shuffleQuestions: true, shuffleOptions: true }; }
  function empty() { return { version: 1, session: null, history: Object.create(null), archivedHistory: [], settings: defaults() }; }
  function nativeId(id) { return typeof id === "string" && /^semantic1-[a-zA-Z0-9_.:-]+$/.test(id); }
  function sortingId(id) { return typeof id === "string" && /^semantic1-sorting-/.test(id); }
  function sortingMetadata(value, cards) {
    if (!object(value) || Object.keys(value).some(function (name) { return !["topic", "phase", "active", "checked", "classificationOnly"].includes(name); }) ||
        !key(value.topic) || value.topic.length > 40 || !["sorting", "sort-feedback", "meaning", "meaning-feedback", "finished"].includes(value.phase) ||
        value.classificationOnly !== undefined && typeof value.classificationOnly !== "boolean" ||
        !key(value.active) || !object(value.checked) || !cards.every(function (card) { return sortingId(card.id); }) ||
        !cards.some(function (card) { return card.id === value.active; }) || Object.keys(value.checked).length > cards.length) {
      throw new Error("Invalid sorting session");
    }
    var byId = new Map(cards.map(function (card) { return [card.id, card]; }));
    var checked = Object.create(null);
    Object.keys(value.checked).sort().forEach(function (id) {
      var card = byId.get(id), indices = value.checked[id];
      if (!card || !Array.isArray(indices) || indices.length >= card.stages.length || new Set(indices).size !== indices.length ||
          indices.some(function (index) { return !Number.isInteger(index) || index < 1 || index >= card.stages.length || card.stages[index].selected === null; })) {
        throw new Error("Invalid checked sorting stage");
      }
      checked[id] = indices.slice();
    });
    if (value.classificationOnly === true &&
        (!["sorting", "sort-feedback", "finished"].includes(value.phase) ||
        Object.keys(checked).some(function (id) { return checked[id].length; }) ||
        !cards.every(function (card) {
          return card.stageIndex === 0 && card.graded === (value.phase !== "sorting") &&
            card.stages.slice(1).every(function (stage) { return stage.selected === null; });
        }))) { throw new Error("Invalid classification-only sorting session"); }
    var result = { topic: value.topic, phase: value.phase, active: value.active, checked: checked };
    if (value.classificationOnly !== undefined) { result.classificationOnly = value.classificationOnly; }
    return result;
  }
  function prepBundleMetadata(value, cards) {
    if (!object(value) || value.version !== 1 || Object.keys(value).some(function (name) { return !["version", "groups"].includes(name); }) ||
        !Array.isArray(value.groups) || !value.groups.length || value.groups.length > cards.length) { throw new Error("Invalid prep bundles"); }
    var byId = new Map(cards.map(function (card) { return [card.id, card]; })), words = new Set(), seen = new Set();
    var groups = value.groups.map(function (group) {
      if (!object(group) || Object.keys(group).some(function (name) { return !["word", "ids", "bank"].includes(name); }) ||
          typeof group.word !== "string" || !group.word.trim() || group.word.length > 80 || words.has(group.word) ||
          !Array.isArray(group.ids) || group.ids.length < 2 || group.ids.length > cards.length ||
          !Array.isArray(group.bank) || group.bank.length < 4 || group.bank.length > 8 || new Set(group.bank).size !== group.bank.length ||
          !group.bank.every(function (option) { return typeof option === "string" && option.trim() && option.length <= 500; })) { throw new Error("Invalid prep bundle group"); }
      words.add(group.word);
      var first;
      group.ids.forEach(function (id) {
        var card = byId.get(id);
        if (!card || seen.has(id) || !nativeId(id) || card.stages.length !== 1 ||
            card.stages[0].selected !== null && !Array.isArray(card.stages[0].selected) || card.stages[0].order.length !== group.bank.length ||
            first && (card.graded !== first.graded || card.stages[0].order.some(function (n, index) { return n !== first.stages[0].order[index]; }))) {
          throw new Error("Invalid prep bundle card");
        }
        first = first || card;
        seen.add(id);
      });
      return { word: group.word, ids: group.ids.slice(), bank: group.bank.slice() };
    });
    if (seen.size !== cards.length) { throw new Error("Incomplete prep bundles"); }
    return { version: 1, groups: groups };
  }
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
    if (!object(value) || !["all", "wrong", "starred"].includes(value.mode) || !date(value.startedAt) ||
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
      var endedAfterFirst = ["20261019-linked1", "20261019-hard2", "20261019-gated-legacy1", "20261023-memory3", "20261030-prepselect1", "20261030-prepbundle1"].includes(value.practiceVersion) && card.graded && card.stageIndex === 0 &&
        card.stages.length === 2 && card.stages[0] && Number.isInteger(card.stages[0].selected) &&
        card.stages[1] && card.stages[1].selected === null;
      var grammarEnded = /^semantic1-grammar-/.test(card.id) && card.graded && card.stageIndex === 0 && card.stages.length > 1 &&
        card.stages[0] && card.stages[0].selected !== null && card.stages.slice(1).every(function (s) { return s && s.selected === null; });
      var sortingEnded = object(value.sorting) && value.sorting.classificationOnly === true && sortingId(card.id) && card.graded && card.stageIndex === 0 &&
        card.stages[0] && card.stages[0].selected !== null && card.stages.slice(1).every(function (s) { return s && s.selected === null; });
      return { id: card.id, signature: card.signature, stageIndex: card.stageIndex, graded: card.graded, deferred: card.deferred === true,
        stages: card.stages.map(function (s, stageIndex) {
          var native = nativeId(card.id), size = s && Array.isArray(s.order) ? s.order.length : 0;
          var selected = s && s.selected;
          var validSelection = selected === null || Number.isInteger(selected) && selected >= 0 && selected < size ||
            native && Array.isArray(selected) && selected.length > 0 && selected.length <= size && new Set(selected).size === selected.length &&
            selected.every(function (n) { return Number.isInteger(n) && n >= 0 && n < size; });
          if (!object(s) || !validSelection || card.graded && selected === null && !(endedAfterFirst && stageIndex === 1 || grammarEnded && stageIndex > 0 || sortingEnded && stageIndex > 0) ||
              !Array.isArray(s.order) || size < (sortingId(card.id) && stageIndex === 0 ? 2 : 4) || size > (native ? 8 : 4) || new Set(s.order).size !== size ||
              !s.order.every(function (n) { return Number.isInteger(n) && n >= 0 && n < size; })) { throw new Error("Invalid stage"); }
          return { selected: Array.isArray(selected) ? selected.slice().sort(function (a,b) { return a-b; }) : selected, order: s.order.slice() };
        }) };
    }) };
    // An absent version means the original printed question choices. Never
    // silently reinterpret an existing round using newer practice overlays.
    if (value.practiceVersion !== undefined) { result.practiceVersion = value.practiceVersion; }
    if (value.studyRun !== undefined) {
      if (value.mode !== "all" && value.mode !== "starred") { throw new Error("Invalid study run mode"); }
      result.studyRun = studyRun(value.studyRun);
      if ((value.mode === "starred") !== (result.studyRun.collection === "starred")) { throw new Error("Invalid study run collection"); }
    }
    if (value.resumeStudyRun !== undefined) {
      if (value.mode !== "wrong") { throw new Error("Invalid resume study run mode"); }
      result.resumeStudyRun = studyRun(value.resumeStudyRun);
    }
    if (value.sorting !== undefined) { result.sorting = sortingMetadata(value.sorting, result.cards); }
    if ((value.prepBundles !== undefined) !== (value.practiceVersion === "20261030-prepbundle1")) { throw new Error("Invalid prep bundle version"); }
    if (value.prepBundles !== undefined) {
      if (!["all", "starred"].includes(value.mode) || value.sorting !== undefined) { throw new Error("Invalid prep bundle mode"); }
      result.prepBundles = prepBundleMetadata(value.prepBundles, result.cards);
    }
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
            !/^[a-zA-Z0-9 _-]{1,40}$/.test(settings.step) || typeof settings.shuffleQuestions !== "boolean" || typeof settings.shuffleOptions !== "boolean" ||
            settings.bundleByVerb !== undefined && typeof settings.bundleByVerb !== "boolean") { return null; }
        result.settings = { roundSize: settings.roundSize, step: settings.step, shuffleQuestions: settings.shuffleQuestions, shuffleOptions: settings.shuffleOptions };
        if (settings.bundleByVerb === true) { result.settings.bundleByVerb = true; }
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
      if (value.grammarImported !== undefined) {
        if (value.grammarImported !== true) { return null; }
        result.grammarImported = true;
      }
      if (value.grammarImportOwner !== undefined) {
        if (!result.grammarImported || !signature(value.grammarImportOwner)) { return null; }
        result.grammarImportOwner = value.grammarImportOwner;
      }
      if (value.studyProgress !== undefined) { result.studyProgress = studyProgress(value.studyProgress); }
      if (value.starredStudyProgress !== undefined) { result.starredStudyProgress = studyProgress(value.starredStudyProgress); }
      if (value.bookmarks !== undefined) { result.bookmarks = bookmarks(value.bookmarks); }
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
    if (result.settings.bundleByVerb === false) { result.settings = Object.assign({}, result.settings); delete result.settings.bundleByVerb; }
    if (result.session && (result.session.studyRun && result.session.studyRun.bundleByVerb === false || result.session.resumeStudyRun && result.session.resumeStudyRun.bundleByVerb === false)) {
      result.session = Object.assign({}, result.session);
      if (result.session.studyRun) { result.session.studyRun = studyRun(result.session.studyRun); }
      if (result.session.resumeStudyRun) { result.session.resumeStudyRun = studyRun(result.session.resumeStudyRun); }
    }
    if (compact) {
      result.session = value.session && { mode: value.session.mode, index: value.session.index, startedAt: value.session.startedAt,
        cards: value.session.cards.map(function (card) { return [card.id, card.signature, card.stageIndex, (card.graded ? 1 : 0) + (card.deferred ? 2 : 0), card.stages.map(function (s) { return [s.selected, s.order.join("")]; })]; }) };
      if (result.session && value.session.practiceVersion !== undefined) { result.session.practiceVersion = value.session.practiceVersion; }
      if (result.session && value.session.studyRun !== undefined) { result.session.studyRun = studyRun(value.session.studyRun); }
      if (result.session && value.session.resumeStudyRun !== undefined) { result.session.resumeStudyRun = studyRun(value.session.resumeStudyRun); }
      if (result.session && value.session.sorting !== undefined) { result.session.sorting = sortingMetadata(value.session.sorting, value.session.cards); }
      if (result.session && value.session.prepBundles !== undefined) { result.session.prepBundles = prepBundleMetadata(value.session.prepBundles, value.session.cards); }
      result.history = Object.keys(value.history).sort().map(function (id) { return tuple(id, value.history[id]); });
    }
    if (value.archivedHistory && value.archivedHistory.length) {
      result.archivedHistory = value.archivedHistory.slice().sort(function (a, b) { return (a.id + a.signature).localeCompare(b.id + b.signature); }).map(function (record) { return compact ? tuple(record.id, record) : record; });
    }
    if (value._studySync) { result._studySync = value._studySync; }
    if (value.grammarImported === true) { result.grammarImported = true; }
    if (value.grammarImportOwner) { result.grammarImportOwner = value.grammarImportOwner; }
    if (value.studyProgress !== undefined) { result.studyProgress = studyProgress(value.studyProgress); }
    if (value.starredStudyProgress !== undefined) { result.starredStudyProgress = studyProgress(value.starredStudyProgress); }
    if (value.bookmarks !== undefined) { result.bookmarks = bookmarks(value.bookmarks); }
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
        // Imported snapshots are the same historical events on every device.
        // New practice uses the converted question fingerprint, a separate revision.
        var legacyGrammar = /^semantic1-grammar-/.test(chosen.id) && /^legacyg_/.test(chosen.signature);
        record[name] = base && !legacyGrammar ? Math.max(right, b ? b[name] : 0) + Math.max(0, left - (b ? b[name] : 0)) : Math.max(left, right);
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
    if (local.grammarImported || remote.grammarImported || base && base.grammarImported) { result.grammarImported = true; }
    if (local.grammarImportOwner || remote.grammarImportOwner || base && base.grammarImportOwner) { result.grammarImportOwner = local.grammarImportOwner || remote.grammarImportOwner || base.grammarImportOwner; }
    ["studyProgress", "starredStudyProgress"].forEach(function (field) {
      var progress = [base, local, remote].filter(function (value) { return value && value[field]; });
      if (!progress.length) { return; }
      result[field] = { version: 1, completed: Object.create(null), scopes: Object.create(null) };
      progress.forEach(function (value) {
        ["completed", "scopes"].forEach(function (name) {
          Object.keys(value[field][name]).forEach(function (id) {
            result[field][name][id] = Math.max(result[field][name][id] || 0, value[field][name][id]);
          });
        });
      });
    });
    var marked = [base, local, remote].filter(function (value) { return value && value.bookmarks !== undefined; });
    if (marked.length) {
      result.bookmarks = Object.create(null);
      marked.forEach(function (value) {
        Object.keys(value.bookmarks).forEach(function (id) {
          var next = value.bookmarks[id], previous = result.bookmarks[id];
          var time = Date.parse(next.updatedAt), priorTime = previous && Date.parse(previous.updatedAt);
          // Keep unstar events as tombstones; a tied removal wins on every device.
          if (!previous || time > priorTime || time === priorTime && !next.starred) {
            result.bookmarks[id] = { starred: next.starred, updatedAt: next.updatedAt };
          }
        });
      });
    }
    return stringify(result, true);
  }
  return Object.freeze({ parse: parse, stringify: stringify, semantic: semantic, merge: merge, empty: empty, maxBytes: MAX_BYTES, counterLimit: LIMIT });
}));
