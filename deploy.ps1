# CRC32 文件校验计算器 - GitHub Pages 快速部署脚本 (PowerShell)

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "CRC32 Calculator - GitHub 部署脚本" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# 检查是否已配置 Git
try {
    git rev-parse --git-dir 2>&1 | Out-Null
} catch {
    Write-Host "⚠️  未检测到 Git 仓库，正在初始化..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git 仓库初始化完成" -ForegroundColor Green
}

# 提示用户输入信息
$username = Read-Host "请输入您的 GitHub 用户名"
$repoName = Read-Host "请输入您的仓库名称（默认：hash，直接回车使用默认值）"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "hash"
}

Write-Host ""
Write-Host "📝 配置信息：" -ForegroundColor Yellow
Write-Host "  - 用户名: $username"
Write-Host "  - 仓库名: $repoName"
Write-Host "  - 部署地址: https://$username.github.io/$repoName/"
Write-Host ""

# 确认信息
$confirm = Read-Host "信息是否正确？(y/n)"
if ($confirm -ne "y") {
    Write-Host "❌ 已取消部署" -ForegroundColor Red
    exit
}

# 检查是否需要更新 vite.config.js
if ($repoName -ne "hash") {
    Write-Host ""
    Write-Host "⚠️  检测到仓库名不是 'hash'" -ForegroundColor Yellow
    Write-Host "请手动修改 vite.config.js 中的 base 配置："
    Write-Host "  base: process.env.NODE_ENV === 'production' ? '/$repoName/' : './'" -ForegroundColor Cyan
    Write-Host ""
    $modified = Read-Host "已修改完成？(y/n)"
    if ($modified -ne "y") {
        Write-Host "❌ 请先修改配置后再运行此脚本" -ForegroundColor Red
        exit
    }
}

# 添加所有文件
Write-Host ""
Write-Host "📦 添加文件到 Git..." -ForegroundColor Yellow
git add .

# 提交
$commitMsg = Read-Host "请输入提交信息（默认：Deploy to GitHub Pages，直接回车使用默认值）"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Deploy to GitHub Pages"
}
git commit -m $commitMsg

# 设置主分支
Write-Host "🔄 设置主分支为 main..." -ForegroundColor Yellow
git branch -M main

# 添加远程仓库
$remoteUrl = "https://github.com/$username/$repoName.git"
Write-Host "🔗 添加远程仓库: $remoteUrl" -ForegroundColor Yellow

# 检查是否已存在 origin
try {
    git remote get-url origin 2>&1 | Out-Null
    Write-Host "⚠️  检测到已存在的 origin，正在更新..." -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
} catch {
    git remote add origin $remoteUrl
}

# 推送到 GitHub
Write-Host "🚀 推送代码到 GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "✅ 代码已成功推送到 GitHub！" -ForegroundColor Green
Write-Host ""
Write-Host "📋 接下来的步骤：" -ForegroundColor Cyan
Write-Host "  1. 访问 https://github.com/$username/$repoName/settings/pages"
Write-Host "  2. 在 'Build and deployment' 部分"
Write-Host "  3. 将 'Source' 设置为 'GitHub Actions'"
Write-Host "  4. 等待几分钟后访问 https://$username.github.io/$repoName/"
Write-Host ""
Write-Host "🎉 部署完成！" -ForegroundColor Green
Write-Host ""
Write-Host "💡 提示：您可以在 Actions 标签页查看部署进度" -ForegroundColor Yellow
Write-Host "   https://github.com/$username/$repoName/actions"
