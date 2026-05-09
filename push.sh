#!/bin/bash

# 获取提交信息（默认：update）
msg=${1:-"update: 自动同步代码"}

echo "===== 自动提交并推送 ====="
git add .
git commit -m "$msg"
git push

echo "✅ 推送完成！"