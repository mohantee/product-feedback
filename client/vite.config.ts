import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import postcssNesting from "postcss-nesting";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  //@ts-ignore
  plugins: [react(), svgr({ exportAsDefault: true })],
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
});
