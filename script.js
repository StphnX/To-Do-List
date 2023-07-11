const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to modify a task
function taskModify(event) {
  const clickedEle = event.target;
  console.log(clickedEle);
  // check if the delete button was clicked
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
    });
  }
}

// Add task on button click
function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    const li = document.createElement("li");
    li.textContent = inputBox.value;
    const spanTrash = document.createElement("span");
    spanTrash.className = "fa fa-trash";
    const spanEdit = document.createElement("span");
    spanEdit.className = "fa fa-edit";
    li.appendChild(spanTrash);
    li.appendChild(spanEdit);
    listContainer.appendChild(li);
  }
  inputBox.value = "";
}

// Add task on enter key press
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  } else if (e.target.classList.contains("fa-trash")) {
    let li = e.target.parentElement;
    listContainer.removeChild(li);
  } else if (e.target.classList.contains("fa-edit")) {
    taskModify(e);
  }
});


//save data to local storage with JSON stringify

function saveData(){
localStorage.setItem("data", listContainer.innerHTML);
}
//load data from local storage on page load
window.onload=function() {
    listContainer.innerHTML = localStorage.getItem("data");
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

nameInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    nameInput.style.display = 'none';
    updateGreeting();
  }
});

updateGreeting();
setInterval(updateGreeting, 60000);



const quotes = [
    'Believe you can and you\'re halfway there.',
    'The future belongs to those who believe in the beauty of their dreams.',
    'Don\'t watch the clock; do what it does. Keep going.',
    'The only limit to our realization of tomorrow will be our doubts of today.',
    'Success is not final, failure is not fatal: It is the courage to continue that counts.'
  ];

  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  function updateQuote() {
    const quoteText = document.getElementById('quote-text');
    quoteText.textContent = getRandomQuote();
  }

  setInterval(updateQuote, 5000);