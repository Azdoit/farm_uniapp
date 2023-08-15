import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path, { resolve } from 'path'
import Unocss from 'unocss/vite'
import AutoImport from "unplugin-auto-import/vite";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      /** @ 符号指向 src 目录 */
      // eslint-disable-next-line no-undef
      '@': resolve(__dirname, '/src')
    }
  },
  plugins: [
    uni(),
    Unocss(),
    AutoImport({
      imports: ["vue", "uni-app", "pinia"],
    }),
  ],
})
