#!/bin/bash

# CRC32 文件校验计算器 - GitHub Pages 快速部署脚本

echo "=================================="
echo "CRC32 Calculator - GitHub 部署脚本"
echo "=================================="
echo ""

# 检查是否已配置 Git
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "⚠️  未检测到 Git 仓库，正在初始化..."
    git init
    echo "✅ Git 仓库初始化完成"
fi

# 提示用户输入信息
read -p "请输入您的 GitHub 用户名: " username
read -p "请输入您的仓库名称（默认：hash）: " repo_name
repo_name=${repo_name:-hash}

echo ""
echo "📝 配置信息："
echo "  - 用户名: $username"
echo "  - 仓库名: $repo_name"
echo "  - 部署地址: https://$username.github.io/$repo_name/"
echo ""

# 确认信息
read -p "信息是否正确？(y/n): " confirm
if [ "$confirm" != "y" ]; then
    echo "❌ 已取消部署"
    exit 1
fi

# 检查是否需要更新 vite.config.js
if [ "$repo_name" != "hash" ]; then
    echo ""
    echo "⚠️  检测到仓库名不是 'hash'"
    echo "请手动修改 vite.config.js 中的 base 配置："
    echo "  base: process.env.NODE_ENV === 'production' ? '/$repo_name/' : './'"
    echo ""
    read -p "已修改完成？(y/n): " modified
    if [ "$modified" != "y" ]; then
        echo "❌ 请先修改配置后再运行此脚本"
        exit 1
    fi
fi

# 添加所有文件
echo ""
echo "📦 添加文件到 Git..."
git add .

# 提交
read -p "请输入提交信息（默认：Deploy to GitHub Pages）: " commit_msg
commit_msg=${commit_msg:-Deploy to GitHub Pages}
git commit -m "$commit_msg"

# 设置主分支
echo "🔄 设置主分支为 main..."
git branch -M main

# 添加远程仓库
remote_url="https://github.com/$username/$repo_name.git"
echo "🔗 添加远程仓库: $remote_url"

# 检查是否已存在 origin
if git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  检测到已存在的 origin，正在更新..."
    git remote set-url origin "$remote_url"
else
    git remote add origin "$remote_url"
fi

# 推送到 GitHub
echo "🚀 推送代码到 GitHub..."
git push -u origin main

echo ""
echo "✅ 代码已成功推送到 GitHub！"
echo ""
echo "📋 接下来的步骤："
echo "  1. 访问 https://github.com/$username/$repo_name/settings/pages"
echo "  2. 在 'Build and deployment' 部分"
echo "  3. 将 'Source' 设置为 'GitHub Actions'"
echo "  4. 等待几分钟后访问 https://$username.github.io/$repo_name/"
echo ""
echo "🎉 部署完成！"
