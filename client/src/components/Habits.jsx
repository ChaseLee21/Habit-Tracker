import axios from "axios";
import { useEffect, useState } from "react";

function Habits() {

  // TODO: Replace with the user's ID that is logged in
  // this id is from the seeded data in the database for development
  const userId = '661069cfeb1be5740efeb819';

  const date = new Date().toISOString().split('T')[0];
  console.log(date);

  const [habits, setHabits] = useState([]);
  const [todaysAnalytics, setTodaysAnalytics] = useState([]);

  useEffect(() => {
    axios.get('/api/habits/' + userId)
      .then(res => {
        setHabits(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    }, []);

  useEffect(() => {
    axios.get('/api/analytics/' + userId + '/' + date)
      .then(res => {
        setTodaysAnalytics(res.data);
        console.log(res.data);
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
                <form action={`/api/analytics/${habit._id}/${date}`} method="POST">
                  <button type="submit" className="rounded-md p-1">{todaysAnalytics.find({habit: habit._id}).completed ? '✅' : '❌'}</button>
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
  