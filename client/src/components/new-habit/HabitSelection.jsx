import React from 'react'
import PropTypes from 'prop-types'

function HabitSelection ({ defaultHabits, onItemClick }) {
    return (
        <ul>
            {defaultHabits.map((point, index) => {
                return (
                    <li key={index} className='m-2 p-2 bg-primaryBg text-primaryText rounded-md shadow-md cursor-pointer' onClick={() => onItemClick(point)}>
                        <span className='mx-2'>{point.icon}</span>
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
            icon: PropTypes.string.isRequired
        })
    ).isRequired,
    onItemClick: PropTypes.func.isRequired
}

export default HabitSelection
