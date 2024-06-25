import { React } from 'react'
import PropTypes from 'prop-types'

function HabitSummary ({ habit, handleSaveHabit }) {
    return (
        <div className='flex flex-col text-lg'>
            <h2 className='text-2xl underline'>{habit.name}</h2>
            <p>Description: {habit.description}</p>
            <p>Why: {habit.why}</p>
            <p>Goal: {habit.goal}</p>
            <p>Frequency: {habit.frequency} times a week</p>
            {habit.reward && <p>Reward: {habit.reward}</p>}
            <p>Emoji: {habit.emoji}</p>
            <button className='bg-primaryBg text-primaryText rounded w-fit p-1 my-2' onClick={() => handleSaveHabit()}>Save</button>
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
