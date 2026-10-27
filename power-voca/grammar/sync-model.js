(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./engine.js'):root.GrammarEngine);if(typeof module==='object'&&module.exports)module.exports=api;else root.GrammarSyncModel=api;})(typeof window!=='undefined'?window:globalThis,function(E){
  'use strict';
  const fields=['attempts','correct','stagesGraded','stagesCorrect'],LIMIT=999999999;
  const clone=v=>JSON.parse(JSON.stringify(v));
  const obj=v=>v&&typeof v==='object'&&!Array.isArray(v);
  const key=v=>typeof v==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9_.:@-]{0,259}$/.test(v)&&!['__proto__','constructor','prototype'].includes(v);
  const count=v=>Number.isSafeInteger(v)&&v>=0&&v<=LIMIT;
  const stamp=v=>typeof v==='string'&&v.length<=30&&Number.isFinite(Date.parse(v));
  function empty(){return {kind:'power-grammar',version:1,session:null,roundId:null,counted:[],history:{}};}
  function sessionValid(s){
    if(s===null)return true;
    if(!obj(s)||s.version!==1||!key(s.signature)||!['all','forms','connections','prepositions','patterns'].includes(s.scope)||typeof s.shuffle!=='boolean'||!Array.isArray(s.ids)||!s.ids.length||s.ids.length>2000||new Set(s.ids).size!==s.ids.length||!s.ids.every(key)||!obj(s.entries)||!Number.isInteger(s.cursor)||s.cursor<0||s.cursor>=s.ids.length)return false;
    if(Object.keys(s.entries).length!==s.ids.length)return false;
    return s.ids.every(id=>{
      const e=s.entries[id];
      if(!obj(e)||!Array.isArray(e.orders)||e.orders.length<1||e.orders.length>12||!Array.isArray(e.drafts)||e.drafts.length!==e.orders.length||!Array.isArray(e.answers)||!Number.isInteger(e.stage)||e.stage<0||e.stage>=e.orders.length||!Number.isInteger(e.view)||e.view<0||e.view>e.stage||typeof e.complete!=='boolean'||e.answers.length!==(e.complete?e.stage+1:e.stage))return false;
      return e.orders.every((order,i)=>{
        const selected=e.drafts[i],answer=e.answers[i],n=order?.length;
        const choice=values=>Array.isArray(values)&&new Set(values).size===values.length&&values.every(v=>Number.isInteger(v)&&v>=0&&v<n);
        return Array.isArray(order)&&n>=4&&n<=5&&new Set(order).size===n&&order.every(v=>Number.isInteger(v)&&v>=0&&v<n)&&choice(selected)&&(!answer||(obj(answer)&&typeof answer.correct==='boolean'&&choice(answer.selected)&&answer.selected.length>0));
      });
    });
  }
  function validRecord(r){return obj(r)&&key(r.id)&&key(r.signature)&&fields.every(f=>count(r[f]))&&r.correct<=r.attempts&&r.stagesGraded>=r.attempts&&r.stagesGraded<=r.attempts*12&&r.stagesCorrect<=r.stagesGraded&&r.stagesCorrect>=r.correct&&stamp(r.lastAt);}
  function parse(raw){
    try{
      if(typeof raw!=='string'||raw.length>4000000)return null;
      const p=JSON.parse(raw);
      if(!obj(p)||p.kind!=='power-grammar'||p.version!==1||!sessionValid(p.session)||!obj(p.history)||Object.keys(p.history).length>10000||!Array.isArray(p.counted)||new Set(p.counted).size!==p.counted.length||p.counted.some(id=>!key(id)||!validRecord(p.history[id])||!p.session?.ids.includes(p.history[id].id))||(p.session?!key(p.roundId):p.roundId!==null||p.counted.length))return null;
      const out=empty();out.session=p.session;out.roundId=p.roundId;out.counted=p.counted.slice();
      for(const id of Object.keys(p.history).sort()){const r=p.history[id];if(!key(id)||!validRecord(r)||id!==r.id+'@'+r.signature)return null;out.history[id]={id:r.id,signature:r.signature,...Object.fromEntries(fields.map(f=>[f,r[f]])),lastAt:r.lastAt};}
      if(p._studySync!==undefined){const r=p._studySync;if(!obj(r)||r.version!==1||!Array.isArray(r.commits)||r.commits.length>256||new Set(r.commits).size!==r.commits.length||!r.commits.every(id=>typeof id==='string'&&/^[a-zA-Z0-9-]{8,100}$/.test(id)))return null;out._studySync={version:1,commits:r.commits.slice()};}
      return out;
    }catch{return null;}
  }
  function stringify(p){const raw=JSON.stringify(p);const checked=parse(raw);if(!checked)throw Error('문형·구조 기록 형식을 확인할 수 없어요. 원본은 보존합니다.');return JSON.stringify(checked);}
  function semantic(raw){const p=parse(raw);if(!p)throw Error('Invalid grammar payload');delete p._studySync;return stringify(p);}
  function totals(p){return Object.values(p.history).reduce((a,r)=>{for(const f of fields)a[f]+=r[f];return a;},Object.fromEntries(fields.map(f=>[f,0])));}
  function checkpoint(previous,session,cards,roundId,now=new Date().toISOString()){
    const p=parse(stringify(previous));
    // Engine-created transitions are trusted; replay is only for external restore/import.
    if(session?.signature!==E.signature(cards)||!sessionValid(session))throw Error('진행 중인 문항 기록을 확인할 수 없어요.');
    if(p.roundId!==roundId)p.counted=[];
    p.session=clone(session);p.roundId=roundId;
    for(const id of session.ids){const e=session.entries[id];if(!e.complete)continue;
      const c=cards.find(c=>c.id===id),signature=E.signature([c]),historyKey=id+'@'+signature;
      if(p.counted.includes(historyKey))continue;
      const r=p.history[historyKey]||{id,signature,attempts:0,correct:0,stagesGraded:0,stagesCorrect:0,lastAt:now};
      r.attempts++;r.correct+=Number(e.answers.length===c.stages.length&&e.answers.every(a=>a.correct));r.stagesGraded+=e.answers.length;r.stagesCorrect+=e.answers.filter(a=>a.correct).length;r.lastAt=now;
      p.history[historyKey]=r;p.counted.push(historyKey);
    }
    return parse(stringify(p));
  }
  function merge(baseRaw,localRaw,remoteRaw){
    const l=parse(localRaw),r=parse(remoteRaw),b=baseRaw===null?null:parse(baseRaw);
    if(!l||!r||baseRaw!==null&&!b)throw Error('Invalid grammar merge input');
    const out=clone(l);
    const sameRound=l.roundId!==null&&l.roundId===r.roundId&&l.session?.signature===r.session?.signature;
    const overlap=new Set(sameRound?l.counted.filter(id=>r.counted.includes(id)&&!(b?.roundId===l.roundId&&b.counted.includes(id))):[]);
    if(sameRound)out.counted=[...new Set([...l.counted,...r.counted])];
    for(const id of new Set([...Object.keys(l.history),...Object.keys(r.history),...Object.keys(b?.history||{})])){
      const left=l.history[id],right=r.history[id],base=b?.history[id],chosen=left||right||base;
      const item={id:chosen.id,signature:chosen.signature,lastAt:[left,right,base].filter(Boolean).map(v=>v.lastAt).sort().at(-1)};
      for(const f of fields){const old=base?.[f]||0,a=left?.[f]??old,z=right?.[f]??old;item[f]=b?Math.max(z,old)+Math.max(0,a-old):Math.max(a,z);}
      // If two devices finished the same shared round/card, the server's first
      // committed completion wins; don't add the local copy of that event again.
      if(b&&overlap.has(id)){
        const e=l.session.entries[chosen.id];
        if(e?.complete){const contribution={attempts:1,correct:Number(e.answers.length===e.orders.length&&e.answers.every(a=>a.correct)),stagesGraded:e.answers.length,stagesCorrect:e.answers.filter(a=>a.correct).length};for(const f of fields)item[f]-=contribution[f];}
      }
      out.history[id]=item;
    }
    const commits=[...new Set([...(b?._studySync?.commits||[]),...(l._studySync?.commits||[]),...(r._studySync?.commits||[])])].slice(-256);
    if(commits.length)out._studySync={version:1,commits};
    return stringify(out);
  }
  function fits(raw){return new TextEncoder().encode(raw).length<=819200;}
  return {empty,parse,stringify,semantic,totals,checkpoint,merge,fits};
});
