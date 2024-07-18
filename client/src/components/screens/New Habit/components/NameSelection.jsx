import { React, useState, useEffect } from 'react'
import SectionHeader from './SectionHeader'
import { useNewHabit } from '../../../../contexts/NewHabitContext'

function NameSelection () {
    const { habit, updateHabit, updateDescriptions, updateShowNameSelection, updateShowDescriptionSelection, updateShowHabitSelection } = useNewHabit()
    const [name, setName] = useState('')

    useEffect(() => {
        if (habit.name && habit.name !== 'Create a habit of your own') {
            setName(habit.name)
            document.getElementById('whyInput').value = habit.name
        }
    }, [])

    const handleInputChange = (e) => {
        setName(e.target.value.toLowerCase())
    }

    function next () {
        console.log('name', name);
        updateDescriptions(null)
        updateHabit({name: name.charAt(0).toUpperCase() + name.slice(1)})
        updateShowDescriptionSelection(true)
        updateShowNameSelection(false)
    }

    function back () {
        updateShowHabitSelection(true)
        updateShowNameSelection(false)
    }
    
    return (
        <div className='p-2 bg-colorBgAlt rounded-md'>
            <SectionHeader title='Name Your Habit' subtext={`This should be short and simple such as: 'Exercise', 'Read', 'Drink Water', Etc.`} />
            <div className='flex flex-wrap my-2'>
                <input className='rounded w-full px-1' id='whyInput' type='text' max='100' onInput={handleInputChange}></input>
            </div>
            <button className='bg-colorButtonBgAlt text-colorButtonTextAlt hover:text-colorLinkHover rounded w-fit p-1 m-2' onClick={() => back()}>Back</button>
            {name && <button type='button' className='bg-colorButtonBgAlt text-colorButtonTextAlt rounded w-fit p-1 cursor-pointer my-2' onClick={() => next()}>Next</button>}
            {!name && <button className='bg-gray-600 text-gray-50 rounded w-fit p-1 my-2' disabled>Next</button>}
        </div>
    )
}

export default NameSelection
