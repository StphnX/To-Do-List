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