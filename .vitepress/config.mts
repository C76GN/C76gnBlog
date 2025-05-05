import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
function getSidebarItems(dir: string, baseLink: string) {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDir = path.dirname(currentFilePath);
  const directoryPath = path.resolve(currentDir, `../${dir}`);

  try {
    const files = fs.readdirSync(directoryPath)
      .filter(file => file.endsWith('.md') && file !== 'index.md')
      .map(file => {
        const filePath = path.join(directoryPath, file);
        let title = path.basename(file, '.md');
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const titleMatch = content.match(/^#\s+(.*)/m);
          if (titleMatch && titleMatch[1]) {
            title = titleMatch[1].trim();
          }
        } catch (readError) {
          console.warn(`Could not read file ${filePath} to extract title:`, readError);
        }

        return {
          text: title,
          link: `${baseLink}/${path.basename(file, '.md')}`
        }
      })
      .sort((a, b) => a.link.localeCompare(b.link));

    return files;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn(`Directory not found or empty: ${directoryPath}. Skipping sidebar generation for this section.`);
    } else {
      console.error(`Error reading directory ${directoryPath}:`, error);
    }
    return [];
  }
}

export default defineConfig({
  lang: 'zh-CN',
  title: "C76gnBlog",
  description: "主要是记录我的梦，写的诗等等",
  head: [
    ['link', { rel: 'icon', href: '.vitepress/public/favicon.ico' }]
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
    ],

    search: {
      provider: 'local'
    },

    sidebar: [
      {
        text: '梦境',
        collapsed: false,
        items: getSidebarItems('dreams', '/dreams')
      },
      {
        text: '诗',
        collapsed: false,
        items: getSidebarItems('poems', '/poems')
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/C76GN' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present C76GN'
    },
  }
})