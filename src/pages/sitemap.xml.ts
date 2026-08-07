import { portfolioContent } from "../data/portfolio";

export const prerender = true;

export function GET() {
  const paths = ["/", "/work/", "/resume/"];
  const urls = paths
    .map((path) => `<url><loc>${new URL(path, portfolioContent.site.url)}</loc></url>`)
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      }
    }
  );
}
