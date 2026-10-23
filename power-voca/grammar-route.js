(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PowerGrammarRoute=api;})(typeof window!=='undefined'?window:globalThis,function(){
  const pools={};
  for(const scope of ['intransitive-verbs','transitive-intransitive','second-pattern','fourth-pattern','fifth-pattern'])pools[scope]='forms';
  for(const scope of ['verb-arguments','verb-that','verb-to-infinitive','object-to-infinitive','noun-to-infinitive','adjective-to-infinitive','verb-gerund','prep-gerund','gerund-patterns','mixed-verb-patterns'])pools[scope]='connections';
  pools['verb-prep']='prepositions';pools.inversion='patterns';pools['other-grammar']='patterns';
  const choices=[{id:'intransitive-verbs',pool:'forms',label:'동사 형식 구별',count:75},{id:'verb-arguments',pool:'connections',label:'단어 뒤 연결',count:214},{id:'verb-prep',pool:'prepositions',label:'전치사·구동사',count:214},{id:'inversion',pool:'patterns',label:'표현별 어순·고정 문형',count:53}];
  function normalizeScope(scope){return choices.find(x=>x.pool===pools[scope])?.id||'all';}
  function launch(group,scope,settings={}){
    if(group!=='grammar-structures')return null;
    const p=new URLSearchParams({launch:settings.mode==='resume'?'resume':'new',scope:pools[scope]||'all',count:String(settings.count||'20'),shuffle:settings.shuffle===false?'0':'1'});
    return 'grammar/?'+p;
  }
  function request(search){
    const p=new URLSearchParams(search),mode=p.get('launch');if(mode!=='new'&&mode!=='resume')return null;
    const n=p.get('count'),scope=p.get('scope');
    return {mode,scope:['forms','connections','prepositions','patterns'].includes(scope)?scope:'all',count:n==='all'?'all':/^\d+$/.test(n||'')&&Number(n)>0&&Number(n)<=556?n:'20',shuffle:p.get('shuffle')!=='0'};
  }
  function include(group,scope,assigned){return assigned.group!=='grammar-structures'&&(group==='all'||assigned.group===group)&&(scope==='all'||assigned.scope===scope);}
  return {count:556,choices,normalizeScope,launch,request,include};
});
