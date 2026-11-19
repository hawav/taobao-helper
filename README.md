# 淘宝助手

使用 Vue 3、Vite 和 Tailwind CSS 4 的商品链接清理工具。全部处理在浏览器本地完成，无后端、无分析追踪。

## 开发

```sh
npm install
npm run dev
npm test
npm run build
```

输出在 `dist/`，可部署到 GitHub Pages、Cloudflare Pages 或其他静态托管平台。

## GitHub Pages

仓库已包含 `.github/workflows/deploy.yml`，推送到 `main` 后自动测试、构建与发布。仓库 Settings → Pages → Source 选择 GitHub Actions。免费个人账号使用公开仓库即可免费托管。构建时自动按仓库名设置资源路径。

支持淘宝与天猫域名的商品详情链接，保留数字 `id`、可选 SKU 和链接已有的活动参数 `xxc`（用于平台加补）。`sku_id` 统一输出为 `skuId`，也支持 `sku_properties` 指定规格。短链接需先打开再复制详情页地址。保留原始域名与路径，移除其他 query 和 hash。
