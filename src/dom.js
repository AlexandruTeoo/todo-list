const todosContainer = document.querySelector("#todos-container");
const detailsPanel = document.querySelector(".todo-detailsPanel");
const taskName = document.querySelector("#task-name");
const taskDescription = document.querySelector("#task-description");

const taskFilters = document.querySelectorAll("#tasks-list li");
const categoriesList = document.querySelector("#categories-list");

export function renderTodos(todos) {
    todosContainer.innerHTML = "";

    todos.forEach(todo => {

        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        todoItem.innerHTML = `<h3>${todo.title}</h3>
                                <p>${todo.dueDate}</p>`;

        todoItem.addEventListener("click", () => {
            openDetails(todo);
        });
        todosContainer.appendChild(todoItem);
    });
}

export function openDetails(todo) {
    detailsPanel.classList.add("open");

    taskName.textContent = todo.title;
    taskDescription.textContent = todo.description;
}

export function closeDetails() {
    detailsPanel.classList.remove("open");
}

export function renderCategories(categories) {
    categoriesList.innerHTML = "";

    categories.forEach(category => {

        const li = document.createElement("li");
        li.textContent = category;

        li.addEventListener("click", () => {
            console.log("show category:", category);
            // filter todos
        });
        categoriesList.appendChild(li);
    });
}

export function initSidebarFilters(callback) {
    taskFilters.forEach(filter => {

        filter.addEventListener("click", () => {

            const type = filter.dataset.filter;

            callback(type);
        });
    });
}