const todosContainer = document.querySelector("#todos-container");
const detailsPanel = document.querySelector(".todo-detailsPanel");

const detailsTitle = document.querySelector("#details-title");
const detailsDescription = document.querySelector("#details-description");
const detailsDate = document.querySelector("#details-date");
const detailsPriority = document.querySelector("#details-priority");
const detailsCategory = document.querySelector("#details-category");

const taskFilters = document.querySelectorAll("#tasks-list li");
const categoriesList = document.querySelector("#categories-list");

//let selectedTodo = null;

const listTitle = document.querySelector("#list-title");

export function setListTitle(filter) {

    if (filter.type === "today") {
        listTitle.textContent = "Today";
        return;
    }

    if (filter.type === "upcoming") {
        listTitle.textContent = "Upcoming";
        return;
    }

    if (filter.type === "calendar") {
        listTitle.textContent = "Calendar";
        return;
    }

    if (filter.type === "sticky") {
        listTitle.textContent = "Sticky Wall";
        return;
    }

    if (filter.type === "category") {
        listTitle.textContent = filter.value;
        return;
    }

    listTitle.textContent = "All Tasks";
}

export function renderTodos(todos, onTodoClick) {
    todosContainer.innerHTML = "";

    todos.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.classList.add(`priority-${todo.priority}`);

        todoItem.innerHTML = `
            <h3>${todo.title}</h3>
            <p>${todo.dueDate}</p>
        `;

        todoItem.addEventListener("click", () => {
            onTodoClick(todo);
        });
        todosContainer.appendChild(todoItem);
    });
}

export function openDetails(todo, categories) {
    detailsPanel.classList.add("open");
    detailsTitle.value = todo.title;
    detailsDescription.value = todo.description;
    detailsDate.value = todo.dueDate;
    detailsPriority.value = todo.priority;

    detailsCategory.innerHTML = "";

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        if (category === todo.category) {
            option.selected = true;
        }
        detailsCategory.appendChild(option);
    });
}

export function closeDetails() {
    detailsPanel.classList.remove("open");
}

export function getDetailsFormData() {
    return {
        title: detailsTitle.value.trim(),
        description: detailsDescription.value.trim(),
        dueDate: detailsDate.value,
        priority: detailsPriority.value,
        category: detailsCategory.value,
    };
}

export function renderCategories(categories, onClick) {
    categoriesList.innerHTML = "";

    categories.forEach(category => {

        const li = document.createElement("li");
        li.textContent = category;

        li.addEventListener("click", () => {
            console.log("show category:", category);
            onClick(category);
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

const modal = document.querySelector("#todo-modal");
const categorySelect = document.querySelector("#modal-category");

export function openModal(categories) {
    modal.classList.remove("hidden");

    document.querySelector("#modal-date").min = new Date().toISOString().split("T")[0];

    // populate categories
    categorySelect.innerHTML = "";

    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}

export function closeModal() {
    console.log("close modal");
    modal.classList.add("hidden");
}

export function getModalData() {
    return {
        title: document.querySelector("#modal-title").value.trim(),
        description: document.querySelector("#modal-description").value.trim(),
        dueDate: document.querySelector("#modal-date").value,
        category: document.querySelector("#modal-category").value,
        priority: document.querySelector("#modal-priority").value,
    };
}

export function resetModal() {
    document.querySelector("#modal-title").value = "";
    document.querySelector("#modal-description").value = "";
    document.querySelector("#modal-date").value = "";
}

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

const errorEl = document.querySelector("#modal-error");

export function showModalError(message) {
    errorEl.textContent = message;
}

export function clearModalError() {
    errorEl.textContent = "";
}

const categoryModal = document.querySelector("#category-modal");
const categoryInput = document.querySelector("#category-name-input");
const categoryError = document.querySelector("#category-error");

export function openCategoryModal() {
    categoryModal.classList.remove("hidden");
    categoryInput.value = "";
    categoryError.textContent = "";
}

export function closeCategoryModal() {
    categoryModal.classList.add("hidden");
}

export function getCategoryInput() {
    return categoryInput.value.trim();
}

export function showCategoryError(msg) {
    categoryError.textContent = msg;
}