class ToDoList {
  constructor(id, title, tasks, urgent) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    this.urgent = urgent || false;
  }

  saveToStorage(toDoArray) {
    localStorage.setItem("toDos", JSON.stringify(toDoArray));
  }

  deleteFromStorage(index) {
    toDoArray.splice(index, 1);
    this.saveToStorage(toDoArray);
  }

  updateToDo() {
    this.urgent = !this.urgent;
  }

  updateTask(bulletIndex) {
    this.tasks[bulletIndex].complete = !this.tasks[bulletIndex].complete;
  }
}