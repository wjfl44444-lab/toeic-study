(function (root) {
  "use strict";

  // Classification lives outside questions.js: historical question fingerprints
  // include every property of the original question and must remain unchanged.
  var groups = [
    { id: "grammar-structures", label: "문형·구조" },
    { id: "collocations", label: "Collocation · 어휘 결합" },
    { id: "word-forms", label: "어형·수식" },
    { id: "time-expressions", label: "시제·시간 표현" },
    { id: "sentence-links", label: "문장 연결" },
    { id: "meanings", label: "의미 구별·재표현" }
  ];
  var subscopes = [];
  function add(group, definitions) {
    definitions.forEach(function (definition) {
      subscopes.push({ id: definition[0], label: definition[1], group: group });
    });
  }
  add("grammar-structures", [
    ["intransitive-verbs", "완전자동사"],
    ["verb-prep", "동사 + 전치사·구동사"],
    ["transitive-intransitive", "자·타동사 혼용"],
    ["second-pattern", "2형식 동사"],
    ["fourth-pattern", "4형식 동사"],
    ["fifth-pattern", "5형식 동사"],
    ["verb-arguments", "목적어·보어와 동사 문형"],
    ["verb-that", "동사·표현 + that절"],
    ["verb-to-infinitive", "동사 + to부정사"],
    ["object-to-infinitive", "동사 + 목적어 + to부정사"],
    ["noun-to-infinitive", "명사 + to부정사"],
    ["adjective-to-infinitive", "be + 형용사·p.p. + to부정사"],
    ["verb-gerund", "동사 + 동명사"],
    ["prep-gerund", "전치사 + 동명사"],
    ["gerund-patterns", "그 밖의 V-ing 구조"],
    ["inversion", "도치"],
    ["other-grammar", "그 밖의 문형·구조"]
  ]);
  add("collocations", [
    ["verb-noun", "동사 + 명사"], ["adj-noun", "형용사 + 명사"],
    ["adv-verb", "부사 + 동사"], ["adv-adj", "부사 + 형용사·분사"],
    ["adj-prep", "형용사 + 전치사"], ["noun-prep", "명사 + 전치사"],
    ["prep-noun", "전치사 + 명사"], ["fixed-collocations", "그 밖의 고정 결합"]
  ]);
  add("word-forms", [
    ["countability", "가산·불가산명사"], ["noun-forms", "대표 명사 어형"],
    ["compound-nouns", "복합명사"], ["participial-adjectives", "분사형 형용사"],
    ["adjective-forms", "형용사 어형·수식"], ["noun-modifiers", "명사를 꾸미는 표현"],
    ["quantity-forms", "수량 표현·명사 수식"], ["number-modifiers", "숫자를 수식하는 표현"],
    ["comparison-modifiers", "비교급·최상급·원급 강조"]
  ]);
  add("time-expressions", [
    ["time-phrases", "시간·순서 표현"], ["tense-expressions", "시제와 관련된 표현"]
  ]);
  add("sentence-links", [
    ["link-prepositions", "전치사·전치사구"], ["conjunctions", "접속사·상관접속사"],
    ["linking-adverbs", "접속부사·연결 표현"], ["reduced-clauses", "접속사 + 축약절"]
  ]);
  add("meanings", [
    ["multi-pos", "다품사어"], ["polysemy", "다의어"],
    ["confusable-words", "혼동 어휘·같은 품사 뜻 구별"],
    ["paraphrasing", "재표현·패러프레이징"], ["core-meanings", "핵심 어휘·의미 구별"],
    ["conversation-expressions", "대화·안내 표현"]
  ]);

  var byScope = Object.create(null);
  subscopes.forEach(function (scope) { byScope[scope.id] = scope; });
  function result(scope) {
    var entry = byScope[scope];
    return entry ? { group: entry.group, scope: entry.id } : { group: "meanings", scope: "core-meanings" };
  }
  var overrides = Object.create(null);
  function assign(scope, keys) {
    keys.trim().split(/\s+/).filter(Boolean).forEach(function (key) {
      if (overrides[key] && overrides[key] !== scope) { throw new Error("Conflicting taxonomy target: " + key); }
      overrides[key] = scope;
    });
  }

  // Reviewed exceptions in early topical chapters. Extras are not blindly
  // inherited from the parent entry (e.g. noun comment vs. verb comment on).
  assign("compound-nouns", "e0004-x1 e0042-x6");
  assign("adj-noun", "e0004-x2 e0004-x3 e0042-x4 e0042-x5 e0052-x3 e0052-x4 e0065-x1 e0065-x2 e0065-x3 e0235-x2 e0235-x3 e0379-x1 e0389-x1 e0389-x2 e0389-x3 e0389-x4 e0389-x5");
  assign("core-meanings", "e0011-x1 e0011-x2 e0065-x4 e0090-x3 e0107-x7 e0227-x1 e0232-x1 e0232-x2 e0243-x1 e0243-x2 e0277-x1 e0285-x1 e0388-x1 e0388-x2 e0388-x3 e0388-x4 e0388-x5 e0388-x6 e0446-x2");
  assign("verb-that", "e0019-x2 e0379-x2 e0404-x1 e0417-x1 e0440-x1");
  assign("verb-prep", "e0019-x3 e0159-x4 e0159-x5 e0376-s2 e0454-x1 e0468-x1");
  assign("adj-prep", "e0042-x3 e0120-x2");
  assign("time-phrases", "e0059-x2 e0141-x1 e0677-x3 e0677-x4");
  assign("noun-prep", "e0059-x3 e0327-x2 e0678-x1 e0688-x1");
  assign("prep-noun", "e0067-x4 e0688-x2");
  assign("quantity-forms", "e0091-x7");
  assign("adv-adj", "e0100-x1 e0180-x1 e0180-x2 e0180-x4");
  assign("adjective-forms", "e0111-x1 e0111-x2 e0111-x3 e0111-x4 e0111-x5");
  assign("tense-expressions", "e0111-x6 e0111-x7 e0111-x8");
  assign("verb-arguments", "e0113-x2 e0113-x3 e0142-x1 e0231-x1 e0251-x1 e0259-x1 e0259-x2 e0266-x2 e0268-x1 e0268-x2 e0458-x1");
  assign("participial-adjectives", "e0120-x3 e0120-x4 e0120-x5 e0405-x1 e0405-x2");
  assign("number-modifiers", "e0180-x3");
  assign("adv-verb", "e0180-x5 e0195-x3 e0196-x3 e0196-x4 e0196-x5 e0268-x4 e0268-x5");
  assign("verb-noun", "e0236-x1 e0236-x2 e0236-x4 e0236-x5 e0240-x1 e0240-x2 e0240-x3 e0268-x3 e0270-x1 e0270-x2 e0270-x3 e0397-x1 e0397-x2 e0677-x2");
  assign("paraphrasing", "e0239-x1 e0249-x2");
  assign("fixed-collocations", "e0249-x1");
  assign("noun-prep", "e0236-x3");
  assign("noun-to-infinitive", "e0677-x1");
  assign("verb-arguments", "e0698-x2 e0711-x2 e0713-x2 e0713-x3");

  // Fixed time phrases keep their temporal learning point rather than merely
  // inheriting the printed 'preposition + noun' chapter.
  assign("time-phrases", "e0303 e0304 e0324 e0331 e0331-x1 e0331-x2 e0338 e0361 e0369 e0370");
  assign("linking-adverbs", "e0339");

  // Reviewed LC/RC targets: these chapters mix lexical meanings, compounds,
  // syntax and discourse; their printed chapter numbers are not a skill type.
  assign("core-meanings", "e0716 e0718 e0720 e0723 e0724 e0725 e0726 e0727 e0728 e0728-x1 e0730 e0731 e0732 e0733 e0733-x1 e0733-x2 e0733-x3 e0733-x4 e0733-x5 e0734 e0735 e0740 e0741 e0741-x1 e0742 e0743 e0744 e0745 e0747 e0748 e0749 e0750 e0751 e0752 e0753 e0807-x1 e0836 e0837-x1 e0838-x1 e0843 e0858-x1 e0858-x2 e0906");
  assign("compound-nouns", "e0719 e0729 e0736 e0769 e0769-x1 e0769-x2 e0769-x3 e0771 e0809-x1 e0829 e0829-x1 e0845 e0908");
  assign("quantity-forms", "e0747-x1");
  assign("noun-modifiers", "e0805");
  assign("verb-prep", "e0717 e0721 e0722 e0738 e0746-x1 e0760 e0760-x1 e0760-x2 e0760-x3 e0764 e0772 e0773 e0773-x1 e0775 e0776 e0786 e0798 e0802 e0804 e0812 e0823 e0823-x2 e0823-x3 e0824-x1 e0829-x2 e0837 e0838 e0839 e0839-x1 e0846 e0855 e0857 e0857-x1 e0857-x2 e0861 e0895 e0895-x1 e0898 e0918");
  assign("other-grammar", "e0746 e0774 e0779 e0784-x3 e0785 e0793 e0794 e0796 e0796-x1 e0806 e0811 e0852 e0853 e0853-x1 e0853-x2 e0853-x3 e0862 e0867 e0880 e0896 e0910 e0920");
  assign("verb-noun", "e0722-x1 e0737 e0766 e0793-x1 e0793-x2 e0793-x3 e0797 e0807 e0809 e0814 e0817 e0831 e0912");
  assign("prep-noun", "e0739 e0739-x1 e0754 e0800 e0808 e0825 e0854-x1 e0859 e0863-x1 e0864 e0871 e0877 e0911 e0915 e0916 e0924 e0924-x1");
  assign("link-prepositions", "e0755 e0778 e0801 e0850 e0851 e0863 e0868 e0873 e0881 e0884 e0897 e0913-x1");
  assign("gerund-patterns", "e0756 e0818");
  assign("verb-to-infinitive", "e0758 e0790-x3 e0810");
  assign("time-phrases", "e0759 e0763 e0765 e0799 e0799-x1 e0799-x2 e0799-x3 e0799-x4 e0819 e0820 e0827 e0827-x1 e0834 e0834-x1 e0854 e0883 e0889 e0889-x1 e0889-x2 e0889-x3 e0889-x5 e0892 e0902 e0916-x3 e0925");
  assign("tense-expressions", "e0761 e0780 e0789");
  assign("adj-prep", "e0762 e0762-x1 e0762-x2 e0777");
  assign("quantity-forms", "e0762-x3 e0770 e0770-x1 e0770-x2 e0770-x3 e0770-x4 e0770-x5 e0841 e0841-x1 e0841-x2 e0841-x3 e0872 e0890");
  assign("adj-noun", "e0767 e0821 e0844 e0858 e0885 e0886 e0905 e0916-x1 e0916-x2");
  assign("adjective-to-infinitive", "e0768 e0824 e0842 e0899");
  assign("object-to-infinitive", "e0781");
  assign("verb-arguments", "e0757 e0781-x1 e0813 e0822 e0822-x1 e0826 e0846-x1 e0917 e0917-x1");
  assign("noun-prep", "e0782 e0840 e0860");
  assign("conversation-expressions", "e0783 e0784 e0784-x1 e0784-x2 e0787 e0788 e0788-x1 e0788-x2 e0791 e0792 e0832 e0849-x1 e0865 e0893 e0922 e0923");
  assign("verb-that", "e0790 e0790-x2 e0823-x1 e0828 e0856 e0869 e0878 e0921");
  assign("linking-adverbs", "e0790-x1 e0803 e0815 e0820-x1 e0833 e0833-x1 e0849 e0900 e0914");
  assign("conjunctions", "e0793-x4 e0870 e0887 e0904 e0907 e0913");
  assign("noun-to-infinitive", "e0795");
  assign("fixed-collocations", "e0807-x2 e0847");
  assign("adv-adj", "e0816 e0882");
  assign("prep-noun", "e0848");
  assign("reduced-clauses", "e0866 e0866-x1 e0866-x2 e0866-x3 e0866-x4 e0866-x5 e0866-x6 e0874 e0875 e0876 e0876-x1 e0879");
  assign("participial-adjectives", "e0888 e0888-x1 e0901");
  assign("prep-noun", "e0889-x4");
  assign("number-modifiers", "e0891");
  assign("prep-gerund", "e0894 e0903-x1 e0903-x2");
  assign("verb-to-infinitive", "e0903");
  assign("adjective-forms", "e0909 e0919");

  var stepDefaults = {
    1: "verb-noun", 2: "verb-noun", 3: "verb-noun", 4: "adj-noun",
    5: "adv-verb", 6: "adv-verb", 7: "adv-adj", 8: "verb-prep", 9: "verb-prep",
    10: "prep-noun", 11: "prep-noun", 12: "noun-prep", 13: "adj-prep", 14: "adj-prep",
    15: "multi-pos", 16: "multi-pos", 17: "multi-pos", 18: "polysemy", 19: "polysemy",
    20: "compound-nouns", 21: "other-grammar", 22: "core-meanings", 23: "core-meanings",
    24: "core-meanings", 25: "core-meanings", 26: "core-meanings", 27: "core-meanings",
    28: "paraphrasing", 29: "paraphrasing", 30: "paraphrasing"
  };
  // Only explicit argument templates are taken out of a multi-POS chapter;
  // ordinary noun/verb senses remain together in the meaning category.
  var structuralOverrides = {
    "e0492-x1": "fourth-pattern", "e0492-x2": "fourth-pattern",
    "e0492-x3": "fourth-pattern", "e0492-x4": "fourth-pattern",
    "e0492-x5": "fourth-pattern", "e0698-x2": "fourth-pattern",
    "e0539-x2": "fifth-pattern", "e0917-x1": "fifth-pattern",
    "e0813": "second-pattern"
  };
  function clean(value) { return String(value || "").replace(/\s+/g, " ").trim(); }
  function expressionOf(q) { return clean(q && q.answerSummary && q.answerSummary.expression || q && q.source && q.source.headword); }
  function classify(q) {
    var source = q && q.source || {}, step = Number(source.step);
    if (source.book === "quickstart" && byScope[source.scope]) { return result(source.scope); }
    var key = clean(source.target || source.unit), base = key.replace(/-s\d+$/, "");
    var expression = expressionOf(q), lower = expression.toLowerCase();
    if (structuralOverrides[key]) { return result(structuralOverrides[key]); }
    // Keep the agreed dedicated units together, including individual senses.
    if (step >= 15 && step <= 19 || step === 20 || step >= 28 && step <= 30) { return result(stepDefaults[step]); }
    if (overrides[key] || overrides[base]) { return result(overrides[key] || overrides[base]); }
    // These patterns inspect the canonical short learning target, NOT example
    // sentences or explanations. Bare V is a textbook placeholder, not a word.
    if (/\bthat\b/i.test(expression)) { return result("verb-that"); }
    if (/\bto V(?![\w-])/.test(expression)) {
      if (/\b(?:someone|somebody|사람|목적어)\b|\bwould like someone\b/.test(expression)) { return result("object-to-infinitive"); }
      if (/^be\s/i.test(expression)) { return result("adjective-to-infinitive"); }
      if (/^(?:ability|right|opportunity|way|plan|proposal|decision|willingness|intention|time|need|aim|attempt|pledge) to V$/.test(expression)) {
        if (/\b(?:v\.|동사)\b/.test(clean(q && q.learningPoint)) || /-s2$/.test(key) && /^(?:aim|attempt|need)/.test(expression) || /-s1$/.test(key) && /^pledge/.test(expression)) { return result("verb-to-infinitive"); }
        return result("noun-to-infinitive");
      }
      return result("verb-to-infinitive");
    }
    if (/V-ing/.test(expression)) {
      if (/(?:\bto|\bof|\bin|\bby|\bafter|\bbefore|\bwithout|\bdespite) V-ing/.test(expression)) { return result("prep-gerund"); }
      if (/^(?:enjoy|avoid|delay|include|finish|quit|consider|suggest|recommend|begin|prefer|forget|remember|go on) V-ing$/.test(expression)) { return result("verb-gerund"); }
      return result("gerund-patterns");
    }
    if (/\b(?:A|B)\b/.test(expression) && step === 21) { return result("verb-arguments"); }
    if (step === 21 && /^(?:agree|decide|strive) (?:with|on|to|for)$/.test(lower)) { return result("verb-prep"); }
    if (step === 21 && lower === "be aimed at") { return result("verb-prep"); }
    if (step === 21 && /^(?:right across|way above|way below)/.test(lower)) { return result("adjective-forms"); }
    // Plain extra words in a combination chapter are lexical targets rather
    // than evidence that a matching combination exists.
    if (step <= 14 && /-x\d+(?:-s\d+)?$/.test(key) && /^[a-z]+(?:-[a-z]+)?$/i.test(expression)) { return result("core-meanings"); }
    return result(stepDefaults[step] || "core-meanings");
  }

  var legacy = {
    "verb-noun": "verb-noun", "adj-noun": "adj-noun", "adv-verb": "adv-verb", "adv-adj": "adv-adj",
    "verb-prep": "verb-prep", "prep-noun": "prep-noun", "noun-prep": "noun-prep", "adj-prep": "adj-prep",
    "multi-pos": "multi-pos", "polysemy": "polysemy", "compound-nouns": "compound-nouns", "paraphrasing": "paraphrasing"
  };
  function normalizeLegacy(value) {
    var text = clean(value), number = /^(?:step\s*)?(\d+)$/i.exec(text);
    if (/^group-/.test(text) && groups.some(function (group) { return group.id === text.slice(6); })) { return { group: text.slice(6), scope: "all" }; }
    if (number) {
      var step = Number(number[1]);
      if (step >= 22 && step <= 27) { return { group: "all", scope: "all" }; }
      if (step === 21) { return { group: "grammar-structures", scope: "all" }; }
      return stepDefaults[step] ? result(stepDefaults[step]) : { group: "all", scope: "all" };
    }
    if (byScope[text]) { return result(text); }
    if (legacy[text]) { return result(legacy[text]); }
    if (text === "verb-patterns") { return { group: "grammar-structures", scope: "all" }; }
    if (groups.some(function (group) { return group.id === text; })) { return { group: text, scope: "all" }; }
    // LC/RC were source-book pools rather than coherent skills. Preserve the
    // active saved round, but use the complete pool for the next fresh round.
    return { group: "all", scope: "all" };
  }
  var api = { version: "20261022-six-groups-1", groups: groups, subscopes: subscopes,
    classify: classify, normalizeLegacy: normalizeLegacy };
  if (typeof module === "object" && module.exports) { module.exports = api; }
  if (root) { root.PowerVocaTaxonomy = api; }
})(typeof window !== "undefined" ? window : null);
