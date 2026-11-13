/* =========================================================
   봄바타 코리아 — 다국어 (한국어 기본 · English · 日本語 · Italiano)
   - 한국어 원문은 index.html 에 그대로 있고, 이 파일은 번역만 담습니다.
   - 문구를 고치려면 아래 표에서 해당 언어 칸만 수정하세요.
   ========================================================= */
(() => {
const LANGS = ['ko', 'en', 'ja', 'it'];
const LABEL = { ko: '한국어', en: 'English', ja: '日本語', it: 'Italiano' };

function pick() {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (LANGS.includes(q)) { localStorage.setItem('bk_lang', q); return q; }
    const s = localStorage.getItem('bk_lang');
    if (LANGS.includes(s)) return s;
  } catch {}
  const n = (navigator.language || 'ko').slice(0, 2).toLowerCase();
  return LANGS.includes(n) ? n : 'ko';
}
const LANG = pick();

/* ---------- 화면 고정 문구 (CSS 선택자 → 번역). 한국어는 원문 사용 ---------- */
const STATIC = [
  ['nav.main a[href="#collection"]', { en: 'Collection', ja: 'コレクション', it: 'Collezione' }],
  ['nav.main a[href="#material"]', { en: 'Materials', ja: '素材', it: 'Materiali' }],
  ['nav.main a[href="#story"]', { en: 'Brand', ja: 'ブランド', it: 'Marchio' }],
  ['nav.main a[href="#size"]', { en: 'Size', ja: 'サイズ', it: 'Misure' }],
  ['.hero-copy h1', { it: 'La <em>Collezione</em><br>in Tessuto' }],
  ['.hero-copy p', {
    en: 'Bombata — laptop bags designed in Prato, Italy.<br>Five fabrics you choose by touch, imported directly from the Italian maker.',
    ja: 'イタリア・プラートでデザインされたノートPCバッグ、ボンバータ。<br>手ざわりで選ぶ5つのファブリックを、イタリア本社からの直輸入でお届けします。',
    it: 'Bombata: borse porta PC disegnate a Prato.<br>Cinque tessuti da scegliere al tatto, importati direttamente dal produttore italiano.' }],
  ['.hero-cta a[href="#collection"]', { en: 'Shop the collection →', ja: 'コレクションを見る →', it: 'Scopri la collezione →' }],
  ['.hero-cta a[href="#material"]', { en: 'About the materials', ja: '素材について', it: 'I materiali' }],
  ['.hero-ctrl .hint', { en: 'Drag to rotate', ja: 'ドラッグして回転', it: 'Trascina per ruotare' }],
  ['.usp .i:nth-child(1)', { en: '<b>Direct Import</b>Direct from the maker, Extreme Design (Italy)', ja: '<b>Direct Import</b>イタリアのメーカー Extreme Design と直接取引', it: '<b>Importazione diretta</b>Direttamente dal produttore Extreme Design' }],
  ['.usp .i:nth-child(2)', { en: '<b>Designed in Prato</b>Born in Italy\'s historic textile city', ja: '<b>Designed in Prato</b>繊維の街プラートで生まれたデザイン', it: '<b>Disegnata a Prato</b>Nata nella storica città del tessile' }],
  ['.usp .i:nth-child(3)', { en: '<b>Laptop Safe</b>Velcro laptop strap · mesh & document pockets', ja: '<b>Laptop Safe</b>ベルクロ固定ストラップ · メッシュ・書類ポケット', it: '<b>Protezione PC</b>Cinghia in velcro · tasche a rete e porta documenti' }],
  ['.usp .i:nth-child(4)', { en: '<b>Free Shipping</b>Free delivery in Korea · Genuine product', ja: '<b>Free Shipping</b>韓国内送料無料 · 正規品保証', it: '<b>Spedizione gratuita</b>In tutta la Corea · prodotto originale' }],
  ['#collection .sec-hd h2', { en: 'Tessuto <em>Five</em><br>The Fabric Line', ja: 'Tessuto <em>Five</em><br>ファブリックコレクション', it: 'Tessuto <em>Cinque</em><br>La linea in tessuto' }],
  ['#collection .sec-hd p', {
    en: 'Only the fabrics from the Bombata range — materials you can actually feel. Hover over a bag to zoom into the weave, and tap a colour dot to switch colours.',
    ja: 'ボンバータのコレクションから、指先で織りを感じられるファブリック素材だけを集めました。商品にカーソルを合わせると生地の織りが拡大され、カラーの丸を押すと色が切り替わります。',
    it: 'Solo i modelli in tessuto della collezione Bombata, materiali da sentire al tatto. Passa il cursore su una borsa per ingrandire la trama e tocca un colore per cambiarlo.' }],
  ['#material .sec-hd h2', { it: 'Senti la <em>trama</em>' }],
  ['#material .sec-hd p', {
    en: 'For centuries Prato has been the heart of Europe\'s textile industry. In that city, Bombata thinks about the character of every fabric. Take a closer look at five textures.',
    ja: 'プラートは何世紀にもわたりヨーロッパ繊維産業の中心地でした。ボンバータはその街で、生地ひとつひとつの表情にこだわっています。5つのファブリックの質感を間近でご覧ください。',
    it: 'Da secoli Prato è il cuore del tessile europeo. In questa città Bombata cura il carattere di ogni tessuto. Guarda da vicino cinque texture diverse.' }],
  ['#story h2', { en: 'A bag made for laptops,<br>the <em>Italian</em> way', ja: 'ノートPCのためのバッグを、<br><em>イタリア</em>のやり方で', it: 'Una borsa per il portatile,<br>alla maniera <em>italiana</em>' }],
  ['#story .story > div:nth-child(2) > p:nth-of-type(1)', {
    en: 'Bombata is a laptop-bag brand made by Extreme Design in Prato, Tuscany. A neat silhouette with rounded corners, a shoulder strap matched to each bag\'s colour, a Velcro strap that holds your laptop in place and easy-to-organise inner pockets.',
    ja: 'ボンバータは、イタリア・トスカーナ州プラートの Extreme Design が手がけるノートPCバッグブランドです。角の丸いすっきりとしたシルエット、バッグと同色のショルダーストラップ、ノートPCを固定するベルクロストラップと整理しやすい内ポケットが特徴です。',
    it: 'Bombata è il marchio di borse porta PC di Extreme Design, a Prato, in Toscana. Linea pulita con angoli arrotondati, tracolla abbinata al colore della borsa, cinghia in velcro che blocca il portatile e tasche interne ben organizzate.' }],
  ['#story .story > div:nth-child(2) > p:nth-of-type(2)', {
    en: 'ELMO COMPANY imports directly from the Italian maker. We only sell products that have cleared formal import customs, and we handle exchanges and after-sales service in Korea.',
    ja: 'エルモカンパニーはイタリアのメーカーと直接取引して輸入しています。正式な輸入通関を経た製品のみを販売し、韓国内で交換・アフターサービスに責任を持ちます。',
    it: 'ELMO COMPANY importa direttamente dal produttore italiano. Vendiamo solo prodotti regolarmente sdoganati e gestiamo cambi e assistenza in Corea.' }],
  ['.facts div:nth-child(1) span', { en: 'colour options', ja: 'カラーバリエーション', it: 'varianti di colore' }],
  ['.facts div:nth-child(2) span', { en: 'weight (15.6")', ja: '重さ（15.6インチ）', it: 'peso (15,6")' }],
  ['.facts div:nth-child(3) span', { en: 'genuine, direct import', ja: '本社直輸入の正規品', it: 'originale, import diretto' }],
  ['#size h2', { it: 'Guida alle <em>misure</em>' }],
  ['table.spec tr:nth-child(1)', { en: '<th>Laptop fit</th><td>15.6–16" (MacBook Pro 16", MacBook Air 15", Galaxy Book 15.6", etc.)</td>', ja: '<th>対応ノートPC</th><td>15.6〜16インチ（MacBook Pro 16"、MacBook Air 15"、Galaxy Book 15.6" など）</td>', it: '<th>Portatile</th><td>15,6–16" (MacBook Pro 16", MacBook Air 15", Galaxy Book 15,6", ecc.)</td>' }],
  ['table.spec tr:nth-child(2)', { en: '<th>Outer size</th><td>43 × 33 × 7 cm</td>', ja: '<th>外寸</th><td>43 × 33 × 7 cm</td>', it: '<th>Dimensioni esterne</th><td>43 × 33 × 7 cm</td>' }],
  ['table.spec tr:nth-child(3)', { en: '<th>Laptop compartment</th><td>38 × 26 cm</td>', ja: '<th>PC収納部</th><td>38 × 26 cm</td>', it: '<th>Vano PC</th><td>38 × 26 cm</td>' }],
  ['table.spec tr:nth-child(4)', { en: '<th>Weight</th><td>approx. 0.8 kg</td>', ja: '<th>重さ</th><td>約0.8 kg</td>', it: '<th>Peso</th><td>circa 0,8 kg</td>' }],
  ['table.spec tr:nth-child(5)', { en: '<th>Inside</th><td>Velcro laptop strap · mesh pocket · document pockets with dividers (varies by model)</td>', ja: '<th>内部</th><td>ノートPC固定ベルクロストラップ · メッシュポケット · 仕切り付き書類ポケット（モデルにより異なります）</td>', it: '<th>Interno</th><td>Cinghia in velcro per il PC · tasca a rete · tasche porta documenti con separatori (varia per modello)</td>' }],
  ['table.spec tr:nth-child(6)', { en: '<th>In the box</th><td>Bag + matching shoulder strap</td>', ja: '<th>付属品</th><td>本体 + 同色ショルダーストラップ</td>', it: '<th>Contenuto</th><td>Borsa + tracolla abbinata</td>' }],
  ['#faq details:nth-of-type(1)', {
    en: '<summary>When will I receive a pre-order?</summary><p>The fabric collection is being imported from Italy for our February 2027 back-to-school launch. Orders ship from February 2027 in the order they were paid, and we\'ll text you before dispatch. You can cancel for a full refund at any time before shipping.</p>',
    ja: '<summary>予約商品はいつ届きますか？</summary><p>ファブリックコレクションは2027年2月の新学期ローンチに合わせてイタリアから輸入します。2027年2月からご入金順に発送し、発送前にSMSでご案内します。発送前であればいつでも全額返金でキャンセルできます。</p>',
    it: '<summary>Quando ricevo un preordine?</summary><p>La collezione in tessuto viene importata dall\'Italia per il lancio di febbraio 2027. Le spedizioni partono da febbraio 2027 in ordine di pagamento e ti avviseremo via SMS prima dell\'invio. Puoi annullare con rimborso totale in qualsiasi momento prima della spedizione.</p>' }],
  ['#faq details:nth-of-type(2)', {
    en: '<summary>Is it genuine? Where is it imported from?</summary><p>ELMO COMPANY buys directly from Bombata\'s maker, Extreme Design srl (Prato, Italy). We only sell products that have cleared formal import customs, and our Korean customer service handles exchanges, returns and repairs.</p>',
    ja: '<summary>正規品ですか？どこから輸入していますか？</summary><p>エルモカンパニーはボンバータのメーカー Extreme Design srl（イタリア・プラート）と直接取引して輸入しています。正式な輸入通関を経た製品のみを販売し、交換・返品・修理は韓国のカスタマーセンターが対応します。</p>',
    it: '<summary>È originale? Da dove viene importato?</summary><p>ELMO COMPANY acquista direttamente dal produttore di Bombata, Extreme Design srl (Prato). Vendiamo solo prodotti regolarmente sdoganati e il nostro servizio clienti in Corea gestisce cambi, resi e riparazioni.</p>' }],
  ['#faq details:nth-of-type(3)', {
    en: '<summary>Shipping cost and delivery time?</summary><p>Shipping is free. In-stock items ship within 1–3 business days of payment. Jeju and remote islands may incur an extra fee. We currently deliver within Korea only.</p>',
    ja: '<summary>送料と配送期間は？</summary><p>全商品送料無料です。在庫商品はお支払い後1〜3営業日以内に発送します。済州島・離島は追加送料がかかる場合があります。現在は韓国国内への配送のみです。</p>',
    it: '<summary>Costi e tempi di spedizione?</summary><p>La spedizione è gratuita. Gli articoli disponibili partono entro 1–3 giorni lavorativi dal pagamento. Per Jeju e le isole minori può esserci un supplemento. Al momento spediamo solo in Corea.</p>' }],
  ['#faq details:nth-of-type(4)', {
    en: '<summary>How do exchanges and returns work?</summary><p>You can exchange or return within 7 days of delivery. For a change of mind, the round-trip shipping cost is yours; returns may be refused where the law allows, for example if use has significantly reduced the product\'s value. See the <a href="policy.html#refund" style="text-decoration:underline">exchange & refund policy</a> (Korean).</p>',
    ja: '<summary>交換・返品の方法は？</summary><p>商品到着後7日以内であれば交換・返品できます。お客様都合の場合は往復送料をご負担いただきます。使用により商品価値が著しく低下した場合など、法令で定める場合は交換・返品をお受けできません。詳しくは<a href="policy.html#refund" style="text-decoration:underline">交換・返金ポリシー</a>（韓国語）をご覧ください。</p>',
    it: '<summary>Come funzionano cambi e resi?</summary><p>Puoi cambiare o restituire entro 7 giorni dalla consegna. Per un ripensamento, la spedizione andata e ritorno è a tuo carico; il reso può essere rifiutato nei casi previsti dalla legge, ad esempio se l\'uso ha ridotto molto il valore del prodotto. Vedi la <a href="policy.html#refund" style="text-decoration:underline">politica di cambio e rimborso</a> (in coreano).</p>' }],
  ['#faq details:nth-of-type(5)', {
    en: '<summary>Where is it made?</summary><p>Designed at the head office in Prato, Italy, and made in China. Full details are in each product\'s legal information notice.</p>',
    ja: '<summary>製造国はどこですか？</summary><p>デザインはイタリア・プラートの本社で行い、生産は中国で行われています。詳細は各商品の商品情報提供告示に記載しています。</p>',
    it: '<summary>Dove viene prodotta?</summary><p>Disegnata nella sede di Prato e prodotta in Cina. I dettagli sono nella scheda informativa di ogni prodotto.</p>' }],
  ['.ft-links a[href="policy.html#terms"]', { en: 'Terms of Use', ja: '利用規約', it: 'Termini d\'uso' }],
  ['.ft-links a[href="policy.html#privacy"]', { en: '<b style="color:#fff">Privacy Policy</b>', ja: '<b style="color:#fff">個人情報処理方針</b>', it: '<b style="color:#fff">Privacy</b>' }],
  ['.ft-links a[href="policy.html#refund"]', { en: 'Exchange & Refunds', ja: '交換・返金ポリシー', it: 'Cambi e rimborsi' }],
  ['#ftStore', { en: 'Naver Smart Store', ja: 'NAVERスマートストア', it: 'Naver Smart Store' }],
  ['.ft-biz', {
    en: '<span><b>Company</b>ELMO COMPANY (엘모컴퍼니)</span><span><b>CEO</b>Seungwan Cho</span><span><b>Business Reg. No.</b>108-18-93619</span><span><b>Mail-order Reg.</b>(pending)</span><br><span><b>Address</b>2F, 410 Sangdo-ro, Dongjak-gu, Seoul, Korea</span><span><b>Customer service</b>+82-2-3482-2701 (weekdays 10:00–17:00 KST)</span><span><b>Email</b>did418@naver.com</span><span><b>Privacy officer</b>Seungwan Cho</span>',
    ja: '<span><b>商号</b>ELMO COMPANY（엘모컴퍼니）</span><span><b>代表</b>チョ・スンワン</span><span><b>事業者登録番号</b>108-18-93619</span><span><b>通信販売業申告</b>（申告後に記載）</span><br><span><b>住所</b>韓国ソウル特別市銅雀区上道路410 2階</span><span><b>カスタマーセンター</b>+82-2-3482-2701（平日10:00–17:00 韓国時間）</span><span><b>メール</b>did418@naver.com</span><span><b>個人情報保護責任者</b>チョ・スンワン</span>',
    it: '<span><b>Società</b>ELMO COMPANY (엘모컴퍼니)</span><span><b>Titolare</b>Seungwan Cho</span><span><b>N. registro imprese (KR)</b>108-18-93619</span><span><b>Reg. vendita a distanza</b>(in corso)</span><br><span><b>Indirizzo</b>2F, 410 Sangdo-ro, Dongjak-gu, Seul, Corea</span><span><b>Assistenza</b>+82-2-3482-2701 (feriali 10:00–17:00 ora coreana)</span><span><b>Email</b>did418@naver.com</span><span><b>Responsabile privacy</b>Seungwan Cho</span>' }],
  ['.ft-note', {
    en: 'Bombata® and related trademarks belong to Extreme Design srl (Italy). Product images © Extreme Design srl. ELMO COMPANY handles import and sales in Korea. Legal documents are provided in Korean.<br>© 2026 ELMO COMPANY. All rights reserved.',
    ja: 'Bombata® および関連商標の権利は Extreme Design srl（イタリア）に帰属します。商品画像 © Extreme Design srl。エルモカンパニーは韓国での輸入・販売を担当しています。規約類は韓国語で提供しています。<br>© 2026 ELMO COMPANY. All rights reserved.',
    it: 'Bombata® e i marchi collegati appartengono a Extreme Design srl (Italia). Immagini prodotto © Extreme Design srl. ELMO COMPANY cura importazione e vendita in Corea. I documenti legali sono in coreano.<br>© 2026 ELMO COMPANY. Tutti i diritti riservati.' }],
  ['.m-main .tip', { en: 'Hover to zoom', ja: 'カーソルを合わせると拡大', it: 'Passa il cursore per ingrandire' }],
  ['#mAdd', { en: 'Add to cart', ja: 'カートに入れる', it: 'Aggiungi al carrello' }],
  ['#mNaver', { en: 'N Buy on Naver Smart Store', ja: 'N NAVERスマートストアで購入', it: 'N Acquista su Naver Smart Store' }],
  ['.dr-ft .row:nth-child(1) span:first-child', { en: 'Subtotal', ja: '商品金額', it: 'Subtotale' }],
  ['.dr-ft .row:nth-child(2) span:first-child', { en: 'Shipping', ja: '送料', it: 'Spedizione' }],
  ['.dr-ft .row.total span:first-child', { en: 'Total', ja: '合計', it: 'Totale' }],
  ['.co-hd button[data-close-co]', { en: '← Continue shopping', ja: '← 買い物を続ける', it: '← Continua lo shopping' }],
  ['#coForm h2', { en: 'Checkout', ja: 'ご注文手続き', it: 'Checkout' }],
  ['#coForm h4:nth-of-type(1)', { en: 'CONTACT', ja: 'ご注文者情報', it: 'DATI DI CONTATTO' }],
  ['#coForm h4:nth-of-type(2)', { en: 'SHIPPING ADDRESS (KOREA ONLY)', ja: 'お届け先（韓国国内のみ）', it: 'INDIRIZZO (SOLO COREA)' }],
  ['#coForm h4:nth-of-type(3)', { en: 'PAYMENT', ja: 'お支払い方法', it: 'PAGAMENTO' }],
  ['label[for="oName"]', { en: 'Name *', ja: 'お名前 *', it: 'Nome *' }],
  ['label[for="oPhone"]', { en: 'Korean mobile number *', ja: '韓国の携帯番号 *', it: 'Cellulare coreano *' }],
  ['label[for="oEmail"]', { en: 'Email *', ja: 'メールアドレス *', it: 'Email *' }],
  ['label[for="oZip"]', { en: 'Address *', ja: '住所 *', it: 'Indirizzo *' }],
  ['#addrBtn', { en: 'Search', ja: '住所検索', it: 'Cerca' }],
  ['label[for="oMemo"]', { en: 'Delivery note', ja: '配送メモ', it: 'Note per la consegna' }],
  ['#oMemo', {
    en: '<option>Leave at the door</option><option>Leave with the security office</option><option>Please call before delivery</option><option>Put in the parcel locker</option>',
    ja: '<option>玄関前に置いてください</option><option>管理人室に預けてください</option><option>配達前に連絡をお願いします</option><option>宅配ボックスに入れてください</option>',
    it: '<option>Lasciare davanti alla porta</option><option>Lasciare in portineria</option><option>Chiamare prima della consegna</option><option>Lasciare nel locker</option>' }],
  ['.co-sum h4', { en: 'YOUR ORDER', ja: 'ご注文商品', it: 'IL TUO ORDINE' }],
  ['.co-sum .row:nth-of-type(1) span:first-child', { en: 'Subtotal', ja: '商品金額', it: 'Subtotale' }],
  ['.co-sum .row:nth-of-type(2) span:first-child', { en: 'Shipping', ja: '送料', it: 'Spedizione' }],
  ['.co-sum .row.total span:first-child', { en: 'Total', ja: 'お支払い合計', it: 'Totale' }],
  ['#toastBtn', { en: 'View cart', ja: 'カートを見る', it: 'Vedi carrello' }],
];
const PLACEHOLDER = [
  ['#oZip', { en: 'Postcode', ja: '郵便番号', it: 'CAP' }],
  ['#oAddr1', { en: 'Press Search to find your address', ja: '住所検索を押してください', it: 'Premi Cerca per trovare l\'indirizzo' }],
  ['#oAddr2', { en: 'Apartment, unit, floor', ja: '建物名・部屋番号', it: 'Appartamento, interno, piano' }],
];

/* ---------- 스크립트에서 쓰는 문구 ---------- */
const TXT = {
  won:        { ko: n => n.toLocaleString('ko-KR') + '원', en: n => '₩' + n.toLocaleString('en-US'), ja: n => '₩' + n.toLocaleString('ja-JP'), it: n => '₩ ' + n.toLocaleString('it-IT') },
  ann:        { ko: ['이탈리아 프라토 디자인 노트북 가방', '이탈리아 본사 직수입 · 엘모컴퍼니', '전 상품 무료배송', '패브릭 컬렉션 5종 공개'],
                en: ['Laptop bags designed in Prato, Italy', 'Imported direct from Italy · ELMO COMPANY', 'Free shipping in Korea', 'Five-piece fabric collection'],
                ja: ['イタリア・プラートデザインのノートPCバッグ', 'イタリア本社直輸入 · エルモカンパニー', '韓国内 全品送料無料', 'ファブリックコレクション5種'],
                it: ['Borse porta PC disegnate a Prato', 'Importazione diretta · ELMO COMPANY', 'Spedizione gratuita in Corea', 'Collezione in tessuto: cinque modelli'] },
  preorder:   { ko: '2027년 2월 신학기 런칭 · 사전예약 고객 순차 출고', en: 'Launching February 2027 · pre-orders ship in order', ja: '2027年2月新学期ローンチ · ご予約順に発送', it: 'Lancio a febbraio 2027 · preordini spediti in ordine' },
  live:       { ko: '본사 직수입 · 국내 재고 출고', en: 'Direct import · ships from Korea', ja: '本社直輸入 · 韓国在庫から発送', it: 'Import diretto · spedito dalla Corea' },
  details:    { ko: '자세히 보기', en: 'Details', ja: '詳しく見る', it: 'Dettagli' },
  addCart:    { ko: '장바구니 담기', en: 'Add to cart', ja: 'カートに入れる', it: 'Aggiungi' },
  detail:     { ko: '디테일', en: 'detail', ja: 'ディテール', it: 'dettaglio' },
  free:       { ko: '무료', en: 'Free', ja: '無料', it: 'Gratis' },
  soldOut:    { ko: '품절', en: 'Sold out', ja: '完売', it: 'Esaurito' },
  left:       { ko: '남은 수량 {n}개', en: '{n} left', ja: '残り{n}点', it: 'Ne restano {n}' },
  lowLeft:    { ko: '마감 임박 · {n}개 남음', en: 'Almost gone · {n} left', ja: '残りわずか · {n}点', it: 'Ultimi pezzi · {n}' },
  soldOutC:   { ko: '{p} {c} 색상은 품절입니다.', en: '{p} in {c} is sold out.', ja: '{p}（{c}）は完売しました。', it: '{p} {c} è esaurita.' },
  maxLeft:    { ko: '남은 수량이 {n}개라 {n}개까지만 담을 수 있어요.', en: 'Only {n} left, so you can add up to {n}.', ja: '残り{n}点のため、{n}点までお選びいただけます。', it: 'Ne restano solo {n}: puoi aggiungerne al massimo {n}.' },
  shortStock: { ko: '{p} {c} 남은 수량이 {n}개입니다. 장바구니 수량을 줄여주세요.', en: 'Only {n} of {p} in {c} left. Please reduce the quantity in your cart.', ja: '{p}（{c}）は残り{n}点です。カートの数量を減らしてください。', it: 'Di {p} {c} ne restano solo {n}. Riduci la quantità nel carrello.' },
  freeShip:   { ko: '무료배송', en: 'Free shipping', ja: '送料無料', it: 'Spedizione gratuita' },
  poNote:     { ko: '사전예약 상품입니다 · {n}. 출고 전 전액 환불 가능.', en: 'Pre-order item · {n}. Full refund any time before shipping.', ja: '予約商品です · {n}。発送前なら全額返金できます。', it: 'Articolo in preordine · {n}. Rimborso totale prima della spedizione.' },
  buyPre:     { ko: '사전예약 구매', en: 'Pre-order now', ja: '予約購入', it: 'Preordina' },
  buy:        { ko: '바로 구매', en: 'Buy now', ja: '今すぐ購入', it: 'Compra ora' },
  spec:       { ko: ['소재', '사이즈', '외형', '노트북 수납부', '무게', '구성', '디자인', '제조국'],
                en: ['Material', 'Size', 'Outer size', 'Laptop compartment', 'Weight', 'In the box', 'Design', 'Made in'],
                ja: ['素材', 'サイズ', '外寸', 'PC収納部', '重さ', '付属品', 'デザイン', '製造国'],
                it: ['Materiale', 'Misura', 'Dimensioni', 'Vano PC', 'Peso', 'Contenuto', 'Design', 'Prodotto in'] },
  forLaptop:  { ko: '{s} 노트북용', en: 'for {s} laptops', ja: '{s} ノートPC用', it: 'per portatili da {s}' },
  weight:     { ko: '0.8 kg', en: '0.8 kg', ja: '0.8 kg', it: '0,8 kg' },
  box:        { ko: '본체 + 동일 컬러 숄더 스트랩', en: 'Bag + matching shoulder strap', ja: '本体 + 同色ショルダーストラップ', it: 'Borsa + tracolla abbinata' },
  design:     { ko: '이탈리아 (Extreme Design srl, Prato)', en: 'Italy (Extreme Design srl, Prato)', ja: 'イタリア（Extreme Design srl、プラート）', it: 'Italia (Extreme Design srl, Prato)' },
  madeIn:     { ko: '중국', en: 'China', ja: '中国', it: 'Cina' },
  added:      { ko: '{p} · {c} 담았습니다', en: 'Added {p} · {c}', ja: '{p} · {c} をカートに入れました', it: '{p} · {c} aggiunto' },
  qtyN:       { ko: '수량 {n}개', en: 'Qty {n}', ja: '数量 {n}', it: 'Q.tà {n}' },
  remove:     { ko: '삭제', en: 'Remove', ja: '削除', it: 'Rimuovi' },
  empty:      { ko: '장바구니가 비어 있습니다', en: 'Your cart is empty', ja: 'カートは空です', it: 'Il carrello è vuoto' },
  orderPre:   { ko: '사전예약 주문하기', en: 'Pre-order checkout', ja: '予約注文へ進む', it: 'Procedi al preordine' },
  order:      { ko: '주문하기', en: 'Checkout', ja: '注文へ進む', it: 'Procedi all\'ordine' },
  pay:        { ko: '{a} {p}결제하기', en: 'Pay {a}', ja: '{a} を支払う', it: 'Paga {a}' },
  payPre:     { ko: '사전예약 ', en: '', ja: '', it: '' },
  agreeText:  { ko: null,
                en: 'I have checked my order and agree to the <a href="policy.html#terms" target="_blank">Terms</a>, <a href="policy.html#privacy" target="_blank">collection and use of personal data</a> and the <a href="policy.html#refund" target="_blank">exchange & refund policy</a> (Korean). <span id="poAgree"></span>',
                ja: 'ご注文内容を確認し、<a href="policy.html#terms" target="_blank">利用規約</a>・<a href="policy.html#privacy" target="_blank">個人情報の収集・利用</a>・<a href="policy.html#refund" target="_blank">交換・返金ポリシー</a>（韓国語）に同意します。<span id="poAgree"></span>',
                it: 'Ho verificato l\'ordine e accetto i <a href="policy.html#terms" target="_blank">Termini</a>, il <a href="policy.html#privacy" target="_blank">trattamento dei dati personali</a> e la <a href="policy.html#refund" target="_blank">politica di cambio e rimborso</a> (in coreano). <span id="poAgree"></span>' },
  poAgree:    { ko: '(사전예약 상품: {n})', en: '(Pre-order: {n})', ja: '（予約商品：{n}）', it: '(Preordine: {n})' },
  testMode:   { ko: '<b>테스트 결제 모드</b> — 토스페이먼츠 테스트 키로 동작합니다. 실제 카드 승인·출금이 일어나지 않습니다.',
                en: '<b>Test payment mode</b> — running on Toss Payments test keys. No real charge is made.',
                ja: '<b>テスト決済モード</b> — Toss Payments のテストキーで動作しています。実際の請求は発生しません。',
                it: '<b>Modalità test</b> — chiavi di test di Toss Payments. Nessun addebito reale.' },
  koreaOnly:  { ko: null, en: 'We currently ship within Korea only. Payment screens are provided by Toss Payments and may appear in Korean.', ja: '現在は韓国国内への配送のみです。決済画面は Toss Payments が提供しており、韓国語で表示される場合があります。', it: 'Al momento spediamo solo in Corea. Le schermate di pagamento sono fornite da Toss Payments e potrebbero essere in coreano.' },
  fileMode:   { ko: '⚠️ 파일로 직접 연 상태에서는 결제 완료 페이지로 이동할 수 없습니다. 도메인(bombata.kr)에 배포한 뒤 결제를 테스트하세요.', en: '⚠️ Payment cannot complete when the page is opened as a local file.', ja: '⚠️ ファイルとして開いている場合は決済を完了できません。', it: '⚠️ Il pagamento non si completa se la pagina è aperta come file locale.' },
  payLoadErr: { ko: '결제 모듈을 불러오지 못했습니다. 인터넷 연결을 확인하거나 잠시 후 다시 시도해주세요.', en: 'Could not load the payment module. Check your connection and try again.', ja: '決済モジュールを読み込めませんでした。接続を確認して再度お試しください。', it: 'Impossibile caricare il modulo di pagamento. Controlla la connessione e riprova.' },
  orStore:    { ko: '또는 {a}에서 구매하실 수 있습니다.', en: 'You can also buy on {a}.', ja: '{a} でもご購入いただけます。', it: 'Puoi acquistare anche su {a}.' },
  store:      { ko: '네이버 스마트스토어', en: 'Naver Smart Store', ja: 'NAVERスマートストア', it: 'Naver Smart Store' },
  addrErr:    { ko: '주소 검색을 불러오지 못했습니다. 직접 입력해주세요.', en: 'Address search is unavailable. Please type your address.', ja: '住所検索を読み込めませんでした。直接入力してください。', it: 'Ricerca indirizzo non disponibile. Inseriscilo a mano.' },
  eName:      { ko: '이름을 입력해주세요.', en: 'Please enter your name.', ja: 'お名前を入力してください。', it: 'Inserisci il nome.' },
  ePhone:     { ko: '휴대폰 번호를 확인해주세요.', en: 'Please check your Korean mobile number (010-…).', ja: '韓国の携帯番号（010-…）をご確認ください。', it: 'Controlla il numero di cellulare coreano (010-…).' },
  eEmail:     { ko: '이메일을 확인해주세요.', en: 'Please check your email.', ja: 'メールアドレスをご確認ください。', it: 'Controlla l\'email.' },
  eAddr:      { ko: '배송지를 모두 입력해주세요.', en: 'Please complete the shipping address.', ja: 'お届け先をすべて入力してください。', it: 'Completa l\'indirizzo di spedizione.' },
  eAgree:     { ko: '주문 및 약관 동의에 체크해주세요.', en: 'Please tick the agreement box.', ja: '同意欄にチェックしてください。', it: 'Spunta la casella di consenso.' },
  eWidget:    { ko: '결제 모듈이 준비되지 않았습니다.', en: 'The payment module is not ready yet.', ja: '決済モジュールの準備ができていません。', it: 'Il modulo di pagamento non è pronto.' },
  eFile:      { ko: '파일로 연 상태에서는 결제를 진행할 수 없습니다. bombata.kr 배포 후 이용해주세요.', en: 'Payment is not available when opened as a local file.', ja: 'ファイルとして開いている場合は決済できません。', it: 'Pagamento non disponibile da file locale.' },
  cancelled:  { ko: '결제가 취소되었습니다.', en: 'Payment was cancelled.', ja: '決済がキャンセルされました。', it: 'Pagamento annullato.' },
  hint:       { ko: 'Drag · 드래그해서 돌려보세요', en: 'Drag to rotate', ja: 'ドラッグして回転', it: 'Trascina per ruotare' },
};

/* ---------- 상품 번역 ---------- */
const PROD = {
  'nylon-20': {
    en: { name: 'Nylon 2.0', tagline: 'High-density technical fabric', material: 'High-density technical fabric · outer zip pocket · two Velcro laptop straps',
          story: 'The new version of Bombata\'s Nylon 15.6–16" bag. Built for everyday use, it is covered in a high-density technical fabric that stands up to knocks and abrasion, and an outer zip pocket keeps documents and essentials within quick reach. Inside: two Velcro straps to hold your laptop, mesh pockets and document pockets with dividers.' },
    ja: { name: 'ナイロン 2.0', tagline: '高密度テクニカルファブリック', material: '高密度テクニカルファブリック · 外側ジップポケット · ノートPC固定ベルクロストラップ2本',
          story: 'ボンバータのナイロン15.6〜16インチモデルの新バージョン。毎日使うバッグのために、衝撃や摩擦に強い高密度テクニカルファブリックで仕上げ、外側にジップポケットを加えて書類や小物をすぐに取り出せます。内側にはノートPCを固定するベルクロストラップ2本、メッシュポケット、仕切り付きの書類ポケットがあります。' },
    it: { name: 'Nylon 2.0', tagline: 'Tessuto tecnico ad alta densità', material: 'Tessuto tecnico ad alta densità · tasca esterna con zip · due cinghie in velcro per il PC',
          story: 'La nuova versione della Nylon 15,6–16" di Bombata. Nata per l\'uso intensivo, è rivestita in un tessuto tecnico ad alta densità che resiste a urti e abrasioni, con una tasca esterna con zip per avere documenti e accessori sempre a portata di mano. All\'interno: due cinghie in velcro per bloccare il PC, tasche a rete e porta documenti con separatori.' },
  },
  'eco-camoscio': {
    en: { name: 'Eco Camoscio', tagline: 'Recycled suede touch', material: '100% recycled outer · suede-effect finish · Velcro laptop strap',
          story: 'Camoscio is Italian for suede. The outer is made from 100% recycled material, yet it feels as soft as real suede, and its tone shifts with light and touch — so no two bags are alike. Inside, the Bombata organisation you know: Velcro strap, mesh pockets and document pockets.' },
    ja: { name: 'エコ カモシオ', tagline: 'リサイクル・スエードタッチ', material: '外装100%再生素材 · スエード調仕上げ · ノートPC固定ベルクロストラップ',
          story: 'カモシオはイタリア語で「スエード」。外装は100%再生素材ながら、指先に触れる質感は本物のスエードのようにやわらかく、光や触れ方で色合いが変わるため、ひとつとして同じバッグはありません。内側はおなじみのボンバータ仕様 ― ベルクロストラップ、メッシュポケット、書類ポケット。' },
    it: { name: 'Eco Camoscio', tagline: 'Effetto camoscio riciclato', material: 'Rivestimento 100% riciclato · effetto scamosciato · cinghia in velcro per il PC',
          story: 'Il classico effetto scamosciato, ma da un materiale interamente riciclato. Come il camoscio vero cambia tono con la luce e al tocco, così nessuna borsa è uguale all\'altra. Dentro, l\'organizzazione Bombata di sempre: cinghia in velcro, tasche a rete e porta documenti.' },
  },
  'denim': {
    en: { name: 'Denim', tagline: 'Denim-texture fabric', material: 'Denim-texture fabric · padded, shock-absorbing interior · Velcro laptop strap',
          story: 'The crossover between casual and business. Denim-texture fabric, a redesigned handle and better internal organisation. The padded interior absorbs knocks, with a laptop strap, mesh pockets and document pockets. Equally at home on campus or on the commute — our back-to-school pick.' },
    ja: { name: 'デニム', tagline: 'デニムテクスチャーファブリック', material: 'デニム調生地 · 衝撃を吸収するパッド入り内装 · ノートPC固定ベルクロストラップ',
          story: 'カジュアルとビジネスをつなぐバッグ。デニム調の生地に新しくデザインしたハンドル、整理しやすくなった内装。内側は衝撃を吸収するパッドで包み、ノートPC固定ストラップ、メッシュポケット、書類ポケットを備えています。キャンパスにも通勤にも似合う、新学期のおすすめモデル。' },
    it: { name: 'Denim', tagline: 'Tessuto effetto denim', material: 'Tessuto effetto denim · interno imbottito antiurto · cinghia in velcro per il PC',
          story: 'Il crossover perfetto tra casual e business. Tessuto denim, manico ridisegnato e organizzazione interna migliorata. L\'interno è imbottito per assorbire gli urti, con cinghia per il PC, tasche a rete e porta documenti. Perfetta per l\'università e per l\'ufficio: la nostra scelta per il rientro a scuola.' },
  },
  'camo': {
    en: { name: 'Camo', tagline: 'Military camouflage fabric', material: 'Camouflage pattern · plenty of pockets',
          story: 'A military classic, reimagined the Bombata way. A camouflage pattern with plenty of pockets holds a 15.6–16" laptop, charger and documents at once — the one accent piece a neutral outfit needs.' },
    ja: { name: 'カモ', tagline: 'ミリタリーカモフラージュファブリック', material: 'カモフラージュ柄 · たっぷりの収納ポケット',
          story: 'ミリタリーの定番をボンバータ流に再解釈。カモフラージュ柄にたっぷりのポケットを備え、15.6〜16インチのノートPC、充電器、書類をまとめて収納できます。モノトーンコーデにアクセントがほしいときに。' },
    it: { name: 'Camo', tagline: 'Tessuto mimetico militare', material: 'Fantasia mimetica · numerose tasche',
          story: 'Un grande classico militare reinterpretato da Bombata. Fantasia mimetica e numerose tasche per portatile da 15,6–16", caricatore e documenti: il tocco di carattere per un look neutro.' },
  },
  'taormina': {
    en: { name: 'Taormina', tagline: 'Natural rough-weave fabric', material: 'Rough weave reminiscent of a straw hat · padded, shock-absorbing interior · Velcro laptop strap',
          story: 'The sand and sea colours of Taormina, the warm Sicilian seaside town. A rough, almost raw fabric that recalls woven straw beach hats, paired with contrasting colour details. Summery in feel but made for year-round use, with a padded interior that absorbs knocks.' },
    ja: { name: 'タオルミーナ', tagline: 'ナチュラルなラフ織りファブリック', material: '麦わら帽子のような粗い織り · 衝撃を吸収するパッド入り内装 · ノートPC固定ベルクロストラップ',
          story: 'シチリアの海辺の町タオルミーナの、砂と海の色。ビーチの麦わら帽子を思わせる、粗く未加工のような生地に対照的なカラーのアクセント。夏らしい雰囲気ながら一年中使えるように作られ、内側は衝撃を吸収するパッドで包まれています。' },
    it: { name: 'Taormina', tagline: 'Tessuto grezzo naturale', material: 'Trama ruvida come un cappello di paglia · interno imbottito antiurto · cinghia in velcro per il PC',
          story: 'I colori della sabbia e del mare di Taormina. Un tessuto ruvido, quasi grezzo, che ricorda i cappelli di paglia intrecciati della spiaggia, con inserti a contrasto. Ha un sapore estivo ma è pensata per tutto l\'anno, con interno imbottito per assorbire gli urti.' },
  },
};
const COLOR = {
  nero:    { en: 'Black', ja: 'ブラック' },
  blu:     { en: 'Dark blue', ja: 'ダークブルー' },
  rosso:   { en: 'Burgundy', ja: 'バーガンディ' },
  verde:   { en: 'Green', ja: 'グリーン' },
  tortora: { en: 'Taupe', ja: 'トープ' },
  khaki:   { en: 'Khaki green', ja: 'カーキグリーン' },
  jeans:   { en: 'Jeans blue', ja: 'ジーンズブルー' },
  rosa:    { en: 'Pink', ja: 'ピンク' },
  multi:   { en: 'Multicolour', ja: 'マルチカラー' },
  petrol:  { en: 'Petrol blue', ja: 'ペトロールブルー' },
  giallo:  { en: 'Multi tweed', ja: 'マルチツイード' },
};

/* ---------- 공개 API ---------- */
const fill = (s, o = {}) => s.replace(/\{(\w+)\}/g, (_, k) => o[k] ?? '');
window.I18N = {
  lang: LANG, langs: LANGS, label: LABEL,
  t(key, o) { const e = TXT[key]; if (!e) return key; const v = e[LANG] ?? e.ko; return typeof v === 'string' ? fill(v, o) : v; },
  won(n) { return (TXT.won[LANG] || TXT.won.ko)(n); },
  p(p, field) { return (LANG !== 'ko' && PROD[p.id] && PROD[p.id][LANG] && PROD[p.id][LANG][field]) || p[field]; },
  c(c) { if (LANG === 'ko') return c.name; if (LANG === 'it') return c.it; return (COLOR[c.key] && COLOR[c.key][LANG]) || c.it; },
  apply() {
    document.documentElement.lang = LANG;
    if (LANG === 'ko') return;
    for (const [sel, tr] of STATIC) { const v = tr[LANG]; if (!v) continue; document.querySelectorAll(sel).forEach(el => { el.innerHTML = v; }); }
    for (const [sel, tr] of PLACEHOLDER) { const el = document.querySelector(sel); if (el && tr[LANG]) el.placeholder = tr[LANG]; }
    const ag = document.querySelector('.agree > span'); if (ag && TXT.agreeText[LANG]) ag.innerHTML = TXT.agreeText[LANG];
    const titles = { en: 'BOMBATA KOREA — Italian laptop bags, direct import', ja: 'BOMBATA KOREA — イタリアのノートPCバッグ 直輸入', it: 'BOMBATA KOREA — Borse porta PC italiane, import diretto' };
    if (titles[LANG]) document.title = titles[LANG];
  },
  switcher() {
    return `<div class="lang" role="group" aria-label="Language">${LANGS.map(l => `<button type="button" data-lang="${l}" class="${l === LANG ? 'on' : ''}" title="${LABEL[l]}">${l.toUpperCase()}</button>`).join('')}</div>`;
  },
  set(l) { if (!LANGS.includes(l)) return; try { localStorage.setItem('bk_lang', l); } catch {} const u = new URL(location.href); if (u.searchParams.has('lang')) { u.searchParams.set('lang', l); location.replace(u.href); } else location.reload(); },
};
})();
