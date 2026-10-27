(function (root, factory) {
  'use strict';
  const api = factory(
    typeof module === 'object' && module.exports ? require('./sync-model.js') : root.PowerVocaSyncModel,
    typeof module === 'object' && module.exports ? require('./grammar/sync-model.js') : root.GrammarSyncModel,
    typeof module === 'object' && module.exports ? require('./grammar/engine.js') : root.GrammarEngine
  );
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PowerVocaUnifiedMigration = api;
})(typeof window !== 'undefined' ? window : globalThis, function (Native, Grammar, Engine) {
  'use strict';
  const VERSION = '20261025-unified1', PREFIX = 'semantic1-grammar-';
  const fields = ['attempts', 'correct', 'stagesGraded', 'stagesCorrect'];
  const copy = value => JSON.parse(JSON.stringify(value));
  const validId = id => typeof id === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,119}$/.test(id);
  const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);

  // Match app.js exactly for native question fingerprints. Legacy history uses
  // a separate signature namespace: it must never claim a newly adapted answer
  // was graded, nor be added again when two devices import the same snapshot.
  function fingerprint(value) {
    const text = JSON.stringify(value); let hash = 2166136261;
    for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
    return (hash >>> 0).toString(36);
  }
  function stableHash(text) {
    let a = 2166136261, b = 5381;
    for (let i = 0; i < text.length; i++) {
      a = Math.imul(a ^ text.charCodeAt(i), 16777619);
      b = Math.imul(b, 33) ^ text.charCodeAt(i);
    }
    return (a >>> 0).toString(36) + '_' + (b >>> 0).toString(36);
  }
  function snapshotSignature(signature) {
    return /^[a-zA-Z0-9_-]{1,32}$/.test(signature) ? 'legacyg_' + signature : 'legacyg_h_' + stableHash(signature);
  }
  function idFor(id, adapter) {
    const mapped = adapter && adapter.mapByLegacyId && own(adapter.mapByLegacyId, id) && adapter.mapByLegacyId[id];
    const result = mapped ? mapped.id : PREFIX + id;
    // Deleted historical questions can have IDs that exceed the new model's
    // bounds. A stable fallback preserves their counters; backups retain the ID.
    return validId(result) ? result : PREFIX + 'legacy-' + stableHash(id);
  }
  function error(code, message) { const result = new Error(message); result.code = code; return result; }
  function timestamp(value) {
    const normalized = new Date(value).toISOString();
    if (!/^\d{4}-\d\d-\d\dT/.test(normalized)) throw error('unrepresentable-date', 'A legacy timestamp cannot fit the native record schema; originals are retained.');
    return normalized;
  }
  function revisionMap(payload) {
    const result = new Map();
    Object.keys(payload.history).forEach(id => result.set(id + '\t' + payload.history[id].signature, Object.assign({ id }, copy(payload.history[id]))));
    (payload.archivedHistory || []).forEach(record => result.set(record.id + '\t' + record.signature, copy(record)));
    return result;
  }
  function hasNativeGrammar(payload) {
    return Boolean(payload.grammarImported || payload.session && payload.session.cards.some(card => card.id.startsWith(PREFIX)) ||
      Object.keys(payload.history).some(id => id.startsWith(PREFIX)) || (payload.archivedHistory || []).some(record => record.id.startsWith(PREFIX)));
  }
  function selection(values, stage) {
    if (!values.length) return null;
    return stage.multiple ? values.slice().sort((a, b) => a - b) : values[0];
  }
  function convertSession(grammar, adapter, practiceVersion) {
    if (!grammar.session) return { session: null, reason: 'no-grammar-session' };
    if (!adapter || !Array.isArray(adapter.legacyCards) || !adapter.mapByLegacyId) return { session: null, reason: 'missing-adapter' };
    const restored = Engine.restore(JSON.stringify(grammar.session), adapter.legacyCards);
    if (!restored) return { session: null, reason: 'different-grammar-revision' };
    const last = Object.values(grammar.history).map(record => timestamp(record.lastAt)).sort().at(-1);
    const result = {
      mode: 'all', index: restored.cursor,
      // The old engine stored no start time. This deterministic placeholder is
      // not a recency comparison; the complete original is always backed up.
      startedAt: last || '1970-01-01T00:00:00.000Z',
      cards: restored.ids.map(id => {
        const q = own(adapter.mapByLegacyId, id) && adapter.mapByLegacyId[id], entry = restored.entries[id];
        if (!q || !validId(q.id) || q.stages.length !== entry.orders.length) throw error('invalid-adapter', 'The adapted session does not match the original grammar questions.');
        return {
          id: q.id, signature: fingerprint(q), stageIndex: entry.stage,
          graded: entry.complete, deferred: false,
          stages: q.stages.map((stage, index) => ({
            selected: selection(entry.answers[index] ? entry.answers[index].selected : entry.drafts[index], stage),
            order: entry.orders[index].slice()
          }))
        };
      })
    };
    if (practiceVersion !== undefined) result.practiceVersion = practiceVersion;
    return { session: result, reason: 'converted', originalView: restored.entries[restored.ids[restored.cursor]].view };
  }

  function reconcileLegacySource(source) {
    const serverRaw = source && source.payload;
    const unresolved = reason => ({ resolved: false, payload: serverRaw === undefined ? null : serverRaw, reason });
    const resolved = (payload, reason) => ({ resolved: true, payload, reason });
    if (!source || typeof source !== 'object' || source.payload !== null && typeof source.payload !== 'string') return unresolved('invalid-source');
    if (!source.pendingCache) return resolved(serverRaw, 'no-pending-cache');
    // Ownership is established by readLegacyGrammar's authenticated, read-only
    // lookup. This helper never searches account caches or guesses another UID.
    if (typeof source.owner !== 'string' || !/^account:.+$/.test(source.owner)) return unresolved('unknown-cache-owner');
    if (!Number.isSafeInteger(source.revision) || source.revision < 0 || (source.revision === 0) !== (serverRaw === null) || serverRaw !== null && !Grammar.parse(serverRaw)) return unresolved('invalid-server');
    if (typeof source.cacheRaw !== 'string') return unresolved('missing-cache');
    let cached, sent;
    const valid = raw => typeof raw === 'string' && Boolean(Grammar.parse(raw));
    const nullable = raw => raw === null || valid(raw);
    const revision = value => value === null || Number.isSafeInteger(value) && value >= 0;
    const semantic = raw => raw === null ? null : Grammar.semantic(raw);
    try {
      cached = JSON.parse(source.cacheRaw);
      if (!cached || ![1, 2].includes(cached.version) || !valid(cached.payload) ||
          typeof cached.linked !== 'boolean' || typeof cached.pending !== 'boolean' ||
          !revision(cached.baseRevision) || !nullable(cached.basePayload) ||
          cached.linked && (cached.baseRevision === null || (cached.baseRevision === 0) !== (cached.basePayload === null))) return unresolved('invalid-cache');
      const acknowledged = cached.version === 1 ? cached.basePayload : cached.acknowledgedPayload;
      sent = cached.version === 1 ? null : cached.lastSent;
      if (!nullable(acknowledged) || sent !== null && (!cached.linked || !sent ||
          !/^[a-zA-Z0-9-]{8,100}$/.test(sent.operationId || '') || !valid(sent.payload) ||
          !nullable(sent.basePayload) || !nullable(sent.acknowledgedPayload) ||
          !Number.isSafeInteger(sent.expected) || sent.expected < 0 ||
          (sent.expected === 0) !== (sent.basePayload === null))) return unresolved('invalid-cache-checkpoint');
      const server = serverRaw === null ? null : Grammar.parse(serverRaw);
      const emptyServer = serverRaw === null ? Grammar.stringify(Grammar.empty()) : serverRaw;
      if (sent && server && server._studySync && server._studySync.commits.includes(sent.operationId)) {
        return resolved(Grammar.merge(sent.payload, cached.payload, serverRaw), 'acknowledged-checkpoint');
      }
      if (!sent && cached.basePayload !== null) {
        return resolved(Grammar.merge(cached.basePayload, cached.payload, emptyServer), 'known-base');
      }
      if (sent && source.revision === cached.baseRevision && sent.expected === cached.baseRevision &&
          semantic(serverRaw) === semantic(cached.basePayload) && semantic(sent.basePayload) === semantic(cached.basePayload)) {
        return resolved(Grammar.merge(cached.basePayload, cached.payload, emptyServer), 'unacknowledged-unchanged-base');
      }
      if (serverRaw === null && cached.basePayload === null && !sent) return resolved(cached.payload, 'empty-server-cache');
      return unresolved('ambiguous-cache-checkpoint');
    } catch (_) {
      return unresolved('invalid-cache');
    }
  }

  // Pure preparation only. The caller durably backs up `backups` and `archives`
  // before replacing native storage. No legacy source or account is written.
  function plan(nativeRaw, grammarRaw, options) {
    options = options || {};
    const native = nativeRaw === null || nativeRaw === undefined ? Native.empty() : Native.parse(nativeRaw);
    if (!native) throw error('invalid-native', 'The native record is unreadable; originals are retained.');
    const grammar = grammarRaw === null || grammarRaw === undefined ? Grammar.empty() : Grammar.parse(grammarRaw);
    if (grammarRaw !== null && grammarRaw !== undefined && !grammar) throw error('invalid-grammar', 'The legacy grammar record is unreadable; originals are retained.');
    if (options.selectSession !== undefined && !['native', 'grammar'].includes(options.selectSession)) throw error('invalid-selection', 'Unknown session selection.');
    const payload = copy(native), backups = [], archives = [], warnings = [];
    if (typeof nativeRaw === 'string') backups.push({ source: 'power-voca', raw: nativeRaw });
    if (typeof grammarRaw === 'string') backups.push({ source: 'power-grammar', raw: grammarRaw });
    const alreadyImported = hasNativeGrammar(native), revisions = revisionMap(native), preferred = new Map();
    Object.keys(native.history).forEach(id => preferred.set(id, native.history[id].signature));
    const importedRevisions = [], mappings = [], collisionCheck = new Map(), identities = new Map();
    let converted = { session: null, reason: 'no-grammar-source' }, selected = native.session ? 'native' : null;
    if (grammar) {
      for (const sourceKey of Object.keys(grammar.history).sort()) {
        const original = grammar.history[sourceKey], id = idFor(original.id, options.adapter), signature = snapshotSignature(original.signature);
        const revision = id + '\t' + signature;
        if (identities.has(id) && identities.get(id) !== original.id) throw error('mapping-collision', 'Two legacy question identities cannot be represented safely; originals are retained.');
        identities.set(id, original.id);
        if (collisionCheck.has(revision) && collisionCheck.get(revision) !== sourceKey) throw error('mapping-collision', 'Two legacy revisions cannot be represented safely; originals are retained.');
        collisionCheck.set(revision, sourceKey);
        const incoming = { id, signature, lastStudiedAt: timestamp(original.lastAt) };
        fields.forEach(field => { incoming[field] = original[field]; });
        const previous = revisions.get(revision);
        if (previous) {
          fields.forEach(field => { incoming[field] = Math.max(previous[field], incoming[field]); });
          if ((previous.lastStudiedAt || '') >= incoming.lastStudiedAt) {
            incoming.lastStudiedAt = previous.lastStudiedAt;
            if (previous.lastCorrect !== undefined) incoming.lastCorrect = previous.lastCorrect;
          }
        }
        revisions.set(revision, incoming);
        if (!preferred.has(id)) preferred.set(id, signature);
        const q = options.adapter && options.adapter.mapByLegacyId && own(options.adapter.mapByLegacyId, original.id) && options.adapter.mapByLegacyId[original.id];
        const legacyCard = options.adapter && options.adapter.legacyCards && options.adapter.legacyCards.find(card => card.id === original.id);
        mappings.push({ sourceKey, id, signature, currentSourceRevision: Boolean(legacyCard && Engine.signature([legacyCard]) === original.signature), currentNativeSignature: q ? fingerprint(q) : null });
        importedRevisions.push(revision);
      }
      payload.grammarImported = true;
      converted = convertSession(grammar, options.adapter, options.practiceVersion);
      const requested = options.selectSession || (!alreadyImported && converted.session ? 'grammar' : 'native');
      if (requested === 'grammar' && converted.session) { payload.session = converted.session; selected = 'grammar'; }
      else { payload.session = native.session; selected = native.session ? 'native' : null; }
      if (grammar.session && selected !== 'grammar') archives.push({ source: 'power-grammar', reason: converted.session ? 'other-active-session' : converted.reason, session: copy(grammar.session), roundId: grammar.roundId, counted: grammar.counted.slice(), raw: grammarRaw });
      if (native.session && selected === 'grammar') archives.push({ source: 'power-voca', reason: 'other-active-session', session: copy(native.session), raw: nativeRaw });
      if (grammar.session && !converted.session) warnings.push(converted.reason);
      if (selected === 'grammar') warnings.push('grammar-start-time-unavailable');
    }
    payload.history = Object.create(null); payload.archivedHistory = [];
    Array.from(revisions.keys()).sort().forEach(revision => {
      const record = revisions.get(revision), item = copy(record); delete item.id;
      if (preferred.get(record.id) === record.signature) payload.history[record.id] = item;
      else payload.archivedHistory.push(record);
    });
    const raw = Native.stringify(payload, true);
    if (new TextEncoder().encode(raw).length > Native.maxBytes) throw error('native-size-limit', 'The unified record exceeds the account size limit; originals are retained.');
    return {
      version: VERSION, payload: Native.parse(raw), raw, backups, archives, warnings,
      importedRevisions, mappings,
      session: { selected, alreadyImported, grammarReason: converted.reason, grammarOriginalView: converted.originalView === undefined ? null : converted.originalView }
    };
  }
  return Object.freeze({ VERSION, plan, reconcileLegacySource, fingerprint, snapshotSignature });
});
