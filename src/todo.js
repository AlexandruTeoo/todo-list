class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
}

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