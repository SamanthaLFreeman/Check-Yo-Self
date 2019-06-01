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

cardSection.addEventListener('click',handleCardActions);
addBtn.addEventListener('click', );
makeTaskBtn.addEventListener('click', );
cleanBtn.addEventListener('click', );
filterBtn.addEventListener('click', );
urgentBtn.addEventListener('click', );
deleteBtn.addEventListener('click', );
searchInput.addEventListener('keyup', );
titleInput.addEventListener('keyup', );
itemInput.addEventListener('keyup', );

