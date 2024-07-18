import { React, useState } from 'react'
import SectionHeader from './SectionHeader'
import { useNewHabit } from '../../../../contexts/NewHabitContext'

function NameSelection () {
    const { updateHabit, updateDescriptions, updateShowNameSelection, updateShowDescriptionSelection } = useNewHabit()
    const [name, setName] = useState('')

    const handleInputChange = (e) => {
        setName(e.target.value.toLowerCase())
    }

    function next () {
        console.log('name', name);
        updateHabit({name: name.charAt(0).toUpperCase() + name.slice(1)})
        updateShowDescriptionSelection(true)
        updateShowNameSelection(false)
    }

    return (
        <div className='p-2 bg-colorBgAlt rounded-md '>
            <SectionHeader title='Name Your Habit' subtext={`This should be short and simple such as: 'Exercise', 'Read', 'Drink Water', Etc.`} />
            <div className='flex flex-wrap my-2'>
                <input className='rounded w-full px-1' id='whyInput' type='text' max='100' onInput={handleInputChange}></input>
            </div>
            <button type='button' className='bg-colorButtonBgAlt text-colorButtonTextAlt rounded w-fit p-1 cursor-pointer' onClick={() => next()}>Next</button>
        </div>
    )
}

export default NameSelection
