import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export const prerender = true;

export async function GET() {
  const resume = await readFile(resolve("output/pdf/Andrew-Odom-Resume.pdf"));

  return new Response(new Uint8Array(resume), {
    headers: {
      // This is prerendered. Cloudflare response headers live in public/_headers;
      // GitHub Pages uses the PDF content type and the link's download attribute.
      "Content-Type": "application/pdf"
    }
  });
}
