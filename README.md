# BOMBATA KOREA — bombata.kr

엘모컴퍼니가 운영하는 봄바타(이탈리아 노트북 가방) 한국 홈페이지. 패브릭 5종, 사전예약 판매.

## 구성
| 위치 | 역할 |
|---|---|
| `index.html` | 메인 (3D 첫화면 · 패브릭 5종 · 확대 · 장바구니 · 주문서 · 토스페이먼츠 결제위젯) |
| `assets/products.js` | **상품·가격·결제 키·스마트스토어 링크 — 대부분 여기만 고치면 됨** |
| `success.html` / `fail.html` | 결제 완료 / 실패 |
| `policy.html` | 이용약관 · 개인정보처리방침 · 교환환불 |
| `supabase/functions/bombata-confirm/index.ts` | 결제 승인 + 주문 기록 (Supabase Edge Function) |
| `supabase/sql/001_bombata_orders.sql` | 주문 기록 표 |
| `CNAME` | 사용자 도메인 `www.bombata.kr` |

## 인프라 (연링크와 공유)
- **호스팅**: GitHub Pages (이 저장소 `main` 브랜치) — 무료
- **결제 승인·주문 DB**: Supabase 프로젝트 `yeonlink`(서울, Pro)에 봄바타 전용으로 추가
  - Edge Function `bombata-confirm` (JWT 검증 끔, CORS는 bombata.kr만 허용)
  - 표 `public.bombata_orders` — 일반 사용자 접근 차단(RLS + 권한 회수), 함수만 기록
  - 비밀 값 `TOSS_SECRET_KEY` (Edge Functions > Secrets)
  - 연링크 앱의 표·함수와는 이름과 권한이 분리되어 있음
- **도메인**: 가비아 `bombata.kr`
  - A `@` → 185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153
  - CNAME `www` → `m48a2c999-svg.github.io.`
  - `bombata.co.kr` → 가비아 포워딩으로 `https://www.bombata.kr`

## 주문 확인
Supabase > Table Editor > `bombata_orders` (status = DONE 이 결제 완료). 토스페이먼츠 상점관리자에서도 확인 가능.

## 실제 결제로 바꾸기
1. 통신판매업 신고 → `index.html` 하단 신고번호 기입
2. 토스페이먼츠 가입·결제위젯 심사 (사업자등록증, 통신판매업 신고증, 신분증, 정산계좌)
3. 클라이언트 키 `live_gck_...` → `assets/products.js` 의 `tossClientKey`
4. 시크릿 키 `live_gsk_...` → Supabase Secrets `TOSS_SECRET_KEY` (코드·문서에 적지 않기)

## 가격 바꿀 때
`assets/products.js` 의 `price` 와 `supabase/functions/bombata-confirm/index.ts` 의 `PRICE` 를 **함께** 수정 후 함수 재배포.

## 재고·주문 관리 (2026-11-13 추가)
- 컬러별 남은 수량: Supabase `public.bombata_stock` (SQL: `supabase/sql/002_bombata_stock.sql`)
- 홈페이지는 Edge Function `bombata-stock`(GET)로 남은 수량을 읽어 품절·마감 임박을 표시하고, 남은 수량보다 많이 담지 못하게 막습니다.
- 결제 승인(`bombata-confirm`) 직전에 서버가 재고를 차감합니다. 모자라면 결제를 승인하지 않고, 토스 승인 실패 시 재고를 되돌립니다.
- 관리자 화면: `https://www.bombata.kr/admin.html` — 재고 수정, 주문·출고상태·송장번호 관리, 출고용 CSV. 비밀번호는 Supabase Edge Function Secrets 의 `BOMBATA_ADMIN_KEY`.
