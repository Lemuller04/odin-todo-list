import Events from "./events.js";

const Storage = (() => {
  function updateLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  Events.subscribe("newTodo:added", updateLocalStorage);
})();

export default Storage;
