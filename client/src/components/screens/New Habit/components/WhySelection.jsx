import { React, useState } from 'react'
import PropTypes from 'prop-types'

function WhySelection ({ onItemClick }) {
    const [why, setWhy] = useState('')
    const handleInputChange = (e) => {
        setWhy(e.target.value)
    }
    return (
        <div className='p-2 bg-colorBgAlt rounded-md cursor-pointer '>
            <input className='rounded w-full px-1' id='whyInput' type='text' max='100' onInput={handleInputChange}></input>
            <button className='bg-colorButtonBgAlt text-colorButtonTextAlt hover:text-colorLinkHover rounded w-fit p-1 my-2' onClick={() => onItemClick(why)}>Next</button>
        </div>
    )
}

WhySelection.propTypes = {
    onItemClick: PropTypes.func.isRequired
}

export default WhySelection
