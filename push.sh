#!/bin/bash
msg=${1:-"自动更新"}

echo "==================================="
echo "🚀 提交：$msg"
echo "==================================="

jj describe -m "$msg"
git add .
git commit -m "$msg"
git push origin HEAD:main -f

echo "==================================="
echo "✅ 成功推送到 GitHub！"
echo "==================================="