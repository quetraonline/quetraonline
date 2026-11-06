import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { callTrackerRpc, getDashboardRpcSecret, getIstanbulDayBounds, hasDashboardSession } from "../_lib";

export const runtime = "nodejs";

export async function GET(request) {
  if (!(await hasDashboardSession())) return NextResponse.json({ error: "Oturum gerekli." }, { status: 401 });
  try {
    const params = new URL(request.url).searchParams;
    let start = null;
    let end = null;
    const day = params.get("date");
    if (day) {
      const bounds = getIstanbulDayBounds(day);
      if (!bounds) return NextResponse.json({ error: "Tarih biçimi geçersiz." }, { status: 400 });
      start = bounds.start;
      end = bounds.end;
    }
    const keywordRaw = (params.get("keyword") || "").trim();
    const keyword = ["Taş", "Felo", "Mini Taş", "Random"].find(word => word.toLocaleLowerCase("tr-TR") === keywordRaw.toLocaleLowerCase("tr-TR")) || (keywordRaw || null);
    const player = (params.get("player") || "").trim() || null;
    const data = await callTrackerRpc("tracker_get_messages", {
      p_session_secret: getDashboardRpcSecret(),
      p_start: start,
      p_end: end,
      p_keyword: keyword,
      p_player: player
    });
    return NextResponse.json({ items: Array.isArray(data) ? data : [] });
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
  const normalized = message.replace(/\\s+/g, " ").toLocaleLowerCase("tr-TR");
  const fallbackDigest = createHash("sha256").update((player.toLocaleLowerCase("tr-TR") + "|" + normalized + "|" + String(Math.floor(Date.now() / 20000))), "utf8").digest("hex");
  const suppliedDigest = typeof body.dedupe_hash === "string" && /^[a-f0-9]{64}$/i.test(body.dedupe_hash) ? body.dedupe_hash.toLowerCase() : fallbackDigest;
  try {
    const stored = await callTrackerRpc("tracker_insert_message", {
      p_ingest_token: token,
      p_player: player || "Bilinmiyor",
      p_message: message,
      p_matched_keywords: [...new Set(matched)],
      p_game_time_text: typeof body.game_time_text === "string" ? body.game_time_text.slice(0, 80) : null,
      p_dedupe_hash: suppliedDigest
    });
    return NextResponse.json({ ok: true, stored: stored === true });
  } catch (error) {
    return NextResponse.json({ error: "Kayıt yapılamadı: " + (error.message || "veritabanı hatası") }, { status: 500 });
  }
}
