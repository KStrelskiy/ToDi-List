const mainItem = document.querySelector(".main-item");
const list = document.querySelector(".list-group");
const form = document.querySelector("#form");
const input = document.querySelector("#taskInput");
const btnPrimary = document.querySelector(".btn-primary");

let task = [];

if (localStorage.getItem("tasks")) {
    task = JSON.parse(localStorage.getItem("tasks"));
    task.forEach((task) => {
        addHtml(task);
    });
    if (list.children.length > 1) {
        mainItem.classList.add("none");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let text = input.value;
    if (text === "") {
        return;
    }

    const taskObj = {
        id: Date.now(),
        text: text,
        done: false,
    };

    task.push(taskObj);

    toLocalStorage();

    addHtml(taskObj);

    mainItem.classList.add("none");

    input.value = "";
    input.focus();
});

list.addEventListener("click", deleteTask);

list.addEventListener("click", doneTask);

function deleteTask(event) {
    if (event.target.dataset.action === "delete") {
        const ind = task.findIndex((item) => {
            return +event.target.closest(".task-item").id === item.id;
        });
        task.splice(ind, 1);
        event.target.closest(".task-item").remove();
        if (list.children.length === 1) {
            mainItem.classList.remove("none");
        }
    }
    toLocalStorage();
}

function doneTask(event) {
    if (event.target.dataset.action === "done") {
        const done = event.target.closest(".task-item");
        done.classList.toggle("done");
        task.filter((item) => {
            if (+done.id === item.id) {
                item.done = !item.done;
            }
        });
    }
    toLocalStorage();
}

function toLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(task));
}

function addHtml(task) {
    const cssClass =
        task.done === false
            ? `list-group-item task-item`
            : `list-group-item task-item done`;

    const layout = `
    <li id = "${task.id}" class="${cssClass}">
                        <div class="task-title">${task.text}</div>
                        <div class="task-item__buttons">
                            <button type="button" class="btn-action" data-action = 'done' width = '18' height = '18'>
                                <img src="./img/tick.svg" alt="tick">
                            </button>
                            <button type="button" class="btn-action" data-action = 'delete' width = '18' height = '18'>
                                <img src="./img/krest.svg" alt="cross">
                            </button>
                        </div>
                    </li>
    `;
    list.insertAdjacentHTML("beforeend", layout);
}
