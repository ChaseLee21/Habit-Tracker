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
        const day = findDay(habit)
        day.completed = !day.completed
        console.log('day', day)
        await putDay(day)
        // update state
    }

    function findDay (habit) {
        const week = habit.weeks[habit.weeks.length - 1]
        const day = week.days.find(day => day.date === today)
        return day
    }

    return (
        <section className="flex flex-col rounded-md m-2 bg-secondaryBg text-secondaryText p-2 text-xl shadow-xl">
            <h2>Habit Progress</h2>
            <ul className="list-inside">
                {user.habits && user.habits.map(habit => (
                    <li key={habit._id} className="m-2">
                        <div className="flex justify-between">
                            <div className="flex">
                                <h3>{habit.name}</h3>
                            </div>
                            {/* habit completed form */}
                            <form>
                                <button onClick={() => handleDayCompleteSubmit(habit)} type="button" className="rounded-md p-1">
                                    {findDay(habit).completed ? '✅' : '❌'}
                                </button>
                            </form>
                        </div>
                        <p className="text-sm">{habit.goal}</p>
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
