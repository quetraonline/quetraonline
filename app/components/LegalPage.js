import SiteNavigation from "./SiteNavigation";
import VisitorCounter from "./VisitorCounter";

export default function LegalPage({ eyebrow, title, intro, sections, updatedAt }) {
  return (
    <main className="quetra-site legal-page">
      <SiteNavigation active="home" />
      <div className="legal-shell">
        <a className="contact-back" href="/">‹ Ana Sayfaya Dön</a>
        <article className="legal-panel">
          <p className="contact-eyebrow">{eyebrow || "QUETRAONLINE"}</p>
          <h1>{title}</h1>
          <p className="legal-updated">Son güncelleme: {updatedAt || "19 Kasım 2026"}</p>
          <p className="legal-intro">{intro}</p>
          {sections.map((section) => (
            <section className="legal-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {(section.paragraphs || []).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              {section.items?.length ? (
                <ul>{section.items.map((item, index) => <li key={index}>{item}</li>)}</ul>
              ) : null}
            </section>
          ))}
          <p className="legal-contact">Sorularınız için <a href="mailto:quetraonline@gmail.com">quetraonline@gmail.com</a> adresinden iletişime geçebilirsiniz.</p>
        </article>
      </div>
      <footer className="site-footer">
        <img className="footer-logo" src="/quetra-logo.svg?v=20261108" alt="QuetraOnline" />
        <VisitorCounter />
        <nav className="legal-footer-links" aria-label="Yasal bağlantılar">
          <a href="/terms-of-service">Kullanım Koşulları</a>
          <a href="/privacy-policy">Gizlilik Politikası</a>
          <a href="/iletisim">İletişim</a>
        </nav>
        <p>© 2026 QuetraOnline.com - Tüm hakları saklıdır.</p>
      </footer>
    </main>
  );
}
