function createTodo(title, description, duedate, importance, project) {
  return {
    title,
    description,
    duedate,
    importance,
    project,
    id: crypto.randomUUID(),
    completed: false,
    markAsDone() {
      this.completed = true;
    },
  };
}

export default createTodo;
