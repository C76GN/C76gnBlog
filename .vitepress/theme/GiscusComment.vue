<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useData } from 'vitepress';

const { isDark, page } = useData();

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

const giscusTheme = ref(isDark.value ? 'dark' : 'light');
const giscusContainer = ref<HTMLDivElement | null>(null);

const loadGiscus = () => {
    const container = giscusContainer.value;
    if (!container) {
        console.error('Giscus container ref not available.');
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
    console.log(`Giscus loaded for path: ${page.value?.relativePath}`);
};

watch(isDark, (dark) => {
    giscusTheme.value = dark ? 'dark' : 'light';
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage({ giscus: { setConfig: { theme: giscusTheme.value } } }, 'https://giscus.app');
    }
}, { immediate: true });

watch(
    () => page.value?.relativePath,
    (newPath, oldPath) => {
        if (newPath && newPath !== oldPath) {
            nextTick(() => {
                loadGiscus();
            });
        }
    },
    { immediate: true }
);

</script>

<template>
    <div ref="giscusContainer" id="giscus-container" style="margin-top: 2rem;">
    </div>
</template>