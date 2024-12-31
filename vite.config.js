import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        // 프록시할 경로
        target: "http://192.0.200.118:3000", // 대상 서버
        changeOrigin: true, // 대상 서버의 호스트 헤더 변경 여부
      },
      "/psy": {
        target: "http://192.0.200.214:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/psy/, ""),
      },
      "/ysh": {
        target: "http://192.0.200.132:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ysh/, ""),
      },
      "/osj": {
        target: "http://192.0.200.18:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/osj/, ""),
      },
    },
  },
});
