import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import taiwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), taiwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
});
