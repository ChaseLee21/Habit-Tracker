import { useEffect, useState, React } from 'react'
import { putDay, getUser } from '../util/axios'
import PropTypes from 'prop-types'

function Habits (props) {
    const userId = props.user.user.id || ''
    const timezone = props.user.user.timezone || 'America/Los_Angeles'
    const localDay = new Date().toLocaleString('en-US', { timeZone: timezone }).split(',')[0]
    const today = new Date(localDay).toISOString().split('T')[0]
    const [user, setUser] = useState({})

    useEffect(() => {
        async function fetchUser () {
            try {
                console.log(userId)
                const userData = await getUser(userId)
                if (userData) {
                    console.log(userData)
                    setUser(userData)
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
        const day = { ...findDay(habit) }
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

    function findDay (habit) {
        const week = habit.weeks[habit.weeks.length - 1]
        const day = week.days.find(day => day.date === today)
        return day
    }

    return (
        <section className="flex flex-col rounded-md m-2 p-2 bg-colorBg text-colorText shadow-md shadow-colorShadow">
            <ul className="list-inside">
                {user.habits && user.habits.map(habit => (
                    <li key={habit._id} className="m-2">
                        <div className="flex justify-between">
                            <div className="flex">
                                <h3 className='text-xl'>{habit.streak}{habit.emoji} {habit.name}</h3>
                            </div>
                            {/* habit completed form */}
                            <form>
                                <button onClick={() => handleDayCompleteSubmit(habit)} type="button" className="rounded-md p-1">
                                    {findDay(habit).completed ? '✅' : '❌'}
                                </button>
                            </form>
                        </div>
                        <p className="text-base">{habit.goal}</p>
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
