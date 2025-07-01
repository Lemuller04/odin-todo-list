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

  Events.subscribe("page:loaded", setTodosArray);
  Events.subscribe("newTodoItem:submited", addTodo);
})();

export default Todos;
