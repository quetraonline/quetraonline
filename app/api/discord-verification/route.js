export async function GET() {
  return new Response("dh=d6016b6e2c63f88bec49637392109aba22d93a52\n", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
