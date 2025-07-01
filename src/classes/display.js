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

  function clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function updateProjectsList(list) {
    const container = document.querySelector(".projects-list");
    clearElement(container);

    for (let project of list) {
      container.appendChild(createProjectElement(project));
    }
  }

  function createProjectElement(name) {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.textContent = name;
    Events.publish("projectButton:added", button);

    li.appendChild(button);
    li.setAttribute("data-project", name);
    setUpProjectListIcons(li, name);

    return li;
  }

  function setUpProjectListIcons(parent, name) {
    const IMG_SIZE = "18";

    const p = document.createElement("p");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    const editImg = document.createElement("img");
    editImg.src = editIcon;
    editImg.width = IMG_SIZE;
    editImg.height = IMG_SIZE;
    editImg.alt = "Edit project name";

    const deleteImg = document.createElement("img");
    deleteImg.src = deleteIcon;
    deleteImg.width = IMG_SIZE;
    deleteImg.height = IMG_SIZE;
    deleteImg.alt = "Delete project";

    editButton.appendChild(editImg);
    editButton.classList.add("edit-project-button");
    editButton.setAttribute("data-project", name);
    deleteButton.appendChild(deleteImg);
    deleteButton.classList.add("delete-project-button");
    deleteButton.setAttribute("data-project", name);

    Events.publish("editButton:added", editButton);
    Events.publish("deleteButton:added", deleteButton);

    p.appendChild(editButton);
    p.appendChild(deleteButton);

    parent.appendChild(p);
  }

  function showNewProjectDialog(button) {
    document.querySelector(".new-project-dialog").showModal();
  }

  function hideNewProjectDialog(button) {
    document.querySelector(".new-project-dialog").close();
  }

  function showEditProjectDialog(button) {
    document.querySelector(".edit-project-dialog").showModal();
  }

  function hideEditProjectDialog(button) {
    document.querySelector(".edit-project-dialog").close();
  }

  function setUpActiveClass(button) {
    button.addEventListener("click", () => {
      if (activeButton) {
        activeButton.classList.remove("active");
      }
      button.classList.add("active");
      activeButton = button;
    });
  }

  function unsetActiveButton() {
    activeButton.classList.remove("active");
  }

  Events.subscribe("page:loaded", indexSetUp);
  Events.subscribe("projects:updated", updateProjectsList);
  Events.subscribe("newProjectButton:pressed", showNewProjectDialog);
  Events.subscribe("cancelNewProjectButton:pressed", hideNewProjectDialog);
  Events.subscribe("saveNewProjectButton:pressed", hideNewProjectDialog);
  Events.subscribe("cancelEditProjectButton:pressed", hideEditProjectDialog);
  Events.subscribe("editProjectButton:pressed", showEditProjectDialog);
  Events.subscribe("saveEditedProjectButton:pressed", hideEditProjectDialog);
  Events.subscribe("projectButton:added", setUpActiveClass);
  Events.subscribe("allProjectsButton:pressed", unsetActiveButton);
})();

export default Display;
