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
    getUser(userId)
      .then(res => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    }, []);

    function handleAnalyticsSubmit(e) {
      e.preventDefault();
      const habitId = e.target.habitId.value;
      let analytic = user
        .habits
        .find(habit => habit._id === habitId)
        .analytics
        .find(analytic => new Date(analytic.date).toISOString().split('T')[0] === today);
      analytic.completed = !analytic.completed;
      putAnalytic(analytic)
        .then(res => {
          console.log("analytic successfully updated", res.data);
          let analytic = user.habits.find(habit => habit._id === habitId).analytics.find(analytic => analytic._id === res.data.analytic._id);
          analytic.completed = res.data.analytic.completed;
          analytic.streak = res.data.analytic.streak;
          setUser({...user});
          console.log(user);
        })
        .catch(err => {
          console.log(err);
        });
      
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