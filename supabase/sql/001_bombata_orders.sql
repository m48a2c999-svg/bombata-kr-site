-- 봄바타 코리아 홈페이지 주문 기록 (연링크 앱과 무관한 별도 표)
-- Supabase 프로젝트 yeonlink 에 추가. 접근은 Edge Function bombata-confirm(서비스 키)만 가능.
create table if not exists public.bombata_orders (
  order_id        text primary key,
  payment_key     text,
  amount          integer not null,
  status          text not null default 'READY',   -- DONE / FAILED
  method          text,
  order_name      text,
  items           jsonb,
  customer_name   text,
  customer_phone  text,
  customer_email  text,
  ship_zip        text,
  ship_addr1      text,
  ship_addr2      text,
  ship_memo       text,
  preorder        boolean default true,
  test_mode       boolean default true,
  approved_at     timestamptz,
  receipt_url     text,
  error_code      text,
  error_message   text,
  raw             jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
alter table public.bombata_orders enable row level security;
revoke all on table public.bombata_orders from anon, authenticated;
comment on table public.bombata_orders is '봄바타 코리아(bombata.kr) 홈페이지 주문. 연링크 앱과 무관. Edge Function bombata-confirm 만 기록함.';
create index if not exists bombata_orders_created_idx on public.bombata_orders (created_at desc);
