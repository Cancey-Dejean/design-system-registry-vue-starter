const robotsResponseHeaders = {
  "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  "Content-Type": "text/plain; charset=utf-8",
} as const;

export default defineEventHandler(() => {
  const body = ["User-agent: *", "Allow: /"].join("\n");

  return new Response(body, { headers: robotsResponseHeaders });
});
