import { React, useState, useEffect } from 'react'
import SectionHeader from './SectionHeader'
import { useNewHabit } from '../../../../contexts/NewHabitContext'

function FrequencySelection () {
    const [frequency, setFrequency] = useState(1)
    const { habit, updateHabit, updateShowFrequencySelection, updateShowEmojiSelection, updateShowGoalSelection } = useNewHabit()

    useEffect(() => {
        if (habit.frequency) {
            setFrequency(habit.frequency)
            document.getElementById('frequencySelect').value = habit.frequency
        }
    }, [])

    const handleInputChange = (e) => {
        setFrequency(e.target.value)
    }

    function next () {
        updateHabit({frequency: frequency})
        updateShowEmojiSelection(true)
        updateShowFrequencySelection(false)
    }

    function back () {
        updateShowGoalSelection(true)
        updateShowFrequencySelection(false)
    }

    return (
        <div className='p-2 bg-colorBgAlt rounded-md cursor-pointer'>
            <SectionHeader title='How Often Will You Do This Habit?' subtext='Choose how many times a week you will do this habit.' />
            <select className='rounded w-full px-1' id='frequencySelect' onChange={handleInputChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
            </select>
            <button className='bg-colorButtonBgAlt text-colorButtonTextAlt hover:text-colorLinkHover rounded w-fit p-1 m-2' onClick={() => back()}>Back</button>
            <button className='bg-colorButtonBgAlt text-colorButtonTextAlt rounded w-fit p-1 my-2' onClick={() => next()}>Next</button>
        </div>
    )
}

export default FrequencySelection
