var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s)
                        if (Object.prototype.hasOwnProperty.call(s, p))
                            t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
    var mode = _a.mode;
    process.env = __assign(
        __assign({}, process.env),
        loadEnv(mode, process.cwd()),
    );
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
    };
});
