import { React, useState } from 'react'
import SectionHeader from './SectionHeader'
import { useNewHabit } from '../../../../contexts/NewHabitContext'

function GoalSelection () {
    const { updateHabit, updateShowGoalSelection, updateShowFrequencySelection } = useNewHabit()
    const [goal, setGoal] = useState('')

    const handleInputChange = (e) => {
        setGoal(e.target.value.toLowerCase())
    }

    function next () {
        updateHabit({goal: goal})
        updateShowFrequencySelection(true)
        updateShowGoalSelection(false)
    }

    return (
        <div className='p-2 bg-colorBgAlt rounded-md'>
            <SectionHeader title='Set Your First Goal!' subtext={`Make it achievable; the best first goal is one that you can do today. It should clearly define when you have completed your habit for the day. Example: I cook 1 healthy meal, I read for 20 minutes, I go run for 20 minutes, Etc.`} />
            <div className='flex my-2'>
                <label htmlFor='goalInput' className='min-w-fit mx-2'>I finish my habit for the day when</label>
                <input className='rounded w-full px-1' id='goalInput' type='text' max='100' onInput={handleInputChange}></input>
            </div>
            {goal && <button className='bg-colorButtonBgAlt text-colorButtonTextAlt hover:text-colorLinkHover rounded w-fit p-1 my-2' onClick={() => next()}>Next</button>}
            {!goal && <button className='bg-gray-600 text-gray-50 rounded w-fit p-1 my-2' disabled>Next</button>}
        </div>
    )
}

export default GoalSelection
