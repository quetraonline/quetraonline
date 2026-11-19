export default function sitemap() {
  const baseUrl = "https://quetraonline.com";
  const lastModified = new Date();
  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6
    },
  ];
}
