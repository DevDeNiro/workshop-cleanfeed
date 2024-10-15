import { defineConfig, loadEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    // const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react()],
        resolve: {
            alias: [
                { find: "@", replacement: path.resolve(__dirname, "src") },
                {
                    find: "@api",
                    replacement: path.resolve(__dirname, "src/api"),
                },
                {
                    find: "@redux",
                    replacement: path.resolve(__dirname, "src/redux"),
                },
                {
                    find: "@utils",
                    replacement: path.resolve(__dirname, "src/utils"),
                },
                {
                    find: "@assets",
                    replacement: path.resolve(__dirname, "src/assets"),
                },
                {
                    find: "@components",
                    replacement: path.resolve(__dirname, "src/components"),
                },
                {
                    find: "@atoms",
                    replacement: path.resolve(
                        __dirname,
                        "src/components/atoms",
                    ),
                },
                {
                    find: "@molecules",
                    replacement: path.resolve(
                        __dirname,
                        "src/components/molecules",
                    ),
                },
                {
                    find: "@organisms",
                    replacement: path.resolve(
                        __dirname,
                        "src/components/organisms",
                    ),
                },
                {
                    find: "@templates",
                    replacement: path.resolve(
                        __dirname,
                        "src/components/templates",
                    ),
                },
                {
                    find: "@pages",
                    replacement: path.resolve(
                        __dirname,
                        "src/components/pages",
                    ),
                },
            ],
        },
        server: {
            proxy: {
                "/api": {
                    target: "http://localhost:3000",
                    changeOrigin: true,
                },
                "/iamconfiguration": {
                    target: "https://localhost:5001",
                    changeOrigin: true,
                    secure: false, // Si le certificat SSL est auto-signé
                },
            },
        },
    } as UserConfig;
});
