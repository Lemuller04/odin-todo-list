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

  Events.subscribe("deleteTodoButton:pressed", deleteTodo);
  Events.subscribe("editTodoItem:submited", editTodo);
  Events.subscribe("page:loaded", setTodosArray);
  Events.subscribe("newTodoItem:submited", addTodo);

  return {
    getTodo,
  };
})();

export default Todos;
