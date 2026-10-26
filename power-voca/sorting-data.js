/* Source-mapped sorting edition. Notes, examples, sources and meaning steps are feedback only.
 * Preserves the 60 approved prototype cards; expands dedicated printed-book inventories.
 * Classification is scoped to cited representative textbook uses, not all dictionary senses.
 */
(function (root) {
  "use strict";
  root.POWER_VOCA_SORTING = {
  "version": "20261026-sorting1",
  "groups": [
    {
      "id": "verb-forms",
      "title": "동사 형식",
      "bins": [
        {
          "id": "1V",
          "label": "1V"
        },
        {
          "id": "2V",
          "label": "2V"
        },
        {
          "id": "3V",
          "label": "3V"
        },
        {
          "id": "4V",
          "label": "4V"
        },
        {
          "id": "5V",
          "label": "5V"
        }
      ],
      "instruction": "교재의 동사 형식 단원과 이 카드의 핵심 뜻에 해당하는 칸을 모두 선택하세요. 드문 쓰임이나 단순한 4형식 전환형은 따로 세지 않아요.",
      "cards": [
        {
          "id": "forms-appear",
          "text": "appear",
          "correctBins": [
            "1V",
            "2V"
          ],
          "steps": [
            {
              "id": "appear-1V",
              "label": "1V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "나타나다",
                "줄어들다",
                "존재하다",
                "지속되다"
              ],
              "answer": 0,
              "expression": "appear"
            },
            {
              "id": "appear-2V",
              "label": "2V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "여전히 ~이다",
                "~해지다·~이 되다",
                "~한 것으로 드러나다",
                "~인 듯하다"
              ],
              "answer": 3,
              "expression": "appear + 형용사"
            }
          ],
          "note": "(1V) S + V (+ 부사·전치사구) : 나타나다 / (2V) S + appear + 형용사 보어 : ~인 듯하다",
          "examples": [
            "A new message appeared on the screen.",
            "The estimate appears reasonable."
          ],
          "source": {
            "bookPage": 140,
            "id": "forms-core-appear",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "intransitive-verbs",
                "section": "완전자동사",
                "headword": "appear",
                "unit": "qs-p140-appear",
                "target": "qs-p140-appear",
                "pages": [
                  140
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 110,
                "pdfPage": 111,
                "scope": "second-pattern",
                "section": "2형식 동사",
                "headword": "appear + 형용사",
                "unit": "qs-p110-appear",
                "target": "qs-p110-appear",
                "pages": [
                  110,
                  121
                ]
              }
            ],
            "sourceIds": [
              "qs-p140-appear",
              "qs-p110-appear"
            ]
          }
        },
        {
          "id": "forms-expire",
          "text": "expire",
          "correctBins": [
            "1V"
          ],
          "steps": [
            {
              "id": "expire-1V",
              "label": "1V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "나타나다",
                "발생하다",
                "줄어들다",
                "만료되다"
              ],
              "answer": 3,
              "expression": "expire"
            }
          ],
          "note": "(1V) S + V (+ 부사·전치사구) : 만료되다",
          "examples": [
            "Your membership expires next month."
          ],
          "source": {
            "bookPage": 140,
            "id": "forms-core-expire",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "intransitive-verbs",
                "section": "완전자동사",
                "headword": "expire",
                "unit": "qs-p140-expire",
                "target": "qs-p140-expire",
                "pages": [
                  140
                ]
              }
            ],
            "sourceIds": [
              "qs-p140-expire"
            ]
          }
        },
        {
          "id": "forms-return",
          "text": "return",
          "correctBins": [
            "1V",
            "3V"
          ],
          "steps": [
            {
              "id": "return-1V",
              "label": "1V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "발생하다",
                "줄어들다",
                "돌아가다",
                "나타나다"
              ],
              "answer": 2,
              "expression": "return to + 장소"
            },
            {
              "id": "return-3V",
              "label": "3V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "사람에게 이익을 주다",
                "물건을 반납하다",
                "물건을 조립하다",
                "일을 시작하다"
              ],
              "answer": 1,
              "expression": "return + 물건"
            }
          ],
          "note": "(1V) S + return to + 장소 : 돌아가다 / (3V) S + return + 직접목적어 : 물건을 반납하다",
          "examples": [
            "She returned to the office.",
            "Please return the signed form."
          ],
          "source": {
            "bookPage": 140,
            "id": "forms-core-return",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "return + O",
                "unit": "qs-p140-return-o",
                "target": "qs-p140-return-o",
                "pages": [
                  140
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "return to + 장소",
                "unit": "qs-p140-return-to-3d07678fdd0c",
                "target": "qs-p140-return-to-3d07678fdd0c",
                "pages": [
                  140
                ]
              }
            ],
            "sourceIds": [
              "qs-p140-return-o",
              "qs-p140-return-to-3d07678fdd0c"
            ]
          }
        },
        {
          "id": "forms-remain",
          "text": "remain",
          "correctBins": [
            "1V",
            "2V"
          ],
          "steps": [
            {
              "id": "remain-1V",
              "label": "1V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "줄어들다",
                "남아 있다",
                "나타나다",
                "발생하다"
              ],
              "answer": 1,
              "expression": "remain"
            },
            {
              "id": "remain-2V",
              "label": "2V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "여전히 ~이다",
                "~해 보이다",
                "~해지다·~이 되다",
                "~한 것으로 드러나다"
              ],
              "answer": 0,
              "expression": "remain + 형용사"
            }
          ],
          "note": "(1V) S + remain (+ 부사어) : 남아 있다 / (2V) S + remain + 형용사 보어 : 여전히 ~이다",
          "examples": [
            "Only two seats remain.",
            "The store remains open."
          ],
          "source": {
            "bookPage": 110,
            "id": "forms-core-remain",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 110,
                "pdfPage": 111,
                "scope": "second-pattern",
                "section": "2형식 동사",
                "headword": "remain + 형용사",
                "unit": "qs-p110-remain",
                "target": "qs-p110-remain",
                "pages": [
                  110,
                  121
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 114,
                "pdfPage": 115,
                "scope": "number-modifiers",
                "section": "숫자를 수식하는 표현",
                "headword": "only",
                "unit": "qs-p114-only",
                "target": "qs-p114-only",
                "pages": [
                  114
                ]
              }
            ],
            "sourceIds": [
              "qs-p110-remain"
            ]
          }
        },
        {
          "id": "forms-offer",
          "text": "offer",
          "correctBins": [
            "3V",
            "4V"
          ],
          "steps": [
            {
              "id": "offer-3V",
              "label": "3V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~해 주겠다고 제안하다",
                "~해 주겠다고 약속하다",
                "~해 주는 것을 거절하다",
                "~해 주기를 망설이다"
              ],
              "answer": 0,
              "expression": "offer to V"
            },
            {
              "id": "offer-4V",
              "label": "4V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "A에게 B를 가르치다",
                "A에게 B를 청구하다",
                "A에게 B를 보여 주다",
                "A에게 B를 제공하다"
              ],
              "answer": 3,
              "expression": "offer A B"
            }
          ],
          "note": "(3V) S + offer + to V(목적어) : ~해 주겠다고 제안하다 / (4V) S + offer + A(사람) + B(사물·내용) : A에게 B를 제공·제안하다. 3V는 offer to V의 별도 핵심 쓰임이에요.",
          "examples": [
            "I offered to help with the report.",
            "The company offered her a position."
          ],
          "source": {
            "bookPage": 151,
            "entry": "0492",
            "id": "forms-core-offer",
            "references": [
              {
                "bookPage": 151,
                "step": 15,
                "entry": "0492",
                "headword": "award",
                "unit": "e0492-x3",
                "target": "e0492-x3"
              },
              {
                "bookPage": 228,
                "step": 21,
                "entry": "0698",
                "headword": "offer to V",
                "unit": "e0698-x2",
                "target": "e0698-x2"
              },
              {
                "book": "quickstart",
                "bookPage": 122,
                "pdfPage": 123,
                "scope": "fourth-pattern",
                "section": "4형식 동사",
                "headword": "offer + 사람 + 사물",
                "unit": "qs-p122-offer-active",
                "target": "qs-p122-offer-active",
                "pages": [
                  122,
                  130
                ]
              },
              {
                "bookPage": 228,
                "step": 21,
                "entry": "0698",
                "headword": "offer to V",
                "unit": "e0698",
                "target": "e0698"
              },
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "offer to V",
                "unit": "qs-p146-offer-to-v",
                "target": "qs-p146-offer-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "full-e0492-x3-similar-1",
              "full-e0698-x2-meaning",
              "qs-p122-offer-active"
            ]
          }
        },
        {
          "id": "forms-give",
          "text": "give",
          "correctBins": [
            "4V"
          ],
          "steps": [
            {
              "id": "give-4V",
              "label": "4V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "A에게 B를 가르치다",
                "A에게 B를 청구하다",
                "A에게 B를 보여 주다",
                "A에게 B를 주다"
              ],
              "answer": 3,
              "expression": "give A B"
            }
          ],
          "note": "(4V) S + give + A(사람) + B(사물·내용) : A에게 B를 주다. give B to A는 같은 전달 의미의 전환형이므로 별도 3V 정답으로 세지 않아요.",
          "examples": [
            "The trainer gave us clear instructions."
          ],
          "source": {
            "bookPage": 122,
            "id": "forms-core-give",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 122,
                "pdfPage": 123,
                "scope": "fourth-pattern",
                "section": "4형식 동사",
                "headword": "give + 사람 + 사물",
                "unit": "qs-p122-give-active",
                "target": "qs-p122-give-active",
                "pages": [
                  122,
                  130
                ]
              }
            ],
            "sourceIds": [
              "qs-p122-give-active"
            ]
          }
        },
        {
          "id": "forms-consider",
          "text": "consider",
          "correctBins": [
            "3V",
            "5V"
          ],
          "steps": [
            {
              "id": "consider-3V",
              "label": "3V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "행동을 제안하다",
                "행동을 중단하다",
                "행동을 고려하다",
                "행동을 피하다"
              ],
              "answer": 2,
              "expression": "consider V-ing"
            },
            {
              "id": "consider-5V",
              "label": "5V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "A를 ~한 상태로 만들다",
                "A가 ~하다고 여기다",
                "A를 ~한 상태로 유지하다",
                "A를 ~한 상태로 두다"
              ],
              "answer": 1,
              "expression": "consider A + 형용사"
            }
          ],
          "note": "(3V) S + consider + V-ing(목적어) : 행동을 고려하다 / (5V) S + consider + A(목적어) + 형용사 보어 : A가 ~하다고 여기다",
          "examples": [
            "We are considering opening another branch.",
            "The team considers the plan practical."
          ],
          "source": {
            "bookPage": 111,
            "id": "forms-core-consider",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "fifth-pattern",
                "section": "5형식 동사",
                "headword": "consider + O + 형용사",
                "unit": "qs-p111-consider-o",
                "target": "qs-p111-consider-o",
                "pages": [
                  111,
                  122
                ]
              },
              {
                "bookPage": 231,
                "step": 21,
                "entry": "0711",
                "headword": "consider V-ing",
                "unit": "e0711",
                "target": "e0711"
              },
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "consider V-ing",
                "unit": "qs-p150-consider-v-ing",
                "target": "qs-p150-consider-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "qs-p111-consider-o"
            ]
          }
        },
        {
          "id": "forms-keep",
          "text": "keep",
          "correctBins": [
            "3V",
            "5V"
          ],
          "steps": [
            {
              "id": "keep-3V",
              "label": "3V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "물건을 처분하다",
                "물건을 보관하다",
                "물건을 반납하다",
                "물건을 대여하다"
              ],
              "answer": 1,
              "expression": "keep + 물건"
            },
            {
              "id": "keep-5V",
              "label": "5V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "A를 ~한 상태로 유지하다",
                "A를 ~한 상태로 두다",
                "A를 ~한 상태로 만들다",
                "A를 ~한 상태로 바꾸다"
              ],
              "answer": 0,
              "expression": "keep A + 형용사"
            }
          ],
          "note": "(3V) S + keep + 물건(목적어) : 물건을 보관하다 / (5V) S + keep + A(목적어) + 형용사 보어 : A를 ~한 상태로 유지하다",
          "examples": [
            "Please keep your receipt.",
            "Please keep the entrance clear."
          ],
          "source": {
            "bookPage": 111,
            "id": "forms-core-keep",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "fifth-pattern",
                "section": "5형식 동사",
                "headword": "keep + O + 형용사",
                "unit": "qs-p111-keep-o",
                "target": "qs-p111-keep-o",
                "pages": [
                  111,
                  122
                ]
              },
              {
                "bookPage": 166,
                "step": 16,
                "entry": "0535",
                "headword": "document",
                "unit": "e0535",
                "target": "e0535-s1"
              },
              {
                "bookPage": 205,
                "step": 19,
                "entry": "0630",
                "headword": "original",
                "unit": "e0630",
                "target": "e0630-s2"
              },
              {
                "bookPage": 208,
                "step": 19,
                "entry": "0637",
                "headword": "receipt",
                "unit": "e0637",
                "target": "e0637-s1"
              }
            ],
            "sourceIds": [
              "qs-p111-keep-o"
            ]
          }
        },
        {
          "id": "forms-leave",
          "text": "leave",
          "correctBins": [
            "1V",
            "3V",
            "5V"
          ],
          "steps": [
            {
              "id": "leave-1V",
              "label": "1V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "떠나다",
                "나타나다",
                "발생하다",
                "줄어들다"
              ],
              "answer": 0,
              "expression": "leave for + 목적지"
            },
            {
              "id": "leave-3V",
              "label": "3V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "물건을 가져가다·챙기다",
                "물건을 만들다·제작하다",
                "물건을 팔다·판매하다",
                "물건을 남기다·두다"
              ],
              "answer": 3,
              "expression": "leave + 물건"
            },
            {
              "id": "leave-5V",
              "label": "5V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "A를 ~한 상태로 만들다",
                "A를 ~한 상태로 바꾸다",
                "A를 ~한 상태로 두다",
                "A를 ~한 상태로 유지하다"
              ],
              "answer": 2,
              "expression": "leave A + 형용사"
            }
          ],
          "note": "(1V) S + leave (+ for + 목적지) : 떠나다 / (3V) S + leave + 물건(목적어) : 물건을 남기다·두다 / (5V) S + leave + A(목적어) + 형용사 보어 : A를 ~한 상태로 두다",
          "examples": [
            "The group will leave for Seoul at noon.",
            "She left her badge on the desk.",
            "Please leave the door open."
          ],
          "source": {
            "bookPage": 111,
            "id": "forms-core-leave",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "fifth-pattern",
                "section": "5형식 동사",
                "headword": "leave + O + 형용사",
                "unit": "qs-p111-leave-o",
                "target": "qs-p111-leave-o",
                "pages": [
                  111
                ]
              },
              {
                "bookPage": 93,
                "step": 9,
                "entry": "0269",
                "headword": "leave for",
                "unit": "e0269",
                "target": "e0269"
              },
              {
                "bookPage": 183,
                "step": 17,
                "entry": "0580",
                "headword": "leave",
                "unit": "e0580",
                "target": "e0580-s1"
              },
              {
                "bookPage": 183,
                "step": 17,
                "entry": "0580",
                "headword": "leave",
                "unit": "e0580",
                "target": "e0580-s2"
              }
            ],
            "sourceIds": [
              "qs-p111-leave-o"
            ]
          }
        },
        {
          "id": "forms-appoint",
          "text": "appoint",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "appoint-5V",
              "label": "5V 뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "A를 B로 여기다",
                "A를 B라고 부르다",
                "A를 B로 선출하다",
                "A를 B로 임명하다"
              ],
              "answer": 3,
              "expression": "appoint A B (직위)"
            }
          ],
          "note": "(5V) S + appoint + A + B(직위 명사) : A를 B로 임명하다",
          "examples": [
            "The board appointed her director."
          ],
          "source": {
            "bookPage": 130,
            "id": "forms-core-appoint",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 130,
                "pdfPage": 131,
                "scope": "fifth-pattern",
                "section": "5형식 동사",
                "headword": "appoint + O + 직위 명사",
                "unit": "qs-p130-appoint-o-active",
                "target": "qs-p130-appoint-o-active",
                "pages": [
                  130
                ]
              }
            ],
            "sourceIds": [
              "qs-p130-appoint-o-active"
            ]
          }
        },
        {
          "id": "forms-become",
          "text": "become",
          "correctBins": [
            "2V"
          ],
          "steps": [
            {
              "id": "become-2V",
              "label": "2V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "become + 형용사",
              "options": [
                "~해지다",
                "~해 보이다",
                "~인 듯하다",
                "여전히 ~이다"
              ],
              "answer": 0
            }
          ],
          "note": "(2V) become + 형용사 : ~해지다",
          "examples": [
            "The system became efficient after the update."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 110,
            "pdfPage": 111,
            "scope": "second-pattern",
            "section": "2형식 동사",
            "headword": "become + 형용사",
            "unit": "qs-p110-become",
            "target": "qs-p110-become",
            "pages": [
              110,
              121
            ],
            "id": "qs-p110-become",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 110,
                "pdfPage": 111,
                "scope": "second-pattern",
                "section": "2형식 동사",
                "headword": "become + 형용사",
                "unit": "qs-p110-become",
                "target": "qs-p110-become",
                "pages": [
                  110,
                  121
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 121,
                "pdfPage": 122,
                "scope": "second-pattern",
                "section": "2형식 동사",
                "headword": "become + 명사 보어",
                "unit": "qs-p121-become",
                "target": "qs-p121-become",
                "pages": [
                  110,
                  121
                ]
              }
            ],
            "sourceIds": [
              "qs-p110-become",
              "qs-p121-become"
            ]
          }
        },
        {
          "id": "forms-look",
          "text": "look",
          "correctBins": [
            "1V",
            "2V"
          ],
          "steps": [
            {
              "id": "look-2V",
              "label": "2V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "look + 형용사",
              "options": [
                "~해지다",
                "~인 듯하다",
                "~해 보이다",
                "여전히 ~이다"
              ],
              "answer": 2
            },
            {
              "id": "look-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "look at + 대상",
              "options": [
                "나타나다",
                "~을 보다",
                "사라지다",
                "번창하다"
              ],
              "answer": 1
            }
          ],
          "note": "(2V) look + 형용사 : ~해 보이다 / (1V) look at + 대상 : ~을 보다",
          "examples": [
            "The box looks heavy."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 110,
            "pdfPage": 111,
            "scope": "second-pattern",
            "section": "2형식 동사",
            "headword": "look + 형용사",
            "unit": "qs-p110-look",
            "target": "qs-p110-look",
            "pages": [
              110,
              121
            ],
            "id": "qs-p110-look",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 110,
                "pdfPage": 111,
                "scope": "second-pattern",
                "section": "2형식 동사",
                "headword": "look + 형용사",
                "unit": "qs-p110-look",
                "target": "qs-p110-look",
                "pages": [
                  110,
                  121
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "verb-prep",
                "section": "동사 + 전치사·구동사",
                "headword": "look at",
                "unit": "qs-p140-look-at",
                "target": "qs-p140-look-at",
                "pages": [
                  140
                ]
              }
            ],
            "sourceIds": [
              "qs-p110-look",
              "qs-p140-look-at"
            ]
          }
        },
        {
          "id": "forms-prove",
          "text": "prove",
          "correctBins": [
            "2V"
          ],
          "steps": [
            {
              "id": "prove-2V",
              "label": "2V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "prove + 형용사",
              "options": [
                "~해지다",
                "~한 것으로 드러나다",
                "~해 보이다",
                "~인 듯하다"
              ],
              "answer": 1
            }
          ],
          "note": "(2V) prove + 형용사 : ~한 것으로 드러나다",
          "examples": [
            "The repair proved costly."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 110,
            "pdfPage": 111,
            "scope": "second-pattern",
            "section": "2형식 동사",
            "headword": "prove + 형용사",
            "unit": "qs-p110-prove",
            "target": "qs-p110-prove",
            "pages": [
              110,
              121
            ],
            "id": "qs-p110-prove",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 110,
                "pdfPage": 111,
                "scope": "second-pattern",
                "section": "2형식 동사",
                "headword": "prove + 형용사",
                "unit": "qs-p110-prove",
                "target": "qs-p110-prove",
                "pages": [
                  110,
                  121
                ]
              }
            ],
            "sourceIds": [
              "qs-p110-prove"
            ]
          }
        },
        {
          "id": "forms-seem",
          "text": "seem",
          "correctBins": [
            "2V"
          ],
          "steps": [
            {
              "id": "seem-2V",
              "label": "2V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "seem + 형용사",
              "options": [
                "~해지다",
                "~해 보이다",
                "여전히 ~이다",
                "~인 듯하다"
              ],
              "answer": 3
            }
          ],
          "note": "(2V) seem + 형용사 : ~인 듯하다",
          "examples": [
            "The information seems reliable."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 110,
            "pdfPage": 111,
            "scope": "second-pattern",
            "section": "2형식 동사",
            "headword": "seem + 형용사",
            "unit": "qs-p110-seem",
            "target": "qs-p110-seem",
            "pages": [
              110,
              121
            ],
            "id": "qs-p110-seem",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 110,
                "pdfPage": 111,
                "scope": "second-pattern",
                "section": "2형식 동사",
                "headword": "seem + 형용사",
                "unit": "qs-p110-seem",
                "target": "qs-p110-seem",
                "pages": [
                  110,
                  121
                ]
              }
            ],
            "sourceIds": [
              "qs-p110-seem"
            ]
          }
        },
        {
          "id": "forms-deem",
          "text": "deem",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "deem-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "deem + O + 형용사",
              "options": [
                "A를 ~한 상태로 만들다",
                "A를 ~한 상태로 유지하다",
                "A를 ~한 상태로 두다",
                "A가 ~하다고 여기다"
              ],
              "answer": 3
            }
          ],
          "note": "(5V) deem + O + 형용사 : A가 ~하다고 여기다",
          "examples": [
            "deem : A가 ~하다고 여기다"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 111,
            "pdfPage": 112,
            "scope": "fifth-pattern",
            "section": "5형식 동사",
            "headword": "deem + O + 형용사",
            "unit": "qs-p111-deem-o",
            "target": "qs-p111-deem-o",
            "pages": [
              111
            ],
            "id": "qs-p111-deem-o",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "fifth-pattern",
                "section": "5형식 동사",
                "headword": "deem + O + 형용사",
                "unit": "qs-p111-deem-o",
                "target": "qs-p111-deem-o",
                "pages": [
                  111
                ]
              }
            ],
            "sourceIds": [
              "qs-p111-deem-o"
            ]
          }
        },
        {
          "id": "forms-find",
          "text": "find",
          "correctBins": [
            "3V",
            "5V"
          ],
          "steps": [
            {
              "id": "find-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "find + O + 형용사",
              "options": [
                "A를 ~한 상태로 만들다",
                "A가 ~하다고 생각하다",
                "A를 ~한 상태로 유지하다",
                "A를 ~한 상태로 두다"
              ],
              "answer": 1
            },
            {
              "id": "find-3V",
              "label": "3V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "find (the) time",
              "options": [
                "~을 조립하다",
                "~을 반납하다",
                "~을 확장하다",
                "시간을 내다"
              ],
              "answer": 3
            }
          ],
          "note": "(5V) find + O + 형용사 : A가 ~하다고 생각하다 / (3V) find (the) time : 시간을 내다",
          "examples": [
            "find (the) time"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 111,
            "pdfPage": 112,
            "scope": "fifth-pattern",
            "section": "5형식 동사",
            "headword": "find + O + 형용사",
            "unit": "qs-p111-find-o",
            "target": "qs-p111-find-o",
            "pages": [
              111,
              122
            ],
            "id": "qs-p111-find-o",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "fifth-pattern",
                "section": "5형식 동사",
                "headword": "find + O + 형용사",
                "unit": "qs-p111-find-o",
                "target": "qs-p111-find-o",
                "pages": [
                  111,
                  122
                ]
              },
              {
                "bookPage": 33,
                "step": 3,
                "entry": "0072",
                "headword": "find (the) time",
                "unit": "e0072",
                "target": "e0072"
              }
            ],
            "sourceIds": [
              "qs-p111-find-o",
              "full-e0072-use"
            ]
          }
        },
        {
          "id": "forms-make",
          "text": "make",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "make-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "make + O + 형용사",
              "options": [
                "A를 ~한 상태로 유지하다",
                "A를 ~한 상태로 두다",
                "A를 ~한 상태로 만들다",
                "A를 ~로 임명하다"
              ],
              "answer": 2
            }
          ],
          "note": "(5V) make + O + 형용사 : A를 ~한 상태로 만들다",
          "examples": [
            "make : A를 ~한 상태로 만들다"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 111,
            "pdfPage": 112,
            "scope": "fifth-pattern",
            "section": "5형식 동사",
            "headword": "make + O + 형용사",
            "unit": "qs-p111-make-o",
            "target": "qs-p111-make-o",
            "pages": [
              111,
              122
            ],
            "id": "qs-p111-make-o",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "fifth-pattern",
                "section": "5형식 동사",
                "headword": "make + O + 형용사",
                "unit": "qs-p111-make-o",
                "target": "qs-p111-make-o",
                "pages": [
                  111,
                  122
                ]
              }
            ],
            "sourceIds": [
              "qs-p111-make-o"
            ]
          }
        },
        {
          "id": "forms-render",
          "text": "render",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "render-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "render + O + 형용사",
              "options": [
                "A를 ~한 상태로 만들다",
                "A를 ~한 상태로 유지하다",
                "A를 ~한 상태로 두다",
                "A를 ~로 임명하다"
              ],
              "answer": 0
            }
          ],
          "note": "(5V) render + O + 형용사 : A를 ~한 상태로 만들다",
          "examples": [
            "render : A를 ~한 상태로 만들다"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 111,
            "pdfPage": 112,
            "scope": "fifth-pattern",
            "section": "5형식 동사",
            "headword": "render + O + 형용사",
            "unit": "qs-p111-render-o",
            "target": "qs-p111-render-o",
            "pages": [
              111
            ],
            "id": "qs-p111-render-o",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "fifth-pattern",
                "section": "5형식 동사",
                "headword": "render + O + 형용사",
                "unit": "qs-p111-render-o",
                "target": "qs-p111-render-o",
                "pages": [
                  111
                ]
              }
            ],
            "sourceIds": [
              "qs-p111-render-o"
            ]
          }
        },
        {
          "id": "forms-award",
          "text": "award",
          "correctBins": [
            "4V"
          ],
          "steps": [
            {
              "id": "award-4V",
              "label": "4V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "award + 사람 + 사물",
              "options": [
                "A에게 B를 가르치다",
                "A에게 B를 청구하다",
                "A에게 B를 수여하다",
                "A에게 B를 보여 주다"
              ],
              "answer": 2
            }
          ],
          "note": "(4V) award + 사람 + 사물 : A에게 B를 수여하다",
          "examples": [
            "The judges awarded the winner a prize yesterday."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 122,
            "pdfPage": 123,
            "scope": "fourth-pattern",
            "section": "4형식 동사",
            "headword": "award + 사람 + 사물",
            "unit": "qs-p122-award-active",
            "target": "qs-p122-award-active",
            "pages": [
              122,
              130
            ],
            "id": "qs-p122-award-active",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 122,
                "pdfPage": 123,
                "scope": "fourth-pattern",
                "section": "4형식 동사",
                "headword": "award + 사람 + 사물",
                "unit": "qs-p122-award-active",
                "target": "qs-p122-award-active",
                "pages": [
                  122,
                  130
                ]
              }
            ],
            "sourceIds": [
              "qs-p122-award-active"
            ]
          }
        },
        {
          "id": "forms-grant",
          "text": "grant",
          "correctBins": [
            "4V"
          ],
          "steps": [
            {
              "id": "grant-4V",
              "label": "4V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "grant + 사람 + 사물",
              "options": [
                "A에게 B를 가르치다",
                "A에게 B를 청구하다",
                "A에게 B를 보여 주다",
                "A에게 B를 허가·수여하다"
              ],
              "answer": 3
            }
          ],
          "note": "(4V) grant + 사람 + 사물 : A에게 B를 허가·수여하다",
          "examples": [
            "The committee granted the researcher a permit yesterday."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 122,
            "pdfPage": 123,
            "scope": "fourth-pattern",
            "section": "4형식 동사",
            "headword": "grant + 사람 + 사물",
            "unit": "qs-p122-grant-active",
            "target": "qs-p122-grant-active",
            "pages": [
              122,
              130
            ],
            "id": "qs-p122-grant-active",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 122,
                "pdfPage": 123,
                "scope": "fourth-pattern",
                "section": "4형식 동사",
                "headword": "grant + 사람 + 사물",
                "unit": "qs-p122-grant-active",
                "target": "qs-p122-grant-active",
                "pages": [
                  122,
                  130
                ]
              }
            ],
            "sourceIds": [
              "qs-p122-grant-active"
            ]
          }
        },
        {
          "id": "forms-send",
          "text": "send",
          "correctBins": [
            "4V"
          ],
          "steps": [
            {
              "id": "send-4V",
              "label": "4V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "send + 사람 + 사물",
              "options": [
                "A에게 B를 가르치다",
                "A에게 B를 보내다",
                "A에게 B를 청구하다",
                "A에게 B를 보여 주다"
              ],
              "answer": 1
            }
          ],
          "note": "(4V) send + 사람 + 사물 : A에게 B를 보내다",
          "examples": [
            "The office sent each applicant a letter yesterday."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 122,
            "pdfPage": 123,
            "scope": "fourth-pattern",
            "section": "4형식 동사",
            "headword": "send + 사람 + 사물",
            "unit": "qs-p122-send-active",
            "target": "qs-p122-send-active",
            "pages": [
              122,
              130
            ],
            "id": "qs-p122-send-active",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 122,
                "pdfPage": 123,
                "scope": "fourth-pattern",
                "section": "4형식 동사",
                "headword": "send + 사람 + 사물",
                "unit": "qs-p122-send-active",
                "target": "qs-p122-send-active",
                "pages": [
                  122,
                  130
                ]
              }
            ],
            "sourceIds": [
              "qs-p122-send-active"
            ]
          }
        },
        {
          "id": "forms-show",
          "text": "show",
          "correctBins": [
            "4V"
          ],
          "steps": [
            {
              "id": "show-4V",
              "label": "4V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "show + 사람 + 사물",
              "options": [
                "A에게 B를 보여주다",
                "A에게 B를 가르치다",
                "A에게 B를 청구하다",
                "A에게 B를 보내다"
              ],
              "answer": 0
            }
          ],
          "note": "(4V) show + 사람 + 사물 : A에게 B를 보여주다",
          "examples": [
            "The guide showed the visitors a map yesterday."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 122,
            "pdfPage": 123,
            "scope": "fourth-pattern",
            "section": "4형식 동사",
            "headword": "show + 사람 + 사물",
            "unit": "qs-p122-show-active",
            "target": "qs-p122-show-active",
            "pages": [
              122,
              130
            ],
            "id": "qs-p122-show-active",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 122,
                "pdfPage": 123,
                "scope": "fourth-pattern",
                "section": "4형식 동사",
                "headword": "show + 사람 + 사물",
                "unit": "qs-p122-show-active",
                "target": "qs-p122-show-active",
                "pages": [
                  122,
                  130
                ]
              }
            ],
            "sourceIds": [
              "qs-p122-show-active"
            ]
          }
        },
        {
          "id": "forms-name",
          "text": "name",
          "correctBins": [
            "3V",
            "5V"
          ],
          "steps": [
            {
              "id": "name-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "name + O + 직위 명사",
              "options": [
                "A를 ~한 상태로 만들다",
                "A를 ~로 임명하다",
                "A를 ~한 상태로 유지하다",
                "A를 ~한 상태로 두다"
              ],
              "answer": 1
            },
            {
              "id": "name-3V",
              "label": "3V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "name + 대상",
              "options": [
                "~을 조립하다",
                "~을 반납하다",
                "~을 확장하다",
                "이름을 말하다·지정하다"
              ],
              "answer": 3
            }
          ],
          "note": "(5V) name + O + 직위 명사 : A를 ~로 임명하다 / (3V) name + 대상 : 이름을 말하다·지정하다",
          "examples": [
            "The board named Mina vice president.",
            "Can you name the person in charge?"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 130,
            "pdfPage": 131,
            "scope": "fifth-pattern",
            "section": "5형식 동사",
            "headword": "name + O + 직위 명사",
            "unit": "qs-p130-name-o-active",
            "target": "qs-p130-name-o-active",
            "pages": [
              130
            ],
            "id": "qs-p130-name-o-active",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 130,
                "pdfPage": 131,
                "scope": "fifth-pattern",
                "section": "5형식 동사",
                "headword": "name + O + 직위 명사",
                "unit": "qs-p130-name-o-active",
                "target": "qs-p130-name-o-active",
                "pages": [
                  130
                ]
              },
              {
                "bookPage": 160,
                "step": 16,
                "entry": "0518",
                "headword": "name",
                "unit": "e0518",
                "target": "e0518-s5"
              }
            ],
            "sourceIds": [
              "qs-p130-name-o-active",
              "full-e0518-s5-meaning"
            ]
          }
        },
        {
          "id": "forms-arise",
          "text": "arise",
          "correctBins": [
            "1V"
          ],
          "steps": [
            {
              "id": "arise-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "arise",
              "options": [
                "발생하다",
                "나타나다",
                "사라지다",
                "번창하다"
              ],
              "answer": 0
            }
          ],
          "note": "(1V) arise : 발생하다",
          "examples": [
            "A problem may arise during testing."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 140,
            "pdfPage": 141,
            "scope": "intransitive-verbs",
            "section": "완전자동사",
            "headword": "arise",
            "unit": "qs-p140-arise",
            "target": "qs-p140-arise",
            "pages": [
              140
            ],
            "id": "qs-p140-arise",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "intransitive-verbs",
                "section": "완전자동사",
                "headword": "arise",
                "unit": "qs-p140-arise",
                "target": "qs-p140-arise",
                "pages": [
                  140
                ]
              }
            ],
            "sourceIds": [
              "qs-p140-arise"
            ]
          }
        },
        {
          "id": "forms-diminish",
          "text": "diminish",
          "correctBins": [
            "1V"
          ],
          "steps": [
            {
              "id": "diminish-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "diminish",
              "options": [
                "나타나다",
                "줄어들다",
                "사라지다",
                "번창하다"
              ],
              "answer": 1
            }
          ],
          "note": "(1V) diminish : 줄어들다",
          "examples": [
            "The noise began to diminish."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 140,
            "pdfPage": 141,
            "scope": "intransitive-verbs",
            "section": "완전자동사",
            "headword": "diminish",
            "unit": "qs-p140-diminish",
            "target": "qs-p140-diminish",
            "pages": [
              140
            ],
            "id": "qs-p140-diminish",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "intransitive-verbs",
                "section": "완전자동사",
                "headword": "diminish",
                "unit": "qs-p140-diminish",
                "target": "qs-p140-diminish",
                "pages": [
                  140
                ]
              }
            ],
            "sourceIds": [
              "qs-p140-diminish"
            ]
          }
        },
        {
          "id": "forms-disappear",
          "text": "disappear",
          "correctBins": [
            "1V"
          ],
          "steps": [
            {
              "id": "disappear-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "disappear",
              "options": [
                "나타나다",
                "사라지다",
                "번창하다",
                "만료되다"
              ],
              "answer": 1
            }
          ],
          "note": "(1V) disappear : 사라지다",
          "examples": [
            "The error message should disappear soon."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 140,
            "pdfPage": 141,
            "scope": "intransitive-verbs",
            "section": "완전자동사",
            "headword": "disappear",
            "unit": "qs-p140-disappear",
            "target": "qs-p140-disappear",
            "pages": [
              140
            ],
            "id": "qs-p140-disappear",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "intransitive-verbs",
                "section": "완전자동사",
                "headword": "disappear",
                "unit": "qs-p140-disappear",
                "target": "qs-p140-disappear",
                "pages": [
                  140
                ]
              }
            ],
            "sourceIds": [
              "qs-p140-disappear"
            ]
          }
        },
        {
          "id": "forms-exist",
          "text": "exist",
          "correctBins": [
            "1V"
          ],
          "steps": [
            {
              "id": "exist-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "exist",
              "options": [
                "나타나다",
                "존재하다",
                "사라지다",
                "번창하다"
              ],
              "answer": 1
            }
          ],
          "note": "(1V) exist : 존재하다",
          "examples": [
            "The problem may still exist."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 140,
            "pdfPage": 141,
            "scope": "intransitive-verbs",
            "section": "완전자동사",
            "headword": "exist",
            "unit": "qs-p140-exist",
            "target": "qs-p140-exist",
            "pages": [
              140
            ],
            "id": "qs-p140-exist",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "intransitive-verbs",
                "section": "완전자동사",
                "headword": "exist",
                "unit": "qs-p140-exist",
                "target": "qs-p140-exist",
                "pages": [
                  140
                ]
              }
            ],
            "sourceIds": [
              "qs-p140-exist"
            ]
          }
        },
        {
          "id": "forms-flourish",
          "text": "flourish",
          "correctBins": [
            "1V"
          ],
          "steps": [
            {
              "id": "flourish-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "flourish",
              "options": [
                "번창하다",
                "나타나다",
                "사라지다",
                "만료되다"
              ],
              "answer": 0
            }
          ],
          "note": "(1V) flourish : 번창하다",
          "examples": [
            "Local businesses may flourish in this area."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 140,
            "pdfPage": 141,
            "scope": "intransitive-verbs",
            "section": "완전자동사",
            "headword": "flourish",
            "unit": "qs-p140-flourish",
            "target": "qs-p140-flourish",
            "pages": [
              140
            ],
            "id": "qs-p140-flourish",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "intransitive-verbs",
                "section": "완전자동사",
                "headword": "flourish",
                "unit": "qs-p140-flourish",
                "target": "qs-p140-flourish",
                "pages": [
                  140
                ]
              }
            ],
            "sourceIds": [
              "qs-p140-flourish"
            ]
          }
        },
        {
          "id": "forms-happen",
          "text": "happen",
          "correctBins": [
            "1V"
          ],
          "steps": [
            {
              "id": "happen-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "happen",
              "options": [
                "일어나다",
                "나타나다",
                "사라지다",
                "번창하다"
              ],
              "answer": 0
            }
          ],
          "note": "(1V) happen : 일어나다",
          "examples": [
            "An accident can happen at any time."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 140,
            "pdfPage": 141,
            "scope": "intransitive-verbs",
            "section": "완전자동사",
            "headword": "happen",
            "unit": "qs-p140-happen",
            "target": "qs-p140-happen",
            "pages": [
              140
            ],
            "id": "qs-p140-happen",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "intransitive-verbs",
                "section": "완전자동사",
                "headword": "happen",
                "unit": "qs-p140-happen",
                "target": "qs-p140-happen",
                "pages": [
                  140
                ]
              }
            ],
            "sourceIds": [
              "qs-p140-happen"
            ]
          }
        },
        {
          "id": "forms-last",
          "text": "last",
          "correctBins": [
            "1V"
          ],
          "steps": [
            {
              "id": "last-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "last",
              "options": [
                "지속되다",
                "나타나다",
                "사라지다",
                "번창하다"
              ],
              "answer": 0
            }
          ],
          "note": "(1V) last : 지속되다",
          "examples": [
            "The event will last two hours."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 140,
            "pdfPage": 141,
            "scope": "intransitive-verbs",
            "section": "완전자동사",
            "headword": "last",
            "unit": "qs-p140-last",
            "target": "qs-p140-last",
            "pages": [
              140
            ],
            "id": "qs-p140-last",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "intransitive-verbs",
                "section": "완전자동사",
                "headword": "last",
                "unit": "qs-p140-last",
                "target": "qs-p140-last",
                "pages": [
                  140
                ]
              }
            ],
            "sourceIds": [
              "qs-p140-last"
            ]
          }
        },
        {
          "id": "forms-occur",
          "text": "occur",
          "correctBins": [
            "1V"
          ],
          "steps": [
            {
              "id": "occur-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "occur",
              "options": [
                "발생하다",
                "나타나다",
                "사라지다",
                "번창하다"
              ],
              "answer": 0
            }
          ],
          "note": "(1V) occur : 발생하다",
          "examples": [
            "Delays may occur during the move."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 140,
            "pdfPage": 141,
            "scope": "intransitive-verbs",
            "section": "완전자동사",
            "headword": "occur",
            "unit": "qs-p140-occur",
            "target": "qs-p140-occur",
            "pages": [
              140
            ],
            "id": "qs-p140-occur",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "intransitive-verbs",
                "section": "완전자동사",
                "headword": "occur",
                "unit": "qs-p140-occur",
                "target": "qs-p140-occur",
                "pages": [
                  140
                ]
              }
            ],
            "sourceIds": [
              "qs-p140-occur"
            ]
          }
        },
        {
          "id": "forms-rise",
          "text": "rise",
          "correctBins": [
            "1V"
          ],
          "steps": [
            {
              "id": "rise-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "rise",
              "options": [
                "나타나다",
                "사라지다",
                "번창하다",
                "오르다"
              ],
              "answer": 3
            }
          ],
          "note": "(1V) rise : 오르다",
          "examples": [
            "Prices will rise next month."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 140,
            "pdfPage": 141,
            "scope": "intransitive-verbs",
            "section": "완전자동사",
            "headword": "rise",
            "unit": "qs-p140-rise",
            "target": "qs-p140-rise",
            "pages": [
              140
            ],
            "id": "qs-p140-rise",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "intransitive-verbs",
                "section": "완전자동사",
                "headword": "rise",
                "unit": "qs-p140-rise",
                "target": "qs-p140-rise",
                "pages": [
                  140
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "intransitive-verbs",
                "section": "완전자동사의 수식",
                "headword": "rise + 부사",
                "unit": "qs-p140-rise-a59f56852db2",
                "target": "qs-p140-rise-a59f56852db2",
                "pages": [
                  140
                ]
              }
            ],
            "sourceIds": [
              "qs-p140-rise",
              "qs-p140-rise-a59f56852db2"
            ]
          }
        },
        {
          "id": "forms-take-place",
          "text": "take place",
          "correctBins": [
            "1V"
          ],
          "steps": [
            {
              "id": "take-place-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "take place",
              "options": [
                "나타나다",
                "사라지다",
                "번창하다",
                "개최되다"
              ],
              "answer": 3
            }
          ],
          "note": "(1V) take place : 개최되다",
          "examples": [
            "The workshop will take place on Friday."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 140,
            "pdfPage": 141,
            "scope": "intransitive-verbs",
            "section": "완전자동사",
            "headword": "take place",
            "unit": "qs-p140-take-place",
            "target": "qs-p140-take-place",
            "pages": [
              140
            ],
            "id": "qs-p140-take-place",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "intransitive-verbs",
                "section": "완전자동사",
                "headword": "take place",
                "unit": "qs-p140-take-place",
                "target": "qs-p140-take-place",
                "pages": [
                  140
                ]
              }
            ],
            "sourceIds": [
              "qs-p140-take-place"
            ]
          }
        },
        {
          "id": "forms-thrive",
          "text": "thrive",
          "correctBins": [
            "1V"
          ],
          "steps": [
            {
              "id": "thrive-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "thrive",
              "options": [
                "나타나다",
                "사라지다",
                "번창하다",
                "만료되다"
              ],
              "answer": 2
            }
          ],
          "note": "(1V) thrive : 번창하다",
          "examples": [
            "The small business continues to thrive."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 140,
            "pdfPage": 141,
            "scope": "intransitive-verbs",
            "section": "완전자동사",
            "headword": "thrive",
            "unit": "qs-p140-thrive",
            "target": "qs-p140-thrive",
            "pages": [
              140
            ],
            "id": "qs-p140-thrive",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 140,
                "pdfPage": 141,
                "scope": "intransitive-verbs",
                "section": "완전자동사",
                "headword": "thrive",
                "unit": "qs-p140-thrive",
                "target": "qs-p140-thrive",
                "pages": [
                  140
                ]
              }
            ],
            "sourceIds": [
              "qs-p140-thrive"
            ]
          }
        },
        {
          "id": "forms-assemble",
          "text": "assemble",
          "correctBins": [
            "1V",
            "3V"
          ],
          "steps": [
            {
              "id": "assemble-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "assemble (1V)",
              "options": [
                "모이다",
                "나타나다",
                "사라지다",
                "번창하다"
              ],
              "answer": 0
            },
            {
              "id": "assemble-3V",
              "label": "3V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "assemble + O",
              "options": [
                "~을 반납하다",
                "~을 확장하다",
                "~을 조립하다",
                "~을 보고하다"
              ],
              "answer": 2
            }
          ],
          "note": "(1V) assemble (1V) : 모이다 / (3V) assemble + O : ~을 조립하다",
          "examples": [
            "assemble : 모이다"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 141,
            "pdfPage": 142,
            "scope": "transitive-intransitive",
            "section": "자·타동사 혼용",
            "headword": "assemble (1V)",
            "unit": "qs-p141-assemble-1v",
            "target": "qs-p141-assemble-1v",
            "pages": [
              141
            ],
            "id": "qs-p141-assemble-1v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "assemble (1V)",
                "unit": "qs-p141-assemble-1v",
                "target": "qs-p141-assemble-1v",
                "pages": [
                  141
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "assemble + O",
                "unit": "qs-p141-assemble-o",
                "target": "qs-p141-assemble-o",
                "pages": [
                  141
                ]
              }
            ],
            "sourceIds": [
              "qs-p141-assemble-1v",
              "qs-p141-assemble-o"
            ]
          }
        },
        {
          "id": "forms-begin",
          "text": "begin",
          "correctBins": [
            "1V",
            "3V"
          ],
          "steps": [
            {
              "id": "begin-3V",
              "label": "3V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "begin + O",
              "options": [
                "~을 조립하다",
                "~을 반납하다",
                "~을 확장하다",
                "~을 시작하다"
              ],
              "answer": 3
            },
            {
              "id": "begin-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "begin with + N",
              "options": [
                "나타나다",
                "~로 시작하다",
                "사라지다",
                "번창하다"
              ],
              "answer": 1
            }
          ],
          "note": "(3V) begin + O : ~을 시작하다 / (1V) begin with + N : ~로 시작하다",
          "examples": [
            "begin : ~을 시작하다"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 141,
            "pdfPage": 142,
            "scope": "transitive-intransitive",
            "section": "자·타동사 혼용",
            "headword": "begin + O",
            "unit": "qs-p141-begin-o-object",
            "target": "qs-p141-begin-o-object",
            "pages": [
              141
            ],
            "id": "qs-p141-begin-o-object",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "begin + O",
                "unit": "qs-p141-begin-o-object",
                "target": "qs-p141-begin-o-object",
                "pages": [
                  141
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "begin with + N",
                "unit": "qs-p141-begin-with-n-with",
                "target": "qs-p141-begin-with-n-with",
                "pages": [
                  141
                ]
              }
            ],
            "sourceIds": [
              "qs-p141-begin-o-object",
              "qs-p141-begin-with-n-with"
            ]
          }
        },
        {
          "id": "forms-benefit",
          "text": "benefit",
          "correctBins": [
            "1V",
            "3V"
          ],
          "steps": [
            {
              "id": "benefit-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "benefit from + N",
              "options": [
                "나타나다",
                "~로부터 이익을 얻다",
                "사라지다",
                "번창하다"
              ],
              "answer": 1
            },
            {
              "id": "benefit-3V",
              "label": "3V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "benefit + O",
              "options": [
                "~을 조립하다",
                "~을 반납하다",
                "~을 확장하다",
                "~에게 유익하다"
              ],
              "answer": 3
            }
          ],
          "note": "(1V) benefit from + N : ~로부터 이익을 얻다 / (3V) benefit + O : ~에게 유익하다",
          "examples": [
            "benefit : ~로부터 이익을 얻다"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 141,
            "pdfPage": 142,
            "scope": "transitive-intransitive",
            "section": "자·타동사 혼용",
            "headword": "benefit from + N",
            "unit": "qs-p141-benefit-from-n",
            "target": "qs-p141-benefit-from-n",
            "pages": [
              141
            ],
            "id": "qs-p141-benefit-from-n",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "benefit from + N",
                "unit": "qs-p141-benefit-from-n",
                "target": "qs-p141-benefit-from-n",
                "pages": [
                  141
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "benefit + O",
                "unit": "qs-p141-benefit-o",
                "target": "qs-p141-benefit-o",
                "pages": [
                  141
                ]
              }
            ],
            "sourceIds": [
              "qs-p141-benefit-from-n",
              "qs-p141-benefit-o"
            ]
          }
        },
        {
          "id": "forms-communicate",
          "text": "communicate",
          "correctBins": [
            "1V",
            "3V"
          ],
          "steps": [
            {
              "id": "communicate-3V",
              "label": "3V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "communicate + O",
              "options": [
                "~을 조립하다",
                "~을 반납하다",
                "~을 확장하다",
                "~을 전달하다"
              ],
              "answer": 3
            },
            {
              "id": "communicate-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "communicate with + 사람",
              "options": [
                "나타나다",
                "~와 소통하다",
                "사라지다",
                "번창하다"
              ],
              "answer": 1
            }
          ],
          "note": "(3V) communicate + O : ~을 전달하다 / (1V) communicate with + 사람 : ~와 소통하다",
          "examples": [
            "communicate : ~을 전달하다"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 141,
            "pdfPage": 142,
            "scope": "transitive-intransitive",
            "section": "자·타동사 혼용",
            "headword": "communicate + O",
            "unit": "qs-p141-communicate-o",
            "target": "qs-p141-communicate-o",
            "pages": [
              141
            ],
            "id": "qs-p141-communicate-o",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "communicate + O",
                "unit": "qs-p141-communicate-o",
                "target": "qs-p141-communicate-o",
                "pages": [
                  141
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "communicate with + 사람",
                "unit": "qs-p141-communicate-with-0334a0711b51",
                "target": "qs-p141-communicate-with-0334a0711b51",
                "pages": [
                  141
                ]
              }
            ],
            "sourceIds": [
              "qs-p141-communicate-o",
              "qs-p141-communicate-with-0334a0711b51"
            ]
          }
        },
        {
          "id": "forms-conclude",
          "text": "conclude",
          "correctBins": [
            "1V",
            "3V"
          ],
          "steps": [
            {
              "id": "conclude-3V",
              "label": "3V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "conclude + O",
              "options": [
                "~을 조립하다",
                "~을 반납하다",
                "~을 확장하다",
                "~을 마무리하다"
              ],
              "answer": 3
            },
            {
              "id": "conclude-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "conclude with + N",
              "options": [
                "나타나다",
                "~로 마무리되다",
                "사라지다",
                "번창하다"
              ],
              "answer": 1
            }
          ],
          "note": "(3V) conclude + O : ~을 마무리하다 / (1V) conclude with + N : ~로 마무리되다",
          "examples": [
            "conclude : ~을 마무리하다"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 141,
            "pdfPage": 142,
            "scope": "transitive-intransitive",
            "section": "자·타동사 혼용",
            "headword": "conclude + O",
            "unit": "qs-p141-conclude-o-object",
            "target": "qs-p141-conclude-o-object",
            "pages": [
              141
            ],
            "id": "qs-p141-conclude-o-object",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "conclude + O",
                "unit": "qs-p141-conclude-o-object",
                "target": "qs-p141-conclude-o-object",
                "pages": [
                  141
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "conclude with + N",
                "unit": "qs-p141-conclude-with-n-with",
                "target": "qs-p141-conclude-with-n-with",
                "pages": [
                  141
                ]
              }
            ],
            "sourceIds": [
              "qs-p141-conclude-o-object",
              "qs-p141-conclude-with-n-with"
            ]
          }
        },
        {
          "id": "forms-end",
          "text": "end",
          "correctBins": [
            "1V",
            "3V"
          ],
          "steps": [
            {
              "id": "end-3V",
              "label": "3V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "end + O",
              "options": [
                "~을 조립하다",
                "~을 끝내다",
                "~을 반납하다",
                "~을 확장하다"
              ],
              "answer": 1
            },
            {
              "id": "end-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "end with + N",
              "options": [
                "나타나다",
                "사라지다",
                "번창하다",
                "~로 끝나다"
              ],
              "answer": 3
            }
          ],
          "note": "(3V) end + O : ~을 끝내다 / (1V) end with + N : ~로 끝나다",
          "examples": [
            "end : ~을 끝내다"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 141,
            "pdfPage": 142,
            "scope": "transitive-intransitive",
            "section": "자·타동사 혼용",
            "headword": "end + O",
            "unit": "qs-p141-end-o-object",
            "target": "qs-p141-end-o-object",
            "pages": [
              141
            ],
            "id": "qs-p141-end-o-object",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "end + O",
                "unit": "qs-p141-end-o-object",
                "target": "qs-p141-end-o-object",
                "pages": [
                  141
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "end with + N",
                "unit": "qs-p141-end-with-n-with",
                "target": "qs-p141-end-with-n-with",
                "pages": [
                  141
                ]
              }
            ],
            "sourceIds": [
              "qs-p141-end-o-object",
              "qs-p141-end-with-n-with"
            ]
          }
        },
        {
          "id": "forms-expand",
          "text": "expand",
          "correctBins": [
            "1V",
            "3V"
          ],
          "steps": [
            {
              "id": "expand-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "expand into + 시장",
              "options": [
                "~로 진출하다",
                "나타나다",
                "사라지다",
                "번창하다"
              ],
              "answer": 0
            },
            {
              "id": "expand-3V",
              "label": "3V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "expand + O",
              "options": [
                "~을 조립하다",
                "~을 반납하다",
                "~을 확장하다",
                "~을 보고하다"
              ],
              "answer": 2
            }
          ],
          "note": "(1V) expand into + 시장 : ~로 진출하다 / (3V) expand + O : ~을 확장하다",
          "examples": [
            "expand : ~로 진출하다"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 141,
            "pdfPage": 142,
            "scope": "transitive-intransitive",
            "section": "자·타동사 혼용",
            "headword": "expand into + 시장",
            "unit": "qs-p141-expand-into-169bfec09ff9",
            "target": "qs-p141-expand-into-169bfec09ff9",
            "pages": [
              141
            ],
            "id": "qs-p141-expand-into-169bfec09ff9",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "expand into + 시장",
                "unit": "qs-p141-expand-into-169bfec09ff9",
                "target": "qs-p141-expand-into-169bfec09ff9",
                "pages": [
                  141
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "expand + O",
                "unit": "qs-p141-expand-o",
                "target": "qs-p141-expand-o",
                "pages": [
                  141
                ]
              }
            ],
            "sourceIds": [
              "qs-p141-expand-into-169bfec09ff9",
              "qs-p141-expand-o"
            ]
          }
        },
        {
          "id": "forms-lead",
          "text": "lead",
          "correctBins": [
            "1V",
            "3V"
          ],
          "steps": [
            {
              "id": "lead-3V",
              "label": "3V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "lead + O",
              "options": [
                "~을 이끌다",
                "~을 조립하다",
                "~을 반납하다",
                "~을 확장하다"
              ],
              "answer": 0
            },
            {
              "id": "lead-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "lead to + 결과·장소",
              "options": [
                "나타나다",
                "사라지다",
                "~로 이어지다·통하다",
                "번창하다"
              ],
              "answer": 2
            }
          ],
          "note": "(3V) lead + O : ~을 이끌다 / (1V) lead to + 결과·장소 : ~로 이어지다·통하다",
          "examples": [
            "lead : ~을 이끌다"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 141,
            "pdfPage": 142,
            "scope": "transitive-intransitive",
            "section": "자·타동사 혼용",
            "headword": "lead + O",
            "unit": "qs-p141-lead-o",
            "target": "qs-p141-lead-o",
            "pages": [
              141
            ],
            "id": "qs-p141-lead-o",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "lead + O",
                "unit": "qs-p141-lead-o",
                "target": "qs-p141-lead-o",
                "pages": [
                  141
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "lead to + 결과·장소",
                "unit": "qs-p141-lead-to-f26155d2456d",
                "target": "qs-p141-lead-to-f26155d2456d",
                "pages": [
                  141
                ]
              }
            ],
            "sourceIds": [
              "qs-p141-lead-o",
              "qs-p141-lead-to-f26155d2456d"
            ]
          }
        },
        {
          "id": "forms-report",
          "text": "report",
          "correctBins": [
            "1V",
            "3V"
          ],
          "steps": [
            {
              "id": "report-3V",
              "label": "3V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "report + O",
              "options": [
                "~을 조립하다",
                "~을 반납하다",
                "~을 보고하다",
                "~을 확장하다"
              ],
              "answer": 2
            },
            {
              "id": "report-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "report to + 장소",
              "options": [
                "~로 가다·출두하다",
                "나타나다",
                "사라지다",
                "번창하다"
              ],
              "answer": 0
            }
          ],
          "note": "(3V) report + O : ~을 보고하다 / (1V) report to + 장소 : ~로 가다·출두하다",
          "examples": [
            "report : ~을 보고하다"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 141,
            "pdfPage": 142,
            "scope": "transitive-intransitive",
            "section": "자·타동사 혼용",
            "headword": "report + O",
            "unit": "qs-p141-report-o",
            "target": "qs-p141-report-o",
            "pages": [
              141
            ],
            "id": "qs-p141-report-o",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "report + O",
                "unit": "qs-p141-report-o",
                "target": "qs-p141-report-o",
                "pages": [
                  141
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "report to + 장소",
                "unit": "qs-p141-report-to-1f8518b17df7",
                "target": "qs-p141-report-to-1f8518b17df7",
                "pages": [
                  141
                ]
              }
            ],
            "sourceIds": [
              "qs-p141-report-o",
              "qs-p141-report-to-1f8518b17df7"
            ]
          }
        },
        {
          "id": "forms-start",
          "text": "start",
          "correctBins": [
            "1V",
            "3V"
          ],
          "steps": [
            {
              "id": "start-3V",
              "label": "3V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "start + O",
              "options": [
                "~을 시작하다",
                "~을 조립하다",
                "~을 반납하다",
                "~을 확장하다"
              ],
              "answer": 0
            },
            {
              "id": "start-1V",
              "label": "1V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "start with + N",
              "options": [
                "나타나다",
                "사라지다",
                "~로 시작하다",
                "번창하다"
              ],
              "answer": 2
            }
          ],
          "note": "(3V) start + O : ~을 시작하다 / (1V) start with + N : ~로 시작하다",
          "examples": [
            "start : ~을 시작하다"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 141,
            "pdfPage": 142,
            "scope": "transitive-intransitive",
            "section": "자·타동사 혼용",
            "headword": "start + O",
            "unit": "qs-p141-start-o-object",
            "target": "qs-p141-start-o-object",
            "pages": [
              141
            ],
            "id": "qs-p141-start-o-object",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "start + O",
                "unit": "qs-p141-start-o-object",
                "target": "qs-p141-start-o-object",
                "pages": [
                  141
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 141,
                "pdfPage": 142,
                "scope": "transitive-intransitive",
                "section": "자·타동사 혼용",
                "headword": "start with + N",
                "unit": "qs-p141-start-with-n-with",
                "target": "qs-p141-start-with-n-with",
                "pages": [
                  141
                ]
              }
            ],
            "sourceIds": [
              "qs-p141-start-o-object",
              "qs-p141-start-with-n-with"
            ]
          }
        },
        {
          "id": "forms-advise",
          "text": "advise",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "advise-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "advise + O + to V",
              "options": [
                "A에게 ~하라고 조언하다",
                "A에게 ~하라고 요청하다",
                "A가 ~하도록 허락하다",
                "A가 ~하도록 강요하다"
              ],
              "answer": 0
            }
          ],
          "note": "(5V) advise + O + to V : A에게 ~하라고 조언하다",
          "examples": [
            "The instructor advised me to practice regularly."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "advise + O + to V",
            "unit": "qs-p147-advise-o-to-v",
            "target": "qs-p147-advise-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-advise-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "advise + O + to V",
                "unit": "qs-p147-advise-o-to-v",
                "target": "qs-p147-advise-o-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-advise-o-to-v"
            ]
          }
        },
        {
          "id": "forms-allow",
          "text": "allow",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "allow-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "allow + O + to V",
              "options": [
                "A에게 ~하라고 요청하다",
                "A가 ~하도록 강요하다",
                "A가 ~할 것을 기대하다",
                "A가 ~하도록 허락하다"
              ],
              "answer": 3
            }
          ],
          "note": "(5V) allow + O + to V : A가 ~하도록 허락하다",
          "examples": [
            "The pass allows visitors to enter the building."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "allow + O + to V",
            "unit": "qs-p147-allow-o-to-v",
            "target": "qs-p147-allow-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-allow-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "allow + O + to V",
                "unit": "qs-p147-allow-o-to-v",
                "target": "qs-p147-allow-o-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-allow-o-to-v"
            ]
          }
        },
        {
          "id": "forms-ask",
          "text": "ask",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "ask-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "ask + O + to V",
              "options": [
                "A가 ~하도록 허락하다",
                "A가 ~하도록 강요하다",
                "A가 ~할 것을 기대하다",
                "A에게 ~하라고 요청하다"
              ],
              "answer": 3
            }
          ],
          "note": "(5V) ask + O + to V : A에게 ~하라고 요청하다",
          "examples": [
            "The visitor asked me to check the form."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "ask + O + to V",
            "unit": "qs-p147-ask-o-to-v",
            "target": "qs-p147-ask-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-ask-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "ask + O + to V",
                "unit": "qs-p147-ask-o-to-v",
                "target": "qs-p147-ask-o-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-ask-o-to-v"
            ]
          }
        },
        {
          "id": "forms-enable",
          "text": "enable",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "enable-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "enable + O + to V",
              "options": [
                "A에게 ~하라고 요청하다",
                "A가 ~하도록 허락하다",
                "A가 ~하도록 강요하다",
                "A가 ~할 수 있게 하다"
              ],
              "answer": 3
            }
          ],
          "note": "(5V) enable + O + to V : A가 ~할 수 있게 하다",
          "examples": [
            "The system enables users to share files."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "enable + O + to V",
            "unit": "qs-p147-enable-o-to-v",
            "target": "qs-p147-enable-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-enable-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "enable + O + to V",
                "unit": "qs-p147-enable-o-to-v",
                "target": "qs-p147-enable-o-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-enable-o-to-v"
            ]
          }
        },
        {
          "id": "forms-encourage",
          "text": "encourage",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "encourage-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "encourage + O + to V",
              "options": [
                "A에게 ~하라고 요청하다",
                "A가 ~하도록 권장하다",
                "A가 ~하도록 허락하다",
                "A가 ~하도록 강요하다"
              ],
              "answer": 1
            }
          ],
          "note": "(5V) encourage + O + to V : A가 ~하도록 권장하다",
          "examples": [
            "The manager encouraged us to participate in the event."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "encourage + O + to V",
            "unit": "qs-p147-encourage-o-to-v",
            "target": "qs-p147-encourage-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-encourage-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "encourage + O + to V",
                "unit": "qs-p147-encourage-o-to-v",
                "target": "qs-p147-encourage-o-to-v",
                "pages": [
                  147
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "encourage + O + to V: 목적어 필요",
                "unit": "qs-p147-encourage-o-to-v-959c5d7626ec",
                "target": "qs-p147-encourage-o-to-v-959c5d7626ec",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-encourage-o-to-v",
              "qs-p147-encourage-o-to-v-959c5d7626ec"
            ]
          }
        },
        {
          "id": "forms-expect",
          "text": "expect",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "expect-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "expect + O + to V",
              "options": [
                "A에게 ~하라고 요청하다",
                "A가 ~할 것을 기대하다",
                "A가 ~하도록 허락하다",
                "A가 ~하도록 강요하다"
              ],
              "answer": 1
            }
          ],
          "note": "(5V) expect + O + to V : A가 ~할 것을 기대하다",
          "examples": [
            "We expect the supplier to deliver the items tomorrow."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "expect + O + to V",
            "unit": "qs-p147-expect-o-to-v",
            "target": "qs-p147-expect-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-expect-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "expect + O + to V",
                "unit": "qs-p147-expect-o-to-v",
                "target": "qs-p147-expect-o-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-expect-o-to-v"
            ]
          }
        },
        {
          "id": "forms-force",
          "text": "force",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "force-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "force + O + to V",
              "options": [
                "A에게 ~하라고 요청하다",
                "A가 ~하도록 허락하다",
                "A가 ~할 것을 기대하다",
                "A가 ~하도록 강요하다"
              ],
              "answer": 3
            }
          ],
          "note": "(5V) force + O + to V : A가 ~하도록 강요하다",
          "examples": [
            "The delay forced us to change our plans."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "force + O + to V",
            "unit": "qs-p147-force-o-to-v",
            "target": "qs-p147-force-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-force-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "force + O + to V",
                "unit": "qs-p147-force-o-to-v",
                "target": "qs-p147-force-o-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-force-o-to-v"
            ]
          }
        },
        {
          "id": "forms-instruct",
          "text": "instruct",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "instruct-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "instruct + O + to V",
              "options": [
                "A에게 ~하라고 지시하다",
                "A에게 ~하라고 요청하다",
                "A가 ~하도록 허락하다",
                "A가 ~하도록 강요하다"
              ],
              "answer": 0
            }
          ],
          "note": "(5V) instruct + O + to V : A에게 ~하라고 지시하다",
          "examples": [
            "The manager instructed us to inspect the area."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "instruct + O + to V",
            "unit": "qs-p147-instruct-o-to-v",
            "target": "qs-p147-instruct-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-instruct-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "instruct + O + to V",
                "unit": "qs-p147-instruct-o-to-v",
                "target": "qs-p147-instruct-o-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-instruct-o-to-v"
            ]
          }
        },
        {
          "id": "forms-invite",
          "text": "invite",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "invite-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "invite + O + to V",
              "options": [
                "A에게 ~하라고 요청하다",
                "A가 ~하도록 허락하다",
                "A가 ~하도록 강요하다",
                "A에게 ~하도록 권유하다"
              ],
              "answer": 3
            }
          ],
          "note": "(5V) invite + O + to V : A에게 ~하도록 권유하다",
          "examples": [
            "The organizer invited her to speak at the event."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "invite + O + to V",
            "unit": "qs-p147-invite-o-to-v",
            "target": "qs-p147-invite-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-invite-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "invite + O + to V",
                "unit": "qs-p147-invite-o-to-v",
                "target": "qs-p147-invite-o-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-invite-o-to-v"
            ]
          }
        },
        {
          "id": "forms-need",
          "text": "need",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "need-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "need + O + to V",
              "options": [
                "A가 ~하기를 필요로 하다",
                "A에게 ~하라고 요청하다",
                "A가 ~하도록 허락하다",
                "A가 ~하도록 강요하다"
              ],
              "answer": 0
            }
          ],
          "note": "(5V) need + O + to V : A가 ~하기를 필요로 하다",
          "examples": [
            "We need you to finish the report today."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "need + O + to V",
            "unit": "qs-p147-need-o-to-v",
            "target": "qs-p147-need-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-need-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "need + O + to V",
                "unit": "qs-p147-need-o-to-v",
                "target": "qs-p147-need-o-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-need-o-to-v"
            ]
          }
        },
        {
          "id": "forms-persuade",
          "text": "persuade",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "persuade-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "persuade + O + to V",
              "options": [
                "A에게 ~하라고 요청하다",
                "A가 ~하도록 설득하다",
                "A가 ~하도록 허락하다",
                "A가 ~하도록 강요하다"
              ],
              "answer": 1
            }
          ],
          "note": "(5V) persuade + O + to V : A가 ~하도록 설득하다",
          "examples": [
            "We persuaded the client to accept the proposal."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "persuade + O + to V",
            "unit": "qs-p147-persuade-o-to-v",
            "target": "qs-p147-persuade-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-persuade-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "persuade + O + to V",
                "unit": "qs-p147-persuade-o-to-v",
                "target": "qs-p147-persuade-o-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-persuade-o-to-v"
            ]
          }
        },
        {
          "id": "forms-remind",
          "text": "remind",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "remind-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "remind + O + to V",
              "options": [
                "A에게 ~하라고 요청하다",
                "A가 ~하도록 허락하다",
                "A가 ~하도록 강요하다",
                "A에게 ~하라고 상기시키다"
              ],
              "answer": 3
            }
          ],
          "note": "(5V) remind + O + to V : A에게 ~하라고 상기시키다",
          "examples": [
            "Please remind Mina to bring the document."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "remind + O + to V",
            "unit": "qs-p147-remind-o-to-v",
            "target": "qs-p147-remind-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-remind-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "remind + O + to V",
                "unit": "qs-p147-remind-o-to-v",
                "target": "qs-p147-remind-o-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-remind-o-to-v"
            ]
          }
        },
        {
          "id": "forms-require",
          "text": "require",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "require-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "require + O + to V",
              "options": [
                "A에게 ~하라고 요청하다",
                "A에게 ~하라고 요구하다",
                "A가 ~하도록 허락하다",
                "A가 ~하도록 강요하다"
              ],
              "answer": 1
            }
          ],
          "note": "(5V) require + O + to V : A에게 ~하라고 요구하다",
          "examples": [
            "The rules require employees to wear safety gear."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "require + O + to V",
            "unit": "qs-p147-require-o-to-v",
            "target": "qs-p147-require-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-require-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "require + O + to V",
                "unit": "qs-p147-require-o-to-v",
                "target": "qs-p147-require-o-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-require-o-to-v"
            ]
          }
        },
        {
          "id": "forms-tell",
          "text": "tell",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "tell-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "tell + O + to V",
              "options": [
                "A에게 ~하라고 요청하다",
                "A에게 ~하라고 말하다",
                "A가 ~하도록 허락하다",
                "A가 ~하도록 강요하다"
              ],
              "answer": 1
            }
          ],
          "note": "(5V) tell + O + to V : A에게 ~하라고 말하다",
          "examples": [
            "She told me to wait at the desk."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "tell + O + to V",
            "unit": "qs-p147-tell-o-to-v",
            "target": "qs-p147-tell-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-tell-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "tell + O + to V",
                "unit": "qs-p147-tell-o-to-v",
                "target": "qs-p147-tell-o-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-tell-o-to-v"
            ]
          }
        },
        {
          "id": "forms-warn",
          "text": "warn",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "warn-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "warn + O + to V",
              "options": [
                "A에게 ~하라고 경고하다",
                "A에게 ~하라고 요청하다",
                "A가 ~하도록 허락하다",
                "A가 ~하도록 강요하다"
              ],
              "answer": 0
            }
          ],
          "note": "(5V) warn + O + to V : A에게 ~하라고 경고하다",
          "examples": [
            "The guide warned us not to touch the equipment."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "warn + O + to V",
            "unit": "qs-p147-warn-o-to-v",
            "target": "qs-p147-warn-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-warn-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "warn + O + to V",
                "unit": "qs-p147-warn-o-to-v",
                "target": "qs-p147-warn-o-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-warn-o-to-v"
            ]
          }
        },
        {
          "id": "forms-would-like",
          "text": "would like",
          "correctBins": [
            "5V"
          ],
          "steps": [
            {
              "id": "would-like-5V",
              "label": "5V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "would like + O + to V",
              "options": [
                "A에게 ~하라고 요청하다",
                "A가 ~하기를 바라다",
                "A가 ~하도록 허락하다",
                "A가 ~하도록 강요하다"
              ],
              "answer": 1
            }
          ],
          "note": "(5V) would like + O + to V : A가 ~하기를 바라다",
          "examples": [
            "I would like you to review the report."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "object-to-infinitive",
            "section": "목적어 + to부정사",
            "headword": "would like + O + to V",
            "unit": "qs-p147-would-like-o-to-v",
            "target": "qs-p147-would-like-o-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-would-like-o-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "object-to-infinitive",
                "section": "목적어 + to부정사",
                "headword": "would like + O + to V",
                "unit": "qs-p147-would-like-o-to-v",
                "target": "qs-p147-would-like-o-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-would-like-o-to-v"
            ]
          }
        },
        {
          "id": "forms-buy",
          "text": "buy",
          "correctBins": [
            "3V"
          ],
          "steps": [
            {
              "id": "buy-3V",
              "label": "3V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "buy + 목적어",
              "options": [
                "~을 조립하다",
                "~을 반납하다",
                "~을 사다",
                "~을 확장하다"
              ],
              "answer": 2
            }
          ],
          "note": "(3V) buy + 목적어 : ~을 사다",
          "examples": [
            "buy : ~을 사다"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 121,
            "pdfPage": 122,
            "scope": "verb-arguments",
            "section": "목적어를 받는 구조",
            "headword": "buy + 목적어",
            "unit": "qs-p121-buy-d122146be058",
            "target": "qs-p121-buy-d122146be058",
            "pages": [
              121
            ],
            "id": "qs-p121-buy-d122146be058",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 121,
                "pdfPage": 122,
                "scope": "verb-arguments",
                "section": "목적어를 받는 구조",
                "headword": "buy + 목적어",
                "unit": "qs-p121-buy-d122146be058",
                "target": "qs-p121-buy-d122146be058",
                "pages": [
                  121
                ]
              }
            ],
            "sourceIds": [
              "qs-p121-buy-d122146be058"
            ]
          }
        }
      ]
    },
    {
      "id": "verb-complements",
      "title": "동사 뒤 to V · V-ing",
      "bins": [
        {
          "id": "toV",
          "label": "to V"
        },
        {
          "id": "ing",
          "label": "V-ing"
        }
      ],
      "instruction": "교재에 실린 동사 뒤의 핵심 결합을 모두 선택하세요. 목적어 없이 바로 이어지는 to V / V-ing를 분류해요.",
      "cards": [
        {
          "id": "complement-decide",
          "text": "decide",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "decide-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~하기로 결정하다",
                "~하기를 원하다",
                "~하는 것을 거부하다",
                "~할 여유가 있다"
              ],
              "answer": 0
            }
          ],
          "note": "decide to V : ~하기로 결정하다",
          "examples": [
            "We decided to extend the deadline.",
            "The team decided to accept the proposal."
          ],
          "source": {
            "bookPage": 224,
            "entry": "0682",
            "id": "conn-verb-decide",
            "references": [
              {
                "bookPage": 224,
                "step": 21,
                "entry": "0682",
                "headword": "decision to V",
                "unit": "e0682-x1",
                "target": "e0682-x1"
              },
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "decide to V",
                "unit": "qs-p146-decide-to-v",
                "target": "qs-p146-decide-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "full-e0682-x1-use",
              "qs-p146-decide-to-v"
            ]
          }
        },
        {
          "id": "complement-manage",
          "text": "manage",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "manage-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~하기를 원하다",
                "~하는 것을 거부하다",
                "~할 여유가 있다",
                "어떻게든 ~해내다"
              ],
              "answer": 3
            }
          ],
          "note": "manage to V : 어떻게든 ~해내다",
          "examples": [
            "She managed to finish the report on time.",
            "We managed to complete the project on time."
          ],
          "source": {
            "bookPage": 226,
            "entry": "0693",
            "id": "conn-verb-manage",
            "references": [
              {
                "bookPage": 226,
                "step": 21,
                "entry": "0693",
                "headword": "manage to V",
                "unit": "e0693",
                "target": "e0693"
              },
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "manage to V",
                "unit": "qs-p146-manage-to-v",
                "target": "qs-p146-manage-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "full-e0693-use",
              "qs-p146-manage-to-v"
            ]
          }
        },
        {
          "id": "complement-hope",
          "text": "hope",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "hope-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~할 여유가 있다",
                "어떻게든 ~해내다",
                "~하기를 희망하다",
                "~하는 것을 거부하다"
              ],
              "answer": 2
            }
          ],
          "note": "hope to V : ~하기를 희망하다",
          "examples": [
            "We hope to open the branch in June.",
            "We hope to finish the work today."
          ],
          "source": {
            "bookPage": 228,
            "entry": "0700",
            "id": "conn-verb-hope",
            "references": [
              {
                "bookPage": 228,
                "step": 21,
                "entry": "0700",
                "headword": "hope to V",
                "unit": "e0700",
                "target": "e0700"
              },
              {
                "bookPage": 228,
                "step": 21,
                "entry": "0700",
                "headword": "hope to V",
                "unit": "e0700",
                "target": "e0700"
              },
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "hope to V",
                "unit": "qs-p146-hope-to-v",
                "target": "qs-p146-hope-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "full-e0700-use",
              "full-e0700-similar-1",
              "qs-p146-hope-to-v"
            ]
          }
        },
        {
          "id": "complement-refuse",
          "text": "refuse",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "refuse-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "어떻게든 ~해내다",
                "~하는 것을 거부하다",
                "~하기를 원하다",
                "~할 여유가 있다"
              ],
              "answer": 1
            }
          ],
          "note": "refuse to V : ~하는 것을 거부하다",
          "examples": [
            "The supplier refused to change the price.",
            "The customer refused to sign the form."
          ],
          "source": {
            "bookPage": 229,
            "entry": "0703",
            "id": "conn-verb-refuse",
            "references": [
              {
                "bookPage": 229,
                "step": 21,
                "entry": "0703",
                "headword": "refuse to V",
                "unit": "e0703",
                "target": "e0703"
              },
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "refuse to V",
                "unit": "qs-p146-refuse-to-v",
                "target": "qs-p146-refuse-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "full-e0703-use",
              "qs-p146-refuse-to-v"
            ]
          }
        },
        {
          "id": "complement-enjoy",
          "text": "enjoy",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "enjoy-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~하는 것을 즐기다",
                "~하는 것을 피하다",
                "~하는 것을 미루다",
                "~하는 것을 포함하다"
              ],
              "answer": 0
            }
          ],
          "note": "enjoy V-ing : ~하는 것을 즐기다",
          "examples": [
            "I enjoy working with this team.",
            "We enjoy learning new skills."
          ],
          "source": {
            "bookPage": 230,
            "entry": "0705",
            "id": "conn-verb-enjoy",
            "references": [
              {
                "bookPage": 230,
                "step": 21,
                "entry": "0705",
                "headword": "enjoy V-ing",
                "unit": "e0705",
                "target": "e0705"
              },
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "enjoy V-ing",
                "unit": "qs-p150-enjoy-v-ing",
                "target": "qs-p150-enjoy-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "full-e0705-use",
              "qs-p150-enjoy-v-ing"
            ]
          }
        },
        {
          "id": "complement-avoid",
          "text": "avoid",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "avoid-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~하는 것을 즐기다",
                "~하는 것을 미루다",
                "~하는 것을 포함하다",
                "~하는 것을 피하다"
              ],
              "answer": 3
            }
          ],
          "note": "avoid V-ing : ~하는 것을 피하다",
          "examples": [
            "Please avoid blocking the entrance.",
            "Please avoid parking near the entrance."
          ],
          "source": {
            "bookPage": 230,
            "entry": "0706",
            "id": "conn-verb-avoid",
            "references": [
              {
                "bookPage": 230,
                "step": 21,
                "entry": "0706",
                "headword": "avoid V-ing",
                "unit": "e0706",
                "target": "e0706"
              },
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "avoid V-ing",
                "unit": "qs-p150-avoid-v-ing",
                "target": "qs-p150-avoid-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "full-e0706-use",
              "qs-p150-avoid-v-ing"
            ]
          }
        },
        {
          "id": "complement-finish",
          "text": "finish",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "finish-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~하는 것을 피하다",
                "~하는 것을 미루다",
                "~하는 것을 끝내다",
                "~하는 것을 즐기다"
              ],
              "answer": 2
            }
          ],
          "note": "finish V-ing : ~하는 것을 끝내다",
          "examples": [
            "He finished reviewing the application.",
            "Please finish writing the report today."
          ],
          "source": {
            "bookPage": 231,
            "entry": "0709",
            "id": "conn-verb-finish",
            "references": [
              {
                "bookPage": 231,
                "step": 21,
                "entry": "0709",
                "headword": "finish V-ing",
                "unit": "e0709",
                "target": "e0709"
              },
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "finish V-ing",
                "unit": "qs-p150-finish-v-ing",
                "target": "qs-p150-finish-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "full-e0709-use",
              "qs-p150-finish-v-ing"
            ]
          }
        },
        {
          "id": "complement-consider",
          "text": "consider",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "consider-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~하는 것을 미루다",
                "~하는 것을 고려하다",
                "~하는 것을 즐기다",
                "~하는 것을 피하다"
              ],
              "answer": 1
            }
          ],
          "note": "consider V-ing : ~하는 것을 고려하다",
          "examples": [
            "We are considering hiring more staff.",
            "We are considering moving the office."
          ],
          "source": {
            "bookPage": 231,
            "entry": "0711",
            "id": "conn-consider",
            "references": [
              {
                "bookPage": 231,
                "step": 21,
                "entry": "0711",
                "headword": "consider V-ing",
                "unit": "e0711",
                "target": "e0711"
              },
              {
                "bookPage": 231,
                "step": 21,
                "entry": "0711",
                "headword": "consider V-ing",
                "unit": "e0711-x3",
                "target": "e0711-x3"
              },
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "consider V-ing",
                "unit": "qs-p150-consider-v-ing",
                "target": "qs-p150-consider-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "full-e0711-use",
              "full-e0711-x3-meaning",
              "qs-p150-consider-v-ing"
            ]
          }
        },
        {
          "id": "complement-prefer",
          "text": "prefer",
          "correctBins": [
            "toV",
            "ing"
          ],
          "steps": [
            {
              "id": "prefer-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~하는 것을 선호하다",
                "~하는 것을 피하다",
                "~하는 것을 미루다",
                "~하는 것을 포함하다"
              ],
              "answer": 0
            }
          ],
          "note": "prefer to V / prefer V-ing : ~하는 것을 선호하다 / prefer to V / V-ing : ~하는 것을 선호하다",
          "examples": [
            "I prefer to work in the morning.",
            "I prefer working in the morning.",
            "I prefer to travel by train."
          ],
          "source": {
            "bookPage": 232,
            "entry": "0715",
            "id": "conn-prefer",
            "references": [
              {
                "bookPage": 232,
                "step": 21,
                "entry": "0715",
                "headword": "prefer V-ing",
                "unit": "e0715",
                "target": "e0715"
              },
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "prefer to V",
                "unit": "qs-p146-prefer-to-v",
                "target": "qs-p146-prefer-to-v",
                "pages": [
                  146
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사·동명사",
                "headword": "prefer to V / V-ing",
                "unit": "qs-p146-prefer-to-v-v-ing",
                "target": "qs-p146-prefer-to-v-v-ing",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "full-e0715-similar-1",
              "qs-p146-prefer-to-v",
              "qs-p146-prefer-to-v-v-ing"
            ]
          }
        },
        {
          "id": "complement-begin",
          "text": "begin",
          "correctBins": [
            "toV",
            "ing"
          ],
          "steps": [
            {
              "id": "begin-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~하기를 망설이다",
                "~하는 것을 끝내다",
                "~하는 것을 거부하다",
                "~하기 시작하다"
              ],
              "answer": 3
            }
          ],
          "note": "begin to V / begin V-ing : ~하기 시작하다",
          "examples": [
            "The team began to review the proposal.",
            "The team began reviewing the proposal."
          ],
          "source": {
            "bookPage": 232,
            "entry": "0714",
            "id": "conn-begin",
            "references": [
              {
                "bookPage": 232,
                "step": 21,
                "entry": "0714",
                "headword": "begin V-ing",
                "unit": "e0714",
                "target": "e0714"
              }
            ],
            "sourceIds": [
              "full-e0714-similar-1"
            ]
          }
        },
        {
          "id": "complement-afford",
          "text": "afford",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-afford-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "끝내다",
                "~할 여유가 있다"
              ],
              "answer": 3
            }
          ],
          "note": "afford to V: ~할 여유가 있다. afford 뒤에서 '~할 여유가 있다'에 해당하는 행동을 연결할 때 afford to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "We cannot afford to buy more equipment."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "afford to V",
            "unit": "qs-p146-afford-to-v",
            "target": "qs-p146-afford-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-afford-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "afford to V",
                "unit": "qs-p146-afford-to-v",
                "target": "qs-p146-afford-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-afford-to-v"
            ]
          }
        },
        {
          "id": "complement-agree",
          "text": "agree",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-agree-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "동의하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 1
            }
          ],
          "note": "agree to V: 동의하다. agree 뒤에서 '동의하다'에 해당하는 행동을 연결할 때 agree to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "The owner agreed to renew the contract."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "agree to V",
            "unit": "qs-p146-agree-to-v",
            "target": "qs-p146-agree-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-agree-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "agree to V",
                "unit": "qs-p146-agree-to-v",
                "target": "qs-p146-agree-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-agree-to-v"
            ]
          }
        },
        {
          "id": "complement-attempt",
          "text": "attempt",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-attempt-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "시도하다",
                "피하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 0
            }
          ],
          "note": "attempt to V: 시도하다. attempt to V가 쓰인 문장이므로 to 뒤에는 동사원형이 와요.",
          "examples": [
            "They attempted to repair the machine."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "attempt to V",
            "unit": "qs-p146-attempt-to-v",
            "target": "qs-p146-attempt-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-attempt-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "attempt to V",
                "unit": "qs-p146-attempt-to-v",
                "target": "qs-p146-attempt-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-attempt-to-v"
            ]
          }
        },
        {
          "id": "complement-choose",
          "text": "choose",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-choose-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "선택하다",
                "끝내다"
              ],
              "answer": 2
            }
          ],
          "note": "choose to V: 선택하다. choose 뒤에서 '선택하다'에 해당하는 행동을 연결할 때 choose to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "She chose to take the early flight."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "choose to V",
            "unit": "qs-p146-choose-to-v",
            "target": "qs-p146-choose-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-choose-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "choose to V",
                "unit": "qs-p146-choose-to-v",
                "target": "qs-p146-choose-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-choose-to-v"
            ]
          }
        },
        {
          "id": "complement-decline",
          "text": "decline",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-decline-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "거절하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 1
            }
          ],
          "note": "decline to V: 거절하다. decline 뒤에서 '거절하다'에 해당하는 행동을 연결할 때 decline to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "She declined to speak at the event."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "decline to V",
            "unit": "qs-p146-decline-to-v",
            "target": "qs-p146-decline-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-decline-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "decline to V",
                "unit": "qs-p146-decline-to-v",
                "target": "qs-p146-decline-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-decline-to-v"
            ]
          }
        },
        {
          "id": "complement-expect",
          "text": "expect",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-expect-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "기대하다",
                "끝내다"
              ],
              "answer": 2
            }
          ],
          "note": "expect to V: 기대하다. expect 뒤에서 '기대하다'에 해당하는 행동을 연결할 때 expect to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "We expect to receive the results tomorrow."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "expect to V",
            "unit": "qs-p146-expect-to-v",
            "target": "qs-p146-expect-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-expect-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "expect to V",
                "unit": "qs-p146-expect-to-v",
                "target": "qs-p146-expect-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-expect-to-v"
            ]
          }
        },
        {
          "id": "complement-fail",
          "text": "fail",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-fail-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "~하지 못하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 1
            }
          ],
          "note": "fail to V: ~하지 못하다. fail 뒤에서 '~하지 못하다'에 해당하는 행동을 연결할 때 fail to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "The supplier failed to deliver the items on time."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "fail to V",
            "unit": "qs-p146-fail-to-v",
            "target": "qs-p146-fail-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-fail-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "fail to V",
                "unit": "qs-p146-fail-to-v",
                "target": "qs-p146-fail-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-fail-to-v"
            ]
          }
        },
        {
          "id": "complement-hesitate",
          "text": "hesitate",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-hesitate-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "망설이다",
                "피하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 0
            }
          ],
          "note": "hesitate to V: 망설이다. hesitate 뒤에서 '망설이다'에 해당하는 행동을 연결할 때 hesitate to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "Please do not hesitate to contact us."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "hesitate to V",
            "unit": "qs-p146-hesitate-to-v",
            "target": "qs-p146-hesitate-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-hesitate-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "hesitate to V",
                "unit": "qs-p146-hesitate-to-v",
                "target": "qs-p146-hesitate-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-hesitate-to-v"
            ]
          }
        },
        {
          "id": "complement-intend",
          "text": "intend",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-intend-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "끝내다",
                "의도하다·계획하다"
              ],
              "answer": 3
            }
          ],
          "note": "intend to V: 의도하다·계획하다. intend to V에서 to부정사의 to 뒤에는 동사원형 update가 와요.",
          "examples": [
            "We intend to update the system."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "intend to V",
            "unit": "qs-p146-intend-to-v",
            "target": "qs-p146-intend-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-intend-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "intend to V",
                "unit": "qs-p146-intend-to-v",
                "target": "qs-p146-intend-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-intend-to-v"
            ]
          }
        },
        {
          "id": "complement-need",
          "text": "need",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-need-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "~할 필요가 있다",
                "즐기다",
                "끝내다"
              ],
              "answer": 1
            }
          ],
          "note": "need to V: ~할 필요가 있다. need 뒤에서 '~할 필요가 있다'에 해당하는 행동을 연결할 때 need to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "We need to check the schedule."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "need to V",
            "unit": "qs-p146-need-to-v",
            "target": "qs-p146-need-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-need-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "need to V",
                "unit": "qs-p146-need-to-v",
                "target": "qs-p146-need-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-need-to-v"
            ]
          }
        },
        {
          "id": "complement-neglect",
          "text": "neglect",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-neglect-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "끝내다",
                "소홀히 하다·잊다"
              ],
              "answer": 3
            }
          ],
          "note": "neglect to V: 소홀히 하다·잊다. neglect to V가 쓰인 문장이므로 to 뒤에는 동사원형이 와요.",
          "examples": [
            "He neglected to save the file."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "neglect to V",
            "unit": "qs-p146-neglect-to-v",
            "target": "qs-p146-neglect-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-neglect-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "neglect to V",
                "unit": "qs-p146-neglect-to-v",
                "target": "qs-p146-neglect-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-neglect-to-v"
            ]
          }
        },
        {
          "id": "complement-offer",
          "text": "offer",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-offer-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "끝내다",
                "제안하다"
              ],
              "answer": 3
            }
          ],
          "note": "offer to V: 제안하다. offer 뒤에서 '제안하다'에 해당하는 행동을 연결할 때 offer to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "Mina offered to help with the preparations."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "offer to V",
            "unit": "qs-p146-offer-to-v",
            "target": "qs-p146-offer-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-offer-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "offer to V",
                "unit": "qs-p146-offer-to-v",
                "target": "qs-p146-offer-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-offer-to-v"
            ]
          }
        },
        {
          "id": "complement-opt",
          "text": "opt",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-opt-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "선택하다",
                "피하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 0
            }
          ],
          "note": "opt to V: 선택하다. opt 뒤에서 '선택하다'에 해당하는 행동을 연결할 때 opt to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "They opted to attend the training online."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "opt to V",
            "unit": "qs-p146-opt-to-v",
            "target": "qs-p146-opt-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-opt-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "opt to V",
                "unit": "qs-p146-opt-to-v",
                "target": "qs-p146-opt-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-opt-to-v"
            ]
          }
        },
        {
          "id": "complement-plan",
          "text": "plan",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-plan-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "계획하다",
                "피하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 0
            }
          ],
          "note": "plan to V: 계획하다. plan 뒤에서 '계획하다'에 해당하는 행동을 연결할 때 plan to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "They plan to open a new store."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "plan to V",
            "unit": "qs-p146-plan-to-v",
            "target": "qs-p146-plan-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-plan-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "plan to V",
                "unit": "qs-p146-plan-to-v",
                "target": "qs-p146-plan-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-plan-to-v"
            ]
          }
        },
        {
          "id": "complement-pledge",
          "text": "pledge",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-pledge-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "서약하다",
                "끝내다"
              ],
              "answer": 2
            }
          ],
          "note": "pledge to V: 서약하다. pledge 뒤에서 '서약하다'에 해당하는 행동을 연결할 때 pledge to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "The company pledged to support local schools."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "pledge to V",
            "unit": "qs-p146-pledge-to-v",
            "target": "qs-p146-pledge-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-pledge-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "pledge to V",
                "unit": "qs-p146-pledge-to-v",
                "target": "qs-p146-pledge-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-pledge-to-v"
            ]
          }
        },
        {
          "id": "complement-pretend",
          "text": "pretend",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-pretend-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "끝내다",
                "~인 척하다"
              ],
              "answer": 3
            }
          ],
          "note": "pretend to V: ~인 척하다. pretend 뒤에서 '~인 척하다'에 해당하는 행동을 연결할 때 pretend to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "He pretended to know the answer."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "pretend to V",
            "unit": "qs-p146-pretend-to-v",
            "target": "qs-p146-pretend-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-pretend-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "pretend to V",
                "unit": "qs-p146-pretend-to-v",
                "target": "qs-p146-pretend-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-pretend-to-v"
            ]
          }
        },
        {
          "id": "complement-promise",
          "text": "promise",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-promise-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "약속하다",
                "피하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 0
            }
          ],
          "note": "promise to V: 약속하다. promise 뒤에서 '약속하다'에 해당하는 행동을 연결할 때 promise to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "He promised to send the report today."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "promise to V",
            "unit": "qs-p146-promise-to-v",
            "target": "qs-p146-promise-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-promise-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "promise to V",
                "unit": "qs-p146-promise-to-v",
                "target": "qs-p146-promise-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-promise-to-v"
            ]
          }
        },
        {
          "id": "complement-strive",
          "text": "strive",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-strive-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "노력하다",
                "끝내다"
              ],
              "answer": 2
            }
          ],
          "note": "strive to V: 노력하다. strive 뒤에서 '노력하다'에 해당하는 행동을 연결할 때 strive to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "We strive to improve the service."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "strive to V",
            "unit": "qs-p146-strive-to-v",
            "target": "qs-p146-strive-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-strive-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "strive to V",
                "unit": "qs-p146-strive-to-v",
                "target": "qs-p146-strive-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-strive-to-v"
            ]
          }
        },
        {
          "id": "complement-tend",
          "text": "tend",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-tend-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~하는 경향이 있다",
                "피하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 0
            }
          ],
          "note": "tend to V: ~하는 경향이 있다. tend 뒤에서 '~하는 경향이 있다'에 해당하는 행동을 연결할 때 tend to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "These machines tend to overheat during long use."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "tend to V",
            "unit": "qs-p146-tend-to-v",
            "target": "qs-p146-tend-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-tend-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "tend to V",
                "unit": "qs-p146-tend-to-v",
                "target": "qs-p146-tend-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-tend-to-v"
            ]
          }
        },
        {
          "id": "complement-try",
          "text": "try",
          "correctBins": [
            "toV",
            "ing"
          ],
          "steps": [
            {
              "id": "complement-try-ing",
              "label": "V-ing 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "try V-ing",
              "options": [
                "피하다",
                "즐기다",
                "끝내다",
                "시험 삼아 ~해보다"
              ],
              "answer": 3
            },
            {
              "id": "complement-try-toV",
              "label": "to V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "try to V",
              "options": [
                "피하다",
                "즐기다",
                "~하려고 노력하다",
                "끝내다"
              ],
              "answer": 2
            }
          ],
          "note": "try to V: ~하려고 노력하다. try to V가 쓰인 문장이므로 to 뒤에는 동사원형이 와요. try V-ing는 시험 삼아 해본다는 다른 쓰임도 있어요.",
          "examples": [
            "We will try to meet the deadline."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "try to V",
            "unit": "qs-p146-try-to-v",
            "target": "qs-p146-try-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-try-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "try to V",
                "unit": "qs-p146-try-to-v",
                "target": "qs-p146-try-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-try-to-v"
            ]
          }
        },
        {
          "id": "complement-want",
          "text": "want",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-want-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "끝내다",
                "원하다"
              ],
              "answer": 3
            }
          ],
          "note": "want to V: 원하다. want 뒤에서 '원하다'에 해당하는 행동을 연결할 때 want to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "We want to use the new service."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "want to V",
            "unit": "qs-p146-want-to-v",
            "target": "qs-p146-want-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-want-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "want to V",
                "unit": "qs-p146-want-to-v",
                "target": "qs-p146-want-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-want-to-v"
            ]
          }
        },
        {
          "id": "complement-wish",
          "text": "wish",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-wish-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "원하다",
                "피하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 0
            }
          ],
          "note": "wish to V: 원하다. wish 뒤에서 '원하다'에 해당하는 행동을 연결할 때 wish to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "She wishes to meet the manager."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "wish to V",
            "unit": "qs-p146-wish-to-v",
            "target": "qs-p146-wish-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-wish-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "wish to V",
                "unit": "qs-p146-wish-to-v",
                "target": "qs-p146-wish-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-wish-to-v"
            ]
          }
        },
        {
          "id": "complement-would-like",
          "text": "would like",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-would-like-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "~하고 싶다",
                "끝내다"
              ],
              "answer": 2
            }
          ],
          "note": "would like to V: ~하고 싶다. would like 뒤에서 '~하고 싶다'에 해당하는 행동을 연결할 때 would like to V를 사용해요. to 뒤에는 동사원형이 와요.",
          "examples": [
            "I would like to make an appointment."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 146,
            "pdfPage": 147,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "would like to V",
            "unit": "qs-p146-would-like-to-v",
            "target": "qs-p146-would-like-to-v",
            "pages": [
              146
            ],
            "id": "qs-p146-would-like-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 146,
                "pdfPage": 147,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "would like to V",
                "unit": "qs-p146-would-like-to-v",
                "target": "qs-p146-would-like-to-v",
                "pages": [
                  146
                ]
              }
            ],
            "sourceIds": [
              "qs-p146-would-like-to-v"
            ]
          }
        },
        {
          "id": "complement-ask",
          "text": "ask",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-ask-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~하겠다고 요청하다",
                "피하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 0
            }
          ],
          "note": "ask to V: ~하겠다고 요청하다. ask to V에서는 주어가 행동을 하겠다고 요청해요. ask + 사람 + to V와 구별해요.",
          "examples": [
            "She asked to complete the form herself."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 147,
            "pdfPage": 148,
            "scope": "verb-to-infinitive",
            "section": "동사 + to부정사",
            "headword": "ask to V",
            "unit": "qs-p147-ask-to-v",
            "target": "qs-p147-ask-to-v",
            "pages": [
              147
            ],
            "id": "qs-p147-ask-to-v",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 147,
                "pdfPage": 148,
                "scope": "verb-to-infinitive",
                "section": "동사 + to부정사",
                "headword": "ask to V",
                "unit": "qs-p147-ask-to-v",
                "target": "qs-p147-ask-to-v",
                "pages": [
                  147
                ]
              }
            ],
            "sourceIds": [
              "qs-p147-ask-to-v"
            ]
          }
        },
        {
          "id": "complement-delay",
          "text": "delay",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "complement-delay-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "미루다",
                "피하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 0
            }
          ],
          "note": "delay V-ing: 미루다. delay 뒤에서 행동을 목적어로 나타낼 때 V-ing를 사용해요.",
          "examples": [
            "They delayed installing the new system."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 150,
            "pdfPage": 151,
            "scope": "verb-gerund",
            "section": "동사 + 동명사",
            "headword": "delay V-ing",
            "unit": "qs-p150-delay-v-ing",
            "target": "qs-p150-delay-v-ing",
            "pages": [
              150
            ],
            "id": "qs-p150-delay-v-ing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "delay V-ing",
                "unit": "qs-p150-delay-v-ing",
                "target": "qs-p150-delay-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "qs-p150-delay-v-ing"
            ]
          }
        },
        {
          "id": "complement-deny",
          "text": "deny",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "complement-deny-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "부인하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 1
            }
          ],
          "note": "deny V-ing: 부인하다. deny 뒤에서 행동을 목적어로 나타낼 때 V-ing를 사용해요.",
          "examples": [
            "The employee denied removing the file."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 150,
            "pdfPage": 151,
            "scope": "verb-gerund",
            "section": "동사 + 동명사",
            "headword": "deny V-ing",
            "unit": "qs-p150-deny-v-ing",
            "target": "qs-p150-deny-v-ing",
            "pages": [
              150
            ],
            "id": "qs-p150-deny-v-ing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "deny V-ing",
                "unit": "qs-p150-deny-v-ing",
                "target": "qs-p150-deny-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "qs-p150-deny-v-ing"
            ]
          }
        },
        {
          "id": "complement-discontinue",
          "text": "discontinue",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "complement-discontinue-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "중단하다",
                "끝내다"
              ],
              "answer": 2
            }
          ],
          "note": "discontinue V-ing: 중단하다. discontinue 뒤에서 행동을 목적어로 나타낼 때 V-ing를 사용해요.",
          "examples": [
            "The store discontinued selling the product."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 150,
            "pdfPage": 151,
            "scope": "verb-gerund",
            "section": "동사 + 동명사",
            "headword": "discontinue V-ing",
            "unit": "qs-p150-discontinue-v-ing",
            "target": "qs-p150-discontinue-v-ing",
            "pages": [
              150
            ],
            "id": "qs-p150-discontinue-v-ing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "discontinue V-ing",
                "unit": "qs-p150-discontinue-v-ing",
                "target": "qs-p150-discontinue-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "qs-p150-discontinue-v-ing"
            ]
          }
        },
        {
          "id": "complement-dislike",
          "text": "dislike",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "complement-dislike-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "싫어하다",
                "끝내다"
              ],
              "answer": 2
            }
          ],
          "note": "dislike V-ing: 싫어하다. dislike 뒤에서 행동을 목적어로 나타낼 때 V-ing를 사용해요.",
          "examples": [
            "He dislikes waiting in long lines."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 150,
            "pdfPage": 151,
            "scope": "verb-gerund",
            "section": "동사 + 동명사",
            "headword": "dislike V-ing",
            "unit": "qs-p150-dislike-v-ing",
            "target": "qs-p150-dislike-v-ing",
            "pages": [
              150
            ],
            "id": "qs-p150-dislike-v-ing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "dislike V-ing",
                "unit": "qs-p150-dislike-v-ing",
                "target": "qs-p150-dislike-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "qs-p150-dislike-v-ing"
            ]
          }
        },
        {
          "id": "complement-give-up",
          "text": "give up",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "complement-give-up-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "포기하다",
                "끝내다"
              ],
              "answer": 2
            }
          ],
          "note": "give up V-ing: 포기하다. give up 뒤에서 행동을 목적어로 나타낼 때 V-ing를 사용해요.",
          "examples": [
            "They gave up repairing the old machine."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 150,
            "pdfPage": 151,
            "scope": "verb-gerund",
            "section": "동사 + 동명사",
            "headword": "give up V-ing",
            "unit": "qs-p150-give-up-v-ing",
            "target": "qs-p150-give-up-v-ing",
            "pages": [
              150
            ],
            "id": "qs-p150-give-up-v-ing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "give up V-ing",
                "unit": "qs-p150-give-up-v-ing",
                "target": "qs-p150-give-up-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "qs-p150-give-up-v-ing"
            ]
          }
        },
        {
          "id": "complement-include",
          "text": "include",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "complement-include-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "포함하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 1
            }
          ],
          "note": "include V-ing: 포함하다. include 뒤에서 행동을 목적어로 나타낼 때 V-ing를 사용해요.",
          "examples": [
            "The job includes answering customer calls."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 150,
            "pdfPage": 151,
            "scope": "verb-gerund",
            "section": "동사 + 동명사",
            "headword": "include V-ing",
            "unit": "qs-p150-include-v-ing",
            "target": "qs-p150-include-v-ing",
            "pages": [
              150
            ],
            "id": "qs-p150-include-v-ing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "include V-ing",
                "unit": "qs-p150-include-v-ing",
                "target": "qs-p150-include-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "qs-p150-include-v-ing"
            ]
          }
        },
        {
          "id": "complement-keep",
          "text": "keep",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "complement-keep-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "계속 ~하다",
                "끝내다"
              ],
              "answer": 2
            }
          ],
          "note": "keep V-ing: 계속 ~하다. keep 뒤에서 행동을 목적어로 나타낼 때 V-ing를 사용해요.",
          "examples": [
            "Please keep checking until the work is finished."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 150,
            "pdfPage": 151,
            "scope": "verb-gerund",
            "section": "동사 + 동명사",
            "headword": "keep V-ing",
            "unit": "qs-p150-keep-v-ing",
            "target": "qs-p150-keep-v-ing",
            "pages": [
              150
            ],
            "id": "qs-p150-keep-v-ing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "keep V-ing",
                "unit": "qs-p150-keep-v-ing",
                "target": "qs-p150-keep-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "qs-p150-keep-v-ing"
            ]
          }
        },
        {
          "id": "complement-mind",
          "text": "mind",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "complement-mind-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "꺼리다",
                "즐기다",
                "끝내다"
              ],
              "answer": 1
            }
          ],
          "note": "mind V-ing: 꺼리다. mind 뒤에서 행동을 목적어로 나타낼 때 V-ing를 사용해요.",
          "examples": [
            "Would you mind waiting here?"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 150,
            "pdfPage": 151,
            "scope": "verb-gerund",
            "section": "동사 + 동명사",
            "headword": "mind V-ing",
            "unit": "qs-p150-mind-v-ing",
            "target": "qs-p150-mind-v-ing",
            "pages": [
              150
            ],
            "id": "qs-p150-mind-v-ing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "mind V-ing",
                "unit": "qs-p150-mind-v-ing",
                "target": "qs-p150-mind-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "qs-p150-mind-v-ing"
            ]
          }
        },
        {
          "id": "complement-postpone",
          "text": "postpone",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "complement-postpone-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "미루다",
                "즐기다",
                "끝내다"
              ],
              "answer": 1
            }
          ],
          "note": "postpone V-ing: 미루다. postpone 뒤에서 행동을 목적어로 나타낼 때 V-ing를 사용해요.",
          "examples": [
            "We postponed announcing the results."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 150,
            "pdfPage": 151,
            "scope": "verb-gerund",
            "section": "동사 + 동명사",
            "headword": "postpone V-ing",
            "unit": "qs-p150-postpone-v-ing",
            "target": "qs-p150-postpone-v-ing",
            "pages": [
              150
            ],
            "id": "qs-p150-postpone-v-ing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "postpone V-ing",
                "unit": "qs-p150-postpone-v-ing",
                "target": "qs-p150-postpone-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "qs-p150-postpone-v-ing"
            ]
          }
        },
        {
          "id": "complement-recommend",
          "text": "recommend",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "complement-recommend-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "끝내다",
                "권하다"
              ],
              "answer": 3
            }
          ],
          "note": "recommend V-ing: 권하다. recommend 뒤에서 행동을 목적어로 나타낼 때 V-ing를 사용해요.",
          "examples": [
            "The manager recommended attending the workshop."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 150,
            "pdfPage": 151,
            "scope": "verb-gerund",
            "section": "동사 + 동명사",
            "headword": "recommend V-ing",
            "unit": "qs-p150-recommend-v-ing",
            "target": "qs-p150-recommend-v-ing",
            "pages": [
              150
            ],
            "id": "qs-p150-recommend-v-ing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "recommend V-ing",
                "unit": "qs-p150-recommend-v-ing",
                "target": "qs-p150-recommend-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "qs-p150-recommend-v-ing"
            ]
          }
        },
        {
          "id": "complement-risk",
          "text": "risk",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "complement-risk-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "위험을 무릅쓰다",
                "끝내다"
              ],
              "answer": 2
            }
          ],
          "note": "risk V-ing: 위험을 무릅쓰다. risk 뒤에서 행동을 목적어로 나타낼 때 V-ing를 사용해요.",
          "examples": [
            "We cannot risk losing the contract."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 150,
            "pdfPage": 151,
            "scope": "verb-gerund",
            "section": "동사 + 동명사",
            "headword": "risk V-ing",
            "unit": "qs-p150-risk-v-ing",
            "target": "qs-p150-risk-v-ing",
            "pages": [
              150
            ],
            "id": "qs-p150-risk-v-ing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "risk V-ing",
                "unit": "qs-p150-risk-v-ing",
                "target": "qs-p150-risk-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "qs-p150-risk-v-ing"
            ]
          }
        },
        {
          "id": "complement-suggest",
          "text": "suggest",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "complement-suggest-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "끝내다",
                "제안하다"
              ],
              "answer": 3
            }
          ],
          "note": "suggest V-ing: 제안하다. suggest 뒤에서 행동을 목적어로 나타낼 때 V-ing를 사용해요.",
          "examples": [
            "She suggested changing the schedule."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 150,
            "pdfPage": 151,
            "scope": "verb-gerund",
            "section": "동사 + 동명사",
            "headword": "suggest V-ing",
            "unit": "qs-p150-suggest-v-ing",
            "target": "qs-p150-suggest-v-ing",
            "pages": [
              150
            ],
            "id": "qs-p150-suggest-v-ing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "suggest V-ing",
                "unit": "qs-p150-suggest-v-ing",
                "target": "qs-p150-suggest-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "qs-p150-suggest-v-ing"
            ]
          }
        },
        {
          "id": "complement-tolerate",
          "text": "tolerate",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "complement-tolerate-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "용인하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 1
            }
          ],
          "note": "tolerate V-ing: 용인하다. tolerate 뒤에서 행동을 목적어로 나타낼 때 V-ing를 사용해요.",
          "examples": [
            "The company will not tolerate breaking the rules."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 150,
            "pdfPage": 151,
            "scope": "verb-gerund",
            "section": "동사 + 동명사",
            "headword": "tolerate V-ing",
            "unit": "qs-p150-tolerate-v-ing",
            "target": "qs-p150-tolerate-v-ing",
            "pages": [
              150
            ],
            "id": "qs-p150-tolerate-v-ing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 150,
                "pdfPage": 151,
                "scope": "verb-gerund",
                "section": "동사 + 동명사",
                "headword": "tolerate V-ing",
                "unit": "qs-p150-tolerate-v-ing",
                "target": "qs-p150-tolerate-v-ing",
                "pages": [
                  150
                ]
              }
            ],
            "sourceIds": [
              "qs-p150-tolerate-v-ing"
            ]
          }
        },
        {
          "id": "complement-proceed",
          "text": "proceed",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-proceed-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "끝내다",
                "이어서·계속해서 ~하다"
              ],
              "answer": 3
            }
          ],
          "note": "proceed to V: 이어서·계속해서 ~하다. proceed to V에서는 to 뒤에 동사원형이 와요. proceed with + 명사와 구별하세요.",
          "examples": [
            "After introductions, the chair proceeded to review the agenda."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 212,
            "pdfPage": 213,
            "scope": "verb-to-infinitive",
            "section": "동사 + 전치사 Collocation",
            "headword": "proceed to V",
            "unit": "qs-p212-proceed-to-v-structure",
            "target": "qs-p212-proceed-to-v-structure",
            "pages": [
              212
            ],
            "id": "qs-p212-proceed-to-v-structure",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 212,
                "pdfPage": 213,
                "scope": "verb-to-infinitive",
                "section": "동사 + 전치사 Collocation",
                "headword": "proceed to V",
                "unit": "qs-p212-proceed-to-v-structure",
                "target": "qs-p212-proceed-to-v-structure",
                "pages": [
                  212
                ]
              }
            ],
            "sourceIds": [
              "qs-p212-proceed-to-v-structure"
            ]
          }
        },
        {
          "id": "complement-aim",
          "text": "aim",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-aim-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~하는 것을 목표로 하다",
                "피하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 0
            }
          ],
          "note": "aim to V: ~하는 것을 목표로 하다 (v.).",
          "examples": [
            "We aim to reduce waste this year."
          ],
          "source": {
            "bookPage": 224,
            "step": 21,
            "entry": "0683",
            "headword": "aim to V",
            "unit": "e0683",
            "target": "e0683-s2",
            "id": "full-e0683-s2-meaning",
            "references": [
              {
                "bookPage": 224,
                "step": 21,
                "entry": "0683",
                "headword": "aim to V",
                "unit": "e0683",
                "target": "e0683-s2"
              }
            ],
            "sourceIds": [
              "full-e0683-s2-meaning"
            ]
          }
        },
        {
          "id": "complement-mean",
          "text": "mean",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-mean-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "~할 생각이다, 의도가 있다",
                "끝내다"
              ],
              "answer": 2
            }
          ],
          "note": "mean to V: ~할 생각이다, 의도가 있다.",
          "examples": [
            "mean to V"
          ],
          "source": {
            "bookPage": 228,
            "step": 21,
            "entry": "0697",
            "headword": "mean to V",
            "unit": "e0697",
            "target": "e0697",
            "id": "full-e0697-use",
            "references": [
              {
                "bookPage": 228,
                "step": 21,
                "entry": "0697",
                "headword": "mean to V",
                "unit": "e0697",
                "target": "e0697"
              }
            ],
            "sourceIds": [
              "full-e0697-use"
            ]
          }
        },
        {
          "id": "complement-forget",
          "text": "forget",
          "correctBins": [
            "toV",
            "ing"
          ],
          "steps": [
            {
              "id": "complement-forget-toV",
              "label": "to V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "forget to V",
              "options": [
                "피하다",
                "즐기다",
                "앞으로 ~할 일을 잊다",
                "끝내다"
              ],
              "answer": 2
            },
            {
              "id": "complement-forget-ing",
              "label": "V-ing 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "forget V-ing",
              "options": [
                "피하다",
                "즐기다",
                "끝내다",
                "과거에 ~했던 일을 잊다"
              ],
              "answer": 3
            }
          ],
          "note": "forget to V: 앞으로 ~할 일을 잊다. / forget V-ing : 과거에 ~했던 일을 잊다",
          "examples": [
            "forget to V",
            "forget V-ing"
          ],
          "source": {
            "bookPage": 228,
            "step": 21,
            "entry": "0699",
            "headword": "forget to V",
            "unit": "e0699",
            "target": "e0699",
            "id": "full-e0699-use",
            "references": [
              {
                "bookPage": 228,
                "step": 21,
                "entry": "0699",
                "headword": "forget to V",
                "unit": "e0699",
                "target": "e0699"
              },
              {
                "bookPage": 228,
                "step": 21,
                "entry": "0699",
                "headword": "forget to V",
                "unit": "e0699-x1",
                "target": "e0699-x1"
              }
            ],
            "sourceIds": [
              "full-e0699-use",
              "full-e0699-x1-meaning"
            ]
          }
        },
        {
          "id": "complement-remember",
          "text": "remember",
          "correctBins": [
            "toV",
            "ing"
          ],
          "steps": [
            {
              "id": "complement-remember-toV",
              "label": "to V 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "remember to V",
              "options": [
                "피하다",
                "즐기다",
                "앞으로 ~할 일을 기억하다, 잊지 않다",
                "끝내다"
              ],
              "answer": 2
            },
            {
              "id": "complement-remember-ing",
              "label": "V-ing 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "remember V-ing",
              "options": [
                "피하다",
                "즐기다",
                "끝내다",
                "과거에 ~했던 일을 기억하다"
              ],
              "answer": 3
            }
          ],
          "note": "remember to V: 앞으로 ~할 일을 기억하다, 잊지 않다. / remember V-ing : 과거에 ~했던 일을 기억하다",
          "examples": [
            "remember to V",
            "remember V-ing"
          ],
          "source": {
            "bookPage": 229,
            "step": 21,
            "entry": "0704",
            "headword": "remember to V",
            "unit": "e0704",
            "target": "e0704",
            "id": "full-e0704-use",
            "references": [
              {
                "bookPage": 229,
                "step": 21,
                "entry": "0704",
                "headword": "remember to V",
                "unit": "e0704",
                "target": "e0704"
              },
              {
                "bookPage": 229,
                "step": 21,
                "entry": "0704",
                "headword": "remember to V",
                "unit": "e0704-x1",
                "target": "e0704-x1"
              }
            ],
            "sourceIds": [
              "full-e0704-use",
              "full-e0704-x1-meaning"
            ]
          }
        },
        {
          "id": "complement-quit",
          "text": "quit",
          "correctBins": [
            "ing"
          ],
          "steps": [
            {
              "id": "complement-quit-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~하는 것을 그만두다",
                "피하다",
                "즐기다",
                "끝내다"
              ],
              "answer": 0
            }
          ],
          "note": "quit V-ing: ~하는 것을 그만두다.",
          "examples": [
            "quit V-ing"
          ],
          "source": {
            "bookPage": 231,
            "step": 21,
            "entry": "0710",
            "headword": "quit V-ing",
            "unit": "e0710",
            "target": "e0710",
            "id": "full-e0710-use",
            "references": [
              {
                "bookPage": 231,
                "step": 21,
                "entry": "0710",
                "headword": "quit V-ing",
                "unit": "e0710",
                "target": "e0710"
              }
            ],
            "sourceIds": [
              "full-e0710-use"
            ]
          }
        },
        {
          "id": "complement-regret",
          "text": "regret",
          "correctBins": [
            "toV"
          ],
          "steps": [
            {
              "id": "complement-regret-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "피하다",
                "즐기다",
                "~하게 되어 유감이다",
                "끝내다"
              ],
              "answer": 2
            }
          ],
          "note": "regret to V: ~하게 되어 유감이다.",
          "examples": [
            "regret to V"
          ],
          "source": {
            "bookPage": 253,
            "step": 23,
            "entry": "0790",
            "headword": "I'm afraid (that)",
            "unit": "e0790-x3",
            "target": "e0790-x3",
            "id": "full-e0790-x3-use",
            "references": [
              {
                "bookPage": 253,
                "step": 23,
                "entry": "0790",
                "headword": "I'm afraid (that)",
                "unit": "e0790-x3",
                "target": "e0790-x3"
              }
            ],
            "sourceIds": [
              "full-e0790-x3-use"
            ]
          }
        }
      ]
    },
    {
      "id": "link-usage",
      "title": "전치사 · 접속사 · 부사",
      "bins": [
        {
          "id": "prep",
          "label": "전치사"
        },
        {
          "id": "conj",
          "label": "접속사"
        },
        {
          "id": "adv",
          "label": "부사"
        }
      ],
      "instruction": "교재 163~168쪽에 실린 연결 표현의 핵심 쓰임을 모두 선택하세요. 같은 표현의 여러 쓰임은 한 카드에 묶었어요.",
      "cards": [
        {
          "id": "link-before",
          "text": "before",
          "correctBins": [
            "prep",
            "conj",
            "adv"
          ],
          "steps": [
            {
              "id": "link-before-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~전에",
                "~후에",
                "~동안",
                "~이래로"
              ],
              "answer": 0
            }
          ],
          "note": "(prep) before + 명사구 / (conj) before + S + V / (adv) 뒤에 명사구·절 없이 쓰여요. before V-ing도 가능해요.",
          "examples": [
            "Please arrive before the meeting.",
            "Call me before you leave.",
            "I have seen this report before.",
            "Finish the form before you enter the room."
          ],
          "source": {
            "bookPage": 166,
            "id": "semantic1-ui2-usage1-qs-p166-before-clause",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "before + clause",
                "unit": "qs-p166-before-clause",
                "target": "qs-p166-before-clause",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-before-clause",
              "semantic1-ui2-usage1-qs-p166-before-clause"
            ],
            "usageId": "usage1-qs-p166-before-clause"
          }
        },
        {
          "id": "link-after",
          "text": "after",
          "correctBins": [
            "prep",
            "conj",
            "adv"
          ],
          "steps": [
            {
              "id": "link-after-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~전에",
                "~동안",
                "~까지",
                "~후에"
              ],
              "answer": 3
            }
          ],
          "note": "(prep) after + 명사구 / (conj) after + S + V / (adv) soon after처럼 뒤에 목적어 없이 쓰여요. after V-ing도 가능해요.",
          "examples": [
            "We met after the presentation.",
            "We will reply after we review the request.",
            "The director arrived soon after.",
            "Please call us after you receive the package."
          ],
          "source": {
            "bookPage": 166,
            "id": "semantic1-ui2-usage1-qs-p166-after-clause",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "after + clause",
                "unit": "qs-p166-after-clause",
                "target": "qs-p166-after-clause",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-after-clause",
              "semantic1-ui2-usage1-qs-p166-after-clause"
            ],
            "usageId": "usage1-qs-p166-after-clause"
          }
        },
        {
          "id": "link-since",
          "text": "since",
          "correctBins": [
            "prep",
            "conj",
            "adv"
          ],
          "steps": [
            {
              "id": "link-since-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~동안",
                "~전에",
                "~이래로",
                "~까지"
              ],
              "answer": 2
            }
          ],
          "note": "시간 뜻: (prep) since + 시작 시점 / (conj) since + S + V / (adv) ever since처럼 쓰여요. since V-ing도 가능해요. 접속사로 ~때문에라는 뜻도 있어요.",
          "examples": [
            "She has worked here since 2020.",
            "She has worked here since she graduated.",
            "She joined in 2020 and has worked here ever since.",
            "We have worked together since she joined the company."
          ],
          "source": {
            "bookPage": 166,
            "id": "semantic1-ui2-usage1-qs-p166-since-clause-time",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "since + clause (time)",
                "unit": "qs-p166-since-clause-time",
                "target": "qs-p166-since-clause-time",
                "pages": [
                  166
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "because / as / since / now that",
                "unit": "qs-p166-because-as-since-now-that",
                "target": "qs-p166-because-as-since-now-that",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-since-clause-time",
              "semantic1-ui2-usage1-qs-p166-since-clause-time",
              "qs-p166-because-as-since-now-that"
            ],
            "usageId": "usage1-qs-p166-since-clause-time"
          }
        },
        {
          "id": "link-until",
          "text": "until",
          "correctBins": [
            "prep",
            "conj"
          ],
          "steps": [
            {
              "id": "link-until-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~직후에",
                "~까지 계속",
                "~이래로 계속",
                "~전에"
              ],
              "answer": 1
            }
          ],
          "note": "(prep) until + 명사구 / (conj) until + S + V. 행동·상태가 그때까지 계속됨을 나타내요.",
          "examples": [
            "The shop stays open until nine.",
            "Please wait until the manager returns.",
            "Stay here until the manager returns."
          ],
          "source": {
            "bookPage": 166,
            "id": "semantic1-ui2-usage1-qs-p166-until-clause",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "until + clause",
                "unit": "qs-p166-until-clause",
                "target": "qs-p166-until-clause",
                "pages": [
                  166
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "until + endpoint",
                "unit": "qs-p164-until-endpoint",
                "target": "qs-p164-until-endpoint",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-until-clause",
              "semantic1-ui2-usage1-qs-p166-until-clause",
              "qs-p164-until-endpoint"
            ],
            "usageId": "usage1-qs-p166-until-clause"
          }
        },
        {
          "id": "link-considering",
          "text": "considering",
          "correctBins": [
            "prep",
            "conj"
          ],
          "steps": [
            {
              "id": "link-considering-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~을 고려하면",
                "~에도 불구하고",
                "~덕분에",
                "~을 대신하여"
              ],
              "answer": 0
            }
          ],
          "note": "(prep) considering + 명사구 / (conj) considering (that) + S + V.",
          "examples": [
            "Considering the cost, the plan is practical.",
            "Considering that the budget is limited, the plan is practical."
          ],
          "source": {
            "bookPage": 167,
            "id": "semantic1-ui2-usage1-qs-p167-considering-noun",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "link-prepositions",
                "section": "전치사와 접속사 비교",
                "headword": "considering + noun",
                "unit": "qs-p167-considering-noun",
                "target": "qs-p167-considering-noun",
                "pages": [
                  167
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "considering (that)",
                "unit": "qs-p167-considering-that",
                "target": "qs-p167-considering-that",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-considering-noun",
              "semantic1-ui2-usage1-qs-p167-considering-noun",
              "qs-p167-considering-that"
            ],
            "usageId": "usage1-qs-p167-considering-noun"
          }
        },
        {
          "id": "link-despite",
          "text": "despite",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-despite-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~때문에",
                "~을 대신하여",
                "~에 더하여",
                "~에도 불구하고"
              ],
              "answer": 3
            }
          ],
          "note": "(prep) despite + 명사구·V-ing. S + V를 바로 잇지 않아요.",
          "examples": [
            "The event continued despite the rain."
          ],
          "source": {
            "bookPage": 165,
            "id": "semantic1-ui2-usage1-qs-p165-despite-in-spite-of-notwithstanding",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "despite / in spite of / notwithstanding",
                "unit": "qs-p165-despite-in-spite-of-notwithstanding",
                "target": "qs-p165-despite-in-spite-of-notwithstanding",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-despite-in-spite-of-notwithstanding",
              "semantic1-ui2-usage1-qs-p165-despite-in-spite-of-notwithstanding"
            ],
            "usageId": "usage1-qs-p165-despite-in-spite-of-notwithstanding"
          }
        },
        {
          "id": "link-because-of",
          "text": "because of",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-because-of-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~에 더하여",
                "~을 대표하여",
                "~때문에",
                "~에도 불구하고"
              ],
              "answer": 2
            }
          ],
          "note": "(prep) because of + 명사구. because + S + V와 구별해요.",
          "examples": [
            "The flight was delayed because of heavy snow."
          ],
          "source": {
            "bookPage": 165,
            "id": "semantic1-ui2-usage1-qs-p165-due-to-because-of-owing-to",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "due to / because of / owing to",
                "unit": "qs-p165-due-to-because-of-owing-to",
                "target": "qs-p165-due-to-because-of-owing-to",
                "pages": [
                  165,
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-due-to-because-of-owing-to",
              "semantic1-ui2-usage1-qs-p165-due-to-because-of-owing-to"
            ],
            "usageId": "usage1-qs-p165-due-to-because-of-owing-to"
          }
        },
        {
          "id": "link-although",
          "text": "although",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-although-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "~하지 않으면",
                "~이지만",
                "~때문에",
                "~하자마자"
              ],
              "answer": 1
            }
          ],
          "note": "(conj) although + S + V. although busy 같은 축약절도 가능해요.",
          "examples": [
            "Although the task was difficult, we finished on time."
          ],
          "source": {
            "bookPage": 167,
            "id": "semantic1-ui2-usage1-qs-p167-although-though-even-though",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "although / though / even though",
                "unit": "qs-p167-although-though-even-though",
                "target": "qs-p167-although-though-even-though",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-although-though-even-though",
              "semantic1-ui2-usage1-qs-p167-although-though-even-though"
            ],
            "usageId": "usage1-qs-p167-although-though-even-though"
          }
        },
        {
          "id": "link-however",
          "text": "however",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-however-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "그러나",
                "따라서",
                "게다가",
                "그동안"
              ],
              "answer": 0
            }
          ],
          "note": "(adv) 독립 문장 사이의 대조 관계를 나타내요. 마침표나 세미콜론 등으로 두 절을 구분해요.",
          "examples": [
            "The plan is useful. However, it is expensive.",
            "The product is expensive. However, it remains very popular."
          ],
          "source": {
            "bookPage": 168,
            "id": "semantic1-ui2-usage1-qs-p168-however",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "however",
                "unit": "qs-p168-however",
                "target": "qs-p168-however",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-however",
              "semantic1-ui2-usage1-qs-p168-however"
            ],
            "usageId": "usage1-qs-p168-however"
          }
        },
        {
          "id": "link-meanwhile",
          "text": "meanwhile",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-meanwhile-meaning",
              "label": "뜻",
              "prompt": "핵심 뜻을 고르세요.",
              "options": [
                "그후에",
                "그전에",
                "그렇지 않으면",
                "그동안"
              ],
              "answer": 3
            }
          ],
          "note": "(adv) 같은 시간에 진행되는 내용을 덧붙여요. 마침표나 세미콜론 등으로 두 절을 구분해요.",
          "examples": [
            "The office is being repaired. Meanwhile, staff will work elsewhere.",
            "Repairs will take two hours. Meanwhile, customers can wait in the lounge."
          ],
          "source": {
            "bookPage": 168,
            "id": "semantic1-ui2-usage1-qs-p168-meanwhile",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "meanwhile",
                "unit": "qs-p168-meanwhile",
                "target": "qs-p168-meanwhile",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-meanwhile",
              "semantic1-ui2-usage1-qs-p168-meanwhile"
            ],
            "usageId": "usage1-qs-p168-meanwhile"
          }
        },
        {
          "id": "link-nevertheless",
          "text": "nevertheless",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-nevertheless-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "그럼에도 불구하고"
              ],
              "answer": 3
            }
          ],
          "note": "nevertheless: (adv) 그럼에도 불구하고. 앞 문장이 마침표로 끝난 뒤, 완전한 문장 앞에서 양보 관계를 연결하는 Nevertheless가 맞아요.",
          "examples": [
            "The task was difficult. Nevertheless, we finished it."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 111,
            "pdfPage": 112,
            "scope": "linking-adverbs",
            "section": "형용사 어형 예외",
            "headword": "nevertheless",
            "unit": "qs-p111-nevertheless",
            "target": "qs-p111-nevertheless",
            "pages": [
              111,
              168
            ],
            "id": "qs-p111-nevertheless",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "linking-adverbs",
                "section": "형용사 어형 예외",
                "headword": "nevertheless",
                "unit": "qs-p111-nevertheless",
                "target": "qs-p111-nevertheless",
                "pages": [
                  111,
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p111-nevertheless"
            ]
          }
        },
        {
          "id": "link-at",
          "text": "at",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-at-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~에, ~에서 (시각·지점)",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "at 10 o'clock: 10시에. 정확한 시각 앞에는 at을 써요.",
          "examples": [
            "The meeting starts at 10 o'clock.",
            "She is working at home today.",
            "The road is quiet at night.",
            "We will review the results at the end of the month."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 163,
            "pdfPage": 164,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "at 10 o'clock",
            "unit": "qs-p163-at-10-o-clock",
            "target": "qs-p163-at-10-o-clock",
            "pages": [
              163
            ],
            "id": "qs-p163-at-10-o-clock",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "at 10 o'clock",
                "unit": "qs-p163-at-10-o-clock",
                "target": "qs-p163-at-10-o-clock",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "at home",
                "unit": "qs-p163-at-home",
                "target": "qs-p163-at-home",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "at night",
                "unit": "qs-p163-at-night",
                "target": "qs-p163-at-night",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "at the airport",
                "unit": "qs-p163-at-the-airport",
                "target": "qs-p163-at-the-airport",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "at the corner of the street",
                "unit": "qs-p163-at-the-corner-of-the-street",
                "target": "qs-p163-at-the-corner-of-the-street",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "at the end of the month",
                "unit": "qs-p163-at-the-end-of-the-month",
                "target": "qs-p163-at-the-end-of-the-month",
                "pages": [
                  163
                ]
              }
            ],
            "sourceIds": [
              "qs-p163-at-10-o-clock",
              "qs-p163-at-home",
              "qs-p163-at-night",
              "qs-p163-at-the-airport",
              "qs-p163-at-the-corner-of-the-street",
              "qs-p163-at-the-end-of-the-month"
            ]
          }
        },
        {
          "id": "link-in",
          "text": "in",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-in-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~에, ~안에 (기간·공간)",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "in 1990: 1990년에. 연도를 나타내는 1990 앞에는 in을 써요.",
          "examples": [
            "The company was founded in 1990.",
            "The company has several branches in Europe.",
            "The office will open in November."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 163,
            "pdfPage": 164,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "in 1990",
            "unit": "qs-p163-in-1990",
            "target": "qs-p163-in-1990",
            "pages": [
              163
            ],
            "id": "qs-p163-in-1990",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "in 1990",
                "unit": "qs-p163-in-1990",
                "target": "qs-p163-in-1990",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "in Europe",
                "unit": "qs-p163-in-europe",
                "target": "qs-p163-in-europe",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "in November",
                "unit": "qs-p163-in-november",
                "target": "qs-p163-in-november",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "in the car",
                "unit": "qs-p163-in-the-car",
                "target": "qs-p163-in-the-car",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "in the meeting room",
                "unit": "qs-p163-in-the-meeting-room",
                "target": "qs-p163-in-the-meeting-room",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "in the summer",
                "unit": "qs-p163-in-the-summer",
                "target": "qs-p163-in-the-summer",
                "pages": [
                  163
                ]
              }
            ],
            "sourceIds": [
              "qs-p163-in-1990",
              "qs-p163-in-europe",
              "qs-p163-in-november",
              "qs-p163-in-the-car",
              "qs-p163-in-the-meeting-room",
              "qs-p163-in-the-summer"
            ]
          }
        },
        {
          "id": "link-on",
          "text": "on",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-on-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~에, ~위에 (날짜·표면)",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "on Christmas: 크리스마스에. 교재에 제시된 표현은 on Christmas예요. holiday 표현에는 문맥에 따라 다른 전치사도 가능해요.",
          "examples": [
            "The workshop begins on November 11.",
            "The sales office is on the second floor."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 163,
            "pdfPage": 164,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "on Christmas",
            "unit": "qs-p163-on-christmas",
            "target": "qs-p163-on-christmas",
            "pages": [
              163
            ],
            "id": "qs-p163-on-christmas",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "on Christmas",
                "unit": "qs-p163-on-christmas",
                "target": "qs-p163-on-christmas",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "on November 11",
                "unit": "qs-p163-on-november-11",
                "target": "qs-p163-on-november-11",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "on the second floor",
                "unit": "qs-p163-on-the-second-floor",
                "target": "qs-p163-on-the-second-floor",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "on the shelf",
                "unit": "qs-p163-on-the-shelf",
                "target": "qs-p163-on-the-shelf",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "on the table",
                "unit": "qs-p163-on-the-table",
                "target": "qs-p163-on-the-table",
                "pages": [
                  163,
                  164
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "on the weekend",
                "unit": "qs-p163-on-the-weekend",
                "target": "qs-p163-on-the-weekend",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "link-prepositions",
                "section": "전치사와 접속사 비교",
                "headword": "on/upon + noun",
                "unit": "qs-p166-on-upon-noun",
                "target": "qs-p166-on-upon-noun",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p163-on-christmas",
              "qs-p163-on-november-11",
              "qs-p163-on-the-second-floor",
              "qs-p163-on-the-shelf",
              "qs-p163-on-the-table",
              "qs-p163-on-the-weekend",
              "qs-p166-on-upon-noun"
            ]
          }
        },
        {
          "id": "link-throughout",
          "text": "throughout",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-throughout-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~내내, ~곳곳에",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "throughout the meeting: 회의 내내. throughout the meeting은 회의 내내라는 뜻이에요.",
          "examples": [
            "throughout : ~내내, ~곳곳에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 163,
            "pdfPage": 164,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "throughout the meeting",
            "unit": "qs-p163-throughout-the-meeting",
            "target": "qs-p163-throughout-the-meeting",
            "pages": [
              163
            ],
            "id": "qs-p163-throughout-the-meeting",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "throughout the meeting",
                "unit": "qs-p163-throughout-the-meeting",
                "target": "qs-p163-throughout-the-meeting",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "throughout the world",
                "unit": "qs-p163-throughout-the-world",
                "target": "qs-p163-throughout-the-world",
                "pages": [
                  163
                ]
              }
            ],
            "sourceIds": [
              "qs-p163-throughout-the-meeting",
              "qs-p163-throughout-the-world"
            ]
          }
        },
        {
          "id": "link-within",
          "text": "within",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-within-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~이내에",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "within two weeks: 2주 이내에. within + 기간은 그 기간 이내에라는 뜻이에요.",
          "examples": [
            "within : ~이내에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 163,
            "pdfPage": 164,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "within two weeks",
            "unit": "qs-p163-within-two-weeks",
            "target": "qs-p163-within-two-weeks",
            "pages": [
              163
            ],
            "id": "qs-p163-within-two-weeks",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "within two weeks",
                "unit": "qs-p163-within-two-weeks",
                "target": "qs-p163-within-two-weeks",
                "pages": [
                  163
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 163,
                "pdfPage": 164,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "within walking distance",
                "unit": "qs-p163-within-walking-distance",
                "target": "qs-p163-within-walking-distance",
                "pages": [
                  163
                ]
              }
            ],
            "sourceIds": [
              "qs-p163-within-two-weeks",
              "qs-p163-within-walking-distance"
            ]
          }
        },
        {
          "id": "link-above",
          "text": "above",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-above-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 위에 (떨어져)",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "above: ~ 위에 (떨어져). above는 기준보다 위쪽에 있다는 뜻이에요.",
          "examples": [
            "above : ~ 위에 (떨어져)"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "above",
            "unit": "qs-p164-above",
            "target": "qs-p164-above",
            "pages": [
              164
            ],
            "id": "qs-p164-above",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "above",
                "unit": "qs-p164-above",
                "target": "qs-p164-above",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-above"
            ]
          }
        },
        {
          "id": "link-along",
          "text": "along",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-along-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~을 따라",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "along: ~을 따라. along은 길이나 강 등을 따라라는 뜻이에요.",
          "examples": [
            "along : ~을 따라"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "along",
            "unit": "qs-p164-along",
            "target": "qs-p164-along",
            "pages": [
              164
            ],
            "id": "qs-p164-along",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "along",
                "unit": "qs-p164-along",
                "target": "qs-p164-along",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-along"
            ]
          }
        },
        {
          "id": "link-among",
          "text": "among",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-among-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 사이에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "among: ~ 사이에. among은 여러 대상들 사이에 있다는 관계를 나타내요.",
          "examples": [
            "among : ~ 사이에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "among",
            "unit": "qs-p164-among",
            "target": "qs-p164-among",
            "pages": [
              164
            ],
            "id": "qs-p164-among",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "among",
                "unit": "qs-p164-among",
                "target": "qs-p164-among",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-among"
            ]
          }
        },
        {
          "id": "link-behind",
          "text": "behind",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-behind-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 뒤에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "behind: ~ 뒤에. behind는 ~ 뒤에라는 뜻이에요.",
          "examples": [
            "behind : ~ 뒤에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "behind",
            "unit": "qs-p164-behind",
            "target": "qs-p164-behind",
            "pages": [
              164
            ],
            "id": "qs-p164-behind",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "behind",
                "unit": "qs-p164-behind",
                "target": "qs-p164-behind",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-behind"
            ]
          }
        },
        {
          "id": "link-beneath",
          "text": "beneath",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-beneath-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 아래에",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "beneath: ~ 아래에. beneath는 ~ 아래에라는 뜻이에요.",
          "examples": [
            "beneath : ~ 아래에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "beneath",
            "unit": "qs-p164-beneath",
            "target": "qs-p164-beneath",
            "pages": [
              164
            ],
            "id": "qs-p164-beneath",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "beneath",
                "unit": "qs-p164-beneath",
                "target": "qs-p164-beneath",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-beneath"
            ]
          }
        },
        {
          "id": "link-between",
          "text": "between",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-between-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 사이에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "between: ~ 사이에. between A and B는 A와 B 사이를 나타내요.",
          "examples": [
            "The route runs between Boston and New York."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "between",
            "unit": "qs-p164-between",
            "target": "qs-p164-between",
            "pages": [
              164
            ],
            "id": "qs-p164-between",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "between",
                "unit": "qs-p164-between",
                "target": "qs-p164-between",
                "pages": [
                  164
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "장소·시간 전치사",
                "headword": "between + plural noun",
                "unit": "qs-p164-between-plural-noun",
                "target": "qs-p164-between-plural-noun",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-between",
              "qs-p164-between-plural-noun"
            ]
          }
        },
        {
          "id": "link-by",
          "text": "by",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-by-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~옆에 / ~까지 완료",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "by / beside / next to: ~ 옆에. 여기서 by는 ~ 옆에라는 위치를 나타내요. beside, next to도 옆이라는 관계를 나타내요.",
          "examples": [
            "by : ~옆에 / ~까지 완료"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "by / beside / next to",
            "unit": "qs-p164-by-beside-next-to",
            "target": "qs-p164-by-beside-next-to",
            "pages": [
              164
            ],
            "id": "qs-p164-by-beside-next-to",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "by / beside / next to",
                "unit": "qs-p164-by-beside-next-to",
                "target": "qs-p164-by-beside-next-to",
                "pages": [
                  164
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "by + deadline",
                "unit": "qs-p164-by-deadline",
                "target": "qs-p164-by-deadline",
                "pages": [
                  164,
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-by-beside-next-to",
              "qs-p164-by-deadline"
            ]
          }
        },
        {
          "id": "link-beside",
          "text": "beside",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-beside-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "~ 옆에"
              ],
              "answer": 3
            }
          ],
          "note": "by / beside / next to: ~ 옆에. 여기서 by는 ~ 옆에라는 위치를 나타내요. beside, next to도 옆이라는 관계를 나타내요.",
          "examples": [
            "beside : ~ 옆에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "by / beside / next to",
            "unit": "qs-p164-by-beside-next-to",
            "target": "qs-p164-by-beside-next-to",
            "pages": [
              164
            ],
            "id": "qs-p164-by-beside-next-to",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "by / beside / next to",
                "unit": "qs-p164-by-beside-next-to",
                "target": "qs-p164-by-beside-next-to",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-by-beside-next-to"
            ]
          }
        },
        {
          "id": "link-next-to",
          "text": "next to",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-next-to-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 옆에",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "by / beside / next to: ~ 옆에. 여기서 by는 ~ 옆에라는 위치를 나타내요. beside, next to도 옆이라는 관계를 나타내요.",
          "examples": [
            "next to : ~ 옆에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "by / beside / next to",
            "unit": "qs-p164-by-beside-next-to",
            "target": "qs-p164-by-beside-next-to",
            "pages": [
              164
            ],
            "id": "qs-p164-by-beside-next-to",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "by / beside / next to",
                "unit": "qs-p164-by-beside-next-to",
                "target": "qs-p164-by-beside-next-to",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-by-beside-next-to"
            ]
          }
        },
        {
          "id": "link-during",
          "text": "during",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-during-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 동안",
                "~ 전에",
                "~ 후에",
                "~ 때문에"
              ],
              "answer": 0
            }
          ],
          "note": "during + event: ~ 동안. 특정 행사나 시간 구간 안에서라는 뜻은 during the workshop이에요.",
          "examples": [
            "during : ~ 동안"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "during + event",
            "unit": "qs-p164-during-event",
            "target": "qs-p164-during-event",
            "pages": [
              164,
              166
            ],
            "id": "qs-p164-during-event",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "during + event",
                "unit": "qs-p164-during-event",
                "target": "qs-p164-during-event",
                "pages": [
                  164,
                  166
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "during the past three months",
                "unit": "qs-p164-during-the-past-three-months",
                "target": "qs-p164-during-the-past-three-months",
                "pages": [
                  164
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "link-prepositions",
                "section": "전치사 + -ing 주의",
                "headword": "during + event noun",
                "unit": "qs-p167-during-event-noun",
                "target": "qs-p167-during-event-noun",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-during-event",
              "qs-p164-during-the-past-three-months",
              "qs-p167-during-event-noun"
            ]
          }
        },
        {
          "id": "link-for",
          "text": "for",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-for-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "~ 때문에"
              ],
              "answer": 2
            }
          ],
          "note": "for + period: ~ 동안. 기간의 길이 seven days를 for로 연결해요.",
          "examples": [
            "She will stay here for seven days."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "for + period",
            "unit": "qs-p164-for-period",
            "target": "qs-p164-for-period",
            "pages": [
              164
            ],
            "id": "qs-p164-for-period",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "for + period",
                "unit": "qs-p164-for-period",
                "target": "qs-p164-for-period",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-for-period"
            ]
          }
        },
        {
          "id": "link-in-front-of",
          "text": "in front of",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-in-front-of-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 앞에",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "in front of: ~ 앞에. in front of는 ~ 앞에라는 뜻이에요.",
          "examples": [
            "in front of : ~ 앞에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "in front of",
            "unit": "qs-p164-in-front-of",
            "target": "qs-p164-in-front-of",
            "pages": [
              164
            ],
            "id": "qs-p164-in-front-of",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "in front of",
                "unit": "qs-p164-in-front-of",
                "target": "qs-p164-in-front-of",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-in-front-of"
            ]
          }
        },
        {
          "id": "link-into",
          "text": "into",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-into-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 안으로",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "into: ~ 안으로. into는 내부로 들어가는 이동을 나타내요.",
          "examples": [
            "into : ~ 안으로"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "into",
            "unit": "qs-p164-into",
            "target": "qs-p164-into",
            "pages": [
              164
            ],
            "id": "qs-p164-into",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "into",
                "unit": "qs-p164-into",
                "target": "qs-p164-into",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-into"
            ]
          }
        },
        {
          "id": "link-near",
          "text": "near",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-near-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 근처에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "near: ~ 근처에. near는 ~ 근처에라는 뜻이에요.",
          "examples": [
            "near : ~ 근처에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "near",
            "unit": "qs-p164-near",
            "target": "qs-p164-near",
            "pages": [
              164
            ],
            "id": "qs-p164-near",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "near",
                "unit": "qs-p164-near",
                "target": "qs-p164-near",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-near"
            ]
          }
        },
        {
          "id": "link-opposite",
          "text": "opposite",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-opposite-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 맞은편에",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "opposite / across from: ~ 맞은편에. opposite와 across from은 맞은편이라는 위치 관계를 나타내요.",
          "examples": [
            "opposite : ~ 맞은편에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "opposite / across from",
            "unit": "qs-p164-opposite-across-from",
            "target": "qs-p164-opposite-across-from",
            "pages": [
              164
            ],
            "id": "qs-p164-opposite-across-from",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "opposite / across from",
                "unit": "qs-p164-opposite-across-from",
                "target": "qs-p164-opposite-across-from",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-opposite-across-from"
            ]
          }
        },
        {
          "id": "link-across-from",
          "text": "across from",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-across-from-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "~ 맞은편에"
              ],
              "answer": 3
            }
          ],
          "note": "opposite / across from: ~ 맞은편에. opposite와 across from은 맞은편이라는 위치 관계를 나타내요.",
          "examples": [
            "across from : ~ 맞은편에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "opposite / across from",
            "unit": "qs-p164-opposite-across-from",
            "target": "qs-p164-opposite-across-from",
            "pages": [
              164
            ],
            "id": "qs-p164-opposite-across-from",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "opposite / across from",
                "unit": "qs-p164-opposite-across-from",
                "target": "qs-p164-opposite-across-from",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-opposite-across-from"
            ]
          }
        },
        {
          "id": "link-past",
          "text": "past",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-past-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "~을 지나"
              ],
              "answer": 3
            }
          ],
          "note": "past: ~을 지나. past는 ~을 지나라는 이동 관계를 나타내요.",
          "examples": [
            "past : ~을 지나"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "past",
            "unit": "qs-p164-past",
            "target": "qs-p164-past",
            "pages": [
              164
            ],
            "id": "qs-p164-past",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "past",
                "unit": "qs-p164-past",
                "target": "qs-p164-past",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-past"
            ]
          }
        },
        {
          "id": "link-to",
          "text": "to",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-to-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~로",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "to: ~로. to는 이동의 목적지를 나타낼 수 있어요.",
          "examples": [
            "to : ~로"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "to",
            "unit": "qs-p164-to",
            "target": "qs-p164-to",
            "pages": [
              164
            ],
            "id": "qs-p164-to",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "to",
                "unit": "qs-p164-to",
                "target": "qs-p164-to",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-to"
            ]
          }
        },
        {
          "id": "link-toward",
          "text": "toward",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-toward-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 쪽으로",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "toward: ~ 쪽으로. toward는 ~ 쪽으로라는 방향을 나타내요.",
          "examples": [
            "toward : ~ 쪽으로"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "toward",
            "unit": "qs-p164-toward",
            "target": "qs-p164-toward",
            "pages": [
              164
            ],
            "id": "qs-p164-toward",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "toward",
                "unit": "qs-p164-toward",
                "target": "qs-p164-toward",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-toward"
            ]
          }
        },
        {
          "id": "link-under",
          "text": "under",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-under-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 아래에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "under: ~ 아래에. under는 ~ 아래에라는 뜻이에요.",
          "examples": [
            "under : ~ 아래에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 164,
            "pdfPage": 165,
            "scope": "link-prepositions",
            "section": "전치사",
            "headword": "under",
            "unit": "qs-p164-under",
            "target": "qs-p164-under",
            "pages": [
              164
            ],
            "id": "qs-p164-under",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 164,
                "pdfPage": 165,
                "scope": "link-prepositions",
                "section": "전치사",
                "headword": "under",
                "unit": "qs-p164-under",
                "target": "qs-p164-under",
                "pages": [
                  164
                ]
              }
            ],
            "sourceIds": [
              "qs-p164-under"
            ]
          }
        },
        {
          "id": "link-across",
          "text": "across",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-across-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~을 가로질러, ~ 건너편에",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "across (crossing): ~을 가로질러, ~ 건너편에. across는 한쪽에서 반대쪽으로 가로지르는 관계를 나타내요.",
          "examples": [
            "across : ~을 가로질러, ~ 건너편에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "across (crossing)",
            "unit": "qs-p165-across-crossing",
            "target": "qs-p165-across-crossing",
            "pages": [
              165
            ],
            "id": "qs-p165-across-crossing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "across (crossing)",
                "unit": "qs-p165-across-crossing",
                "target": "qs-p165-across-crossing",
                "pages": [
                  165
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "across (extent)",
                "unit": "qs-p165-across-extent",
                "target": "qs-p165-across-extent",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-across-crossing",
              "qs-p165-across-extent"
            ]
          }
        },
        {
          "id": "link-against",
          "text": "against",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-against-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~에 기대어 / ~에 반대하여 / ~을 위반하여",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "against (leaning): ~에 기대어. against는 접촉하여 ~에 기대어라는 뜻으로 쓰일 수 있어요.",
          "examples": [
            "against : ~에 기대어 / ~에 반대하여 / ~을 위반하여"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "against (leaning)",
            "unit": "qs-p165-against-leaning",
            "target": "qs-p165-against-leaning",
            "pages": [
              165
            ],
            "id": "qs-p165-against-leaning",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "against (leaning)",
                "unit": "qs-p165-against-leaning",
                "target": "qs-p165-against-leaning",
                "pages": [
                  165
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "against (opposition)",
                "unit": "qs-p165-against-opposition",
                "target": "qs-p165-against-opposition",
                "pages": [
                  165
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "against (violation)",
                "unit": "qs-p165-against-violation",
                "target": "qs-p165-against-violation",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-against-leaning",
              "qs-p165-against-opposition",
              "qs-p165-against-violation"
            ]
          }
        },
        {
          "id": "link-as",
          "text": "as",
          "correctBins": [
            "prep",
            "conj"
          ],
          "steps": [
            {
              "id": "link-as-prep",
              "label": "전치사 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "as + 명사",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "~로서"
              ],
              "answer": 3
            },
            {
              "id": "link-as-conj",
              "label": "접속사 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "expression": "as + S + V",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 때문에",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "as: ~로서. as + 역할 명사는 ~로서라는 뜻이에요. like는 ~처럼이라는 비교이므로 실제 역할을 나타내는 이 문맥과 달라요. / (conj) because / as / since / now that : ~ 때문에",
          "examples": [
            "as : ~로서"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "as",
            "unit": "qs-p165-as",
            "target": "qs-p165-as",
            "pages": [
              165
            ],
            "id": "qs-p165-as",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "as",
                "unit": "qs-p165-as",
                "target": "qs-p165-as",
                "pages": [
                  165
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "because / as / since / now that",
                "unit": "qs-p166-because-as-since-now-that",
                "target": "qs-p166-because-as-since-now-that",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-as",
              "qs-p166-because-as-since-now-that"
            ]
          }
        },
        {
          "id": "link-in-spite-of",
          "text": "in spite of",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-in-spite-of-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~에도 불구하고",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "despite / in spite of / notwithstanding: ~에도 불구하고. 빈칸 뒤가 명사구이고 양보 관계이므로 전치사 despite가 맞아요. in spite of, notwithstanding도 같은 양보 관계를 나타내요.",
          "examples": [
            "in spite of : ~에도 불구하고"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "despite / in spite of / notwithstanding",
            "unit": "qs-p165-despite-in-spite-of-notwithstanding",
            "target": "qs-p165-despite-in-spite-of-notwithstanding",
            "pages": [
              165
            ],
            "id": "qs-p165-despite-in-spite-of-notwithstanding",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "despite / in spite of / notwithstanding",
                "unit": "qs-p165-despite-in-spite-of-notwithstanding",
                "target": "qs-p165-despite-in-spite-of-notwithstanding",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-despite-in-spite-of-notwithstanding"
            ]
          }
        },
        {
          "id": "link-notwithstanding",
          "text": "notwithstanding",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-notwithstanding-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~에도 불구하고",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "despite / in spite of / notwithstanding: ~에도 불구하고. 빈칸 뒤가 명사구이고 양보 관계이므로 전치사 despite가 맞아요. in spite of, notwithstanding도 같은 양보 관계를 나타내요.",
          "examples": [
            "notwithstanding : ~에도 불구하고"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "despite / in spite of / notwithstanding",
            "unit": "qs-p165-despite-in-spite-of-notwithstanding",
            "target": "qs-p165-despite-in-spite-of-notwithstanding",
            "pages": [
              165
            ],
            "id": "qs-p165-despite-in-spite-of-notwithstanding",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "despite / in spite of / notwithstanding",
                "unit": "qs-p165-despite-in-spite-of-notwithstanding",
                "target": "qs-p165-despite-in-spite-of-notwithstanding",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-despite-in-spite-of-notwithstanding"
            ]
          }
        },
        {
          "id": "link-due-to",
          "text": "due to",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-due-to-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 때문에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "due to / because of / owing to: ~ 때문에. 빈칸 뒤가 명사구 the rain이므로 원인을 나타내는 전치사구 because of가 맞아요. due to, owing to도 원인 표현이에요.",
          "examples": [
            "due to : ~ 때문에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "due to / because of / owing to",
            "unit": "qs-p165-due-to-because-of-owing-to",
            "target": "qs-p165-due-to-because-of-owing-to",
            "pages": [
              165,
              166
            ],
            "id": "qs-p165-due-to-because-of-owing-to",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "due to / because of / owing to",
                "unit": "qs-p165-due-to-because-of-owing-to",
                "target": "qs-p165-due-to-because-of-owing-to",
                "pages": [
                  165,
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-due-to-because-of-owing-to"
            ]
          }
        },
        {
          "id": "link-owing-to",
          "text": "owing to",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-owing-to-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "~ 때문에"
              ],
              "answer": 3
            }
          ],
          "note": "due to / because of / owing to: ~ 때문에. 빈칸 뒤가 명사구 the rain이므로 원인을 나타내는 전치사구 because of가 맞아요. due to, owing to도 원인 표현이에요.",
          "examples": [
            "owing to : ~ 때문에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "due to / because of / owing to",
            "unit": "qs-p165-due-to-because-of-owing-to",
            "target": "qs-p165-due-to-because-of-owing-to",
            "pages": [
              165,
              166
            ],
            "id": "qs-p165-due-to-because-of-owing-to",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "due to / because of / owing to",
                "unit": "qs-p165-due-to-because-of-owing-to",
                "target": "qs-p165-due-to-because-of-owing-to",
                "pages": [
                  165,
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-due-to-because-of-owing-to"
            ]
          }
        },
        {
          "id": "link-except-for",
          "text": "except (for)",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-except-for-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~을 제외하고",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "except (for): ~을 제외하고. except는 ~을 제외하고라는 뜻이에요.",
          "examples": [
            "except (for) : ~을 제외하고"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "except (for)",
            "unit": "qs-p165-except-for",
            "target": "qs-p165-except-for",
            "pages": [
              165
            ],
            "id": "qs-p165-except-for",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "except (for)",
                "unit": "qs-p165-except-for",
                "target": "qs-p165-except-for",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-except-for"
            ]
          }
        },
        {
          "id": "link-following",
          "text": "following",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-following-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 후에, ~에 뒤이어",
                "~ 전에",
                "~ 동안",
                "~ 때문에"
              ],
              "answer": 0
            }
          ],
          "note": "following: ~ 후에, ~에 뒤이어. following + 명사는 ~ 후에라는 뜻이에요.",
          "examples": [
            "following : ~ 후에, ~에 뒤이어"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "following",
            "unit": "qs-p165-following",
            "target": "qs-p165-following",
            "pages": [
              165,
              166
            ],
            "id": "qs-p165-following",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "following",
                "unit": "qs-p165-following",
                "target": "qs-p165-following",
                "pages": [
                  165,
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-following"
            ]
          }
        },
        {
          "id": "link-from-a-to-b",
          "text": "from A to B",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-from-a-to-b-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "A부터 B까지",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "from A to B: A부터 B까지. from A to B는 범위의 시작과 끝을 나타내요.",
          "examples": [
            "The office is open from Monday to Friday."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "from A to B",
            "unit": "qs-p165-from-a-to-b",
            "target": "qs-p165-from-a-to-b",
            "pages": [
              165
            ],
            "id": "qs-p165-from-a-to-b",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "from A to B",
                "unit": "qs-p165-from-a-to-b",
                "target": "qs-p165-from-a-to-b",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-from-a-to-b"
            ]
          }
        },
        {
          "id": "link-in-addition-to",
          "text": "in addition to",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-in-addition-to-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "~ 이외에, ~에 더하여"
              ],
              "answer": 3
            }
          ],
          "note": "in addition to: ~ 이외에, ~에 더하여. in addition to는 기존 항목에 더하여라는 추가 관계예요.",
          "examples": [
            "in addition to : ~ 이외에, ~에 더하여"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "in addition to",
            "unit": "qs-p165-in-addition-to",
            "target": "qs-p165-in-addition-to",
            "pages": [
              165
            ],
            "id": "qs-p165-in-addition-to",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "in addition to",
                "unit": "qs-p165-in-addition-to",
                "target": "qs-p165-in-addition-to",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-in-addition-to"
            ]
          }
        },
        {
          "id": "link-in-advance-of",
          "text": "in advance of",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-in-advance-of-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 후에",
                "~ 동안",
                "~ 때문에",
                "~ 전에"
              ],
              "answer": 3
            }
          ],
          "note": "in advance of: ~ 전에. in advance of + 명사는 ~ 전에라는 뜻이에요.",
          "examples": [
            "in advance of : ~ 전에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "in advance of",
            "unit": "qs-p165-in-advance-of",
            "target": "qs-p165-in-advance-of",
            "pages": [
              165
            ],
            "id": "qs-p165-in-advance-of",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "in advance of",
                "unit": "qs-p165-in-advance-of",
                "target": "qs-p165-in-advance-of",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-in-advance-of"
            ]
          }
        },
        {
          "id": "link-instead-of",
          "text": "instead of",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-instead-of-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 대신에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "instead of: ~ 대신에. instead of는 다른 것을 선택하여 대체하는 관계예요.",
          "examples": [
            "instead of : ~ 대신에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "instead of",
            "unit": "qs-p165-instead-of",
            "target": "qs-p165-instead-of",
            "pages": [
              165
            ],
            "id": "qs-p165-instead-of",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "instead of",
                "unit": "qs-p165-instead-of",
                "target": "qs-p165-instead-of",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-instead-of"
            ]
          }
        },
        {
          "id": "link-on-behalf-of",
          "text": "on behalf of",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-on-behalf-of-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~을 대표하여",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "on behalf of: ~을 대표하여. on behalf of는 여기서 ~을 대표하여라는 뜻이에요.",
          "examples": [
            "on behalf of : ~을 대표하여"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "on behalf of",
            "unit": "qs-p165-on-behalf-of",
            "target": "qs-p165-on-behalf-of",
            "pages": [
              165
            ],
            "id": "qs-p165-on-behalf-of",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "on behalf of",
                "unit": "qs-p165-on-behalf-of",
                "target": "qs-p165-on-behalf-of",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-on-behalf-of"
            ]
          }
        },
        {
          "id": "link-other-than",
          "text": "other than",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-other-than-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 이외에, ~을 제외하고",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "other than: ~ 이외에, ~을 제외하고. 여기서 other than은 ~을 제외하고라는 예외 관계를 나타내요. 추가라는 뜻의 in addition to와 구별하세요.",
          "examples": [
            "other than : ~ 이외에, ~을 제외하고"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "other than",
            "unit": "qs-p165-other-than",
            "target": "qs-p165-other-than",
            "pages": [
              165
            ],
            "id": "qs-p165-other-than",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "other than",
                "unit": "qs-p165-other-than",
                "target": "qs-p165-other-than",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-other-than"
            ]
          }
        },
        {
          "id": "link-prior-to",
          "text": "prior to",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-prior-to-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 후에",
                "~ 동안",
                "~ 때문에",
                "~ 전에"
              ],
              "answer": 3
            }
          ],
          "note": "prior to: ~ 전에. prior to + 명사는 ~ 전에라는 뜻이에요.",
          "examples": [
            "prior to : ~ 전에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "prior to",
            "unit": "qs-p165-prior-to",
            "target": "qs-p165-prior-to",
            "pages": [
              165,
              166
            ],
            "id": "qs-p165-prior-to",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "prior to",
                "unit": "qs-p165-prior-to",
                "target": "qs-p165-prior-to",
                "pages": [
                  165,
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-prior-to"
            ]
          }
        },
        {
          "id": "link-regarding",
          "text": "regarding",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-regarding-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~에 관한",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "regarding / concerning / as to: ~에 관한. regarding은 ~에 관한이라는 뜻이며, 교재에서는 concerning, as to와 함께 정리해요.",
          "examples": [
            "regarding : ~에 관한"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "regarding / concerning / as to",
            "unit": "qs-p165-regarding-concerning-as-to",
            "target": "qs-p165-regarding-concerning-as-to",
            "pages": [
              165
            ],
            "id": "qs-p165-regarding-concerning-as-to",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "regarding / concerning / as to",
                "unit": "qs-p165-regarding-concerning-as-to",
                "target": "qs-p165-regarding-concerning-as-to",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-regarding-concerning-as-to"
            ]
          }
        },
        {
          "id": "link-concerning",
          "text": "concerning",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-concerning-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~에 관한",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "regarding / concerning / as to: ~에 관한. regarding은 ~에 관한이라는 뜻이며, 교재에서는 concerning, as to와 함께 정리해요.",
          "examples": [
            "concerning : ~에 관한"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "regarding / concerning / as to",
            "unit": "qs-p165-regarding-concerning-as-to",
            "target": "qs-p165-regarding-concerning-as-to",
            "pages": [
              165
            ],
            "id": "qs-p165-regarding-concerning-as-to",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "regarding / concerning / as to",
                "unit": "qs-p165-regarding-concerning-as-to",
                "target": "qs-p165-regarding-concerning-as-to",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-regarding-concerning-as-to"
            ]
          }
        },
        {
          "id": "link-as-to",
          "text": "as to",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-as-to-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "~에 관한"
              ],
              "answer": 3
            }
          ],
          "note": "regarding / concerning / as to: ~에 관한. regarding은 ~에 관한이라는 뜻이며, 교재에서는 concerning, as to와 함께 정리해요.",
          "examples": [
            "as to : ~에 관한"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "regarding / concerning / as to",
            "unit": "qs-p165-regarding-concerning-as-to",
            "target": "qs-p165-regarding-concerning-as-to",
            "pages": [
              165
            ],
            "id": "qs-p165-regarding-concerning-as-to",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "regarding / concerning / as to",
                "unit": "qs-p165-regarding-concerning-as-to",
                "target": "qs-p165-regarding-concerning-as-to",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-regarding-concerning-as-to"
            ]
          }
        },
        {
          "id": "link-regardless-of",
          "text": "regardless of",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-regardless-of-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~와 상관없이",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "regardless of: ~와 상관없이. regardless of는 ~와 상관없이, 관계없이예요.",
          "examples": [
            "regardless of : ~와 상관없이"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "regardless of",
            "unit": "qs-p165-regardless-of",
            "target": "qs-p165-regardless-of",
            "pages": [
              165
            ],
            "id": "qs-p165-regardless-of",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "regardless of",
                "unit": "qs-p165-regardless-of",
                "target": "qs-p165-regardless-of",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-regardless-of"
            ]
          }
        },
        {
          "id": "link-thanks-to",
          "text": "thanks to",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-thanks-to-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 덕분에, ~ 때문에",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "thanks to: ~ 덕분에, ~ 때문에. thanks to + 명사는 ~ 덕분에라는 원인을 나타내요.",
          "examples": [
            "thanks to : ~ 덕분에, ~ 때문에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "thanks to",
            "unit": "qs-p165-thanks-to",
            "target": "qs-p165-thanks-to",
            "pages": [
              165
            ],
            "id": "qs-p165-thanks-to",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "thanks to",
                "unit": "qs-p165-thanks-to",
                "target": "qs-p165-thanks-to",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-thanks-to"
            ]
          }
        },
        {
          "id": "link-through",
          "text": "through",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-through-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~내내 / ~을 통해",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "through (duration): ~ 내내, 줄곧. through는 시간 구간 내내 이어진다는 뜻으로도 쓰여요.",
          "examples": [
            "through : ~내내 / ~을 통해"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "through (duration)",
            "unit": "qs-p165-through-duration",
            "target": "qs-p165-through-duration",
            "pages": [
              165
            ],
            "id": "qs-p165-through-duration",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "through (duration)",
                "unit": "qs-p165-through-duration",
                "target": "qs-p165-through-duration",
                "pages": [
                  165
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "through (passage)",
                "unit": "qs-p165-through-passage",
                "target": "qs-p165-through-passage",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-through-duration",
              "qs-p165-through-passage"
            ]
          }
        },
        {
          "id": "link-with",
          "text": "with",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-with-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "~을 가진 / ~와 함께"
              ],
              "answer": 3
            }
          ],
          "note": "with (having): ~을 가진. 명사 뒤의 with + N은 ~을 가진이라는 의미를 나타낼 수 있어요.",
          "examples": [
            "with : ~을 가진 / ~와 함께"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "with (having)",
            "unit": "qs-p165-with-having",
            "target": "qs-p165-with-having",
            "pages": [
              165
            ],
            "id": "qs-p165-with-having",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "with (having)",
                "unit": "qs-p165-with-having",
                "target": "qs-p165-with-having",
                "pages": [
                  165
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "with (together)",
                "unit": "qs-p165-with-together",
                "target": "qs-p165-with-together",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-with-having",
              "qs-p165-with-together"
            ]
          }
        },
        {
          "id": "link-without",
          "text": "without",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-without-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "~ 없이"
              ],
              "answer": 3
            }
          ],
          "note": "without: ~ 없이. without + 명사는 ~ 없이라는 뜻이에요.",
          "examples": [
            "without : ~ 없이"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 165,
            "pdfPage": 166,
            "scope": "link-prepositions",
            "section": "그 밖의 전치사·전치사구",
            "headword": "without",
            "unit": "qs-p165-without",
            "target": "qs-p165-without",
            "pages": [
              165
            ],
            "id": "qs-p165-without",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 165,
                "pdfPage": 166,
                "scope": "link-prepositions",
                "section": "그 밖의 전치사·전치사구",
                "headword": "without",
                "unit": "qs-p165-without",
                "target": "qs-p165-without",
                "pages": [
                  165
                ]
              }
            ],
            "sourceIds": [
              "qs-p165-without"
            ]
          }
        },
        {
          "id": "link-and",
          "text": "and",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-and-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "그리고",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "and: 그리고. and는 단어·구·절을 나란히 이어 추가해요.",
          "examples": [
            "and : 그리고"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 166,
            "pdfPage": 167,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "and",
            "unit": "qs-p166-and",
            "target": "qs-p166-and",
            "pages": [
              166
            ],
            "id": "qs-p166-and",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "and",
                "unit": "qs-p166-and",
                "target": "qs-p166-and",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-and"
            ]
          }
        },
        {
          "id": "link-as-soon-as",
          "text": "as soon as",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-as-soon-as-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~하자마자",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "as soon as + clause: ~하자마자. as soon as는 ~하자마자라는 접속사 표현이며 뒤에 절이 와요.",
          "examples": [
            "as soon as : ~하자마자"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 166,
            "pdfPage": 167,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "as soon as + clause",
            "unit": "qs-p166-as-soon-as-clause",
            "target": "qs-p166-as-soon-as-clause",
            "pages": [
              166
            ],
            "id": "qs-p166-as-soon-as-clause",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "as soon as + clause",
                "unit": "qs-p166-as-soon-as-clause",
                "target": "qs-p166-as-soon-as-clause",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-as-soon-as-clause"
            ]
          }
        },
        {
          "id": "link-as-well-as",
          "text": "as well as",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-as-well-as-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "A뿐만 아니라 B도",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "B as well as A: A뿐만 아니라 B도. B as well as A는 A뿐만 아니라 B도라는 뜻이에요.",
          "examples": [
            "as well as : A뿐만 아니라 B도"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 166,
            "pdfPage": 167,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "B as well as A",
            "unit": "qs-p166-b-as-well-as-a",
            "target": "qs-p166-b-as-well-as-a",
            "pages": [
              166
            ],
            "id": "qs-p166-b-as-well-as-a",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "B as well as A",
                "unit": "qs-p166-b-as-well-as-a",
                "target": "qs-p166-b-as-well-as-a",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-b-as-well-as-a"
            ]
          }
        },
        {
          "id": "link-because",
          "text": "because",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-because-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "~ 때문에"
              ],
              "answer": 3
            }
          ],
          "note": "because / as / since / now that: ~ 때문에. 뒤가 주어와 동사가 있는 절이므로 원인을 나타내는 접속사 because가 필요해요. as, since, now that도 문맥에 따라 이유를 이끌 수 있어요.",
          "examples": [
            "because : ~ 때문에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 166,
            "pdfPage": 167,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "because / as / since / now that",
            "unit": "qs-p166-because-as-since-now-that",
            "target": "qs-p166-because-as-since-now-that",
            "pages": [
              166
            ],
            "id": "qs-p166-because-as-since-now-that",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "because / as / since / now that",
                "unit": "qs-p166-because-as-since-now-that",
                "target": "qs-p166-because-as-since-now-that",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-because-as-since-now-that"
            ]
          }
        },
        {
          "id": "link-both-a-and-b",
          "text": "both A and B",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-both-a-and-b-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "A와 B 둘 다",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "both A and B: A와 B 둘 다. both A and B는 A와 B 둘 다라는 상관접속사 구조예요.",
          "examples": [
            "Both the manager and the assistant will attend."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 166,
            "pdfPage": 167,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "both A and B",
            "unit": "qs-p166-both-a-and-b",
            "target": "qs-p166-both-a-and-b",
            "pages": [
              166
            ],
            "id": "qs-p166-both-a-and-b",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "both A and B",
                "unit": "qs-p166-both-a-and-b",
                "target": "qs-p166-both-a-and-b",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-both-a-and-b"
            ]
          }
        },
        {
          "id": "link-but",
          "text": "but",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-but-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "그러나",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "but: 그러나. but는 서로 대조되는 내용을 연결해요.",
          "examples": [
            "but : 그러나"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 166,
            "pdfPage": 167,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "but",
            "unit": "qs-p166-but",
            "target": "qs-p166-but",
            "pages": [
              166
            ],
            "id": "qs-p166-but",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "but",
                "unit": "qs-p166-but",
                "target": "qs-p166-but",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-but"
            ]
          }
        },
        {
          "id": "link-either-a-or-b",
          "text": "either A or B",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-either-a-or-b-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "A와 B 둘 중 하나"
              ],
              "answer": 3
            }
          ],
          "note": "either A or B: A와 B 둘 중 하나. either A or B는 둘 중 하나라는 구조예요.",
          "examples": [
            "You may choose either the morning or the afternoon session."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 166,
            "pdfPage": 167,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "either A or B",
            "unit": "qs-p166-either-a-or-b",
            "target": "qs-p166-either-a-or-b",
            "pages": [
              166
            ],
            "id": "qs-p166-either-a-or-b",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "either A or B",
                "unit": "qs-p166-either-a-or-b",
                "target": "qs-p166-either-a-or-b",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-either-a-or-b"
            ]
          }
        },
        {
          "id": "link-neither-a-nor-b",
          "text": "neither A nor B",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-neither-a-nor-b-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "A와 B 둘 다 아닌"
              ],
              "answer": 3
            }
          ],
          "note": "neither A nor B: A와 B 둘 다 아닌. neither A nor B는 둘 다 아니라는 구조예요.",
          "examples": [
            "Neither the printer nor the scanner is working."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 166,
            "pdfPage": 167,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "neither A nor B",
            "unit": "qs-p166-neither-a-nor-b",
            "target": "qs-p166-neither-a-nor-b",
            "pages": [
              166
            ],
            "id": "qs-p166-neither-a-nor-b",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "neither A nor B",
                "unit": "qs-p166-neither-a-nor-b",
                "target": "qs-p166-neither-a-nor-b",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-neither-a-nor-b"
            ]
          }
        },
        {
          "id": "link-not-only-a-but-also-b",
          "text": "not only A but also B",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-not-only-a-but-also-b-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "A뿐만 아니라 B도",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "not only A but also B: A뿐만 아니라 B도. not only A but also B는 A뿐만 아니라 B도라는 추가 구조예요.",
          "examples": [
            "The service includes not only delivery but also installation."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 166,
            "pdfPage": 167,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "not only A but also B",
            "unit": "qs-p166-not-only-a-but-also-b",
            "target": "qs-p166-not-only-a-but-also-b",
            "pages": [
              166
            ],
            "id": "qs-p166-not-only-a-but-also-b",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "not only A but also B",
                "unit": "qs-p166-not-only-a-but-also-b",
                "target": "qs-p166-not-only-a-but-also-b",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-not-only-a-but-also-b"
            ]
          }
        },
        {
          "id": "link-upon",
          "text": "upon",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-upon-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~하자마자, ~한 즉시",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "on/upon + noun: ~하자마자, ~한 즉시. upon은 명사 arrival 앞에서 도착하자마자라는 뜻을 나타내요. as soon as는 이 쓰임에서 절을 받아요.",
          "examples": [
            "upon : ~하자마자, ~한 즉시"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 166,
            "pdfPage": 167,
            "scope": "link-prepositions",
            "section": "전치사와 접속사 비교",
            "headword": "on/upon + noun",
            "unit": "qs-p166-on-upon-noun",
            "target": "qs-p166-on-upon-noun",
            "pages": [
              166
            ],
            "id": "qs-p166-on-upon-noun",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "link-prepositions",
                "section": "전치사와 접속사 비교",
                "headword": "on/upon + noun",
                "unit": "qs-p166-on-upon-noun",
                "target": "qs-p166-on-upon-noun",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-on-upon-noun"
            ]
          }
        },
        {
          "id": "link-or",
          "text": "or",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-or-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "또는",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "or: 또는. or는 선택할 대안을 연결해요.",
          "examples": [
            "or : 또는"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 166,
            "pdfPage": 167,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "or",
            "unit": "qs-p166-or",
            "target": "qs-p166-or",
            "pages": [
              166
            ],
            "id": "qs-p166-or",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "or",
                "unit": "qs-p166-or",
                "target": "qs-p166-or",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-or"
            ]
          }
        },
        {
          "id": "link-while",
          "text": "while",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-while-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 동안",
                "~ 전에",
                "~ 후에",
                "~ 때문에"
              ],
              "answer": 0
            }
          ],
          "note": "while + clause (time): ~ 동안. 뒤가 주어 the staff와 동사 are가 있는 절이므로 접속사 While이 필요해요.",
          "examples": [
            "While the staff are meeting, please wait outside."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 166,
            "pdfPage": 167,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "while + clause (time)",
            "unit": "qs-p166-while-clause-time",
            "target": "qs-p166-while-clause-time",
            "pages": [
              166
            ],
            "id": "qs-p166-while-clause-time",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "while + clause (time)",
                "unit": "qs-p166-while-clause-time",
                "target": "qs-p166-while-clause-time",
                "pages": [
                  166
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "whereas / while (contrast)",
                "unit": "qs-p167-whereas-while-contrast",
                "target": "qs-p167-whereas-while-contrast",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-while-clause-time",
              "qs-p167-whereas-while-contrast"
            ]
          }
        },
        {
          "id": "link-though",
          "text": "though",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-though-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~에도 불구하고",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "although / though / even though: ~에도 불구하고. 뒤에 it was raining이라는 절이 있으므로 양보 접속사 Although가 맞아요.",
          "examples": [
            "though : ~에도 불구하고"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "although / though / even though",
            "unit": "qs-p167-although-though-even-though",
            "target": "qs-p167-although-though-even-though",
            "pages": [
              167
            ],
            "id": "qs-p167-although-though-even-though",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "although / though / even though",
                "unit": "qs-p167-although-though-even-though",
                "target": "qs-p167-although-though-even-though",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-although-though-even-though"
            ]
          }
        },
        {
          "id": "link-even-though",
          "text": "even though",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-even-though-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~에도 불구하고",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "although / though / even though: ~에도 불구하고. 뒤에 it was raining이라는 절이 있으므로 양보 접속사 Although가 맞아요.",
          "examples": [
            "even though : ~에도 불구하고"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "although / though / even though",
            "unit": "qs-p167-although-though-even-though",
            "target": "qs-p167-although-though-even-though",
            "pages": [
              167
            ],
            "id": "qs-p167-although-though-even-though",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "although / though / even though",
                "unit": "qs-p167-although-though-even-though",
                "target": "qs-p167-although-though-even-though",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-although-though-even-though"
            ]
          }
        },
        {
          "id": "link-as-if",
          "text": "as if",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-as-if-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "마치 ~인 것처럼"
              ],
              "answer": 3
            }
          ],
          "note": "as if / as though: 마치 ~인 것처럼. as if, as though는 마치 ~인 것처럼이라는 뜻이에요.",
          "examples": [
            "as if : 마치 ~인 것처럼"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "as if / as though",
            "unit": "qs-p167-as-if-as-though",
            "target": "qs-p167-as-if-as-though",
            "pages": [
              167
            ],
            "id": "qs-p167-as-if-as-though",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "as if / as though",
                "unit": "qs-p167-as-if-as-though",
                "target": "qs-p167-as-if-as-though",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-as-if-as-though"
            ]
          }
        },
        {
          "id": "link-as-though",
          "text": "as though",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-as-though-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "마치 ~인 것처럼"
              ],
              "answer": 3
            }
          ],
          "note": "as if / as though: 마치 ~인 것처럼. as if, as though는 마치 ~인 것처럼이라는 뜻이에요.",
          "examples": [
            "as though : 마치 ~인 것처럼"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "as if / as though",
            "unit": "qs-p167-as-if-as-though",
            "target": "qs-p167-as-if-as-though",
            "pages": [
              167
            ],
            "id": "qs-p167-as-if-as-though",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "as if / as though",
                "unit": "qs-p167-as-if-as-though",
                "target": "qs-p167-as-if-as-though",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-as-if-as-though"
            ]
          }
        },
        {
          "id": "link-as-long-as",
          "text": "as long as",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-as-long-as-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~하는 한, ~하기만 하면",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "as long as / so long as: ~하는 한, ~하기만 하면. as long as, so long as는 ~하는 한이라는 조건을 나타내요.",
          "examples": [
            "as long as : ~하는 한, ~하기만 하면"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "as long as / so long as",
            "unit": "qs-p167-as-long-as-so-long-as",
            "target": "qs-p167-as-long-as-so-long-as",
            "pages": [
              167
            ],
            "id": "qs-p167-as-long-as-so-long-as",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "as long as / so long as",
                "unit": "qs-p167-as-long-as-so-long-as",
                "target": "qs-p167-as-long-as-so-long-as",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-as-long-as-so-long-as"
            ]
          }
        },
        {
          "id": "link-so-long-as",
          "text": "so long as",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-so-long-as-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "~하는 한, ~하기만 하면"
              ],
              "answer": 3
            }
          ],
          "note": "as long as / so long as: ~하는 한, ~하기만 하면. as long as, so long as는 ~하는 한이라는 조건을 나타내요.",
          "examples": [
            "so long as : ~하는 한, ~하기만 하면"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "as long as / so long as",
            "unit": "qs-p167-as-long-as-so-long-as",
            "target": "qs-p167-as-long-as-so-long-as",
            "pages": [
              167
            ],
            "id": "qs-p167-as-long-as-so-long-as",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "as long as / so long as",
                "unit": "qs-p167-as-long-as-so-long-as",
                "target": "qs-p167-as-long-as-so-long-as",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-as-long-as-so-long-as"
            ]
          }
        },
        {
          "id": "link-even-if",
          "text": "even if",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-even-if-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "설령 ~하더라도",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "even if: 설령 ~하더라도. even if는 가정한 조건에서도 결과가 같다는 양보 조건을 나타내요. 이미 확인된 사실을 말하는 even though와 구별할 수 있어요.",
          "examples": [
            "even if : 설령 ~하더라도"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "even if",
            "unit": "qs-p167-even-if",
            "target": "qs-p167-even-if",
            "pages": [
              167
            ],
            "id": "qs-p167-even-if",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "even if",
                "unit": "qs-p167-even-if",
                "target": "qs-p167-even-if",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-even-if"
            ]
          }
        },
        {
          "id": "link-given",
          "text": "given",
          "correctBins": [
            "prep",
            "conj"
          ],
          "steps": [
            {
              "id": "link-given-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~을 고려하여, 감안하면",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "given + noun: ~을 고려하여, 감안하면. given은 여기서 전치사처럼 명사구 the high cost를 받아 ~을 고려하면이라는 뜻을 나타내요. / (conj) given that : ~을 고려하면, 감안하면",
          "examples": [
            "given : ~을 고려하여, 감안하면"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "link-prepositions",
            "section": "전치사와 접속사 비교",
            "headword": "given + noun",
            "unit": "qs-p167-given-noun",
            "target": "qs-p167-given-noun",
            "pages": [
              167
            ],
            "id": "qs-p167-given-noun",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "link-prepositions",
                "section": "전치사와 접속사 비교",
                "headword": "given + noun",
                "unit": "qs-p167-given-noun",
                "target": "qs-p167-given-noun",
                "pages": [
                  167
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "given that",
                "unit": "qs-p167-given-that",
                "target": "qs-p167-given-that",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-given-noun",
              "qs-p167-given-that"
            ]
          }
        },
        {
          "id": "link-if",
          "text": "if",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-if-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~라면",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "if / provided (that): ~라면. if와 provided (that)은 조건을 이끄는 접속사예요.",
          "examples": [
            "if : ~라면"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "if / provided (that)",
            "unit": "qs-p167-if-provided-that",
            "target": "qs-p167-if-provided-that",
            "pages": [
              167
            ],
            "id": "qs-p167-if-provided-that",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "if / provided (that)",
                "unit": "qs-p167-if-provided-that",
                "target": "qs-p167-if-provided-that",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-if-provided-that"
            ]
          }
        },
        {
          "id": "link-provided-that",
          "text": "provided (that)",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-provided-that-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~라면",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "if / provided (that): ~라면. if와 provided (that)은 조건을 이끄는 접속사예요.",
          "examples": [
            "provided (that) : ~라면"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "if / provided (that)",
            "unit": "qs-p167-if-provided-that",
            "target": "qs-p167-if-provided-that",
            "pages": [
              167
            ],
            "id": "qs-p167-if-provided-that",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "if / provided (that)",
                "unit": "qs-p167-if-provided-that",
                "target": "qs-p167-if-provided-that",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-if-provided-that"
            ]
          }
        },
        {
          "id": "link-in-case-of",
          "text": "in case of",
          "correctBins": [
            "prep"
          ],
          "steps": [
            {
              "id": "link-in-case-of-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~의 경우에 대비하여",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "in case of + noun: ~의 경우에 대비하여. 빈칸 뒤가 명사구 an emergency이므로 in case of가 맞아요.",
          "examples": [
            "In case of an emergency, use the stairs."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "link-prepositions",
            "section": "전치사와 접속사 비교",
            "headword": "in case of + noun",
            "unit": "qs-p167-in-case-of-noun",
            "target": "qs-p167-in-case-of-noun",
            "pages": [
              167
            ],
            "id": "qs-p167-in-case-of-noun",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "link-prepositions",
                "section": "전치사와 접속사 비교",
                "headword": "in case of + noun",
                "unit": "qs-p167-in-case-of-noun",
                "target": "qs-p167-in-case-of-noun",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-in-case-of-noun"
            ]
          }
        },
        {
          "id": "link-in-case-that",
          "text": "in case (that)",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-in-case-that-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~의 경우에 대비하여",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "in case (that): ~의 경우에 대비하여. in case 뒤에는 주어와 동사가 있는 절이 와요. in case of 뒤에는 명사가 와요.",
          "examples": [
            "in case (that) : ~의 경우에 대비하여"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "in case (that)",
            "unit": "qs-p167-in-case-that",
            "target": "qs-p167-in-case-that",
            "pages": [
              167
            ],
            "id": "qs-p167-in-case-that",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "in case (that)",
                "unit": "qs-p167-in-case-that",
                "target": "qs-p167-in-case-that",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-in-case-that"
            ]
          }
        },
        {
          "id": "link-so-that",
          "text": "so that",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-so-that-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "~할 수 있도록"
              ],
              "answer": 3
            }
          ],
          "note": "so that / in order that: ~할 수 있도록. so that, in order that은 절을 이끌어 ~할 수 있도록이라는 목적을 나타내요.",
          "examples": [
            "so that : ~할 수 있도록"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "so that / in order that",
            "unit": "qs-p167-so-that-in-order-that",
            "target": "qs-p167-so-that-in-order-that",
            "pages": [
              167
            ],
            "id": "qs-p167-so-that-in-order-that",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "so that / in order that",
                "unit": "qs-p167-so-that-in-order-that",
                "target": "qs-p167-so-that-in-order-that",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-so-that-in-order-that"
            ]
          }
        },
        {
          "id": "link-in-order-that",
          "text": "in order that",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-in-order-that-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~할 수 있도록",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "so that / in order that: ~할 수 있도록. so that, in order that은 절을 이끌어 ~할 수 있도록이라는 목적을 나타내요.",
          "examples": [
            "in order that : ~할 수 있도록"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "so that / in order that",
            "unit": "qs-p167-so-that-in-order-that",
            "target": "qs-p167-so-that-in-order-that",
            "pages": [
              167
            ],
            "id": "qs-p167-so-that-in-order-that",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "so that / in order that",
                "unit": "qs-p167-so-that-in-order-that",
                "target": "qs-p167-so-that-in-order-that",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-so-that-in-order-that"
            ]
          }
        },
        {
          "id": "link-unless",
          "text": "unless",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-unless-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~하지 않는다면",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "unless: ~하지 않는다면. unless는 ~하지 않는다면이라는 부정 조건을 나타내요.",
          "examples": [
            "unless : ~하지 않는다면"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "unless",
            "unit": "qs-p167-unless",
            "target": "qs-p167-unless",
            "pages": [
              167
            ],
            "id": "qs-p167-unless",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "unless",
                "unit": "qs-p167-unless",
                "target": "qs-p167-unless",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-unless"
            ]
          }
        },
        {
          "id": "link-whereas",
          "text": "whereas",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-whereas-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~인 반면에",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "whereas / while (contrast): ~인 반면에. whereas와 대조 의미의 while은 두 절 사이의 차이를 나타내요.",
          "examples": [
            "whereas : ~인 반면에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 167,
            "pdfPage": 168,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "whereas / while (contrast)",
            "unit": "qs-p167-whereas-while-contrast",
            "target": "qs-p167-whereas-while-contrast",
            "pages": [
              167
            ],
            "id": "qs-p167-whereas-while-contrast",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 167,
                "pdfPage": 168,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "whereas / while (contrast)",
                "unit": "qs-p167-whereas-while-contrast",
                "target": "qs-p167-whereas-while-contrast",
                "pages": [
                  167
                ]
              }
            ],
            "sourceIds": [
              "qs-p167-whereas-while-contrast"
            ]
          }
        },
        {
          "id": "link-afterward-s",
          "text": "afterward(s)",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-afterward-s-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 동안",
                "~ 때문에",
                "그 후에, 나중에"
              ],
              "answer": 3
            }
          ],
          "note": "afterward(s): 그 후에, 나중에. 먼저 브리핑에 참석한 다음이라는 시간 순서이므로 Afterward가 맞아요. Afterwards도 같은 뜻이에요.",
          "examples": [
            "First attend the briefing. Afterward, return to your desk."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "전치사와 접속사 비교",
            "headword": "afterward(s)",
            "unit": "qs-p168-afterward-s",
            "target": "qs-p168-afterward-s",
            "pages": [
              168
            ],
            "id": "qs-p168-afterward-s",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "전치사와 접속사 비교",
                "headword": "afterward(s)",
                "unit": "qs-p168-afterward-s",
                "target": "qs-p168-afterward-s",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-afterward-s"
            ]
          }
        },
        {
          "id": "link-beforehand",
          "text": "beforehand",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-beforehand-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 후에",
                "그 전에",
                "~ 동안",
                "~ 때문에"
              ],
              "answer": 1
            }
          ],
          "note": "beforehand: 그 전에. 회의가 시작되기 전에 읽으라는 뜻이므로 beforehand가 맞아요.",
          "examples": [
            "The meeting is tomorrow. Please read the agenda beforehand so that you are prepared."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "beforehand",
            "unit": "qs-p168-beforehand",
            "target": "qs-p168-beforehand",
            "pages": [
              168
            ],
            "id": "qs-p168-beforehand",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "beforehand",
                "unit": "qs-p168-beforehand",
                "target": "qs-p168-beforehand",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-beforehand"
            ]
          }
        },
        {
          "id": "link-besides",
          "text": "besides",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-besides-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "게다가",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "besides: 게다가. 장점을 하나 더 덧붙이므로 Besides가 맞아요.",
          "examples": [
            "The office is spacious. Besides, it is close to the station."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "besides",
            "unit": "qs-p168-besides",
            "target": "qs-p168-besides",
            "pages": [
              168
            ],
            "id": "qs-p168-besides",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "besides",
                "unit": "qs-p168-besides",
                "target": "qs-p168-besides",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-besides"
            ]
          }
        },
        {
          "id": "link-consequently",
          "text": "consequently",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-consequently-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "그러므로, 따라서",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "consequently: 그러므로, 따라서. 고장의 결과로 생산이 중단되었다는 인과 관계예요.",
          "examples": [
            "The machine broke down. Consequently, production stopped."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "consequently",
            "unit": "qs-p168-consequently",
            "target": "qs-p168-consequently",
            "pages": [
              168
            ],
            "id": "qs-p168-consequently",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "consequently",
                "unit": "qs-p168-consequently",
                "target": "qs-p168-consequently",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-consequently"
            ]
          }
        },
        {
          "id": "link-even-so",
          "text": "even so",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-even-so-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "그렇다 하더라도",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "even so: 그렇다 하더라도. 어려움에도 시도하겠다는 양보 관계이므로 Even so가 맞아요.",
          "examples": [
            "The task will be difficult. Even so, we intend to try."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "even so",
            "unit": "qs-p168-even-so",
            "target": "qs-p168-even-so",
            "pages": [
              168
            ],
            "id": "qs-p168-even-so",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "even so",
                "unit": "qs-p168-even-so",
                "target": "qs-p168-even-so",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-even-so"
            ]
          }
        },
        {
          "id": "link-furthermore",
          "text": "furthermore",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-furthermore-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "게다가",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "furthermore: 게다가. 앞 장점에 또 다른 장점을 추가하므로 Furthermore가 맞아요.",
          "examples": [
            "The software is easy to use. Furthermore, it requires little training."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "furthermore",
            "unit": "qs-p168-furthermore",
            "target": "qs-p168-furthermore",
            "pages": [
              168
            ],
            "id": "qs-p168-furthermore",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "furthermore",
                "unit": "qs-p168-furthermore",
                "target": "qs-p168-furthermore",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-furthermore"
            ]
          }
        },
        {
          "id": "link-if-so",
          "text": "if so",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-if-so-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "그렇다면",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "if so: 그렇다면. 앞 질문에 대한 대답이 그렇다인 경우를 가리키므로 If so가 맞아요.",
          "examples": [
            "Are you available tomorrow? If so, please join our meeting."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "if so",
            "unit": "qs-p168-if-so",
            "target": "qs-p168-if-so",
            "pages": [
              168
            ],
            "id": "qs-p168-if-so",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "if so",
                "unit": "qs-p168-if-so",
                "target": "qs-p168-if-so",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-if-so"
            ]
          }
        },
        {
          "id": "link-in-addition",
          "text": "in addition",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-in-addition-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "게다가"
              ],
              "answer": 3
            }
          ],
          "note": "in addition: 게다가. 무료 아침 식사에 추가 혜택을 더하므로 In addition이 맞아요.",
          "examples": [
            "The hotel offers free breakfast. In addition, guests can use the gym at no charge."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "in addition",
            "unit": "qs-p168-in-addition",
            "target": "qs-p168-in-addition",
            "pages": [
              168
            ],
            "id": "qs-p168-in-addition",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "in addition",
                "unit": "qs-p168-in-addition",
                "target": "qs-p168-in-addition",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-in-addition"
            ]
          }
        },
        {
          "id": "link-in-contrast",
          "text": "in contrast",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-in-contrast-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "대조적으로",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "in contrast: 대조적으로. 본사와 지점의 크기를 대조하므로 In contrast가 맞아요.",
          "examples": [
            "The main office is large. In contrast, the branch occupies a small room."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "in contrast",
            "unit": "qs-p168-in-contrast",
            "target": "qs-p168-in-contrast",
            "pages": [
              168
            ],
            "id": "qs-p168-in-contrast",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "in contrast",
                "unit": "qs-p168-in-contrast",
                "target": "qs-p168-in-contrast",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-in-contrast"
            ]
          }
        },
        {
          "id": "link-in-other-words",
          "text": "in other words",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-in-other-words-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "즉, 다시 말해",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "in other words: 즉, 다시 말해. 앞의 complimentary를 free로 바꾸어 설명하므로 In other words가 맞아요.",
          "examples": [
            "The service is complimentary. In other words, it is free."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "in other words",
            "unit": "qs-p168-in-other-words",
            "target": "qs-p168-in-other-words",
            "pages": [
              168
            ],
            "id": "qs-p168-in-other-words",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "in other words",
                "unit": "qs-p168-in-other-words",
                "target": "qs-p168-in-other-words",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-in-other-words"
            ]
          }
        },
        {
          "id": "link-in-the-meantime",
          "text": "in the meantime",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-in-the-meantime-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "그동안",
                "~ 후에",
                "~ 때문에"
              ],
              "answer": 1
            }
          ],
          "note": "in the meantime: 그동안. 교체품을 기다리는 그동안이라는 뜻으로 In the meantime이 맞아요.",
          "examples": [
            "The replacement will arrive next week. In the meantime, please use this temporary device."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "in the meantime",
            "unit": "qs-p168-in-the-meantime",
            "target": "qs-p168-in-the-meantime",
            "pages": [
              168
            ],
            "id": "qs-p168-in-the-meantime",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "in the meantime",
                "unit": "qs-p168-in-the-meantime",
                "target": "qs-p168-in-the-meantime",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-in-the-meantime"
            ]
          }
        },
        {
          "id": "link-likewise",
          "text": "likewise",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-likewise-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "마찬가지로",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "likewise: 마찬가지로. 두 팀에 같은 일이 일어났다는 유사 관계이므로 Likewise가 맞아요.",
          "examples": [
            "The first team improved its results. Likewise, the second team also improved."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "likewise",
            "unit": "qs-p168-likewise",
            "target": "qs-p168-likewise",
            "pages": [
              168
            ],
            "id": "qs-p168-likewise",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "likewise",
                "unit": "qs-p168-likewise",
                "target": "qs-p168-likewise",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-likewise"
            ]
          }
        },
        {
          "id": "link-moreover",
          "text": "moreover",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-moreover-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "게다가",
                "~ 동안"
              ],
              "answer": 2
            }
          ],
          "note": "moreover: 게다가. 비용 절감에 시간 절약이라는 장점을 덧붙이므로 Moreover가 맞아요.",
          "examples": [
            "The plan reduces costs. Moreover, it saves time."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "moreover",
            "unit": "qs-p168-moreover",
            "target": "qs-p168-moreover",
            "pages": [
              168
            ],
            "id": "qs-p168-moreover",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "moreover",
                "unit": "qs-p168-moreover",
                "target": "qs-p168-moreover",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-moreover"
            ]
          }
        },
        {
          "id": "link-namely",
          "text": "namely",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-namely-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "즉, 다시 말해",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "namely: 즉, 다시 말해. 앞의 한 사람이 구체적으로 누구인지 밝히므로 namely가 맞아요.",
          "examples": [
            "Only one person can approve it, namely, the director."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "namely",
            "unit": "qs-p168-namely",
            "target": "qs-p168-namely",
            "pages": [
              168
            ],
            "id": "qs-p168-namely",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "namely",
                "unit": "qs-p168-namely",
                "target": "qs-p168-namely",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-namely"
            ]
          }
        },
        {
          "id": "link-on-the-contrary",
          "text": "on the contrary",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-on-the-contrary-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "반대로",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "on the contrary: 반대로. 앞서 부정한 내용과 반대되는 사실을 제시하므로 On the contrary가 맞아요.",
          "examples": [
            "The process is not difficult. On the contrary, it is quite simple."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "on the contrary",
            "unit": "qs-p168-on-the-contrary",
            "target": "qs-p168-on-the-contrary",
            "pages": [
              168
            ],
            "id": "qs-p168-on-the-contrary",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "on the contrary",
                "unit": "qs-p168-on-the-contrary",
                "target": "qs-p168-on-the-contrary",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-on-the-contrary"
            ]
          }
        },
        {
          "id": "link-on-the-other-hand",
          "text": "on the other hand",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-on-the-other-hand-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "반면에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "on the other hand: 반면에. 편리한 위치라는 장점과 비싼 임대료라는 다른 측면을 대비하므로 On the other hand가 맞아요.",
          "examples": [
            "on the other hand : 반면에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "on the other hand",
            "unit": "qs-p168-on-the-other-hand",
            "target": "qs-p168-on-the-other-hand",
            "pages": [
              168
            ],
            "id": "qs-p168-on-the-other-hand",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "on the other hand",
                "unit": "qs-p168-on-the-other-hand",
                "target": "qs-p168-on-the-other-hand",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-on-the-other-hand"
            ]
          }
        },
        {
          "id": "link-otherwise",
          "text": "otherwise",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-otherwise-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "그렇지 않으면",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "otherwise: 그렇지 않으면. 앞의 지시를 따르지 않는 경우를 나타내므로 Otherwise가 맞아요.",
          "examples": [
            "Please submit the form today. Otherwise, your application will be late."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "otherwise",
            "unit": "qs-p168-otherwise",
            "target": "qs-p168-otherwise",
            "pages": [
              168
            ],
            "id": "qs-p168-otherwise",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "otherwise",
                "unit": "qs-p168-otherwise",
                "target": "qs-p168-otherwise",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-otherwise"
            ]
          }
        },
        {
          "id": "link-similarly",
          "text": "similarly",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-similarly-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "마찬가지로",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "similarly: 마찬가지로. 두 곳이 같은 서비스를 제공한다는 유사 관계이므로 Similarly가 맞아요.",
          "examples": [
            "The city office offers online booking. Similarly, the branch provides the same service."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "similarly",
            "unit": "qs-p168-similarly",
            "target": "qs-p168-similarly",
            "pages": [
              168
            ],
            "id": "qs-p168-similarly",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "similarly",
                "unit": "qs-p168-similarly",
                "target": "qs-p168-similarly",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-similarly"
            ]
          }
        },
        {
          "id": "link-therefore",
          "text": "therefore",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-therefore-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "그러므로, 따라서"
              ],
              "answer": 3
            }
          ],
          "note": "therefore: 그러므로, 따라서. 도로가 막힌 결과로 다른 길을 택해야 한다는 인과 관계이므로 Therefore가 맞아요.",
          "examples": [
            "The road is closed. Therefore, we must take another route."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "therefore",
            "unit": "qs-p168-therefore",
            "target": "qs-p168-therefore",
            "pages": [
              168
            ],
            "id": "qs-p168-therefore",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "therefore",
                "unit": "qs-p168-therefore",
                "target": "qs-p168-therefore",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-therefore"
            ]
          }
        },
        {
          "id": "link-thus",
          "text": "thus",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-thus-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "그러므로, 따라서"
              ],
              "answer": 3
            }
          ],
          "note": "thus: 그러므로, 따라서. 좌석이 모두 예약된 결과로 추가 예약이 불가능하므로 Thus가 맞아요.",
          "examples": [
            "All seats are reserved. Thus, no more bookings can be accepted."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "thus",
            "unit": "qs-p168-thus",
            "target": "qs-p168-thus",
            "pages": [
              168
            ],
            "id": "qs-p168-thus",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "thus",
                "unit": "qs-p168-thus",
                "target": "qs-p168-thus",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-thus"
            ]
          }
        },
        {
          "id": "link-to-that-end",
          "text": "to that end",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-to-that-end-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "이를 위하여, 그 목적을 달성하기 위해",
                "~ 전에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 0
            }
          ],
          "note": "to that end: 이를 위하여, 그 목적을 달성하기 위해. 폐기물 감소라는 목적을 달성하기 위한 조치이므로 To that end가 맞아요.",
          "examples": [
            "The goal is to reduce waste. To that end, a recycling program will be introduced."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "to that end",
            "unit": "qs-p168-to-that-end",
            "target": "qs-p168-to-that-end",
            "pages": [
              168
            ],
            "id": "qs-p168-to-that-end",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "to that end",
                "unit": "qs-p168-to-that-end",
                "target": "qs-p168-to-that-end",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-to-that-end"
            ]
          }
        },
        {
          "id": "link-to-this-end",
          "text": "to this end",
          "correctBins": [
            "adv"
          ],
          "steps": [
            {
              "id": "link-to-this-end-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 후에",
                "~ 동안",
                "이를 위하여, 그 목적을 달성하기 위해"
              ],
              "answer": 3
            }
          ],
          "note": "to this end: 이를 위하여, 그 목적을 달성하기 위해. 서비스 개선이라는 앞의 목적을 이루기 위한 방법을 이어 말하므로 To this end가 맞아요.",
          "examples": [
            "We want to improve service. To this end, we will train every employee."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 168,
            "pdfPage": 169,
            "scope": "linking-adverbs",
            "section": "접속부사",
            "headword": "to this end",
            "unit": "qs-p168-to-this-end",
            "target": "qs-p168-to-this-end",
            "pages": [
              168
            ],
            "id": "qs-p168-to-this-end",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 168,
                "pdfPage": 169,
                "scope": "linking-adverbs",
                "section": "접속부사",
                "headword": "to this end",
                "unit": "qs-p168-to-this-end",
                "target": "qs-p168-to-this-end",
                "pages": [
                  168
                ]
              }
            ],
            "sourceIds": [
              "qs-p168-to-this-end"
            ]
          }
        },
        {
          "id": "link-now-that",
          "text": "now that",
          "correctBins": [
            "conj"
          ],
          "steps": [
            {
              "id": "link-now-that-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "~ 전에",
                "~ 때문에",
                "~ 후에",
                "~ 동안"
              ],
              "answer": 1
            }
          ],
          "note": "because / as / since / now that: ~ 때문에. 뒤가 주어와 동사가 있는 절이므로 원인을 나타내는 접속사 because가 필요해요. as, since, now that도 문맥에 따라 이유를 이끌 수 있어요.",
          "examples": [
            "now that : ~ 때문에"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 166,
            "pdfPage": 167,
            "scope": "conjunctions",
            "section": "접속사",
            "headword": "because / as / since / now that",
            "unit": "qs-p166-because-as-since-now-that",
            "target": "qs-p166-because-as-since-now-that",
            "pages": [
              166
            ],
            "id": "qs-p166-because-as-since-now-that",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 166,
                "pdfPage": 167,
                "scope": "conjunctions",
                "section": "접속사",
                "headword": "because / as / since / now that",
                "unit": "qs-p166-because-as-since-now-that",
                "target": "qs-p166-because-as-since-now-that",
                "pages": [
                  166
                ]
              }
            ],
            "sourceIds": [
              "qs-p166-because-as-since-now-that"
            ]
          }
        }
      ]
    },
    {
      "id": "noun-countability",
      "title": "가산·불가산명사",
      "bins": [
        {
          "id": "countable",
          "label": "가산명사"
        },
        {
          "id": "uncountable",
          "label": "불가산명사"
        }
      ],
      "instruction": "교재의 가산·불가산 설명에 실린 명사 뜻을 기준으로 모두 분류하세요. 뜻에 따라 두 쓰임이 있으면 두 칸을 선택하세요.",
      "cards": [
        {
          "id": "count-advice",
          "text": "advice",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-advice-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 장비",
                "(n) 조언",
                "(n) 가구",
                "(n) 정보"
              ],
              "answer": 1
            }
          ],
          "note": "조언이라는 뜻의 advice는 불가산명사예요. 한 건을 셀 때는 a piece of advice처럼 단위를 써요.",
          "examples": [
            "a little advice: 약간의 조언"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "id": "usage1-qs-p105-advice",
            "sourceIds": [
              "usage1-qs-p105-advice",
              "qs-p105-advice"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "advice",
                "unit": "qs-p105-advice",
                "target": "qs-p105-advice",
                "pages": [
                  105
                ]
              }
            ]
          }
        },
        {
          "id": "count-equipment",
          "text": "equipment",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-equipment-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 기금",
                "(n) 의류",
                "(n) 장비",
                "(n) 문구류"
              ],
              "answer": 2
            }
          ],
          "note": "장비 전체를 가리키는 equipment는 불가산명사예요. 개별 장비는 a piece of equipment로 셀 수 있어요.",
          "examples": [
            "a little equipment: 약간의 장비"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "id": "usage1-qs-p105-equipment",
            "sourceIds": [
              "usage1-qs-p105-equipment",
              "qs-p105-equipment"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "equipment",
                "unit": "qs-p105-equipment",
                "target": "qs-p105-equipment",
                "pages": [
                  105
                ]
              }
            ]
          }
        },
        {
          "id": "count-information",
          "text": "information",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-information-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 정보",
                "(n) 승인",
                "(n) 참여",
                "(n) 만족"
              ],
              "answer": 0
            }
          ],
          "note": "정보라는 뜻의 information은 불가산명사예요. many informations처럼 쓰지 않아요.",
          "examples": [
            "There isn't much information available.: 이용할 수 있는 정보가 많지 않다."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "id": "usage1-qs-p105-information",
            "sourceIds": [
              "usage1-qs-p105-information",
              "qs-p105-information"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "information",
                "unit": "qs-p105-information",
                "target": "qs-p105-information",
                "pages": [
                  105
                ]
              }
            ]
          }
        },
        {
          "id": "count-furniture",
          "text": "furniture",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-furniture-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 수하물",
                "(n) 기계류",
                "(n) 우편물",
                "(n) 가구"
              ],
              "answer": 3
            }
          ],
          "note": "가구를 총체적으로 가리키는 furniture는 불가산명사예요. 가구 한 점은 a piece of furniture로 표현해요.",
          "examples": [
            "less furniture: 더 적은 가구"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "id": "usage1-qs-p105-furniture",
            "sourceIds": [
              "usage1-qs-p105-furniture",
              "qs-p105-furniture"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "furniture",
                "unit": "qs-p105-furniture",
                "target": "qs-p105-furniture",
                "pages": [
                  105
                ]
              }
            ]
          }
        },
        {
          "id": "count-machine",
          "text": "machine",
          "correctBins": [
            "countable"
          ],
          "steps": [
            {
              "id": "count-machine-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 좌석",
                "(n) 기계",
                "(n) 표",
                "(n) 허가증"
              ],
              "answer": 1
            }
          ],
          "note": "개별 기계는 a machine, three machines로 세어요. 기계류 전체를 뜻하는 불가산명사 machinery와 구별해요.",
          "examples": [
            "The factory bought three new machines.: 공장이 새 기계 세 대를 샀다."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "id": "semantic1-ui2-qs-p105-machine-machinery",
            "sourceIds": [
              "semantic1-ui2-qs-p105-machine-machinery"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "가산·불가산 의미 구별",
                "headword": "machine / machinery",
                "unit": "qs-p105-machine-machinery",
                "target": "qs-p105-machine-machinery",
                "pages": [
                  105
                ]
              }
            ]
          }
        },
        {
          "id": "count-permit",
          "text": "permit",
          "correctBins": [
            "countable"
          ],
          "steps": [
            {
              "id": "count-permit-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 계획",
                "(n) 기계",
                "(n) 허가증",
                "(n) 좌석"
              ],
              "answer": 2
            }
          ],
          "note": "이 카드의 permit은 허가증을 뜻하는 명사예요. two permits처럼 세며, 허가 자체를 뜻하는 permission과 구별해요.",
          "examples": [
            "two new permits: 새 허가증 두 장"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "id": "semantic1-ui2-qs-p105-permit-permission",
            "sourceIds": [
              "semantic1-ui2-qs-p105-permit-permission"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "가산·불가산 의미 구별",
                "headword": "permit / permission",
                "unit": "qs-p105-permit-permission",
                "target": "qs-p105-permit-permission",
                "pages": [
                  105
                ]
              }
            ]
          }
        },
        {
          "id": "count-seat",
          "text": "seat",
          "correctBins": [
            "countable"
          ],
          "steps": [
            {
              "id": "count-seat-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 좌석",
                "(n) 계획",
                "(n) 기금",
                "(n) 표"
              ],
              "answer": 0
            }
          ],
          "note": "개별 좌석은 three seats처럼 세어요. 좌석 배치·좌석 전체를 뜻하는 seating과 구별해요.",
          "examples": [
            "three empty seats: 빈 좌석 세 개"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "id": "semantic1-ui2-qs-p105-seat-seating",
            "sourceIds": [
              "semantic1-ui2-qs-p105-seat-seating"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "가산·불가산 의미 구별",
                "headword": "seat / seating",
                "unit": "qs-p105-seat-seating",
                "target": "qs-p105-seat-seating",
                "pages": [
                  105
                ]
              }
            ]
          }
        },
        {
          "id": "count-ticket",
          "text": "ticket",
          "correctBins": [
            "countable"
          ],
          "steps": [
            {
              "id": "count-ticket-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 기계",
                "(n) 계획",
                "(n) 허가증",
                "(n) 표"
              ],
              "answer": 3
            }
          ],
          "note": "표 한 장은 a ticket, 두 장은 two tickets예요. 발권 과정을 뜻하는 ticketing과 구별해요.",
          "examples": [
            "I purchased two tickets.: 표 두 장을 샀다."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "id": "semantic1-ui2-qs-p105-ticket-ticketing",
            "sourceIds": [
              "semantic1-ui2-qs-p105-ticket-ticketing"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "가산·불가산 의미 구별",
                "headword": "ticket / ticketing",
                "unit": "qs-p105-ticket-ticketing",
                "target": "qs-p105-ticket-ticketing",
                "pages": [
                  105
                ]
              }
            ]
          }
        },
        {
          "id": "count-plan",
          "text": "plan",
          "correctBins": [
            "countable"
          ],
          "steps": [
            {
              "id": "count-plan-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 허가증",
                "(n) 계획",
                "(n) 좌석",
                "(n) 기금"
              ],
              "answer": 1
            }
          ],
          "note": "구체적인 계획은 three plans처럼 세어요. 계획 수립 과정을 뜻하는 불가산명사 planning과 구별해요.",
          "examples": [
            "The team presented three plans.: 팀이 세 가지 계획을 제시했다."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "id": "semantic1-ui2-qs-p105-plan-planning",
            "sourceIds": [
              "semantic1-ui2-qs-p105-plan-planning"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "가산·불가산 의미 구별",
                "headword": "plan / planning",
                "unit": "qs-p105-plan-planning",
                "target": "qs-p105-plan-planning",
                "pages": [
                  105
                ]
              }
            ]
          }
        },
        {
          "id": "count-work",
          "text": "work",
          "correctBins": [
            "countable",
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-work-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 계획 / 계획 수립",
                "(n) 허가증 / 허가",
                "(n) 일·작업 / 작품",
                "(n) 기계 / 기계류"
              ],
              "answer": 2
            }
          ],
          "note": "일·작업이라는 뜻은 불가산이고, 예술 작품을 뜻하면 a work, several works처럼 셀 수 있어요. 교재에 두 쓰임이 모두 나와요.",
          "examples": [
            "less work: 더 적은 일·작업",
            "several works by the artist: 그 예술가의 작품 여러 점"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "id": "semantic1-ui2-qs-p105-work-works",
            "related": [
              "usage1-qs-p105-work"
            ],
            "sourceIds": [
              "semantic1-ui2-qs-p105-work-works",
              "usage1-qs-p105-work",
              "qs-p105-work"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "가산·불가산 의미 구별",
                "headword": "work / works",
                "unit": "qs-p105-work-works",
                "target": "qs-p105-work-works",
                "pages": [
                  105
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "work",
                "unit": "qs-p105-work",
                "target": "qs-p105-work",
                "pages": [
                  105
                ]
              }
            ]
          }
        },
        {
          "id": "count-access",
          "text": "access",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-access-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 접근·이용",
                "(n) 조언",
                "(n) 장비",
                "(n) 정보"
              ],
              "answer": 0
            }
          ],
          "note": "access: 접근·이용. 여기서 access는 열람·이용이라는 불가산명사예요. 부정관사나 가산 복수명사용 수량사를 붙이지 않아요.",
          "examples": [
            "Only authorized staff have access to the files."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "access",
            "unit": "qs-p105-access",
            "target": "qs-p105-access",
            "pages": [
              105
            ],
            "id": "qs-p105-access",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "access",
                "unit": "qs-p105-access",
                "target": "qs-p105-access",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-access"
            ]
          }
        },
        {
          "id": "count-approval",
          "text": "approval",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-approval-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 장비",
                "(n) 정보",
                "(n) 승인"
              ],
              "answer": 3
            }
          ],
          "note": "approval: 승인. approval는 이 뜻에서 불가산명사이므로 비교 표현 less를 사용해요. fewer는 가산 복수명사의 수를 비교할 때 써요.",
          "examples": [
            "There was less approval than last year."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "approval",
            "unit": "qs-p105-approval",
            "target": "qs-p105-approval",
            "pages": [
              105
            ],
            "id": "qs-p105-approval",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "approval",
                "unit": "qs-p105-approval",
                "target": "qs-p105-approval",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-approval"
            ]
          }
        },
        {
          "id": "count-assistance",
          "text": "assistance",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-assistance-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 도움",
                "(n) 조언",
                "(n) 장비",
                "(n) 정보"
              ],
              "answer": 0
            }
          ],
          "note": "assistance: 도움. assistance는 이 뜻에서 불가산명사이므로 비교 표현 less를 사용해요. fewer는 가산 복수명사의 수를 비교할 때 써요.",
          "examples": [
            "There was less assistance than last year."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "assistance",
            "unit": "qs-p105-assistance",
            "target": "qs-p105-assistance",
            "pages": [
              105
            ],
            "id": "qs-p105-assistance",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "assistance",
                "unit": "qs-p105-assistance",
                "target": "qs-p105-assistance",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-assistance"
            ]
          }
        },
        {
          "id": "count-authorization",
          "text": "authorization",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-authorization-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 장비",
                "(n) 정보",
                "(n) 허가·인가"
              ],
              "answer": 3
            }
          ],
          "note": "authorization: 허가·인가. authorization는 이 문맥에서 허가라는 불가산명사예요. 단수 취급하므로 문장의 동사는 is가 와요.",
          "examples": [
            "Written authorization is required."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "authorization",
            "unit": "qs-p105-authorization",
            "target": "qs-p105-authorization",
            "pages": [
              105
            ],
            "id": "qs-p105-authorization",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "authorization",
                "unit": "qs-p105-authorization",
                "target": "qs-p105-authorization",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-authorization"
            ]
          }
        },
        {
          "id": "count-baggage",
          "text": "baggage",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-baggage-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 수하물",
                "(n) 조언",
                "(n) 장비",
                "(n) 정보"
              ],
              "answer": 0
            }
          ],
          "note": "baggage: 수하물. baggage는 이 뜻에서 불가산명사이므로 비교 표현 less를 사용해요. fewer는 가산 복수명사의 수를 비교할 때 써요.",
          "examples": [
            "There was less baggage than last year."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "baggage",
            "unit": "qs-p105-baggage",
            "target": "qs-p105-baggage",
            "pages": [
              105
            ],
            "id": "qs-p105-baggage",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "baggage",
                "unit": "qs-p105-baggage",
                "target": "qs-p105-baggage",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-baggage"
            ]
          }
        },
        {
          "id": "count-clothing",
          "text": "clothing",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-clothing-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 장비",
                "(n) 의류",
                "(n) 정보"
              ],
              "answer": 2
            }
          ],
          "note": "clothing: 의류. clothing는 불가산명사이므로 양이 많지 않다고 할 때 much를 써요. many·a few·several 뒤에는 가산 복수명사가 필요해요.",
          "examples": [
            "There isn't much clothing available."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "clothing",
            "unit": "qs-p105-clothing",
            "target": "qs-p105-clothing",
            "pages": [
              105
            ],
            "id": "qs-p105-clothing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "clothing",
                "unit": "qs-p105-clothing",
                "target": "qs-p105-clothing",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-clothing"
            ]
          }
        },
        {
          "id": "count-consent",
          "text": "consent",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-consent-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 동의",
                "(n) 조언",
                "(n) 장비",
                "(n) 정보"
              ],
              "answer": 0
            }
          ],
          "note": "consent: 동의. consent는 동의라는 불가산명사예요. 주어의 핵심 명사가 단수 취급되므로 is가 필요해요.",
          "examples": [
            "The owner's consent is necessary before work begins."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "consent",
            "unit": "qs-p105-consent",
            "target": "qs-p105-consent",
            "pages": [
              105
            ],
            "id": "qs-p105-consent",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "consent",
                "unit": "qs-p105-consent",
                "target": "qs-p105-consent",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-consent"
            ]
          }
        },
        {
          "id": "count-employment",
          "text": "employment",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-employment-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 고용",
                "(n) 조언",
                "(n) 장비",
                "(n) 정보"
              ],
              "answer": 0
            }
          ],
          "note": "employment: 고용. employment는 불가산명사이므로 양이 많지 않다고 할 때 much를 써요. many·a few·several 뒤에는 가산 복수명사가 필요해요.",
          "examples": [
            "There isn't much employment available."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "employment",
            "unit": "qs-p105-employment",
            "target": "qs-p105-employment",
            "pages": [
              105
            ],
            "id": "qs-p105-employment",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "employment",
                "unit": "qs-p105-employment",
                "target": "qs-p105-employment",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-employment"
            ]
          }
        },
        {
          "id": "count-feedback",
          "text": "feedback",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-feedback-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 장비",
                "(n) 정보",
                "(n) 의견·피드백"
              ],
              "answer": 3
            }
          ],
          "note": "feedback: 의견·피드백. feedback는 이 뜻에서 불가산명사예요. a little은 불가산명사를, a few·many·several은 가산 복수명사를 수식해요.",
          "examples": [
            "The team needs a little feedback."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "feedback",
            "unit": "qs-p105-feedback",
            "target": "qs-p105-feedback",
            "pages": [
              105
            ],
            "id": "qs-p105-feedback",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "feedback",
                "unit": "qs-p105-feedback",
                "target": "qs-p105-feedback",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-feedback"
            ]
          }
        },
        {
          "id": "count-funding",
          "text": "funding",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-funding-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 자금 지원",
                "(n) 장비",
                "(n) 정보"
              ],
              "answer": 1
            }
          ],
          "note": "funding: 자금 지원. funding는 이 뜻에서 불가산명사이므로 비교 표현 less를 사용해요. fewer는 가산 복수명사의 수를 비교할 때 써요.",
          "examples": [
            "There was less funding than last year."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "funding",
            "unit": "qs-p105-funding",
            "target": "qs-p105-funding",
            "pages": [
              105
            ],
            "id": "qs-p105-funding",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "funding",
                "unit": "qs-p105-funding",
                "target": "qs-p105-funding",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-funding"
            ]
          }
        },
        {
          "id": "count-luggage",
          "text": "luggage",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-luggage-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 장비",
                "(n) 수하물",
                "(n) 정보"
              ],
              "answer": 2
            }
          ],
          "note": "luggage: 수하물. less 뒤에서 '수하물'이라는 불가산 의미의 luggage는 그대로 써요. 부정관사나 복수형을 붙이지 않아요.",
          "examples": [
            "We have less luggage than before."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "luggage",
            "unit": "qs-p105-luggage",
            "target": "qs-p105-luggage",
            "pages": [
              105
            ],
            "id": "qs-p105-luggage",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "luggage",
                "unit": "qs-p105-luggage",
                "target": "qs-p105-luggage",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-luggage"
            ]
          }
        },
        {
          "id": "count-machinery",
          "text": "machinery",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-machinery-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 장비",
                "(n) 기계류",
                "(n) 정보"
              ],
              "answer": 2
            }
          ],
          "note": "machinery: 기계류. machinery는 불가산명사이므로 양이 많지 않다고 할 때 much를 써요. many·a few·several 뒤에는 가산 복수명사가 필요해요.",
          "examples": [
            "There isn't much machinery available."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "machinery",
            "unit": "qs-p105-machinery",
            "target": "qs-p105-machinery",
            "pages": [
              105
            ],
            "id": "qs-p105-machinery",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "machinery",
                "unit": "qs-p105-machinery",
                "target": "qs-p105-machinery",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-machinery"
            ]
          }
        },
        {
          "id": "count-mail",
          "text": "mail",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-mail-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 우편물",
                "(n) 장비",
                "(n) 정보"
              ],
              "answer": 1
            }
          ],
          "note": "mail: 우편물. mail는 이 뜻에서 불가산명사이므로 비교 표현 less를 사용해요. fewer는 가산 복수명사의 수를 비교할 때 써요.",
          "examples": [
            "There was less mail than last year."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "mail",
            "unit": "qs-p105-mail",
            "target": "qs-p105-mail",
            "pages": [
              105
            ],
            "id": "qs-p105-mail",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "mail",
                "unit": "qs-p105-mail",
                "target": "qs-p105-mail",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-mail"
            ]
          }
        },
        {
          "id": "count-merchandise",
          "text": "merchandise",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-merchandise-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 상품",
                "(n) 장비",
                "(n) 정보"
              ],
              "answer": 1
            }
          ],
          "note": "merchandise: 상품. merchandise는 불가산명사이므로 양이 많지 않다고 할 때 much를 써요. many·a few·several 뒤에는 가산 복수명사가 필요해요.",
          "examples": [
            "There isn't much merchandise available."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "merchandise",
            "unit": "qs-p105-merchandise",
            "target": "qs-p105-merchandise",
            "pages": [
              105
            ],
            "id": "qs-p105-merchandise",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "merchandise",
                "unit": "qs-p105-merchandise",
                "target": "qs-p105-merchandise",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-merchandise"
            ]
          }
        },
        {
          "id": "count-participation",
          "text": "participation",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-participation-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 참여",
                "(n) 장비",
                "(n) 정보"
              ],
              "answer": 1
            }
          ],
          "note": "participation: 참여. participation은 참여라는 불가산명사예요. 주어를 단수 취급하므로 수동태의 be동사로 is가 와요.",
          "examples": [
            "Active participation is encouraged."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "participation",
            "unit": "qs-p105-participation",
            "target": "qs-p105-participation",
            "pages": [
              105
            ],
            "id": "qs-p105-participation",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "participation",
                "unit": "qs-p105-participation",
                "target": "qs-p105-participation",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-participation"
            ]
          }
        },
        {
          "id": "count-permission",
          "text": "permission",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-permission-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 장비",
                "(n) 정보",
                "(n) 허가"
              ],
              "answer": 3
            }
          ],
          "note": "permission: 허가. permission는 이 문맥에서 허가라는 불가산명사예요. 단수 취급하므로 문장의 동사는 is가 와요.",
          "examples": [
            "Permission is required to use this room."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "permission",
            "unit": "qs-p105-permission",
            "target": "qs-p105-permission",
            "pages": [
              105
            ],
            "id": "qs-p105-permission",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "permission",
                "unit": "qs-p105-permission",
                "target": "qs-p105-permission",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-permission"
            ]
          }
        },
        {
          "id": "count-planning",
          "text": "planning",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-planning-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 계획 수립",
                "(n) 장비",
                "(n) 정보"
              ],
              "answer": 1
            }
          ],
          "note": "planning: 계획 수립. less 뒤에서 '계획 수립'이라는 불가산 의미의 planning는 그대로 써요. 부정관사나 복수형을 붙이지 않아요.",
          "examples": [
            "We have less planning than before."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "planning",
            "unit": "qs-p105-planning",
            "target": "qs-p105-planning",
            "pages": [
              105
            ],
            "id": "qs-p105-planning",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "planning",
                "unit": "qs-p105-planning",
                "target": "qs-p105-planning",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-planning"
            ]
          }
        },
        {
          "id": "count-research",
          "text": "research",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-research-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 장비",
                "(n) 정보",
                "(n) 연구·조사"
              ],
              "answer": 3
            }
          ],
          "note": "research: 연구·조사. research는 불가산명사이므로 양이 많지 않다고 할 때 much를 써요. many·a few·several 뒤에는 가산 복수명사가 필요해요.",
          "examples": [
            "There isn't much research available."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "research",
            "unit": "qs-p105-research",
            "target": "qs-p105-research",
            "pages": [
              105
            ],
            "id": "qs-p105-research",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "research",
                "unit": "qs-p105-research",
                "target": "qs-p105-research",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-research"
            ]
          }
        },
        {
          "id": "count-satisfaction",
          "text": "satisfaction",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-satisfaction-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 장비",
                "(n) 만족",
                "(n) 정보"
              ],
              "answer": 2
            }
          ],
          "note": "satisfaction: 만족. satisfaction은 이 뜻에서 불가산명사이므로 much로 양·정도를 나타내요. many·several·a few는 가산 복수명사와 써요.",
          "examples": [
            "The role brings much satisfaction."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "satisfaction",
            "unit": "qs-p105-satisfaction",
            "target": "qs-p105-satisfaction",
            "pages": [
              105
            ],
            "id": "qs-p105-satisfaction",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "satisfaction",
                "unit": "qs-p105-satisfaction",
                "target": "qs-p105-satisfaction",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-satisfaction"
            ]
          }
        },
        {
          "id": "count-seating",
          "text": "seating",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-seating-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 좌석 배치·좌석",
                "(n) 장비",
                "(n) 정보"
              ],
              "answer": 1
            }
          ],
          "note": "seating: 좌석 배치·좌석. less 뒤에서 '좌석 배치·좌석'이라는 불가산 의미의 seating는 그대로 써요. 부정관사나 복수형을 붙이지 않아요.",
          "examples": [
            "We have less seating than before."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "seating",
            "unit": "qs-p105-seating",
            "target": "qs-p105-seating",
            "pages": [
              105
            ],
            "id": "qs-p105-seating",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "seating",
                "unit": "qs-p105-seating",
                "target": "qs-p105-seating",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-seating"
            ]
          }
        },
        {
          "id": "count-stationery",
          "text": "stationery",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-stationery-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 문구류",
                "(n) 조언",
                "(n) 장비",
                "(n) 정보"
              ],
              "answer": 0
            }
          ],
          "note": "stationery: 문구류. stationery는 이 뜻에서 불가산명사이므로 비교 표현 less를 사용해요. fewer는 가산 복수명사의 수를 비교할 때 써요.",
          "examples": [
            "There was less stationery than last year."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "stationery",
            "unit": "qs-p105-stationery",
            "target": "qs-p105-stationery",
            "pages": [
              105
            ],
            "id": "qs-p105-stationery",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "stationery",
                "unit": "qs-p105-stationery",
                "target": "qs-p105-stationery",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-stationery"
            ]
          }
        },
        {
          "id": "count-ticketing",
          "text": "ticketing",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-ticketing-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 발권",
                "(n) 조언",
                "(n) 장비",
                "(n) 정보"
              ],
              "answer": 0
            }
          ],
          "note": "ticketing: 발권. ticketing은 발권이라는 불가산명사예요. 단수 취급하므로 문장의 동사는 is가 와요.",
          "examples": [
            "Electronic ticketing is available online."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "불가산명사",
            "headword": "ticketing",
            "unit": "qs-p105-ticketing",
            "target": "qs-p105-ticketing",
            "pages": [
              105
            ],
            "id": "qs-p105-ticketing",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "불가산명사",
                "headword": "ticketing",
                "unit": "qs-p105-ticketing",
                "target": "qs-p105-ticketing",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-ticketing"
            ]
          }
        },
        {
          "id": "count-fund",
          "text": "fund",
          "correctBins": [
            "countable"
          ],
          "steps": [
            {
              "id": "count-fund-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 장비",
                "(n) 정보",
                "(n) 기금"
              ],
              "answer": 3
            }
          ],
          "note": "fund / funding: 기금 / 자금 지원. fund는 기금 하나하나를 셀 수 있지만 funding은 자금 지원을 뜻하는 불가산명사예요.",
          "examples": [
            "The organization operates two funds."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "가산·불가산 의미 구별",
            "headword": "fund / funding",
            "unit": "qs-p105-fund-funding",
            "target": "qs-p105-fund-funding",
            "pages": [
              105
            ],
            "id": "qs-p105-fund-funding",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "가산·불가산 의미 구별",
                "headword": "fund / funding",
                "unit": "qs-p105-fund-funding",
                "target": "qs-p105-fund-funding",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-fund-funding"
            ]
          }
        },
        {
          "id": "count-study",
          "text": "study",
          "correctBins": [
            "countable"
          ],
          "steps": [
            {
              "id": "count-study-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 장비",
                "(n) 정보",
                "(n) 연구 한 건"
              ],
              "answer": 3
            }
          ],
          "note": "연구 한 건을 뜻하는 study는 a study, two studies처럼 세어요. 연구·조사 전반을 뜻하는 research와 구별해요.",
          "examples": [
            "The report refers to two recent studies."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 105,
            "pdfPage": 106,
            "scope": "countability",
            "section": "가산·불가산 의미 구별",
            "headword": "study / research",
            "unit": "qs-p105-study-research",
            "target": "qs-p105-study-research",
            "pages": [
              105
            ],
            "id": "qs-p105-study-research",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 105,
                "pdfPage": 106,
                "scope": "countability",
                "section": "가산·불가산 의미 구별",
                "headword": "study / research",
                "unit": "qs-p105-study-research",
                "target": "qs-p105-study-research",
                "pages": [
                  105
                ]
              }
            ],
            "sourceIds": [
              "qs-p105-study-research"
            ]
          }
        },
        {
          "id": "count-tip",
          "text": "tip",
          "correctBins": [
            "countable"
          ],
          "steps": [
            {
              "id": "count-tip-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 장비",
                "(n) 정보",
                "(n) 가구",
                "(n) 조언 한 가지"
              ],
              "answer": 3
            }
          ],
          "note": "advice: 충고, 조언. 함께 확인할 표현: tips / pointers. 문맥과 문장 구조에 맞춰 사용해요. 의미 재표현이며 advice는 불가산, tips·pointers는 복수 가산. 문장 치환 시 수일치·한정사 조정.",
          "examples": [
            "The advisor gave us useful advice about interviews."
          ],
          "source": {
            "bookPage": 292,
            "step": 28,
            "entry": "0927",
            "headword": "advice",
            "unit": "e0927",
            "target": "e0927",
            "id": "full-e0927-similar-1",
            "references": [
              {
                "bookPage": 292,
                "step": 28,
                "entry": "0927",
                "headword": "advice",
                "unit": "e0927",
                "target": "e0927"
              }
            ],
            "sourceIds": [
              "full-e0927-similar-1"
            ]
          }
        },
        {
          "id": "count-pointer",
          "text": "pointer",
          "correctBins": [
            "countable"
          ],
          "steps": [
            {
              "id": "count-pointer-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 장비",
                "(n) 정보",
                "(n) 가구",
                "(n) 조언 한 가지"
              ],
              "answer": 3
            }
          ],
          "note": "advice: 충고, 조언. 함께 확인할 표현: tips / pointers. 문맥과 문장 구조에 맞춰 사용해요. 의미 재표현이며 advice는 불가산, tips·pointers는 복수 가산. 문장 치환 시 수일치·한정사 조정.",
          "examples": [
            "The advisor gave us useful advice about interviews."
          ],
          "source": {
            "bookPage": 292,
            "step": 28,
            "entry": "0927",
            "headword": "advice",
            "unit": "e0927",
            "target": "e0927",
            "id": "full-e0927-similar-2",
            "references": [
              {
                "bookPage": 292,
                "step": 28,
                "entry": "0927",
                "headword": "advice",
                "unit": "e0927",
                "target": "e0927"
              }
            ],
            "sourceIds": [
              "full-e0927-similar-2"
            ]
          }
        },
        {
          "id": "count-garment",
          "text": "garment",
          "correctBins": [
            "countable"
          ],
          "steps": [
            {
              "id": "count-garment-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 의복 한 벌",
                "(n) 조언",
                "(n) 장비",
                "(n) 정보"
              ],
              "answer": 0
            }
          ],
          "note": "garment: 의복, 의류. 함께 확인할 표현: attire / clothing. 문맥과 문장 구조에 맞춰 사용해요. garment는 가산, attire·clothing은 불가산. 문장 치환 시 garments are→clothing is와 같이 수일치 변경 필요.",
          "examples": [
            "The store sells garments made from recycled fabric."
          ],
          "source": {
            "bookPage": 299,
            "step": 28,
            "entry": "0950",
            "headword": "garment",
            "unit": "e0950",
            "target": "e0950",
            "id": "full-e0950-similar-1",
            "references": [
              {
                "bookPage": 299,
                "step": 28,
                "entry": "0950",
                "headword": "garment",
                "unit": "e0950",
                "target": "e0950"
              }
            ],
            "sourceIds": [
              "full-e0950-similar-1"
            ]
          }
        },
        {
          "id": "count-attire",
          "text": "attire",
          "correctBins": [
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-attire-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 장비",
                "(n) 정보",
                "(n) 의복·복장"
              ],
              "answer": 3
            }
          ],
          "note": "garment: 의복, 의류. 함께 확인할 표현: attire / clothing. 문맥과 문장 구조에 맞춰 사용해요. garment는 가산, attire·clothing은 불가산. 문장 치환 시 garments are→clothing is와 같이 수일치 변경 필요.",
          "examples": [
            "The store sells garments made from recycled fabric."
          ],
          "source": {
            "bookPage": 299,
            "step": 28,
            "entry": "0950",
            "headword": "garment",
            "unit": "e0950",
            "target": "e0950",
            "id": "full-e0950-similar-1",
            "references": [
              {
                "bookPage": 299,
                "step": 28,
                "entry": "0950",
                "headword": "garment",
                "unit": "e0950",
                "target": "e0950"
              }
            ],
            "sourceIds": [
              "full-e0950-similar-1"
            ]
          }
        },
        {
          "id": "count-room",
          "text": "room",
          "correctBins": [
            "countable",
            "uncountable"
          ],
          "steps": [
            {
              "id": "count-room-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(n) 조언",
                "(n) 장비",
                "(n) 정보",
                "(n) 방·객실 / 공간·자리 / 여지·가능성"
              ],
              "answer": 3
            }
          ],
          "note": "방·객실 뜻은 a room처럼 세고, 공간·자리 및 여지·가능성 뜻은 불가산으로 써요. 교재의 의미별 예문을 구별하세요.",
          "examples": [
            "We booked a room with a view.",
            "There is room for one more desk.",
            "There is still room for improvement.",
            "Please make room for the new equipment."
          ],
          "source": {
            "bookPage": 209,
            "step": 19,
            "entry": "0639",
            "headword": "room",
            "unit": "e0639",
            "target": "e0639-s1",
            "id": "full-e0639-s1-similar-1",
            "references": [
              {
                "bookPage": 209,
                "step": 19,
                "entry": "0639",
                "headword": "room",
                "unit": "e0639",
                "target": "e0639-s1"
              },
              {
                "bookPage": 209,
                "step": 19,
                "entry": "0639",
                "headword": "room",
                "unit": "e0639",
                "target": "e0639-s2"
              },
              {
                "bookPage": 209,
                "step": 19,
                "entry": "0639",
                "headword": "room",
                "unit": "e0639",
                "target": "e0639-s3"
              },
              {
                "bookPage": 303,
                "step": 29,
                "entry": "0962",
                "headword": "room",
                "unit": "e0962",
                "target": "e0962"
              }
            ],
            "sourceIds": [
              "full-e0639-s1-similar-1",
              "full-e0639-s2-similar-1",
              "full-e0639-s3-similar-1",
              "full-e0962-similar-1"
            ]
          }
        }
      ]
    },
    {
      "id": "suffix-forms",
      "title": "대표 접미어·어형",
      "bins": [
        {
          "id": "noun",
          "label": "명사"
        },
        {
          "id": "adjective",
          "label": "형용사"
        },
        {
          "id": "verb",
          "label": "동사"
        },
        {
          "id": "adverb",
          "label": "부사"
        }
      ],
      "instruction": "교재에 실린 대표 끝모양과 확인한 예시의 품사를 모두 선택하세요. 모든 영어 단어에 예외 없이 적용하는 규칙은 아니에요.",
      "cards": [
        {
          "id": "form-tion",
          "text": "-tion",
          "correctBins": [
            "noun"
          ],
          "steps": [],
          "note": "organization처럼 -tion은 교재의 대표 명사 어형이에요. 모든 단어의 품사를 보장하는 규칙은 아니에요. 교재는 question이 명사·동사 모두 된다는 예외도 설명해요.",
          "examples": [
            "organization (n): 조직",
            "question (n): 질문 / (3V): 질문하다 — 교재의 예외"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 102,
            "id": "usage1-qs-p102-organization",
            "sourceIds": [
              "usage1-qs-p102-organization"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 102,
                "pdfPage": 103,
                "scope": "noun-forms",
                "section": "대표 명사 어형",
                "headword": "organization",
                "unit": "qs-p102-organization",
                "target": "qs-p102-organization",
                "pages": [
                  102
                ]
              }
            ]
          }
        },
        {
          "id": "form-ment",
          "text": "-ment",
          "correctBins": [
            "noun"
          ],
          "steps": [],
          "note": "교재의 대표 명사 어형으로 movement를 배워요. 단어 끝모양만으로 모든 단어의 품사를 단정하지는 않아요.",
          "examples": [
            "movement (n): 이동",
            "The sensor detects movement near the entrance.: 센서가 입구 근처의 움직임을 감지한다."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 102,
            "id": "usage1-qs-p102-movement",
            "sourceIds": [
              "usage1-qs-p102-movement"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 102,
                "pdfPage": 103,
                "scope": "noun-forms",
                "section": "대표 명사 어형",
                "headword": "movement",
                "unit": "qs-p102-movement",
                "target": "qs-p102-movement",
                "pages": [
                  102
                ]
              }
            ]
          }
        },
        {
          "id": "form-ness",
          "text": "-ness",
          "correctBins": [
            "noun"
          ],
          "steps": [],
          "note": "형용사 effective와 연결되는 effectiveness는 명사예요. 교재의 대표 명사 어형 -ness를 확인해요.",
          "examples": [
            "effectiveness (n): 효과성",
            "We evaluated the effectiveness of the training.: 교육의 효과성을 평가했다."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 102,
            "id": "usage1-qs-p102-effectiveness",
            "sourceIds": [
              "usage1-qs-p102-effectiveness"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 102,
                "pdfPage": 103,
                "scope": "noun-forms",
                "section": "대표 명사 어형",
                "headword": "effectiveness",
                "unit": "qs-p102-effectiveness",
                "target": "qs-p102-effectiveness",
                "pages": [
                  102
                ]
              }
            ]
          }
        },
        {
          "id": "form-ance",
          "text": "-ance",
          "correctBins": [
            "noun"
          ],
          "steps": [],
          "note": "교재는 attendance를 대표 명사 어형으로 제시해요. attend와 구별해서 외워요.",
          "examples": [
            "attendance (n): 참석, 출석",
            "Attendance at the safety meeting is required.: 안전 회의 참석이 필수다."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 102,
            "id": "usage1-qs-p102-attendance",
            "sourceIds": [
              "usage1-qs-p102-attendance"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 102,
                "pdfPage": 103,
                "scope": "noun-forms",
                "section": "대표 명사 어형",
                "headword": "attendance",
                "unit": "qs-p102-attendance",
                "target": "qs-p102-attendance",
                "pages": [
                  102
                ]
              }
            ]
          }
        },
        {
          "id": "form-ous",
          "text": "-ous",
          "correctBins": [
            "adjective"
          ],
          "steps": [],
          "note": "dangerous는 교재의 대표 형용사예요. -ous라는 끝모양을 dangerous와 연결해 기억해요.",
          "examples": [
            "dangerous (adj): 위험한",
            "The damaged cable is dangerous.: 손상된 케이블은 위험하다."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 111,
            "id": "usage1-qs-p111-dangerous",
            "sourceIds": [
              "usage1-qs-p111-dangerous"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "adjective-forms",
                "section": "대표 형용사 어형",
                "headword": "dangerous",
                "unit": "qs-p111-dangerous",
                "target": "qs-p111-dangerous",
                "pages": [
                  111
                ]
              }
            ]
          }
        },
        {
          "id": "form-ive",
          "text": "-ive",
          "correctBins": [
            "adjective"
          ],
          "steps": [],
          "note": "innovative는 교재의 대표 형용사예요. 명사 innovation과 품사를 구별해요.",
          "examples": [
            "innovative (adj): 혁신적인",
            "The team developed an innovative solution.: 팀이 혁신적인 해결책을 개발했다."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 111,
            "id": "usage1-qs-p111-innovative",
            "sourceIds": [
              "usage1-qs-p111-innovative"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "adjective-forms",
                "section": "대표 형용사 어형",
                "headword": "innovative",
                "unit": "qs-p111-innovative",
                "target": "qs-p111-innovative",
                "pages": [
                  111
                ]
              }
            ]
          }
        },
        {
          "id": "form-less",
          "text": "-less",
          "correctBins": [
            "adjective"
          ],
          "steps": [],
          "note": "useless는 교재의 대표 형용사예요. 교재는 nevertheless가 부사라는 예외도 따로 설명하므로, 끝모양을 절대 규칙으로 외우지 않아요.",
          "examples": [
            "useless (adj): 쓸모없는",
            "nevertheless (adv): 그럼에도 불구하고 — 교재의 예외"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 111,
            "id": "usage1-qs-p111-useless",
            "sourceIds": [
              "usage1-qs-p111-useless"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "adjective-forms",
                "section": "대표 형용사 어형",
                "headword": "useless",
                "unit": "qs-p111-useless",
                "target": "qs-p111-useless",
                "pages": [
                  111
                ]
              }
            ]
          }
        },
        {
          "id": "form-al",
          "text": "-al",
          "correctBins": [
            "noun",
            "adjective"
          ],
          "steps": [],
          "note": "교재 111쪽의 official은 대표 형용사이고, 105쪽의 approval은 명사예요. 이 끝모양은 두 품사의 학습 단어에서 확인돼요. official 자체도 고위 관료라는 뜻일 때는 명사예요.",
          "examples": [
            "official (adj): 공식적인 — 퀵스타트 111쪽",
            "approval (n): 승인 — 퀵스타트 105쪽"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 111,
            "id": "usage1-qs-p111-official",
            "related": [
              {
                "bookPage": 105,
                "id": "usage1-qs-p105-approval"
              }
            ],
            "sourceIds": [
              "usage1-qs-p111-official"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "adjective-forms",
                "section": "대표 형용사 어형",
                "headword": "official",
                "unit": "qs-p111-official",
                "target": "qs-p111-official",
                "pages": [
                  111
                ]
              }
            ]
          }
        },
        {
          "id": "form-ly",
          "text": "-ly",
          "correctBins": [
            "adjective",
            "adverb"
          ],
          "steps": [],
          "note": "regularly는 부사이고 costly는 형용사예요. -ly로 끝난다고 무조건 부사로 분류하지 않아요. costly의 형용사 쓰임은 퀵스타트 110쪽 예문과 VOCA 46쪽에서 확인돼요.",
          "examples": [
            "regularly (adv): 정기적으로 — 퀵스타트 114쪽",
            "costly (adj): 비용이 많이 드는 — 퀵스타트 110쪽 / VOCA 46쪽"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 114,
            "id": "qs-p114-regularly",
            "related": [
              {
                "book": "quickstart",
                "bookPage": 110
              },
              {
                "book": "voca",
                "bookPage": 46,
                "entry": "0111",
                "id": "full-e0111-x3-meaning"
              }
            ],
            "sourceIds": [
              "qs-p114-regularly"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 114,
                "pdfPage": 115,
                "scope": "tense-expressions",
                "section": "시제 부사",
                "headword": "regularly",
                "unit": "qs-p114-regularly",
                "target": "qs-p114-regularly",
                "pages": [
                  114
                ]
              }
            ]
          }
        },
        {
          "id": "form-ize",
          "text": "-ize",
          "correctBins": [
            "verb"
          ],
          "steps": [],
          "note": "교재에서 that절을 목적어로 받는 realize를 배워요. 이 카드에서는 realize로 확인한 대표 동사 끝모양을 묶어요. 교재 102·111쪽의 명사·형용사 표와는 별도로, 실제 학습 단어를 기준으로 한 카드예요.",
          "examples": [
            "realize (3V): 깨닫다",
            "We realized that the file was missing.: 우리는 파일이 없어진 것을 깨달았다."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 179,
            "id": "qs-p179-realize-that-c1bc77a1b973",
            "sourceIds": [
              "qs-p179-realize-that-c1bc77a1b973"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 179,
                "pdfPage": 180,
                "scope": "verb-that",
                "section": "동사 + that절",
                "headword": "realize + that절",
                "unit": "qs-p179-realize-that-c1bc77a1b973",
                "target": "qs-p179-realize-that-c1bc77a1b973",
                "pages": [
                  179
                ]
              }
            ]
          }
        },
        {
          "id": "form-sion",
          "text": "-sion",
          "correctBins": [
            "noun"
          ],
          "steps": [],
          "note": "교재의 대표 명사 끝모양이에요. conclusion : 결론. 끝모양만으로 모든 단어의 품사를 단정하지 않아요.",
          "examples": [
            "conclusion : 결론"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 102,
            "pdfPage": 103,
            "scope": "noun-forms",
            "section": "대표 명사 어형",
            "headword": "conclusion",
            "unit": "qs-p102-conclusion",
            "target": "qs-p102-conclusion",
            "pages": [
              102
            ],
            "id": "qs-p102-conclusion",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 102,
                "pdfPage": 103,
                "scope": "noun-forms",
                "section": "대표 명사 어형",
                "headword": "conclusion",
                "unit": "qs-p102-conclusion",
                "target": "qs-p102-conclusion",
                "pages": [
                  102
                ]
              }
            ],
            "sourceIds": [
              "qs-p102-conclusion"
            ]
          }
        },
        {
          "id": "form-er-or",
          "text": "-er / -or",
          "correctBins": [
            "noun"
          ],
          "steps": [],
          "note": "교재의 대표 명사 끝모양이에요. teacher : 선생님. 끝모양만으로 모든 단어의 품사를 단정하지 않아요.",
          "examples": [
            "teacher : 선생님"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 102,
            "pdfPage": 103,
            "scope": "noun-forms",
            "section": "대표 명사 어형",
            "headword": "teacher",
            "unit": "qs-p102-teacher",
            "target": "qs-p102-teacher",
            "pages": [
              102
            ],
            "id": "qs-p102-teacher",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 102,
                "pdfPage": 103,
                "scope": "noun-forms",
                "section": "대표 명사 어형",
                "headword": "teacher",
                "unit": "qs-p102-teacher",
                "target": "qs-p102-teacher",
                "pages": [
                  102
                ]
              }
            ],
            "sourceIds": [
              "qs-p102-teacher"
            ]
          }
        },
        {
          "id": "form-ist",
          "text": "-ist",
          "correctBins": [
            "noun"
          ],
          "steps": [],
          "note": "교재의 대표 명사 끝모양이에요. pianist : 피아니스트. 끝모양만으로 모든 단어의 품사를 단정하지 않아요.",
          "examples": [
            "pianist : 피아니스트"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 102,
            "pdfPage": 103,
            "scope": "noun-forms",
            "section": "대표 명사 어형",
            "headword": "pianist",
            "unit": "qs-p102-pianist",
            "target": "qs-p102-pianist",
            "pages": [
              102
            ],
            "id": "qs-p102-pianist",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 102,
                "pdfPage": 103,
                "scope": "noun-forms",
                "section": "대표 명사 어형",
                "headword": "pianist",
                "unit": "qs-p102-pianist",
                "target": "qs-p102-pianist",
                "pages": [
                  102
                ]
              }
            ],
            "sourceIds": [
              "qs-p102-pianist"
            ]
          }
        },
        {
          "id": "form-ee",
          "text": "-ee",
          "correctBins": [
            "noun"
          ],
          "steps": [],
          "note": "교재의 대표 명사 끝모양이에요. employee : 직원. 끝모양만으로 모든 단어의 품사를 단정하지 않아요.",
          "examples": [
            "employee : 직원"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 102,
            "pdfPage": 103,
            "scope": "noun-forms",
            "section": "대표 명사 어형",
            "headword": "employee",
            "unit": "qs-p102-employee",
            "target": "qs-p102-employee",
            "pages": [
              102
            ],
            "id": "qs-p102-employee",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 102,
                "pdfPage": 103,
                "scope": "noun-forms",
                "section": "대표 명사 어형",
                "headword": "employee",
                "unit": "qs-p102-employee",
                "target": "qs-p102-employee",
                "pages": [
                  102
                ]
              }
            ],
            "sourceIds": [
              "qs-p102-employee"
            ]
          }
        },
        {
          "id": "form-th",
          "text": "-th",
          "correctBins": [
            "noun"
          ],
          "steps": [],
          "note": "교재의 대표 명사 끝모양이에요. growth : 성장. 끝모양만으로 모든 단어의 품사를 단정하지 않아요.",
          "examples": [
            "growth : 성장"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 102,
            "pdfPage": 103,
            "scope": "noun-forms",
            "section": "대표 명사 어형",
            "headword": "growth",
            "unit": "qs-p102-growth",
            "target": "qs-p102-growth",
            "pages": [
              102
            ],
            "id": "qs-p102-growth",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 102,
                "pdfPage": 103,
                "scope": "noun-forms",
                "section": "대표 명사 어형",
                "headword": "growth",
                "unit": "qs-p102-growth",
                "target": "qs-p102-growth",
                "pages": [
                  102
                ]
              }
            ],
            "sourceIds": [
              "qs-p102-growth"
            ]
          }
        },
        {
          "id": "form-ure",
          "text": "-ure",
          "correctBins": [
            "noun"
          ],
          "steps": [],
          "note": "교재의 대표 명사 끝모양이에요. closure : 폐쇄. 끝모양만으로 모든 단어의 품사를 단정하지 않아요.",
          "examples": [
            "closure : 폐쇄"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 102,
            "pdfPage": 103,
            "scope": "noun-forms",
            "section": "대표 명사 어형",
            "headword": "closure",
            "unit": "qs-p102-closure",
            "target": "qs-p102-closure",
            "pages": [
              102
            ],
            "id": "qs-p102-closure",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 102,
                "pdfPage": 103,
                "scope": "noun-forms",
                "section": "대표 명사 어형",
                "headword": "closure",
                "unit": "qs-p102-closure",
                "target": "qs-p102-closure",
                "pages": [
                  102
                ]
              }
            ],
            "sourceIds": [
              "qs-p102-closure"
            ]
          }
        },
        {
          "id": "form-ty-cy",
          "text": "-ty / -cy",
          "correctBins": [
            "noun"
          ],
          "steps": [],
          "note": "교재의 대표 명사 끝모양이에요. ability : 능력. 끝모양만으로 모든 단어의 품사를 단정하지 않아요.",
          "examples": [
            "ability : 능력"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 102,
            "pdfPage": 103,
            "scope": "noun-forms",
            "section": "대표 명사 어형",
            "headword": "ability",
            "unit": "qs-p102-ability",
            "target": "qs-p102-ability",
            "pages": [
              102
            ],
            "id": "qs-p102-ability",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 102,
                "pdfPage": 103,
                "scope": "noun-forms",
                "section": "대표 명사 어형",
                "headword": "ability",
                "unit": "qs-p102-ability",
                "target": "qs-p102-ability",
                "pages": [
                  102
                ]
              }
            ],
            "sourceIds": [
              "qs-p102-ability"
            ]
          }
        },
        {
          "id": "form-ism",
          "text": "-ism",
          "correctBins": [
            "noun"
          ],
          "steps": [],
          "note": "교재의 대표 명사 끝모양이에요. professionalism : 전문성. 끝모양만으로 모든 단어의 품사를 단정하지 않아요.",
          "examples": [
            "professionalism : 전문성"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 102,
            "pdfPage": 103,
            "scope": "noun-forms",
            "section": "대표 명사 어형",
            "headword": "professionalism",
            "unit": "qs-p102-professionalism",
            "target": "qs-p102-professionalism",
            "pages": [
              102
            ],
            "id": "qs-p102-professionalism",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 102,
                "pdfPage": 103,
                "scope": "noun-forms",
                "section": "대표 명사 어형",
                "headword": "professionalism",
                "unit": "qs-p102-professionalism",
                "target": "qs-p102-professionalism",
                "pages": [
                  102
                ]
              }
            ],
            "sourceIds": [
              "qs-p102-professionalism"
            ]
          }
        },
        {
          "id": "form-ful",
          "text": "-ful",
          "correctBins": [
            "adjective"
          ],
          "steps": [],
          "note": "교재의 대표 형용사 끝모양이에요. grateful : 고마워하는. 끝모양만으로 모든 단어의 품사를 단정하지 않아요.",
          "examples": [
            "grateful : 고마워하는"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 111,
            "pdfPage": 112,
            "scope": "adjective-forms",
            "section": "대표 형용사 어형",
            "headword": "grateful",
            "unit": "qs-p111-grateful",
            "target": "qs-p111-grateful",
            "pages": [
              111
            ],
            "id": "qs-p111-grateful",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "adjective-forms",
                "section": "대표 형용사 어형",
                "headword": "grateful",
                "unit": "qs-p111-grateful",
                "target": "qs-p111-grateful",
                "pages": [
                  111
                ]
              }
            ],
            "sourceIds": [
              "qs-p111-grateful"
            ]
          }
        },
        {
          "id": "form-ory",
          "text": "-ory",
          "correctBins": [
            "adjective"
          ],
          "steps": [],
          "note": "교재의 대표 형용사 끝모양이에요. mandatory : 의무적인. 끝모양만으로 모든 단어의 품사를 단정하지 않아요.",
          "examples": [
            "mandatory : 의무적인"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 111,
            "pdfPage": 112,
            "scope": "adjective-forms",
            "section": "대표 형용사 어형",
            "headword": "mandatory",
            "unit": "qs-p111-mandatory",
            "target": "qs-p111-mandatory",
            "pages": [
              111
            ],
            "id": "qs-p111-mandatory",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "adjective-forms",
                "section": "대표 형용사 어형",
                "headword": "mandatory",
                "unit": "qs-p111-mandatory",
                "target": "qs-p111-mandatory",
                "pages": [
                  111
                ]
              }
            ],
            "sourceIds": [
              "qs-p111-mandatory"
            ]
          }
        },
        {
          "id": "form-ary",
          "text": "-ary",
          "correctBins": [
            "adjective"
          ],
          "steps": [],
          "note": "교재의 대표 형용사 끝모양이에요. temporary : 일시적인. 끝모양만으로 모든 단어의 품사를 단정하지 않아요.",
          "examples": [
            "temporary : 일시적인"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 111,
            "pdfPage": 112,
            "scope": "adjective-forms",
            "section": "대표 형용사 어형",
            "headword": "temporary",
            "unit": "qs-p111-temporary",
            "target": "qs-p111-temporary",
            "pages": [
              111
            ],
            "id": "qs-p111-temporary",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "adjective-forms",
                "section": "대표 형용사 어형",
                "headword": "temporary",
                "unit": "qs-p111-temporary",
                "target": "qs-p111-temporary",
                "pages": [
                  111
                ]
              }
            ],
            "sourceIds": [
              "qs-p111-temporary"
            ]
          }
        },
        {
          "id": "form-able",
          "text": "-able",
          "correctBins": [
            "adjective"
          ],
          "steps": [],
          "note": "교재의 대표 형용사 끝모양이에요. reliable : 믿을 만한. 끝모양만으로 모든 단어의 품사를 단정하지 않아요.",
          "examples": [
            "reliable : 믿을 만한"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 111,
            "pdfPage": 112,
            "scope": "adjective-forms",
            "section": "대표 형용사 어형",
            "headword": "reliable",
            "unit": "qs-p111-reliable",
            "target": "qs-p111-reliable",
            "pages": [
              111
            ],
            "id": "qs-p111-reliable",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "adjective-forms",
                "section": "대표 형용사 어형",
                "headword": "reliable",
                "unit": "qs-p111-reliable",
                "target": "qs-p111-reliable",
                "pages": [
                  111
                ]
              }
            ],
            "sourceIds": [
              "qs-p111-reliable"
            ]
          }
        },
        {
          "id": "form-ant",
          "text": "-ant",
          "correctBins": [
            "noun",
            "adjective"
          ],
          "steps": [],
          "note": "-ant는 reliant(의존적인) 같은 형용사와 participant(참석자) 같은 명사에 모두 나타나요. 교재 111쪽의 예외도 함께 분류해요.",
          "examples": [
            "reliant : 의존적인",
            "participant : (n) 참석자"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 111,
            "pdfPage": 112,
            "scope": "adjective-forms",
            "section": "대표 형용사 어형",
            "headword": "reliant",
            "unit": "qs-p111-reliant",
            "target": "qs-p111-reliant",
            "pages": [
              111
            ],
            "id": "qs-p111-reliant",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "adjective-forms",
                "section": "대표 형용사 어형",
                "headword": "reliant",
                "unit": "qs-p111-reliant",
                "target": "qs-p111-reliant",
                "pages": [
                  111
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "adjective-forms",
                "section": "형용사 어형 예외",
                "headword": "participant",
                "unit": "qs-p111-participant",
                "target": "qs-p111-participant",
                "pages": [
                  111
                ]
              }
            ],
            "sourceIds": [
              "qs-p111-reliant",
              "qs-p111-participant"
            ]
          }
        },
        {
          "id": "form-ent",
          "text": "-ent",
          "correctBins": [
            "adjective"
          ],
          "steps": [],
          "note": "교재의 대표 형용사 끝모양이에요. efficient : 효율적인. 끝모양만으로 모든 단어의 품사를 단정하지 않아요.",
          "examples": [
            "efficient : 효율적인"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 111,
            "pdfPage": 112,
            "scope": "adjective-forms",
            "section": "대표 형용사 어형",
            "headword": "efficient",
            "unit": "qs-p111-efficient",
            "target": "qs-p111-efficient",
            "pages": [
              111
            ],
            "id": "qs-p111-efficient",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 111,
                "pdfPage": 112,
                "scope": "adjective-forms",
                "section": "대표 형용사 어형",
                "headword": "efficient",
                "unit": "qs-p111-efficient",
                "target": "qs-p111-efficient",
                "pages": [
                  111
                ]
              }
            ],
            "sourceIds": [
              "qs-p111-efficient"
            ]
          }
        }
      ]
    },
    {
      "id": "comparison-modifiers",
      "title": "비교급·최상급 강조",
      "bins": [
        {
          "id": "comparative",
          "label": "비교급 강조"
        },
        {
          "id": "superlative",
          "label": "최상급 강조"
        }
      ],
      "instruction": "교재 185쪽의 대표 비교급·최상급 강조 구문을 기준으로 모두 분류하세요. 최상급 뒤에 오는 표현도 포함해요.",
      "cards": [
        {
          "id": "compare-much",
          "text": "much",
          "correctBins": [
            "comparative",
            "superlative"
          ],
          "steps": [
            {
              "id": "compare-much-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(adv) 조금 / 약간",
                "(adv) 훨씬 / 단연코",
                "(adv) 거의 / 대략",
                "(adv) 점차 / 서서히"
              ],
              "answer": 1
            }
          ],
          "note": "much + 비교급과 much + the + 최상급이 교재에 모두 나와요. much shorter, much the best처럼 위치도 함께 확인해요.",
          "examples": [
            "much shorter: 훨씬 더 짧은",
            "much the best: 단연코 가장 좋은"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "id": "qs-p185-much-comparative",
            "related": [
              "qs-p185-much-superlative"
            ],
            "sourceIds": [
              "qs-p185-much-comparative",
              "qs-p185-much-superlative"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "비교급 강조 부사",
                "headword": "much + 비교급",
                "unit": "qs-p185-much-comparative",
                "target": "qs-p185-much-comparative",
                "pages": [
                  185
                ]
              },
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "최상급 강조 부사",
                "headword": "much + the + 최상급",
                "unit": "qs-p185-much-superlative",
                "target": "qs-p185-much-superlative",
                "pages": [
                  185
                ]
              }
            ]
          }
        },
        {
          "id": "compare-even",
          "text": "even",
          "correctBins": [
            "comparative"
          ],
          "steps": [
            {
              "id": "compare-even-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(adv) 거의 비슷하게",
                "(adv) 약간 덜",
                "(adv) 한층 더",
                "(adv) 대략 똑같이"
              ],
              "answer": 2
            }
          ],
          "note": "교재의 대표 결합은 even + 비교급이에요. even faster처럼 비교 차이를 강조해요.",
          "examples": [
            "The new scanner is even faster than the previous model.: 새 스캐너는 이전 모델보다 한층 더 빠르다."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "id": "qs-p185-even-comparative",
            "sourceIds": [
              "qs-p185-even-comparative"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "비교급 강조 부사",
                "headword": "even + 비교급",
                "unit": "qs-p185-even-comparative",
                "target": "qs-p185-even-comparative",
                "pages": [
                  185
                ]
              }
            ]
          }
        },
        {
          "id": "compare-still",
          "text": "still",
          "correctBins": [
            "comparative"
          ],
          "steps": [
            {
              "id": "compare-still-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(adv) 더욱 더",
                "(adv) 거의 비슷하게",
                "(adv) 약간 덜",
                "(adv) 대략 똑같이"
              ],
              "answer": 0
            }
          ],
          "note": "이 카드에서는 still lower처럼 비교급을 강조하는 쓰임을 묻고 있어요. still의 다른 문맥 뜻과 구별해요.",
          "examples": [
            "Today's offer is still lower than the earlier quotation.: 오늘 제시한 가격은 이전 견적보다 더욱 낮다."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "id": "qs-p185-still-comparative",
            "sourceIds": [
              "qs-p185-still-comparative"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "비교급 강조 부사",
                "headword": "still + 비교급",
                "unit": "qs-p185-still-comparative",
                "target": "qs-p185-still-comparative",
                "pages": [
                  185
                ]
              }
            ]
          }
        },
        {
          "id": "compare-far",
          "text": "far",
          "correctBins": [
            "comparative"
          ],
          "steps": [
            {
              "id": "compare-far-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(adv) 조금",
                "(adv) 거의",
                "(adv) 똑같이",
                "(adv) 훨씬"
              ],
              "answer": 3
            }
          ],
          "note": "교재의 대표 결합은 far + 비교급이에요. far more favorable처럼 긴 비교급도 강조해요.",
          "examples": [
            "far more favorable than the previous terms: 이전 조건보다 훨씬 더 유리한"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "id": "qs-p185-far-comparative",
            "sourceIds": [
              "qs-p185-far-comparative"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "비교급 강조 부사",
                "headword": "far + 비교급",
                "unit": "qs-p185-far-comparative",
                "target": "qs-p185-far-comparative",
                "pages": [
                  185
                ]
              }
            ]
          }
        },
        {
          "id": "compare-a-lot",
          "text": "a lot",
          "correctBins": [
            "comparative"
          ],
          "steps": [
            {
              "id": "compare-a-lot-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(adv구) 거의",
                "(adv구) 훨씬",
                "(adv구) 조금",
                "(adv구) 똑같이"
              ],
              "answer": 1
            }
          ],
          "note": "교재의 대표 결합은 a lot + 비교급이에요. a lot more reliable처럼 써요.",
          "examples": [
            "a lot more reliable than the old equipment: 예전 장비보다 훨씬 더 믿을 만한"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "id": "qs-p185-a-lot-comparative",
            "sourceIds": [
              "qs-p185-a-lot-comparative"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "비교급 강조 부사",
                "headword": "a lot + 비교급",
                "unit": "qs-p185-a-lot-comparative",
                "target": "qs-p185-a-lot-comparative",
                "pages": [
                  185
                ]
              }
            ]
          }
        },
        {
          "id": "compare-considerably",
          "text": "considerably",
          "correctBins": [
            "comparative"
          ],
          "steps": [
            {
              "id": "compare-considerably-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(adv) 약간",
                "(adv) 거의",
                "(adv) 상당히",
                "(adv) 똑같이"
              ],
              "answer": 2
            }
          ],
          "note": "교재의 대표 결합은 considerably + 비교급이에요. 상당한 차이를 나타내요.",
          "examples": [
            "considerably lighter than the old one: 예전 것보다 상당히 더 가벼운"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "id": "qs-p185-considerably-comparative",
            "sourceIds": [
              "qs-p185-considerably-comparative"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "비교급 강조 부사",
                "headword": "considerably + 비교급",
                "unit": "qs-p185-considerably-comparative",
                "target": "qs-p185-considerably-comparative",
                "pages": [
                  185
                ]
              }
            ]
          }
        },
        {
          "id": "compare-significantly",
          "text": "significantly",
          "correctBins": [
            "comparative"
          ],
          "steps": [
            {
              "id": "compare-significantly-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(adv) 상당히",
                "(adv) 약간",
                "(adv) 거의",
                "(adv) 똑같이"
              ],
              "answer": 0
            }
          ],
          "note": "교재의 대표 결합은 significantly + 비교급이에요. significantly more efficient에서 더 효율적이라는 차이를 강조해요.",
          "examples": [
            "significantly more efficient: 상당히 더 효율적인"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "id": "qs-p185-significantly-comparative",
            "sourceIds": [
              "qs-p185-significantly-comparative"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "비교급 강조 부사",
                "headword": "significantly + 비교급",
                "unit": "qs-p185-significantly-comparative",
                "target": "qs-p185-significantly-comparative",
                "pages": [
                  185
                ]
              }
            ]
          }
        },
        {
          "id": "compare-by-far",
          "text": "by far",
          "correctBins": [
            "superlative"
          ],
          "steps": [
            {
              "id": "compare-by-far-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(adv구) 거의 비슷하게",
                "(adv구) 기껏해야",
                "(adv구) 조금 덜",
                "(adv구) 단연코"
              ],
              "answer": 3
            }
          ],
          "note": "이 연습에서 묻는 교재의 대표 결합은 by far + the + 최상급이에요. by far the cheapest처럼 최상급 앞에 놓아요.",
          "examples": [
            "by far the cheapest of all the plans: 모든 요금제 중 단연코 가장 저렴한"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "id": "qs-p185-by-far-superlative",
            "sourceIds": [
              "qs-p185-by-far-superlative"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "최상급 강조 부사",
                "headword": "by far + the + 최상급",
                "unit": "qs-p185-by-far-superlative",
                "target": "qs-p185-by-far-superlative",
                "pages": [
                  185
                ]
              }
            ]
          }
        },
        {
          "id": "compare-easily",
          "text": "easily",
          "correctBins": [
            "superlative"
          ],
          "steps": [
            {
              "id": "compare-easily-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(adv) 간신히",
                "(adv) 단연코",
                "(adv) 약간",
                "(adv) 거의"
              ],
              "answer": 1
            }
          ],
          "note": "이 카드의 easily는 최상급을 강조하는 단연코라는 뜻이에요. 교재의 대표 결합은 easily + the + 최상급이에요.",
          "examples": [
            "easily the most convenient option: 단연코 가장 편리한 선택지"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "id": "qs-p185-easily-superlative",
            "sourceIds": [
              "qs-p185-easily-superlative"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "최상급 강조 부사",
                "headword": "easily + the + 최상급",
                "unit": "qs-p185-easily-superlative",
                "target": "qs-p185-easily-superlative",
                "pages": [
                  185
                ]
              }
            ]
          }
        },
        {
          "id": "compare-very",
          "text": "very",
          "correctBins": [
            "superlative"
          ],
          "steps": [
            {
              "id": "compare-very-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "(adv) 거의, 대략",
                "(adv) 조금, 약간",
                "(adv) 바로 그, 정확히",
                "(adv) 점차, 서서히"
              ],
              "answer": 2
            }
          ],
          "note": "교재의 대표 결합은 the + very + 최상급이에요. the very earliest처럼 very를 the와 최상급 사이에 놓아요. very earlier처럼 비교급을 직접 강조하지 않아요.",
          "examples": [
            "the very earliest delivery date: 바로 그 가장 이른 배송일"
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "id": "qs-p185-very-superlative-order",
            "sourceIds": [
              "qs-p185-very-superlative-order"
            ],
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "최상급 강조 부사",
                "headword": "the + very + 최상급",
                "unit": "qs-p185-very-superlative-order",
                "target": "qs-p185-very-superlative-order",
                "pages": [
                  185
                ]
              }
            ]
          }
        },
        {
          "id": "compare-substantially",
          "text": "substantially",
          "correctBins": [
            "comparative"
          ],
          "steps": [
            {
              "id": "compare-substantially-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "약간",
                "거의",
                "전혀",
                "상당히, 크게"
              ],
              "answer": 3
            }
          ],
          "note": "substantially + 비교급: 상당히 더 ~한. 부사 substantially가 비교급 lower를 강조해요.",
          "examples": [
            "The total cost was substantially lower than our original estimate."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "pdfPage": 186,
            "scope": "comparison-modifiers",
            "section": "비교급 강조 부사",
            "headword": "substantially + 비교급",
            "unit": "qs-p185-substantially-comparative",
            "target": "qs-p185-substantially-comparative",
            "pages": [
              185
            ],
            "id": "qs-p185-substantially-comparative",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "비교급 강조 부사",
                "headword": "substantially + 비교급",
                "unit": "qs-p185-substantially-comparative",
                "target": "qs-p185-substantially-comparative",
                "pages": [
                  185
                ]
              }
            ],
            "sourceIds": [
              "qs-p185-substantially-comparative"
            ]
          }
        },
        {
          "id": "compare-yet",
          "text": "yet",
          "correctBins": [
            "superlative"
          ],
          "steps": [
            {
              "id": "compare-yet-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "즉시",
                "거의",
                "지금까지",
                "가끔"
              ],
              "answer": 2
            }
          ],
          "note": "최상급 + yet: 지금까지 가장 ~한. most durable이라는 최상급과 뒤의 yet이 결합해 '지금까지 가장 내구성이 좋은'이라는 뜻이 돼요. yet은 여기서 '아직 ~하지 않다'가 아니라 '지금까지'라는 뜻이에요.",
          "examples": [
            "This is our most durable battery yet."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "pdfPage": 186,
            "scope": "comparison-modifiers",
            "section": "최상급 뒤에서 강조",
            "headword": "최상급 + yet",
            "unit": "qs-p185-superlative-yet",
            "target": "qs-p185-superlative-yet",
            "pages": [
              185
            ],
            "id": "qs-p185-superlative-yet",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "최상급 뒤에서 강조",
                "headword": "최상급 + yet",
                "unit": "qs-p185-superlative-yet",
                "target": "qs-p185-superlative-yet",
                "pages": [
                  185
                ]
              }
            ],
            "sourceIds": [
              "qs-p185-superlative-yet"
            ]
          }
        },
        {
          "id": "compare-to-date",
          "text": "to date",
          "correctBins": [
            "superlative"
          ],
          "steps": [
            {
              "id": "compare-to-date-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "동시에",
                "반대로",
                "지금까지",
                "미리"
              ],
              "answer": 2
            }
          ],
          "note": "최상급 + to date: 지금까지 가장 ~한. 최상급 most thorough 뒤에 to date가 있어 '지금까지 가장 철저한'이라는 뜻이에요. our가 있으므로 이 문장에서는 the를 추가하지 않아요.",
          "examples": [
            "This was our most thorough audit to date."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "pdfPage": 186,
            "scope": "comparison-modifiers",
            "section": "최상급 뒤에서 강조",
            "headword": "최상급 + to date",
            "unit": "qs-p185-superlative-to-date",
            "target": "qs-p185-superlative-to-date",
            "pages": [
              185
            ],
            "id": "qs-p185-superlative-to-date",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "최상급 뒤에서 강조",
                "headword": "최상급 + to date",
                "unit": "qs-p185-superlative-to-date",
                "target": "qs-p185-superlative-to-date",
                "pages": [
                  185
                ]
              }
            ],
            "sourceIds": [
              "qs-p185-superlative-to-date"
            ]
          }
        },
        {
          "id": "compare-ever",
          "text": "ever",
          "correctBins": [
            "superlative"
          ],
          "steps": [
            {
              "id": "compare-ever-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "곧바로",
                "거의",
                "지금까지, 이제껏",
                "가끔"
              ],
              "answer": 2
            }
          ],
          "note": "최상급 + ever: 지금까지 가장 ~한. 최상급 most successful과 뒤의 ever가 '지금까지 가장 성공적인'이라는 뜻을 만들어요. 이때 ever의 철자는 even과 달라요.",
          "examples": [
            "The director called it our most successful product launch ever."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "pdfPage": 186,
            "scope": "comparison-modifiers",
            "section": "최상급 뒤에서 강조",
            "headword": "최상급 + ever",
            "unit": "qs-p185-superlative-ever",
            "target": "qs-p185-superlative-ever",
            "pages": [
              185
            ],
            "id": "qs-p185-superlative-ever",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "최상급 뒤에서 강조",
                "headword": "최상급 + ever",
                "unit": "qs-p185-superlative-ever",
                "target": "qs-p185-superlative-ever",
                "pages": [
                  185
                ]
              }
            ],
            "sourceIds": [
              "qs-p185-superlative-ever"
            ]
          }
        },
        {
          "id": "compare-possible",
          "text": "possible",
          "correctBins": [
            "superlative"
          ],
          "steps": [
            {
              "id": "compare-possible-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "불필요한",
                "가능한",
                "일시적인",
                "이전의"
              ],
              "answer": 1
            }
          ],
          "note": "최상급 표현 + possible: 가능한 한 가장 ~한. 형용사 possible이 최상급이 포함된 명사구 the lowest price 뒤에 와서 '가능한 가장 낮은 가격'이라는 뜻을 만들어요. possible은 부사가 아니에요. 이 표현은 부사가 아니라 최상급 명사구 뒤의 형용사예요.",
          "examples": [
            "We negotiated the lowest price possible."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "pdfPage": 186,
            "scope": "comparison-modifiers",
            "section": "PLUS 최상급 뒤에서 강조하는 형용사",
            "headword": "최상급 표현 + possible",
            "unit": "qs-p185-superlative-possible",
            "target": "qs-p185-superlative-possible",
            "pages": [
              185
            ],
            "id": "qs-p185-superlative-possible",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "PLUS 최상급 뒤에서 강조하는 형용사",
                "headword": "최상급 표현 + possible",
                "unit": "qs-p185-superlative-possible",
                "target": "qs-p185-superlative-possible",
                "pages": [
                  185
                ]
              }
            ],
            "sourceIds": [
              "qs-p185-superlative-possible"
            ]
          }
        },
        {
          "id": "compare-available",
          "text": "available",
          "correctBins": [
            "superlative"
          ],
          "steps": [
            {
              "id": "compare-available-meaning",
              "label": "핵심 뜻",
              "prompt": "교재에서 배운 이 쓰임의 핵심 뜻을 고르세요.",
              "options": [
                "의무적인",
                "이용 가능한",
                "위험한",
                "완료된"
              ],
              "answer": 1
            }
          ],
          "note": "최상급 표현 + available: 이용 가능한 것 중 가장 ~한. 형용사 available이 the most reliable resource라는 명사구 뒤에 와서 이용 가능한 자료라는 범위를 나타내요. available은 이 쓰임에서 부사가 아니에요. 이 표현은 부사가 아니라 최상급 명사구 뒤의 형용사예요.",
          "examples": [
            "The team used the most reliable resource available."
          ],
          "source": {
            "book": "quickstart",
            "bookPage": 185,
            "pdfPage": 186,
            "scope": "comparison-modifiers",
            "section": "PLUS 최상급 뒤에서 강조하는 형용사",
            "headword": "최상급 표현 + available",
            "unit": "qs-p185-superlative-available",
            "target": "qs-p185-superlative-available",
            "pages": [
              185
            ],
            "id": "qs-p185-superlative-available",
            "references": [
              {
                "book": "quickstart",
                "bookPage": 185,
                "pdfPage": 186,
                "scope": "comparison-modifiers",
                "section": "PLUS 최상급 뒤에서 강조하는 형용사",
                "headword": "최상급 표현 + available",
                "unit": "qs-p185-superlative-available",
                "target": "qs-p185-superlative-available",
                "pages": [
                  185
                ]
              }
            ],
            "sourceIds": [
              "qs-p185-superlative-available"
            ]
          }
        }
      ]
    }
  ],
  "coverage": {
    "prototypeCards": 60,
    "groups": {
      "verb-forms": 61,
      "verb-complements": 54,
      "link-usage": 111,
      "noun-countability": 39,
      "suffix-forms": 24,
      "comparison-modifiers": 16
    },
    "cards": 305,
    "meaningSteps": 306,
    "scope": "Printed Quickstart dedicated topic lists and explicit vocabulary frames; representative textbook uses, not an exhaustive dictionary.",
    "excluded": [
      "clothes: plural-only noun is not forced into the binary countability exercise",
      "p185 equality modifiers just/almost/nearly: outside the approved comparative/superlative bin set",
      "grammatical template questions without a sortable word; both/either/neither used only as determiners",
      "arbitrary verb-form inferences from Korean translations or ordinary phrasal-verb spellings"
    ]
  }
};
})(typeof window !== "undefined" ? window : globalThis);
