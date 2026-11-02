# Haiyang Xu — Personal Website

个人主页与作品集，使用 React、Vite 和 styled-components，部署到 GitHub Pages。

## 开发

```sh
npm ci
npm run dev
npm run build
npm run preview
```

生产构建输出到 `dist/`。GitHub Actions 配置位于 `.github/workflows/deploy.yml`。

## 目录

| 目录 | 用途 |
| --- | --- |
| `src/pages/` | 首页、项目、论文、摄影、设计等页面 |
| `src/components/` | 共用界面组件 |
| `src/data/` | 个人信息、项目、论文和摄影内容 |
| `src/content/` | 项目详情 Markdown |
| `src/assets/` | 当前源码引用的图片、封面和图标 |
| `src/features/` | 独立交互功能，包括访客地球 |
| `src/context/`、`src/config/`、`src/utils/` | 偏好设置、配置和共用工具 |
| `public/` | 按原路径发布的照片、论文 PDF、视频、favicon 和 SEO 文件 |
| `scripts/` | 网站资源处理工具及其输入数据 |
| `docs/` | 本地设计草稿、归档与检查记录，Git 忽略 |

`src/data.js` 是现有内容模块的统一导出入口。

## 内容与资源维护

- 在 `src/data/` 更新页面内容，在 `src/content/projects/` 编写项目详情。
- 摄影原图放在 `public/moments/`，运行 `npm run optimize-images` 生成 `thumbs/` 和 `full/`。原图和压缩图都有用途，请一起保留。
- `npm run gen-globe` 和 `npm run gen-voronoi` 使用 `scripts/data/` 重新生成访客地球的数据。该功能有独立页面路由。
- `src/assets/` 只收录正在使用的资源。未定稿 Logo、封面备选和源图放在 `docs/`，明确采用后再进入源码。
- 品牌实验及生成脚本集中放在 `docs/brand/`，脚本入口为 `docs/brand/scripts/`。这些文件仅在本地保留。
- 截图等检查产物放在 `docs/qa/`；临时工具生成的 `output/` 也由 Git 忽略。
- 与网站无关的研究材料归档到 `docs/archive/`。

Git 忽略不影响已经被跟踪的文件；本地归档不是备份，重要源文件应另行备份。恢复已移出仓库的旧资源时，也可查阅 Git 历史。
