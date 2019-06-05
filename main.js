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

cardSection.addEventListener('click',handleCardActions);
addBtn.addEventListener('click', addTaskList);
taskList.addEventListener('click', removeFromTaskList);
makeTaskBtn.addEventListener('click', createTasksArray);
clearBtn.addEventListener('click', clearNav);
filterBtn.addEventListener('click', changeUrgencyClass);
searchInput.addEventListener('keyup', filterTitles);
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

function displayTasks(toDo) {
  var addLiArray = [];
  var objectTask = '';
  for (var i = 0; i < toDo.tasks.length; i++) {
    var completeTask = toDo.tasks[i].complete === true ? 'main__template--card--bullet--active' : 'main__template--card--bullet';
    addLiArray.push(`<li class=${completeTask} data-index=${[i]}>${toDo.tasks[i].task} </li>`);
  }

  for (var i = 0; i < addLiArray.length; i++) {
    objectTask += addLiArray[i];
  }

  return objectTask;
};

function createCard(toDo) {
  var objectTask = displayTasks(toDo);
  var urgentIcon = toDo.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg';
  var urgentLabel = toDo.urgent ? 'main__template--card__label--urgent--active' : 'main__template--card__label--urgent';
  var urgentCard = toDo.urgent ? 'main__template--card--active' : 'main__template--card';
  var urgentTopBorder = toDo.urgent ? 'main__template--card--top--active' : 'main__template--card--top';
  var urgentBottomBorder = toDo.urgent ? 'main__template--card--bottom--active' : 'main__template--card--bottom';
  removeMessageCard();
  cardSection.insertAdjacentHTML('afterbegin',
    `   <article class='${urgentCard}' data-id=${toDo.id}>
          <div class='${urgentTopBorder}'>
            <h2 class='main__template--card--title'>${toDo.title}</h2>
          </div>
          <div class='main__template--card--mid'>
            <ul class='main__template--card--list'>
              ${objectTask}
            </ul>
          </div>
          <div class='${urgentBottomBorder}'>
            <label class='${urgentLabel}'>
              <img src='${urgentIcon}' class='img main__template--card__img--urgent' id='js-urgent-btn' alt='urgent-icon' />
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
};

function handleCardActions(e) {
  if (e.target.className === 'main__template--card--bullet' || e.target.className === 'main__template--card--bullet--active') {
    changeTaskImg(e, e.target.parentNode.parentNode.parentNode.dataset.id);
  } else if (e.target.className === 'img main__template--card__img--delete') {
    checkAllCheckboxes(e, e.target.parentNode.parentNode.parentNode.dataset.id);
  } else if (e.target.className === 'img main__template--card__img--urgent') {
    toggleUrgent(e, e.target.parentNode.parentNode.parentNode.dataset.id);
  }
};

function changeTaskImg(e, id) {
  var foundIndexCard = findIndexInArray(id);
  var bulletIndex = e.target.dataset.index;
  toDoArray[foundIndexCard].updateTask(bulletIndex);
  toDoArray[foundIndexCard].saveToStorage(toDoArray);
  changeImg(e, toDoArray[foundIndexCard]);
};

function changeImg(e, card) {
  var bulletIndex = e.target.dataset.index;
  var complete = card.tasks[bulletIndex].complete
  if (complete === true) {
    e.target.setAttribute('class', 'main__template--card--bullet--active');
  } else if (complete === false) {
    e.target.setAttribute('class', 'main__template--card--bullet');
  }
};

function deleteCard(e, id) {
  e.target.parentElement.parentElement.parentElement.remove();
  toDoArray[id].deleteFromStorage(id);
};

function checkAllCheckboxes(e, id) {
  var foundIndexCard = findIndexInArray(id);
  var checkedOff = toDoArray[foundIndexCard].tasks.every(function(task){
    return task.complete === true;
  }) 

  if (checkedOff === true) {
    deleteCard(e, foundIndexCard);
  }
};

function toggleUrgent(e, id) {
  var foundIndexCard = findIndexInArray(id);
  toDoArray[foundIndexCard].updateToDo();
  toDoArray[foundIndexCard].saveToStorage(toDoArray);
  var urgent = toDoArray[foundIndexCard].urgent;
  urgentCardChange(e, urgent)
};

function urgentCardChange(e, urgent) {
  if (urgent === false) {
    e.target.setAttribute('src', 'images/urgent.svg');
    e.target.closest('label').setAttribute('class', 'main__template--card__label--urgent');
    e.target.closest('article').setAttribute('class', 'main__template--card');
    e.target.closest('article').querySelector('.main__template--card--top--active').setAttribute('class', 'main__template--card--top');
    e.target.closest('div').setAttribute('class', 'main__template--card--bottom');
  } else {
    e.target.setAttribute('src', 'images/urgent-active.svg');
    e.target.closest('label').setAttribute('class', 'main__template--card__label--urgent--active');
    e.target.closest('article').setAttribute('class', 'main__template--card--active');
    e.target.closest('article').querySelector('.main__template--card--top').setAttribute('class', 'main__template--card--top--active');
    e.target.closest('div').setAttribute('class', 'main__template--card--bottom--active')
  }
};

function filterTitles(e) {
  var searchTextField = e.target.value.toLowerCase();
  var results = toDoArray.filter(function(toDo) {
    return toDo.title.toLowerCase().includes(searchTextField);
  })
  
  cardSection.innerText = '';
  results.forEach(function(toDo) {
    createCard(toDo);
  })
};

function changeUrgencyClass(e) {
  if (e.target.className === 'btn nav__mid__btn--filter') {
    filterUrgency();
    e.target.setAttribute('class', 'btn nav__mid__btn--filter--orange')
  } else {
    cardSection.innerText = '';
    pageLoad();
    e.target.setAttribute('class', 'btn nav__mid__btn--filter');  
  }
};

function filterUrgency() {
  cardSection.innerText = '';
  var results = toDoArray.filter(function(toDo) {
    return toDo.urgent === true;
  })
  
  results.forEach(function(toDo) {
    createCard(toDo);
  })
};