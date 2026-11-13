// 봄바타 코리아 — 재고 조회(공개) + 관리자 기능 (Supabase Edge Function)
// GET  : 홈페이지용. 컬러별 남은 수량만 돌려줍니다(개인정보 없음).
// POST : 관리자 페이지(admin.html)용. 헤더 x-admin-key 가 비밀 값 BOMBATA_ADMIN_KEY 와 같아야 합니다.
//        action: "list" | "setStock" | "setOrder"
// JWT 검증 끔(브라우저에서 바로 호출).
// 원본: github.com/m48a2c999-svg/bombata-kr-site supabase/functions/bombata-stock/index.ts
import { createClient } from "jsr:@supabase/supabase-js@2";

const ALLOWED = ["https://www.bombata.kr", "https://bombata.kr", "https://m48a2c999-svg.github.io"];
const FULFILL = ["출고대기", "출고준비", "출고완료", "배송완료", "취소", "환불완료"];

const timingSafeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
};

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") ?? "";
  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": ALLOWED.includes(origin) ? origin : ALLOWED[0],
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, x-admin-key, authorization, apikey, x-client-info",
    "Vary": "Origin",
    "Content-Type": "application/json; charset=utf-8",
  };
  const out = (status: number, body: unknown, extra: Record<string, string> = {}) =>
    new Response(JSON.stringify(body), { status, headers: { ...headers, ...extra } });
  if (req.method === "OPTIONS") return new Response("ok", { headers });

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });

  if (req.method === "GET") {
    const { data, error } = await db.from("bombata_stock").select("product_id,color_key,qty");
    if (error) return out(500, { message: "재고를 불러오지 못했습니다." });
    const stock: Record<string, Record<string, number>> = {};
    for (const r of data ?? []) (stock[r.product_id] ??= {})[r.color_key] = r.qty;
    return out(200, { stock, at: new Date().toISOString() }, { "Cache-Control": "public, max-age=20" });
  }
  if (req.method !== "POST") return out(405, { message: "Method Not Allowed" });

  const adminKey = Deno.env.get("BOMBATA_ADMIN_KEY") ?? "";
  const given = req.headers.get("x-admin-key") ?? "";
  if (adminKey.length < 8) return out(503, { message: "관리자 비밀번호(BOMBATA_ADMIN_KEY)가 아직 설정되지 않았습니다." });
  if (!timingSafeEqual(given, adminKey)) {
    await new Promise((r) => setTimeout(r, 800));
    return out(401, { message: "비밀번호가 맞지 않습니다." });
  }

  let b: any;
  try { b = await req.json(); } catch { return out(400, { message: "잘못된 요청" }); }

  if (b?.action === "list") {
    const [st, od] = await Promise.all([
      db.from("bombata_stock").select("*").order("product_id").order("color_key"),
      db.from("bombata_orders")
        .select("order_id,status,amount,method,order_name,items,customer_name,customer_phone,customer_email,ship_zip,ship_addr1,ship_addr2,ship_memo,preorder,test_mode,approved_at,receipt_url,error_code,fulfillment,tracking,created_at")
        .order("created_at", { ascending: false }).limit(500),
    ]);
    if (st.error || od.error) return out(500, { message: "불러오기 실패", detail: st.error?.message ?? od.error?.message });
    return out(200, { stock: st.data, orders: od.data });
  }

  if (b?.action === "setStock") {
    const qty = Number(b.qty);
    if (typeof b.product_id !== "string" || typeof b.color_key !== "string" || !Number.isInteger(qty) || qty < 0 || qty > 100000) {
      return out(400, { message: "수량이 올바르지 않습니다." });
    }
    const { data, error } = await db.from("bombata_stock")
      .upsert({ product_id: b.product_id, color_key: b.color_key, qty, note: typeof b.note === "string" ? b.note.slice(0, 200) : undefined, updated_at: new Date().toISOString() })
      .select().single();
    if (error) return out(500, { message: "저장 실패", detail: error.message });
    return out(200, { ok: true, row: data });
  }

  if (b?.action === "setOrder") {
    if (typeof b.order_id !== "string") return out(400, { message: "주문번호가 없습니다." });
    const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (b.fulfillment !== undefined) {
      if (!FULFILL.includes(b.fulfillment)) return out(400, { message: "출고 상태 값이 올바르지 않습니다." });
      patch.fulfillment = b.fulfillment;
    }
    if (b.tracking !== undefined) patch.tracking = typeof b.tracking === "string" ? b.tracking.slice(0, 80) : null;
    const { data: cur } = await db.from("bombata_orders").select("items,stock_taken,fulfillment").eq("order_id", b.order_id).maybeSingle();
    if (!cur) return out(404, { message: "주문이 없습니다." });
    // 취소·환불로 바꾸면 재고를 한 번만 되돌림
    if ((patch.fulfillment === "취소" || patch.fulfillment === "환불완료") && cur.stock_taken) {
      const items = (cur.items ?? []).map((it: any) => ({ id: it.id, colorKey: it.colorKey, q: it.q }));
      const { error } = await db.rpc("bombata_return_stock", { p_items: items });
      if (error) return out(500, { message: "재고 되돌리기 실패", detail: error.message });
      patch.stock_taken = false;
    }
    const { error } = await db.from("bombata_orders").update(patch).eq("order_id", b.order_id);
    if (error) return out(500, { message: "저장 실패", detail: error.message });
    return out(200, { ok: true, restocked: patch.stock_taken === false });
  }

  return out(400, { message: "알 수 없는 요청" });
});
