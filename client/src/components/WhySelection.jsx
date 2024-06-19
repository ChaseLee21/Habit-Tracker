import { React, useState } from 'react'
import PropTypes from 'prop-types'

function WhySelection ({ onItemClick }) {
    const [why, setWhy] = useState('')
    const handleInputChange = (e) => {
        setWhy(e.target.value)
    }
    return (
        <div className='flex flex-col'>
            <input className='rounded w-full px-1' id='whyInput' type='text' max='100' onInput={handleInputChange}></input>
            <button className='bg-primaryBg text-primaryText rounded w-fit p-1 my-2' onClick={() => onItemClick(why)}>Next Question</button>
        </div>
    )
}

WhySelection.propTypes = {
    onItemClick: PropTypes.func.isRequired
}

export default WhySelection
