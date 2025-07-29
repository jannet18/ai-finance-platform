import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import taiwindcss from "tailwindcss";
import Path2D from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), taiwindcss()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": Path2D.resolve(__dirname, "./src/components"),
      "@utils": Path2D.resolve(__dirname, "./src/utils"),
    },
  },
});
