// 봄바타 코리아 — 토스페이먼츠 결제 승인 + 재고 차감 + 주문 기록 (Supabase Edge Function)
// 비밀 값: TOSS_SECRET_KEY (Edge Functions > Secrets). 코드에 쓰지 않음.
// JWT 검증 끔(브라우저에서 바로 호출). 금액은 아래 가격표로 서버에서 다시 계산.
// 원본: github.com/m48a2c999-svg/bombata-kr-site supabase/functions/bombata-confirm/index.ts
import { createClient } from "jsr:@supabase/supabase-js@2";

// ※ assets/products.js 의 price 와 같게 유지
const PRICE: Record<string, number> = {
  "nylon-20": 119000,
  "eco-camoscio": 119000,
  "denim": 119000,
  "camo": 119000,
  "taormina": 119000,
};
const SHIPPING_FEE = 0;
const ALLOWED = ["https://www.bombata.kr", "https://bombata.kr", "https://m48a2c999-svg.github.io"];

const s = (v: unknown, max = 200) => (typeof v === "string" ? v.slice(0, max) : null);

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") ?? "";
  const headers = {
    "Access-Control-Allow-Origin": ALLOWED.includes(origin) ? origin : ALLOWED[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, authorization, apikey, x-client-info",
    "Vary": "Origin",
    "Content-Type": "application/json; charset=utf-8",
  };
  const out = (status: number, body: Record<string, unknown>) => new Response(JSON.stringify(body), { status, headers });
  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "POST") return out(405, { message: "Method Not Allowed" });

  const secret = Deno.env.get("TOSS_SECRET_KEY");
  if (!secret) return out(500, { message: "서버에 결제 키가 설정되지 않았습니다." });

  let b: any;
  try { b = await req.json(); } catch { return out(400, { message: "잘못된 요청" }); }
  const { paymentKey, orderId, amount, items } = b ?? {};
  if (typeof paymentKey !== "string" || typeof orderId !== "string" || !Number.isInteger(amount)) {
    return out(400, { message: "결제 정보가 없습니다." });
  }
  if (!/^BK[0-9A-Z]{10,40}$/.test(orderId)) return out(400, { message: "주문번호 형식 오류" });
  if (!Array.isArray(items) || !items.length || items.length > 20) return out(400, { message: "주문 상품 정보가 없습니다." });

  let expected = SHIPPING_FEE;
  for (const it of items) {
    const p = PRICE[it?.id];
    const q = Number(it?.q);
    if (!p || !Number.isInteger(q) || q < 1 || q > 10 || typeof it?.colorKey !== "string") return out(400, { message: "상품 정보가 올바르지 않습니다." });
    expected += p * q;
  }
  if (expected !== amount) return out(400, { message: "결제 금액이 상품 금액과 다릅니다." });

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });

  const c = b.customer ?? {}, sh = b.ship ?? {};
  const base = {
    order_id: orderId, payment_key: paymentKey, amount,
    order_name: s(b.orderName), items,
    customer_name: s(c.name, 50), customer_phone: s(c.phone, 20), customer_email: s(c.email, 120),
    ship_zip: s(sh.zip, 10), ship_addr1: s(sh.addr1), ship_addr2: s(sh.addr2), ship_memo: s(sh.memo, 100),
    preorder: b.preorder !== false, test_mode: secret.startsWith("test_"),
    updated_at: new Date().toISOString(),
  };

  // 1) 같은 주문번호 중복 처리 방지: PENDING 으로 먼저 자리 잡기
  const { data: ins } = await db.from("bombata_orders")
    .upsert({ ...base, status: "PENDING" }, { onConflict: "order_id", ignoreDuplicates: true }).select("order_id");
  if (!ins?.length) {
    const { data: prev } = await db.from("bombata_orders").select("status").eq("order_id", orderId).maybeSingle();
    if (prev?.status === "DONE") return out(200, { message: "OK", orderId, already: true });
    if (prev?.status === "PENDING") return out(409, { message: "결제를 처리하고 있습니다. 잠시 후 다시 확인해주세요.", code: "PROCESSING" });
    await db.from("bombata_orders").update({ ...base, status: "PENDING" }).eq("order_id", orderId);
  }

  // 2) 재고 차감 (모자라면 결제 승인하지 않음 → 고객 돈이 빠져나가지 않음)
  const stockItems = items.map((it: any) => ({ id: String(it.id), colorKey: String(it.colorKey ?? ""), q: Number(it.q) }));
  const { error: stockErr } = await db.rpc("bombata_take_stock", { p_items: stockItems });
  if (stockErr) {
    const soldOut = (stockErr.message || "").includes("SOLD_OUT");
    await db.from("bombata_orders").update({ status: "FAILED", error_code: soldOut ? "SOLD_OUT" : "STOCK_ERROR", error_message: s(stockErr.message, 300) }).eq("order_id", orderId);
    return out(409, { message: soldOut ? "결제 직전에 품절된 상품이 있어 결제를 진행하지 않았습니다. 장바구니를 확인해주세요." : "재고 확인 중 오류가 발생했습니다.", code: soldOut ? "SOLD_OUT" : "STOCK_ERROR" });
  }

  const res = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(secret + ":"),
      "Content-Type": "application/json",
      "Idempotency-Key": orderId,
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    await db.rpc("bombata_return_stock", { p_items: stockItems });
    await db.from("bombata_orders").upsert({ ...base, status: "FAILED", stock_taken: false, error_code: s(data.code, 80), error_message: s(data.message, 300), raw: data });
    return out(res.status, { message: data.message ?? "승인 실패", code: data.code });
  }
  const { error } = await db.from("bombata_orders").upsert({
    ...base, status: "DONE", stock_taken: true, method: s(data.method, 40), approved_at: data.approvedAt ?? null,
    receipt_url: data.receipt?.url ?? null, raw: data,
  });
  if (error) console.error("order save failed", orderId, error.message);
  return out(200, { message: "OK", orderId, method: data.method, approvedAt: data.approvedAt, receiptUrl: data.receipt?.url ?? null });
});
