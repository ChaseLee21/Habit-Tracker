import React from 'react'
import PropTypes from 'prop-types'

function DescriptionSelection ({ descriptions, onItemClick }) {
    return (
        <ul>
            {descriptions.map((description, index) => {
                return (
                    <li key={index} className='m-2 p-2 bg-primaryBg text-primaryText rounded-md shadow-md cursor-pointer' onClick={() => onItemClick(description)}>
                        {description}
                    </li>
                )
            })}
        </ul>
    )
}

DescriptionSelection.propTypes = {
    descriptions: PropTypes.arrayOf(PropTypes.string),
    onItemClick: PropTypes.func.isRequired
}

export default DescriptionSelection
