let allTasks = [];
let currentFilter = 'all';

function addTask() {
    const name = document.getElementById("taskName").value;
    const date = document.getElementById("taskDate").value;
    const status = document.getElementById("taskStatus").value;

    if (!name || !date) {
        alert("Please fill in the task name and date.");
        return;
    }

    allTasks.push({
        name: name,
        date: new Date(date),
        status: status
    });

    renderTasks();
}

function filterTasks(timeframe) {
    currentFilter = timeframe;
    renderTasks();
}

function renderTasks() {
    const columns = document.querySelectorAll(".column");
    columns.forEach(col => {
        const header = col.querySelector("h2");
        col.innerHTML = "";
        col.appendChild(header);
    });

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const filtered = allTasks.filter(task => {
        const taskDate = new Date(task.date.getFullYear(), task.date.getMonth(), task.date.getDate());
        
        if (currentFilter === 'all') return true;

        if (currentFilter === 'today') {
            return taskDate.getTime() === today.getTime();
        }
        if (currentFilter === 'tomorrow') {
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            return taskDate.getTime() === tomorrow.getTime();
        }
        if (currentFilter === 'yesterday') {
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            return taskDate.getTime() === yesterday.getTime();
        }
        if (currentFilter === 'thisweek') {
            const first = today.getDate() - today.getDay();
            const last = first + 6;
            const firstDay = new Date(today.setDate(first));
            const lastDay = new Date(today.setDate(last));
            return task.date >= firstDay && task.date <= lastDay;
        }
        if (currentFilter === 'lastweek') {
            const first = today.getDate() - today.getDay() - 7;
            const last = first + 6;
            const firstDay = new Date(new Date().setDate(first));
            const lastDay = new Date(new Date().setDate(last));
            return task.date >= firstDay && task.date <= lastDay;
        }
        return true;
    });

    filtered.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.innerHTML = `<strong>${task.name}</strong><br><small>${task.date.toLocaleString()}</small>`;

        const columnId = task.status.replace(/\s/g, "").toLowerCase();
        const column = document.getElementById(columnId);
        if (column) {
            column.appendChild(taskDiv);
        }
    });
}