import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dts: false,
      // 不用手动注册组件,默认'src/compoenents'导出
      resolvers: [VantResolver({ importStyle: false })],
    }),
    // 手动导入svg插件
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    }),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
