import { React, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getEmojis } from '../../util/emojis'
import 'emoji-picker-element'

function EmojiSelection ({ onItemClick }) {
    const [emoji, setEmoji] = useState('')
    const emojis = getEmojis()

    useEffect(() => {
        const emojiInput = document.getElementById('emojiInput')
        const emojiPicker = document.querySelector('emoji-picker')
        emojiPicker.addEventListener('emoji-click', (event) => {
            setEmoji(event.detail.unicode)
        })
    }, [])

    return (
        <div className='my-2'>
            <emoji-picker></emoji-picker>
            <div className='flex flex-wrap bg-colorBgAlt rounded w-fit px-2 my-2'>
                <input className='rounded px-1 w-10 h-10 m-2 text-2xl text-black' id='emojiInput' type='text' value={emoji} readOnly></input>
                <button className='bg-colorButtonBgAlt text-colorButtonTextAlt hover:text-colorLinkHover rounded w-fit p-1 my-2' onClick={() => onItemClick(emoji)}>Next</button>
            </div>
        </div>
    )
}

EmojiSelection.propTypes = {
    onItemClick: PropTypes.func.isRequired
}

export default EmojiSelection
