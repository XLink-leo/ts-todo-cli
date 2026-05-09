#!/bin/bash

while true
do
    clear
    echo "======================"
    echo "   待办清单工具"
    echo "======================"
    echo "1. 查看所有待办"
    echo "2. 添加待办"
    echo "3. 标记完成"
    echo "4. 删除待办"
    echo "0. 退出"
    echo "======================"
    read -p "请输入选项：" opt

    case $opt in
        1)
            node dist/index.js list
            ;;
        2)
            read -p "请输入待办内容：" text
            node dist/index.js add "$text"
            ;;
        3)
            read -p "请输入待办ID：" id
            node dist/index.js done $id
            ;;
        4)
            read -p "请输入要删除的ID：" id
            node dist/index.js del $id
            ;;
        0)
            exit 0
            ;;
        *)
            echo "无效选项"
            ;;
    esac
    read -p "按回车继续..."
done