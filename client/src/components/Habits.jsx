import { useEffect, useState, React } from 'react'
import { putAnalytic, getUser } from '../util/axios'
import PropTypes from 'prop-types'

function Habits (props) {
    const userId = props.user.user.id || ''
    const today = new Date().toISOString().split('T')[0]
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

    async function handleAnalyticsSubmit (e) {
        try {
            e.preventDefault()
            const habitId = e.target.habitId.value
            const habitIndex = user.habits.findIndex(habit => habit._id === habitId)
            const analyticIndex = user.habits[habitIndex].analytics.findIndex(analytic => new Date(analytic.date).toISOString().split('T')[0] === today)
            let analytic = user.habits[habitIndex].analytics[analyticIndex]
            analytic = await putCompletedAnalytic(analytic)
            updateUserAnalyticsState(analytic, habitIndex, analyticIndex)
        } catch (err) {
            console.log(err)
        }
    }

    async function putCompletedAnalytic (analytic) {
        try {
            analytic.completed = !analytic.completed
            return await putAnalytic(analytic)
        } catch (err) {
            console.log(err)
        }
    }

    function updateUserAnalyticsState (analytic, habitIndex, analyticIndex) {
        try {
            const updatedUser = { ...user }
            updatedUser.habits[habitIndex].analytics[analyticIndex] = analytic
            setUser(updatedUser)
        } catch (err) {
            console.log(err)
        }
    }

    function findHabitAnalyticForToday (habit) {
        try {
            const analytic = habit.analytics.find(analytic => new Date(analytic.date).toISOString().split('T')[0] === today)
            return analytic
        } catch (err) {
            console.log(err)
            return { streak: 0 }
        }
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
    )
}

Habits.propTypes = {
    user: PropTypes.shape({
        user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            timezone: PropTypes.string,
            email: PropTypes.string,
            name: PropTypes.string
        })
    }).isRequired
}

export default Habits
