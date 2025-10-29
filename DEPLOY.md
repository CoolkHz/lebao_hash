# GitHub Pages 部署指南

本文档详细说明如何将 CRC32 文件校验计算器部署到 GitHub Pages。

## 📋 前置要求

- 已有 GitHub 账号
- 已安装 Git
- 项目代码已在本地准备好

## 🚀 部署步骤

### 第一步：创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `hash`（或其他名称，注意后续需要同步修改配置）
   - **Description**: CRC32 文件校验计算器
   - **Public/Private**: 选择 Public（GitHub Pages 免费版仅支持公开仓库）
   - **不要**勾选 "Initialize this repository with a README"
4. 点击 "Create repository"

### 第二步：配置 Vite 基础路径（如果仓库名不是 hash）

如果您的 GitHub 仓库名**不是** `hash`，需要修改 `vite.config.js`：

```javascript
// 将 '/hash/' 改为 '/你的仓库名/'
base: process.env.NODE_ENV === 'production' ? '/你的仓库名/' : './'
```

例如，如果仓库名是 `crc32-calculator`，则改为：

```javascript
base: process.env.NODE_ENV === 'production' ? '/crc32-calculator/' : './'
```

### 第三步：推送代码到 GitHub

在项目根目录（`d:\project\lebao\hash`）打开终端，执行以下命令：

```bash
# 初始化 Git 仓库（如果还未初始化）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: CRC32 文件校验计算器"

# 设置主分支名称为 main
git branch -M main

# 添加远程仓库（替换 YOUR_USERNAME 和 YOUR_REPO_NAME）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 推送到 GitHub
git push -u origin main
```

**示例**：
```bash
# 假设用户名是 zhangsan，仓库名是 hash
git remote add origin https://github.com/zhangsan/hash.git
git push -u origin main
```

### 第四步：配置 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Pages**
4. 在 "Build and deployment" 部分：
   - **Source**: 选择 **GitHub Actions**（而不是 Deploy from a branch）
5. 点击 **Save**（保存）

### 第五步：等待自动部署

1. 推送代码后，GitHub Actions 会自动触发部署流程
2. 前往仓库的 **Actions** 标签页查看部署进度
3. 部署成功后，您会看到绿色的 ✅ 标记
4. 部署通常需要 1-3 分钟

### 第六步：访问网站

部署成功后，访问以下地址：

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

**示例**：
- 用户名：zhangsan
- 仓库名：hash
- 访问地址：`https://zhangsan.github.io/hash/`

## 🔄 后续更新

每次修改代码后，只需执行：

```bash
git add .
git commit -m "描述你的修改"
git push
```

GitHub Actions 会自动重新构建和部署。

## ⚙️ GitHub Actions 工作流说明

项目已配置 `.github/workflows/deploy.yml` 文件，它会：

1. ✅ 检测推送到 main 分支的代码
2. ✅ 设置 Node.js 环境
3. ✅ 安装项目依赖
4. ✅ 运行生产构建（`npm run build`）
5. ✅ 部署构建产物到 GitHub Pages

## 🐛 常见问题

### 问题 1：部署失败，提示权限错误

**解决方案**：
1. 进入仓库 Settings → Actions → General
2. 找到 "Workflow permissions"
3. 选择 "Read and write permissions"
4. 勾选 "Allow GitHub Actions to create and approve pull requests"
5. 点击 Save

### 问题 2：网站访问显示 404

**可能原因**：
1. base 路径配置不正确
2. GitHub Pages 未正确设置为 GitHub Actions

**解决方案**：
- 检查 `vite.config.js` 中的 `base` 配置是否与仓库名一致
- 确认 Settings → Pages 的 Source 是 "GitHub Actions"

### 问题 3：样式或资源加载失败

**可能原因**：base 路径错误

**解决方案**：
- 确保 `vite.config.js` 的 base 路径以 `/` 开头和结尾
- 正确格式：`'/hash/'` 或 `'/你的仓库名/'`

### 问题 4：如何使用自定义域名？

1. 在 Settings → Pages → Custom domain 中输入域名
2. 在域名提供商处添加 CNAME 记录指向 `YOUR_USERNAME.github.io`
3. 修改 `vite.config.js`：
   ```javascript
   base: process.env.NODE_ENV === 'production' ? '/' : './'
   ```

## 📊 部署验证清单

- [ ] GitHub 仓库已创建
- [ ] `vite.config.js` 的 base 路径已正确配置
- [ ] 代码已推送到 GitHub
- [ ] GitHub Pages 设置为 GitHub Actions
- [ ] Actions 工作流运行成功（绿色 ✅）
- [ ] 网站可以正常访问
- [ ] 文件上传和 CRC32 计算功能正常

## 🎉 部署成功！

现在您可以分享您的 GitHub Pages 链接给其他人使用了！

---

**提示**：GitHub Pages 是静态托管服务，所有文件处理都在用户浏览器本地完成，不会有任何数据上传到服务器，完全保护用户隐私。
