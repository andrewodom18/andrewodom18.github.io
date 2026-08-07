import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://aodom.dev",
  output: "static",
  outDir: "./site",
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()]
  }
});
