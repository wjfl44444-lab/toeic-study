(function(){
  'use strict';
  const E=window.GrammarEngine,V=window.GrammarView,M=window.GrammarSyncModel,cards=window.GRAMMAR_PREVIEW?.cards;
  const app=document.getElementById('app'),notice=document.getElementById('notice');
  if(!cards?.length||!M){app.innerHTML='<h1>자료를 불러오지 못했어요.</h1><p>새로고침해 주세요. 저장된 기록은 그대로예요.</p>';return;}
  let backend;try{backend=window.localStorage;}catch{backend=null;}
  const state=window.GrammarSiteState.create(cards,backend);
  let session=state.session,roundId=state.roundId,page='home',epoch=0;
  if(state.error)notice.textContent=state.error;
  const newId=()=>window.crypto?.randomUUID?.()||'round-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
  const initialScope=new URLSearchParams(window.location.search).get('scope');
  function render(focusId){
    const totals=M.totals(state.payload);
    app.innerHTML=page==='home'?V.home(cards,session,E)+`<section class="panel history-panel"><h2>개편판 누적 학습</h2><p>채점 ${totals.attempts}회 · 정답 ${totals.correct}회 · 단계 정답 ${totals.stagesCorrect} / ${totals.stagesGraded}</p><p class="small">예전 학습 기록은 합산하거나 재채점하지 않고 기존 화면에 그대로 보관해요.</p><div class="backup-actions"><button type="button" data-action="export">기록 백업</button><button type="button" data-action="import">기록 가져오기</button></div>${state.payload.session&&!session?'<p class="small">다른 문항 버전의 이어 풀기를 보관했어요. 백업할 수 있으며 새 연습을 시작해도 누적 기록은 유지돼요.</p>':''}</section>`:page==='result'?V.result(session,cards,E):V.quiz(session,cards,E);
    if(page==='home'&&!session&&V.names[initialScope]){const scope=document.getElementById('scope');if(scope)scope.value=initialScope;}
    if(focusId)document.getElementById(focusId)?.focus();
  }
  function focus(){const heading=app.querySelector('h1');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}
  function save(){if(session)state.commit(session,roundId);}
  function exportFile(){const url=URL.createObjectURL(new Blob([state.exportRaw()],{type:'application/json'}));const link=document.createElement('a');link.href=url;link.download='toeic-grammar-records-'+new Date().toISOString().slice(0,10)+'.json';link.click();window.setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function act(action,index){
    notice.textContent='';
    switch(action){
      case 'home':page='home';break;
      case 'resume':if(!session)return;page='quiz';break;
      case 'submit':session=E.submit(session,cards);break;
      case 'stage':session=E.viewStage(session,cards,index);break;
      case 'active':session=E.viewStage(session,cards,E.current(session,cards).activeStage);break;
      case 'previous':session=E.move(session,cards,-1);break;
      case 'next':session=E.move(session,cards,1);break;
      case 'defer':session=E.defer(session,cards);break;
      case 'result':page='result';break;
      case 'retry':session=E.retry(session,cards);roundId=newId();page='quiz';break;
      case 'remaining':session={...session,cursor:Math.max(0,session.ids.findIndex(id=>!session.entries[id].complete))};page='quiz';break;
      case 'export':exportFile();return;
      case 'import':document.getElementById('import-file').click();return;
      default:return;
    }
    save();render();focus();window.scrollTo({top:0,behavior:'instant'});
  }
  app.addEventListener('submit',event=>{
    if(event.target.id!=='start-form')return;event.preventDefault();
    try{
      if(state.payload.session&&(!session||E.stats(session,cards).done<E.stats(session,cards).total)&&!window.confirm('새 연습은 현재 이어 풀기를 교체해요. 누적 기록은 유지됩니다. 시작할까요?'))return;
      if(state.payload.session&&!session&&!state.backupCurrent())throw Error('예전 이어 풀기의 백업을 저장하지 못했어요. 먼저 파일로 백업해 주세요.');
      const form=new FormData(event.target);session=E.start(cards,{scope:form.get('scope'),count:form.get('count'),shuffle:form.has('shuffle')});roundId=newId();page='quiz';save();render();focus();
    }catch(error){notice.textContent=error.message;}
  });
  app.addEventListener('change',event=>{if(event.target.name!=='choice')return;try{session=E.select(session,cards,Number(event.target.value));save();render(event.target.id);}catch(error){notice.textContent=error.message;}});
  document.addEventListener('click',event=>{const button=event.target.closest('button[data-action]');if(!button||button.disabled)return;try{act(button.dataset.action,Number(button.dataset.index));}catch(error){notice.textContent=error.message;}});
  document.getElementById('import-file').addEventListener('change',async event=>{
    const file=event.target.files?.[0];event.target.value='';if(!file)return;
    const ticket=epoch,before=state.raw();
    try{if(file.size>4000000)throw Error('4MB 이하의 개편판 기록 파일을 선택해 주세요.');const raw=await file.text();if(ticket!==epoch||before!==state.raw())throw Error('계정이나 학습 기록이 바뀌었어요. 파일을 다시 선택해 주세요.');if(!window.confirm('현재 기록을 먼저 백업하고 파일의 누적 기록을 합칠까요? 이어 풀기는 파일의 회차로 바뀝니다.'))return;state.import(raw);session=state.session;roundId=state.roundId;page='home';render();notice.textContent='기록을 가져왔어요. 중복 기록은 학습 횟수에 더하지 않아요.';}catch(error){notice.textContent=error.message;}
  });
  render();
  if(window.location.protocol==='http:'||window.location.protocol==='https:'){
    if(!state.canUpload()){notice.textContent='원본 기록 백업을 저장하지 못해 계정 연결을 보류했어요. 기존 기록을 먼저 파일로 백업해 주세요.';return;}
    import('../../shared/study-sync.js?v=20261024-grammar1').then(module=>{
      const controller=module.connectStudySync({appId:'power-grammar',legacyKey:window.GrammarSiteState.key,mount:document.getElementById('account-sync'),getPayload:state.raw,createEmptyPayload:()=>M.stringify(M.empty()),validatePayload:raw=>M.parse(raw)!==null,mergePayload:M.merge,semanticPayload:M.semantic,
        applyPayload:(raw,metadata)=>{if(metadata?.accountSwitch)epoch++;const replaced=state.apply(raw,metadata,page!=='home');if(replaced){session=state.session;roundId=state.roundId;page='home';}render();},
        canUploadPayload:()=>state.canUpload()&&M.fits(state.raw()),summarizePayload:raw=>{const p=M.parse(raw);return p?'누적 채점 '+M.totals(p).attempts+'회'+(p.session?' · 이어 풀기 있음':''):'기록 형식 확인 필요';},hasLocalData:raw=>{const p=M.parse(raw);return Boolean(p&&(p.session||M.totals(p).attempts));}});
      state.attach(controller);
    }).catch(()=>{notice.textContent='계정 연결을 불러오지 못했어요. 학습은 이 기기에 저장되며 기록 백업도 사용할 수 있어요.';});
  }
})();
