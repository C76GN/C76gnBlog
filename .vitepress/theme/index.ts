import DefaultTheme from 'vitepress/theme'
import GiscusComment from './GiscusComment.vue'
import BackToTop from './BackToTop.vue'
import { h } from 'vue'

export default {
    ...DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            'doc-footer-before': () => h(GiscusComment),
            'layout-bottom': () => h(BackToTop)
        })
    },
}