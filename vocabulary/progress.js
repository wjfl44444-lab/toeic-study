const isRecord = value => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const isTimestamp = value => typeof value === "string" && Number.isFinite(Date.parse(value));
const uniqueIds = values => [...new Set((Array.isArray(values) ? values : []).filter(value => typeof value === "string" && value.trim()))];

export function normalizeBookmarks(value) {
  const result = Object.create(null);
  if (!isRecord(value)) return result;
  for (const [id, entry] of Object.entries(value)) {
    if (id.trim() && isRecord(entry) && typeof entry.starred === "boolean" && isTimestamp(entry.updatedAt)) {
      result[id] = { starred: entry.starred, updatedAt: entry.updatedAt };
    }
  }
  return result;
}

export function normalizeStudyProgress(value) {
  const result = Object.create(null);
  if (!isRecord(value)) return result;
  for (const [scope, entry] of Object.entries(value)) {
    if (!scope.trim() || !isRecord(entry) || !Number.isSafeInteger(entry.pass) || entry.pass < 1
      || !Array.isArray(entry.completedIds) || !entry.completedIds.every(id => typeof id === "string" && id.trim())
      || !isTimestamp(entry.updatedAt)) continue;
    result[scope] = { pass: entry.pass, completedIds: uniqueIds(entry.completedIds), updatedAt: entry.updatedAt };
  }
  return result;
}

export function progressScopeKey({ mode = "multiple", direction = "word-to-meaning", tag = "all", collection, onlyWrong = false, minWrong = 1 } = {}) {
  const group = collection === "starred" ? "starred" : collection === "wrong" || onlyWrong ? "wrong" : "regular";
  return JSON.stringify([mode, direction, tag, group, group === "wrong" ? Math.max(1, Math.floor(Number(minWrong) || 1)) : 0]);
}

export function eligibleStudyWords(words, { tag = "all", collection, onlyWrong = false, minWrong = 1 } = {}, bookmarks = {}) {
  const wrongOnly = collection === "wrong" || onlyWrong;
  const minimum = Math.max(1, Math.floor(Number(minWrong) || 1));
  return words.filter(word => (tag === "all" || word.tags.includes(tag))
    && (!wrongOnly || word.wrongCount >= minimum)
    && (collection !== "starred" || bookmarks[word.id]?.starred === true));
}

// Selecting reserves nothing: only an answered original item completes a word.
// The caller stores entry when starting a batch and injects its existing picker.
export function selectNextBatch(words, count, settings = {}, studyProgress = {}, bookmarks = {}, selectWords = (pool, size) => pool.slice(0, size)) {
  const scopeKey = progressScopeKey(settings);
  const eligible = eligibleStudyWords(words, settings, bookmarks);
  const saved = normalizeStudyProgress({ [scopeKey]: studyProgress[scopeKey] })[scopeKey];
  let entry = saved || { pass: 1, completedIds: [], updatedAt: new Date().toISOString() };
  let completedIds = new Set(entry.completedIds);
  let remaining = eligible.filter(word => !completedIds.has(word.id));
  if (eligible.length && !remaining.length) {
    entry = { pass: entry.pass + 1, completedIds: [], updatedAt: new Date().toISOString() };
    completedIds = new Set();
    remaining = eligible;
  }
  const size = count === "all" ? remaining.length : Math.min(remaining.length, Math.max(1, Math.floor(Number(count) || 10)));
  const selected = size ? selectWords(remaining, size, settings) : [];
  return {
    words: selected, scopeKey, pass: entry.pass, total: eligible.length,
    completed: eligible.length - remaining.length, remaining: remaining.length,
    entry, progressEntry: entry,
  };
}

export function markStudyWord(studyProgress, scopeKey, wordId, { pass, now = new Date().toISOString() } = {}) {
  const result = normalizeStudyProgress(studyProgress);
  const entry = result[scopeKey];
  if (typeof scopeKey !== "string" || !scopeKey.trim() || typeof wordId !== "string" || !wordId.trim()) return result;
  const currentPass = Number.isSafeInteger(pass) && pass > 0 ? pass : entry?.pass || 1;
  // A previously open batch from an older pass cannot complete a newer pass.
  if (entry && entry.pass > currentPass) return result;
  const ids = entry?.pass === currentPass ? entry.completedIds : [];
  if (ids.includes(wordId)) return result;
  result[scopeKey] = { pass: currentPass, completedIds: [...ids, wordId], updatedAt: isTimestamp(now) ? now : new Date().toISOString() };
  return result;
}

function remapId(id, aliases) {
  const seen = new Set();
  let current = id;
  while (!seen.has(current)) {
    seen.add(current);
    const next = aliases instanceof Map ? aliases.get(current) : aliases?.[current];
    if (typeof next !== "string" || !next || next === current) break;
    current = next;
  }
  return current;
}

export function mergeBookmarks(local, remote, idAliases = {}) {
  const result = Object.create(null);
  for (const [sourceId, entry] of [...Object.entries(normalizeBookmarks(local)), ...Object.entries(normalizeBookmarks(remote))]) {
    const id = remapId(sourceId, idAliases), prior = result[id];
    if (!prior || Date.parse(entry.updatedAt) > Date.parse(prior.updatedAt)
      || (Date.parse(entry.updatedAt) === Date.parse(prior.updatedAt) && !entry.starred)) result[id] = entry;
  }
  return result;
}

export function mergeStudyProgress(base, local, remote, idAliases = {}) {
  const result = Object.create(null);
  for (const [scope, entry] of [...Object.entries(normalizeStudyProgress(local)), ...Object.entries(normalizeStudyProgress(remote))]) {
    const incoming = { ...entry, completedIds: uniqueIds(entry.completedIds.map(id => remapId(id, idAliases))) };
    const prior = result[scope];
    if (!prior || incoming.pass > prior.pass) result[scope] = incoming;
    else if (incoming.pass === prior.pass) {
      result[scope] = { pass: prior.pass, completedIds: uniqueIds([...prior.completedIds, ...incoming.completedIds]),
        updatedAt: Date.parse(incoming.updatedAt) > Date.parse(prior.updatedAt) ? incoming.updatedAt : prior.updatedAt };
    }
  }
  return result;
}
