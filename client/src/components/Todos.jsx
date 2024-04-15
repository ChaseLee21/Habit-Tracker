import { useState, useEffect } from 'react';
import { getUser } from '../util/axios';

function Todos() {
  // TODO: Replace with the user's ID that is logged in
  // this id is from the seeded data in the database for development
  const userId = '661d789ab93534f13c58aaa1';

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
    e.preventDefault();
    throw new Error('Not implemented');
  }

  return (
    <>
      <section className="flex flex-col rounded-md m-2 bg-secondaryBg text-secondaryText p-2 text-xl shadow-xl">
      <h2>Todos</h2>
      <ul className="list-inside">
      {user.todos && user.todos.map(todo => (
          <li key={todo._id} className="m-2">
            <div className="flex justify-between">
              <div className="flex">
                <h3>{todo.name}</h3>
              </div>
              {/* habit completed form */}
              <form onSubmit={handleTodoSubmit}>
                <input type="hidden" name="habitId" value={todo._id} />
                {/* Submit Form Button */}
                <button type="submit" className="rounded-md p-1">
                  submit
                </button>
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
  