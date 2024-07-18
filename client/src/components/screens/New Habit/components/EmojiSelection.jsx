import { React, useEffect, useState } from 'react'
import 'emoji-picker-element'
import SectionHeader from './SectionHeader'
import { useNewHabit } from '../../../../contexts/NewHabitContext'

function EmojiSelection () {
    const { updateHabit, updateShowEmojiSelection, updateShowHabitSummary } = useNewHabit()
    const [emoji, setEmoji] = useState('')

    useEffect(() => {
        const emojiInput = document.getElementById('emojiInput')
        const emojiPicker = document.querySelector('emoji-picker')
        emojiPicker.addEventListener('emoji-click', (event) => {
            setEmoji(event.detail.unicode)
        })
    }, [])

    function next () {
        updateHabit({emoji: emoji})
        updateShowHabitSummary(true)
        updateShowEmojiSelection(false)
    }

    return (
        <div className='flex flex-col bg-colorBgAlt rounded w-fit p-2 my-2'>
        <div className='mb-2'>
            <SectionHeader title='Select an Emoji' subtext='This emoji will represent your habit through out different features of Habit Tracker!' />
        </div>
        <div className='mb-2'>
            <emoji-picker></emoji-picker>
        </div>
            <div className='flex'>
                <input className='rounded px-1 w-10 h-10 m-2 text-2xl text-black' id='emojiInput' type='text' value={emoji} readOnly></input>
                {emoji && <button className='bg-colorButtonBgAlt text-colorButtonTextAlt hover:text-colorLinkHover rounded w-fit p-1 my-2' onClick={() => next()}>Next</button>}
                {!emoji && <button className='bg-gray-600 text-gray-50 rounded w-fit p-1 my-2' disabled>Next</button>}
            </div>
        </div>
    )
}

export default EmojiSelection
