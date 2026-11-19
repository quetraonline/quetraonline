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
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];
}
