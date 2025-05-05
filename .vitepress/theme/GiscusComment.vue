<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useData } from 'vitepress';

// Correctly get the 'page' object which contains path information
const { isDark, page } = useData(); // Get 'page' instead of 'route'

// --- Giscus 配置值 (来自你的设置) ---
const repo = 'C76GN/C76gnBlog';
const repoId = 'R_kgDOOkoG-Q';
const category = 'Comments';
const categoryId = 'DIC_kwDOOkoG-c4CpyKf';
const mapping = 'pathname';
const reactionsEnabled = '1';
const emitMetadata = '0';
const inputPosition = 'top';
const lang = 'zh-CN';
const giscusThemeBase = 'preferred_color_scheme';
const strict = '0';
const loading = 'lazy';
// --- 配置结束 ---

const giscusTheme = ref(isDark.value ? 'dark' : 'light');

watch(isDark, (dark) => {
    giscusTheme.value = dark ? 'dark' : 'light';
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
            { giscus: { setConfig: { theme: giscusTheme.value } } },
            'https://giscus.app'
        );
    }
}, { immediate: true });

onMounted(() => {
    // Ensure page data is available before trying to use it indirectly (via key change)
    // Although the key change handles component re-creation, defensive checks are good.
    if (!page.value) {
        console.error("Page data not available on mount.");
        // Decide if you want to prevent Giscus loading without page context
        // return;
    }

    const container = document.getElementById('giscus-container');
    if (!container) {
        console.error('Giscus container not found');
        return;
    }

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-strict', strict);
    script.setAttribute('data-reactions-enabled', reactionsEnabled);
    script.setAttribute('data-emit-metadata', emitMetadata);
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-theme', giscusTheme.value);
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-loading', loading);

    container.appendChild(script);
});
</script>

<template>
    <!-- Use page.relativePath for the key, ensuring 'page' exists -->
    <div id="giscus-container" :key="page ? page.relativePath : 'giscus-ssr-fallback'" style="margin-top: 2rem;">
        <!-- Giscus 评论组件将加载在这里 -->
    </div>
</template>