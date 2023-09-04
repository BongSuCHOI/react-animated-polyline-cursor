import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        dts({ rollupTypes: true, compilerOptions: { outDir: "./dist" } }),
    ],
    base: "./",
    build: {
        outDir: "./dist",
        lib: {
            entry: resolve(__dirname, "lib"),
            name: "ReactAnimatedPolylineCursor",
        },
        rollupOptions: {
            external: ["react"],
        },
    },
    resolve: {
        alias: [{ find: "@lib/", replacement: resolve(__dirname, "lib") }],
    },
});
