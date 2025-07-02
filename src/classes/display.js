import searchIcon from "./../icons/magnify.svg";
import profilePicture from "./../icons/hornet.png";
import editIcon from "./../icons/pencil.svg";
import deleteIcon from "./../icons/delete.svg";
import appLogo from "./../icons/logo.svg";

import Events from "./events.js";

const Display = (() => {
  let activeButton;

  function indexSetUp() {
    setUpIcons();
    setUpUserInfo();
  }

  function setUpUserInfo() {
    const USER_NAME = "John Doe";
    const container = document.querySelector(".user-info");

    const userNameP = document.createElement("p");
    userNameP.textContent = USER_NAME;
    userNameP.classList.add("user-name");

    container.appendChild(userNameP);

    const dateP = document.createElement("p");
    dateP.textContent = currentDate();
    dateP.classList.add("current-date");

    container.appendChild(dateP);
  }

  function currentDate() {
    let dateObj = new Date();
    let date = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
    return date;
  }

  function setUpIcons() {
    const searchIconContainer = document.querySelector(".search-button");
    const searchImg = document.createElement("img");
    searchImg.src = searchIcon;
    searchImg.width = "24";
    searchImg.height = "24";
    searchImg.alt = "Search button icon";
    searchIconContainer.appendChild(searchImg);

    const profileImgContainer = document.querySelector(".user-name-container");
    const profileImg = document.createElement("img");
    profileImg.src = profilePicture;
    profileImg.width = "50";
    profileImg.height = "50";
    profileImg.alt = "User profile picture";
    profileImg.classList.add("profile-picture");
    profileImgContainer.prepend(profileImg);

    const logoContainer = document.querySelector(".logo-container");
    const logo = document.createElement("img");
    logo.src = appLogo;
    logo.width = "130";
    logo.alt = "App logo image";
    logoContainer.appendChild(logo);
  }

  function openDialog(button) {
    const dialogClass = button.getAttribute("data-open");
    const modal = document.querySelector(`.${dialogClass}`);
    modal.showModal();
  }

  function closeDialog(button) {
    const dialogClass = button.getAttribute("data-close");
    const modal = document.querySelector(`.${dialogClass}`);
    modal.close();
  }

  function closeNewTodoDialog() {
    document.querySelector(".new-todo-dialog").close();
  }

  function closeEditTodoDialog() {
    document.querySelector(".edit-todo-dialog").close();
  }

  function addCardTools(container, todo) {
    const duedateContainer = document.createElement("span");
    duedateContainer.textContent = `Duedate: ${todo.duedate}`;
    container.appendChild(duedateContainer);

    const buttons = document.createElement("div");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.setAttribute("data-id", todo.id);
    editButton.setAttribute("data-open", "edit-todo-dialog");
    buttons.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("data-id", todo.id);
    buttons.appendChild(deleteButton);

    const markComplete = document.createElement("input");
    markComplete.setAttribute("type", "checkbox");
    buttons.appendChild(markComplete);

    Events.publish("todoCardButtons:added", [
      editButton,
      deleteButton,
      markComplete,
    ]);

    buttons.classList.add("todo-card-buttons");
    container.appendChild(buttons);
  }

  function fillTodos(todos) {
    const container = document.querySelector(".todos-container");
    purge(container);

    for (let todo of todos) {
      const card = document.createElement("div");
      card.classList.add("todo-card");

      const h3 = document.createElement("h3");
      h3.textContent = todo.title;
      const projectSpan = document.createElement("span");
      projectSpan.textContent = todo.project;
      h3.appendChild(projectSpan);

      const p = document.createElement("p");
      p.classList.add("todo-description");
      p.classList.add(todo.importance);
      p.textContent = todo.description;

      const cardTools = document.createElement("p");
      cardTools.classList.add(todo.importance);
      cardTools.classList.add("card-tool-bar");
      addCardTools(cardTools, todo);

      card.appendChild(h3);
      card.appendChild(p);
      card.appendChild(cardTools);
      container.appendChild(card);
    }
  }

  function purge(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  Events.subscribe("page:loaded", indexSetUp);
  Events.subscribe("todoCardEditButton:pressed", openDialog);
  Events.subscribe("newTodoItem:submited", closeNewTodoDialog);
  Events.subscribe("editTodoItem:submited", closeEditTodoDialog);
  Events.subscribe("addTodoButton:clicked", openDialog);
  Events.subscribe("cancelFormButton:pressed", closeDialog);
  Events.subscribe("todosArray:updated", fillTodos);
  Events.subscribe("newTodo:added", fillTodos);
  Events.subscribe("todo:edited", fillTodos);
  Events.subscribe("todo:deleted", fillTodos);
})();

export default Display;
