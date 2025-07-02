function createTodo(title, description, duedate, importance, project) {
  return {
    title,
    description,
    duedate,
    importance,
    project,
    id: crypto.randomUUID(),
    completed: false,
  };
}

export default createTodo;
