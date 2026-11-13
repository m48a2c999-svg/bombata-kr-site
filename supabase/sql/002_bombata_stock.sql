-- 봄바타 코리아 — 컬러별 재고(남은 수량) + 주문 출고 관리
-- Supabase 프로젝트 yeonlink 에 추가. 연링크 앱과 무관한 bombata_ 전용 객체만 만듭니다.
-- 접근: Edge Function(서비스 키)만. 홈페이지는 bombata-stock 함수로 남은 수량만 읽습니다.

create table if not exists public.bombata_stock (
  product_id  text not null,
  color_key   text not null,
  qty         integer not null default 0 check (qty >= 0),   -- 지금 팔 수 있는 수량
  sold        integer not null default 0,                    -- 홈페이지 결제로 나간 누적 수량
  note        text,
  updated_at  timestamptz not null default now(),
  primary key (product_id, color_key)
);
alter table public.bombata_stock enable row level security;
revoke all on table public.bombata_stock from anon, authenticated;
comment on table public.bombata_stock is '봄바타 코리아(bombata.kr) 컬러별 재고. 연링크 앱과 무관.';

-- 초기 수량(2026-11-13 대표 지시로 컬러별 25개). 실제 발주 수량이 정해지면 관리자 페이지에서 바꾸세요.
insert into public.bombata_stock (product_id, color_key, qty) values
  ('nylon-20','nero',25), ('nylon-20','blu',25), ('nylon-20','rosso',25), ('nylon-20','verde',25),
  ('eco-camoscio','tortora',25), ('eco-camoscio','blu',25), ('eco-camoscio','khaki',25),
  ('denim','jeans',25), ('denim','nero',25), ('denim','rosso',25), ('denim','rosa',25),
  ('camo','multi',25), ('camo','khaki',25), ('camo','petrol',25),
  ('taormina','giallo',25)
on conflict (product_id, color_key) do nothing;

-- 주문 출고 관리 칸
alter table public.bombata_orders add column if not exists fulfillment text not null default '출고대기';
alter table public.bombata_orders add column if not exists tracking text;
alter table public.bombata_orders add column if not exists stock_taken boolean not null default false;

-- 재고 차감: 한 건이라도 모자라면 전체 취소(SOLD_OUT 오류)
create or replace function public.bombata_take_stock(p_items jsonb)
returns boolean language plpgsql security definer set search_path = public as $$
declare it jsonb; n integer;
begin
  for it in select value from jsonb_array_elements(p_items) loop
    update bombata_stock
       set qty = qty - (it->>'q')::int, sold = sold + (it->>'q')::int, updated_at = now()
     where product_id = it->>'id' and color_key = it->>'colorKey' and qty >= (it->>'q')::int;
    get diagnostics n = row_count;
    if n = 0 then
      raise exception 'SOLD_OUT:%/%', it->>'id', it->>'colorKey';
    end if;
  end loop;
  return true;
end $$;

-- 재고 되돌리기(결제 승인 실패·주문 취소 시)
create or replace function public.bombata_return_stock(p_items jsonb)
returns boolean language plpgsql security definer set search_path = public as $$
declare it jsonb;
begin
  for it in select value from jsonb_array_elements(p_items) loop
    update bombata_stock
       set qty = qty + (it->>'q')::int, sold = greatest(0, sold - (it->>'q')::int), updated_at = now()
     where product_id = it->>'id' and color_key = it->>'colorKey';
  end loop;
  return true;
end $$;

revoke all on function public.bombata_take_stock(jsonb) from public, anon, authenticated;
revoke all on function public.bombata_return_stock(jsonb) from public, anon, authenticated;
grant execute on function public.bombata_take_stock(jsonb) to service_role;
grant execute on function public.bombata_return_stock(jsonb) to service_role;
