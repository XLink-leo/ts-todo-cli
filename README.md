# TS 待办清单工具

基于 `Node.js` + TypeScript 开发的命令行待办管理工具，支持本地 JSON 持久化，重启程序数据不丢失。
## 功能特性 
✅ 新增待办事项

✅ 查看全部待办清单

✅ 标记任务为已完成

✅ 删除指定待办任务

✅ 本地 JSON 持久化存储，重启不丢失数据

## 项目结构
```
├── src/            # TypeScript 源码目录
│   └── index.ts    # 程序主入口
├── dist/           # 编译后 JS 输出目录
├── todos.json      # 本地待办数据文件
├── push.bat        # Windows 一键提交推送
├── push.sh         # Linux 一键提交推送
└── README.md       # 说明文档
```
## 编译运行
1. 编译 TypeScript
```bash
tsc
```
2. 使用命令
```bash
# 查看所有待办
node dist/index.js list

# 添加待办
node dist/index.js add 待办内容

# 标记完成
node dist/index.js done 任务ID

# 删除待办
node dist/index.js del 任务ID
```
## 一键推送到 GitHub

Linux / Mac

```bash
chmod +x push.sh
./push.sh "更新内容"
```

Windows

双击 `push.bat` 即可自动提交并推送。

## 数据持久化
所有数据保存在 `todos.json` 文件中，删除即可清空数据。

**Enjoy it!**