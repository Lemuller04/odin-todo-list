import Events from "./events.js";

const InputHandler = (() => {
  const newTodoForm = document.querySelector(".new-todo-form");
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document
      .querySelector("input[name=new-todo-title]")
      .value.trim();
    const description = document
      .querySelector("textarea[name=todo-desc]")
      .value.trim();
    const duedate = document.querySelector(
      "input[name=new-todo-duedate]",
    ).value;
    const importance = document.querySelector(
      "select[name=new-todo-importance]",
    ).value;
    const project = document
      .querySelector("input[name=new-todo-project]")
      .value.trim();

    const todoData = { title, description, duedate, importance, project };

    Events.publish("newTodoItem:submited", todoData);

    newTodoForm.reset();
  });
})();

export default InputHandler;
