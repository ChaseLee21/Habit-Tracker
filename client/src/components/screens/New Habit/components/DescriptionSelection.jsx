import React, { useState } from 'react'
import SectionHeader from './SectionHeader'
import { useNewHabit } from '../../../../contexts/NewHabitContext'

function DescriptionSelection () {
    const { habit, descriptions, updateHabit, updateShowDescriptionSelection, updateShowWhySelection } = useNewHabit()
    const [descriptionInput, setDescriptionInput] = useState('')

    function handleInputChange (e) {
        setDescriptionInput(e.target.value)
    }

    function handleDescriptionSelection (description) {
        if (description) updateHabit({ description: description })
        else updateHabit({description: descriptionInput})
        updateShowWhySelection(true)
        updateShowDescriptionSelection(false)
    }

    return (
        <section>
            {descriptions && descriptions.length > 0 &&
            <div>
                <SectionHeader title='Describe Your Habit' subtext={`Perfect, You've choosen ${habit.name.toLowerCase()}! Define the habit a little more. What will you do?`} />
                <ul>
                    {descriptions.map((description, index) => {
                        return (
                            <li key={index} className='m-2 p-2 bg-colorButtonBg text-colorButtonText rounded-md cursor-pointer hover:text-colorLinkHover' onClick={() => handleDescriptionSelection(description)}>
                                I will {description}
                            </li>
                        )
                    })}
                </ul>
            </div>}
            <div>
                {!descriptions &&
                <div className='p-2 bg-colorBgAlt rounded-md'>
                    <SectionHeader title='Describe Your Habit' subtext={`Perfect, You've choosen ${habit.name.toLowerCase()}! Define the habit a little more. What will you do? Example: go for a run, read a book, cook dinner at home`} />
                    <div className='flex my-2'>
                        <label htmlFor='descriptionInput' className='min-w-fit mx-2'>I will </label>
                        <input className='rounded w-full px-1' id='descriptionInput' type='text' max='100' onChange={handleInputChange}></input>
                    </div>
                    <button type='button' className='bg-colorButtonBgAlt text-colorButtonTextAlt hover:text-colorLinkHover rounded w-fit p-1 my-2' onClick={() => handleDescriptionSelection(descriptionInput)}>Next</button>
                </div>
                }
            </div>
        </section>
    )
}

export default DescriptionSelection
