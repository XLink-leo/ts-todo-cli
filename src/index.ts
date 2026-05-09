interface Todo {
  id: number;
  content: string;
  done: boolean;
}

let todoList: Todo[] = [];

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

function addTodo(content: string) {
  const newTodo: Todo = {
    id: Date.now(),
    content,
    done: false
  };
  todoList.push(newTodo);
  console.log("添加成功！");
  showTodos();
}

function finishTodo(id: number) {
  const todo = todoList.find(item => item.id === id);
  if (todo) {
    todo.done = true;
    console.log("已标记为完成！");
  } else {
    console.log("找不到该待办ID");
  }
  showTodos();
}

function run() {
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
    case "list":
      showTodos();
      break;
    default:
      console.log("可用命令：");
      console.log("  node dist/index.js add 待办内容");
      console.log("  node dist/index.js list");
      console.log("  node dist/index.js done 待办ID");
  }
}

run();