import * as fs from 'fs';
import * as path from 'path';

interface Todo {
  id: number;
  content: string;
  done: boolean;
}

const DATA_FILE = path.join(__dirname, '../todos.json');
let todoList: Todo[] = [];

// 加载数据
function loadTodos() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      todoList = JSON.parse(raw);
    }
  } catch {
    todoList = [];
  }
}

// 保存数据
function saveTodos() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todoList, null, 2), 'utf8');
}

// 展示待办
function showTodos() {
  console.log("\n===== 我的待办清单 =====");
  if (todoList.length === 0) {
    console.log("暂无待办事项");
    return;
  }
  todoList.forEach(item => {
    const status = item.done ? "✅ 已完成" : "⬜ 未完成";
    console.log(`${item.id} | ${status} | ${item.content}`);
  });
}

// 新增
function addTodo(content: string) {
  const newTodo: Todo = {
    id: Date.now(),
    content,
    done: false
  };
  todoList.push(newTodo);
  saveTodos();
  console.log("✅ 添加成功");
  showTodos();
}

// 标记完成
function doneTodo(id: number) {
  const target = todoList.find(item => item.id === id);
  if (!target) {
    console.log("❌ 找不到该ID");
    return;
  }
  target.done = true;
  saveTodos();
  console.log("✅ 已标记为完成");
  showTodos();
}

// 删除单个
function delTodo(id: number) {
  const beforeLen = todoList.length;
  todoList = todoList.filter(item => item.id !== id);
  if (todoList.length === beforeLen) {
    console.log("❌ 找不到该ID");
    return;
  }
  saveTodos();
  console.log("✅ 删除成功");
  showTodos();
}

// 清空全部待办
function clearAllTodos() {
  todoList = [];
  saveTodos();
  console.log("✅ 已清空所有待办");
  showTodos();
}

function run() {
  loadTodos();
  const args = process.argv.slice(2);
  const cmd = args[0];

  switch (cmd) {
    case "list":
      showTodos();
      break;
    case "add":
      const text = args.slice(1).join(" ");
      addTodo(text);
      break;
    case "done":
      doneTodo(Number(args[1]));
      break;
    case "del":
      delTodo(Number(args[1]));
      break;
    case "clear":
      clearAllTodos();
      break;
    default:
      console.log("可用命令：");
      console.log("  list         查看所有待办");
      console.log("  add 内容     新增待办");
      console.log("  done ID      标记完成");
      console.log("  del ID       删除单个待办");
      console.log("  clear        清空全部待办");
  }
}

run();