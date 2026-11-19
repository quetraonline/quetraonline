import ContactForm from "../components/ContactForm";
import VisitorCounter from "../components/VisitorCounter";
import SiteNavigation from "../components/SiteNavigation";

export const metadata = { title: "İletişim | QuetraOnline - Resmi Web Sitesi", description: "QuetraOnline ile iletişime geçin." };

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  let heroLogoVisible = true;
  try {
    const response = await fetch("https://hfmosadynxpwkscvpard.supabase.co/rest/v1/quetra_site_settings?select=hero_logo_visible&id=eq.true", {
      headers: { apikey: "sb_publishable_1UDqJWj6DAKrx7tfWMs2lA_nW-Ee29S", Authorization: "Bearer sb_publishable_1UDqJWj6DAKrx7tfWMs2lA_nW-Ee29S" },
      cache: "no-store",
    });
    if (response.ok) {
      const settings = await response.json();
      if (typeof settings[0]?.hero_logo_visible === "boolean") heroLogoVisible = settings[0].hero_logo_visible;
    }
  } catch {}
  return (
    <main className="quetra-site contact-page">
      <SiteNavigation active="contact" />
      {heroLogoVisible && (
        <section className="hero-banner" id="home">
          <div className="hero-sky" />
          <div className="hero-copy">
            <img className="hero-logo" src="/quetra-logo.svg?v=20261108" alt="QuetraOnline" />
          </div>
        </section>
      )}
      <div className="contact-shell">
        <a className="contact-back" href="/"><span className="contact-back-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14.5 5 7.5 12l7 7M8 12h12" /></svg></span><span>Ana Sayfaya Dön</span></a>
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
        <nav className="legal-footer-links" aria-label="Yasal bağlantılar">
            <a href="/terms-of-service">Kullanım Koşulları</a>
            <a href="/privacy-policy">Gizlilik Politikası</a>
            <a href="/iletisim">İletişim</a>
          </nav>
          <p>© 2026 QuetraOnline.com - Tüm hakları saklıdır.</p>
        <p>Sorun ve şikayetleriniz için <a href="/iletisim">İletişim</a> sayfasından bana ulaşın.</p>
      </footer>
    </main>
  );
}
