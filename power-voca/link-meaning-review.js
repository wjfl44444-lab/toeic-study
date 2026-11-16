(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) { module.exports = api; }
  if (root) { root.PowerVocaLinkMeaningReview = api; }
})(typeof window !== "undefined" ? window : null, function () {
  "use strict";
  // Sentence-link cards that only asked for the structure now ask the meaning first,
  // like "in exchange for". New IDs replace the old cards for new rounds only:
  // old objects stay untouched, so saved rounds and records keep their fingerprints.
  var version = "20261116-linkmeaning1";
  var prefix = "semantic1-ui2-usage1-";
  // Meaning families: wrong choices never come from the answer's own family.
  // C cause/consideration, K concession/contrast, D condition, P purpose, A addition/order/restatement, O other.
  // Style A: preposition/conjunction meanings ("~ ..."); style B: sentence adverbs.
  var pool = {
    A: [["~ 때문에", "C"], ["~을 고려하면", "C"], ["~에도 불구하고", "K"], ["~인 반면에", "K"], ["~라면", "D"],
      ["~하지 않는다면", "D"], ["~하는 한", "D"], ["~할 수 있도록", "P"], ["~에 더하여", "A"], ["~ 대신에", "O"],
      ["~에 관하여", "O"], ["~와 상관없이", "O"]],
    B: [["그러므로, 따라서", "C"], ["그 결과로", "C"], ["그러나", "K"], ["반면에", "K"], ["그렇다 하더라도", "K"],
      ["그렇지 않으면", "D"], ["만일 그렇다면", "D"], ["이를 위하여", "P"], ["게다가", "A"], ["즉, 다시 말해", "A"],
      ["마찬가지로", "A"], ["우선 첫째로", "A"]]
  };
  // id suffix: [label used in the prompt, meaning, family, style]
  var specs = {
    "full-e0820-x1-meaning": ["in turn", "그 결과로, 결국에는", "C", "B"],
    "full-e0833-use": ["for one thing", "우선 한 가지는, 첫째로", "A", "B"],
    "full-e0833-x1-meaning": ["best of all", "무엇보다도", "A", "B"],
    "full-e0851-use": ["courtesy of", "~의 호의로, ~ 덕분에", "C", "A"],
    "full-e0868-use": ["due in part to", "일부 ~때문인, ~이 일부 요인인", "C", "A"],
    "full-e0900-meaning": ["last, but not least", "마지막이지만 못지않게 중요한 것으로", "A", "B"],
    "full-e0913-use": ["considering", "~을 고려하면, ~한 점을 감안하면", "C", "A"],
    "full-e0914-use": ["to this end", "이를 위하여, 그 목적을 위하여", "P", "B"],
    "qs-p111-nevertheless": ["nevertheless", "그럼에도 불구하고", "K", "B"],
    "qs-p165-despite-in-spite-of-notwithstanding": ["despite", "~에도 불구하고", "K", "A"],
    "qs-p165-due-to-because-of-owing-to": ["because of", "~ 때문에", "C", "A"],
    "qs-p165-thanks-to": ["thanks to", "~ 덕분에, ~ 때문에", "C", "A"],
    "qs-p166-because-as-since-now-that": ["because", "~ 때문에", "C", "A"],
    "qs-p167-although-though-even-though": ["although", "~에도 불구하고", "K", "A"],
    "qs-p167-as-long-as-so-long-as": ["as long as", "~하는 한, ~하기만 하면", "D", "A"],
    "qs-p167-considering-noun": ["considering", "~을 고려하여, 감안하면", "C", "A"],
    "qs-p167-considering-that": ["considering", "~을 고려하면, 감안하면", "C", "A"],
    "qs-p167-even-if": ["even if", "설령 ~하더라도", "K", "A"],
    "qs-p167-given-noun": ["given", "~을 고려하여, 감안하면", "C", "A"],
    "qs-p167-given-that": ["given that", "~을 고려하면, 감안하면", "C", "A"],
    "qs-p167-if-provided-that": ["provided (that)", "~라면", "D", "A"],
    "qs-p167-in-case-of-noun": ["in case of", "~의 경우에 대비하여", "D", "A"],
    "qs-p167-in-case-that": ["in case", "~의 경우에 대비하여", "D", "A"],
    "qs-p167-so-that-in-order-that": ["so that", "~할 수 있도록", "P", "A"],
    "qs-p167-unless": ["unless", "~하지 않는다면", "D", "A"],
    "qs-p167-whereas-while-contrast": ["while (대조)", "~인 반면에", "K", "A"],
    "qs-p168-besides": ["besides", "게다가", "A", "B"],
    "qs-p168-consequently": ["consequently", "그러므로, 따라서", "C", "B"],
    "qs-p168-even-so": ["even so", "그렇다 하더라도", "K", "B"],
    "qs-p168-furthermore": ["furthermore", "게다가", "A", "B"],
    "qs-p168-however": ["however", "그러나", "K", "B"],
    "qs-p168-in-addition": ["in addition", "게다가", "A", "B"],
    "qs-p168-in-contrast": ["in contrast", "대조적으로", "K", "B"],
    "qs-p168-in-other-words": ["in other words", "즉, 다시 말해", "A", "B"],
    "qs-p168-likewise": ["likewise", "마찬가지로", "A", "B"],
    "qs-p168-moreover": ["moreover", "게다가", "A", "B"],
    "qs-p168-namely": ["namely", "즉, 다시 말해", "A", "B"],
    "qs-p168-on-the-contrary": ["on the contrary", "반대로", "K", "B"],
    "qs-p168-on-the-other-hand": ["on the other hand", "반면에", "K", "B"],
    "qs-p168-otherwise": ["otherwise", "그렇지 않으면", "D", "B"],
    "qs-p168-similarly": ["similarly", "마찬가지로", "A", "B"],
    "qs-p168-therefore": ["therefore", "그러므로, 따라서", "C", "B"],
    "qs-p168-thus": ["thus", "그러므로, 따라서", "C", "B"],
    "qs-p168-to-that-end": ["to that end", "이를 위하여, 그 목적을 달성하기 위해", "P", "B"],
    "qs-p168-to-this-end": ["to this end", "이를 위하여, 그 목적을 달성하기 위해", "P", "B"]
  };
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function hash(text) {
    var h = 2166136261;
    for (var i = 0; i < text.length; i += 1) { h = Math.imul(h ^ text.charCodeAt(i), 16777619); }
    return h >>> 0;
  }
  // Three wrong meanings from three different families other than the answer's, chosen per card.
  function distractors(key, family, style) {
    var seed = hash(key), picked = [], used = Object.create(null);
    used[family] = true;
    var choices = pool[style];
    for (var step = 0; step < choices.length * 2 && picked.length < 3; step += 1) {
      var item = choices[(seed + step * 5) % choices.length];
      if (used[item[1]] || picked.indexOf(item[0]) !== -1) { continue; }
      used[item[1]] = true; picked.push(item[0]);
    }
    return picked;
  }
  function meaningStage(key, spec) {
    var label = spec[0], meaning = spec[1], wrong = distractors(key, spec[2], spec[3]);
    var answer = hash(key + "#answer") % 4, options = wrong.slice();
    options.splice(answer, 0, meaning);
    return {
      instruction: "뜻을 고르세요.", prompt: label + " 뜻은?", options: options, answer: answer, translation: "",
      explanation: label + "의 이 쓰임은 「" + meaning + "」에 해당해요.",
      optionReasons: options.map(function (option, index) {
        return index === answer ? "정답이에요. " + label + "의 이 쓰임은 「" + meaning + "」에 해당해요." : "이 쓰임의 뜻은 「" + option + "」와 달라요.";
      })
    };
  }
  function create(questions, classify, retired) {
    if (!Array.isArray(questions) || typeof classify !== "function") { throw new Error("Link meaning review requires a catalog and classifier"); }
    var byId = new Map(questions.map(function (q) { return [q.id, q]; }));
    var result = { version: version, questions: [], replacements: {}, assignments: {} };
    Object.keys(specs).forEach(function (key) {
      var oldId = prefix + key, original = byId.get(oldId), id = "semantic1-linkmeaning1-" + key;
      if (!original || retired && retired.has(oldId) || !Array.isArray(original.stages) || original.stages.length !== 1) { return; }
      if (byId.has(id)) { throw new Error("Link meaning review ID already exists: " + id); }
      var q = clone(original);
      q.id = id; q.sourceQuestionId = oldId; q.firstAnswerGate = false; q.stageMode = "set";
      q.stages = [meaningStage(key, specs[key]), clone(original.stages[0])];
      result.questions.push(q); result.replacements[oldId] = id;
      result.assignments[id] = clone(classify(original));
    });
    return result;
  }
  return { version: version, create: create, specs: specs, meaningStage: meaningStage };
});
