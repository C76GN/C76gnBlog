// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import GiscusComment from './GiscusComment.vue' // 导入刚才创建的组件
import { h } from 'vue'
import type { EnhanceAppContext } from 'vitepress'

export default {
    ...DefaultTheme, // 继承默认主题
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // 使用插槽将 Giscus 组件插入到文档页脚之前
            // 相关插槽: https://vitepress.dev/guide/extending-default-theme#layout-slots
            'doc-footer-before': () => h(GiscusComment)
        })
    },
    // 如果需要，可以在这里添加其他 enhanceApp 逻辑
    // enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    // ...
    // }
}