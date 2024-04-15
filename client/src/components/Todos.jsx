import { useState, useEffect } from 'react';
import { getUser } from '../util/axios';

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

  function handleTodoSubmit(e) {
    try {
      const todoIndex = user.todos.findIndex(todo => {
        return todo === e.target.value;
      })
      const updatedTodos = [...user.todos];
      updatedTodos.splice(todoIndex, 1);
      let updatedUser = {...user, todos: updatedTodos};
      setUser(updatedUser);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <section className="flex flex-col rounded-md m-2 bg-secondaryBg text-secondaryText p-2 text-xl shadow-xl">
      <h2>Todos</h2>
      <ul className="list-inside">
      {user.todos && user.todos.map(todo => (
          <li key={todo} className="m-2">
            <div className="flex justify-between">
              <div className="flex">
                <h3>{todo}</h3>
              </div>
              {/* habit completed form */}
              <form onSubmit={handleTodoSubmit}>
                <input type='checkbox' name="habitId" value={todo} onClick={handleTodoSubmit} />
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
  