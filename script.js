document.addEventListener("DOMContentLoaded", () => {

    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";
        let completed = 0;

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task.text;

            if (task.done) {
                li.classList.add("completed");
                completed++;
            }

            li.addEventListener("click", () => {
                task.done = !task.done;
                saveTasks();
                renderTasks();
            });

            const deleteBtn = document.createElement("span");
            deleteBtn.textContent = " ✕";
            deleteBtn.style.cursor = "pointer";

            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });

        const percent = tasks.length ? (completed / tasks.length) * 100 : 0;
        progressBar.style.width = percent + "%";
        progressText.textContent = `${Math.round(percent)}% completed`;
    }

    addBtn.addEventListener("click", () => {
        const text = taskInput.value.trim();
        if (text === "") return;

        tasks.push({ text: text, done: false });
        taskInput.value = "";
        saveTasks();
        renderTasks();
    });

    renderTasks();
});