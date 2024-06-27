import { React } from 'react'
import PropTypes from 'prop-types'

function HabitSummary ({ habit, handleSaveHabit }) {
    return (
        <div className='p-2 bg-colorBgAlt rounded-md cursor-pointer'>
            <div className='flex justify-between'>
                <h3 className='text-xl'>{habit.emoji} {habit.name}</h3>
            </div>
            <p>I will {habit.description}</p>
            <p>Because {habit.why}</p>
            <p>I finish my habit for the day when {habit.goal}</p>
            {habit.frequency === 1 && <p>I will do this habit {habit.frequency} time a week</p>}
            {habit.frequency > 1 && <p>I will do this habit {habit.frequency} times a week</p>}
            <button className='bg-colorButtonBgAlt text-colorButtonTextAlt rounded w-fit p-1 my-2' onClick={() => handleSaveHabit()}>Save</button>
        </div>
    )
}

HabitSummary.propTypes = {
    habit: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        why: PropTypes.string.isRequired,
        goal: PropTypes.string.isRequired,
        frequency: PropTypes.number.isRequired,
        reward: PropTypes.string.isRequired,
        emoji: PropTypes.string.isRequired
    }).isRequired,
    handleSaveHabit: PropTypes.func.isRequired
}

export default HabitSummary
