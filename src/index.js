import "./syles.css";

import {openDetails, closeDetails} from "./dom.js";

const todos = document.querySelectorAll(".todo-item");

todos.forEach(todo => {
    todo.addEventListener("click", () => {
        const panel = document.querySelector(".todo-detailsPanel");
        if (panel.classList.contains("open"))
        {
            closeDetails();
            //console.log("close");
        }
        else
            openDetails();
    })
});

import { renderTodos, renderCategories, initSidebarFilters } from "./dom.js";

//const todos = [];
const categories = ["Work", "Home"];


renderCategories(categories);
renderTodos(todos);


initSidebarFilters(filter => {
    console.log("filter selected:", filter);
});