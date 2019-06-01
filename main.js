var toDoArray = JSON.parse(localStorage.getItem("toDo")) || [];
var searchInput = document.querySelector('#js-input-search');
var titleInput = document.querySelector('#js-input-title');
var itemInput = document.querySelector('#js-input-item');
var addBtn = document.querySelector('#js-plus-btn');
var makeTaskBtn = document.querySelector('#js-make-task-btn');
var cleanBtn = document.querySelector('#js-clear-btn');
var filterBtn = document.querySelector('#js-filter-btn');
var urgentBtn = document.querySelector('#js-urgent-btn');
var deleteBtn = document.querySelector('#js-delete-btn');
var cardSection = document.querySelector('#js-card-section');
var taskList = document.querySelector('#js-task-list');
addBtn.disabled = true;

// cardSection.addEventListener('click',handleCardActions);
addBtn.addEventListener('click', addTaskList);
taskList.addEventListener('click', removeFromTaskList)
// makeTaskBtn.addEventListener('click', );
// cleanBtn.addEventListener('click', );
// filterBtn.addEventListener('click', );
// urgentBtn.addEventListener('click', );
// deleteBtn.addEventListener('click', );
// searchInput.addEventListener('keyup', );
// titleInput.addEventListener('keyup', );
itemInput.addEventListener('keyup', disableBtns);

function addTaskList() {
  taskList.insertAdjacentHTML('beforeend', `<li class='nav__container--bullet'>${itemInput.value}</li>`);
  itemInput.value = '';
  addBtn.disabled = true;
};

function disableBtns() {
  var emptyInput = itemInput.value === '';
  addBtn.disabled = emptyInput;
};

function removeFromTaskList(e) {
  if (e.target.className === 'nav__container--bullet') {
    console.log('e.target');
    e.target.remove();
  }
};
