(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) { module.exports = api; }
  if (root) { root.PowerVocaQuestionReview = api; }
})(typeof window !== "undefined" ? window : null, function () {
  "use strict";
  var version = "20261026-quality1";
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function stage(instruction, prompt, options, correct, reasons, explanation, context) {
    var value = { instruction: instruction, prompt: prompt, context: context || "", options: options,
      optionReasons: reasons, explanation: explanation, fixedOrder: false };
    if (Array.isArray(correct)) { value.multiple = true; value.answers = correct; }
    else { value.answer = correct; }
    return value;
  }
  var specs = [
    {
      old: "semantic1-grammar-pattern-qs-p151-how-to-v-34acecd03c00", id: "semantic1-quality26-how-to",
      expression: "how to handle the equipment properly", meaning: "장비를 올바르게 다루는 법",
      summary: [{ structure: "how to properly handle the equipment / how to handle the equipment properly", meaning: "장비를 올바르게 다루는 법" }],
      stages: [stage("같은 뜻으로 쓸 수 있는 표현을 모두 고르세요.", "장비를 올바르게 다루는 법", [
        "how to properly handle the equipment", "how to handle the equipment properly",
        "how to proper handle the equipment", "how the equipment to handle properly"
      ], [0, 1], [
        "properly가 handle을 수식해요. to와 동사 사이에도 놓을 수 있어요.",
        "properly가 목적어 뒤에서 handle을 수식해도 올바른 표현이에요.",
        "동사 handle의 동작을 꾸미므로 형용사 proper가 아니라 부사 properly가 필요해요.",
        "여기서는 how 뒤에 to handle이 연결되어야 해요."
      ], "how to properly handle … / how to handle … properly 모두 가능해요. properly의 위치를 하나로 제한하지 않아요.")]
    },
    {
      old: "semantic1-grammar-pattern-qs-p187-hardly-has-inversion", id: "semantic1-quality26-hardly-order",
      expression: "hardly / usually", meaning: "hardly: 거의 ~않는 / usually: 보통",
      summary: [
        { structure: "Hardly has the team made any progress.", meaning: "그 팀은 거의 진전을 이루지 못했다" },
        { structure: "The team has hardly made any progress.", meaning: "hardly가 문장 안에 있으면 일반 어순" },
        { structure: "Usually the team makes steady progress.", meaning: "usually를 앞에 두어도 일반 어순" }
      ],
      stages: [stage("어법상 올바른 문장을 모두 고르세요.", "Hardly / usually", [
        "Hardly has the team made any progress.",
        "The team has hardly made any progress.",
        "Usually the team makes steady progress.",
        "Hardly the team has made any progress.",
        "Usually does the team make steady progress.",
        "Hardly has made the team any progress."
      ], [0, 1, 2], [
        "부정 의미의 hardly가 문두에 오면 has와 주어의 순서가 바뀌어요.",
        "hardly가 문장 안에 있으므로 주어 + has + hardly + p.p. 순서예요.",
        "usually는 부정 의미가 아니므로 문두에서도 주어 + 동사의 순서를 유지해요.",
        "문두의 hardly 뒤에서는 has가 주어 앞에 와야 해요.",
        "평서문에서 usually를 문두에 두었다고 do 도치를 하지 않아요.",
        "has 뒤에 실제 주어 the team이 오고, 그다음 made가 와야 해요."
      ], "문두 hardly → has + 주어 + p.p. / 문장 안 hardly·문두 usually → 일반 어순. 도치문만 골라서는 정답이 되지 않아요.")]
    },
    {
      old: "semantic1-grammar-pattern-qs-p185-enclosed-be-singular", id: "semantic1-quality26-enclosed-order",
      expression: "enclosed", meaning: "동봉된",
      summary: [
        { structure: "Enclosed is a receipt. / A receipt is enclosed.", meaning: "영수증 한 장이 동봉되어 있다" },
        { structure: "Enclosed are two receipts.", meaning: "영수증 두 장이 동봉되어 있다" }
      ],
      stages: [stage("어법상 올바른 문장을 모두 고르세요.", "enclosed", [
        "Enclosed is a receipt.", "Enclosed are two receipts.", "A receipt is enclosed.",
        "Enclosed are a receipt.", "Enclosed a receipt is.", "Enclosed is two receipts."
      ], [0, 1, 2], [
        "실제 주어 a receipt가 단수이므로 is를 써요.",
        "실제 주어 two receipts가 복수이므로 are를 써요.",
        "주어를 앞에 둔 일반 어순도 올바른 문장이에요.",
        "a receipt는 단수이므로 are가 아니라 is가 필요해요.",
        "Enclosed를 앞세운 어순은 Enclosed + be + 실제 주어예요.",
        "two receipts는 복수이므로 is가 아니라 are가 필요해요."
      ], "a receipt → is / two receipts → are. 동봉된 상태를 앞세운 문장과 일반 어순의 문장을 함께 구별해요.")]
    },
    {
      old: "usage1-qs-p102-growth", id: "semantic1-quality26-grow-family",
      expression: "grow → growth", meaning: "grow: 성장하다 / growth: 성장", firstAnswerGate: false,
      stages: [
        stage("어족 관계가 올바른 것을 모두 고르세요.", "grow · strong · wide · deep", [
          "grow → growth", "strong → width", "wide → strength", "deep → depth"
        ], [0, 3], [
          "grow의 대표 명사형은 growth예요.", "strong에 대응하는 명사는 strength예요.",
          "wide에 대응하는 명사는 width예요.", "deep에 대응하는 명사는 depth예요."
        ], "grow → growth / strong → strength / wide → width / deep → depth. 한국어 뜻을 제시하지 않고 어족 관계부터 확인해요."),
        stage("growth의 뜻을 고르세요.", "growth", ["성장, 증가", "강도, 세기", "너비, 폭", "깊이"], 0, [
          "growth는 성장·증가를 뜻해요.", "강도·세기는 strength의 뜻이에요.",
          "너비·폭은 width의 뜻이에요.", "깊이는 depth의 뜻이에요."
        ], "growth: 성장, 증가. 어형 관계와 단어의 뜻을 별도 단계에서 확인해요.")
      ]
    },
    {
      old: "semantic1-ui2-qs-p185-superlative-yet", id: "semantic1-quality26-superlative-yet",
      expression: "our most durable battery yet", meaning: "지금까지 나온 것 중 가장 내구성이 좋은 배터리",
      stages: [stage("이 문장에서 yet의 뜻을 고르세요.", "This is our most durable battery yet.",
        ["지금까지", "앞으로", "이미", "여전히"], 0, [
          "이 문맥의 yet은 비교 범위를 지금까지로 잡아요.",
          "아직 나오지 않은 미래의 제품을 비교하는 뜻이 아니에요.",
          "이미 완료되었다는 뜻의 already와 달라요.",
          "상태가 계속된다는 뜻의 still과 달라요."
        ], "최상급 + yet: 지금까지 가장 ~한. 이 문제의 목표는 최상급 형태를 고르는 것이 아니라, 이 결합에서 yet의 의미를 구별하는 거예요.")]
    }
  ];
  function create(questions, classify) {
    if (!Array.isArray(questions) || typeof classify !== "function") { throw new Error("Question review requires a catalog and classifier"); }
    var byId = new Map(questions.map(function (q) { return [q.id, q]; }));
    var result = { version: version, questions: [], replacements: {}, assignments: {} };
    specs.forEach(function (spec) {
      var original = byId.get(spec.old);
      if (!original) { return; }
      if (byId.has(spec.id)) { throw new Error("Question review ID already exists: " + spec.id); }
      var q = clone(original);
      q.id = spec.id; q.sourceQuestionId = spec.old; q.presentationReviewed = true;
      q.format = "semantic-set1"; q.stageMode = "set"; q.firstAnswerGate = spec.firstAnswerGate !== false;
      q.stages = clone(spec.stages);
      q.answerSummary = { expression: spec.expression, meaning: spec.meaning };
      q.displayExpression = spec.expression;
      q.learningPoint = q.stages.map(function (s) { return s.explanation; }).join(" ");
      if (spec.summary) { q.grammarSummary = clone(spec.summary); }
      result.questions.push(q); result.replacements[spec.old] = q.id;
      result.assignments[q.id] = clone(classify(original));
    });
    return result;
  }
  return { version: version, create: create };
});
