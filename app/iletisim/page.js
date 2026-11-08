import ContactForm from "../components/ContactForm";

export const metadata = { title: "İletişim | QuetraOnline", description: "QuetraOnline ile iletişime geçin." };

export default function ContactPage() {
  return (
    <main className="quetra-site contact-page">
      <header className="site-header">
        <nav aria-label="Ana menü">
          <a href="/">⌂ <span>Ana Sayfa</span></a>
          <a className="active" href="/iletisim">✉ <span>İletişim</span></a>
        </nav>
      </header>
      <section className="hero-banner" id="home">
        <div className="hero-sky" />
        <div className="hero-copy">
          <img className="hero-logo" src="/quetra-logo.svg?v=20261108" alt="QuetraOnline" />
        </div>
      </section>
      <div className="contact-shell">
        <a className="contact-back" href="/">← Ana Sayfaya Dön</a>
        <section className="contact-panel">
          <p className="contact-eyebrow">QUETRAONLINE</p>
          <h1>Benimle İletişime Geçin</h1>
          <p className="contact-intro">Sorularınız, önerileriniz veya iş birliği talepleriniz için formu doldurun. Mesajınız doğrudan e-posta adresimize iletilecektir.</p>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
