import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "C76gnBlog", // 来自你的初始化设置
  description: "It mainly records my dreams", // 来自你的初始化设置

  // 主题配置
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [ // 顶部导航
      { text: '首页', link: '/' },
      { text: '梦境', link: '/dreams/2024-05-02-真实的世界' } // 链接到第一个梦境
      // 可以添加其他链接，比如 { text: '关于', link: '/about' } (如果你创建了 about.md)
    ],

    sidebar: [ // 侧边栏配置！
      {
        text: '梦境档案', // 侧边栏分组标题
        // collapsed: false, // 可以设置为 true 让其默认折叠
        items: [ // 分组下的页面列表
          // 链接路径是相对于项目根目录的，省略 .md 后缀
          { text: '真实的世界', link: '/dreams/2024-05-02-真实的世界' },
          // 添加更多梦境...
          // { text: '长老', link: '/dreams/2024-01-13-长老' }, // 假设你创建了对应的md文件
          // ... 其他梦境文件的链接
        ]
      }
    ],

    socialLinks: [ // 页眉的社交链接 (可选)
      // { icon: 'github', link: 'https://github.com/vuejs/vitepress' } // 示例
    ]
  }
})