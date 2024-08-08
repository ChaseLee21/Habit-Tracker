import { useEffect, React, useState } from 'react'
import { useUser } from '../../../../contexts/UserContext'
import { getUser } from '../../../../util/axios'
import PropTypes from 'prop-types'
import { findDay, findWeek, daysCompletedInWeek, validateHabit } from '../../../../util/helpers'
import { Link } from 'react-router-dom'

function Habits (props) {
    const timezone = props.user.user.timezone || 'America/Los_Angeles'
    const { userData, updateUserState, updateHabitCompletedState, updateHabitToUpdate } = useUser()
    const [loaded, setLoaded] = useState(false)
    
    // Fetch user data on component mount
    useEffect(() => {
        async function fetchUser () {
            try {
                const userId = props.user.user.id || ''
                let response = await getUser(userId)
                if (!response || !response.habits) {
                    return
                } else {
                    await response.habits.forEach(async (habit) => {
                        if (!validateHabit(habit, timezone)) {
                            response = await getUser(userId)
                        }
                    })
                    updateUserState(response)
                    setLoaded(true)
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
        const frequencyGoalMet = (daysCompletedInWeek(findWeek(habit)) / habit.frequency) >= 1 ? true : false
        if (frequencyGoalMet) {
            updateHabitToUpdate(habit)
        }
    }



    return (
        <div>
            <section className="bg-colorBg text-colorText rounded p-2 w-fit">
                <h2 className='text-2xl'>My Habits</h2>
                <ul className="list-inside">
                    {loaded && userData.habits.map(habit => (
                        <li key={habit._id} className="my-2">
                            {/* habit completed form and habit title */}
                            <div className="grid grid-flow-col grid-cols-6">
                                <h3 className='text-xl col-span-4'>{habit.emoji} {habit.name}</h3>
                                <form className='col-span-2 flex justify-end'>
                                    <label htmlFor='habitCompleteInput' className='mx-1'>
                                        {daysCompletedInWeek(findWeek(habit))} / {habit.frequency} 
                                    </label>
                                    {findDay(findWeek(habit), timezone) && <input id='habitCompleteInput' type="checkbox" className="large-checkbox"
                                    onChange={() => handleDayCompletedSubmit(habit)} 
                                    defaultChecked={findDay(findWeek(habit), timezone).completed} 
                                    />}
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
                    {loaded && userData.habits.length === 0 && <div className='text-lg'>
                        <p>Thank you for creating an Account!</p>
                        <Link className='text-colorLink hover:text-colorLinkHover font-bold' to={'/new-habit'} onClick={() => handleNavBarClick()}>Click here to get started</Link>
                    </div>
                    }
                    {!loaded && <div>
                        <p>Loading...</p>
                        <p>Try refreshing the page.</p>
                    </div>
                    }
                </ul>
            </section>
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
