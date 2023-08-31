import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
        host: true,
        port: 3000,
    },
    preview: {
        open: true,
        host: true,
        port: 8080,
    },
    build: {
        outDir: "./docs",
    },
});
