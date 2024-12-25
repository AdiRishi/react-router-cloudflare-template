import { defineConfig } from "vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { getLoadContext } from "./workers/load-context";

export default defineConfig(() => ({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [
    cloudflareDevProxy({
      getLoadContext,
    }),
    reactRouter(),
    tsconfigPaths(),
  ],
}));
