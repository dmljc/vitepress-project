import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "前端记事本",
    description: "描述信息",
    base: "/vitepress-project/",
    head: [["link", { rel: "icon", href: "./favicon.ico" }]],
    lastUpdated: true,
    themeConfig: {
        logo: "/logo.png", // 表示docs/public/avartar.png
        nav: [
            { text: "Home", link: "/" },
            { text: "Examples", link: "/markdown-examples" },
        ],
        sidebar: [
            {
                text: "Examples",
                items: [
                    { text: "Markdown Examples", link: "/markdown-examples" },
                    { text: "Runtime API Examples", link: "/api-examples" },
                ],
            },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ],
        search: {
            provider: "local",
        },
        // 编辑链接
        editLink: {
            pattern: "https://github.com/dmljc/vitepress-project/tree/main/docs/:path", // 自己项目仓库地址
            text: "在 github 上编辑此页",
        },
        lastUpdatedText: "最后更新", // string
        // 右侧边栏配置，默认值是"In hac pagina"
        outlineTitle: "本页目录",
        // 站点页脚配置
        footer: {
            message: "Released under the MIT License",
            copyright: "Copyright © 2023-present Lao Yuan",
        },
    },
});
