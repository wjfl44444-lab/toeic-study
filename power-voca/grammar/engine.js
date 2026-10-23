(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.GrammarEngine=api;
})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';
  const VERSION=1;
  const copy=value=>JSON.parse(JSON.stringify(value));
  function grade(selected,correct){
    return Array.isArray(selected)&&new Set(selected).size===selected.length&&selected.length===correct.length&&correct.every(i=>selected.includes(i));
  }
  function shuffled(values,random){
    const out=[...values];
    for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}
    return out;
  }
  function signature(cards){
    const text=JSON.stringify(cards);let hash=2166136261;
    for(let i=0;i<text.length;i++)hash=Math.imul(hash^text.charCodeAt(i),16777619);
    return (hash>>>0).toString(16);
  }
  function start(cards,settings={},random=Math.random){
    const {scope='all',count='all',shuffle=true,onlyIds=null}=settings;
    let pool=cards.filter(c=>(scope==='all'||c.pool===scope)&&(!onlyIds||onlyIds.includes(c.id)));
    if(!pool.length)throw Error('선택한 범위에 풀 문항이 없어요.');
    if(count!=='all'&&(!Number.isInteger(Number(count))||Number(count)<1))throw Error('문제 수를 확인해 주세요.');
    if(shuffle)pool=shuffled(pool,random);
    if(count!=='all')pool=pool.slice(0,Number(count));
    const entries=Object.fromEntries(pool.map(c=>[c.id,{stage:0,view:0,answers:[],drafts:c.stages.map(()=>[]),complete:false,orders:c.stages.map(s=>{
      const order=s.options.map((_,i)=>i);return shuffle&&!s.fixedOrder?shuffled(order,random):order;
    })}]));
    return {version:VERSION,signature:signature(cards),scope,shuffle,ids:pool.map(c=>c.id),cursor:0,entries};
  }
  function parts(session,cards){
    const id=session.ids[session.cursor],card=cards.find(c=>c.id===id),entry=session.entries[id];
    if(!card||!entry)throw Error('문항을 찾을 수 없어요.');
    return {id,card,entry,stage:card.stages[entry.view]};
  }
  function current(session,cards){
    const {card,entry,stage}=parts(session,cards);
    const locked=entry.complete||entry.view<entry.stage;
    return {card,stage,stageIndex:entry.view,activeStage:entry.stage,complete:entry.complete,locked,
      selected:locked?(entry.answers[entry.view]?.selected||[]):entry.drafts[entry.view],
      order:entry.orders[entry.view],
      feedback:entry.complete?{passed:entry.answers.length===card.stages.length&&entry.answers.every(a=>a.correct),answers:entry.answers}:null};
  }
  function select(session,cards,index){
    const q=current(session,cards);
    if(q.locked)throw Error('이미 제출한 단계는 바꿀 수 없어요.');
    if(!Number.isInteger(index)||index<0||index>=q.stage.options.length)throw Error('보기를 확인해 주세요.');
    const out=copy(session),entry=out.entries[q.card.id],selected=entry.drafts[entry.view];
    entry.drafts[entry.view]=q.stage.mode==='multi'?(selected.includes(index)?selected.filter(v=>v!==index):[...selected,index]):[index];
    return out;
  }
  function submit(session,cards){
    const q=current(session,cards);
    if(q.locked)throw Error('이미 제출한 단계예요.');
    if(!q.selected.length)throw Error('답을 먼저 선택해 주세요.');
    const out=copy(session),e=out.entries[q.card.id];
    const correct=grade(q.selected,q.stage.correct);
    e.answers.push({selected:[...q.selected],correct});
    if((e.stage===0&&!correct)||e.stage===q.card.stages.length-1)e.complete=true;
    else {e.stage++;e.view=e.stage;}
    return out;
  }
  function viewStage(session,cards,index){
    const {card,entry}=parts(session,cards);
    const highest=entry.complete?entry.answers.length-1:entry.stage;
    if(!Number.isInteger(index)||index<0||index>highest)throw Error('아직 열리지 않은 단계예요.');
    const out=copy(session);out.entries[card.id].view=index;return out;
  }
  function move(session,cards,delta){
    parts(session,cards);
    const out=copy(session);out.cursor=Math.max(0,Math.min(out.ids.length-1,out.cursor+delta));return out;
  }
  function defer(session,cards){
    const {entry}=parts(session,cards);
    if(entry.complete)return move(session,cards,1);
    const out=copy(session),[id]=out.ids.splice(out.cursor,1);
    out.ids.push(id);out.cursor=Math.min(out.cursor,out.ids.length-1);return out;
  }
  function stats(session,cards){
    let cardsCorrect=0,cardsWrong=0,stagesAttempted=0,stagesCorrect=0;
    for(const id of session.ids){
      const e=session.entries[id],c=cards.find(c=>c.id===id);
      // Partial meaning scores must remain private until the card's final submission.
      if(e.complete){
        stagesAttempted+=e.answers.length;stagesCorrect+=e.answers.filter(a=>a.correct).length;
        if(e.answers.length===c.stages.length&&e.answers.every(a=>a.correct))cardsCorrect++;else cardsWrong++;
      }
    }
    return {total:session.ids.length,done:cardsCorrect+cardsWrong,cardsCorrect,cardsWrong,stagesAttempted,stagesCorrect};
  }
  function retry(session,cards,settings={}){
    if(session.ids.some(id=>!session.entries[id].complete))throw Error('남은 문항을 먼저 마친 뒤 오답을 복습해 주세요.');
    const ids=session.ids.filter(id=>{const e=session.entries[id],c=cards.find(c=>c.id===id);return e.complete&&!(e.answers.length===c.stages.length&&e.answers.every(a=>a.correct));});
    return start(cards,{scope:session.scope,count:'all',shuffle:session.shuffle,...settings,onlyIds:ids});
  }
  function serialize(session,cards){
    if(session.signature!==signature(cards))throw Error('문항 버전이 달라 저장할 수 없어요.');
    return JSON.stringify(session);
  }
  function restore(text,cards){
    try{
      const saved=JSON.parse(text);
      if(saved.version!==VERSION||saved.signature!==signature(cards)||typeof saved.shuffle!=='boolean'||!['all','forms','connections','prepositions','patterns'].includes(saved.scope))return null;
      if(!Array.isArray(saved.ids)||!saved.ids.length||new Set(saved.ids).size!==saved.ids.length||!Number.isInteger(saved.cursor)||saved.cursor<0||saved.cursor>=saved.ids.length)return null;
      let out=start(cards,{scope:saved.scope,count:'all',shuffle:false,onlyIds:saved.ids});
      if(out.ids.length!==saved.ids.length)return null;
      out.ids=[...saved.ids];out.shuffle=saved.shuffle;
      for(const [cursor,id] of saved.ids.entries()){
        const c=cards.find(c=>c.id===id),e=saved.entries[id];
        if(!e||!Array.isArray(e.answers)||e.answers.length>c.stages.length||!Array.isArray(e.orders)||e.orders.length!==c.stages.length||!Array.isArray(e.drafts)||e.drafts.length!==c.stages.length)return null;
        out.cursor=cursor;
        for(let i=0;i<c.stages.length;i++){
          const order=e.orders[i],n=c.stages[i].options.length;
          if(!Array.isArray(order)||order.length!==n||new Set(order).size!==n||!order.every(a=>Number.isInteger(a)&&a>=0&&a<n))return null;
          if(c.stages[i].fixedOrder&&order.some((v,j)=>v!==j))return null;
          out.entries[id].orders[i]=[...order];
        }
        for(const answer of e.answers){
          if(current(out,cards).complete)return null;
          const indices=answer.selected,stage=current(out,cards).stage;
          if(!Array.isArray(indices)||!indices.length||new Set(indices).size!==indices.length||(stage.mode==='single'&&indices.length!==1))return null;
          for(const index of indices)out=select(out,cards,index);
          out=submit(out,cards);
        }
        const actual=out.entries[id];
        if(e.stage!==actual.stage||e.complete!==actual.complete)return null;
        // Only unsubmitted drafts affect future grading; submitted answers above are authoritative.
        if(!actual.complete){
          const draft=e.drafts[actual.stage],s=c.stages[actual.stage];
          if(!Array.isArray(draft)||new Set(draft).size!==draft.length||(s.mode==='single'&&draft.length>1))return null;
          for(const index of draft)out=select(out,cards,index);
        }
        out=viewStage(out,cards,e.view);
      }
      out.cursor=saved.cursor;return out;
    }catch{return null;}
  }
  return {grade,start,current,select,submit,viewStage,move,defer,stats,retry,serialize,restore,signature};
});
