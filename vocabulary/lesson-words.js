// 2026-09-27 사진 2장과 붙여넣은 학습 노트. | 단어, 뜻(; 구분), 품사, 메모
// 원문 오기와 뜻 보정은 해당 메모에 명시합니다.
const photoRows = `
small and medium enterprise|중소기업|복합 명사
implement|시행하다;실행하다;구현하다|동사
now that|이제 ~이므로|접속사
demand|수요;요구|명사
significantly|상당히|부사
no longer|더 이상 ~하지 않다|부사구
commercial|광고;상업의;상업적인|명사·형용사
catch|잡다;이해하다|동사
detail|세부 사항;상세히 설명하다|명사·동사
conference call|원격 회의;전화 회의|복합 명사
interest rate|금리;이자율|복합 명사|interest에는 관심·흥미 외에 이자라는 뜻도 있음
savings account|저축 계좌;예금 계좌|복합 명사|필기의 '연금계좌'는 연금 전용 계좌와 구별하여 예금 계좌로 보정
remain|남아 있다;계속 ~인 상태이다|동사
throughout|~동안 내내;~의 도처에|전치사
fiscal year|회계 연도|복합 명사
remind|상기시키다;생각나게 하다|동사|remind A to V: A에게 ~하라고 상기시키다
safety regulations|안전 규정|복합 명사
at work|근무지에서;일하는 중에|관용 표현
conform to|~을 준수하다;~에 따르다|숙어|conform to + 명사
comply with|~을 따르다;~을 지키다;~을 준수하다|숙어
participate in|~에 참가하다;~에 참여하다|숙어
hinder|방해하다|동사
tend|~하는 경향이 있다|동사|tend to + 동사원형
refrain from|~을 삼가다;~을 자제하다|숙어|필기의 '방해하다'를 보정. refrain from + 명사/동명사
interfere with|~을 방해하다|숙어
disclose|공개하다;밝히다|동사
address|다루다;처리하다;주소|명사·동사
complete|완료하다;완전한;완료된|동사·형용사
occur|발생하다|동사
renew|갱신하다|동사
ensure|보장하다|동사
thanks to|~덕분에|전치사구
turnout|참가자 수;참석자 수|명사
fundraising|모금;기금 모금|명사|기부금을 모으는 활동
deem|~라고 여기다;간주하다|동사|deem + 목적어 + 보어
succeed|성공하다;뒤를 잇다|동사
pastry|페이스트리|명사
frequently|종종;자주|부사
sprinkle|흩뿌림;뿌리다|명사·동사
nut|견과류|명사
flavorful|풍미 있는|형용사
marketing strategy|마케팅 전략|복합 명사
free of charge|무료로|관용 표현
resident|거주자;주민|명사
request|요청하다;요청|명사·동사
participate in|~에 참여하다|숙어
go to|~에 가다|숙어
attend|참석하다|동사|attend + 행사/회의: 전치사 없이 목적어를 바로 씀
wish|바라다;소원|명사·동사
fill out|작성하다|숙어
application form|신청서;지원서|복합 명사
no later than|늦어도 ~까지|관용 표현
undertake|착수하다;맡다|동사
`;

const textRows = `
be requested to V|~하도록 요청받다|구문|be requested to + 동사원형
progress report|현황 보고서;진행 보고서|복합 명사
immediate supervisor|직속 상관|복합 명사
submit|제출하다|동사
route|길;노선|명사
in advance|미리;사전에|관용 표현
personnel|인원;직원들|명사
operation|운영;업무|명사
auditor|회계 감사관|명사
regarding|~에 관하여|전치사
annual|연례의;연간의;매년의|형용사
expense report|비용 보고서|복합 명사
coordinator|조직자;진행 담당자|명사
review|검토하다|동사
performance|실적;성과|명사
focus on|~에 집중하다|숙어
specialize in|~을 전문으로 하다|숙어
subscription|구독|명사
notify|알리다;통지하다|동사
passenger|승객|명사
find|찾다;~임을 알게 되다|동사|find + 목적어 + 보어: 목적어가 ~임을 알게 되다
luggage|수하물;짐|명사
lost and found|분실물 보관소|관용 표현
pride oneself on|~에 자부심을 느끼다|숙어|원문의 onself를 oneself로 보정
maintain|유지하다|동사
sustainable|지속 가능한|형용사
workplace|직장;일터|명사
inform|알리다;통지하다|동사|inform A that S + V: A에게 ~라고 알리다. inform A of B: A에게 B를 알리다
colleague|동료|명사
permit|허용하다;가능하게 하다|동사
access|접근하다;이용하다|동사
supply|공급하다;공급;물품|명사·동사
office supplies|사무용품|복합 명사
corrupt|손상시키다;오염시키다|동사|컴퓨터 데이터 문맥: 파일·데이터를 손상시키다. 원문의 '오류를 일으키다'를 구체화
power outage|정전|복합 명사
assure|장담하다;확언하다|동사
grant|주다;허가하다;승인하다;수여하다;보조금|명사·동사|grant + 사람 + 사물: 사람에게 무언가를 주다/승인하다
pay raise|임금 인상|복합 명사
dedication|헌신|명사
proposal|제안;제안서|명사
budget|예산;예산을 세우다|명사·동사
requirement|필요조건;요건|명사
meet|충족하다;달성하다;맞추다;만나다|동사|meet requirements: 요건을 충족하다
conduct|하다;수행하다|동사
lasting|지속적인;오래가는|형용사
interact with|~와 교류하다;~와 상호작용하다|숙어
flexible|유연한;융통성 있는|형용사
excel|뛰어나다|동사
self-management|자기 관리|명사
appreciate|고마워하다|동사
volunteer|자원봉사자|명사
contribute|기여하다|동사
charity event|자선 행사|복합 명사
confident|확신하는;자신감 있는|형용사
advanced|선진의;진보한;상급의|형용사
organization|조직|명사
refer to|~을 참조하다|숙어
employee handbook|직원 안내서|복합 명사
guarantee|보장;보장하다|명사·동사|guarantee + 사람 + 사물: 사람에게 무언가를 보장하다
a wide range of|다양한;광범위한|관용 표현
actively|적극적으로|부사
implement|시행하다;실행하다;도입하다;도구|명사·동사
optimize|최적화하다|동사|optimize a system: 시스템을 최적화하다
operational efficiency|운영 효율성|복합 명사
feature|기능;특징;~을 특징으로 하다;포함하다|명사·동사|동사 feature는 능동문에서 '특별히 포함하다/선보이다'. be featured는 '특별히 포함되다'
those who|~하는 사람들|구문
consistently|한결같이;일관적으로|부사
definitely|확실히;분명히|부사
frequently|자주;빈번히|부사
collaborate|협력하다|동사
innovate|혁신하다;획기적으로 바꾸다;혁신적으로 만들다;혁신적으로 개발하다|동사
replenish|다시 채우다;보충하다|동사
stock|재고|명사
artisan|장인|명사
handcrafted|수공예의;수제로 만든|형용사
knitwear|니트류;뜨개질로 만든 의류|명사
artifact|유물;공예품|명사
transport|운송하다|동사|transport A to B: A를 B로 운송하다
exhibition|전시회;전시|명사
municipal government|시 정부;지방 자치 정부|복합 명사
a number of|여러;많은|구문|a number of + 복수명사 + 복수동사
the number of|~의 수|구문|the number of + 복수명사 + 단수동사
regularly|정기적으로|부사|원문의 '정지적으로'를 보정
replace|교체하다|동사
ensure|보장하다;반드시 ~하게 하다|동사
optimal|최적의|형용사
hire|고용하다;신규 고용인;고용|명사·동사
a couple of|둘의;두 사람의;두 개의|관용 표현
bilingual|두 개의 언어를 할 줄 아는;이중 언어의|형용사
teller|은행 창구 직원;말하는 사람;이야기꾼|명사
branch|지점;지사|명사
commercial district|상업 지구|복합 명사|원문의 distric을 district로 보정
design|설계하다;설계;디자인|명사·동사
facilitate|촉진하다;용이하게 하다|동사|단순히 가능하게 한다기보다 더 쉽게 진행되도록 한다는 뜻
smooth|원활한;순조로운|형용사
integration|통합|명사
archaeologist|고고학자|명사
reveal|드러내다;밝히다|동사
belong to|~에 속하다|숙어
previously|이전에|부사
ancient|고대의|형용사
civilization|문명|명사
resident|주민;거주자|명사
apartment complex|아파트 단지|복합 명사
attend|참석하다;출석하다|동사
upcoming|다가오는;곧 있을;예정된|형용사|형용사 upcoming을 그대로 익히기. '다가오다'는 come up 등을 사용
revise|수정하다|동사
lengthy|너무 긴;장황한|형용사
potential client|잠재 고객|복합 명사|고객이 될 가능성이 있는 사람이나 기업
task|업무;과제|명사
discourage|막다;말리다;의욕을 꺾다|동사
deadline|기한;마감 시간|명사
reassign|재배정하다;다른 업무로 배치하다|동사
beverage|음료;마실 것|명사
purchase|구매하다;구매;구매품|명사·동사
meal|식사|명사
renovation|보수;리모델링|명사
discuss|논의하다|동사
release|출시하다;발매하다|동사
environmental|환경의|형용사|원문의 enviromental을 environmental로 보정
preference|취향;선호도|명사
rare|희귀한|형용사
display|전시하다|동사
sandal|샌들|명사
outpace|앞지르다;능가하다|동사
application|신청;지원;적용;애플리케이션|명사
keynote speech|기조 연설|복합 명사
conference|회의|명사
reader|독자|명사
opportunity|기회|명사
recommend|추천하다;권고하다|동사
request|요청하다;요청|명사·동사|request + 사람 + to V: 사람에게 ~하라고 요청하다
contract|계약하다;계약;계약서|명사·동사
consultant|컨설턴트|명사
provide|제공하다|동사
promptly|즉시;신속하게|부사
go out|밖에 나가다;불이 꺼지다;전등이 꺼지다|숙어
just as|딱 ~할 때|접속 표현
prepare|준비하다;준비시키다|동사|prepare for N: ~을 준비하다 / prepare to V: ~할 준비를 하다 / prepare O to V: O가 ~할 수 있도록 준비시키다
manage|관리하다|동사
flight|항공편|명사
depart|출발하다;떠나다|동사
as scheduled|예정대로|관용 표현|as it was scheduled에서 주어·be동사가 생략된 표현으로 이해
even though|비록 ~이지만;~인데도|접속사
receive|받다;수령하다|동사
latest|최근의;최신의|형용사
remain|계속 ~한 상태이다|동사
lecturer|강연자;강사|명사
modification|수정|명사
perform|수행하다;작동하다;공연하다;성과를 내다|동사
once|~하자마자;일단 ~하면|접속사
than ever|이전 어느 때보다|관용 표현
vineyard|포도밭|명사
ship|배송하다;운송하다;출하하다|동사
by|~까지;~에 의해;~로;~을 이용하여;~옆에|전치사
intend|의도하다;계획하다|동사|intend to V: ~할 계획이다 / intend O to V: O가 ~하도록 의도하다
enable|가능하게 하다|동사|enable O to V: O가 ~할 수 있게 하다
retrieve|되찾다;회수하다;검색해서 가져오다|동사
charity|자선 활동|명사
anticipate|예상하다;기대하다|동사
automation|자동화|명사
daily|매일의;일상적인|형용사
manually|수작업으로;직접|부사
division|부서;사업부|명사
entire|전체의|형용사
would|~하곤 했다;~할 것이라고 했다;~할 것이라고 생각했다;~할 텐데|조동사|과거 반복 습관 / 과거에서 본 미래 / 가정법 / 정중한 요청·의사. Would you help me?: 도와주시겠어요?
allocate|할당하다|동사
boost|늘리다;향상시키다|동사
clientele|고객층;단골 고객들|명사
recreational|오락의;여가 활동을 위한|형용사
recreational feature|휴양 시설;여가 시설|복합 명사
sign|서명하다;계약을 체결하다|동사
labor|노동;노동의|명사·형용사
labor contract|근로계약서;근로 계약|복합 명사
thereby|그렇게 함으로써|부사|thereby + V-ing: 그 결과로 ~함. thereby는 부사이며 V-ing는 분사구문
as long as|~하는 한|접속 표현|뒤에 주어와 동사가 있는 절이 옴
preferred|선호되는;우선의|형용사|prefer의 분사형에서 나온 형용사
utilize|활용하다;이용하다|동사
finance|재정;금융|명사
secure|확보하다;얻어내다|동사
reservation|예약|명사
confirmation|확인;확인서|명사
be sure to V|반드시 ~하다;반드시 ~하세요|구문|be sure to + 동사원형
employ|고용하다|동사
department head|부서장|복합 명사
encourage|격려하다;장려하다;권장하다|동사|encourage O to V: O가 ~하도록 장려하다
budgeting|예산 편성|명사
council|의회;위원회|명사
city council|시의회|복합 명사
pedestrian|보행자|명사
pedestrian zone|보행자 구역|복합 명사
downtown|도심;도심의;도심에서|명사·형용사·부사
downtown area|도심 지역|복합 명사
traffic congestion|교통 혼잡|복합 명사
apprenticeship|수습 기간;견습 훈련|명사
initiative|계획;새로운 정책|명사
trainee|훈련생;연수생|명사
acquire|습득하다;얻다;취득하다|동사
practical|실용적인|형용사
relevant|관련 있는|형용사|relevant to + 명사. to는 전치사
profession|전문직;직업|명사
freelance|프리랜서로 일하다;프리랜서의;프리랜서로|동사·형용사·부사
adjust|적응하다;조정하다|동사
routine|일상|명사
vendor|판매업체|명사
reserve|예약하다;보유하다|동사|reserve + 사람 + 사물: 사람에게 ~을 예약해 주다
prior|이전의;사전의|형용사
notification|통지;알림|명사
right to V|~할 권리|구문|right to + 동사원형
right|권리;오른쪽;올바른;적합한;오른쪽의;바로;정확히|명사·형용사·부사
place|~을 두다;배치하다|동사
microwave|마이크로파;전자레인지|명사|전자레인지는 microwave oven의 oven을 생략해 부르기도 함
excite|흥분시키다;신나게 하다|동사
artwork|미술품;예술 작품|명사|불가산명사
committed|헌신적인;전념하는|형용사
commit|전념하다;저지르다;쓰다|동사|commit a crime: 범죄를 저지르다 / commit time or money: 시간·돈을 투입하다
tailored|맞춤의|형용사
tailor|맞추다;조정하다|동사|특정한 목적이나 사람 등에 맞추다
strategy|전략|명사
small to medium enterprise|중소기업|복합 명사|small and medium enterprise와 같은 항목으로 정리
so that|~할 수 있도록;그래서 ~하게 되다;그 결과 ~했다|접속 표현|so that + S + V: 목적·결과. 목적이면 can/will/may와 자주 사용. so + 형용사/부사 + that절은 '너무 ~해서 ~하다'
significant|중요한;상당한|형용사
experience|경험;경력|명사
agent|직원;중개인|명사
obtain|얻다;획득하다|동사
assistance|도움|명사|assistance with: ~에 대한 도움
installation|설치|명사
blueprint|설계도|명사
board|게시판|명사
visual|시각적인|형용사
visualize|시각화하다|동사
appearance|외관;모습|명사
suggest|제안하다|동사
redesign|다시 설계하다;디자인을 바꾸다;재설계|명사·동사
prevent|막다;방지하다|동사|prevent A from V-ing: A가 ~하지 못하게 막다. from 뒤에는 동명사
`;

function records(source, tag) {
  return source.trim().split("\n").map((line) => {
    const [word, meanings, partOfSpeech, memo = ""] = line.split("|");
    return { id: `lesson-0927-${word.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, word, meanings: meanings.split(";"), partOfSpeech, memo, tags: ["9월 27일", tag] };
  });
}
export const lessonWordTemplates = [...records(photoRows, "필기 사진"), ...records(textRows, "강의 노트")];
