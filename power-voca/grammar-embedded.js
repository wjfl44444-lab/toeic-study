(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PowerGrammarEmbedded = api;
})(typeof window !== 'undefined' ? window : globalThis, function (window) {
  'use strict';
  const names = { all: '문형·구조 전체 혼합', forms: '동사 형식 구별', connections: '단어 뒤 연결', prepositions: '전치사·구동사', patterns: '표현별 어순·고정 문형' };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  // Presentation only: never pass these strings back to the engine or fingerprint them.
  function display(value) {
    return String(value ?? '')
      .replace(/\bplural nouns?\b/gi, '복수명사').replace(/\bsingular nouns?\b/gi, '단수명사')
      .replace(/\buncountable nouns?\b/gi, '불가산명사').replace(/\bcountable nouns?\b/gi, '가산명사')
      .replace(/\bclauses?\b/gi, 'S + V').replace(/\bnoun phrases?\b/gi, '명사구')
      .replace(/\bnouns?\b/gi, '명사').replace(/\badjectives?\b/gi, '형용사')
      .replace(/\badverbs?\b/gi, '부사').replace(/\bprepositions?\b/gi, '전치사')
      .replace(/복수 명사/g, '복수명사').replace(/단수 명사/g, '단수명사');
  }
  function promptText(value) {
    return display(value).replace(/토익·교재의 주요 쓰임에서/g, '주요 쓰임에서')
      .replace(/교재에서 확인한 /g, '').replace(/교재에서 /g, '')
      .replace(/교재가 제시한 /g, '').replace(/교재의 /g, '').replace(/교재 /g, '');
  }
  function questionContent(card, stage) {
    const prompt = promptText(stage.prompt), lines = prompt.split('\n').map(line => line.trim()).filter(Boolean);
    if (card.pool === 'forms' && stage.fixedOrder) {
      return { instruction: '이 동사의 핵심 형식을 모두 고르세요.', example: lines[0] };
    }
    if (lines.length > 1 && /고르세요[.。]?(?:\s*\(복수 선택\))?$/.test(lines.at(-1))) {
      return { instruction: lines.at(-1), example: lines.slice(0, -1).join('\n') };
    }
    const expression = prompt.match(/^[「『]([^」』]+)[」』]의 뜻을 (?:하나 )?고르세요[.。]?$/);
    if (expression) return { instruction: '다음 표현의 뜻을 고르세요.', example: expression[1] };
    return { instruction: prompt, example: stage.context ? promptText(stage.context) : '' };
  }
  const button = (action, label, className = 'secondary-button', extra = '') => `<button type="button" class="${className}" data-grammar-action="${action}" ${extra}>${label}</button>`;
  function sourceText(source) {
    return (source.book === 'quickstart' ? '퀵스타트' : '파워토익 VOCA') + (source.bookPage ? ' ' + source.bookPage + '쪽' : '') + (source.entry ? ' · 항목 ' + source.entry : '');
  }
  function feedback(card, q, nextLabel) {
    const answers = q.feedback.answers, passed = q.feedback.passed;
    const keywords = window.PowerFeedbackCore && window.PowerFeedbackView;
    const core = keywords ? window.PowerFeedbackView.renderCore(window.PowerFeedbackCore.build({
      id: card.id, word: card.target, passed, grammar: true, question: card,
      summaryRows: card.summary || [],
      stages: card.stages.map((stage, i) => ({ ...stage, selected: answers[i]?.selected || [], skipped: !answers[i] }))
    })) : '';
    const summary = (card.summary || []).map(item => `<div class="grammar-summary-item"><h3 class="answer-summary-expression">${esc(display(item.structure))}</h3><p class="answer-summary-meaning">${esc(display(item.meaning))}</p></div>`).join('');
    return `<section class="panel feedback-panel${passed ? '' : ' wrong'}${keywords ? ' keyword-feedback-panel' : ''}" id="grammar-feedback-panel" aria-labelledby="grammar-feedback-title">
      <p class="eyebrow">ANSWER &amp; EXPLANATION</p><h2 id="grammar-feedback-title" tabindex="-1">${keywords ? passed ? '✓ 정답' : '↺ 다시 확인' : passed ? '모두 정확하게 풀었어요.' : '이 쓰임을 다시 확인해요.'}</h2>
      ${core}<details class="feedback-details"${keywords ? '' : ' open'}><summary>내 답 · 전체 보기</summary>
      <p class="correct-answer">${answers.length < card.stages.length ? '1단계 오답으로 이 문제를 종료했어요. 이후 단계는 채점에 포함하지 않아요.' : card.stages.length + '단계 중 ' + answers.filter(answer => answer.correct).length + '단계 정답 · 아래에서 각 선택지를 확인해 보세요.'}</p>
      ${keywords ? '' : `<section class="answer-summary" aria-label="표현과 뜻"><p class="answer-summary-label">${esc(display(card.target))} · 표현과 뜻</p>${summary}</section>`}
      ${card.stages.map((stage, index) => {
        const answer = answers[index], skipped = !answer, order = q.orders?.[index] || stage.options.map((_, i) => i);
        const selected = answer ? answer.selected.map(i => display(stage.options[i])).join(' / ') : '';
        return `<section class="stage-feedback"><h3 class="stage-feedback-title${skipped ? '' : answer.correct ? '' : ' wrong'}">${index + 1}단계 · ${skipped ? '미진행 · 복습용 해설' : answer.correct ? '정답' : '오답'}</h3>
          <p class="stage-feedback-prompt">${esc(promptText(stage.prompt))}</p><p class="stage-answer-line">정답 ${esc(stage.correct.map(i => display(stage.options[i])).join(' / '))}</p>
          <p class="stage-selected-line">${skipped ? '1단계에서 틀려 진행하지 않았어요. 이 단계는 채점 횟수에 포함하지 않아요.' : '선택한 답 ' + esc(selected)}</p>
          <div class="feedback-section"><h3>정답 근거</h3><p>${esc(display(stage.explanation))}</p></div>
          <div class="feedback-section"><h3>선택지 하나씩 확인하기</h3><ol class="reason-list">${order.map((original, position) => {
            const correct = stage.correct.includes(original), picked = answer?.selected.includes(original);
            return `<li class="reason-item${correct ? ' is-answer' : ''}"><div class="reason-item-heading"><span class="reason-letter">${String.fromCharCode(65 + position)}</span><span class="reason-option">${esc(display(stage.options[original]))}</span>${correct ? '<span class="reason-mark">정답</span>' : picked ? '<span class="reason-mark">선택한 답</span>' : ''}</div><p>${esc(display(stage.reasons[original]))}</p></li>`;
          }).join('')}</ol></div></section>`;
      }).join('')}
      </details>
      ${card.note ? `<details class="feedback-details"${keywords ? '' : ' open'}><summary>설명 · 예문</summary><div class="learning-point"><p>${esc(display(card.note))}</p></div></details>` : ''}
      <details class="feedback-details"${keywords ? '' : ' open'}><summary>교재 위치</summary><p class="question-source">${[...new Set((card.sources || []).map(sourceText))].map(esc).join(' · ')}</p></details>
      ${button('next', nextLabel, 'secondary-button feedback-next')}
    </section>`;
  }
  function quiz(session, cards, E) {
    const q = E.current(session, cards), stats = E.stats(session, cards), content = questionContent(q.card, q.stage);
    const nextLabel = session.cursor === session.ids.length - 1 ? '풀이 결과 보기' : '다음 문제 →';
    const entry = session.entries[q.card.id];
    const highest = q.complete ? q.feedback.answers.length - 1 : q.activeStage;
    const explanation = q.complete ? feedback(q.card, { ...q, orders: entry.orders }, nextLabel) : '';
    let submit = '';
    if (!q.locked) submit = button('submit', q.stageIndex < q.card.stages.length - 1 ? '답 확인 →' : '채점하기', 'primary-button', q.selected.length ? '' : 'disabled');
    else if (q.stageIndex < highest) submit = button('following-stage', q.complete ? '다음 단계 →' : '현재 단계로 →', 'primary-button');
    return `<div class="quiz-topline"><span class="pill">${esc(names[session.scope])}</span>${button('result', '풀이 현황 보기', 'text-button')}</div>
      <div class="progress-caption"><p>문제 ${session.cursor + 1} / ${stats.total}</p><p>채점 ${stats.done} · 모두 맞힌 문제 ${stats.cardsCorrect}</p></div>
      <div class="progress-track" role="progressbar" aria-label="채점 완료" aria-valuemin="0" aria-valuemax="${stats.total}" aria-valuenow="${stats.done}"><span style="width:${stats.done / stats.total * 100}%"></span></div>
      <article class="panel question-panel" id="grammar-question-panel"><div class="question-heading-line"><p class="eyebrow">QUESTION ${String(session.cursor + 1).padStart(2, '0')}</p><span class="question-state">${q.complete ? '채점 완료' : q.locked ? '제출한 단계' : q.selected.length ? '선택 완료 · 아직 미채점' : '미채점'}</span></div>
      <div class="stage-topline"><p class="stage-indicator">${q.stageIndex + 1} / ${q.card.stages.length}단계${!q.complete && q.stageIndex > 0 ? ' · 마지막 단계 후 함께 채점' : ''}</p></div>
      <h1 class="instruction" id="grammar-question-instruction" tabindex="-1">${esc(content.instruction)}</h1>${content.example ? `<p class="question-example">${esc(content.example)}</p>` : ''}
      <fieldset class="options-fieldset" ${q.locked ? 'disabled' : ''}><legend class="sr-only">${q.stage.mode === 'multi' ? '해당하는 답을 모두 선택하세요.' : '정답을 하나 선택하세요.'}</legend>
      <div>${q.order.map((original, position) => {
        const selected = q.selected.includes(original), correct = q.complete && q.stage.correct.includes(original);
        return `<label class="option${selected ? ' selected' : ''}${q.locked ? ' locked' : ''}${q.complete ? correct ? ' correct' : selected ? ' incorrect' : '' : ''}" for="grammar-option-${original}"><input id="grammar-option-${original}" name="grammar-choice" type="${q.stage.mode === 'multi' ? 'checkbox' : 'radio'}" value="${original}" ${selected ? 'checked' : ''}><span class="option-letter">${String.fromCharCode(65 + position)}</span><span class="option-text">${esc(display(q.stage.options[original]))}</span>${q.complete && correct ? '<span class="option-tag">정답</span>' : ''}</label>`;
      }).join('')}</div></fieldset>
      <div class="question-actions">${button('previous', '이전 문제', 'secondary-button', session.cursor ? '' : 'disabled')}${button('previous-stage', '← 이전 단계', 'text-button', q.stageIndex ? '' : 'hidden')}${submit}${button('next', nextLabel, 'primary-button', q.complete ? '' : 'hidden disabled')}</div>
      <p class="choice-hint">${q.complete ? '채점한 답은 변경되지 않아요. 오답 연습에서 다시 도전할 수 있어요.' : q.locked ? '제출한 단계는 바꿀 수 없어요. 현재 단계로 돌아가 계속 풀어 주세요.' : (q.stage.mode === 'multi' ? '해당하는 답을 모두 선택하세요. ' : '') + (q.stageIndex ? '의미 단계의 정답과 해설은 마지막 채점 후 함께 보여요.' : q.card.stages.length > 1 ? '첫 답이 틀리면 이 문제를 종료해요. 맞히면 다음 단계로 넘어가요.' : '선택만으로 정답이 공개되지 않아요.')}</p></article>${explanation}`;
  }
  function result(session, cards, E) {
    const stats = E.stats(session, cards), remaining = stats.total - stats.done;
    return `<section class="panel results-panel" aria-labelledby="grammar-results-title"><p class="eyebrow">YOUR PRACTICE</p><h1 id="grammar-results-title" tabindex="-1">이번 풀이를 돌아봐요.</h1>
      <p class="results-description">${remaining ? stats.total + '문제 중 아직 ' + remaining + '문제를 채점하지 않았어요.' : '이번 ' + stats.total + '문제를 모두 확인했어요.'} 한 단계라도 틀린 문제는 오답 연습에 포함돼요.</p>
      <div class="score-grid" aria-label="풀이 결과"><div><span>정답</span><strong>${stats.cardsCorrect}</strong></div><div><span>오답</span><strong>${stats.cardsWrong}</strong></div><div><span>미채점</span><strong>${remaining}</strong></div></div>
      <p class="stage-score">완료 문항의 단계 정답 ${stats.stagesCorrect} / ${stats.stagesAttempted} · 미진행 단계는 집계에서 제외해요.</p>
      <div class="results-actions">${remaining ? button('remaining', '남은 문제 이어 풀기', 'primary-button') : button('resume', '답안 다시 보기', 'primary-button')}${button('retry', '틀린 문제만 다시 풀기', 'secondary-button', stats.cardsWrong && !remaining ? '' : 'disabled')}${button('home', '학습 범위 선택', 'secondary-button')}</div></section>
      <section class="panel review-panel"><h2>문제별 풀이 현황</h2><p class="review-caption">문제를 누르면 선택한 답과 해설을 다시 확인할 수 있어요.<br>미채점 문제의 정답은 채점하기 전까지 공개하지 않아요.</p>
      <ol class="review-list">${session.ids.map((id, index) => {
        const card = cards.find(item => item.id === id), entry = session.entries[id];
        const passed = entry.complete && entry.answers.length === card.stages.length && entry.answers.every(answer => answer.correct);
        const caption = entry.complete ? display(card.target) : questionContent(card, card.stages[0]).example || questionContent(card, card.stages[0]).instruction;
        return `<li>${button('review', `<span class="review-index">${index + 1}</span><span class="review-text">${esc(caption)}</span><span class="review-status${entry.complete ? passed ? ' correct' : ' wrong' : ''}">${entry.complete ? passed ? '정답' : '오답' : '미채점'}</span>`, 'review-button', `data-index="${index}"`)}</li>`;
      }).join('')}</ol></section>`;
  }
  function create(options) {
    const E = window.GrammarEngine, M = window.GrammarSyncModel, S = window.GrammarSiteState, cards = window.GRAMMAR_PREVIEW?.cards;
    const container = options?.container;
    if (!container || !E || !M || !S || !cards?.length) throw Error('문형·구조 학습 자료를 불러오지 못했어요. 새로고침해 주세요.');
    let backend; try { backend = options.backend || window.localStorage; } catch { backend = null; }
    const state = S.create(cards, backend), document = container.ownerDocument || window.document;
    const view = document.createElement('div'), mount = document.createElement('div'), notice = document.createElement('p');
    view.className = 'grammar-embedded-content'; mount.hidden = true; mount.setAttribute('aria-hidden', 'true');
    notice.className = 'storage-status'; notice.setAttribute('role', 'status'); notice.setAttribute('aria-live', 'polite');
    container.classList.add('grammar-embedded'); container.replaceChildren(view, notice, mount);
    let session = state.session, roundId = state.roundId, page = 'idle', controller = null, pending = null, disposed = false;
    let ready = false, phase = 'starting', failed = false, connecting = false, generation = 0;
    const hosted = ['http:', 'https:'].includes(window.location?.protocol);
    const newId = () => window.crypto?.randomUUID?.() || 'round-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
    function status() { return { ready, phase, pending: Boolean(pending), hasResume: Boolean(session), totals: M.totals(state.payload) }; }
    function announce(message) { notice.textContent = message || ''; options.onNotice?.(message || ''); }
    function focusAndScroll(selector, heading) {
      const panel = view.querySelector(selector), target = view.querySelector(heading);
      target?.focus({ preventScroll: true }); panel?.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
    function render() {
      if (disposed) return;
      if (page === 'quiz' && session) view.innerHTML = quiz(session, cards, E);
      else if (page === 'result' && session) view.innerHTML = result(session, cards, E);
      else view.innerHTML = `<section class="panel loading-panel"><p class="eyebrow">문형·구조</p><h1>${failed ? '학습 기록을 확인하지 못했어요.' : pending ? '학습 기록을 준비하고 있어요.' : '선택한 범위에서 연습을 시작해요.'}</h1><p>${failed ? '저장된 풀이를 보호하기 위해 시작을 보류했어요. 연결을 다시 확인해 주세요.' : pending ? '저장된 풀이를 확인한 뒤 선택한 문제를 시작해요.' : '학습 범위 선택에서 문제 수와 순서를 고를 수 있어요.'}</p>${failed ? button('reconnect', '기록 다시 확인', 'primary-button') : ''}${button('home', '학습 범위 선택', 'text-button')}</section>`;
    }
    function save() { if (session) state.commit(session, roundId); }
    function begin(settings) {
      if (state.payload.session && (!session || E.stats(session, cards).done < session.ids.length) && !window.confirm('새 연습은 현재 이어 풀기를 교체해요. 누적 기록은 유지됩니다. 시작할까요?')) return false;
      if (state.payload.session && !session && !state.backupCurrent()) throw Error('예전 이어 풀기의 백업을 저장하지 못했어요. 기존 기록은 그대로예요.');
      session = E.start(cards, settings); roundId = newId(); page = 'quiz'; save(); render();
      focusAndScroll('#grammar-question-panel', '#grammar-question-instruction'); return true;
    }
    function openPending() {
      if (!ready || !pending || disposed) return;
      const request = pending; pending = null;
      try {
        if (request.kind === 'start') { const opened = begin(request.settings); request.resolve(opened); if (!opened) goHome(); }
        else if (session) { page = 'quiz'; render(); focusAndScroll('#grammar-question-panel', '#grammar-question-instruction'); request.resolve(true); }
        else { page = 'idle'; render(); announce('저장된 문형·구조 풀이가 없어요. 학습 범위를 선택해 새 연습을 시작해 주세요.'); request.resolve(false); options.onHome?.(); }
      } catch (error) { page = 'idle'; render(); announce(error.message); request.resolve(false); }
    }
    function request(kind, settings) {
      if (disposed) return Promise.resolve(false);
      if (pending) pending.resolve(false);
      announce(''); page = 'idle';
      const promise = new Promise(resolve => { pending = { kind, settings, resolve }; });
      render(); openPending(); return promise;
    }
    function goHome() {
      if (pending) { pending.resolve(false); pending = null; }
      page = 'idle'; render(); options.onHome?.();
    }
    function act(action, index) {
      announce('');
      if (action === 'home') { goHome(); return; }
      if (action === 'reconnect') { void connect(); return; }
      if (action === 'resume') { void request('resume'); return; }
      if (!session || !['quiz', 'result'].includes(page)) return;
      let target = 'question';
      const q = E.current(session, cards);
      switch (action) {
        case 'submit': session = E.submit(session, cards); target = E.current(session, cards).complete ? 'feedback' : 'question'; break;
        case 'previous-stage': if (!q.stageIndex) return; session = E.viewStage(session, cards, q.stageIndex - 1); break;
        case 'following-stage': session = E.viewStage(session, cards, q.complete ? q.stageIndex + 1 : q.activeStage); break;
        case 'previous': if (!session.cursor) return; session = E.move(session, cards, -1); break;
        case 'next':
          if (!q.complete) { announce('현재 문제를 채점한 뒤 다음 문제로 넘어갈 수 있어요.'); return; }
          if (session.cursor === session.ids.length - 1) { page = 'result'; target = 'result'; }
          else session = E.move(session, cards, 1);
          break;
        case 'result': page = 'result'; target = 'result'; break;
        case 'remaining': session = { ...session, cursor: Math.max(0, session.ids.findIndex(id => !session.entries[id].complete)) }; page = 'quiz'; break;
        case 'retry': session = E.retry(session, cards); roundId = newId(); page = 'quiz'; break;
        case 'review': if (!Number.isInteger(index) || index < 0 || index >= session.ids.length) return; session = { ...session, cursor: index }; page = 'quiz'; break;
        default: return;
      }
      save(); render();
      if (target === 'feedback') focusAndScroll('#grammar-feedback-panel', '#grammar-feedback-title');
      else if (target === 'result') focusAndScroll('.results-panel', '#grammar-results-title');
      else focusAndScroll('#grammar-question-panel', '#grammar-question-instruction');
    }
    function clicked(event) {
      const control = event.target.closest('button[data-grammar-action]');
      if (!control || control.disabled || !container.contains(control)) return;
      try { act(control.dataset.grammarAction, Number(control.dataset.index)); } catch (error) { announce(error.message); }
    }
    function changed(event) {
      if (event.target.name !== 'grammar-choice' || !session || page !== 'quiz') return;
      try {
        const focusId = event.target.id; session = E.select(session, cards, Number(event.target.value)); save(); render();
        view.querySelector('#' + focusId)?.focus({ preventScroll: true });
      } catch (error) { announce(error.message); }
    }
    async function connect() {
      if (disposed || connecting) return;
      connecting = true; ready = false; failed = false; phase = 'starting'; const ticket = ++generation;
      controller?.destroy(); controller = null; render();
      if (!state.canUpload()) { connecting = false; failed = true; phase = 'error'; render(); announce('원본 기록 백업을 저장하지 못해 계정 연결을 보류했어요. 기존 기록은 그대로예요.'); return; }
      if (!hosted) { connecting = false; ready = true; phase = 'local'; options.onReady?.(status()); openPending(); return; }
      try {
        const module = await (options.loadSync ? options.loadSync() : import('../shared/study-sync.js?v=20261024-menu1'));
        if (disposed || ticket !== generation) return;
        controller = module.connectStudySync({ appId: 'power-grammar', legacyKey: S.key, mount,
          getPayload: state.raw, createEmptyPayload: () => M.stringify(M.empty()), validatePayload: raw => M.parse(raw) !== null,
          mergePayload: M.merge, semanticPayload: M.semantic,
          onStatusChange: next => {
            if (disposed || ticket !== generation) return;
            const newlyReady = !ready && Boolean(next.ready); ready = Boolean(next.ready); phase = next.phase; failed = phase === 'error';
            if (page === 'idle') render();
            if (newlyReady) { options.onReady?.(status()); openPending(); }
          },
          applyPayload: (raw, metadata) => {
            if (disposed || ticket !== generation) return;
            const replaced = state.apply(raw, metadata, page === 'quiz' || page === 'result');
            if (replaced) { session = state.session; roundId = state.roundId; page = 'idle'; }
            render();
            if (metadata?.accountSwitch && !pending) options.onHome?.();
          },
          canUploadPayload: () => state.canUpload() && M.fits(state.raw()),
          summarizePayload: raw => { const p = M.parse(raw); return p ? '누적 채점 ' + M.totals(p).attempts + '회' + (p.session ? ' · 이어 풀기 있음' : '') : '기록 형식 확인 필요'; },
          hasLocalData: raw => { const p = M.parse(raw); return Boolean(p && (p.session || M.totals(p).attempts)); }
        });
        state.attach(controller);
      } catch (error) {
        if (!disposed && ticket === generation) { failed = true; phase = 'error'; render(); announce('계정 연결을 불러오지 못해 문제 시작을 보류했어요. 기록 다시 확인을 눌러 주세요. 기존 기록은 그대로예요.'); }
      } finally { if (ticket === generation) connecting = false; }
    }
    container.addEventListener('click', clicked); container.addEventListener('change', changed);
    render(); if (state.error) announce(state.error); void connect();
    return { start: settings => request('start', settings), resume: () => request('resume'), goHome,
      hasResume: () => Boolean(session), getStatus: status,
      dispose() { disposed = true; ++generation; if (pending) pending.resolve(false); pending = null; controller?.destroy(); container.removeEventListener('click', clicked); container.removeEventListener('change', changed); }
    };
  }
  return { create, display, questionContent };
});
