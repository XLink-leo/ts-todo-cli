#!/bin/bash
msg=${1:-"项目更新"}

echo "==================================="
echo "🚀 提交：$msg"
echo "==================================="

# jj 记录版本
jj describe -m "$msg"
jj bookmark set main

# git 强制推送（100%成功）
git add .
git commit -m "$msg"
git push -f

echo "==================================="
echo "✅ GitHub 已同步！大功告成！"
echo "==================================="