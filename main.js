var toDoArray = JSON.parse(localStorage.getItem("toDos")) || [];
var searchInput = document.querySelector('#js-input-search');
var titleInput = document.querySelector('#js-input-title');
var itemInput = document.querySelector('#js-input-item');
var addBtn = document.querySelector('#js-plus-btn');
var makeTaskBtn = document.querySelector('#js-make-task-btn');
var clearBtn = document.querySelector('#js-clear-btn');
var filterBtn = document.querySelector('#js-filter-btn');
var urgentBtn = document.querySelector('#js-urgent-btn');
var deleteBtn = document.querySelector('#js-delete-btn');
var cardSection = document.querySelector('#js-card-section');
var taskList = document.querySelector('#js-task-list');
addBtn.disabled = true;
clearBtn.disabled = true;

// cardSection.addEventListener('click',handleCardActions);
addBtn.addEventListener('click', addTaskList);
taskList.addEventListener('click', removeFromTaskList);
makeTaskBtn.addEventListener('click', createTasksArray);
clearBtn.addEventListener('click', clearNav);
// filterBtn.addEventListener('click', );
// urgentBtn.addEventListener('click', );
// deleteBtn.addEventListener('click', );
// searchInput.addEventListener('keyup', );
titleInput.addEventListener('keyup', disableClearBtn);
itemInput.addEventListener('keyup', disableAddBtn);

function pageLoad() {
  var newArray = [];
  toDoArray.forEach(function(toDo){
    var savedToDo = new ToDoList(toDo.id, toDo.title, toDo.tasks, toDo.urgent);
    newArray.push(savedToDo);
    createCard(savedToDo);
  })

  toDoArray = newArray;
};

pageLoad();

function addTaskList() {
  taskList.insertAdjacentHTML('beforeend', `<li class='nav__container--bullet'>${itemInput.value}</li>`);
  itemInput.value = '';
  addBtn.disabled = true;
};

function disableAddBtn() {
  var emptyItemInput = itemInput.value === '';
  addBtn.disabled = emptyItemInput;
};

function removeFromTaskList(e) {
  if (e.target.className === 'nav__container--bullet') {
    e.target.remove();
  }
};

function clearNav() {
  location.reload(true);
};

function disableClearBtn() {
  var allEmptyInputs = titleInput.value === '';
  clearBtn.disabled = allEmptyInputs;
};

function saveToDo(objectArray) {
  var toDo = new ToDoList(Date.now(), titleInput.value, objectArray);
  toDoArray.push(toDo);
  toDo.saveToStorage(toDoArray);
  createCard(toDo);
};

function createTasksArray() {
  var objectArray = [];
  var nodeList = document.querySelectorAll('.nav__container--bullet');
  var tasksArray = Array.from(nodeList);
  for (var i = 0; i < tasksArray.length; i++) {
    var newTask = tasksArray[i].innerText;
    objectArray.push({complete: false, task: `${newTask}`});
    }
  saveToDo(objectArray);
};

// function displayTasks(toDo) {

// }

function createCard(toDo) {
  var stupidArray = [];
  var objectTask = '';
  for (var i = 0; i < toDo.tasks.length; i++) {
    stupidArray.push(`<li class='main__template--card--bullet'>${toDo.tasks[i].task} </li>`);
  }
  for (var i = 0; i < stupidArray.length; i++) {
    objectTask += stupidArray[i];
  }
  cardSection.insertAdjacentHTML('afterbegin',
    `   <article class='main__template--card' data-id=${toDo.id}>
          <div class='main__template--card--top'>
            <h2 class='main__template--card--title'>${toDo.title}</h2>
          </div>
          <div class='main__template--card--mid'>
            <ul class='main__template--card--list'>
              ${objectTask}
            </ul>
          </div>
          <div class='main__template--card--bottom'>
            <label class='main__template--card__label--urgent'>
              <img src='images/urgent.svg' class='img main__template--card__img--urgent' id='js-urgent-btn' alt='urgent-icon' />
              URGENT
            </label>
            <label class='main__template--card__label--delete'>
              <img src='images/delete.svg' class='img main__template--card__img--delete' id='js-delete-btn' alt='delete-icon' />
              DELETE
            </label>
          </div>
        </article>`
)
};
