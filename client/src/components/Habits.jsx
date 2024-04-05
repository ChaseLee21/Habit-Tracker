import axios from "axios";
import { useEffect, useState } from "react";

function Habits() {

  const [habits, setHabits] = useState([]);

  useEffect(() => {
    axios.get('/api/habits')
      .then(res => {
        setHabits(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    }, []);

    return (
      <>
      <section className="flex flex-col rounded-md m-2 bg-secondaryBg text-secondaryText p-2 text-xl shadow-xl">
        <h2>Today's Habits</h2>
        <ul className="list-inside">
            <li>Exercise</li>
            <li>Coding</li>
            <li>Healthy Meal</li>
        </ul>

      </section>
      </>
    )
  }
  
  export default Habits
  