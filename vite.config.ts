/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-11-15 15:58:01
 * @LastEditTime: 2023-11-17 15:28:53
 * @Description:
 */
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from "vite";
import { readFileSync } from 'fs';
import vue from "@vitejs/plugin-vue";
//自动引入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import wasm from '@rollup/plugin-wasm';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./public', import.meta.url)),
    },
  },
  plugins: [
    {
      name: 'wgsl-loader',
      transform(src, id) {
        if (id.endsWith('.wgsl')) {
          // 在这里处理 .wgsl 文件的加载和转换
          const content = readFileSync(id, 'utf-8');
          return `export default ${JSON.stringify(content)};`;
        }
      },
    },
    vue(),
    wasm(),
    //自动导入
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      dirs: [
        "src/hooks/**",
        "src/utils/**",
        "src/store/**",
        "src/api/**",
        "src/directives/**",
        "src/enums/**",
      ],
      dts: "./typings/auto-imports.d.ts",
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dts: "./typings/components.d.ts",
    }),
  ],
});
