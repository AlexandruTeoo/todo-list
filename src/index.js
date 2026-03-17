import "./styles.css";

import {
    renderTodos,
    renderCategories,
    initSidebarFilters,
    openDetails,
    closeDetails,
    getDetailsFormData
} from "./dom.js";
import { createTodo } from "./todo.js";
import {
    loadTodos,
    saveTodos,
    loadCategories,
    saveCategories
} from "./storage.js";
import {
    setListTitle,
    openModal,
    closeModal,
    getModalData,
    resetModal,
    showModalError,
    clearModalError
} from "./dom.js";

import {
    openCategoryModal,
    closeCategoryModal,
    getCategoryInput,
    showCategoryError
} from "./dom.js";

document.addEventListener("DOMContentLoaded", () => {

    let todos = loadTodos();
    let categories = loadCategories();
    let currentFilter = {type: "all"};
    let selectedTodo = null;

    const allTasksBtn = document.querySelector("#all-tasks");
    allTasksBtn.addEventListener("click", () => {
        currentFilter = { type: "all" };
        updateView();
    });

    function isToday(date) {
        const today = new Date().toISOString().split("T")[0];
        return date === today;
    }

    function getFilteredTodos() {
        if (currentFilter.type === "today"){
            console.log(currentFilter.type);
            return todos.filter(todo => isToday(todo.dueDate));
        }
        if (currentFilter.type === "upcoming") {
            console.log(currentFilter.type);
            return todos;
        }
        if (currentFilter.type === "sticky") {
            console.log(currentFilter.type);
            return todos.filter(todo => todo.category === currentFilter.value);
        }
        if (currentFilter.type === "calendar") {
            console.log(currentFilter.type);
            return todos.filter(todo => todo.category === currentFilter.value);
        }
        if (currentFilter.type === "category") {
            return todos.filter(todo => todo.category === currentFilter.value);
        }
        return todos;
    }

    function updateView(){
        const filtered = getFilteredTodos();

        setListTitle(currentFilter);

        renderTodos(filtered, (todo) => {
            selectedTodo = todo;
            openDetails(todo, categories);
        });

        renderCategories(categories, (category) => {
            currentFilter = { type: "category", value: category };
            updateView();
        });
    }

    // INITIAL RENDER
    updateView();

    initSidebarFilters(filter => {
        currentFilter = { type: filter };
        updateView();
    });

    renderCategories(categories, (category) => {
        currentFilter = {type: "category", value: category};
        updateView();
    });

    const addTodoBtn = document.querySelector("#add-todo");

    addTodoBtn.addEventListener("click", () => {

        addTodoBtn.addEventListener("click", () => {
            openModal(categories);
        });

        const saveBtn = document.querySelector("#save-todo");

        saveBtn.addEventListener("click", () => {
            clearModalError();
            const data = getModalData();

            if (!data.title) {
                showModalError("Title is required");
                return;
            }

            if (!data.dueDate) {
                showModalError("Date is required");
                return;
            }
            else {
                const newTodo = createTodo(
                    data.title,
                    data.description,
                    data.dueDate,
                    data.priority,
                    data.category
                );

                todos.push(newTodo);
                saveTodos(todos);
            }
            closeModal();
            resetModal();
            updateView();
        });
    });

    const addCategoryBtn = document.querySelector("#add-category");

    addCategoryBtn.addEventListener("click", () => {

        addCategoryBtn.addEventListener("click", () => {
            openCategoryModal();
        });
        document.querySelector("#save-category").addEventListener("click", () => {

            const name = getCategoryInput();

            if (!name) {
                showCategoryError("Category name required");
                return;
            }

            if (categories.includes(name)) {
                showCategoryError("Category already exists");
                return;
            }

            categories.push(name);
            saveCategories(categories);

            renderCategories(categories, (category) => {
                currentFilter = { type: "category", value: category };
                updateView();
            });

            closeCategoryModal();
        });
        document.querySelector("#close-category-modal").addEventListener("click", closeCategoryModal);
        const categoryModal = document.querySelector("#category-modal");
        categoryModal.addEventListener("click", (e) => {
            if (e.target === categoryModal) {
                closeCategoryModal();
            }
        });
    });

    const closeBtn = document.querySelector("#close-modal");

    closeBtn.addEventListener("click", () => {
        closeModal();
    });

    const saveChangesBtn = document.querySelector("#save-changes");
    saveChangesBtn.addEventListener("click", () => {
        if (!selectedTodo) return;

        const updatedData = getDetailsFormData();

        if (!updatedData.title) return;

        selectedTodo.title = updatedData.title;
        selectedTodo.description = updatedData.description;
        selectedTodo.dueDate = updatedData.dueDate;
        selectedTodo.priority = updatedData.priority;
        selectedTodo.category = updatedData.category;

        saveTodos(todos);
        updateView();
        openDetails(selectedTodo, categories);
    });

    const deleteTaskBtn = document.querySelector("#delete-task");
    deleteTaskBtn.addEventListener("click", () => {
        if (!selectedTodo) return;

        todos = todos.filter(todo => todo.id !== selectedTodo.id);

        saveTodos(todos);
        selectedTodo = null;
        closeDetails();
        updateView();
    });
});