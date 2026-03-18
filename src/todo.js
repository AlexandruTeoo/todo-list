export function createTodo(title, description, dueDate, priority, category) {
    return {
        id: crypto.randomUUID(),
        title,
        description,
        dueDate,
        priority,
        category,
        completed: false
    };
}