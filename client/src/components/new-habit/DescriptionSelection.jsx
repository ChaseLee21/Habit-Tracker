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
                            <li key={index} className='m-2 p-2 bg-colorButtonBg text-colorButtonText rounded-md cursor-pointer hover:text-colorLinkHover' onClick={() => onItemClick(description)}>
                                I will {description}
                            </li>
                        )
                    })}
                </ul>}
            </div>
            <div>
                {!descriptions &&
                <div className='p-2 bg-colorBgAlt rounded-md cursor-pointer'>
                    <div className='flex'>
                        <label htmlFor='descriptionInput' className='min-w-fit mx-2'>I will </label>
                        <input className='rounded w-full px-1' id='descriptionInput' type='text' max='100' onChange={handleInputChange}></input>
                    </div>
                    <button type='button' className='bg-colorButtonBgAlt text-colorButtonTextAlt hover:text-colorLinkHover rounded w-fit p-1 my-2' onClick={() => onItemClick(descriptionInput)}>Next</button>
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
