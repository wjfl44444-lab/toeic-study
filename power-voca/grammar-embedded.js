(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PowerGrammarEmbedded = api;
})(typeof window !== 'undefined' ? window : globalThis, function (window) {
  'use strict';
  const names = { all: '문형·구조 전체 혼합', forms: '동사 형식 구별', connections: '단어 뒤 연결', prepositions: '전치사·구동사', patterns: '표현별 어순·고정 문형' };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  // Presentation only: never pass these strings back to the engine or fingerprint them.
  function display(value) {
    return String(value ?? '')
      .replace(/\bplural nouns?\b/gi, '복수명사').replace(/\bsingular nouns?\b/gi, '단수명사')
      .replace(/\buncountable nouns?\b/gi, '불가산명사').replace(/\bcountable nouns?\b/gi, '가산명사')
      .replace(/\bclauses?\b/gi, 'S + V').replace(/\bnoun phrases?\b/gi, '명사구')
      .replace(/\bnouns?\b/gi, '명사').replace(/\badjectives?\b/gi, '형용사')
      .replace(/\badverbs?\b/gi, '부사').replace(/\bprepositions?\b/gi, '전치사')
      .replace(/복수 명사/g, '복수명사').replace(/단수 명사/g, '단수명사');
  }
  function promptText(value) {
    return display(value).replace(/토익·교재의 주요 쓰임에서/g, '주요 쓰임에서')
      .replace(/교재에서 확인한 /g, '').replace(/교재에서 /g, '')
      .replace(/교재가 제시한 /g, '').replace(/교재의 /g, '').replace(/교재 /g, '');
  }
  const choose = (stage, subject = '연결') => `알맞은 ${subject === '전치사·입자' ? '전치사·부사' : subject}${subject === '전치사·입자' ? '를' : '을'} ${stage.mode === 'multi' ? '모두 ' : ''}고르세요.`;
  const content = (instruction, example, context = '') => ({ instruction, example: display(example), context: promptText(context) });
  // These are display-only arrangements of the supplied question cues. Do not
  // derive a question from its answer, summary, explanation, or source ID.
  const structureContent = {
    'forms-give-transfer': ['알맞은 어순을 고르세요.', 'give', '사물을 먼저 놓고, 받는 사람을 뒤에 연결해요.'],
    'forms-passive-appoint': ['직위 명사의 역할을 고르세요.', 'be appointed + 직위 명사', '사람이 어떤 직위에 임명되었다는 수동태예요.'],
    'forms-passive-name': ['직위 명사의 역할을 고르세요.', 'be named + 직위 명사', '사람이 어떤 직위에 임명되었다는 수동태예요.'],
    'forms-view-as': ['B 앞에 오는 말을 고르세요.', 'view A ___ B', 'A를 B로 여기다'],
    'forms-regard-as': ['B 앞에 오는 말을 고르세요.', 'regard A ___ B', 'A를 B로 여기다'],
    'forms-keep-informed': ['표현을 완성하는 말을 모두 고르세요.', 'keep A ___', 'A에게 계속 소식을 알려 주다'],
    'forms-stay-tuned': ['표현을 완성하는 말을 고르세요.', 'stay ___', '방송 채널을 고정하고 이어지는 소식을 기다리다'],
    'forms-rise-adverb': ['알맞은 구조를 고르세요.', 'rise', '가격이 오르다 · 상승 정도를 더 설명해요.'],
    'forms-become-noun': ['주어와 뒤따르는 명사의 관계를 고르세요.', 'become + 명사'],
    'conn-remember': ['', 'remember', '앞으로 할 일과 이미 한 일을 연결해요.'],
    'conn-forget': ['', 'forget', '앞으로 할 일과 이미 한 일을 연결해요.'],
    'conn-prefer': ['', 'prefer', '행동 자체를 목적어로 직접 받는 두 연결이에요.'],
    'conn-begin': ['', 'begin', '주어의 행동을 직접 잇는 두 연결이에요.'],
    'conn-agree': ['', 'agree', '자신이 할 행동 또는 절로 나타낸 의견을 직접 연결해요.'],
    'conn-expect': ['', 'expect', '자신의 행동·다른 사람의 행동·절 내용을 연결해요.'],
    'conn-ask': ['', 'ask', '자신의 행동·다른 사람의 행동·절 내용을 연결해요.'],
    'conn-need': ['', 'need', '주어 자신 또는 다른 사람이 할 행동을 연결해요.'],
    'conn-would-like': ['', 'would like', '행동의 주체는 자신 또는 다른 사람이에요.'],
    'conn-consider': ['', 'consider', '행동 또는 절 내용을 직접 연결해요.'],
    'conn-suggest': ['', 'suggest', '행동 또는 절 내용을 직접 연결해요.'],
    'conn-recommend': ['', 'recommend', '행동 또는 절 내용을 직접 연결해요.'],
    'conn-remind': ['', 'remind', '다른 사람을 O로 두는 두 연결이에요.'],
    'conn-proud': ['', 'be proud', '자신의 행동 또는 절로 나타낸 사실을 직접 연결해요.'],
    'conn-verb-mean': ['', 'mean', '주어 자신이 ~할 생각·의도가 있어요. 자신의 행동을 직접 연결해요.'],
    'conn-verb-regret': ['', 'regret', '유감스러운 소식을 지금 알리려는 상황이에요. 알릴 행동을 연결해요.'],
    'conn-verb-try': ['', 'try', '~하려고 노력하다'],
    'conn-noun-way': ['', 'way (n)', '행동 방법을 설명하는 두 연결이에요.'],
    'conn-adjective-be-about': ['', 'be about', '막 ~하려는 참이다 · 행동을 연결해요.'],
    'conn-difficulty': ['', 'have difficulty', '뒤에 행동을 잇는 두 연결이에요.'],
    'conn-decide-negative': ['', 'decide', '뒤에 이어지는 행동 자체만 부정해요.'],
    'conn-used-habit': ['알맞은 표현을 고르세요.', 'used', '과거의 습관 또는 지금과 다른 과거 상태를 말해요.'],
    'conn-reserve-right': ['', 'reserve the right', '어떤 행동을 할 권리인지 직접 연결해요.'],
    'conn-would-you-like-me': ['', 'Would you like me', '행동의 주체는 me예요.'],
    'conn-get-chance': ['', 'Did you get a chance', '뒤에 행동을 직접 연결해요.'],
    'conn-clause-make-sure': ['', 'make sure', '주어의 행동 또는 절 내용을 직접 연결해요.'],
    'conn-clause-rest-assured': ['알맞은 표현을 고르세요.', 'rest', '뒤에 that + S + V를 연결해요.'],
    'conn-clause-our-records-show': ['알맞은 동사를 고르세요.', 'Our records ___ that S + V', '절로 나타낸 기록 내용을 바로 전달해요.'],
    'conn-that-omission': ['that만 생략한 문장을 고르세요.', 'She said that the meeting was canceled.', '같은 뜻을 유지해요.'],
    'conn-gerund-subject': ['역할과 동사 일치가 맞는 것을 고르세요.', 'Reviewing the reports takes time.', 'Reviewing the reports의 역할을 확인해요.'],
    'conn-gerund-adverb': ['알맞은 구조를 고르세요.', '각 물품을 개별적으로 포장하기 전에'],
    'conn-gerund-object': ['알맞은 연결을 모두 고르세요.', '제안서를 제출한 후에'],
    'conn-how-about': ['알맞은 표현을 고르세요.', 'V-ing', '뒤에 행동을 바로 연결할 수 있는 표현이에요.'],
    'pattern-full-e0259-similar-1': ['알맞은 구조를 고르세요.', 'consult', '자료를 참조하다 · 대상 A를 연결해요.'],
    'pattern-full-e0738-similar-1': ['알맞은 구조를 고르세요.', 'examine', '자료를 자세히 살펴보다 · 대상 A를 연결해요.'],
    'pattern-full-e0113-x2-use': ['알맞은 구조를 고르세요.', 'brief', '사람 A에게 내용 B를 간략히 설명하다\nA = 사람 · B = 설명 내용'],
    'pattern-full-e0113-x3-similar-1': ['알맞은 구조를 고르세요.', 'make', '보고서 A를 간략하게 하다 · A와 brief의 관계를 확인해요.'],
    'pattern-full-e0113-x3-similar-1-make-simple': ['알맞은 구조를 고르세요.', 'make', '절차 A를 간단하게 하다 · 목적어와 그 상태를 연결해요.'],
    'pattern-full-e0142-x1-use': ['알맞은 구조를 고르세요.', 'take', '경고 A를 가볍게 받아들이다 · 목적어와 수식어를 연결해요.'],
    'pattern-full-e0231-x1-similar-1': ['알맞은 구조를 고르세요.', 'attend', '행사에 참석하다 · 대상 행사 A를 연결해요.'],
    'pattern-full-e0251-x1-meaning': ['알맞은 구조를 고르세요.', 'succeed', '지위·직책에서 사람 A의 뒤를 잇다 · 대상 사람 A를 연결해요.'],
    'pattern-full-e0259-x1-meaning': ['', 'refer', '대상 A를 명칭 B로 일컫다'],
    'pattern-full-e0259-x2-meaning': ['', 'refer', '고객 A가 부서 B에 문의하도록 보내다'],
    'pattern-full-e0266-x2-meaning': ['알맞은 구조를 고르세요.', 'benefit', '대상 A에게 이롭다, 이익을 주다 · 대상 A를 연결해요.'],
    'pattern-full-e0268-x1-use': ['', 'adapt', '스스로를 새 환경 B에 적응시키다'],
    'pattern-full-e0268-x2-use': ['', 'adapt', '자료 A를 어린이용 B에 맞게 조정하다'],
    'pattern-full-e0458-x1-use': ['', 'familiarize', '스스로 새 절차 B를 잘 알게 되다'],
    'pattern-full-e0698-x1-meaning': ['알맞은 구조를 고르세요.', 'offer', 'A = 제공·추천·제안할 것 · B = 받는 사람\nA를 먼저 놓아요.'],
    'pattern-full-e0711-x1-meaning': ['알맞은 연결을 모두 고르세요.', 'consider', '대상 A를 B라고 간주하다 · B는 명사예요.'],
    'pattern-full-e0711-x2-meaning': ['', 'be considered', '~인 것으로 여겨지다 · 수동태 뒤의 보어를 연결해요.'],
    'pattern-full-e0715-x1-use': ['알맞은 연결을 모두 고르세요.', 'prefer', 'B보다 A를 더 좋아하다'],
    'pattern-full-e0757-meaning': ['알맞은 구조를 고르세요.', 'bring', '당신 B가 올 때 자료 A를 가지고 오다 · 사람의 동반 관계를 나타내요.'],
    'pattern-full-e0781-x1-meaning': ['알맞은 표현을 고르세요.', '상대방에게 보고서 검토를 부탁해요.', '상대방이 행동하는 표현이에요.'],
    'pattern-full-e0822-meaning': ['', 'lead', '사람 A에게 과정 B를 단계별로 안내·설명하다'],
    'pattern-full-e0826-meaning': ['', 'take', '방문객 A를 전시장 B의 여기저기로 안내하다'],
    'pattern-full-e0846-x1-use': ['', 'put / bring', '법규 A를 시행하다'],
    'pattern-full-e0917-meaning': ['', 'keep', '직원 A가 변경 사항 B를 계속 알고 있게 하다\n목적어·보어·내용을 연결해요.'],
    'pattern-qs-p121-buy-d122146be058': ['알맞은 구조를 고르세요.', 'buy', '물건을 사다 · 대상 물건 A를 연결해요.'],
    'pattern-qs-p213-comprise-synonym': ['알맞은 구조를 고르세요.', 'comprise', '전체가 구성 요소 A로 구성되다 · 구성 요소 A를 연결해요.'],
    'pattern-qs-p215-access-noun-verb-structure': ['두 구조가 모두 맞는 것을 고르세요.', 'access (V / n)', '동사와 명사로 쓸 때 자료 A를 연결해요.'],
    'pattern-full-e0746-meaning': ['알맞은 구조를 고르세요.', '장비가 설치되어 있다', '설치하는 동작의 대상은 장비예요.'],
    'pattern-full-e0774-meaning': ['', '우리가 일정을 조정할 수 있다면 좋을 것 같다', '직설적인 요구보다 조심스러운 제안이에요.'],
    'pattern-full-e0779-meaning': ['', 'You have got', '회화 표현 · 당신은 꼭 내게 알려 줘야 해요'],
    'pattern-full-e0784-x3-meaning': ['주어에 맞는 어순을 고르세요.', 'Here', '대상을 가리키며 도착 알리기 · 명사 주어 / 대명사 주어'],
    'pattern-full-e0785-use': ['알맞은 응답을 고르세요.', '제가 처리 여부를 확인해 볼게요.', '상대가 요청이 처리됐는지 물어요.'],
    'pattern-full-e0793-use': ['행동하는 사람과 표현을 모두 짝지으세요.', '실제로 창문을 여는 사람은 누구인가요?'],
    'pattern-full-e0794-meaning': ['알맞은 연결을 모두 고르세요.', 'All you have to do is', '서류를 제출하기만 하면 된다'],
    'pattern-full-e0796-use': ['', "I'm calling", '배송일을 확인하기 위해 · 목적을 연결해요.'],
    'pattern-full-e0796-x1-use': ['', "I'm writing", '배송일을 확인하기 위해 · 목적을 연결해요.'],
    'pattern-full-e0806-meaning': ['두 대상의 순서를 고르세요.', 'B, not A', '실제로 선택·강조하는 대상 → 부정하는 대상'],
    'pattern-full-e0811-meaning': ['', 'what it takes', '성공하는 데 필요한 것 · 뒤에 목표 행동을 연결해요.'],
    'pattern-full-e0852-use': ['알맞은 표현을 고르세요.', '배송이 가능한지 궁금해서요.', '완곡한 의문 · 희망·확신·걱정과 구별해요.'],
    'pattern-full-e0853-use': ['the report와 attached의 역할을 고르세요.', 'Please find attached the report.', '첨부 확인을 부탁하는 표현이에요.'],
    'pattern-full-e0862-use': ['알맞은 문장을 고르세요.', '파일을 보내 주시면 감사하겠습니다.', '감사 표현으로 정중히 부탁하기'],
    'pattern-full-e0867-use': ['', 'it remains', '결과가 아직 확정되지 않았어요. 두고 볼 일이다'],
    'pattern-full-e0880-meaning': ['두 행사의 진행 순서를 고르세요.', 'A followed by B'],
    'pattern-full-e0896-use': ['', 'have no choice', '기다릴 수밖에 없다'],
    'pattern-full-e0910-use': ['알맞은 전치사를 고르세요.', 'be entered ___ a drawing', '추첨 대상자로 등록되다'],
    'pattern-full-e0920-use': ['알맞은 표현을 고르세요.', '가격이 오를 것이라는 인상을 받는다', '자신이 받은 인상 · 확인·보증·증거와 구별해요.'],
    'pattern-qs-p148-it-for-to-v-0763e5943581': ['행동 주체를 잇는 말을 고르세요.', 'It is important ___ employees to follow the rules.', 'employees가 to follow의 행동 주체예요.'],
    'pattern-qs-p148-be-to-v-85ee3a79ace4': ['is to be held가 나타내는 관계를 고르세요.', 'The meeting is to be held on Monday.', '일정을 말하는 문장이에요.'],
    'pattern-qs-p148-goal-be-to-v': ['to improve the service의 역할을 고르세요.', 'Our goal is to improve the service.', 'goal 대신 intention / mission / objective / purpose를 써도 같은 관계예요.'],
    'pattern-qs-p148-to-4e0f970e6756': ['To learn new skills의 역할을 고르세요.', 'To learn new skills is important.'],
    'pattern-qs-p149-to-448c8f06423b': ['to receive a discount의 역할을 고르세요.', 'Enter the code to receive a discount.'],
    'pattern-qs-p151-how-to-v-34acecd03c00': ['', 'how · to · properly', '장비를 올바르게 다루는 법\nhow와 to부정사로 연결해요. properly는 to와 동사 사이에 놓아요.'],
    'pattern-qs-p179-whether-to-v-if-30744dec45d7': ['두 구조가 모두 맞는 것을 고르세요.', 'decide', '참석할지 여부 · to부정사로 축약한 구조와 완전한 절 구조를 짝지어요.'],
    'pattern-qs-p179-which-to-v-273c88ca487c': ['알맞은 구조를 고르세요.', 'which · book', '어느 책을 살지 · which 뒤에 선택할 명사 book을 남기는 축약 구조예요.'],
    'pattern-memory-p115-be-yet-to-v': ['', 'be yet'],
    'pattern-memory-p115-have-yet-to-v': ['', 'have yet'],
    'pattern-qs-p185-attached-be-plural': ['알맞은 문장 어순을 고르세요.', 'Attached', '두 일정표가 첨부되어 있어요. Attached를 문장 앞으로 보내요.'],
    'pattern-qs-p185-enclosed-be-singular': ['어순과 실제 주어가 맞는 것을 고르세요.', 'Enclosed', '영수증이 동봉되어 있어요. Enclosed를 문장 앞으로 보내요.'],
    'pattern-qs-p185-included-be-subject-core': ['실제 주어와 도치 전 어순을 고르세요.', 'Included is a list of participating companies.'],
    'pattern-qs-p187-enclosed-not-enclosure': ['각 표현의 역할을 고르세요.', 'Enclosed / enclosure', '동봉된 상태를 앞세운 문장과 동봉물이라는 명사를 구별해요.'],
    'pattern-qs-p186-had-past-participle': ['if를 생략한 조건절의 어순을 고르세요.', 'If she had submitted the form, ...'],
    'pattern-qs-p186-if-omitted-should-order': ['if를 생략한 조건절의 어순을 고르세요.', 'If any equipment should fail, ...'],
    'pattern-qs-p186-never-perfect-inversion': ['알맞은 어순을 고르세요.', 'Our assistant has never processed such a request.', 'Never를 문장 맨 앞으로 보내요.'],
    'pattern-qs-p186-no-longer-be-inversion': ['알맞은 어순을 고르세요.', 'The branch is no longer responsible.', 'No longer를 문장 맨 앞으로 보내요.'],
    'pattern-qs-p186-no-longer-be-inversion-subject-contrast': ['알맞은 문장 어순을 고르세요.', 'No · employees', 'No가 부사구가 아니라 주어 명사 employees를 꾸며요. 도치 여부도 확인해요.'],
    'pattern-qs-p186-nor-did-inversion': ['알맞은 어순을 고르세요.', 'The revision did not reduce costs, nor ...', '앞의 부정에 이어 절차를 바꾸지도 않았다고 말해요.'],
    'pattern-qs-p186-only-after-clause-did': ['after절과 주절의 어순을 고르세요.', 'Only after', '수리가 끝난 뒤에야 검사관이 문을 다시 열었다'],
    'pattern-qs-p186-only-by-does': ['주절의 어순을 고르세요.', 'Only by checking each invoice', '각 청구서를 확인해야만 회계사가 실수를 막는다 · 제시한 표현을 문장 앞으로 보내요.'],
    'pattern-qs-p186-only-when-subordinate-order': ['두 절의 어순을 고르세요.', 'Only when', '모든 승객이 지불했을 때만 조수가 명단을 보낸다'],
    'pattern-qs-p186-only-with-do-plural': ['주절의 어순을 고르세요.', 'Only with written instructions', '기술자들은 지침이 있어야만 작업을 시작해요. 제시한 표현을 문장 앞으로 보내요.'],
    'pattern-qs-p186-only-with-do-plural-subject-contrast': ['알맞은 어순을 고르세요.', 'Only · our manager', 'Only가 부사구가 아니라 주어를 꾸며요. 오직 우리 관리자만 암호를 안다'],
    'pattern-qs-p186-rarely-have-plural': ['현재완료의 어순을 고르세요.', 'Rarely', '부정 의미를 강조하려고 문장 맨 앞으로 보내요.'],
    'pattern-qs-p187-hardly-has-inversion': ['현재완료의 어순을 고르세요.', 'Hardly', '부정 의미를 강조하려고 문장 맨 앞으로 보내요.'],
    'pattern-qs-p186-seldom-does-base': ['알맞은 어순을 고르세요.', 'Seldom', '관리자가 전화에 거의 응답하지 않는다 · Seldom을 문장 맨 앞으로 보내요.']
  };
  function questionContent(card, stage) {
    const prompt = promptText(stage.prompt), lines = prompt.split('\n').map(line => line.trim()).filter(Boolean);
    if (card.pool === 'forms' && stage.fixedOrder) {
      return content('자주 쓰는 동사 형식을 모두 고르세요.', lines[0]);
    }
    if (stage.kind === 'meaning') {
      const quoted = prompt.match(/[「『]([^」』]+)[」』]/);
      if (quoted) return content(/뜻이 가까운 표현/.test(prompt) ? '비슷한 표현을 고르세요.' : '다음 표현의 뜻을 고르세요.', quoted[1]);
      const cue = lines.slice(1).join('\n').replace(/(?:의 )?핵심 뜻을 고르세요[.。]?$/, '').replace(/뜻을 (?:하나 )?고르세요[.。]?$/, '').trim();
      return content('다음 표현의 뜻을 고르세요.', lines[0], /^(?:(?:이 형식의 쓰임|이 쓰임)(?:의)?|동사와 정도 부사를 함께 해석한)$/.test(cue) ? '' : cue);
    }
    if (/^목표 뜻:/.test(lines[0]) && /빈자리에 올 전치사·입자를/.test(lines.at(-1))) {
      return content(choose(stage, '전치사·입자'), lines.slice(1, -1).join('\n'), lines[0].replace(/^목표 뜻:\s*/, ''));
    }
    const pronoun = prompt.match(/^‘([^’]+)’의 뜻으로 it을 목적어로 쓸 때의 어순을 하나 고르세요\.\n([\s\S]+)$/);
    if (pronoun) return content('it을 목적어로 쓰는 어순을 고르세요.', pronoun[2], pronoun[1]);
    const special = structureContent[card.id];
    if (special) return content(special[0] || choose(stage), special[1], special[2]);
    if (/^forms-link-/.test(card.id)) return content(choose(stage), lines[0], lines[1].replace(/^목표 뜻:\s*/, ''));
    if (/^forms-passive-/.test(card.id)) return content('알맞은 수동태 구조를 고르세요.', lines[0], lines[1].replace(/^목표 뜻:\s*/, '') + '\n받는 사람이 주어예요.');
    let match;
    if ((match = prompt.match(/^「([^」]+)」에서 주어 자신의 상태·행동을 전치사 없이 직접 잇는/))) return content(choose(stage), match[1], '주어 자신의 상태·행동을 전치사 없이 직접 연결해요.');
    if ((match = prompt.match(/^「([^」]+)」가 행동을 직접 목적어로 받는/))) return content(choose(stage), match[1], '행동을 직접 목적어로 받아요.');
    if ((match = prompt.match(/^「([^」]+)」 뒤에서 사람 A와 그 사람이 할 행동을 잇는/))) return content(choose(stage), match[1], '사람 A와 그 사람이 할 행동을 연결해요.');
    if ((match = prompt.match(/^명사 「([^」]+)」의 내용을 뒤에서 전치사 없이 직접 설명하는/))) return content(choose(stage), match[1] + ' (n)', '명사의 내용을 뒤에서 전치사 없이 직접 설명해요.');
    if ((match = prompt.match(/^「([^」]+)」에서 행동을 직접 잇는/))) return content(choose(stage), match[1], '행동을 직접 연결해요.');
    if ((match = prompt.match(/^「([^」]+)」 뒤에서 주어가 하도록 전달받은 행동을 잇는/))) return content(choose(stage), match[1], '주어가 하도록 전달받은 행동을 연결해요.');
    if (/^전치사 없이 that \+ S \+ V를 이어/.test(prompt)) return content('알맞은 동사를 고르세요.', 'that + S + V', '사실·내용을 전치사 없이 바로 목적어로 받아요.');
    if (/^that절에서 should가 생략되어도/.test(prompt)) return content('알맞은 동사를 고르세요.', 'that + S + (should) 동사원형', 'should가 생략되어도 주어 수와 관계없이 동사원형을 써요.');
    if ((match = prompt.match(/^「([^」]+)」 뒤에 필요한 전치사와 후속 성분을/))) return content(choose(stage), match[1], '필요한 전치사와 뒤에 오는 형태를 함께 확인해요.');
    if ((match = prompt.match(/^「([^」]+)」를 「([^」]+)」의 뜻으로 연결할 때/))) return content(choose(stage), match[1], match[2] + ' · 필요한 전치사와 뒤에 오는 형태를 함께 확인해요.');
    if ((match = prompt.match(/^「([^」]+)」라는 뜻으로 행동을 연결하는/))) return content(choose(stage, '표현'), match[1], '행동을 전치사 표현으로 연결해요.');
    if ((match = prompt.match(/^다음 보기 중 「([^」]+)」 뒤에서 행동을 직접 잇는/))) return content(choose(stage), match[1], '뒤에서 행동을 직접 연결해요.');
    if ((match = prompt.match(/^「([^」]+)」 뒤에 행동을 전치사 없이 직접 잇는/))) return content(choose(stage), match[1], '뒤에 행동을 전치사 없이 직접 연결해요.');
    if ((match = prompt.match(/^(be ___ that S \+ V|I’m ___ \(that\) S \+ V)처럼 사실을 절로 직접 잇는/))) return content('알맞은 형용사를 고르세요.', match[1], '사실을 절로 직접 연결해요.');
    if ((match = prompt.match(/^‘([^’]+)’를 ([^‘]+) 앞의 ‘의문사 \+ to V’로 나타낼 때/))) return content(choose(stage), match[2], match[1] + ' · 의문사 + to V로 연결해요.');
    if ((match = prompt.match(/^([^:]+): A=제공·추천·제안할 것, B=받는 사람일 때,/))) return content('알맞은 구조를 고르세요.', match[1], 'A = 제공·추천·제안할 것 · B = 받는 사람\nA를 먼저 놓아요.');
    if ((match = prompt.match(/^([^로]+)로 ‘사람 A에게 과정 B를 단계별로 안내·설명하다’/))) return content(choose(stage), match[1], '사람 A에게 과정 B를 단계별로 안내·설명하다');
    // Future, unfamiliar prompts keep their full cue instead of guessing which
    // condition can be discarded or manufacturing an English answer as a cue.
    return content(choose(stage, '답'), '', prompt.replace(/(?:하나를 |하나 |해당하는 것을 모두 )?고르세요[.。]?$/, '').trim());
  }
  const button = (action, label, className = 'secondary-button', extra = '') => `<button type="button" class="${className}" data-grammar-action="${action}" ${extra}>${label}</button>`;
  function sourceText(source) {
    return (source.book === 'quickstart' ? '퀵스타트' : '파워토익 VOCA') + (source.bookPage ? ' ' + source.bookPage + '쪽' : '') + (source.entry ? ' · 항목 ' + source.entry : '');
  }
  function feedback(card, q, nextLabel) {
    const answers = q.feedback.answers, passed = q.feedback.passed;
    const keywords = window.PowerFeedbackCore && window.PowerFeedbackView;
    const core = keywords ? window.PowerFeedbackView.renderCore(window.PowerFeedbackCore.build({
      id: card.id, word: card.target, passed, grammar: true, question: card,
      summaryRows: card.summary || [],
      stages: card.stages.map((stage, i) => ({ ...stage, selected: answers[i]?.selected || [], skipped: !answers[i] }))
    })) : '';
    const summary = (card.summary || []).map(item => `<div class="grammar-summary-item"><h3 class="answer-summary-expression">${esc(display(item.structure))}</h3><p class="answer-summary-meaning">${esc(display(item.meaning))}</p></div>`).join('');
    return `<section class="panel feedback-panel${passed ? '' : ' wrong'}${keywords ? ' keyword-feedback-panel' : ''}" id="grammar-feedback-panel" aria-labelledby="grammar-feedback-title">
      <p class="eyebrow">ANSWER &amp; EXPLANATION</p><h2 id="grammar-feedback-title" tabindex="-1">${keywords ? passed ? '✓ 정답' : '↺ 다시 확인' : passed ? '모두 정확하게 풀었어요.' : '이 쓰임을 다시 확인해요.'}</h2>
      ${core}<details class="feedback-details"${keywords ? '' : ' open'}><summary>내 답 · 전체 보기</summary>
      <p class="correct-answer">${answers.length < card.stages.length ? '1단계 오답으로 이 문제를 종료했어요. 이후 단계는 채점에 포함하지 않아요.' : card.stages.length + '단계 중 ' + answers.filter(answer => answer.correct).length + '단계 정답 · 아래에서 각 선택지를 확인해 보세요.'}</p>
      ${keywords ? '' : `<section class="answer-summary" aria-label="표현과 뜻"><p class="answer-summary-label">${esc(display(card.target))} · 표현과 뜻</p>${summary}</section>`}
      ${card.stages.map((stage, index) => {
        const answer = answers[index], skipped = !answer, order = q.orders?.[index] || stage.options.map((_, i) => i), question = questionContent(card, stage);
        const selected = answer ? answer.selected.map(i => display(stage.options[i])).join(' / ') : '';
        return `<section class="stage-feedback"><h3 class="stage-feedback-title${skipped ? '' : answer.correct ? '' : ' wrong'}">${index + 1}단계 · ${skipped ? '미진행 · 복습용 해설' : answer.correct ? '정답' : '오답'}</h3>
          <p class="stage-feedback-prompt">${esc([question.example, question.context].filter(Boolean).join('\n') || question.instruction)}</p><p class="stage-answer-line">정답 ${esc(stage.correct.map(i => display(stage.options[i])).join(' / '))}</p>
          <p class="stage-selected-line">${skipped ? '1단계에서 틀려 진행하지 않았어요. 이 단계는 채점 횟수에 포함하지 않아요.' : '선택한 답 ' + esc(selected)}</p>
          <div class="feedback-section"><h3>정답 근거</h3><p>${esc(display(stage.explanation))}</p></div>
          <div class="feedback-section"><h3>선택지 하나씩 확인하기</h3><ol class="reason-list">${order.map((original, position) => {
            const correct = stage.correct.includes(original), picked = answer?.selected.includes(original);
            return `<li class="reason-item${correct ? ' is-answer' : ''}"><div class="reason-item-heading"><span class="reason-letter">${String.fromCharCode(65 + position)}</span><span class="reason-option">${esc(display(stage.options[original]))}</span>${correct ? '<span class="reason-mark">정답</span>' : picked ? '<span class="reason-mark">선택한 답</span>' : ''}</div><p>${esc(display(stage.reasons[original]))}</p></li>`;
          }).join('')}</ol></div></section>`;
      }).join('')}
      </details>
      ${card.note ? `<details class="feedback-details"${keywords ? '' : ' open'}><summary>설명 · 예문</summary><div class="learning-point"><p>${esc(display(card.note))}</p></div></details>` : ''}
      <details class="feedback-details"${keywords ? '' : ' open'}><summary>교재 위치</summary><p class="question-source">${[...new Set((card.sources || []).map(sourceText))].map(esc).join(' · ')}</p></details>
      ${button('next', nextLabel, 'secondary-button feedback-next')}
    </section>`;
  }
  function quiz(session, cards, E) {
    const q = E.current(session, cards), stats = E.stats(session, cards), content = questionContent(q.card, q.stage);
    const nextLabel = session.cursor === session.ids.length - 1 ? '풀이 결과 보기' : '다음 문제 →';
    const entry = session.entries[q.card.id];
    const highest = q.complete ? q.feedback.answers.length - 1 : q.activeStage;
    const explanation = q.complete ? feedback(q.card, { ...q, orders: entry.orders }, nextLabel) : '';
    let submit = '';
    if (!q.locked) submit = button('submit', q.stageIndex < q.card.stages.length - 1 ? q.stageIndex ? '다음 단계 →' : '답 확인 →' : '채점하기', 'primary-button', q.selected.length ? '' : 'disabled');
    else if (q.stageIndex < highest) submit = button('following-stage', q.complete ? '다음 단계 →' : '현재 단계로 →', 'primary-button');
    return `<div class="quiz-topline"><span class="pill">${esc(names[session.scope])}</span>${button('result', '풀이 현황 보기', 'text-button')}</div>
      <div class="progress-caption"><p>문제 ${session.cursor + 1} / ${stats.total}</p><p>채점 ${stats.done} · 모두 맞힌 문제 ${stats.cardsCorrect}</p></div>
      <div class="progress-track" role="progressbar" aria-label="채점 완료" aria-valuemin="0" aria-valuemax="${stats.total}" aria-valuenow="${stats.done}"><span style="width:${stats.done / stats.total * 100}%"></span></div>
      <article class="panel question-panel" id="grammar-question-panel"><div class="question-heading-line"><p class="eyebrow">QUESTION ${String(session.cursor + 1).padStart(2, '0')}</p><span class="question-state">${q.complete ? '채점 완료' : q.locked ? '제출한 단계' : q.selected.length ? '선택 완료 · 아직 미채점' : '미채점'}</span></div>
      <div class="stage-topline"><p class="stage-indicator">${q.stageIndex + 1} / ${q.card.stages.length}단계${!q.complete && q.card.stages.length > 1 ? q.stageIndex ? ' · 세트 마지막에 한 번에 채점' : ' · 첫 답을 맞히면 다음 단계' : ''}</p></div>
      <h1 class="instruction" id="grammar-question-instruction" tabindex="-1">${esc(content.instruction)}</h1>${content.example ? `<p class="question-example">${esc(content.example)}</p>` : ''}${content.context ? `<p class="question-context">${esc(content.context)}</p>` : ''}
      <fieldset class="options-fieldset" ${q.locked ? 'disabled' : ''}><legend class="sr-only">${q.stage.mode === 'multi' ? '해당하는 답을 모두 선택하세요.' : '정답을 하나 선택하세요.'}</legend>
      <div${q.order.length > 4 ? ` class="grammar-options-grid" style="grid-template-rows:repeat(${Math.ceil(q.order.length / 2)},auto)"` : ''}>${q.order.map((original, position) => {
        const selected = q.selected.includes(original), correct = q.complete && q.stage.correct.includes(original);
        return `<label class="option${selected ? ' selected' : ''}${q.locked ? ' locked' : ''}${q.complete ? correct ? ' correct' : selected ? ' incorrect' : '' : ''}" for="grammar-option-${original}"><input id="grammar-option-${original}" name="grammar-choice" type="${q.stage.mode === 'multi' ? 'checkbox' : 'radio'}" value="${original}" ${selected ? 'checked' : ''}><span class="option-letter">${String.fromCharCode(65 + position)}</span><span class="option-text">${esc(display(q.stage.options[original]))}</span>${q.complete && correct ? '<span class="option-tag">정답</span>' : ''}</label>`;
      }).join('')}</div></fieldset>
      <div class="question-actions">${button('previous', '이전 문제', 'secondary-button', session.cursor ? '' : 'disabled')}${button('previous-stage', '← 이전 단계', 'text-button previous-stage-action', q.stageIndex ? '' : 'hidden')}${submit}${button('next', nextLabel, 'primary-button', q.complete ? '' : 'hidden disabled')}</div>
      <p class="choice-hint">${q.complete ? '선택한 답은 채점 후 변경되지 않아요. 오답 연습에서 다시 도전할 수 있어요.' : q.locked ? '제출한 단계는 바꿀 수 없어요. 현재 단계로 돌아가 계속 풀어 주세요.' : (q.stage.mode === 'multi' ? '해당하는 답을 모두 선택하세요. ' : '') + (q.stageIndex ? '중간에는 정오답을 표시하지 않아요. 세트를 마친 뒤 선택한 답과 정답을 함께 확인해요.' : q.card.stages.length > 1 ? '첫 답이 틀리면 바로 오답 처리해요. 맞히면 다음 단계로 넘어가고, 마지막 채점 후 해설을 보여줘요.' : '선택만으로 정답이 공개되지 않아요.')}</p></article>${explanation}`;
  }
  function result(session, cards, E) {
    const stats = E.stats(session, cards), remaining = stats.total - stats.done;
    return `<section class="panel results-panel" aria-labelledby="grammar-results-title"><p class="eyebrow">YOUR PRACTICE</p><h1 id="grammar-results-title" tabindex="-1">이번 풀이를 돌아봐요.</h1>
      <p class="results-description">${remaining ? stats.total + '문제 중 아직 ' + remaining + '문제를 채점하지 않았어요.' : '이번 ' + stats.total + '문제를 모두 확인했어요.'} 한 단계라도 틀린 문제는 오답 연습에 포함돼요.</p>
      <div class="score-grid" aria-label="풀이 결과"><div><span>정답</span><strong>${stats.cardsCorrect}</strong></div><div><span>오답</span><strong>${stats.cardsWrong}</strong></div><div><span>미채점</span><strong>${remaining}</strong></div></div>
      <p class="stage-score">완료 문항의 단계 정답 ${stats.stagesCorrect} / ${stats.stagesAttempted} · 미진행 단계는 집계에서 제외해요.</p>
      <div class="results-actions">${remaining ? button('remaining', '남은 문제 이어 풀기', 'primary-button') : button('resume', '답안 다시 보기', 'primary-button')}${button('retry', '틀린 문제만 다시 풀기', 'secondary-button', stats.cardsWrong && !remaining ? '' : 'disabled')}${button('home', '학습 범위 선택', 'secondary-button')}</div></section>
      <section class="panel review-panel"><h2>문제별 풀이 현황</h2><p class="review-caption">문제를 누르면 선택한 답과 해설을 다시 확인할 수 있어요.<br>미채점 문제의 정답은 채점하기 전까지 공개하지 않아요.</p>
      <ol class="review-list">${session.ids.map((id, index) => {
        const card = cards.find(item => item.id === id), entry = session.entries[id];
        const passed = entry.complete && entry.answers.length === card.stages.length && entry.answers.every(answer => answer.correct);
        const caption = entry.complete ? display(card.target) : questionContent(card, card.stages[0]).example || questionContent(card, card.stages[0]).instruction;
        return `<li>${button('review', `<span class="review-index">${index + 1}</span><span class="review-text">${esc(caption)}</span><span class="review-status${entry.complete ? passed ? ' correct' : ' wrong' : ''}">${entry.complete ? passed ? '정답' : '오답' : '미채점'}</span>`, 'review-button', `data-index="${index}"`)}</li>`;
      }).join('')}</ol></section>`;
  }
  function create(options) {
    const E = window.GrammarEngine, M = window.GrammarSyncModel, S = window.GrammarSiteState, cards = window.GRAMMAR_PREVIEW?.cards;
    const container = options?.container;
    if (!container || !E || !M || !S || !cards?.length) throw Error('문형·구조 학습 자료를 불러오지 못했어요. 새로고침해 주세요.');
    let backend; try { backend = options.backend || window.localStorage; } catch { backend = null; }
    const state = S.create(cards, backend), document = container.ownerDocument || window.document;
    const view = document.createElement('div'), mount = document.createElement('div'), notice = document.createElement('p');
    view.className = 'grammar-embedded-content'; mount.hidden = true; mount.setAttribute('aria-hidden', 'true');
    notice.className = 'storage-status'; notice.setAttribute('role', 'status'); notice.setAttribute('aria-live', 'polite');
    container.classList.add('grammar-embedded'); container.replaceChildren(view, notice, mount);
    let session = state.session, roundId = state.roundId, page = 'idle', controller = null, pending = null, disposed = false;
    let ready = false, phase = 'starting', failed = false, connecting = false, generation = 0;
    const hosted = ['http:', 'https:'].includes(window.location?.protocol);
    const newId = () => window.crypto?.randomUUID?.() || 'round-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
    function status() {
      const stats = session ? E.stats(session, cards) : null;
      return { ready, phase, pending: Boolean(pending), hasResume: Boolean(session), totals: M.totals(state.payload),
        learnedCount: new Set(Object.values(state.payload.history).map(item => item.id)).size,
        resume: stats ? { scope: session.scope, label: names[session.scope], total: stats.total, done: stats.done,
          correct: stats.cardsCorrect, wrong: stats.cardsWrong, remaining: stats.total - stats.done, cursor: session.cursor } : null };
    }
    function notify() { options.onChange?.(status()); }
    function announce(message) { notice.textContent = message || ''; options.onNotice?.(message || ''); }
    function focusAndScroll(selector, heading) {
      const panel = view.querySelector(selector), target = view.querySelector(heading);
      target?.focus({ preventScroll: true }); panel?.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
    function render() {
      if (disposed) return;
      if (page === 'quiz' && session) view.innerHTML = quiz(session, cards, E);
      else if (page === 'result' && session) view.innerHTML = result(session, cards, E);
      else view.innerHTML = `<section class="panel loading-panel"><p class="eyebrow">문형·구조</p><h1>${failed ? '학습 기록을 확인하지 못했어요.' : pending ? '학습 기록을 준비하고 있어요.' : '선택한 범위에서 연습을 시작해요.'}</h1><p>${failed ? '저장된 풀이를 보호하기 위해 시작을 보류했어요. 연결을 다시 확인해 주세요.' : pending ? '저장된 풀이를 확인한 뒤 선택한 문제를 시작해요.' : '학습 범위 선택에서 문제 수와 순서를 고를 수 있어요.'}</p>${failed ? button('reconnect', '기록 다시 확인', 'primary-button') : ''}${button('home', '학습 범위 선택', 'text-button')}</section>`;
    }
    function save() { if (session) { state.commit(session, roundId); notify(); } }
    function begin(settings) {
      if (state.payload.session && (!session || E.stats(session, cards).done < session.ids.length) && !window.confirm('새 연습은 현재 이어 풀기를 교체해요. 누적 기록은 유지됩니다. 시작할까요?')) return false;
      if (state.payload.session && !session && !state.backupCurrent()) throw Error('예전 이어 풀기의 백업을 저장하지 못했어요. 기존 기록은 그대로예요.');
      session = E.start(cards, settings); roundId = newId(); page = 'quiz'; save(); render();
      focusAndScroll('#grammar-question-panel', '#grammar-question-instruction'); return true;
    }
    function openPending() {
      if (!ready || !pending || disposed) return;
      const request = pending; pending = null;
      try {
        if (request.kind === 'start') { const opened = begin(request.settings); request.resolve(opened); if (!opened) goHome(); }
        else if (session) {
          page = request.settings?.view === 'result' && E.stats(session, cards).done === session.ids.length ? 'result' : 'quiz';
          render();
          if (page === 'result') focusAndScroll('.results-panel', '#grammar-results-title');
          else focusAndScroll('#grammar-question-panel', '#grammar-question-instruction');
          request.resolve(true);
        }
        else { page = 'idle'; render(); announce('저장된 문형·구조 풀이가 없어요. 학습 범위를 선택해 새 연습을 시작해 주세요.'); request.resolve(false); options.onHome?.(); }
      } catch (error) { page = 'idle'; render(); announce(error.message); request.resolve(false); }
    }
    function request(kind, settings) {
      if (disposed) return Promise.resolve(false);
      if (pending) pending.resolve(false);
      announce(''); page = 'idle';
      const promise = new Promise(resolve => { pending = { kind, settings, resolve }; });
      render(); openPending(); return promise;
    }
    function goHome() {
      if (pending) { pending.resolve(false); pending = null; }
      page = 'idle'; render(); options.onHome?.();
    }
    function act(action, index) {
      announce('');
      if (action === 'home') { goHome(); return; }
      if (action === 'reconnect') { void connect(); return; }
      if (action === 'resume') { void request('resume'); return; }
      if (!session || !['quiz', 'result'].includes(page)) return;
      let target = 'question';
      const q = E.current(session, cards);
      switch (action) {
        case 'submit': session = E.submit(session, cards); target = E.current(session, cards).complete ? 'feedback' : 'question'; break;
        case 'previous-stage': if (!q.stageIndex) return; session = E.viewStage(session, cards, q.stageIndex - 1); break;
        case 'following-stage': session = E.viewStage(session, cards, q.complete ? q.stageIndex + 1 : q.activeStage); break;
        case 'previous': if (!session.cursor) return; session = E.move(session, cards, -1); break;
        case 'next':
          if (!q.complete) { announce('현재 문제를 채점한 뒤 다음 문제로 넘어갈 수 있어요.'); return; }
          if (session.cursor === session.ids.length - 1) { page = 'result'; target = 'result'; }
          else session = E.move(session, cards, 1);
          break;
        case 'result': page = 'result'; target = 'result'; break;
        case 'remaining': session = { ...session, cursor: Math.max(0, session.ids.findIndex(id => !session.entries[id].complete)) }; page = 'quiz'; break;
        case 'retry': session = E.retry(session, cards); roundId = newId(); page = 'quiz'; break;
        case 'review': if (!Number.isInteger(index) || index < 0 || index >= session.ids.length) return; session = { ...session, cursor: index }; page = 'quiz'; break;
        default: return;
      }
      save(); render();
      if (target === 'feedback') focusAndScroll('#grammar-feedback-panel', '#grammar-feedback-title');
      else if (target === 'result') focusAndScroll('.results-panel', '#grammar-results-title');
      else focusAndScroll('#grammar-question-panel', '#grammar-question-instruction');
    }
    function clicked(event) {
      const control = event.target.closest('button[data-grammar-action]');
      if (!control || control.disabled || !container.contains(control)) return;
      try { act(control.dataset.grammarAction, Number(control.dataset.index)); } catch (error) { announce(error.message); }
    }
    function changed(event) {
      if (event.target.name !== 'grammar-choice' || !session || page !== 'quiz') return;
      try {
        const focusId = event.target.id; session = E.select(session, cards, Number(event.target.value)); save(); render();
        view.querySelector('#' + focusId)?.focus({ preventScroll: true });
      } catch (error) { announce(error.message); }
    }
    async function connect() {
      if (disposed || connecting) return;
      connecting = true; ready = false; failed = false; phase = 'starting'; const ticket = ++generation;
      controller?.destroy(); controller = null; render(); notify();
      if (!state.canUpload()) { connecting = false; failed = true; phase = 'error'; render(); notify(); announce('원본 기록 백업을 저장하지 못해 계정 연결을 보류했어요. 기존 기록은 그대로예요.'); return; }
      if (!hosted) { connecting = false; ready = true; phase = 'local'; options.onReady?.(status()); notify(); openPending(); return; }
      try {
        const module = await (options.loadSync ? options.loadSync() : import('../shared/study-sync.js?v=20261024-menu1'));
        if (disposed || ticket !== generation) return;
        controller = module.connectStudySync({ appId: 'power-grammar', legacyKey: S.key, mount,
          getPayload: state.raw, createEmptyPayload: () => M.stringify(M.empty()), validatePayload: raw => M.parse(raw) !== null,
          mergePayload: M.merge, semanticPayload: M.semantic,
          onStatusChange: next => {
            if (disposed || ticket !== generation) return;
            const newlyReady = !ready && Boolean(next.ready); ready = Boolean(next.ready); phase = next.phase; failed = phase === 'error';
            if (page === 'idle') render();
            notify();
            if (newlyReady) { options.onReady?.(status()); openPending(); }
          },
          applyPayload: (raw, metadata) => {
            if (disposed || ticket !== generation) return;
            const replaced = state.apply(raw, metadata, page === 'quiz' || page === 'result');
            if (replaced) { session = state.session; roundId = state.roundId; page = 'idle'; }
            render();
            notify();
            if (metadata?.accountSwitch && !pending) options.onHome?.();
          },
          canUploadPayload: () => state.canUpload() && M.fits(state.raw()),
          summarizePayload: raw => { const p = M.parse(raw); return p ? '누적 채점 ' + M.totals(p).attempts + '회' + (p.session ? ' · 이어 풀기 있음' : '') : '기록 형식 확인 필요'; },
          hasLocalData: raw => { const p = M.parse(raw); return Boolean(p && (p.session || M.totals(p).attempts)); }
        });
        state.attach(controller);
      } catch (error) {
        if (!disposed && ticket === generation) { failed = true; phase = 'error'; render(); notify(); announce('계정 연결을 불러오지 못해 문제 시작을 보류했어요. 기록 다시 확인을 눌러 주세요. 기존 기록은 그대로예요.'); }
      } finally { if (ticket === generation) connecting = false; }
    }
    container.addEventListener('click', clicked); container.addEventListener('change', changed);
    render(); if (state.error) announce(state.error); void connect();
    return { start: settings => request('start', settings), resume: settings => request('resume', settings), goHome,
      hasResume: () => Boolean(session), getStatus: status,
      dispose() { disposed = true; ++generation; if (pending) pending.resolve(false); pending = null; controller?.destroy(); container.removeEventListener('click', clicked); container.removeEventListener('change', changed); }
    };
  }
  return { create, display, questionContent };
});
