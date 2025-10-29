# CRC32 文件校验计算器

一个纯前端的文件 CRC32 校验值计算器，基于 Vue 3 + Vite 构建。

## ✨ 特性

- 🔒 **隐私保护**: 所有计算在浏览器本地完成，文件不会上传到服务器
- ⚡ **快速计算**: 使用高效的 CRC32 算法库
- 📊 **进度显示**: 大文件计算时显示实时进度
- 💾 **分块处理**: 智能处理大文件，避免内存溢出
- 📋 **一键复制**: 支持复制十六进制和十进制格式的 CRC32 值
- 🎨 **精美界面**: 现代化的 UI 设计，支持响应式布局
- 🖱️ **拖拽上传**: 支持文件拖拽和点击选择两种方式

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 生产构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 📦 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **CRC32 库**: crc-32
- **样式方案**: CSS3 + 动画效果

## 🚢 部署到 GitHub Pages

本项目已配置 GitHub Actions 自动部署到 GitHub Pages。

### 部署步骤

1. **创建 GitHub 仓库**（如果还没有）
   ```bash
   # 在 GitHub 上创建一个新仓库，假设仓库名为 hash
   ```

2. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/hash.git
   git push -u origin main
   ```

3. **配置 GitHub Pages**
   - 进入仓库的 Settings → Pages
   - Source 选择 "GitHub Actions"
   - 保存设置

4. **自动部署**
   - 每次推送到 main 分支时，GitHub Actions 会自动构建并部署
   - 部署完成后，访问 `https://你的用户名.github.io/hash/`

### 重要说明

- 如果仓库名不是 `hash`，需要修改 `vite.config.js` 中的 `base` 配置
- 将 `/hash/` 改为 `/你的仓库名/`

```javascript
base: process.env.NODE_ENV === 'production' ? '/你的仓库名/' : './'
```

## 🏗️ 项目结构

```
hash/
├── src/
│   ├── components/          # Vue 组件
│   │   ├── FileUploader.vue    # 文件上传组件
│   │   ├── ProgressBar.vue     # 进度条组件
│   │   └── CRC32Result.vue     # 结果展示组件
│   ├── composables/         # 组合式函数
│   │   ├── useFileUpload.js    # 文件上传逻辑
│   │   ├── useCRC32.js         # CRC32 计算逻辑
│   │   └── useFormatter.js     # 格式化工具
│   ├── utils/               # 工具函数
│   │   ├── fileReader.js       # 文件读取工具
│   │   └── validators.js       # 验证函数
│   ├── App.vue              # 根组件
│   ├── main.js              # 入口文件
│   └── style.css            # 全局样式
├── index.html
├── vite.config.js
└── package.json
```

## 💡 使用说明

1. **选择文件**: 点击"选择文件"按钮或拖拽文件到指定区域
2. **自动计算**: 文件选择后会自动开始计算 CRC32 值
3. **查看结果**: 计算完成后显示文件信息和 CRC32 校验值（十六进制和十进制）
4. **复制结果**: 点击复制按钮可将结果复制到剪贴板
5. **重新计算**: 点击"重新计算"按钮可选择其他文件

## 🔧 功能特点

### 文件大小处理策略

- **小文件 (< 10MB)**: 一次性读取并计算
- **大文件 (≥ 10MB)**: 分块读取（每块 2MB），显示实时进度

### 浏览器兼容性

- Chrome 63+
- Firefox 53+
- Safari 13+
- Edge 79+ (Chromium)

## 📝 许可证

MIT License

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [crc-32](https://www.npmjs.com/package/crc-32) - CRC32 算法实现

---

**注意**: 本应用完全在浏览器本地运行，不会收集或上传您的任何文件数据。
