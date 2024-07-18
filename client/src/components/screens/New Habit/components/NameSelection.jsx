import { React, useState } from 'react'
import PropTypes from 'prop-types'
import SectionHeader from './SectionHeader'

function NameSelection ({ onItemClick }) {
    const { updateHabit, updateDescriptions, setShowHabitName, setShowHabitDescription } = useNewHabit()

    const handleInputChange = (e) => {
        setName(e.target.value.toLowerCase())
    }

    function handleNameSelection (name) {
        updateHabit(name)
        setShowHabitDescription(true)
        updateDescriptions(undefined)
        setShowHabitName(false)
    }

    return (
        <div className='p-2 bg-colorBgAlt rounded-md cursor-pointer'>
            <SectionHeader title='Create a New Habit' subtext='To help accelerate the process of creating a new habit we gave you some starting points. You will make goals and define your habit soon, this is just a starting point to get you going!' />
            <div className='flex flex-wrap'>
                <input className='rounded w-full px-1' id='whyInput' type='text' max='100' onInput={handleInputChange}></input>
            </div>
            <button className='bg-colorButtonBgAlt text-colorButtonTextAlt rounded w-fit p-1 my-2' onClick={() => handleNameSelection(name)}>Next</button>
        </div>
    )
}

NameSelection.propTypes = {
    onItemClick: PropTypes.func.isRequired
}

export default NameSelection
