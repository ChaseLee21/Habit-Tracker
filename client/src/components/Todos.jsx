import { useState, useEffect } from 'react';
import { getUser } from '../util/axios';
import { createTodo, updateUserTodosState, removeTodo } from '../util/todo-helpers';

function Todos() {
  // TODO: Replace with the user's ID that is logged in
  // this id is from the seeded data in the database for development
  const userId = '661d8404f1165ca02a556c4f';

  const [user, setUser] = useState({});

  // Gets the user populated with habits and analytics on component mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser(userId);
        if (userData) {
          setUser(userData);
        } else {
          console.log('No user data found');
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, []);

  function handleTodoCreate(e) {
    try {
      e.preventDefault();
      const updatedTodos = createTodo(e.target.todo.value, user.todos);
      const updatedUser = updateUserTodosState(user, updatedTodos);
      setUser(updatedUser);
      e.target.todo.value = '';
    } catch (err) {
      console.log(err);
    }
  }

  function handleTodoDelete(e) {
    try {
      const updatedTodos = removeTodo(e.target.value, user.todos);
      const updatedUser = updateUserTodosState(user, updatedTodos);
      setUser(updatedUser);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
    <section className="flex flex-col rounded-md m-2 bg-secondaryBg text-secondaryText p-2 text-xl shadow-xl">
      <div className='flex flex-row'>
        <h2>Todos:</h2>
        <form className='mx-2' onSubmit={handleTodoCreate}>
          <input className='px-2 mx-2 rounded' type='text' name='todo' />
          <button className='bg-primaryBg text-primaryText px-2 mx-2 rounded' type='submit'>Add</button>
        </form>
      </div>
      <ul className="list-inside">
      {user.todos && user.todos.map(todo => (
          <li key={todo} className="m-2">
            <div className="flex justify-between">
              <div className="flex">
                <h3>{todo}</h3>
              </div>
              {/* habit completed form */}
              <form onSubmit={handleTodoDelete}>
                <input type='checkbox' name="habitId" value={todo} onClick={handleTodoDelete} />
              </form>
            </div>
          </li>
        ))}
      </ul>
    </section>
    </>
  )
}

export default Todos
  