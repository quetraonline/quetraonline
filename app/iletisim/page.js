import ContactForm from "../components/ContactForm";
import VisitorCounter from "../components/VisitorCounter";
import SiteNavigation from "../components/SiteNavigation";

export const metadata = { title: "İletişim | QuetraOnline - Resmi Web Sitesi", description: "QuetraOnline ile iletişime geçin." };

export default function ContactPage() {
  return (
    <main className="quetra-site contact-page">
      <SiteNavigation active="contact" />
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
          <p className="contact-intro">Sorularınız, önerileriniz veya iş birliği talepleriniz için formu doldurun. Mesajınız doğrudan e-posta adresime iletilecektir.</p>
          <ContactForm />
        </section>
      </div>
      <footer className="site-footer" id="contact">
        <img className="footer-logo" src="/quetra-logo.svg?v=20261108" alt="QuetraOnline" />
        <VisitorCounter />
        <p>© 2026 QuetraOnline.com - Tüm hakları saklıdır.</p>
        <p>Sorun ve şikayetleriniz için <a href="/iletisim">İletişim</a> sayfasından bana ulaşın.</p>
      </footer>
    </main>
  );
}
