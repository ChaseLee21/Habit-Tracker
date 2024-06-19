import React from 'react'
import PropTypes from 'prop-types'

function StartingPointList ({ startingPoints, onItemClick }) {
    return (
        <ul>
            {startingPoints.map((point, index) => {
                return (
                    <li key={index} className='m-2 p-2 bg-primaryBg text-primaryText rounded-md shadow-md' onClick={() => onItemClick(point)}>
                        <span className='mx-2'>{point.icon}</span>
                        {point.name}
                    </li>
                )
            })}
        </ul>
    )
}

StartingPointList.propTypes = {
    startingPoints: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired
        })
    ).isRequired,
    onItemClick: PropTypes.func.isRequired
}

export default StartingPointList
