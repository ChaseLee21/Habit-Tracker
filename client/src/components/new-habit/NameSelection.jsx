import { React, useState } from 'react'
import PropTypes from 'prop-types'

function NameSelection ({ onItemClick }) {
    const [name, setName] = useState('')
    const handleInputChange = (e) => {
        setName(e.target.value.toLowerCase())
    }
    return (
        <div className='flex flex-col text-lg'>
            <div className='flex flex-wrap'>
                <input className='rounded px-1 w-auto text-black' id='whyInput' type='text' max='100' onInput={handleInputChange}></input>
            </div>
            <button className='bg-primaryBg text-primaryText rounded w-fit p-1 my-2' onClick={() => onItemClick(name)}>Next</button>
        </div>
    )
}

NameSelection.propTypes = {
    onItemClick: PropTypes.func.isRequired
}

export default NameSelection
