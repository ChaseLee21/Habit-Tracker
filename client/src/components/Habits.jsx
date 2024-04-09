import axios from "axios";
import { useEffect, useState } from "react";

function Habits() {

  // TODO: Replace with the user's ID that is logged in
  // this id is from the seeded data in the database for development
  const userId = '661083661f5b7502d761242a';

  const date = new Date().toISOString().split('T')[0];

  const [habits, setHabits] = useState([]);
  const [todaysAnalytics, setTodaysAnalytics] = useState([]);

  // get all habits for the user
  useEffect(() => {
    axios.get('/api/habits/' + userId)
      .then(res => {
        console.log(res.data);
        setHabits(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    }, []);

  // get all analytics for the user for today
  useEffect(() => {
    axios.get('/api/analytics/' + userId + '/' + date)
      .then(res => {
        console.log(res.data);
        setTodaysAnalytics(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    }, []);

    return (
      <>
      <section className="flex flex-col rounded-md m-2 bg-secondaryBg text-secondaryText p-2 text-xl shadow-xl">
        <h2>Today's Habits Progress</h2>
        <ul className="list-inside">
          {habits.map(habit => (
            <li key={habit._id} className="m-2">
              <div className="flex justify-between">
                <div className="flex">
                  <h3>{habit.name}</h3>
                  <p>: {habit.streak}{habit.streak > 3 ? '🔥' : ''}</p>
                </div>
                {/* habit completed form */}
                {/* TODO: update this form once the api is updated. */}
                <form action={`/api/analytics/${habit._id}/${date}`} method="PUT">
                  <button type="submit" className="rounded-md p-1">
                  {todaysAnalytics.length > 0 && todaysAnalytics.find((analytic) => {
                    return analytic.habit.toString() === habit._id.toString();
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
  // 4/5/2024
  // Just finished retrieving the habits and analytics for the user.
  // Left off on lines 54 - 58 where i created a ternary operator to check if the habit was completed for the day.
  // Next I need to add functionality to the form to update the habit to either completed or not completed for the day.