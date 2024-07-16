import { useEffect, useState, React } from 'react'
import { putDay, getUser } from '../util/axios'
import PropTypes from 'prop-types'
import { findDay, findWeek, findNumberOfDaysCompleted } from '../util/helpers'
import ConfirmUpdate from './ConfirmUpdate'
import UpdateGoal from './UpdateGoal'


function Habits (props) {
    const userId = props.user.user.id || ''
    const timezone = props.user.user.timezone || 'America/Los_Angeles'
    const localDay = new Date().toLocaleString('en-US', { timeZone: timezone }).split(',')[0]
    const today = new Date(localDay).toISOString().split('T')[0]
    const [user, setUser] = useState({})
    const [showUpdateGoal, setShowUpdateGoal] = useState(false)
    const [showConfirmUpdate, setShowConfirmUpdate] = useState(false)
    const [habitToUpdate, setHabitToUpdate] = useState({})

    // Fetch user data on component mount
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

    async function handleDayCompletedSubmit (habit) {
        await updateHabitCompletedState(habit)
        checkFrequencyGoalMet(habit)
    }

    async function checkFrequencyGoalMet (habit) {
        // check if the frequency goal is met
        const frequencyGoalMet = (findNumberOfDaysCompleted(findWeek(habit)) / habit.frequency) >= 1 ? true : false
        if (frequencyGoalMet) {
            await setHabitToUpdate(habit)
            setShowConfirmUpdate(true)
        }
        // if yes, prompt user to set a new goal
    }

    async function updateHabitCompletedState (habit) {
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

    async function handleConfirmUpdate () {
        setShowConfirmUpdate(false)
        setShowUpdateGoal(true)
        console.log('Show goal update', habitToUpdate)
    }

    function handleCancelUpdate () {
        setShowConfirmUpdate(false)
    }

    async function handleUpdateGoalSubmit (habit) {
        console.log('Update goal', habit)
        setShowUpdateGoal(false)
        // await updateHabitGoal(habit)
    }

    return (
        <div>
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
                                    onChange={() => handleDayCompletedSubmit(habit)} 
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
            {showUpdateGoal && <section className='h-full w-full fixed top-0 left-0 bg-gray-800 bg-opacity-50 grid grid-flow-col grid-cols-6'>
                <div className='col-span-6 md:col-span-4 md:col-start-2'>
                    <UpdateGoal habit={habitToUpdate} onCancel={() => setShowUpdateGoal(false)} onConfirm={handleUpdateGoalSubmit} />
                </div>
            </section>}
            {showConfirmUpdate && <section className='h-full w-full fixed top-0 left-0 bg-gray-800 bg-opacity-50 grid grid-flow-col grid-cols-6'>
                <div className='col-span-6 md:col-span-4 md:col-start-2'>
                    <ConfirmUpdate habit={habitToUpdate} onConfirm={handleConfirmUpdate} onCancel={handleCancelUpdate} />
                </div>
            </section>}
        </div>
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
