import { useEffect, useState } from "react";
import {putAnalytic, getUser} from "../util/axios";

function Habits() {

  // TODO: Replace with the user's ID that is logged in
  // this id is from the seeded data in the database for development
  const userId = '661d789ab93534f13c58aaa1';

  const today = new Date().toISOString().split('T')[0];

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

    async function handleAnalyticsSubmit(e) {
      e.preventDefault();
      const habitId = e.target.habitId.value;
      try {
        const habitIndex = user.habits.findIndex(habit => habit._id === habitId);
        const analyticIndex = user.habits[habitIndex].analytics.findIndex(analytic => new Date(analytic.date).toISOString().split('T')[0] === today);
        
        let analytic = user.habits[habitIndex].analytics[analyticIndex];
        analytic.completed = !analytic.completed;
        analytic = await putAnalytic(analytic);
    
        let updatedUser = {...user};
        updatedUser.habits[habitIndex].analytics[analyticIndex] = analytic;
        setUser(updatedUser);
      } catch (err) {
        console.log(err);
      }
    }

    return (
      <>
      <section className="flex flex-col rounded-md m-2 bg-secondaryBg text-secondaryText p-2 text-xl shadow-xl">
        <h2>Habit Progress</h2>
        <ul className="list-inside">
          {user.habits && user.habits.map(habit => (
            <li key={habit._id} className="m-2">
              <div className="flex justify-between">
                <div className="flex">
                  <h3>{habit.name}</h3>
                  <p>: {habit.analytics.find(analytic => new Date(analytic.date).toISOString().split('T')[0] === today).streak}{habit.streak > 3 ? '🔥' : ''}</p>
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