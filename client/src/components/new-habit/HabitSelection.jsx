import React from 'react'
import PropTypes from 'prop-types'

function HabitSelection ({ defaultHabits, onItemClick }) {
    return (
        <ul>
            {defaultHabits.map((point, index) => {
                return (
                    <li key={index} className='m-2 p-2 bg-colorButtonBg text-colorButtonText rounded-md shadow-md cursor-pointer hover:text-colorLinkHover' onClick={() => onItemClick(point)}>
                        <span className='mx-2 '>{point.emoji}</span>
                        {point.name}
                    </li>
                )
            })}
        </ul>
    )
}

HabitSelection.propTypes = {
    defaultHabits: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            emoji: PropTypes.string.isRequired
        })
    ).isRequired,
    onItemClick: PropTypes.func.isRequired
}

export default HabitSelection
