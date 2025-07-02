import Events from "./events.js";
import Todos from "./todos.js";

const InputHandler = (() => {
  function setUpForms() {
    setUpNewTodoForm();
    setUpEditTodoForm();
  }

  function fillEditingInputs(button) {
    const id = button.getAttribute("data-id");
    const todo = Todos.getTodo(id);

    document.querySelector("input[name=edit-todo-title]").value = todo.title;
    document.querySelector("textarea[name=edit-todo-desc]").value =
      todo.description;
    document.querySelector("input[name=edit-todo-duedate]").value =
      todo.duedate;
    document.querySelector("select[name=edit-todo-importance]").value =
      todo.importance;
    document.querySelector("input[name=edit-todo-project]").value =
      todo.project;
    document.querySelector(".edit-todo-id").setAttribute("data-id", id);
  }

  function setUpEditTodoForm() {
    const editTodoForm = document.querySelector(".edit-todo-form");

    editTodoForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document
        .querySelector("input[name=edit-todo-title]")
        .value.trim();
      const description = document
        .querySelector("textarea[name=edit-todo-desc]")
        .value.trim();
      const duedate = document.querySelector(
        "input[name=edit-todo-duedate]",
      ).value;
      const importance = document.querySelector(
        "select[name=edit-todo-importance]",
      ).value;
      const project = document
        .querySelector("input[name=edit-todo-project]")
        .value.trim();

      const todoData = { title, description, duedate, importance, project };
      const id = document
        .querySelector(".edit-todo-id")
        .getAttribute("data-id");

      Events.publish("editTodoItem:submited", [todoData, id]);

      editTodoForm.reset();
    });
  }

  function setUpNewTodoForm() {
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
  }

  function setUpTodoCardButtons(buttons) {
    buttons[0].addEventListener("click", () => {
      Events.publish("todoCardEditButton:pressed", buttons[0]);
    });
    buttons[1].addEventListener("click", () => {
      Events.publish("todoDeleteButton:pressed", buttons[1]);
    });
    buttons[2].addEventListener("change", () => {
      Events.publish("todoCheckbox:changed", buttons[2]);
    });
  }

  function deleteCard(button) {
    const id = button.getAttribute("data-id");
    Events.publish("deleteTodoButton:pressed", id);
  }

  Events.subscribe("todoDeleteButton:pressed", deleteCard);
  Events.subscribe("todoCardEditButton:pressed", fillEditingInputs);
  Events.subscribe("page:loaded", setUpForms);
  Events.subscribe("todoCardButtons:added", setUpTodoCardButtons);
})();

export default InputHandler;
