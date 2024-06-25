import React, { useState } from 'react'
import PropTypes from 'prop-types'

function DescriptionSelection ({ descriptions, onItemClick }) {
    const [descriptionInput, setDescriptionInput] = useState('')

    function handleInputChange (e) {
        setDescriptionInput(e.target.value)
    }

    return (
        <section>
            <div>
                {descriptions && descriptions.length > 0 &&
                <ul>
                    {descriptions.map((description, index) => {
                        return (
                            <li key={index} className='m-2 p-2 bg-primaryBg text-primaryText rounded-md shadow-md cursor-pointer' onClick={() => onItemClick(description)}>
                                {description}
                            </li>
                        )
                    })}
                </ul>}
            </div>
            <div>
                {!descriptions &&
                <div className='flex flex-col'>
                    <input className='rounded w-full px-1' id='descriptionInput' type='text' max='100' onChange={handleInputChange}></input>
                    <button type='button' className='bg-primaryBg text-primaryText rounded w-fit p-1 my-2' onClick={() => onItemClick(descriptionInput)}>Next</button>
                </div>
                }
            </div>
        </section>
    )
}

DescriptionSelection.propTypes = {
    descriptions: PropTypes.arrayOf(PropTypes.string),
    onItemClick: PropTypes.func.isRequired
}

export default DescriptionSelection
