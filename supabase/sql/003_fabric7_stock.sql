-- 2026-11-16 상품 개편: 진짜 패브릭 소재 7종 (데님·카모 판매 중단 — 기존 재고 행은 기록용으로 남김)
-- 신규 모델 컬러별 25개 (대표 지시)
insert into public.bombata_stock (product_id, color_key, qty) values
  ('g100','antracite',25), ('g100','khaki',25), ('g100','blu',25),
  ('velluto','terracotta',25), ('velluto','nero',25), ('velluto','blu',25), ('velluto','petrol',25),
  ('teddy','antracite',25), ('teddy','tortora',25), ('teddy','rosso',25),
  ('tweed','ocra',25), ('tweed','blu',25), ('tweed','verde',25), ('tweed','nero',25)
on conflict (product_id, color_key) do nothing;
