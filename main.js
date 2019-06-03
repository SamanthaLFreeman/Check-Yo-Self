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
var listItemImg = document.querySelector('.main__template--card--bullet:before');

cardSection.addEventListener('click',handleCardActions);
addBtn.addEventListener('click', addTaskList);
taskList.addEventListener('click', removeFromTaskList);
makeTaskBtn.addEventListener('click', createTasksArray);
clearBtn.addEventListener('click', clearNav);
// filterBtn.addEventListener('click', );
// urgentBtn.addEventListener('click', );
// deleteBtn.addEventListener('click', );
// searchInput.addEventListener('keyup', );
titleInput.addEventListener('keyup', disableClearBtn);
itemInput.addEventListener('keyup', disableClearBtn);
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
  makeTaskBtn.disabled = false;
};

function disableAddBtn() {
  var emptyItemInput = itemInput.value === '';
  addBtn.disabled = emptyItemInput;
};

function disableClearBtn() {
  if (titleInput.value === '' || itemInput.value === '') {
    clearBtn.disabled = false;
  }
};

function removeFromTaskList(e) {
  if (e.target.className === 'nav__container--bullet') {
    e.target.remove();
  }
};

function clearNav() {
  titleInput.value = '';
  itemInput.value = '';
  taskList.innerText = '';
  clearBtn.disabled = true;
};

function saveToDo(objectArray) {
  var toDo = new ToDoList(Date.now(), titleInput.value, objectArray);
  toDoArray.push(toDo);
  toDo.saveToStorage(toDoArray);
  createCard(toDo);
  // displayTasks(toDo);
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
  var addLiArray = [];
  var objectTask = '';
  for (var i = 0; i < toDo.tasks.length; i++) {
    addLiArray.push(`<li class='main__template--card--bullet' data-index=${[i]}>${toDo.tasks[i].task} </li>`);
  }
  for (var i = 0; i < addLiArray.length; i++) {
    objectTask += addLiArray[i];
  }
  removeMessageCard();
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
  clearNav();
  makeTaskBtn.disabled = true;
};

function removeMessageCard() {
  var welcomeCard = document.querySelector('#js-card--example');
  if (cardSection.contains(welcomeCard)) {
    cardSection.removeChild(welcomeCard);
  }
};

function findIndexInArray(id) {
  var findIndex = toDoArray.findIndex(function(card) {
   if (card.id === parseInt(id)) {
    return card;
   }
  })

  return findIndex;
}

function handleCardActions(e) {
  if (e.target.className === 'main__template--card--bullet') {
    changeTaskImg(e, e.target.parentNode.parentNode.parentNode.dataset.id);
  }
};

function changeTaskImg(e, id) {
  var foundIndexCard = findIndexInArray(id);
  var bulletIndex = e.target.dataset.index;
  toDoArray[foundIndexCard].updateTask(bulletIndex);
  toDoArray[foundIndexCard].saveToStorage(toDoArray);
  changeImg(e, toDoArray[foundIndexCard]);
}

function changeImg(e, card) {
  var bulletIndex = e.target.dataset.index;
  // var bullet = document.querySelector('.main__template--card--bullet:before')
  if (card.tasks[bulletIndex].complete === true) {
    // listItemImg.classList.remove('.main__template--card--bullet:before')
    listItemImg.getAttribute('.main__template--card--bullet--active')
    listItemImg.classList.add('.main__template--card--bullet--active:before');
    console.log(listItemImg)
  }
}
