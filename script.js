const taskInput = document.getElementById('taskInput');
const listContainer = document.getElementById('list-container');
let currentCategory = ''; 
document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('tasks')) {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(task => {
            addTaskToList(task.text);
        });
        addTaskEventListeners();
    }
});

function addTaskToList(taskText) {
    let li = document.createElement("li");
    li.textContent = taskText;
    
    
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button"); 
    li.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button"); 
    li.appendChild(deleteButton);

    listContainer.appendChild(li);
}

function addTaskEventListeners() {
    const tasks = document.querySelectorAll('#list-container li');
    tasks.forEach(task => {
        task.addEventListener('click', toggleTask);
        task.querySelector('.edit-button').addEventListener('click', editTask);
        task.querySelector('.delete-button').addEventListener('click', deleteTask);
    });
}

function toggleCategory(category) {
    const businessButton = document.getElementById("businessButton");
    const personalButton = document.getElementById("personalButton");

    const isBusinessActive = businessButton.classList.contains("active");
    const isPersonalActive = personalButton.classList.contains("active");

    if ((category === 'Business' && isBusinessActive) || (category === 'Personal' && isPersonalActive)) {
        businessButton.classList.remove("active");
        personalButton.classList.remove("active");
        currentCategory = ''; 
    } else {
       
        if (category === 'Business') {
            businessButton.classList.add("active");
            personalButton.classList.remove("active"); 
            currentCategory = 'Business'; 
        } else if (category === 'Personal') {
            personalButton.classList.add("active");
            businessButton.classList.remove("active");
            currentCategory = 'Personal';
        }
    }
}

function addTodo() {
    if (taskInput.value === '') {
        alert("You must write something!");
    } else {
        if (currentCategory === '') {
            alert("Please select a category.");
        } else {
            addTaskToList(taskInput.value);
            taskInput.value = ''; 
            saveTasksToLocalStorage();
            addTaskEventListeners(); 
        }
    }
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(listContainer.querySelectorAll('li')).map(li => ({ text: li.textContent }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTask() {
    this.classList.toggle("checked");

    
    saveTasksToLocalStorage();
}

function editTask(event) {
    let newText = prompt("Enter new text:");
    if (newText !== null) {
        const taskTextElement = event.target.parentNode.firstChild;
        taskTextElement.textContent = newText;

        
        saveTasksToLocalStorage();
    }
}

function deleteTask(event) {
    const task = event.target.parentNode;
    task.remove();

    saveTasksToLocalStorage();
}
