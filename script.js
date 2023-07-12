const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to modify a task
function taskModify(event) {
  const clickedEle = event.target;
  const id = event.target.parentElement.id;
  // console.log(id);
  // console.log(clickedEle);
  // Check if the delete button was clicked
  if (clickedEle.classList.contains("fa-trash")) {
    const task = clickedEle.parentElement;
    task.remove();
  } else if (clickedEle.classList.contains("fa-edit")) {
    const task = clickedEle.parentElement;
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = task.textContent.trim();
    task.textContent = "";
    task.appendChild(editInput);
    editInput.focus();
    editInput.addEventListener("blur", function () {
      task.textContent = editInput.value;
      // const spanTrash = document.createElement("spanTrash");
      // // WHY DONT WE PUT THIS IN THE CLASSES
      // spanTrash.id = "trash";
      // spanTrash.className = "fa fa-trash";
      // const spanEdit = document.createElement("spanEdit");
      // spanEdit.id = "edit";
      // spanEdit.className = "fa fa-edit";
      // task.appendChild(editInput);
      // task.appendChild(spanTrash);
    });
  }
}

// Add task on button click
function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    // LOCALSTORAGE LOGIC
    let uniqueId = "todo_"+new Date().valueOf()

    const li = document.createElement("li");
    li.setAttribute('id', uniqueId)
    li.textContent = inputBox.value;
    const spanTrash = document.createElement("spanTrash");
    // WHY DONT WE PUT THIS IN THE CLASSES
    spanTrash.id = "trash";
    spanTrash.className = "fa fa-trash";
    const spanEdit = document.createElement("spanEdit");
    spanEdit.id = "edit";
    spanEdit.className = "fa fa-edit";
    li.appendChild(spanTrash);
    li.appendChild(spanEdit);
    listContainer.appendChild(li);


    saveData(uniqueId, inputBox.value, false)
  }
  inputBox.value = "";
}

// Add task on button click
function loadAllTask(id, content, done) {

  const li = document.createElement("li");
  li.setAttribute('id', id)
  li.textContent = content;
  const spanTrash = document.createElement("spanTrash");
  spanTrash.id = "trash";
  spanTrash.className = "fa fa-trash";
  const spanEdit = document.createElement("spanEdit");
  spanEdit.id = "edit";
  spanEdit.className = "fa fa-edit";
  li.appendChild(spanTrash);
  li.appendChild(spanEdit);
  listContainer.appendChild(li);
}



// Add task on enter key press
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    // TODO UPDATE THE STATUS WHEN SOMETHING IS DONE IN LOCALSTORAGE
    let status = JSON.parse(localStorage.getItem(e.target.id))
    console.log(status.done);
  } else if (e.target.classList.contains("fa-trash")) {
    let li = e.target.parentElement;
    localStorage.removeItem(li.id)
    listContainer.removeChild(li);
  } else if (e.target.classList.contains("fa-edit")) {
    taskModify(e);
  }
});


// spanTrash.className = "fa fa-trash";
// spanEdit.className = "fa fa-edit";

//Save data to local storage with JSON stringify
function saveData(id, content, done) {
  let package = {
    content: content,
    done: false
  }

  localStorage.setItem(id, JSON.stringify(package));
}


const greetingElement = document.getElementById('greeting');
const timeElement = document.getElementById('time');
const nameInput = document.getElementById('name-input');

function getTimeGreeting(name) {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time = `${hours}:${minutes.toString().padStart(2, '0')}`;

  let greeting;

  if (hours >= 5 && hours < 12) {
    greeting = `Good morning, ${name}.`;
  } else if (hours >= 12 && hours < 18) {
    greeting = `Good afternoon, ${name}.`;
  } else {
    greeting = `Good evening, ${name}.`;
  }

  return { time, greeting };
}

function updateGreeting() {
  const { time, greeting } = getTimeGreeting(nameInput.value);

  timeElement.textContent = time;
  greetingElement.textContent = greeting;
}

nameInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    nameInput.style.display = 'none';
    updateGreeting();
  }
});

updateGreeting();
setInterval(updateGreeting, 60000);

// QUOTES

const quotes = [
  'Believe you can and you\'re halfway there.',
  'The future belongs to those who believe in the beauty of their dreams.',
  'Don\'t watch the clock; do what it does. Keep going.',
  'The only limit to our realization of tomorrow will be our doubts of today.',
  'Success is not final, failure is not fatal: It is the courage to continue that counts.'
];

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  console.log(quotes[randomIndex]);
  return quotes[randomIndex];
}

function updateQuote() {
  const quoteText = document.getElementById('quote-text');
  console.log(quoteText);
  quoteText.innerText = getRandomQuote();
}
updateQuote()
setInterval(updateQuote, 50000);

// TODO EDITING ONE TAKS AND UPDATE THE LOCALSTORAGE

//Load data from local storage on page load
window.onload = ()=> {
  for (let index = 0; index < localStorage.length; index++) {
    const element = localStorage.key(index);
    let task = JSON.parse(localStorage.getItem(element));
    loadAllTask(element, task.content, task.done)
  }
}