import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端记事本",
  description: "A VitePress Site",
  base: "/",
  head: [
    // 添加图标
    ["link", { rel: "icon", href: "/favicon.ico" }],
  ],

   // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
   lastUpdated: true, // string | boolean
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    search: {
        provider: 'local'
      },

     // 编辑链接
     editLink: {
        pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path", // 自己项目仓库地址
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
  
  }
})
