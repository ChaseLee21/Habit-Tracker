import { React, useState } from 'react'
import PropTypes from 'prop-types'

function NameSelection ({ onItemClick }) {
    const [name, setName] = useState('')
    const handleInputChange = (e) => {
        setName(e.target.value.toLowerCase())
    }
    return (
        <div className='p-2 bg-colorBgAlt rounded-md cursor-pointer'>
            <div className='flex flex-wrap'>
                <input className='rounded w-full px-1' id='whyInput' type='text' max='100' onInput={handleInputChange}></input>
            </div>
            <button className='bg-colorButtonBgAlt text-colorButtonTextAlt rounded w-fit p-1 my-2' onClick={() => onItemClick(name)}>Next</button>
        </div>
    )
}

NameSelection.propTypes = {
    onItemClick: PropTypes.func.isRequired
}

export default NameSelection
