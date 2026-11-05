export default function AdminInfo() {
  return (
    <main style={{ minHeight: "100vh", background: "#111615", color: "#eee", padding: "12vh 8vw", fontFamily: "Arial, sans-serif" }}>
      <a href="/" style={{ color: "#c4a36b" }}>← Siteye dön</a>
      <h1 style={{ fontSize: "clamp(42px,8vw,76px)", margin: "35px 0 15px" }}>QUETRA ONLINE / ADMIN</h1>
      <p style={{ maxWidth: 650, lineHeight: 1.8, color: "#b8bcb4" }}>Bu alan başlangıç sürümünde yönetim paneli bilgilendirme sayfasıdır. İçeriklerin güvenli biçimde tüm cihazlarda yönetilebilmesi için sonraki adımda giriş sistemi ve ortak veritabanı bağlanmalıdır.</p>
      <p><a href="https://github.com/quetraonline/quetraonline" style={{ color: "#c4a36b" }}>GitHub projesini aç ↗</a></p>
    </main>
  );
}
