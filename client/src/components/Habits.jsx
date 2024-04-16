import { useEffect, useState } from "react";
import {putAnalytic, getUser} from "../util/axios";

function Habits() {

  // TODO: Replace with the user's ID that is logged in
  // this id is from the seeded data in the database for development
  const userId = '661d8404f1165ca02a556c4f';

  const today = new Date().toISOString().split('T')[0];

  const [user, setUser] = useState({});

  // Gets the user populated with habits and analytics on component mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser(userId);
        if (userData) {
          console.log(userData);
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
    try {
      e.preventDefault();
      const habitId = e.target.habitId.value;
      const habitIndex = user.habits.findIndex(habit => habit._id === habitId);
      const analyticIndex = user.habits[habitIndex].analytics.findIndex(analytic => new Date(analytic.date).toISOString().split('T')[0] === today);
      let analytic = user.habits[habitIndex].analytics[analyticIndex];
      analytic = await putCompletedAnalytic(analytic);
      console.log(analytic);
      updateUserAnalyticsState(analytic, habitIndex, analyticIndex);
    } catch (err) {
      console.log(err);
    }
  }

  async function putCompletedAnalytic(analytic) {
    try {
      analytic.completed = !analytic.completed;
      return await putAnalytic(analytic);
    } catch (err) {
      console.log(err);
    }
  }

  function updateUserAnalyticsState(analytic, habitIndex, analyticIndex) {
    try {
      let updatedUser = {...user};
      updatedUser.habits[habitIndex].analytics[analyticIndex] = analytic;
      setUser(updatedUser);
    } catch (err) {
      console.log(err);
    }
  }

  function findHabitAnalyticForToday(habit) {
    let analytic = habit.analytics.find(analytic => new Date(analytic.date).toISOString().split('T')[0] === today);
    return analytic || {streak: 0};
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
                <p>: {findHabitAnalyticForToday(habit).streak}</p>
              </div>
              {/* habit completed form */}
              <form onSubmit={handleAnalyticsSubmit}>
                <input type="hidden" name="habitId" value={habit._id} />
                <button type="submit" className="rounded-md p-1">
                  {findHabitAnalyticForToday(habit).completed ? '✅' : '❌'}
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