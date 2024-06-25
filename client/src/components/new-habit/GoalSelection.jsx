import { React, useState } from 'react'
import PropTypes from 'prop-types'

function GoalSelection ({ onItemClick }) {
    const [goal, setGoal] = useState('')
    const handleInputChange = (e) => {
        setGoal('I finished my habit for the day when I ' + e.target.value.toLowerCase())
    }
    return (
        <div className='flex flex-col text-lg'>
            <div className='flex flex-wrap'>
                <span className='w-fit mx-1'>I finished my habit for the day when I </span>
                <input className='rounded px-1 w-auto text-black' id='goalInput' type='text' max='100' onInput={handleInputChange}></input>
            </div>
            <button className='bg-primaryBg text-primaryText rounded w-fit p-1 my-2' onClick={() => onItemClick(goal)}>Next</button>
        </div>
    )
}

GoalSelection.propTypes = {
    onItemClick: PropTypes.func.isRequired
}

export default GoalSelection
