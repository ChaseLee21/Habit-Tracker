import axios from "axios";
import { useEffect, useState } from "react";

function Habits() {

  // TODO: Replace with the user's ID that is logged in
  // this id is from the seeded data in the database for development
  const userId = '6619cddf126bb54dad75331c';

  const today = new Date().toISOString().split('T')[0];

  const [user, setUser] = useState({});

  // Gets the user populated with habits and analytics on component mount
  useEffect(() => {
    axios.get('/api/users/' + userId)
      .then(res => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    }, []);

    function handleAnalyticsSubmit(e) {
      
    }

    return (
      <>
      <section className="flex flex-col rounded-md m-2 bg-secondaryBg text-secondaryText p-2 text-xl shadow-xl">
        <h2>Todays Habit Progress</h2>
        <ul className="list-inside">
          {user.habits && user.habits.map(habit => (
            <li key={habit._id} className="m-2">
              <div className="flex justify-between">
                <div className="flex">
                  <h3>{habit.name}</h3>
                  <p>: {habit.streak}{habit.streak > 3 ? '🔥' : ''}</p>
                </div>
                {/* habit completed form */}
                <form onSubmit={handleAnalyticsSubmit}>
                  <input type="hidden" name="habitId" value={habit._id} />
                  {/* Submit Form Button */}
                  <button type="submit" className="rounded-md p-1">
                    {/* Finds the analytic.completed value for habit */}
                    {habit.analytics.find((analytic) => {
                      return new Date(analytic.date).toISOString().split('T')[0] === today;
                    }).completed ? '✅' : '❌'}
                  </button>
                </form>
              </div>
              <p className="text-sm">{habit.goal}</p>
            </li>
          ))}
        </ul>
      </section>
      </>
    )
  }
  export default Habits