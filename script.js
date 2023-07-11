

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

//add task on button click
function addTask(){
    if(inputBox.value === ''){
    alert("You must write something!");
        }else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span")
        span.innerHTML = "\u00d7"; //This is a cross icon
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();

}

//add task on enter key press
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }else if(e.target.tagName === "SPAN"){
        let li = e.target.parentElement;
        listContainer.removeChild(li);
    }
}, false);

//save data to local storage with JSON stringify

function saveData(){
localStorage.setItem("data", listContainer.innerHTML);
}
//load data from local storage on page load
window.onload=function() {
    listContainer.innerHTML = localStorage.getItem("data");
