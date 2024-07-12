import { useEffect, useState, React } from 'react'
import { putDay, getUser } from '../util/axios'
import PropTypes from 'prop-types'
import { findDay, findWeek, findNumberOfDaysCompleted } from '../util/helpers'

function Habits (props) {
    const userId = props.user.user.id || ''
    const timezone = props.user.user.timezone || 'America/Los_Angeles'
    const localDay = new Date().toLocaleString('en-US', { timeZone: timezone }).split(',')[0]
    const today = new Date(localDay).toISOString().split('T')[0]
    const [user, setUser] = useState({})

    useEffect(() => {
        async function fetchUser () {
            try {
                const userData = await getUser(userId)
                if (userData) {
                    setUser(userData)
                    console.log(userData)
                } else {
                    console.log('No user data found')
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchUser()
    }, [])

    async function handleDayCompleteSubmit (habit) {
        const day = { ...findDay(findWeek(habit), timezone) }
        day.completed = !day.completed
        const updatedDay = await putDay(day)
        // Clone the current user state to avoid direct mutation
        const updatedUser = { ...user }
        // Find the habit in the cloned state
        const habitToUpdate = updatedUser.habits.find(h => h._id === habit._id)
        if (habitToUpdate) {
            // Find the week in the habit
            const weekToUpdate = habitToUpdate.weeks[habitToUpdate.weeks.length - 1]
            if (weekToUpdate) {
                // Find the day in the week and update its completed status
                const dayToUpdate = weekToUpdate.days.find(d => d.date === today)
                dayToUpdate.completed = updatedDay.completed
            }
            // Update the streak
            if (day.completed === true && habitToUpdate.streak !== undefined) {
                habitToUpdate.streak++
            } else if (day.completed === false && habitToUpdate.streak !== undefined) {
                habitToUpdate.streak--
            }
        }

        setUser(updatedUser)
    }

    return (
        <section className="bg-colorBg text-colorText rounded p-2 w-fit">
            <h2 className='text-2xl'>My Habits</h2>
            <ul className="list-inside">
                {user.habits && user.habits.map(habit => (
                    <li key={habit._id} className="my-2">
                        {/* habit completed form and habit title */}
                        <div className="grid grid-flow-col grid-cols-6">
                            <h3 className='text-xl col-span-4'>{habit.emoji} {habit.name}</h3>
                            <form className='col-span-2 flex justify-end'>
                                <label htmlFor='habitCompleteInput' className='mx-1'>
                                    {findNumberOfDaysCompleted(findWeek(habit))} / {habit.frequency} 
                                </label>
                                <input id='habitCompleteInput' type="checkbox" className="large-checkbox"
                                onChange={() => handleDayCompleteSubmit(habit)} 
                                defaultChecked={findDay(findWeek(habit), timezone).completed} 
                                />
                            </form>
                        </div>
                        <p className="text-base">I will {habit.description}</p>
                        <p className="text-base">Because {habit.why}</p>
                        <p className="text-base">I finish my habit for the day when {habit.goal}</p>
                        {habit.frequency === 1 && <p className="text-base">I will do this habit {habit.frequency} time a week</p>}
                        {habit.frequency > 1 && <p className="text-base">I will do this habit {habit.frequency} times a week</p>}
                        {habit.streak !== undefined && <p className="text-base">My current streak is {habit.streak} days</p>}
                    </li>
                ))}
            </ul>
        </section>
    )
}

Habits.propTypes = {
    user: PropTypes.shape({
        user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            timezone: PropTypes.string.isRequired,
            email: PropTypes.string,
            name: PropTypes.string
        })
    }).isRequired
}

export default Habits
