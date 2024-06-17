function createTodo (todo, todos) {
    todos.push(todo)
    return todos
}

function updateUserTodosState (user, updatedTodos) {
    const updatedUser = { ...user, todos: updatedTodos }
    return updatedUser
}

function removeTodo (todo, todos) {
    todos.splice(todos.indexOf(todo), 1)
    return todos
}

export { createTodo, updateUserTodosState, removeTodo }
