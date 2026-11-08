export const revalidate = 300;

function findVideoRenderers(node, found = []) {
  if (!node || typeof node !== "object") return found;
  if (node.videoRenderer?.videoId) found.push(node.videoRenderer);
  if (node.gridVideoRenderer?.videoId) found.push(node.gridVideoRenderer);
  if (node.richItemRenderer?.content?.videoRenderer?.videoId) {
    found.push(node.richItemRenderer.content.videoRenderer);
  }
  for (const value of Object.values(node)) {
    if (value && typeof value === "object") findVideoRenderers(value, found);
  }
  return found;
}

function textOf(value) {
  if (!value) return "";
  if (typeof value.simpleText === "string") return value.simpleText;
  if (Array.isArray(value.runs)) return value.runs.map((run) => run.text || "").join("");
  return "";
}

export async function GET() {
  try {
    const response = await fetch("https://www.youtube.com/@quetraonline/streams", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
        "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8",
      },
      next: { revalidate: 300 },
    });
    if (!response.ok) throw new Error("YouTube sayfası alınamadı");
    const html = await response.text();
    const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/s)
      || html.match(/ytInitialData\s*=\s*(\{.*?\})\s*;\s*<\/script>/s);
    if (!match) throw new Error("YouTube yayın listesi bulunamadı");

    const initialData = JSON.parse(match[1]);
    const renderers = findVideoRenderers(initialData);
    const unique = new Map();
    for (const video of renderers) {
      if (!video.videoId || unique.has(video.videoId)) continue;
      const title = textOf(video.title);
      const thumbnails = video.thumbnail?.thumbnails || video.thumbnail?.contents?.flatMap((item) => item?.thumbnail?.thumbnails || []) || [];
      const thumbnail = thumbnails[thumbnails.length - 1]?.url
        || `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
      const meta = [textOf(video.publishedTimeText), textOf(video.viewCountText)].filter(Boolean).join(" · ");
      unique.set(video.videoId, {
        id: video.videoId,
        title: title || "QuetraOnline canlı yayın kaydı",
        thumbnail,
        url: `https://www.youtube.com/watch?v=${video.videoId}`,
        meta,
      });
    }
    return Response.json({ videos: Array.from(unique.values()).slice(0, 5) });
  } catch (error) {
    return Response.json({ videos: [], error: "Yayın listesi şu anda alınamıyor." }, { status: 200 });
  }
}
