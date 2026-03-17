export function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

export function loadTodos() {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
}

export function saveCategories(categories) {
    localStorage.setItem("categories", JSON.stringify(categories));
}

export function loadCategories() {
    const data = localStorage.getItem("categories");
    return data ? JSON.parse(data) : ["General"];
}