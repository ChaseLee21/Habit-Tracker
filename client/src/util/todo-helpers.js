
function updateTodos(todo, todos) {
    todos.push(todo);
    return todos;
}

function updateUserTodosState(user, updatedTodos) {
    let updatedUser = { ...user, todos: updatedTodos };
    return updatedUser;
}

export { updateTodos, updateUserTodosState };