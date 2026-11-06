import { NextResponse } from "next/server";
import { getSupabaseAdmin, getIstanbulDayBounds, hasDashboardSession } from "../_lib";

export const runtime = "nodejs";

export async function GET(request) {
  if (!(await hasDashboardSession())) return NextResponse.json({ error: "Oturum gerekli." }, { status: 401 });
  try {
    const params = new URL(request.url).searchParams;
    const day = params.get("date");
    const supabase = getSupabaseAdmin();
    let query = supabase.from("chat_messages").select("player,matched_keywords").order("created_at", { ascending: false }).limit(10000);
    if (day) {
      const bounds = getIstanbulDayBounds(day);
      if (!bounds) return NextResponse.json({ error: "Tarih biçimi geçersiz." }, { status: 400 });
      query = query.gte("created_at", bounds.start).lt("created_at", bounds.end);
    }
    const { data, error } = await query;
    if (error) throw error;
    const players = new Map();
    const keywords = new Map();
    for (const row of data || []) {
      const name = row.player || "Bilinmiyor";
      players.set(name, (players.get(name) || 0) + 1);
      for (const word of row.matched_keywords || []) keywords.set(word, (keywords.get(word) || 0) + 1);
    }
    const sort = map => [...map.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
    return NextResponse.json({ total: data?.length || 0, players: sort(players).slice(0, 20), keywords: sort(keywords) });
  } catch (error) {
    return NextResponse.json({ error: "İstatistik alınamadı: " + (error.message || "veritabanı hatası") }, { status: 500 });
  }
}
