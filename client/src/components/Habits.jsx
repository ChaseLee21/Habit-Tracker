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
    }, [date]);

    useEffect(() => {
      for (const analytic of todaysAnalytics) {
        if (!analytic.completed) {
          return;
        }
        const habitId = analytic.habit;
        axios.put('/api/habits/streak/' + habitId.toString())
          .then((res) => {
            console.log(res.data);
            const updatedHabits = habits.map(habit => {
              if (habit._id === habitId) {
                return res.data.habit;
              }
              return habit;
            });
            setHabits(updatedHabits);
          })
      }
    }, [todaysAnalytics])


    // handle the form submission to update the habit completed status
    function handleAnalyticsSubmit(event) {
      event.preventDefault();
      const habitId = event.target.habitId.value;
      const analytic = todaysAnalytics.find(analytic => {
        return analytic.habit.toString() === habitId.toString();
      });
      const completed = !analytic.completed;
      axios.put('/api/analytics/' + analytic._id, { completed })
        .then(res => {
          console.log(res.data);
          const updatedAnalytics = todaysAnalytics.map(analytic => {
            if (analytic._id === res.data.analytic._id) {
              return res.data.analytic;
            }
            return analytic;
          });
          setTodaysAnalytics(updatedAnalytics);
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
          {habits.map(habit => (
            <li key={habit._id} className="m-2">
              <div className="flex justify-between">
                <div className="flex">
                  <h3>{habit.name}</h3>
                  <p>: {habit.streak}{habit.streak > 3 ? '🔥' : ''}</p>
                </div>
                {/* habit completed form */}
                <form onSubmit={handleAnalyticsSubmit}>
                  <input type="hidden" name="habitId" value={habit._id} />
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