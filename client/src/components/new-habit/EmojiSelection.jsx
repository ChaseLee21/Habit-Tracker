import { React, useState } from 'react'
import PropTypes from 'prop-types'

function EmojiSelection ({ onItemClick }) {
    const [emoji, setEmoji] = useState('')
    const handleInputChange = (e) => {
        setEmoji(e.target.value.toLowerCase())
    }
    return (
        <div className='flex flex-col text-lg'>
            <div className='flex flex-wrap'>
                <input className='rounded px-1 w-auto text-black' id='emojiInput' type='text' max='100' onInput={handleInputChange}></input>
            </div>
            <button className='bg-primaryBg text-primaryText rounded w-fit p-1 my-2' onClick={() => onItemClick(emoji)}>Next</button>
        </div>
    )
}

EmojiSelection.propTypes = {
    onItemClick: PropTypes.func.isRequired
}

export default EmojiSelection
