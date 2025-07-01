import Events from "./events.js";

const Storage = (() => {
  let projects = setUpProjects();

  function setUpProjects() {
    let arr = [];
    if (localStorage.length > 0) {
      return JSON.parse(localStorage["projects"]);
    }
    return arr;
  }

  function deleteProject(name) {
    projects = projects.filter((project) => project !== name);
    localStorage.setItem("projects", JSON.stringify(projects));
    Events.publish("projects:updated", [...projects]);
  }

  function addNewProject(name) {
    projects.push(name);
    localStorage.setItem("projects", JSON.stringify(projects));
    Events.publish("projects:updated", [...projects]);
    return true;
  }

  function getProjects() {
    return JSON.parse(localStorage.getItem("projects"));
  }

  function editProject(names) {
    const index = projects.indexOf(names[0]);
    if (index !== -1) {
      projects[index] = names[1];
    }
    localStorage.setItem("projects", JSON.stringify(projects));
    Events.publish("projects:updated", [...projects]);
  }

  function updateProjectsList() {
    Events.publish("projects:updated", [...projects]);
  }

  Events.subscribe("deleteProjectButton:pressed", deleteProject);
  Events.subscribe("page:loaded", updateProjectsList);
  Events.subscribe("saveNewProjectButton:pressed", addNewProject);
  Events.subscribe("saveEditedProjectButton:pressed", editProject);

  return {
    getProjects,
  };
})();

export default Storage;
