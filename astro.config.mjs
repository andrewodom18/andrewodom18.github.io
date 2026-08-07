import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://andrewodom18.github.io",
  output: "static",
  outDir: "./site",
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()]
  }
});
