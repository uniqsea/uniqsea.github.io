# 个人学术主页（React + Vite）

本项目为个人学术主页，基于 React（JavaScript）与 Vite 构建，已包含：

- 首页布局：关于我、研究方向、论文发表、教学、学术服务、联系
- 响应式样式与暗色模式适配
- GitHub Actions 自动部署到 GitHub Pages 的工作流（`main` 分支 push 自动发布）

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## 部署到 GitHub Pages

本仓库已包含工作流 `.github/workflows/deploy.yml`，默认在 `main` 分支 push 时自动构建并发布到 Pages。

首次需要在仓库 Settings → Pages 中将 Source 设置为 “GitHub Actions”。

## 自定义内容

编辑 `src/App.jsx` 中的：

- `name`、`title`、`affiliation`
- `contacts`：邮箱、学术主页链接等
- `interests`：研究方向
- `publications`：论文列表（标题、作者、会议/期刊、链接）
- `teaching`：授课/助教信息
- `services`：学术服务

如需修改页面标题与 SEO 元信息，编辑 `index.html` 中的 `<title>` 和 `<meta>`。
