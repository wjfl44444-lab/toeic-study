(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PowerGrammarRoute=api;})(typeof window!=='undefined'?window:globalThis,function(){
  const pools={};
  for(const scope of ['intransitive-verbs','transitive-intransitive','second-pattern','fourth-pattern','fifth-pattern'])pools[scope]='forms';
  for(const scope of ['verb-arguments','verb-that','verb-to-infinitive','object-to-infinitive','noun-to-infinitive','adjective-to-infinitive','verb-gerund','prep-gerund','gerund-patterns','mixed-verb-patterns'])pools[scope]='connections';
  pools['verb-prep']='prepositions';pools.inversion='patterns';pools['other-grammar']='patterns';
  function launch(group,scope){return group==='grammar-structures'?'grammar/'+(pools[scope]?'?scope='+pools[scope]:''):null;}
  function include(group,scope,assigned){return assigned.group!=='grammar-structures'&&(group==='all'||assigned.group===group)&&(scope==='all'||assigned.scope===scope);}
  return {count:556,launch,include};
});
