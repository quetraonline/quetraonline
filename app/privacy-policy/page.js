import LegalPage from "../components/LegalPage";

export const metadata = {
  title: "Gizlilik Politikası | QuetraOnline",
  description: "QuetraOnline tarafından işlenen bilgiler ve gizlilik uygulamaları.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  {
    heading: "1. Hangi bilgiler işlenebilir?",
    paragraphs: [
      "QuetraOnline'ı ziyaret ettiğinizde hizmetin güvenli ve çalışır durumda tutulması için sunucu günlüklerinde teknik bilgiler (örneğin istek zamanı, istenen sayfa ve hata kayıtları) işlenebilir.",
      "TikTok hesabınızı QuetraOnline'a bağlamayı seçerseniz, verdiğiniz izinlerin kapsamına göre TikTok kullanıcı kimliği (open_id), görünen ad ve profil görseli gibi temel profil bilgileri alınabilir. video.list izni onaylanmış ve etkinleştirilmişse herkese açık video bilgileri de istenebilir."
    ]
  },
  {
    heading: "2. OAuth erişim bilgileri",
    paragraphs: [
      "Hesap bağlantısı sırasında TikTok tarafından verilen erişim ve yenileme anahtarları, uygulamanın sunucu tarafında şifrelenerek saklanır. Bu anahtarlar web sayfasının ziyaretçilerine gösterilmez ve tarayıcı koduna aktarılmaz. Benzer OAuth bağlantılarında diğer platformların verdiği yetkiler de yalnızca ilgili bağlantı amacıyla işlenir."
    ]
  },
  {
    heading: "3. Bilgileri hangi amaçlarla kullanıyoruz?",
    items: [
      "Bağlanan hesabın kimliğini doğrulamak ve bağlantı durumunu yönetmek.",
      "İzin verilen profil ve herkese açık içerik bilgilerini QuetraOnline'da göstermek.",
      "Hizmetin güvenliğini, kararlılığını ve teknik sorunların giderilmesini sağlamak."
    ]
  },
  {
    heading: "4. Paylaşım ve hizmet sağlayıcılar",
    paragraphs: [
      "Kişisel bilgiler satılmaz veya reklam amacıyla üçüncü taraflara kiralanmaz. Hizmetin çalışması için gerekli veriler, barındırma ve veritabanı altyapısı sağlayıcıları gibi teknik hizmet sağlayıcıları tarafından işlenebilir. TikTok ve diğer platformlarla yapılan veri alışverişi, ilgili platformun API ve gizlilik koşullarına tabidir."
    ]
  },
  {
    heading: "5. Saklama ve bağlantıyı kaldırma",
    paragraphs: [
      "OAuth erişim bilgileri, ilgili platform bağlantısı etkin olduğu sürece bağlantıyı sağlamak ve yetkilendirilmiş özellikleri sunmak amacıyla saklanır. Bağlantının kaldırılmasını veya hesabınıza ait OAuth verilerinin silinmesini istemek için quetraonline@gmail.com adresinden bize ulaşabilirsiniz. Yetkilendirmeyi ilgili platformun hesap ayarlarından da geri alabilirsiniz."
    ]
  },
  {
    heading: "6. Güvenlik",
    paragraphs: [
      "OAuth erişim anahtarları sunucu tarafında şifreli olarak saklanır ve herkese açık istemci kodunda tutulmaz. İnternet üzerinden veri aktarımında ve saklamada uygun teknik önlemler uygulanır; ancak hiçbir elektronik sistem mutlak güvenlik garantisi veremez."
    ]
  },
  {
    heading: "7. Çocukların gizliliği",
    paragraphs: [
      "QuetraOnline çocuklara yönelik bir hizmet olarak tasarlanmamıştır. Bilerek çocuklara ait kişisel veri toplamayı amaçlamıyoruz."
    ]
  },
  {
    heading: "8. Politika değişiklikleri ve iletişim",
    paragraphs: [
      "Bu politika hizmetin özellikleri veya yasal gereklilikler değiştikçe güncellenebilir. Güncel sürüm bu sayfada yayımlanır. Gizlilikle ilgili talepleriniz için quetraonline@gmail.com adresine yazabilirsiniz."
    ]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Gizlilik Politikası"
      intro="Bu politika, QuetraOnline web sitesini ziyaret ettiğinizde veya bir sosyal medya hesabını yetkilendirerek bağladığınızda bilgilerinizin nasıl işlendiğini açıklar."
      sections={sections}
    />
  );
}
