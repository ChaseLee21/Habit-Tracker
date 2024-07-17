import { React, useState } from 'react'
import PropTypes from 'prop-types'

function GoalSelection ({ onItemClick }) {
    const [goal, setGoal] = useState('')
    const handleInputChange = (e) => {
        setGoal(e.target.value.toLowerCase())
    }
    return (
        <div className='p-2 bg-colorBgAlt rounded-md cursor-pointer'>
            <input className='rounded w-full px-1' id='goalInput' type='text' max='100' onInput={handleInputChange}></input>
            <button className='bg-colorButtonBgAlt text-colorButtonTextAlt hover:text-colorLinkHover rounded w-fit p-1 my-2' onClick={() => onItemClick(goal)}>Next</button>
        </div>
    )
}

GoalSelection.propTypes = {
    onItemClick: PropTypes.func.isRequired
}

export default GoalSelection
