import { React, useState } from 'react'
import PropTypes from 'prop-types'

function GoalSelection ({ habit, onItemClick }) {
    const [goal, setGoal] = useState('')
    const handleInputChange = (e) => {
        setGoal('I finished my habit for the day when I ' + e.target.value.toLowerCase())
    }
    return (
        <div className='flex flex-col text-lg'>
            <div className='bg-primaryBg text-primaryText rounded p-2'>
                <span className='w-full mx-1'>I finished my habit for the day when I </span>
                <input className='rounded px-1 w-auto text-black' id='whyInput' type='text' max='100' onInput={handleInputChange}></input>
            </div>
            <button className='bg-primaryBg text-primaryText rounded w-fit p-1 my-2' onClick={() => onItemClick(goal)}>Next Question</button>
        </div>
    )
}

GoalSelection.propTypes = {
    habit: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        why: PropTypes.string.isRequired
    }).isRequired,
    onItemClick: PropTypes.func.isRequired
}

export default GoalSelection
