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

//should update the todo’s title and urgency
  updateToDo() {
    
  }

//should update a task’s content and if it has been completed
  updateTask(bulletIndex) {
    this.tasks[bulletIndex].complete = !this.tasks[bulletIndex].complete;
  }
}