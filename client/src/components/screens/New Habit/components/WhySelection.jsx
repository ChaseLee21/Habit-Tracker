import { React, useState, useEffect } from 'react'
import SectionHeader from './SectionHeader'
import { useNewHabit } from '../../../../contexts/NewHabitContext'

function WhySelection () {
    const { habit, updateHabit, updateShowGoalSelection, updateShowWhySelection, updateShowDescriptionSelection } = useNewHabit()
    const [why, setWhy] = useState('')

    useEffect(() => {
        if (habit.why) {
            setWhy(habit.why)
            document.getElementById('whyInput').value = habit.why
        }
    }, [])

    const handleInputChange = (e) => {
        setWhy(e.target.value)
    }

    function next (why) {
        updateHabit({why: why})
        updateShowGoalSelection(true)
        updateShowWhySelection(false)
    }

    function back () {
        updateShowWhySelection(false)
        updateShowDescriptionSelection(true)
    }

    return (
        <div className='p-2 bg-colorBgAlt rounded-md'>
            <SectionHeader title='Why?' subtext={`The why is important. It is the underlying motivation that will help you achieve your goals. Why do you want to fit ${habit.name.toLowerCase()} into your life?`} />
            <div className='flex my-2'>
                <label htmlFor='whyInput' className='min-w-fit mx-2'>Because</label>
                <input className='rounded w-full px-1' id='whyInput' type='text' max='100' onInput={handleInputChange}></input>
            </div>
            <button className='bg-colorButtonBgAlt text-colorButtonTextAlt hover:text-colorLinkHover rounded w-fit p-1 m-2' onClick={() => back()}>Back</button>
            {why && <button className='bg-colorButtonBgAlt text-colorButtonTextAlt hover:text-colorLinkHover rounded w-fit p-1 my-2' onClick={() => next(why)}>Next</button>}
            {!why && <button className='bg-gray-600 text-gray-50 rounded w-fit p-1 my-2' disabled>Next</button>}
        </div>
    )
}

export default WhySelection
