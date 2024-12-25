import { defineConfig } from "vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [cloudflareDevProxy(), reactRouter(), tsconfigPaths()],
});
