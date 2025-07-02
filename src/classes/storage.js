import Events from "./events.js";

const Storage = (() => {
  function updateLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  Events.subscribe("newTodo:added", updateLocalStorage);
  Events.subscribe("todo:edited", updateLocalStorage);
  Events.subscribe("todo:deleted", updateLocalStorage);
  Events.subscribe("todo:completed", updateLocalStorage);
  Events.subscribe("todo:uncompleted", updateLocalStorage);
})();

export default Storage;
