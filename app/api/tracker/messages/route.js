import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { getSupabaseAdmin, getIstanbulDayBounds, hasDashboardSession } from "../_lib";

export const runtime = "nodejs";

export async function GET(request) {
  if (!(await hasDashboardSession())) return NextResponse.json({ error: "Oturum gerekli." }, { status: 401 });
  try {
    const params = new URL(request.url).searchParams;
    const supabase = getSupabaseAdmin();
    let query = supabase.from("chat_messages").select("id,created_at,game_time_text,player,message,matched_keywords,source").order("created_at", { ascending: false }).limit(500);
    const day = params.get("date");
    if (day) {
      const bounds = getIstanbulDayBounds(day);
      if (!bounds) return NextResponse.json({ error: "Tarih biçimi geçersiz." }, { status: 400 });
      query = query.gte("created_at", bounds.start).lt("created_at", bounds.end);
    }
    const keyword = (params.get("keyword") || "").trim();
    const player = (params.get("player") || "").trim();
    if (keyword) {
      const known = ["Taş", "Felo", "Mini Taş", "Random"].find(word => word.toLocaleLowerCase("tr-TR") === keyword.toLocaleLowerCase("tr-TR"));
      query = query.contains("matched_keywords", [known || keyword]);
    }
    if (player) query = query.ilike("player", "%" + player.replace(/[%_]/g, "") + "%");
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ items: data || [] });
  } catch (error) {
    return NextResponse.json({ error: "Mesajlar okunamadı: " + (error.message || "veritabanı hatası") }, { status: 500 });
  }
}

export async function POST(request) {
  const token = process.env.NOWA_TRACKER_INGEST_TOKEN;
  if (!token || request.headers.get("authorization") !== "Bearer " + token) {
    return NextResponse.json({ error: "Geçersiz aktarım anahtarı." }, { status: 401 });
  }
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Geçersiz JSON." }, { status: 400 }); }
  const player = typeof body.player === "string" ? body.player.trim().slice(0, 80) : "Bilinmiyor";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 1000) : "";
  const matched = Array.isArray(body.matched_keywords) ? body.matched_keywords.filter(x => typeof x === "string").slice(0, 20) : [];
  if (!message || !matched.length) return NextResponse.json({ error: "Mesaj ve eşleşen kelime zorunludur." }, { status: 400 });
  const normalized = message.replace(/\s+/g, " ").toLocaleLowerCase("tr-TR");
  const fallbackDigest = createHash("sha256").update((player.toLocaleLowerCase("tr-TR") + "|" + normalized + "|" + String(Math.floor(Date.now() / 20000))), "utf8").digest("hex");
  const suppliedDigest = typeof body.dedupe_hash === "string" && /^[a-f0-9]{64}$/i.test(body.dedupe_hash) ? body.dedupe_hash.toLowerCase() : fallbackDigest;
  const row = {
    player: player || "Bilinmiyor",
    message,
    matched_keywords: [...new Set(matched)],
    game_time_text: typeof body.game_time_text === "string" ? body.game_time_text.slice(0, 80) : null,
    source: "ldplayer-ocr",
    dedupe_hash: suppliedDigest
  };
  try {
    const { data, error } = await getSupabaseAdmin().from("chat_messages").upsert(row, { onConflict: "dedupe_hash", ignoreDuplicates: true }).select("id");
    if (error) throw error;
    return NextResponse.json({ ok: true, stored: Boolean(data?.length) });
  } catch (error) {
    return NextResponse.json({ error: "Kayıt yapılamadı: " + (error.message || "veritabanı hatası") }, { status: 500 });
  }
}
