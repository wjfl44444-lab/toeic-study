(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.GrammarView=api;})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';
  const names={all:'문형·구조 전체 혼합',forms:'동사 형식 구별',connections:'단어 뒤 연결',prepositions:'전치사·구동사',patterns:'표현별 어순·고정 문형'};
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const btn=(action,label,extra='')=>`<button type="button" data-action="${action}" ${extra}>${label}</button>`;
  function storage(backend){
    const key='toeic-grammar-usage-preview-v1';
    return {read(){try{return backend?.getItem(key)||null;}catch{return null;}},save(value){try{backend.setItem(key,value);return true;}catch{return false;}}};
  }
  function home(cards,saved,E){
    const count=pool=>cards.filter(c=>pool==='all'||c.pool===pool).length;
    const progress=saved?E.stats(saved,cards):null;
    return `<section class="intro"><span class="eyebrow">표현·구조 훈련 · 문형·구조</span><h1>이 단어는,<br>어떻게 쓰일까?</h1><p>문법 규칙보다 <strong>단어마다 다른 쓰임</strong>을 기억하는 연습.<br>형식·연결·전치사·어순을 섞어서 확인해요.</p></section>
    <section class="setup panel" aria-labelledby="setup-title"><div class="section-top"><h2 id="setup-title">오늘의 연습</h2><span>${cards.length}개 학습 단위</span></div>
    <form id="start-form"><label for="scope">학습 범위</label><select id="scope" name="scope">${Object.entries(names).map(([id,label])=>`<option value="${id}" ${saved?.scope===id?'selected':''}>${label} · ${count(id)}개</option>`).join('')}</select>
    <div class="settings-row"><div><label for="count">문제 수</label><select id="count" name="count"><option value="10">10개</option><option value="20" selected>20개</option><option value="50">50개</option><option value="all">전체 문제</option></select></div><label class="check-setting"><input name="shuffle" type="checkbox" checked> 무작위 출제·보기 섞기</label></div>
    <p class="small">1V~5V 보기는 고정 순서예요. 의미 보기는 섞어서 출제해요.</p>
    <button class="primary wide" type="submit">새 연습 시작 <span aria-hidden="true">↗</span></button></form>
    ${progress?`<div class="resume"><p>저장된 연습 · ${esc(names[saved.scope])}<br><strong>${progress.done} / ${progress.total}개 완료</strong></p>${btn('resume','이어서 풀기','class="secondary"')}</div>`:''}</section>
    <section class="how"><h2>달라진 연습 방식</h2><div class="how-grid"><article><span>01</span><h3>구조부터 회상</h3><p>형식은 모두 고르기.<br>단어 뒤의 연결은 직접 고르기.</p></article><article><span>02</span><h3>쓰임별 뜻 확인</h3><p>형식마다 뜻을 따로 물어요.<br>비슷한 틀의 보기끼리 비교해요.</p></article><article><span>03</span><h3>끝에서 함께 복습</h3><p>첫 단계 오답은 즉시 종료.<br>뜻 단계가 있으면 끝까지 푼 뒤 해설을 봐요.</p></article></div></section>
    <aside class="local-note">같은 Google 계정으로 로그인하면 개편판 기록을 연결해요. 예전 문형·구조 점수와 이어 풀기는 기존 화면에 그대로 보존하며, 단어장·문제집 기록과도 별도로 저장해요.</aside>`;
  }
  function sourceLabel(s){return `${s.book==='quickstart'?'퀵스타트':'파워토익 VOCA'}${s.bookPage?' p.'+s.bookPage:''}${s.entry?' · '+s.entry:''}`;}
  function feedback(card,q){
    const attempted=q.feedback.answers;
    return `<section class="feedback ${q.feedback.passed?'success':'review'}" aria-labelledby="feedback-title"><div class="section-top"><span class="eyebrow">${q.feedback.passed?'정답 · 잘 기억했어요':'오답 · 쓰임을 다시 확인해요'}</span><span>${attempted.filter(a=>a.correct).length} / ${attempted.length}단계 정답</span></div><h2 id="feedback-title">${esc(card.target)}</h2>
    <div class="answer-summary">${card.summary.map(s=>`<div><strong>${esc(s.structure)}</strong><p>${esc(s.meaning)}</p></div>`).join('')}</div>
    ${card.note?`<p class="small">${esc(card.note)}</p>`:''}
    <div class="explanations">${card.stages.map((s,i)=>{const a=attempted[i];return `<details ${i===0?'open':''}><summary>${i+1}단계 · ${i===0?'구조':'의미'} <span>${a?(a.correct?'정답':'오답'):'미실시 · 채점 제외'}</span></summary><p>${esc(s.prompt)}</p><p>${esc(s.explanation)}</p><ul>${s.options.map((label,j)=>`<li class="${s.correct.includes(j)?'correct-option':''}"><div><strong>${esc(label)}</strong>${s.correct.includes(j)?'<span class="answer-tag">정답</span>':''}${a?.selected.includes(j)?'<span class="picked-tag">내 선택</span>':''}</div><p>${esc(s.reasons[j])}</p></li>`).join('')}</ul></details>`;}).join('')}</div>
    <p class="source">교재 근거 · ${[...new Set(card.sources.map(sourceLabel))].map(esc).join(' / ')}</p></section>`;
  }
  function quiz(session,cards,E){
    const q=E.current(session,cards),stats=E.stats(session,cards),card=q.card,s=q.stage;
    const tabs=Array.from({length:q.complete?q.feedback.answers.length:q.activeStage+1},(_,i)=>btn('stage',`${i+1}. ${i===0?'구조 확인':'의미 '+i}`,`data-index="${i}" class="step-tab ${q.stageIndex===i?'active':''}" aria-current="${q.stageIndex===i?'step':'false'}"`)).join('');
    return `<div class="study-top"><div><span class="eyebrow">${esc(names[session.scope])}</span><p>${session.cursor+1}번째 / ${stats.total}개 <span>· 완료 ${stats.done}개</span></p></div>${btn('home','범위 선택','class="text-button"')}</div>
    <div class="progress" role="progressbar" aria-label="완료 문항" aria-valuenow="${stats.done}" aria-valuemin="0" aria-valuemax="${stats.total}"><i style="width:${stats.done/stats.total*100}%"></i></div>
    <section class="question panel"><div class="stage-tabs" aria-label="학습 단계">${tabs}</div><div class="question-heading"><span class="eyebrow">${q.stageIndex===0?'STRUCTURE':'MEANING '+q.stageIndex}</span><h1>${esc(s.prompt)}</h1><p class="mode">${s.mode==='multi'?'해당하는 것을 모두 고르세요.':'답을 하나 고르세요.'}${q.locked?' · 제출한 답은 변경할 수 없어요.':''}</p></div>
    <div class="target">${esc(card.target)}</div>${s.context?`<p class="context">${esc(s.context)}</p>`:''}
    <fieldset ${q.locked?'disabled':''}><legend class="sr-only">${esc(s.prompt)}</legend><div class="options">${q.order.map((index,j)=>`<label class="option ${q.selected.includes(index)?'selected':''}" for="option-${index}"><input id="option-${index}" name="choice" type="${s.mode==='multi'?'checkbox':'radio'}" value="${index}" ${q.selected.includes(index)?'checked':''}><span class="option-letter">${String.fromCharCode(65+j)}</span><span>${esc(s.options[index])}</span></label>`).join('')}</div></fieldset>
    <div class="question-actions">${!q.locked?btn('submit',q.stageIndex===0?'구조 확인':q.stageIndex===card.stages.length-1?'제출하고 결과 보기':'제출하고 다음 뜻 보기',`class="primary" ${q.selected.length?'':'disabled'}`):!q.complete?btn('active','현재 단계로 돌아가기','class="primary"'):''}${!q.complete?btn('defer','나중에 풀기','class="text-button"'):''}</div>
    ${!q.complete&&q.stageIndex>0?'<p class="small blind-note">의미 단계의 정답·해설은 마지막 제출 후 함께 보여요.</p>':''}</section>
    ${q.complete?feedback(card,q):''}
    <nav class="card-nav" aria-label="문항 이동">${btn('previous','← 이전 문항',`${session.cursor===0?'disabled':''}`)}${btn('result','진행 결과')}${session.cursor<session.ids.length-1?btn('next','다음 문항 →','class="primary"'):btn('result',stats.done===stats.total?'연습 결과 보기':'남은 문항 확인','class="primary"')}</nav>`;
  }
  function result(session,cards,E){
    const stats=E.stats(session,cards),remaining=stats.total-stats.done;
    return `<section class="result panel"><span class="eyebrow">${esc(names[session.scope])}</span><h1>${remaining?'여기까지의 연습 기록':'연습을 마쳤어요'}</h1><p class="muted">완료한 문항만 집계해요. 첫 단계에서 종료된 뜻 문제는 채점에서 제외해요.</p><div class="result-numbers"><div><strong>${stats.cardsCorrect}</strong><span>정답</span></div><div><strong>${stats.cardsWrong}</strong><span>오답</span></div><div><strong>${remaining}</strong><span>미완료</span></div></div><p>총 ${stats.total}개 · 완료 문항의 단계 정답 ${stats.stagesCorrect} / ${stats.stagesAttempted}</p><div class="result-actions">${stats.cardsWrong&&!remaining?btn('retry',`오답 ${stats.cardsWrong}개 복습하기`,'class="primary"'):''}${remaining?btn('remaining',`남은 ${remaining}개 이어 풀기`,'class="secondary"'):btn('resume','답안 다시 보기','class="secondary"')}${btn('home','범위 선택으로','class="text-button"')}</div><p class="small">${remaining?'남은 문항을 마치면 오답을 복습할 수 있어요.':'오답 복습에서도 선택한 학습 범위를 유지해요.'}</p></section>`;
  }
  return {home,quiz,result,storage,esc,names};
});
