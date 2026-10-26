(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) { module.exports = api; }
  if (root) { root.PowerVocaQuestionCuration = api; }
})(typeof window !== "undefined" ? window : null, function () {
  "use strict";
  var version = "20261026-curation1";

  // Audited IDs only. This is a new-pool policy, never a saved-session migration.
  // Keep the original objects so old checkpoints retain their exact stages/answers.
  var groups = [
    {
      canonical: "usage1-full-e0887-meaning",
      retired: ["usage1-qs-p168-if-so"],
      group: "sentence-links", scope: "link-condition-purpose", kind: "equivalent-stages",
      reason: "if so의 같은 뜻 회상 문제이며 보기 순서만 달라요."
    },
    {
      canonical: "semantic1-ui2-usage1-full-e0790-x1-similar-1",
      retired: ["semantic1-ui2-usage1-full-e0790-x1-similar-2"],
      group: "sentence-links", scope: "link-other-relations", kind: "equivalent-stages",
      reason: "unfortunately의 같은 뜻 회상 문제이며 보기 순서만 달라요."
    },
    {
      canonical: "semantic1-ui2-usage1-full-e0833-use",
      retired: ["semantic1-ui2-usage1-full-e0833-similar-1", "semantic1-ui2-usage1-full-e0833-similar-2"],
      group: "sentence-links", scope: "link-addition-example", kind: "equivalent-stages",
      reason: "for one thing의 독립 문장 연결 구조를 똑같이 묻고 있어요."
    },
    {
      canonical: "semantic1-ui2-usage1-full-e0850-use",
      retired: [
        "semantic1-ui2-usage1-full-e0850-similar-1", "semantic1-ui2-usage1-full-e0850-similar-2",
        "semantic1-ui2-usage1-full-e0850-similar-3", "semantic1-ui2-usage1-full-e0850-similar-4",
        "semantic1-ui2-usage1-full-e0850-similar-5", "semantic1-ui2-usage1-full-e0850-similar-6",
        "semantic1-ui2-usage1-full-e0850-similar-7"
      ],
      group: "sentence-links", scope: "link-other-relations", kind: "equivalent-stages",
      reason: "with regard to의 뜻과 명사구 연결을 모두 같은 두 단계로 묻고 있어요. 유사 표현을 실제로 구별하는 문제는 아니에요."
    },
    {
      canonical: "semantic1-ui2-usage1-full-e0851-use",
      retired: ["semantic1-ui2-usage1-full-e0851-similar-1"],
      group: "sentence-links", scope: "link-cause-result", kind: "equivalent-stages",
      reason: "courtesy of + 명사구라는 같은 연결 구조를 똑같이 묻고 있어요."
    },
    {
      canonical: "semantic1-ui2-usage1-full-e0863-use",
      retired: [
        "semantic1-ui2-usage1-full-e0863-similar-1", "semantic1-ui2-usage1-full-e0863-similar-2",
        "semantic1-ui2-usage1-full-e0863-similar-3"
      ],
      group: "sentence-links", scope: "link-other-relations", kind: "equivalent-stages",
      reason: "as per one's request의 뜻과 per/at/at the request of 형태를 이미 같은 두 단계에서 모두 확인해요."
    },
    {
      canonical: "semantic1-ui2-usage1-full-e0913-use",
      retired: [
        "semantic1-ui2-usage1-full-e0913-similar-1", "semantic1-ui2-usage1-full-e0913-x1-similar-1",
        "semantic1-ui2-usage1-qs-p167-considering-noun", "semantic1-ui2-usage1-qs-p167-considering-that"
      ],
      group: "sentence-links", scope: "link-cause-result", kind: "equivalent-stages",
      reason: "considering 뒤의 명사구·S+V·that+S+V를 canonical 한 문제에서 모두 고르므로 명사/절 항목을 다시 낼 필요가 없어요."
    },
    {
      canonical: "semantic1-ui2-usage1-full-e0914-use",
      retired: ["semantic1-ui2-usage1-full-e0914-similar-1", "semantic1-ui2-usage1-qs-p168-to-this-end"],
      group: "sentence-links", scope: "link-condition-purpose", kind: "equivalent-stages",
      reason: "to this end의 독립 문장 연결 구조를 똑같이 묻고 있어요."
    },
    {
      canonical: "semantic1-ui2-usage1-qs-p167-given-noun",
      retired: ["semantic1-ui2-usage1-qs-p167-given-that"],
      group: "sentence-links", scope: "link-cause-result", kind: "equivalent-stages",
      reason: "given + 명사구와 given that + 절을 canonical 한 문제에서 함께 고르고 있어요."
    },
    {
      canonical: "semantic1-ui2-usage1-qs-p168-conjunction-vs-linking-adverb",
      retired: ["semantic1-ui2-usage1-qs-p168-linking-adverb-after-a-period"],
      group: "sentence-links", scope: "link-other-relations", kind: "equivalent-stages",
      reason: "while·meanwhile·during의 문장과 문장부호를 같은 다섯 보기로 똑같이 구별해요."
    },
    {
      canonical: "usage1-full-e0904-use",
      retired: ["qs-p166-not-only-a-but-also-b"],
      group: "sentence-links", scope: "link-addition-example", kind: "same-objective",
      reason: "같은 delivery/installation 문장의 not only 뒤에 but also를 넣는 한 가지 학습 목표예요. canonical은 추가 관계와 병렬 구조까지 설명해요."
    },
    {
      canonical: "semantic1-ui2-usage1-full-e0881-use",
      retired: ["semantic1-ui2-usage1-qs-p165-on-behalf-of"],
      group: "sentence-links", scope: "link-other-relations", kind: "same-objective",
      reason: "on behalf of의 대표·대신 뜻과 명사구 연결을 같은 두 단계에서 확인해요. canonical이 대표하여라는 뜻도 포함해요."
    }
  ];

  // Same prompts and scored targets; changing unrelated distractors adds no skill.
  [
    ["full-e0025-use", "full-e0485-x3-use", "collocations", "verb-noun", "meanings", "multi-pos", "call a meeting의 동사 결합과 회의 소집 뜻"],
    ["full-e0026-x1-use", "full-e0090-x2-use", "collocations", "verb-noun", "collocations", "verb-noun", "hold a position의 동사 결합과 재직 뜻"],
    ["full-e0091-x7-use", "full-e0841-x2-use", "word-forms", "noun-usage", "word-forms", "noun-usage", "a wealth of knowledge의 of와 풍부한 지식 뜻"],
    ["full-e0109-x1-use", "full-e0947-x1-use", "collocations", "adj-noun", "meanings", "paraphrasing", "promotional material의 형용사 자리와 홍보 자료 뜻"],
    ["full-e0323-x1-similar-1", "full-e0350-x3-similar-1", "collocations", "prep-noun", "collocations", "prep-noun", "of no use의 쓸모없는 뜻과 useless 유사 표현"],
    ["lexical1-full-e0401-meaning", "full-e0473-x1-meaning", "collocations", "adj-prep", "collocations", "adj-prep", "be responsible for의 책임·담당 뜻"],
    ["lexical1-full-e0236-x3-meaning", "lexical1-full-e0386-meaning", "collocations", "noun-prep", "collocations", "noun-prep", "lead over의 over 결합과 우위 뜻"],
    ["lexical1-full-e0296-x1-meaning", "lexical1-full-e0353-meaning", "collocations", "prep-noun", "collocations", "prep-noun", "on call의 on 결합과 대기 중 뜻"],
    ["lexical1-full-e0401-x2-use", "lexical1-full-e0473-x3-use", "collocations", "adj-prep", "collocations", "adj-prep", "be in charge of의 of 결합과 담당 뜻"],
    ["semantic1-grammar-prep-benefit-from-by-9e761f65ee", "semantic1-grammar-prep-benefit-from-by-baff49f93c", "grammar-structures", "grammar-prepositions", "grammar-structures", "grammar-prepositions", "benefit from/by의 두 정답과 도움을 얻는 원천 관계"],
    ["semantic1-grammar-prep-decide-on-upon-990b8b2bbe", "semantic1-grammar-prep-decide-on-upon-950c36e1e5", "grammar-structures", "grammar-prepositions", "grammar-structures", "grammar-prepositions", "decide on/upon의 두 정답과 결정 대상 관계"],
    ["semantic1-grammar-prep-agree-on-upon-196760adad", "semantic1-grammar-prep-agree-on-upon-fcf44d2775", "grammar-structures", "grammar-prepositions", "grammar-structures", "grammar-prepositions", "agree on/upon의 두 정답과 합의 사안 관계"]
  ].forEach(function (row) {
    groups.push({ canonical: row[0], retired: [row[1]], group: row[2], scope: row[3],
      retiredGroup: row[4], retiredScope: row[5], kind: "same-scored-task",
      reason: row[6] + "를 같은 질문·정답으로 확인해요. 오답 보기나 해설 표제만 달라요." });
  });

  // Manually checked restatements of one preposition relation. Separate senses,
  // different prepositions, pronoun placement, and sorting practice stay separate.
  [
    ["participate-in-bd9a7a7e3e", ["participate-in-25a3b2d2f8", "participate-in-88ee67e5ac"], "participate in + 행사·훈련: 참가 대상"],
    ["subscribe-to-69c8618a00", ["subscribe-to-d95be00184"], "subscribe to + 정기간행물: 구독 대상"],
    ["proceed-with-cf68f5e3f3", ["proceed-with-81e62e3e9f"], "proceed with + project: 진행할 일"],
    ["proceed-to-08a3731804", ["proceed-to-a6129240d8"], "proceed to + 장소: 이동 목적지"],
    ["go-to-a7efa039a8", ["go-to-ffe4e33359"], "go to + reception desk: 같은 이동 목적지"],
    ["arrive-in-b8d4fdf84c", ["arrive-in-908adb7c75"], "arrive in + 도시: Busan/Seoul만 다름"],
    ["conform-to-28f5279c62", ["conform-to-be99f904f4"], "conform to + standards: 따라야 할 기준"],
    ["compete-with-against-c630b20c3b", ["compete-with-against-07ae916928"], "compete with/against + 경쟁 상대: 두 정답 모두 보존"],
    ["look-into-6b84e42872", ["look-into-296d7be413"], "look into + cause of the error: 같은 조사 대상"],
    ["deal-with-02d9018a4a", ["deal-with-499b33c776"], "deal with + clients/customers: 고객 응대"],
    ["deal-with-c5a6c0cdaa", ["deal-with-c6ce19f445"], "deal with + complaint(s): 불만 처리"],
    ["coincide-with-877278a20a", ["coincide-with-ee72f5b44f"], "coincide with + 행사·날짜: 시간의 겹침"],
    ["collaborate-on-019c5da753", ["collaborate-on-bb5046eece"], "collaborate on + project: 협력하는 과제"],
    ["dispose-of-c9105c35e4", ["dispose-of-dd088c1e0b"], "dispose of + 폐기물·장비: 처분 대상"],
    ["refrain-from-aa7186f26d", ["refrain-from-458f2fb890"], "refrain from + 삼갈 행동: 흡연·큰 대화"],
    ["succeed-to-c7fea77d13", ["succeed-to-b32ccadd4d"], "succeed to + position/business: 지위·재산의 계승"],
    ["consist-of-a024d41f8c", ["consist-of-8005f9a9a7"], "consist of + 위원회 구성원: five/ten만 다름"],
    ["result-in-c75f233e13", ["result-in-d06d51bf43"], "result in + 결과: 원인에서 결과로 연결"],
    ["result-from-c6e1f8c922", ["result-from-ad8a2ed131"], "result from + 원인: 결과에서 원인으로 연결"],
    ["account-for-0b8acf4a5a", ["account-for-d4b1c83bec"], "account for + 매출 비율: 비율을 차지함"],
    ["belong-to-923e1cd155", ["belong-to-a74b6729cc"], "belong to + 부서·연구실: 소속·소유 대상"],
    ["refer-to-d08487694b", ["refer-to-e64704c4e1"], "refer to + manual/instructions: 참조할 자료"],
    ["depend-on-upon-c69529d489", ["depend-on-upon-e375971d7a"], "depend on/upon + 조건: 일정이 달려 있는 요인"],
    ["rely-on-upon-225ba2f715", ["rely-on-upon-3ca790d922"], "rely on/upon + guide: 의지할 자료"],
    ["differ-from-e528bcbc37", ["differ-from-a17f97c988"], "differ from + 이전 모델: 비교 대상"],
    ["differ-in-5d2fd249c4", ["differ-in-3c3c02eeb1"], "differ in + 속성: 차이가 나는 측면"],
    ["benefit-from-by-9e761f65ee", ["benefit-from-by-582a520bb7"], "benefit from/by + 이익의 원천: policy/training"],
    ["come-by-739040548a", ["come-by-99f5e91623"], "come by + office: 잠깐 들를 장소"],
    ["focus-on-upon-fd6ed5529e", ["focus-on-upon-553d0dd06e"], "focus on/upon + 주제: 집중 대상"],
    ["go-over-7b17fc14ca", ["go-over-773d496e9a"], "go over + 자료: 검토 대상"],
    ["look-over-0c7476519c", ["look-over-131324b59d"], "look over + report: 같은 검토 대상"],
    ["comment-on-c455e1b215", ["comment-on-b591143508"], "comment on + proposal: 같은 논평 주제"],
    ["come-across-a653cb1825", ["come-across-733fe6d043"], "come across + old photograph: 같은 우연한 발견"]
  ].forEach(function (row) {
    groups.push({ canonical: "semantic1-grammar-prep-" + row[0],
      retired: row[1].map(function (id) { return "semantic1-grammar-prep-" + id; }),
      group: "grammar-structures", scope: "grammar-prepositions", kind: "same-preposition-objective",
      reason: row[2] + ". 문장의 길이나 대상 예시를 바꿔 같은 뜻의 같은 전치사만 다시 묻고 있어요." });
  });

  ["award", "give", "grant", "offer", "send", "show"].forEach(function (verb) {
    groups.push({
      canonical: "semantic1-grammar-forms-core-" + verb,
      retired: ["semantic1-grammar-forms-passive-" + verb],
      group: "grammar-structures", scope: "grammar-forms", kind: "fourth-form-consolidation",
      reason: verb + "의 4V 형식과 사람·사물 두 목적어를 직접 형식 회상 카드로 통합해요. 별도 수동태 구조 고르기는 새 문제에서 제외해요."
    });
  });

  function create(questions, classify) {
    if (!Array.isArray(questions) || typeof classify !== "function") {
      throw new Error("Question curation requires a catalog and classifier");
    }
    var byId = new Map();
    questions.forEach(function (q) {
      if (!q || typeof q.id !== "string" || byId.has(q.id)) {
        throw new Error("Question curation requires unique question IDs");
      }
      byId.set(q.id, q);
    });
    var result = { version: version, retired: new Set(), replacements: {}, report: [], skipped: [] };
    groups.forEach(function (spec) {
      var canonical = byId.get(spec.canonical);
      spec.retired.forEach(function (oldId) {
        var original = byId.get(oldId);
        if (!original || !canonical) {
          result.skipped.push({ retired: oldId, canonical: spec.canonical, reason: "missing-question" });
          return;
        }
        var oldAssignment = classify(original) || {};
        var canonicalAssignment = classify(canonical) || {};
        if (oldAssignment.group !== (spec.retiredGroup || spec.group) || oldAssignment.scope !== (spec.retiredScope || spec.scope) ||
            canonicalAssignment.group !== spec.group || canonicalAssignment.scope !== spec.scope) {
          throw new Error("Question curation assignment changed: " + oldId);
        }
        result.retired.add(oldId);
        result.replacements[oldId] = spec.canonical;
        if (canonical.internalRoute || !!canonical.grammarOriginId !== (canonicalAssignment.group === "grammar-structures")) {
          throw new Error("Question curation canonical is not an active route: " + spec.canonical);
        }
        result.report.push({ retired: oldId, canonical: spec.canonical, group: oldAssignment.group, scope: oldAssignment.scope,
          kind: spec.kind, reason: spec.reason });
      });
    });
    result.report.forEach(function (entry) {
      if (result.retired.has(entry.canonical)) { throw new Error("Question curation aliases must point to active IDs"); }
    });
    return result;
  }
  return { version: version, create: create };
});
