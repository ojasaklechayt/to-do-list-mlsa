document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasksFromLocalStorage();

    // Add task event
    taskForm.addEventListener('submit', addTask);

    // Delete task event
    taskList.addEventListener('click', deleteTask);

    // Add task function
    function addTask(e) {
        e.preventDefault();

        // Get task value
        const task = taskInput.value;

        // Create li element
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(task));

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.appendChild(document.createTextNode('Delete'));
        li.appendChild(deleteBtn);

        // Append li to ul
        taskList.appendChild(li);

        // Store task in localStorage
        storeTaskInLocalStorage(task);

        // Clear input
        taskInput.value = '';
    }

    // Delete task function
    function deleteTask(e) {
        if (e.target.tagName === 'BUTTON') {
            const li = e.target.parentElement;
            const task = li.firstChild.textContent;

            // Remove task from localStorage
            removeTaskFromLocalStorage(task);

            // Remove li from DOM
            taskList.removeChild(li);
        }
    }

    // Store task in localStorage
    function storeTaskInLocalStorage(task) {
        let tasks = getTasksFromLocalStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasksFromLocalStorage() {
        const tasks = getTasksFromLocalStorage();
        tasks.forEach(function (task) {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(task));

            const deleteBtn = document.createElement('button');
            deleteBtn.appendChild(document.createTextNode('Delete'));
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });
    }

    // Get tasks from localStorage
    function getTasksFromLocalStorage() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    // Remove task from localStorage
    function removeTaskFromLocalStorage(task) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
