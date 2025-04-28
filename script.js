const todoInput = document.getElementById('todo-Input');
const todoList = document.getElementById('todo-List');
const addBtn = document.getElementById('addBtn');

// Load tasks from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(taskText => {
        createTaskElement(taskText);
    });
});

// Add button click
addBtn.addEventListener('click', () => {
    const taskInput = todoInput.value.trim();
    if (taskInput !== "") {
        createTaskElement(taskInput);
        saveTaskToLocalStorage(taskInput);
        todoInput.value = "";
    }
});

// Function to create task element
function createTaskElement(taskInput) {
    const li = document.createElement('li');
    li.className = "flex justify-between items-center p-2 bg-gray-100 rounded mb-2 opacity-0 transition-opacity duration-500 text-gray-700";

    setTimeout(() => {
        li.classList.remove('opacity-0');
    }, 50);

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskInput;

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.className = 'text-red-500 hover:text-red-700 font-bold cursor-pointer ml-2';

    li.appendChild(taskSpan);
    li.appendChild(cancelButton);

    cancelButton.addEventListener('click', () => {
        li.remove();
        removeTaskFromLocalStorage(taskInput);
    });

    taskSpan.addEventListener('dblclick', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = taskSpan.textContent;
        input.className = 'border outline-none border-gray-400 p-1 rounded w-full';

        taskSpan.textContent = '';
        taskSpan.appendChild(input);
        input.focus();

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const oldTask = taskInput;
                const newTask = input.value;
                taskSpan.textContent = newTask;
                updateTaskInLocalStorage(oldTask, newTask);
            }
        });
    });

    todoList.appendChild(li);
}

// Save task to localStorage
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from localStorage
function removeTaskFromLocalStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskToRemove);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task in localStorage after editing
function updateTaskInLocalStorage(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.indexOf(oldTask);
    if (taskIndex > -1) {
        tasks[taskIndex] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
