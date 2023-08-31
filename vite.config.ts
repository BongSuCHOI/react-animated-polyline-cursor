import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
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
    resolve: {
        alias: [
            { find: "@src/", replacement: resolve(__dirname, "src") },
            { find: "@lib/", replacement: resolve(__dirname, "lib") },
        ],
    },
});
