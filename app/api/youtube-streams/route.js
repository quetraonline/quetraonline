export const revalidate = 300;

function extractJsonAfter(html, marker) {
  const markerIndex = html.indexOf(marker);
  if (markerIndex < 0) return null;
  const equalsIndex = html.indexOf("=", markerIndex + marker.length);
  const start = html.indexOf("{", equalsIndex);
  if (equalsIndex < 0 || start < 0) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < html.length; i += 1) {
    const char = html[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') inString = true;
    else if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) return html.slice(start, i + 1);
    }
  }
  return null;
}

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

function fromRenderers(renderers) {
  const unique = new Map();
  for (const video of renderers) {
    if (!video.videoId || unique.has(video.videoId)) continue;
    const title = textOf(video.title);
    const thumbnails = video.thumbnail?.thumbnails
      || video.thumbnail?.contents?.flatMap((item) => item?.thumbnail?.thumbnails || [])
      || [];
    const thumbnail = thumbnails[thumbnails.length - 1]?.url
      || "https://i.ytimg.com/vi/" + video.videoId + "/hqdefault.jpg";
    const published = textOf(video.publishedTimeText);
    const views = textOf(video.shortViewCountText) || textOf(video.viewCountText);
    const meta = [published, views ? "◉ " + views : ""].filter(Boolean).join(" · ");
    unique.set(video.videoId, {
      id: video.videoId,
      title: title || "QuetraOnline canlı yayın kaydı",
      thumbnail,
      url: "https://www.youtube.com/watch?v=" + video.videoId,
      meta,
    });
  }
  return Array.from(unique.values()).slice(0, 5);
}

function decodeXml(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function fromRss(xml) {
  return Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g))
    .slice(0, 5)
    .map(([, entry]) => {
      const read = (tag) => decodeXml(entry.match(new RegExp("<" + tag + ">([\\s\\S]*?)</" + tag + ">"))?.[1] || "");
      const id = read("yt:videoId");
      const title = read("title");
      const published = read("published");
      const thumbnail = entry.match(/<media:thumbnail[^>]+url="([^"]+)"/)?.[1]
        || "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
      return id ? {
        id,
        title: title || "QuetraOnline yayın kaydı",
        thumbnail,
        url: "https://www.youtube.com/watch?v=" + id,
        meta: published ? new Date(published).toLocaleDateString("tr-TR") : "",
      } : null;
    })
    .filter(Boolean);
}

export async function GET() {
  try {
    const response = await fetch("https://www.youtube.com/@quetraonline/streams", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36",
        "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8",
      },
      signal: AbortSignal.timeout(12000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("YouTube HTTP " + response.status);
    const html = await response.text();

    const jsonText = extractJsonAfter(html, "ytInitialData")
      || extractJsonAfter(html, 'window["ytInitialData"]');
    if (jsonText) {
      const data = JSON.parse(jsonText);
      const videos = fromRenderers(findVideoRenderers(data));
      if (videos.length) {
        return Response.json({ videos, source: "youtube-streams" }, {
          headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
        });
      }
    }

    const channelId = html.match(/"externalId"\s*:\s*"(UC[^"]+)"/)?.[1]
      || html.match(/"channelId"\s*:\s*"(UC[^"]+)"/)?.[1];
    if (channelId) {
      const rssResponse = await fetch("https://www.youtube.com/feeds/videos.xml?channel_id=" + channelId, {
        headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "tr-TR,tr;q=0.9" },
        signal: AbortSignal.timeout(10000),
        cache: "no-store",
      });
      if (rssResponse.ok) {
        const videos = fromRss(await rssResponse.text());
        if (videos.length) {
          return Response.json({ videos, source: "youtube-rss" }, {
            headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
          });
        }
      }
    }

    throw new Error("YouTube yanıtında yayın listesi veya kanal RSS kaydı bulunamadı");
  } catch (error) {
    console.error("[youtube-streams] Yayınlar alınamadı:", error);
    return Response.json(
      { videos: [], error: "YouTube yayınları şu anda alınamıyor." },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}
