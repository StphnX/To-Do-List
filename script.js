const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add task on Enter key press
inputBox.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Function to modify a task
function taskModify(event) {
  const clickedEle = event.target;
  const id = event.target.parentElement.id;
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
      const spanTrash = document.createElement("spanTrash");
      spanTrash.id = "trash";
      spanTrash.className = "fa fa-trash";
      task.appendChild(spanTrash);
      const spanEdit = document.createElement("spanEdit");
      spanEdit.id = "edit";
      spanEdit.className = "fa fa-edit";
      task.appendChild(spanEdit);

      const localTask = JSON.parse(localStorage.getItem(id))
      let payload = {
        content: task.textContent,
        done: localTask.done
      }
      localStorage.setItem(id, JSON.stringify(payload))
    });
  }
}

// Add task on button click and Enter press
function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    // CREATES A UNIQUE ID FOR THE NEW TASK
    let uniqueId = "todo_" + new Date().valueOf()

    // CREATES A NEW LI
    const li = document.createElement("li");
    li.setAttribute('id', uniqueId)
    li.textContent = inputBox.value;
    const spanTrash = document.createElement("spanTrash");
    spanTrash.id = "trash";
    spanTrash.className = "fa fa-trash";
    const spanEdit = document.createElement("spanEdit");
    spanEdit.id = "edit";
    spanEdit.className = "fa fa-edit";
    li.appendChild(spanTrash);
    li.appendChild(spanEdit);
    listContainer.appendChild(li);
    // SET LOCAL STORAGE
    saveData(uniqueId, inputBox.value, false)
  }
  inputBox.value = "";
}

// Add task on button click
function loadAllTask(id, content, done) {
  const li = document.createElement("li");
  done ? li.classList = "checked" : li.classList = ""
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
    let status = JSON.parse(localStorage.getItem(e.target.id))
    if (!status.done) {
      e.target.classList = "checked"
      let payload = { content: status.content, done: true }
      console.log(payload);
      localStorage.setItem(e.target.id, JSON.stringify(payload))
    } else {
      e.target.classList = ""
      let payload = { content: status.content, done: false }
      localStorage.setItem(e.target.id, JSON.stringify(payload))
    }
  } else if (e.target.classList.contains("fa-trash")) {
    let li = e.target.parentElement;
    localStorage.removeItem(li.id)
    listContainer.removeChild(li);
  } else if (e.target.classList.contains("fa-edit")) {
    taskModify(e);
  }
});

//Save data to local storage with JSON stringify
function saveData(id, content, done) {
  let package = {
    content: content,
    done: done
  }
  // SETS A NEW ITEM IN LOCAL STORAGE USING THE ID AS A KEY AND THE OBJECT CALLED PACKAGE AS THE VALUE
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

nameInput.addEventListener('blur', function (event) {
  nameInput.style.display = 'none';
  updateGreeting();
});


updateGreeting();
setInterval(updateGreeting, 60000);

// QUOTES
const quotes = [ 
  'Believe you can and you\'re halfway there.',
  'The future belongs to those who believe in the beauty of their dreams.',
  "I didn't fail the test. I just found 100 ways to do it wrong - Benjamin Franklin",
  "If you're going through hell, keep going - Winston Churchill",
  "You must learn from the mistakes of others. You can't possibly live long enough to make them all yourself.",
  "If anyone here believes in telekinesis, raise my hand - Kurt Vonnegut",
  "I do things like get in a taxi and say,'The library, and step on it.' - David Foster",
  "Just because you're paranoid doesn't mean they aren't after you. Joseph Heller",
  "There is no greater agony than bearing an untold story inside you. ― Maya Angelou",
  "“You are constantly invited to be what you are. ― Ralph Waldo Emerson",
  "What you seek, is seeking you. - Rumi",
  'Let\'s get to work. - Eca'
];

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function updateQuote() {
  const quoteText = document.getElementById('quote-text');
  quoteText.innerText = getRandomQuote();
}

updateQuote()
setInterval(updateQuote, 50000);

//Load data from local storage on page load
window.onload = () => {
  for (let index = 0; index < localStorage.length; index++) {
    const element = localStorage.key(index);
    let task = JSON.parse(localStorage.getItem(element));
    loadAllTask(element, task.content, task.done)
  }
}

const payload = "12 m, -89 m 6 m, -59 m 17 m, -145 m 21 m, -150 m 24 m, -143 m 12 m, -95 m 10 m, -68 m 28 m, -162 m 39 m, -161 m 40 m, -179 m 54 m, -191 m 58 m, -182 m 66 m, -189 m 85 m, -224 m 118 m, -254 m 119 m, -247 m 153 m, -277 m 219 m, -319 m 293 m, -356 m 435 m, -467 m 578 m, -511 m 818 m, -534 m 814 m, -535 m 816 m, -530 m 810 m, -533 m"
cosn