const taskInput = document.querySelector('.taskInput input');
const addButton = document.querySelector('.taskInput button');
const taskBox = document.querySelector('.taskBox');
const filters = document.querySelectorAll('.filters span');
const clearButton = document.querySelector('.clear');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function showTodo(filter) {
    let li = '';
    tasks.forEach((task, id) => {
        let isCompleted = task.status === 'completed' ? 'completed' : '';
        if (filter === task.status || filter === 'all') {
            li += `<li class="${isCompleted}">
                <input type="checkbox" ${task.status === 'completed' ? 'checked' : ''} onclick="updateStatus(${id})">
                <span class="task">${task.name}</span>
                <div class="actions">
                    <button class="edit" onclick="editTask(${id}, '${task.name}')">Edit</button>
                    <button class="delete" onclick="deleteTask(${id})">Delete</button>
                </div>
            </li>`;
        }
    });
    taskBox.innerHTML = li || `<span>No tasks found</span>`;
}

function updateStatus(taskId) {
    tasks[taskId].status = tasks[taskId].status === 'completed' ? 'pending' : 'completed';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTodo(document.querySelector('.filters .active').dataset.filter);
}

function editTask(taskId, taskName) {
    let newTaskName = prompt('Edit task', taskName);
    if (newTaskName) {
        tasks[taskId].name = newTaskName;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        showTodo(document.querySelector('.filters .active').dataset.filter);
    }
}

function deleteTask(taskId) {
    tasks.splice(taskId, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTodo(document.querySelector('.filters .active').dataset.filter);
}

addButton.addEventListener('click', () => {
    let taskName = taskInput.value.trim();
    if (taskName) {
        tasks.push({ name: taskName, status: 'pending' });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        showTodo();
    }
});

clearButton.addEventListener('click', () => {
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTodo();
});

filters.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filters .active').classList.remove('active');
        btn.classList.add('active');
        showTodo(btn.dataset.filter);
    });
});

showTodo();
