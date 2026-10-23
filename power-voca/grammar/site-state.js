(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./engine.js'):root.GrammarEngine,typeof module==='object'&&module.exports?require('./sync-model.js'):root.GrammarSyncModel);if(typeof module==='object'&&module.exports)module.exports=api;else root.GrammarSiteState=api;})(typeof window!=='undefined'?window:globalThis,function(E,M){
  'use strict';const key='toeic-power-grammar:v1';let sequence=0;
  function create(cards,backend){
    let raw;try{raw=backend?.getItem(key)||null;}catch{raw=null;}
    let original=raw&&!M.parse(raw)?raw:null,sync=null;
    const state={payload:M.parse(raw)||M.empty(),session:null,roundId:null,error:original?'기기 기록 형식을 확인하지 못했어요. 원본을 백업한 후에만 새 기록을 저장해요.':''};
    function restore(){state.session=state.payload.session?E.restore(JSON.stringify(state.payload.session),cards):null;state.roundId=state.payload.roundId;}
    function backup(value){try{backend.setItem(key+':backup:'+Date.now()+'-'+(++sequence),value);return true;}catch{return false;}}
    function preserve(){if(!original)return true;if(!backup(original))return false;original=null;return true;}
    function persist(){if(!preserve())throw Error('원본 기록을 백업할 저장 공간이 없어요. 기존 기록은 바꾸지 않았어요.');const value=M.stringify(state.payload);if(sync){if(!sync.saveLocal(value))throw Error('기록 저장에 실패했어요. 화면을 닫지 말고 백업해 주세요.');}else try{backend.setItem(key,value);}catch{throw Error('기기 저장에 실패했어요. 화면을 닫지 말고 백업해 주세요.');}}
    state.raw=()=>M.stringify(state.payload);
    state.exportRaw=()=>original||state.raw();
    state.backupCurrent=()=>backup(original||state.raw());
    state.attach=value=>{sync=value;};
    state.canUpload=()=>preserve();
    state.commit=(session,roundId)=>{
      if(!preserve())throw Error('원본 백업을 저장하지 못했어요. 기존 기록은 보존합니다.');
      state.payload=M.checkpoint(state.payload,session,cards,roundId);state.session=session;state.roundId=roundId;persist();
    };
    state.apply=(value,metadata={},active=false)=>{
      const incoming=M.parse(value);if(!incoming)throw Error('계정 기록 형식이 올바르지 않아요.');
      const keep=active&&metadata.accountSwitch!==true&&metadata.reason!=='restore';
      state.payload=keep?M.parse(M.merge(null,state.raw(),value)):incoming;
      if(!keep)restore();
      return !keep;
    };
    state.import=value=>{
      if(!M.parse(value))throw Error('이 파일은 문형·구조 개편판 기록 파일이 아니에요.');
      if(!backup(original||state.raw()))throw Error('가져오기 전 기록 백업을 저장하지 못했어요.');
      const imported=M.parse(value),merged=M.parse(M.merge(null,state.raw(),value));
      merged.session=imported.session;merged.roundId=imported.roundId;merged.counted=imported.counted;
      state.payload=merged;original=null;restore();persist();
    };
    restore();return state;
  }
  return {create,key};
});
