import Events from "./events.js";
import createTodo from "./todo.js";

const Todos = (() => {
  let todos = [];

  function setTodosArray() {
    todos =
      localStorage.length > 0 ? JSON.parse(localStorage.getItem("todos")) : [];
    Events.publish("todosArray:updated", todos);
  }

  function addTodo(data) {
    const newTodo = createTodo(
      data.title,
      data.description,
      data.duedate,
      data.importance,
      data.project,
    );
    todos[todos.length] = newTodo;

    Events.publish("newTodo:added", todos);
  }

  function getTodo(id) {
    for (let todo of todos) {
      if (todo.id === id) {
        return todo;
      }
    }
    return undefined;
  }

  function getIndexOf(id) {
    let index = 0;
    for (let todo of todos) {
      if (todo.id === id) {
        return index;
      }
      index++;
    }
    return -1;
  }

  function editTodo(info) {
    const newTodo = createTodo(
      info[0].title,
      info[0].description,
      info[0].duedate,
      info[0].importance,
      info[0].project,
    );
    todos[getIndexOf(info[1])] = newTodo;

    Events.publish("todo:edited", todos);
  }

  function deleteTodo(id) {
    const newTodos = [];
    for (let todo of todos) {
      if (todo.id != id) {
        newTodos.push(todo);
      }
    }
    todos = newTodos;

    Events.publish("todo:deleted", todos);
  }

  function markTodoAsComplete(id) {
    for (let todo of todos) {
      if (todo.id === id) {
        todo.completed = true;
      }
    }
    Events.publish("todo:completed", todos);
  }

  function unmarkTodoAsComplete(id) {
    for (let todo of todos) {
      if (todo.id === id) {
        todo.completed = false;
      }
    }
    Events.publish("todo:uncompleted", todos);
  }

  function getTodosByProject(button) {
    if (button.textContent === "All Projects") {
      Events.publish("todos:filtered", todos);
      return;
    }

    const todosFiltered = [];
    for (let todo of todos) {
      if (todo.project === button.textContent) {
        todosFiltered.push(todo);
      }
    }

    Events.publish("todos:filtered", todosFiltered);
  }

  Events.subscribe("sidebarProject:clicked", getTodosByProject);
  Events.subscribe("todoComplete:unchecked", unmarkTodoAsComplete);
  Events.subscribe("todoComplete:checked", markTodoAsComplete);
  Events.subscribe("deleteTodoButton:pressed", deleteTodo);
  Events.subscribe("editTodoItem:submited", editTodo);
  Events.subscribe("page:loaded", setTodosArray);
  Events.subscribe("newTodoItem:submited", addTodo);

  return {
    getTodo,
  };
})();

export default Todos;
