(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.PowerVocaUsageRouting=api;
})(typeof window!=='undefined'?window:null,function(){
  'use strict';
  function createTaxonomy(base,review){
    if(!base||!review||!Array.isArray(review.subscopes)||!review.assignments)return base;
    var updated=new Set(['word-forms','sentence-links']);
    var subscopes=base.subscopes.filter(function(s){return !updated.has(s.group);}).concat(review.subscopes);
    var byId=new Map(subscopes.map(function(s){return [s.id,s];}));
    return {
      version:base.version+'-usage1',groups:base.groups,subscopes:subscopes,
      classify:function(q){return review.assignments[q&&q.id]||base.classify(q);},
      normalizeLegacy:function(value){
        var direct=byId.get(String(value||''));
        if(direct)return {group:direct.group,scope:direct.id};
        var previous=base.normalizeLegacy(value);
        if(!updated.has(previous.group)||previous.scope==='all')return previous;
        var alias=review.aliases&&review.aliases[previous.scope];
        var target=byId.get(alias);
        return target?{group:target.group,scope:target.id}:{group:previous.group,scope:'all'};
      }
    };
  }
  return {createTaxonomy:createTaxonomy};
});
