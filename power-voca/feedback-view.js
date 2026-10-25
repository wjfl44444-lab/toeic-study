(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PowerFeedbackView = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  function renderCore(model) {
    const hero = model.pairs && model.pairs.length ? `<div class="kf-pairs">${model.pairs.map(p => `<div><h3 class="kf-word">${esc(p.word)}</h3><p class="kf-meaning">${esc(p.meaning)}</p></div>`).join('')}</div>` :
      `<h3 class="kf-word">${esc(model.word)}</h3>${model.meaning ? `<p class="kf-meaning">${esc(model.meaning)}</p>` : ''}`;
    const rows = (model.rows || []).map(row => `<div class="kf-row${row.missing ? ' is-missing' : ''}"><div class="kf-row-head"><strong>${esc(row.label)}</strong>${row.missing ? `<span class="kf-tag">${esc(typeof row.missing === 'string' ? row.missing : '빠뜨림')}</span>` : ''}</div>${row.meaning ? `<p class="kf-row-meaning">${esc(row.meaning)}</p>` : ''}${row.missing && row.example ? `<p class="kf-example">${esc(row.example)}</p>` : ''}</div>`).join('');
    const synonyms = (model.synonyms || []).map(word => `<p class="kf-synonym">＝ ${esc(word)}</p>`).join('');
    const mistakes = (model.mistakes || []).map(m => `<div class="kf-mistake"><p class="kf-mistake-label">${esc(m.label)}</p><p class="kf-mistake-value">${esc(m.value)}${m.meaning ? ` → ${esc(m.meaning)}` : ''}</p></div>`).join('');
    return `<div class="keyword-feedback">${hero}${rows ? `<div class="kf-rows">${rows}</div>` : ''}${synonyms ? `<div class="kf-synonyms">${synonyms}</div>` : ''}${mistakes ? `<div class="kf-mistakes">${mistakes}</div>` : ''}</div>`;
  }
  return { renderCore };
});
