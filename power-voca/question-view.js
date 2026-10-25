(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.PowerVocaQuestionView = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  // Presentation only. Never write these cues to a question, a saved round, or
  // its fingerprint. These replacements use reviewed task cues, never answers,
  // answer summaries, explanations, or a selected choice.
  var grammar = Object.create(null);
  function define(id, instruction, prompt, context) {
    grammar[id] = { instruction: instruction, prompt: prompt, context: context || '' };
  }
  function copy(content) {
    content = content || {};
    return { instruction: String(content.instruction || ''), prompt: String(content.prompt || ''), context: String(content.context || '') };
  }
  var phrase = '빈칸에 알맞은 표현을 고르세요.';
  var sentence = '어법상 올바른 문장을 고르세요.';
  var meaning = '다음 뜻에 맞는 표현을 고르세요.';

  define('pattern-full-e0746-meaning', meaning, '장비가 설치되어 있다');
  define('pattern-full-e0774-meaning', meaning, '우리가 일정을 조정할 수 있다면 좋을 것 같다');
  define('pattern-full-e0779-meaning', phrase, 'You have got ___.', '당신은 꼭 내게 알려 줘야 한다.');
  define('pattern-full-e0784-x3-meaning', '명사 주어와 대명사 주어의 어순이 모두 올바른 것을 고르세요.', 'Here', '대상이 오는 것을 알리는 상황');
  define('pattern-full-e0794-meaning', '빈칸에 알맞은 표현을 모두 고르세요.', 'All you have to do is ___.', '서류를 제출하기만 하면 된다.');
  define('pattern-full-e0796-use', phrase, "I'm calling ___.", '배송일을 확인하기 위해 전화하고 있다.');
  define('pattern-full-e0796-x1-use', phrase, "I'm writing ___.", '배송일을 확인하기 위해 글을 쓰고 있다.');
  define('pattern-full-e0806-meaning', '두 대상의 관계를 고르세요.', 'B, not A');
  define('pattern-full-e0811-meaning', phrase, 'what it takes ___', '성공하는 데 필요한 것');
  define('pattern-full-e0852-use', meaning, '배송이 가능한지 궁금해서요.');
  define('pattern-full-e0853-use', 'the report와 attached의 역할을 고르세요.', 'Please find attached the report.');
  define('pattern-full-e0862-use', meaning, '파일을 보내 주시면 감사하겠습니다.');
  define('pattern-full-e0867-use', phrase, 'It remains ___.', '두고 볼 일이다.');
  define('pattern-full-e0896-use', phrase, 'We have no choice ___.', '기다릴 수밖에 없다.');
  define('pattern-full-e0920-use', meaning, '가격이 오를 것이라는 인상을 받는다.');
  define('pattern-qs-p148-it-for-to-v-0763e5943581', phrase, 'It is important ___ employees to follow the rules.');
  define('pattern-qs-p148-be-to-v-85ee3a79ace4', 'is to be held가 나타내는 의미를 고르세요.', 'The meeting is to be held on Monday.');
  define('pattern-qs-p148-goal-be-to-v', 'to improve the service의 역할을 고르세요.', 'Our goal is to improve the service.');
  define('pattern-qs-p151-how-to-v-34acecd03c00', meaning, '장비를 올바르게 다루는 법');
  [
    ['how', 'operate the machine', '어떻게 기계를 작동하는지'],
    ['what', 'do next', '다음에 무엇을 할지'],
    ['when', 'leave', '언제 떠날지'],
    ['where', 'park', '어디에 주차할지'],
    ['whether', 'attend', '참석할지 여부'],
    ['which', 'choose', '어느 것을 고를지']
  ].forEach(function (row) {
    define('pattern-qs-p179-' + row[0] + '-to-v', meaning, row[1], row[2]);
  });
  define('pattern-qs-p179-whether-to-v-if-30744dec45d7', '같은 뜻의 두 표현이 모두 올바른 것을 고르세요.', 'decide', '참석할지 여부');
  define('pattern-qs-p179-which-to-v-273c88ca487c', meaning, '어느 책을 살지');
  define('pattern-memory-p115-be-yet-to-v', '빈칸에 알맞은 연결을 고르세요.', 'be yet ___');
  define('pattern-memory-p115-have-yet-to-v', '빈칸에 알맞은 연결을 고르세요.', 'have yet ___');
  define('pattern-qs-p185-attached-be-plural', sentence, 'Attached', '수정된 일정표 두 개가 첨부되어 있다.');
  define('pattern-qs-p185-enclosed-be-singular', '어순과 실제 주어가 모두 맞는 것을 고르세요.', 'Enclosed', '영수증이 동봉되어 있다.');
  define('pattern-qs-p187-enclosed-not-enclosure', '각 표현의 역할을 고르세요.', 'Enclosed / enclosure');
  define('pattern-qs-p186-never-perfect-inversion', '다음 문장과 뜻이 같은 올바른 문장을 고르세요.', 'Our assistant has never processed such a request.');
  define('pattern-qs-p186-no-longer-be-inversion', '다음 문장과 뜻이 같은 올바른 문장을 고르세요.', 'The branch is no longer responsible.');
  define('pattern-qs-p186-no-longer-be-inversion-subject-contrast', sentence, 'No · employees', '직원은 아무도 회의에 참석하지 않았다.');
  define('pattern-qs-p186-only-by-does', phrase, 'Only by checking each invoice ___.', '각 청구서를 확인해야만 회계사가 실수를 막는다.');
  define('pattern-qs-p186-only-with-do-plural', phrase, 'Only with written instructions ___.', '기술자들은 지침이 있어야만 작업을 시작한다.');
  define('pattern-qs-p186-only-with-do-plural-subject-contrast', sentence, 'Only · our manager', '오직 우리 관리자만 암호를 안다.');
  define('pattern-qs-p186-rarely-have-plural', sentence, 'Rarely');
  define('pattern-qs-p187-hardly-has-inversion', sentence, 'Hardly');
  define('pattern-qs-p186-seldom-does-base', sentence, 'Seldom', '관리자가 전화에 거의 응답하지 않는다.');

  // Other grammar pools: remove a solution explanation while preserving the
  // requested sense and argument relationships, which may rule out otherwise
  // valid uses of the same word.
  define('forms-give-transfer', '사물을 사람보다 먼저 쓰는 어순을 고르세요.', 'give', '사물을 사람에게 주다');
  define('forms-rise-adverb', '다음 뜻에 맞는 구조를 고르세요.', 'rise', '가격이 상당히 오르다');
  define('conn-clause-rest-assured', '알맞은 표현을 고르세요.', 'rest', '안심하라는 표현');
  define('conn-how-about', phrase, '___ V-ing?');
  define('pattern-full-e0113-x3-similar-1', '알맞은 구조를 고르세요.', 'make', '보고서 A를 간략하게 하다');
  define('pattern-full-e0113-x3-similar-1-make-simple', '알맞은 구조를 고르세요.', 'make', '절차 A를 간단하게 하다');
  define('pattern-full-e0142-x1-use', '알맞은 구조를 고르세요.', 'take', '경고 A를 가볍게 받아들이다');
  define('pattern-full-e0711-x2-meaning', '알맞은 연결을 고르세요.', 'be considered', '~인 것으로 여겨지다');
  define('pattern-full-e0781-x1-meaning', meaning, '상대방에게 보고서 검토를 부탁해요.');
  define('pattern-full-e0917-meaning', '알맞은 연결을 고르세요.', 'keep', '직원 A가 변경 사항 B를 계속 알고 있게 하다');

  // Exact historical instructions. The question's target meaning is retained
  // separately; choosing a known word form must not be turned into a meaning
  // question by deleting its Korean target or its base word.
  var neutralInstructions = new Map([
    ['뒤 명사구를 목적어로 받는 동사를 고르세요.', phrase],
    ['동사·형용사를 꾸미는 부사를 골라 표현을 완성하세요.', phrase],
    ['뒤 명사를 꾸미는 말을 골라 명사구를 완성하세요.', phrase],
    ['모든 보기는 형용사로 쓰일 수 있어요. 문맥에 맞는 뜻을 고르세요.', '문맥에 알맞은 표현을 고르세요.'],
    ['모든 보기의 품사가 같아요. 단어의 관계와 뜻을 보고 고르세요.', '제시된 뜻에 알맞은 표현을 고르세요.'],
    ['단어의 어족 관계와 뜻을 함께 확인하세요.', '제시된 단어와 뜻에 알맞은 표현을 고르세요.'],
    ['모양보다 문맥에서 단어의 실제 뜻을 확인하세요.', '문맥에 알맞은 표현을 고르세요.'],
    ['enough가 형용사를 꾸밀 때의 교재 결합을 고르세요.', phrase],
    ['same 앞에 필요한 관사를 고르세요.', phrase],
    ['비교급 more efficient를 강조할 수 있는 어형을 고르세요.', phrase],
    ["비교급 lower를 '상당히 더'라는 뜻으로 강조하는 어형을 고르세요.", "'상당히 더 낮다'라는 뜻이 되도록 빈칸을 완성하세요."],
    ["비교급 shorter를 '훨씬 더'라는 뜻으로 강조하는 표현을 고르세요.", "'훨씬 더 짧다'라는 뜻이 되도록 빈칸을 완성하세요."],
    ['very로 최상급 earliest를 강조하는 올바른 어순을 고르세요.', phrase],
    ['소유를 강조하는 own의 어순에 맞게 완성하세요.', phrase]
  ]);
  function present(question, stageIndex, defaultContent) {
    var result = copy(defaultContent);
    if (!question || question.presentationReviewed === true) return result;
    var stage = question.stages && question.stages[stageIndex];
    var id = question.grammarOriginId || String(question.id || '').replace(/^semantic1-grammar-/, '');
    var isGrammar = Boolean(question.grammarOriginId || /^semantic1-grammar-/.test(question.id || ''));
    if (stageIndex === 0 && grammar[id]) return copy(grammar[id]);
    if (neutralInstructions.has(result.instruction)) result.instruction = neutralInstructions.get(result.instruction);
    if (isGrammar && stage && stage.kind === 'structure') {
      if (/^forms-passive-(?:award|give|grant|offer|send|show)$/.test(id)) {
        result.context = result.context.replace(/\n받는 사람이 주어예요\.$/, '');
      }
      if (/^conn-directive-/.test(id)) result.context = '';
      if (['conn-prefer', 'conn-begin', 'conn-remind', 'conn-noun-way', 'conn-difficulty'].indexOf(id) !== -1) {
        result.context = result.context.replace(/두 연결이에요\./, '연결을 고르세요.');
      }
      if (['conn-verb-mean', 'conn-verb-regret'].indexOf(id) !== -1) {
        result.context = result.context.replace(/ (?:자신의|알릴) 행동을 직접? ?연결해요\.$/, '').replace(/ 알릴 행동을 연결해요\.$/, '');
      }
      if (/^pattern-full-e(?:0259-similar-1|0738-similar-1|0231-x1-similar-1|0251-x1-meaning|0266-x2-meaning)$/.test(id) ||
          ['pattern-qs-p121-buy-d122146be058', 'pattern-qs-p213-comprise-synonym'].indexOf(id) !== -1) {
        result.context = result.context.replace(/ · 대상(?: 행사| 물건)? A를 연결해요\.$/, '').replace(/ · 구성 요소 A를 연결해요\.$/, '');
      }
    }
    if (stageIndex === 0 && question.id === 'usage1-qs-p111-official') result.prompt = '‘공식적인’에 해당하는 형용사를 고르세요.';
    if (stageIndex === 0 && question.id === 'usage1-qs-p111-temporary') result.prompt = '‘일시적인’에 해당하는 형용사를 고르세요.';
    if (stageIndex === 0 && question.id === 'semantic1-ui2-qs-p167-during-event-noun') {
      result.prompt = result.prompt.replace(/^행사 참석 동작을 동명사로 바꾸지 않고, 교재의 during 구조를 완성하세요\.\n/, '');
    }
    return result;
  }
  return { VERSION: '20261026-neutral1', present: present };
});
