import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        dts({
            compilerOptions: { outDir: "./dist" },
            rollupTypes: true,
            include: ["./lib/", "globals.d.ts"],
        }),
    ],
    base: "./",
    build: {
        outDir: "./dist",
        lib: {
            entry: resolve(__dirname, "lib"),
            name: "ReactAnimatedPolylineCursor",
            fileName: "index",
        },
        rollupOptions: {
            external: ["react"],
            output: {
                globals: {
                    react: "React",
                },
            },
        },
    },
    resolve: {
        alias: [{ find: "@lib/", replacement: resolve(__dirname, "lib") }],
    },
});
