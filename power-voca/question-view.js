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

  // Reviewed derivation tasks ask for the word relationship first. A short
  // role/derivation constraint is retained only where several offered words
  // belong to the same family (employee/employer, useful/useless, etc.).
  var familyPrompts = Object.create(null);
  [
    ['qs-p102-ability', 'able', '명사'],
    ['qs-p102-attendance', 'attend', '명사'],
    ['qs-p102-closure', 'close', '명사'],
    ['qs-p102-conclusion', 'conclude', '명사'],
    ['qs-p102-effectiveness', 'effective', '명사'],
    ['qs-p102-growth', 'grow', '명사'],
    ['qs-p102-movement', 'move', '명사'],
    ['qs-p111-dangerous', 'danger', '형용사'],
    ['qs-p111-efficient', 'efficiency', '형용사'],
    ['qs-p111-grateful', 'gratitude', '형용사'],
    ['qs-p111-innovative', 'innovation', '형용사'],
    ['qs-p111-mandatory', 'mandate', '형용사'],
    ['qs-p111-reliable', 'reliability', '형용사'],
    ['qs-p111-reliant', 'reliance', '형용사']
  ].forEach(function (row) { familyPrompts['usage1-' + row[0]] = row[1] + '의 ' + row[2] + '형을 고르세요.'; });
  familyPrompts['usage1-qs-p102-employee'] = 'employ의 어족에서 고용되는 사람을 나타내는 명사를 고르세요.';
  familyPrompts['usage1-qs-p102-organization'] = 'organize의 어족에서 단체 자체를 나타내는 단일 명사를 고르세요.';
  familyPrompts['usage1-qs-p102-pianist'] = 'piano에서 파생된 연주자 명사를 고르세요.';
  familyPrompts['usage1-qs-p102-professionalism'] = 'professional의 성질·태도를 나타내는 명사형을 고르세요.';
  familyPrompts['usage1-qs-p102-teacher'] = 'teach의 동작을 하는 사람을 나타내는 명사형을 고르세요.';
  familyPrompts['usage1-qs-p111-participant'] = 'participate에서 파생된 사람 명사를 고르세요.';
  familyPrompts['usage1-qs-p111-useless'] = 'use의 어족에서 부정의 뜻을 만드는 형용사를 고르세요.';

  // Exact reviewed prompts, including Korean lines embedded in prompt rather
  // than context. English already supplies each tense/time relationship.
  var promptOverrides = Object.create(null);
  function promptOnly(id, prompt) { promptOverrides[id] = { instruction: phrase, prompt: prompt, context: '' }; }
  [
    ['qs-p131-ago', "The company ___ this branch five years ago. Today is the branch's fifth anniversary."],
    ['qs-p131-every-time-each-time', 'The team ___ its progress every Friday as part of its normal weekly routine.'],
    ['qs-p131-last-time', 'The workshop ___ last month. All participants received their completion certificates then.'],
    ['qs-p131-usually-sometimes-regularly-generally-typically-often', 'She ___ the factory every Monday as part of her regular duties.'],
    ['qs-p132-by-the-time-present-future-perfect', 'By the time he arrives tomorrow, we ___ the repair.'],
    ['qs-p132-over-for-the-last-period', "Today's figures show that sales ___ steadily over the last three months."],
    ['qs-p132-over-for-the-past-period', 'She ___ here for the past two years and is still on the staff.'],
    ['qs-p132-recently-lately', 'We ___ unusually busy lately, and the busy period is still continuing today.'],
    ['qs-p132-since-then', 'We opened the store in 2020 and ___ many customers since then, including customers who came in today.'],
    ['qs-p132-since-time', 'She ___ here since 2020 and is still on the staff.'],
    ['qs-p132-so-far', 'It is noon, and applications are still arriving. We ___ twenty applications so far.']
  ].forEach(function (row) { promptOnly('time1-' + row[0], row[1]); });

  // Some preposition/connector choices express several valid relationships.
  // Keep only the requested relationship, without translating the sentence.
  function relation(id, prompt, context) { promptOverrides[id] = { instruction: '제시된 관계에 맞는 표현을 고르세요.', prompt: prompt, context: context }; }
  [
    ['qs-p163-in-the-car', 'The bag is ___ the car.', '위치: 차 안'],
    ['qs-p163-in-the-meeting-room', 'The documents are ___ the meeting room.', '위치: 회의실 안'],
    ['qs-p163-on-the-shelf', 'The manuals are ___ the shelf.', '위치: 선반 위'],
    ['qs-p163-on-the-table', 'The files are ___ the table.', '위치: 테이블 표면 위'],
    ['qs-p163-throughout-the-meeting', 'She took notes ___ the meeting.', '기간: 회의 내내'],
    ['qs-p164-above', 'The platform is ___ the water.', '위치: 수면에서 떨어진 위쪽'],
    ['qs-p164-along', 'We walked ___ the river.', '이동: 강의 길이를 따라'],
    ['qs-p164-among', 'The cabin stands ___ the trees.', '위치: 여러 나무 사이'],
    ['qs-p164-behind', 'The sign is ___ the column.', '위치: 기둥 뒤'],
    ['qs-p164-beneath', 'The pipe runs ___ the surface.', '위치: 표면 아래'],
    ['qs-p164-by-beside-next-to', 'A chair stands ___ the door.', '위치: 문 바로 옆'],
    ['qs-p164-in-front-of', 'The group is waiting ___ the entrance.', '위치: 출입구 앞'],
    ['qs-p164-into', 'They went ___ the house.', '이동: 밖에서 집 안으로'],
    ['qs-p164-near', 'The hotel is ___ the station.', '위치: 역 근처'],
    ['qs-p164-opposite-across-from', 'The bank is ___ the store.', '위치: 가게 맞은편'],
    ['qs-p164-past', 'Continue walking ___ the library.', '이동: 도서관을 지나서'],
    ['qs-p164-to', 'Please go ___ the service desk.', '이동: 서비스 데스크를 목적지로'],
    ['qs-p164-toward', 'She walked ___ the door.', '방향: 문 쪽으로'],
    ['qs-p164-under', 'The box is ___ the desk.', '위치: 책상 아래'],
    ['qs-p165-across-crossing', 'They walked ___ the bridge.', '이동: 다리를 가로질러'],
    ['qs-p165-against-leaning', 'The ladder rests ___ the tree.', '관계: 나무에 기대어'],
    ['qs-p165-against-opposition', 'They voted ___ the proposal.', '관계: 반대'],
    ['qs-p165-as', 'She serves ___ a manager.', '관계: 자격·역할'],
    ['qs-p165-except-for', 'The service runs every day ___ Sunday.', '관계: 일요일 제외'],
    ['qs-p165-following', 'There will be a discussion ___ the lecture.', '시간: 강연 후'],
    ['qs-p165-in-addition-to', 'We provide advice ___ our other services.', '관계: 추가'],
    ['qs-p165-in-advance-of', 'Check the details ___ your departure.', '시간: 출발 전'],
    ['qs-p165-instead-of', 'We took the bus ___ a taxi.', '관계: 대체'],
    ['qs-p165-other-than', 'We are open every day ___ Sunday.', '관계: 일요일 제외'],
    ['qs-p165-prior-to', 'Submit the form ___ the interview.', '시간: 면접 전'],
    ['qs-p165-regarding-concerning-as-to', 'Please read the information ___ the test.', '관계: 관련 주제'],
    ['qs-p165-regardless-of', 'The tour will operate ___ the weather.', '관계: 무관'],
    ['qs-p165-through-duration', 'Their friendship continued ___ the years.', '기간: 수년간 줄곧'],
    ['qs-p165-through-passage', 'The train travels ___ the tunnel.', '이동: 터널 내부를 통과'],
    ['qs-p165-with-having', 'We booked a room ___ a balcony.', '관계: 발코니가 딸린 방'],
    ['qs-p165-with-together', 'She met ___ clients.', '관계: 동반'],
    ['qs-p165-without', 'Returns are not accepted ___ a receipt.', '조건: 영수증 없음'],
    ['qs-p166-and', 'We offer training ___ support.', '관계: 둘 다'],
    ['qs-p166-but', 'The talk was long ___ useful.', '관계: 대조'],
    ['qs-p166-or', 'You may call ___ email us.', '관계: 둘 중 하나'],
    ['semantic1-ui2-qs-p164-between-plural-noun', 'Do not eat snacks ___ meals.', '시간: 식사와 식사 사이'],
    ['semantic1-ui2-qs-p164-by-deadline', 'Submit the report ___ Friday.', '시간: 마감 기한'],
    ['semantic1-ui2-qs-p164-during-event', 'She took notes ___ the workshop.', '시간: 워크숍 동안'],
    ['semantic1-ui2-qs-p164-until-endpoint', 'The sale will continue ___ Friday.', '시간: 금요일까지 계속']
  ].forEach(function (row) { relation(row[0], row[1], row[2]); });
  [
    ['qs-p163-at-the-airport', 'Meet me ___ the airport.'],
    ['qs-p163-at-the-corner-of-the-street', 'The café is ___ the corner of the street.'],
    ['qs-p163-in-the-summer', 'The program runs ___ the summer.'],
    ['qs-p163-on-christmas', 'The store is closed ___ Christmas.'],
    ['qs-p163-on-the-weekend', 'We will meet ___ the weekend.'],
    ['qs-p163-throughout-the-world', 'Our products are sold ___ the world.'],
    ['qs-p163-within-two-weeks', 'We will reply ___ two weeks.'],
    ['qs-p163-within-walking-distance', 'The station is ___ walking distance.'],
    ['qs-p164-during-the-past-three-months', 'We collected data ___ the past three months.'],
    ['qs-p165-across-extent', 'The company has stores ___ the country.'],
    ['qs-p165-against-violation', 'The practice is ___ the law.'],
    ['qs-p166-b-as-well-as-a', 'The service includes installation as ___ as delivery.']
  ].forEach(function (row) { promptOnly(row[0], row[1]); });

  // Allowlist from a review of the full context inventory. These translations
  // repeat a collocation, role, or time relationship already supplied by the
  // English task. Ambiguous relations (care for/about, result in/from,
  // leave for/from, go through/into, etc.) deliberately retain their scope.
  var withoutGrammarContext = new Set((
    'forms-give-transfer forms-passive-award forms-passive-give forms-passive-grant forms-passive-offer forms-passive-send forms-passive-show ' +
    'forms-passive-appoint forms-passive-name ' +
    'conn-that-assume conn-that-report conn-that-stipulate conn-that-announce conn-that-anticipate conn-that-confirm conn-that-ensure conn-that-guarantee conn-that-indicate conn-that-mention conn-that-notice conn-that-predict conn-that-realize conn-that-reveal conn-that-say conn-that-show conn-that-understand ' +
    'conn-look-forward conn-accustomed conn-committed conn-dedicated conn-object conn-process ' +
    'conn-connector-after conn-connector-before conn-connector-besides conn-connector-by conn-connector-despite conn-connector-in conn-connector-instead conn-connector-upon conn-connector-without ' +
    'conn-would-you-like-me conn-clause-be-aware conn-clause-be-confident conn-clause-i-m-afraid conn-clause-i-m-sorry conn-clause-our-records-show conn-that-omission conn-gerund-subject ' +
    'pattern-full-e0779-meaning pattern-full-e0784-x3-meaning pattern-full-e0794-meaning pattern-full-e0796-use pattern-full-e0796-x1-use pattern-full-e0811-meaning pattern-full-e0896-use pattern-full-e0910-use ' +
    'pattern-qs-p185-attached-be-plural pattern-qs-p186-no-longer-be-inversion-subject-contrast pattern-qs-p186-nor-did-inversion pattern-qs-p186-only-after-clause-did pattern-qs-p186-only-by-does pattern-qs-p186-only-when-subordinate-order pattern-qs-p186-only-with-do-plural pattern-qs-p186-only-with-do-plural-subject-contrast pattern-qs-p186-seldom-does-base ' +
    'prep-take-over-1432e8a47a prep-vary-from-3bdead7c97 prep-allow-for-afbe2e7783 prep-participate-in-bd9a7a7e3e prep-subscribe-to-69c8618a00 ' +
    'prep-reside-in-c5982b55e6 prep-live-in-4ddc9e6179 prep-dwell-in-0ec17ab5ac prep-search-for-83b88277c3 prep-proceed-with-cf68f5e3f3 prep-proceed-to-08a3731804 prep-go-to-a7efa039a8 prep-head-to-deb52f400b prep-arrive-at-7b3889ee85 prep-arrive-in-b8d4fdf84c ' +
    'prep-comply-with-9f38b8ff5c prep-conform-to-28f5279c62 prep-adhere-to-8398dbb31c prep-abide-by-8a4768d1da prep-attend-to-02bdb10c62 prep-object-to-6a85672264 prep-register-for-9cafb0ff44 prep-sign-up-3aafeb49cf prep-enroll-in-d3fb50ff77 ' +
    'prep-compete-with-against-c630b20c3b prep-compete-with-against-07ae916928 prep-compete-for-d2b29620cf prep-invest-in-22f667819a prep-cope-with-033e7226ca prep-deal-with-c5a6c0cdaa prep-coincide-with-877278a20a prep-coincide-with-9e443ddfd8 prep-collaborate-with-ebcc782c94 prep-collaborate-on-019c5da753 prep-emerge-as-0676d4b53b ' +
    'prep-dispose-of-c9105c35e4 prep-refrain-from-aa7186f26d prep-interfere-with-b0baa1ce6a prep-succeed-in-eea58fb471 prep-consist-of-a024d41f8c prep-specialize-in-d4a19bf765 prep-account-for-19f0b1d69f prep-account-for-0b8acf4a5a prep-refer-to-d08487694b ' +
    'prep-depend-on-upon-c69529d489 prep-rely-on-upon-225ba2f715 prep-count-on-upon-3b0fb17866 prep-draw-on-upon-1dd22a4644 prep-differ-from-e528bcbc37 prep-go-through-fe86b1f2cc prep-suffer-from-7c0216f92d prep-benefit-from-by-582a520bb7 prep-benefit-from-by-baff49f93c prep-benefit-from-by-9e761f65ee prep-drop-by-baef3c338f prep-adapt-to-f80c7c299f ' +
    'prep-put-off-46a2c159b8 prep-fill-in-2f4f9b59ba prep-fill-in-out-f30f8fa6a0 prep-concentrate-on-upon-ec1ff842c7 prep-turn-out-1937a062f7 prep-hand-in-038448fc42 prep-turn-down-a2f4aa584c prep-revert-to-4753876bb2 prep-lag-behind-3c4ecead07 prep-fall-behind-9cb267c578 ' +
    'prep-go-over-7b17fc14ca prep-look-over-0c7476519c prep-long-for-11f295914d prep-qualify-for-f15524887d prep-mark-down-7f5ce077de prep-cut-down-b837589793 prep-pay-for-b18a3c2b24 prep-cater-to-752f6b6f53 prep-shop-for-e17dba436b prep-comment-on-c455e1b215 prep-start-with-b306133619 prep-begin-with-5e58774568 prep-qualify-for-1ed8737a88 ' +
    'prep-be-aimed-at-639bad9e88 prep-agree-with-8a7c2ca5dd prep-agree-on-upon-196760adad prep-agree-on-upon-fcf44d2775 prep-strive-for-15c5d31afa prep-be-propped-against-0dd225016f prep-lean-against-9053cea120 prep-be-suspended-over-ceebd78a21 prep-jot-down-252f386a94 prep-write-down-de52a59d2c prep-sort-through-926b6b2548 prep-be-mounted-on-1aca341691 ' +
    'prep-stick-to-3e0140e174 prep-stick-out-c07b3a4f3f prep-figure-out-18a5bba398 prep-pull-up-74f209861f prep-set-a-apart-36ec0346ea prep-set-a-from-35ceb6d237 prep-throw-away-6be10dbba9 prep-it-depends-on-upon-1709155af7 prep-deal-with-02d9018a4a prep-deal-with-499b33c776 prep-fill-in-for-956c7679e2 prep-go-ahead-ead0efc079 prep-look-no-further-than-07f99401c2 ' +
    'prep-report-to-cda359f030 prep-report-to-e10c801ac0 prep-report-on-5f34247aa7 prep-be-invited-to-ef7fd5bbba prep-break-down-ddcbbc95f5 prep-kick-off-72402f87f4 prep-roll-out-66e0cb613c prep-gear-toward-32359f7249 prep-be-geared-toward-7dd578a2aa prep-go-into-3412dea042 prep-come-into-8e37a9fe85 prep-be-accompanied-by-6383836f36 prep-wrap-up-92f544825e prep-wrap-up-83a14a83a0 prep-stand-out-9570b77558 prep-follow-up-on-64947d4f89 prep-follow-up-with-241ce361a1 prep-pay-for-898f1f6002 prep-come-across-a653cb1825 ' +
    'prep-proceed-with-81e62e3e9f prep-account-for-d4b1c83bec prep-appeal-to-fe321d3637 prep-arrive-in-908adb7c75 prep-position-qs-p139-call-off prep-coincide-with-ee72f5b44f prep-collaborate-on-bb5046eece prep-comment-on-b591143508 prep-communicate-with-92032523ab prep-conform-to-be99f904f4 prep-consent-to-20ebf2be19 prep-consist-of-8005f9a9a7 prep-deal-with-c6ce19f445 ' +
    'prep-depend-on-upon-e375971d7a prep-differ-from-a17f97c988 prep-dispose-of-dd088c1e0b prep-focus-on-upon-553d0dd06e prep-inquire-about-e0252fca23 prep-inquire-into-c08fb556af prep-participate-in-25a3b2d2f8 prep-position-qs-p139-put-off prep-qualify-for-089fd7ff89 prep-refer-to-e64704c4e1 prep-refrain-from-458f2fb890 prep-rely-on-upon-3ca790d922 prep-subscribe-to-d95be00184 prep-wait-for-542eb0ff27 ' +
    'prep-come-across-733fe6d043 prep-come-by-99f5e91623 prep-come-to-736b799afb prep-come-with-ca99dd1b1d prep-go-over-773d496e9a prep-go-to-ffe4e33359 prep-go-with-72d897a2e2 prep-look-into-296d7be413 prep-look-over-131324b59d prep-position-qs-p140-turn-down prep-position-qs-p140-turn-in prep-position-qs-p140-turn-off prep-position-qs-p140-turn-on ' +
    'prep-invite-to-b064837b66 prep-remind-of-eea75d23cd prep-take-part-in-dd9f963636 prep-be-composed-of-6dc91616e7 prep-look-after-8894874e54 prep-comment-1v-on-29ef4107c4 prep-participate-in-88ee67e5ac'
  ).split(/\s+/));
  // These offer a second valid English reading, so their requested sense is
  // necessary even though nearby collocation questions need no translation.
  ['prep-look-into-296d7be413', 'prep-look-over-131324b59d', 'prep-go-over-773d496e9a'].forEach(function (id) { withoutGrammarContext.delete(id); });
  ['pattern-full-e0785-use', 'pattern-full-e0867-use', 'pattern-qs-p215-access-noun-verb-structure', 'prep-stick-around-103600491e', 'prep-bring-up-ee32f5570e', 'prep-wrap-up-66fde727e6', 'prep-result-in-d06d51bf43'].forEach(function (id) { withoutGrammarContext.add(id); });

  // Polysemous meaning questions still need their usage target, but the
  // English usage is sufficient; grammatical commentary adds no task scope.
  var meaningContexts = {
    'forms-core-look:1': 'look at / look for',
    'forms-core-remain:1': 'Two seats remain.',
    'forms-core-stay:1': 'Please stay here.',
    'forms-core-offer:1': 'offer to V',
    'forms-core-show:1': 'show that S V',
    'forms-core-consider:1': 'consider V-ing',
    'forms-core-find:1': 'find (the) time',
    'forms-core-keep:1': 'keep a copy',
    'forms-core-leave:1': 'leave for Seoul',
    'forms-core-leave:2': 'leave a package here',
    'forms-core-make:1': 'make a reservation',
    'forms-core-view:1': 'view the collection',
    'forms-core-view:2': 'view A as B',
    'forms-core-appoint:1': '',
    'forms-core-name:1': 'name the winner',
    'forms-core-name:2': 'name A acting director',
    'forms-core-call:1': 'call a meeting',
    'forms-core-call:2': '',
    'forms-core-elect:1': ''
  };

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
    if (stageIndex === 0 && grammar[id]) result = copy(grammar[id]);
    if (neutralInstructions.has(result.instruction)) result.instruction = neutralInstructions.get(result.instruction);
    if (isGrammar && stage && stage.kind === 'structure') {
      if (/^forms-passive-(?:award|give|grant|offer|send|show)$/.test(id)) {
        result.context = '';
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
    if (isGrammar && stageIndex === 0 && withoutGrammarContext.has(id)) result.context = '';
    if (isGrammar && Object.prototype.hasOwnProperty.call(meaningContexts, id + ':' + stageIndex)) result.context = meaningContexts[id + ':' + stageIndex];
    if (stageIndex === 0 && familyPrompts[question.id]) {
      result = { instruction: '제시된 단어의 어족 관계를 보고 고르세요.', prompt: familyPrompts[question.id], context: '' };
    }
    if (stageIndex === 0 && promptOverrides[question.id]) result = copy(promptOverrides[question.id]);
    if (isGrammar && stageIndex === 0 && ['pattern-full-e0698-x1-meaning', 'pattern-full-e0713-x2-meaning', 'pattern-full-e0713-x3-meaning'].indexOf(id) !== -1) result.context = 'A = 제공·추천·제안할 것 · B = 받는 사람';
    if (isGrammar && stageIndex === 0 && id === 'pattern-full-e0251-x1-meaning') result.context = '지위·직책에서 사람 A의 뒤를 잇다';
    if (isGrammar && stageIndex === 0 && id === 'pattern-full-e0757-meaning') result.context = '당신 B가 올 때 자료 A를 가지고 오다';
    if (isGrammar && stageIndex === 0 && id === 'pattern-full-e0113-x2-use') result.context = 'A = 사람 · B = 설명 내용';
    if (isGrammar && stageIndex === 0 && id === 'forms-rise-adverb') {
      result.instruction = '알맞은 구조를 고르세요.';
      result.context = '';
    }
    if (isGrammar && stageIndex === 0 && id === 'conn-clause-rest-assured') {
      result.instruction = phrase;
      result.prompt = 'rest ___';
      result.context = '';
    }
    if (stageIndex === 0 && question.id === 'usage1-qs-p111-official') result.prompt = '‘공식적인’에 해당하는 형용사를 고르세요.';
    if (stageIndex === 0 && question.id === 'usage1-qs-p111-temporary') result.prompt = '‘일시적인’에 해당하는 형용사를 고르세요.';
    if (stageIndex === 0 && question.id === 'semantic1-ui2-qs-p167-during-event-noun') {
      result.prompt = result.prompt.replace(/^행사 참석 동작을 동명사로 바꾸지 않고, 교재의 during 구조를 완성하세요\.\n/, '');
    }
    return result;
  }
  return { VERSION: '20261026-neutral2', present: present };
});
