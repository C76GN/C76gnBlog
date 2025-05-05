import { defineConfig } from 'vitepress'
import fs from 'fs' // 导入 Node.js 文件系统模块
import path from 'path' // 导入 Node.js 路径模块
import { fileURLToPath } from 'url' // 导入用于转换 ES Module URL 到路径的函数

// Helper function to get files and generate sidebar items
function getSidebarItems(dir: string, baseLink: string) {
  // 使用 import.meta.url 获取当前文件URL，然后转换为路径
  const currentFilePath = fileURLToPath(import.meta.url); // 获取 config.mts 的文件路径
  const currentDir = path.dirname(currentFilePath);      // 获取 config.mts 所在的目录 (.vitepress)
  const directoryPath = path.resolve(currentDir, `../${dir}`); // 解析目标目录 (如 .vitepress/../dreams)

  try {
    // 读取目录内容，过滤掉 index.md 和非 .md 文件
    const files = fs.readdirSync(directoryPath)
      .filter(file => file.endsWith('.md') && file !== 'index.md')
      .map(file => {
        const filePath = path.join(directoryPath, file);
        // 读取文件内容以提取标题
        let title = path.basename(file, '.md'); // 默认使用文件名
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          // 尝试从 Markdown 文件内容中提取第一个 H1 标题作为 text
          const titleMatch = content.match(/^#\s+(.*)/m);
          if (titleMatch && titleMatch[1]) {
            title = titleMatch[1].trim(); // 使用 H1 标题
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
    // 如果目录不存在或读取出错，打印警告并返回空数组
    if (error.code === 'ENOENT') {
      console.warn(`Directory not found or empty: ${directoryPath}. Skipping sidebar generation for this section.`);
    } else {
      console.error(`Error reading directory ${directoryPath}:`, error);
    }
    return []; // 出错时返回空数组
  }
}

export default defineConfig({
  lang: 'zh-CN',
  title: "C76gnBlog",
  description: "主要是记录我的梦，写的诗等等",

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
        collapsed: false, // 梦境默认展开
        items: getSidebarItems('dreams', '/dreams') // 动态生成梦境侧边栏
      },
      {
        text: '诗',
        collapsed: true, // 诗歌默认折叠
        items: getSidebarItems('poems', '/poems') // 动态生成诗歌侧边栏
      },
    ],

    socialLinks: [ // 可以添加你的 Github 或其他社交链接
      { icon: 'github', link: 'https://github.com/C76GN' }
    ],

    footer: {
      message: 'Released under the MIT License.', // 或者你喜欢的版权信息
      copyright: 'Copyright © 2024-present C76GN' // 修改为你自己的名字和年份
    },

    // 如果需要，可以添加编辑链接等其他配置
    // editLink: {
    //   pattern: 'https://github.com/your-username/your-repo/edit/main/:path', // 替换成你的仓库链接
    //   text: '在 GitHub 上编辑此页'
    // }
  }
})