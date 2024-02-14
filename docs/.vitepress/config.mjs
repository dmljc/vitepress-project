import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "前端记事本",
    description: "描述信息x",
    base: "/vitepress-project",
    head: [["link", { rel: "icon", href: "./favicon.ico" }]],
    lastUpdated: true,
    themeConfig: {
        logo: "/logo.png", 
        nav: [
            { text: "首页", link: "/" },
            { text: "3D可视化", link: "/threejs/index" },
        ],
        sidebar: {
            // 当用户位于 `threejs` 目录时，会显示此侧边栏
            '/threejs/': [
                {
                    text: '基础概念',
                    items: [
                        { text: '虚拟场景 Scene', link: '/threejs/phaseA/scene' },
                        { text: '虚拟相机 Camera', link: '/threejs/phaseA/camera' },
                        { text: '渲染器 Renderer', link: '/threejs/phaseA/renderer' },
                        { text: '坐标系 AxesHelper', link: '/threejs/phaseA/axesHelper' },
                    ]
                },
                {
                    text: '第二章',
                    items: [
                        { text: '第一节', link: '/threejs/phaseB/1' },
                        { text: '第二节', link: '/threejs/phaseB/2' }
                    ]
                }
            ],
        },
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
            copyright: "Copyright © 2024-present Zhang Fang Chao",
        },
    },
});
