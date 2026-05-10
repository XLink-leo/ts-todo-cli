#!/bin/bash

echo "==================================="
echo "📥 开始拉取 GitHub 最新代码"
echo "==================================="

# 拉取远程 main 最新代码
git fetch origin
git reset --hard origin/main

echo "==================================="
echo "✅ 已同步 GitHub 最新代码到本地"
echo "==================================="