import LegalPage from "../components/LegalPage";

export const metadata = {
  title: "Kullanım Koşulları | QuetraOnline",
  description: "QuetraOnline web sitesinin kullanım koşulları.",
  alternates: { canonical: "/terms-of-service" },
};

const sections = [
  {
    heading: "1. Hizmetin kapsamı",
    paragraphs: [
      "QuetraOnline; yayıncıya ait sosyal medya ve canlı yayın kanallarını bir arada tanıtan, herkese açık yayın ve içerik bağlantılarını sunan bir web sitesidir. Site üzerinde platformlara ait bağlantılar, herkese açık içerik bilgileri ve yayın arşivi öğeleri gösterilebilir.",
      "TikTok bağlantısı, hesap sahibinin açık izniyle temel profil bilgileri ve TikTok tarafından izin verilen herkese açık video bilgilerinin QuetraOnline'da görüntülenebilmesini amaçlar. Kullanılabilir özellikler TikTok'un verdiği izinlere ve API erişim onaylarına bağlıdır."
    ]
  },
  {
    heading: "2. Üçüncü taraf platformlar",
    paragraphs: [
      "YouTube, Twitch, Kick, TikTok ve diğer dış hizmetler kendi hizmet koşullarına ve gizlilik politikalarına tabidir. QuetraOnline bu platformların sahibi veya işletmecisi değildir. Dış bağlantılara erişim ve bu platformların hizmetlerinin kullanılmasından ilgili platformun koşulları sorumludur."
    ]
  },
  {
    heading: "3. Kullanım kuralları",
    items: [
      "Siteyi yürürlükteki mevzuata ve ilgili platformların kurallarına uygun kullanmalısınız.",
      "Siteye, bağlantılı hesaplara veya altyapıya zarar vermeye, yetkisiz erişim sağlamaya ya da hizmeti aksatmaya yönelik girişimlerde bulunmamalısınız.",
      "Üçüncü taraf içeriklerin haklarına ve platformların kullanım koşullarına uymalısınız."
    ]
  },
  {
    heading: "4. İçerik ve hizmetin kullanılabilirliği",
    paragraphs: [
      "Dış platformların erişim, API, yayın arşivi ve içerik verileri zaman içinde değişebilir. Bu nedenle bazı içerikler geçici olarak görüntülenemeyebilir veya güncel olmayabilir. QuetraOnline, üçüncü taraf platformlardan alınan bilgilerin kesintisiz veya hatasız olacağını garanti etmez."
    ]
  },
  {
    heading: "5. Fikri mülkiyet",
    paragraphs: [
      "QuetraOnline'a ait site tasarımı, metin ve markalama unsurları ilgili hak sahiplerine aittir. YouTube, Twitch, Kick, TikTok ve diğer üçüncü taraf markaları kendi hak sahiplerine aittir. Üçüncü taraf logoları ve içerikleri yalnızca ilgili platformu tanımlamak veya o platforma bağlantı vermek amacıyla kullanılır."
    ]
  },
  {
    heading: "6. Değişiklikler ve iletişim",
    paragraphs: [
      "Bu koşullar gerektiğinde güncellenebilir. Güncel metin bu sayfada yayımlandığı tarihten itibaren geçerlidir. Kullanımla ilgili sorularınız için quetraonline@gmail.com adresine yazabilirsiniz."
    ]
  }
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Kullanım Koşulları"
      intro="Bu koşullar QuetraOnline web sitesini kullanımınızı düzenler. Siteyi kullanarak aşağıdaki koşulları kabul etmiş olursunuz."
      sections={sections}
    />
  );
}
