import "./styles.css";

import Events from "./classes/events.js";
import Storage from "./classes/storage.js";
import InputHandler from "./classes/inputs.js";
import Display from "./classes/display.js";
import Todos from "./classes/todos.js";

const Index = (() => {
  document.addEventListener("DOMContentLoaded", () => {
    Events.publish("page:loaded");

    setButtons();
  });

  function setButtons() {
    setAddTodoButton();
    setNewTodoFormButtons();
  }

  function setNewTodoFormButtons() {
    const cancel = document.querySelector(".cancel-new-todo");
    cancel.addEventListener("click", () => {
      Events.publish("cancelFormButton:pressed", cancel);
    });

    const reset = document.querySelector(".reset-new-todo-form");
    reset.addEventListener("click", () => {
      const input = document.querySelector("input[name=new-todo-title]");
      input.focus();
    });
  }

  function setAddTodoButton() {
    const button = document.querySelector(".new-todo-button");
    button.addEventListener("click", () => {
      Events.publish("addTodoButton:clicked", button);
    });
  }
})();

export default Index;
