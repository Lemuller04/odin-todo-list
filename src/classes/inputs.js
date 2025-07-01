import Events from "./events.js";
import Storage from "./storage.js";

const InputHandler = (() => {
  function setUpForm() {
    const form = document.querySelector(".new-project-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const newName = document
        .querySelector("input[name=new-project-name]")
        .value.trim();

      if (Storage.getProjects() && Storage.getProjects().includes(newName)) {
        alert("This project name is already in use, try something else");
        return;
      }

      Events.publish("saveNewProjectButton:pressed", newName);

      form.reset();
    });
  }

  function setUpEditForm(oldName) {
    const form = document.querySelector(".edit-project-form");
    const inputElement = document.querySelector(
      "input[name=replace-project-name]",
    );
    inputElement.value = oldName;

    const cloned = form.cloneNode(true);
    form.parentNode.replaceChild(cloned, form);

    cloned.addEventListener("submit", (e) => {
      e.preventDefault();

      const newName = cloned
        .querySelector("input[name=replace-project-name]")
        .value.trim();

      if (Storage.getProjects().includes(newName)) {
        alert("This project name is already in use, try something else");
        return;
      }

      Events.publish("saveEditedProjectButton:pressed", [oldName, newName]);

      cloned.reset();
    });
  }

  function setUpButtons() {
    const allProjectButton = document.querySelector(".all-projects");
    allProjectButton.addEventListener("click", () => {
      Events.publish("allProjectsButton:pressed");
    });

    const newProjectButton = document.querySelector(".new-project-button");
    newProjectButton.addEventListener("click", () => {
      Events.publish("newProjectButton:pressed", newProjectButton);
    });

    const cancelNewProjectButton = document.querySelector(
      ".cancel-new-project",
    );
    cancelNewProjectButton.addEventListener("click", () => {
      Events.publish("cancelNewProjectButton:pressed", cancelNewProjectButton);
    });

    const cancelEditProjectButton = document.querySelector(
      ".cancel-edit-project",
    );
    cancelEditProjectButton.addEventListener("click", () => {
      Events.publish("cancelEditProjectButton:pressed", cancelNewProjectButton);
    });
  }

  function calcelNewProject() {
    const form = document.querySelector("form");
    form.reset();
  }

  function setUpEditButton(button) {
    button.addEventListener("click", () => {
      const li = button.parentNode.parentNode;
      const project = li.getAttribute("data-project");
      Events.publish("editProjectButton:pressed", project);
    });
  }

  function setUpDeleteButton(button) {
    button.addEventListener("click", () => {
      const project = button.getAttribute("data-project");
      Events.publish("deleteProjectButton:pressed", project);
    });
  }

  Events.subscribe("editButton:added", setUpEditButton);
  Events.subscribe("deleteButton:added", setUpDeleteButton);
  Events.subscribe("cancelNewProjectButton:pressed", calcelNewProject);
  Events.subscribe("page:loaded", setUpButtons);
  Events.subscribe("page:loaded", setUpForm);
  Events.subscribe("editProjectButton:pressed", setUpEditForm);
})();

export default InputHandler;
