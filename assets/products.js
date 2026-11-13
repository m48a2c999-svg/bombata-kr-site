/* =========================================================
   봄바타 코리아 — 상품 데이터 (패브릭 라인 5종)
   ※ 가격·스마트스토어 링크·재고는 여기만 고치면 사이트 전체에 반영됩니다.
   ※ 가격을 바꾸면 supabase/functions/bombata-confirm/index.ts 의 PRICE 표도 같이 바꿔주세요
     (결제 금액 위변조 방지용 서버 검증표).
   ========================================================= */
window.SITE = {
  // 가격 근거: 국내총비용_가격과월매출_검토용(2026-09-24) — Wave·Riga(유로가 €65~68대) 119,000원 주력가 기준
  // 'preorder' = 사전예약(2027년 2월 순차출고 안내 표시) / 'live' = 일반판매
  mode: 'preorder',
  preorderNotice: '2027년 2월 신학기 런칭 · 사전예약 고객 순차 출고',
  // 토스페이먼츠 결제위젯 클라이언트 키
  //  - 지금 값은 토스페이먼츠 공식 문서용 "테스트 키" → 실제 돈이 빠져나가지 않습니다.
  //  - 짝이 되는 시크릿 키는 Supabase > Edge Functions > Secrets 의 TOSS_SECRET_KEY
  //  - PG 심사 통과 후 개발자센터 > API 키 > 결제위젯 연동 키(live_gck_...)로 교체
  tossClientKey: 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm',
  // 결제 승인 서버 (Supabase Edge Function, 연링크 프로젝트 공유)
  confirmUrl: 'https://qoyvpxtvcwkonwdtkdhk.supabase.co/functions/v1/bombata-confirm',
  freeShippingOver: 0,          // 0 = 전 상품 무료배송
  shippingFee: 3000,
  smartstoreHome: 'https://smartstore.naver.com/elmo_customart',
};

const CDN = 'https://cdn.shopify.com/s/files/1/0551/1348/2430/files/';
const img = (f, w = 1400) => /^(img\/|data:|https?:)/.test(f) ? f : `${CDN}${f}${f.includes('?') ? '&' : '?'}width=${w}`;

window.PRODUCTS = [
  {
    id: 'nylon-20',
    matImg: 'bombata_Nylon-2.0_G06.webp?v=1770307779',
    code: 'E00852',
    name: '나일론 2.0',
    en: 'Nylon 2.0',
    tagline: '고밀도 테크니컬 패브릭',
    material: '고밀도 테크니컬 패브릭(나일론 계열) · 내부 충격흡수 패딩',
    story: '봄바타의 베스트셀러 나일론 라인을 다시 설계한 2.0 버전. 촘촘하게 짜인 고밀도 테크니컬 패브릭이 긁힘과 마찰에 강하고, 앞면 외부 지퍼 포켓이 추가돼 지하철 카드·이어폰을 바로 꺼낼 수 있습니다.',
    price: 119000,
    euro: 67.9,
    size: '15.6"–16"',
    dims: '43 × 33 × 7 cm',
    laptop: '38 × 26 cm (15.6~16인치)',
    weight: '0.8 kg',
    badge: 'BEST',
    smartstore: '',
    colors: [
      { key: 'nero',   name: '네로 블랙',     it: 'Nero',           hex: '#1d1d1f', img: 'bombata_Nylon-2.0_15_4.png?v=1770307719' },
      { key: 'blu',    name: '블루 스쿠로',   it: 'Blu scuro',      hex: '#1f2a44', img: 'bombata_Nylon-2.0_15_11.png?v=1770307720' },
      { key: 'rosso',  name: '로쏘 보르고냐', it: 'Rosso borgogna', hex: '#6b1e2a', img: 'bombata_Nylon-2.0_15_30.png?v=1770307720' },
      { key: 'verde',  name: '베르데 그린',   it: 'Verde',          hex: '#3f5a3c', img: 'bombata_Nylon-2.0_15_7.png?v=1770307779' },
    ],
    gallery: ['bombata_Nylon-2.0_G01.webp?v=1770307779', 'bombata_Nylon-2.0_G02.webp?v=1770307779', 'bombata_Nylon-2.0_G03.webp?v=1770307779', 'bombata_Nylon-2.0_G06.webp?v=1770307779'],
  },
  {
    id: 'eco-camoscio',
    matImg: 'bombata_Eco-Camoscio_g03.webp?v=1793728792',
    code: 'E00699',
    name: '에코 카모시오',
    en: 'Eco Camoscio',
    tagline: '리사이클 스웨이드 터치',
    material: '외피 100% 재생 소재 · 스웨이드 질감 패브릭 마감',
    story: '이탈리아어로 "스웨이드"를 뜻하는 카모시오. 겉감은 100% 재생 소재로 만들었지만 손끝에 닿는 결은 진짜 스웨이드처럼 부드럽고, 빛의 방향에 따라 색이 미묘하게 달라집니다. 정장에도 니트에도 어울리는 가장 차분한 봄바타.',
    price: 119000,
    euro: 64.9,
    size: '15.6"–16"',
    dims: '43 × 33 × 7 cm',
    laptop: '38 × 26 cm (15.6~16인치)',
    weight: '0.8 kg',
    badge: 'ECO',
    smartstore: '',
    colors: [
      { key: 'tortora', name: '토르토라 토프', it: 'Tortora',     hex: '#a07a4e', img: 'bombata-Eco-Camoscio_15_11.png?v=1788348992' },
      { key: 'blu',     name: '블루 스쿠로',  it: 'Blu scuro',   hex: '#243049', img: 'bombata-Eco-Camoscio_15_29.png?v=1788348992' },
      { key: 'khaki',   name: '베르데 카키',  it: 'Verde Khaki', hex: '#5d6146', img: 'bombata-Eco-Camoscio_15_12.png?v=1788348992' },
    ],
    gallery: ['bombata_Eco-Camoscio_g01.png?v=1788348992', 'bombata_Eco-Camoscio_g02.webp?v=1793728792', 'bombata_Eco-Camoscio_g03.webp?v=1793728792', 'bombata_Eco-Camoscio_g04.webp?v=1793728792'],
  },
  {
    id: 'denim',
    matImg: 'bombata_Denim_G02.webp?v=1770308052',
    code: 'E00841',
    name: '데님',
    en: 'Denim',
    tagline: '데님 텍스처 패브릭',
    material: '데님 텍스처 피복 원단 · 내부 충격흡수 패딩',
    story: '청바지처럼 매일 들어도 질리지 않는 가방. 데님 결을 살린 원단에 손잡이를 새로 디자인하고 내부 수납을 정리했습니다. 캠퍼스 룩, 캐주얼 출근룩 어디에나 툭 걸치기 좋은 신학기 추천 모델.',
    price: 119000,
    euro: 69.9,
    size: '15.6"–16"',
    dims: '43 × 33 × 7 cm',
    laptop: '38 × 26 cm (15.6~16인치)',
    weight: '0.8 kg',
    badge: 'CAMPUS',
    smartstore: '',
    colors: [
      { key: 'jeans', name: '진 블루',       it: 'Jeans',          hex: '#4a6a93', img: 'bombata_Denim_15_34.webp?v=1770308052' },
      { key: 'nero',  name: '네로 블랙',     it: 'Nero',           hex: '#222326', img: 'bombata_Denim_15_4.webp?v=1770308052' },
      { key: 'rosso', name: '로쏘 보르고냐', it: 'Rosso borgogna', hex: '#6a2230', img: 'bombata_Denim_15_30.webp?v=1770308052' },
      { key: 'rosa',  name: '로사 핑크',     it: 'Rosa',           hex: '#d9a3ad', img: 'bombata_Denim_15_8.webp?v=1770308052' },
    ],
    gallery: ['bombata_Denim_G01.webp?v=1770308052', 'bombata_Denim_G02.webp?v=1770308052', 'bombata_Denim_G03.webp?v=1770308052', 'bombata_Denim_G04.webp?v=1770308052'],
  },
  {
    id: 'camo',
    matImg: 'bombata_Camo_G03.webp?v=1770307438',
    code: 'E00849',
    name: '카모',
    en: 'Camo',
    tagline: '밀리터리 카무플라주 패브릭',
    material: '카무플라주 패턴 패브릭 · 멀티 포켓 · 내부 충격흡수 패딩',
    story: '밀리터리 클래식을 봄바타식으로 다시 해석했습니다. 카무플라주 패턴 원단에 수납 포켓을 넉넉하게 더해 노트북, 충전기, 서류를 한 번에. 무채색 코디에 포인트 하나가 필요할 때.',
    price: 119000,
    euro: 65.9,
    size: '15.6"–16"',
    dims: '43 × 33 × 7 cm',
    laptop: '38 × 26 cm (15.6~16인치)',
    weight: '0.8 kg',
    badge: '',
    smartstore: '',
    colors: [
      { key: 'multi',   name: '멀티컬러',     it: 'Multicolore',  hex: 'linear-gradient(135deg,#59613f 0 33%,#8a7a55 33% 66%,#2f3324 66%)', img: 'bombata_Camo_15_38.webp?v=1770307438' },
      { key: 'khaki',   name: '베르데 카키',  it: 'Verde khaki',  hex: '#59603f', img: 'bombata_Camo_15_29.webp?v=1770307438' },
      { key: 'petrol',  name: '블루 페트롤리오', it: 'Blu petrolio', hex: '#1f4e5a', img: 'bombata_Camo_15_25.webp?v=1770307438' },
    ],
    gallery: ['bombata_Camo_G01.webp?v=1770307438', 'bombata_Camo_G02.webp?v=1770307438', 'bombata_Camo_G03.webp?v=1770307438', 'bombata_Camo_G04.webp?v=1770307438'],
  },
  {
    id: 'taormina',
    matImg: 'bombata_Taormina_G01.webp?v=1770306613',
    code: 'TAORMINA',
    name: '타오르미나',
    en: 'Taormina',
    tagline: '내추럴 러프 패브릭',
    material: '거칠고 내추럴한 질감의 러프 패브릭 · 내부 충격흡수 패딩',
    story: '시칠리아의 해안 마을 타오르미나에서 이름을 따왔습니다. 노랑·주황·빨강 실이 촘촘히 섞여 짜인, 마치 가공하지 않은 듯한 거친 직물. 사계절 내내 들 수 있도록 설계된, 가장 이탈리아다운 한 점.',
    price: 119000,
    euro: 67.9,
    size: '15.6"–16"',
    dims: '43 × 33 × 7 cm',
    laptop: '38 × 26 cm (15.6~16인치)',
    weight: '0.8 kg',
    badge: 'LIMITED',
    smartstore: '',
    colors: [
      { key: 'giallo', name: '지알로 (멀티 트위드)', it: 'Giallo', hex: '#b58c55', img: 'bombata_Taormina_15.webp?v=1770209473' },
    ],
    gallery: ['bombata_Taormina_G01.webp?v=1770306613', 'bombata_Taormina_G02.webp?v=1770306613'],
  },
];
window.IMG = img;
