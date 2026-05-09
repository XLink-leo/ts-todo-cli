import * as fs from 'fs';
import * as path from 'path';

interface Todo {
  id: number;
  content: string;
  done: boolean;
}

// 数据文件路径
const DATA_FILE = path.join(__dirname, '../todos.json');
let todoList: Todo[] = [];

// 从文件加载待办
function loadTodos() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      todoList = JSON.parse(raw);
    }
  } catch (e) {
    todoList = [];
  }
}

// 保存待办到文件
function saveTodos() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todoList, null, 2), 'utf8');
}

// 展示所有待办
function showTodos() {
  console.log("\n===== 我的待办清单 =====");
  if (todoList.length === 0) {
    console.log("暂无待办事项");
    return;
  }
  todoList.forEach(item => {
    const status = item.done ? "✅ 已完成" : "⬜ 未完成";
    console.log(`${item.id}. ${status} ${item.content}`);
  });
}

// 新增待办
function addTodo(content: string) {
  const newTodo: Todo = {
    id: Date.now(),
    content,
    done: false
  };
  todoList.push(newTodo);
  saveTodos();
  console.log("添加成功！");
  showTodos();
}

// 标记完成
function finishTodo(id: number) {
  const todo = todoList.find(item => item.id === id);
  if (todo) {
    todo.done = true;
    saveTodos();
    console.log("已标记为完成！");
  } else {
    console.log("找不到该待办ID");
  }
  showTodos();
}

// 删除待办
function deleteTodo(id: number) {
  const beforeLen = todoList.length;
  todoList = todoList.filter(item => item.id !== id);
  if (todoList.length < beforeLen) {
    saveTodos();
    console.log("删除成功！");
  } else {
    console.log("找不到该待办ID");
  }
  showTodos();
}

function run() {
  // 程序启动先加载数据
  loadTodos();

  const args = process.argv.slice(2);
  const cmd = args[0];

  switch (cmd) {
    case "add":
      const text = args.slice(1).join(" ");
      addTodo(text);
      break;
    case "done":
      const todoId = parseInt(args[1]);
      finishTodo(todoId);
      break;
    case "del":
      const delId = parseInt(args[1]);
      deleteTodo(delId);
      break;
    case "list":
      showTodos();
      break;
    default:
      console.log("可用命令：");
      console.log("  node dist/index.js add 待办内容");
      console.log("  node dist/index.js done 待办ID");
      console.log("  node dist/index.js del 待办ID");
      console.log("  node dist/index.js list");
  }
}

run();