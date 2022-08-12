import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
const mdPlugin = require("vite-plugin-markdown");
export default defineConfig({
  // ...
  plugins: [
    // ...
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    mdPlugin.plugin({
      mode: ["html"],
    }),
  ],
});
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })
