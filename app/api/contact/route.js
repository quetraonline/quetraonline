import { NextResponse } from "next/server";

function clean(value, max) {
  return String(value || "").trim().slice(0, max);
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true });
    const name = clean(body.name, 80);
    const email = clean(body.email, 120);
    const subject = clean(body.subject, 120);
    const message = clean(body.message, 4000);

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || subject.length < 3 || message.length < 10) {
      return NextResponse.json({ error: "Lütfen tüm alanları doğru şekilde doldurun." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!apiKey || !from) {
      return NextResponse.json({ error: "E-posta gönderimi henüz yapılandırılmadı. Lütfen daha sonra tekrar deneyin." }, { status: 503 });
    }

    const safe = (value) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: ["quetraonline@gmail.com"],
        reply_to: email,
        subject: `İletişim Formu: ${subject}`,
        html: `<h2>QuetraOnline İletişim Formu</h2><p><b>Ad Soyad:</b> ${safe(name)}</p><p><b>E-posta:</b> ${safe(email)}</p><p><b>Konu:</b> ${safe(subject)}</p><p><b>Mesaj:</b></p><p style="white-space:pre-wrap">${safe(message)}</p>`
      })
    });
    if (!response.ok) {
      console.error("Resend error:", await response.text());
      return NextResponse.json({ error: "E-posta gönderilemedi. Lütfen biraz sonra tekrar deneyin." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Geçersiz istek. Lütfen tekrar deneyin." }, { status: 400 });
  }
}
