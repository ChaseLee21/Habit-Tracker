import { React, useState } from 'react'
import PropTypes from 'prop-types'
import { getEmojis } from '../../util/emojis'

function EmojiSelection ({ onItemClick }) {
    const [emoji, setEmoji] = useState('')
    const emojis = getEmojis()

    // Function to handle emoji selection
    const selectEmoji = (selectedEmoji) => {
        setEmoji(selectedEmoji)
    }

    return (
        <div className='flex flex-col text-lg'>
            <div className='flex flex-wrap'>
                <input className='rounded px-1 w-8 h-auto m-2 text-black' id='emojiInput' type='text' value={emoji} readOnly></input>
                <button className='bg-primaryBg text-primaryText rounded w-fit p-1 my-2' onClick={() => onItemClick(emoji)}>Next</button>
            </div>
            <div className='flex flex-wrap'>
                {emojis.map((emoji, index) => (
                    <button key={index} className='emoji-btn text-2xl mx-1' onClick={() => selectEmoji(emoji)}>
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    )
}

EmojiSelection.propTypes = {
    onItemClick: PropTypes.func.isRequired
}

export default EmojiSelection
