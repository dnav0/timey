let timeLeft = 25 * 60; // 25 minutes
let timerInterval = null;

function startTimer() {
    if (timerInterval === null) {
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                alert("Time's up!");
            }
        }, 1000);
    }
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    for (const task of tasks) {
        const taskItem = document.createElement("div");
        taskItem.textContent = task;
        taskList.appendChild(taskItem);
    }
}

function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value;
    if (task !== "") {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        const taskItem = document.createElement("div");
        taskItem.textContent = task;
        document.getElementById("task-list").appendChild(taskItem);
        taskInput.value = "";
    }
}

window.addEventListener("load", () => {
    loadTasks();
    updateTimer();
});

document.getElementById("start-button").addEventListener("click", () => {
    startTimer();
});

document.getElementById("add-button").addEventListener("click", () => {
    addTask();
});
