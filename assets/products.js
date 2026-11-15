/* =========================================================
   봄바타 코리아 — 상품 데이터 (진짜 패브릭 소재 7종 · 2026-11-16 개편)
   ※ 가격·스마트스토어 링크·재고는 여기만 고치면 사이트 전체에 반영됩니다.
   ※ 가격을 바꾸면 supabase/functions/bombata-confirm/index.ts 의 PRICE 표도 같이 바꿔주세요
     (결제 금액 위변조 방지용 서버 검증표).
   ========================================================= */
window.SITE = {
  // 가격: 2026-11-16 대표 결정 — 전 상품 15만원대(159,000원)
  // 상품 선정: bombata.it 공식 설명에서 '겉감이 실제 직물'로 확인된 모델만 (데님=데님 무늬 소재, 카모=소재 미표기 → 제외)
  // 'preorder' = 사전예약(2027년 2월 순차출고 안내 표시) / 'live' = 일반판매
  mode: 'preorder',
  preorderNotice: '2027년 2월 신학기 런칭 · 사전예약 고객 순차 출고',
  // 토스페이먼츠 결제위젯 클라이언트 키
  //  - 지금 값은 토스페이먼츠 공식 문서용 "테스트 키" → 실제 돈이 빠져나가지 않습니다.
  //  - 짝이 되는 시크릿 키는 Supabase > Edge Functions > Secrets 의 TOSS_SECRET_KEY
  //  - PG 심사 통과 후 개발자센터 > API 키 > 결제위젯 연동 키(live_gck_...)로 교체
  tossClientKey: 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm',
  // 결제 승인 서버 (Supabase Edge Function, 연링크 프로젝트 공유)
  stockUrl: 'https://qoyvpxtvcwkonwdtkdhk.supabase.co/functions/v1/bombata-stock', // 컬러별 남은 수량(관리자 페이지에서 수정)
  lowStockAt: 5,                 // 이 수량 이하면 '마감 임박' 표시
  confirmUrl: 'https://qoyvpxtvcwkonwdtkdhk.supabase.co/functions/v1/bombata-confirm',
  freeShippingOver: 0,          // 0 = 전 상품 무료배송
  shippingFee: 3000,
  smartstoreHome: 'https://smartstore.naver.com/elmo_customart',
};

const CDN = 'https://cdn.shopify.com/s/files/1/0551/1348/2430/files/';
const img = (f, w = 1400) => /^(img\/|data:|https?:)/.test(f) ? f : `${CDN}${f}${f.includes('?') ? '&' : '?'}width=${w}`;

window.PRODUCTS = [
  {
    id: 'g100',
    code: 'E00879',
    name: '100gr 패딩',
    en: '100gr',
    tagline: '패딩 점퍼 같은 누빔 패브릭',
    material: '다운 점퍼처럼 누빈 패딩 겉감 · 물이 잘 스미지 않는 표면 · 노트북 전용 포켓',
    story: '봄바타의 상징적인 실루엣이 패딩 점퍼를 입었습니다. 빛에 따라 오묘하게 반짝이는 누빔 패딩 겉감은 손에 닿으면 폭신하고, 물이 잘 스며들지 않습니다. 15.6–16인치 노트북 전용 포켓과 업무·학교 소지품을 위한 수납을 갖췄고, 같은 색 숄더 스트랩이 함께 들어 있습니다. 올겨울을 위한 시즌 모델.',
    price: 159000,
    size: '15.6"–16"',
    dims: '43 × 33 × 7 cm',
    laptop: '38 × 26 cm (15.6~16인치)',
    weight: '0.8 kg',
    badge: 'NEW',
    smartstore: '',
    matImg: 'bombata_100gr_G04.webp',
    colors: [
      { key: 'antracite', name: '안트라치테 그레이', it: 'Antracite', hex: '#6c6b67', img: 'bombata_100gr_15_18.webp' },
      { key: 'khaki', name: '베르데 카키', it: 'Verde Khaki', hex: '#4f5a3a', img: 'bombata_100gr_15_29.webp' },
      { key: 'blu', name: '블루 스쿠로', it: 'Blu scuro', hex: '#22305a', img: 'bombata_100gr_15_11.webp' },
    ],
    looks: ['bombata_100gr_G06.webp', 'bombata_100gr_G07.webp', 'bombata_100gr_G08.webp'],   // 모델 착용 사진 (bombata.it)
    gallery: ['bombata_100gr_G02.webp', 'bombata_100gr_G03.webp', 'bombata_100gr_G01.webp', 'bombata_100gr_G04.webp'],
  },
  {
    id: 'velluto',
    code: 'E00878',
    name: '벨루토',
    en: 'Velluto',
    tagline: '부드러운 벨벳 원단',
    material: '벨벳(벨루토) 원단 · 부드러운 촉감 · 노트북 수납부와 서류 포켓',
    story: '이탈리아어로 벨벳을 뜻하는 벨루토. 손끝에 닿는 결이 부드럽고, 따뜻하고 깊은 색이 벨벳 원단 특유의 고급스러움을 살립니다. 겉은 부드럽지만 안쪽은 단단하게 만들어 노트북과 소지품을 지켜줍니다. 출근길과 비즈니스 미팅에 잘 어울리는 클래식한 한 점.',
    price: 159000,
    size: '15.6"–16"',
    dims: '43 × 33 × 7 cm',
    laptop: '38 × 26 cm (15.6~16인치)',
    weight: '0.8 kg',
    badge: '',
    smartstore: '',
    matImg: 'bombata_Velluto_G02.webp',
    colors: [
      { key: 'terracotta', name: '테라코타', it: 'Terracotta', hex: '#b5532e', img: 'bombata_Velluto_15_32.webp' },
      { key: 'nero', name: '네로 블랙', it: 'Nero', hex: '#1e1e20', img: 'bombata_Velluto_15_4.webp' },
      { key: 'blu', name: '블루 스쿠로', it: 'Blu scuro', hex: '#1f2a44', img: 'bombata_Velluto_15_11.webp' },
      { key: 'petrol', name: '블루 페트롤리오', it: 'Blu petrolio', hex: '#22524f', img: 'bombata_Velluto_15_25.webp' },
    ],
    looks: ['bombata_Velluto_G04.webp', 'bombata_Velluto_G05.webp', 'bombata_Velluto_G06.webp'],   // 모델 착용 사진 (bombata.it)
    gallery: ['bombata_Velluto_G03.webp', 'bombata_Velluto_G01.webp', 'bombata_Velluto_G02.webp'],
  },
  {
    id: 'teddy',
    code: 'E00792',
    name: '테디',
    en: 'Teddy',
    tagline: '포근한 테디 소재',
    material: '테디 베어처럼 포근한 부드러운 소재 · 노트북·서류·케이블 수납',
    story: '만지는 순간 따뜻함이 느껴지는 부드러운 테디 소재로 감쌌습니다. 겨울 코트와 니트에 자연스럽게 어울리고, 15–16인치 노트북과 서류, 케이블, 소지품을 깔끔하게 정리해 담을 수 있습니다. 편안함과 스타일, 따뜻함을 함께 챙기는 가방.',
    price: 159000,
    size: '15.6"–16"',
    dims: '43 × 33 × 7 cm',
    laptop: '38 × 26 cm (15.6~16인치)',
    weight: '0.8 kg',
    badge: 'WINTER',
    smartstore: '',
    matImg: 'bombata_teddy_G05.webp',
    colors: [
      { key: 'antracite', name: '안트라치테 그레이', it: 'Antracite', hex: '#56585b', img: 'bombata_teddy_15_16.webp' },
      { key: 'tortora', name: '토르토라 토프', it: 'Tortora', hex: '#8e8572', img: 'bombata_teddy_15_21.webp' },
      { key: 'rosso', name: '로쏘 보르고냐', it: 'Rosso borgogna', hex: '#6b2230', img: 'bombata_teddy_15_30.webp' },
    ],
    looks: ['bombata_teddy_G02.webp', 'bombata_teddy_G03.webp'],   // 모델 착용 사진 (bombata.it)
    gallery: ['bombata_teddy_G04.webp', 'bombata_teddy_G05.webp', 'bombata_teddy_G01.webp'],
  },
  {
    id: 'tweed',
    code: 'E00850',
    name: '트위드',
    en: 'Tweed',
    tagline: '프라토 트위드 직물',
    material: '부드러운 트위드 직물 겉감 · 노트북·서류 수납 · 같은 색 숄더 스트랩',
    story: '봄바타가 태어난 섬유 도시, 이탈리아 프라토의 직물 전통에 바치는 가방입니다. 부드러운 트위드 직물로 겉을 감쌌고, 직물의 결이 잘 보이도록 차분한 색으로만 만들었습니다. 튼튼하게 만들어 노트북과 서류, 소지품을 매일 담기 좋습니다.',
    price: 159000,
    size: '15.6"–16"',
    dims: '43 × 33 × 7 cm',
    laptop: '38 × 26 cm (15.6~16인치)',
    weight: '0.8 kg',
    badge: 'PRATO',
    smartstore: '',
    matImg: 'bombata_Tweed_G04.webp',
    colors: [
      { key: 'ocra', name: '지알로 머스터드', it: 'Giallo', hex: '#c9962e', img: 'bombata_Tweed_15_6.webp' },
      { key: 'blu', name: '블루 스쿠로', it: 'Blu scuro', hex: '#26304f', img: 'bombata_Tweed_15_11.webp' },
      { key: 'verde', name: '베르데 그린', it: 'Verde', hex: '#1f5a4a', img: 'bombata_Tweed_15_7.webp' },
      { key: 'nero', name: '네로 블랙', it: 'Nero', hex: '#222326', img: 'bombata_Tweed_15_4.webp' },
    ],
    looks: ['bombata_Tweed_G07.webp'],   // 모델 착용 사진 (bombata.it)
    gallery: ['bombata_Tweed_G05.webp', 'bombata_Tweed_G06.webp', 'bombata_Tweed_G03.webp', 'bombata_Tweed_G01.webp'],
  },
  {
    id: 'eco-camoscio',
    code: 'E00699',
    name: '에코 카모시오',
    en: 'Eco Camoscio',
    tagline: '리사이클 스웨이드 터치',
    material: '외피 100% 재생 소재 · 스웨이드 질감 마감 · 노트북·서류 정리 수납',
    story: '이탈리아어로 "스웨이드"를 뜻하는 카모시오. 겉감은 100% 재생 소재로 만들었지만 손끝에 닿는 결은 진짜 스웨이드처럼 부드럽고, 빛과 손길에 따라 색이 미묘하게 달라져 같은 가방이 하나도 없습니다. 안쪽은 익숙한 봄바타 그대로 — 노트북, 서류, 소지품을 정리하는 수납.',
    price: 159000,
    size: '15.6"–16"',
    dims: '43 × 33 × 7 cm',
    laptop: '38 × 26 cm (15.6~16인치)',
    weight: '0.8 kg',
    badge: 'ECO',
    smartstore: '',
    matImg: 'bombata_Eco-Camoscio_g01.png?v=1788348992',
    colors: [
      { key: 'tortora', name: '토르토라 토프', it: 'Tortora', hex: '#a07a4e', img: 'bombata-Eco-Camoscio_15_11.png?v=1788348992' },
      { key: 'blu', name: '블루 스쿠로', it: 'Blu scuro', hex: '#243049', img: 'bombata-Eco-Camoscio_15_29.png?v=1788348992' },
      { key: 'khaki', name: '베르데 카키', it: 'Verde Khaki', hex: '#5d6146', img: 'bombata-Eco-Camoscio_15_12.png?v=1788348992' },
    ],
    looks: ['bombata_Eco-Camoscio_g02.webp', 'bombata_Eco-Camoscio_g03.webp', 'bombata_Eco-Camoscio_g04.webp'],   // 모델 착용 사진 (bombata.it)
    gallery: ['bombata_Eco-Camoscio_g01.png?v=1788348992'],
  },
  {
    id: 'nylon-20',
    code: 'E00852',
    name: '나일론 2.0',
    en: 'Nylon 2.0',
    tagline: '고밀도 테크니컬 패브릭',
    material: '고밀도 테크니컬 패브릭 · 외부 지퍼 포켓 · 노트북·서류 수납',
    story: '봄바타 나일론 15.6–16인치 모델의 새 버전. 매일 들고 다니는 가방을 위해 충격과 마찰에 강한 고밀도 테크니컬 패브릭으로 감쌌고, 바깥에 지퍼 포켓을 더해 서류나 소지품을 바로 꺼낼 수 있습니다.',
    price: 159000,
    size: '15.6"–16"',
    dims: '43 × 33 × 7 cm',
    laptop: '38 × 26 cm (15.6~16인치)',
    weight: '0.8 kg',
    badge: '',
    smartstore: '',
    matImg: 'bombata_Nylon-2.0_G03.webp?v=1770307779',
    colors: [
      { key: 'nero', name: '네로 블랙', it: 'Nero', hex: '#1d1d1f', img: 'bombata_Nylon-2.0_15_4.png?v=1770307719' },
      { key: 'blu', name: '블루 스쿠로', it: 'Blu scuro', hex: '#1f2a44', img: 'bombata_Nylon-2.0_15_11.png?v=1770307720' },
      { key: 'rosso', name: '로쏘 보르고냐', it: 'Rosso borgogna', hex: '#6b1e2a', img: 'bombata_Nylon-2.0_15_30.png?v=1770307720' },
      { key: 'verde', name: '베르데 그린', it: 'Verde', hex: '#3f5a3c', img: 'bombata_Nylon-2.0_15_7.png?v=1770307779' },
    ],
    looks: [],   // 모델 착용 사진 (bombata.it)
    gallery: ['bombata_Nylon-2.0_G03.webp?v=1770307779', 'bombata_Nylon-2.0_G06.webp?v=1770307779', 'bombata_Nylon-2.0_G01.webp?v=1770307779', 'bombata_Nylon-2.0_G02.webp?v=1770307779'],
  },
  {
    id: 'taormina',
    code: 'E00781',
    name: '타오르미나',
    en: 'Taormina',
    tagline: '내추럴 러프 패브릭',
    material: '밀짚모자를 닮은 거친 직물 · 대비되는 색 포인트 · 노트북·서류 수납',
    story: '시칠리아의 해안 도시 타오르미나의 모래와 바다 색을 담았습니다. 해변의 밀짚모자를 떠올리게 하는 거칠고 가공하지 않은 듯한 직물에 대비되는 색 포인트. 여름 느낌이지만 사계절 들 수 있게 만들었습니다.',
    price: 159000,
    size: '15.6"–16"',
    dims: '43 × 33 × 7 cm',
    laptop: '38 × 26 cm (15.6~16인치)',
    weight: '0.8 kg',
    badge: '',
    smartstore: '',
    matImg: 'bombata_Taormina_G01.webp?v=1770306613',
    colors: [
      { key: 'giallo', name: '지알로 (멀티 컬러)', it: 'Giallo', hex: '#b58c55', img: 'bombata_Taormina_15.webp?v=1770209473' },
    ],
    looks: [],   // 모델 착용 사진 (bombata.it)
    gallery: ['bombata_Taormina_G01.webp?v=1770306613', 'bombata_Taormina_G02.webp?v=1770306613'],
  },
];

// 첫 화면·룩북에 쓰는 모델 착용 사진 (bombata.it 공식 이미지)
window.LOOKBOOK = [
  { id: 'velluto',      ci: 0, img: 'bombata_Velluto_G06.webp' },
  { id: 'g100',         ci: 2, img: 'bombata_100gr_G07.webp' },
  { id: 'teddy',        ci: 0, img: 'bombata_teddy_G02.webp' },
  { id: 'eco-camoscio', ci: 1, img: 'bombata_Eco-Camoscio_g03.webp' },
  { id: 'tweed',        ci: 1, img: 'bombata_Tweed_G07.webp' },
  { id: 'velluto',      ci: 0, img: 'bombata_Velluto_G04.webp' },
  { id: 'teddy',        ci: 0, img: 'bombata_teddy_G03.webp' },
  { id: 'g100',         ci: 2, img: 'bombata_100gr_G06.webp' },
  { id: 'eco-camoscio', ci: 0, img: 'bombata_Eco-Camoscio_g02.webp' },
  { id: 'eco-camoscio', ci: 0, img: 'bombata_Eco-Camoscio_g04.webp' },
];
window.STORY_IMG = img('bombata_Velluto_G05.webp', 1200);
window.IMG = img;
