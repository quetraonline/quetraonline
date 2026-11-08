"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");
    setBusy(true);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Mesaj gönderilemedi.");
      form.reset();
      setStatus("Mesajın başarıyla gönderildi. En kısa sürede dönüş yapacağız.");
    } catch (error) {
      setStatus(error.message || "Bir hata oluştu. Lütfen tekrar dene.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>Adınız Soyadınız<input name="name" type="text" autoComplete="name" minLength={2} maxLength={80} placeholder="Adınızı yazın" required /></label>
      <label>E-posta Adresiniz<input name="email" type="email" autoComplete="email" maxLength={120} placeholder="ornek@mail.com" required /></label>
      <label>Konu<input name="subject" type="text" minLength={3} maxLength={120} placeholder="Mesajınızın konusu" required /></label>
      <label>Mesajınız<textarea name="message" rows={6} minLength={10} maxLength={4000} placeholder="Bana iletmek istediklerinizi yazın..." required /></label>
      <input className="contact-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" disabled={busy}>{busy ? "Gönderiliyor..." : "✉  Mesajı Gönder"}</button>
      {status && <p className="contact-status" role="status">{status}</p>}
    </form>
  );
}
