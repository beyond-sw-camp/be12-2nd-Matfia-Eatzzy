import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        // 프록시할 경로
        target: "https://02bbbbe3-c971-4a76-b853-6bbbc83b2afd.mock.pstmn.io", // 대상 서버
        changeOrigin: true, // 대상 서버의 호스트 헤더 변경 여부
        rewrite: (path) => path.replace(/^\/api/, ""), // '/api' 부분 제거
      },
      "/psy": {
        target: "http://localhost:3000",
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/psy/, ""), 
      },
    },
  },
});
