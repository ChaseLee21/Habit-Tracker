import { React } from 'react'
import SectionHeader from './SectionHeader'
import { useNewHabit } from '../../../../contexts/NewHabitContext'
import { useUser } from '../../../../contexts/UserContext'
import { postHabit } from '../../../../util/axios'

function HabitSummary () {
    const { habit, updateHabit, updateShowEmojiSelection, updateShowHabitSummary } = useNewHabit()
    const { userData } = useUser()

    async function save () {
        console.log(habit);
        console.log('user', userData)
        await updateHabit({ user: userData._id})
        const response = await postHabit(userData._id, habit)
        if (response) window.location.href = '/'
    }

    function back () {
        updateShowEmojiSelection(true)
        updateShowHabitSummary(false)
    }

    return (
        <div className='p-2 bg-colorBgAlt rounded-md '>
            <SectionHeader title='Habit Summary' subtext={`Please review your habit and click 'Save' if everything looks good!`} />
            <div className='my-2'>
                <div className='flex justify-between'>
                    <h3 className='text-xl'>{habit.emoji} {habit.name}</h3>
                </div>
                <p>I will {habit.description}</p>
                <p>Because {habit.why}</p>
                <p>I finish my habit for the day when {habit.goal}</p>
                {habit.frequency === 1 && <p>I will do this habit {habit.frequency} time a week</p>}
                {habit.frequency > 1 && <p>I will do this habit {habit.frequency} times a week</p>}
            </div>
            <button className='bg-colorButtonBgAlt text-colorButtonTextAlt hover:text-colorLinkHover rounded w-fit p-1 m-2' onClick={() => back()}>Back</button>
            <button className='bg-colorButtonBgAlt text-colorButtonTextAlt hover:text-colorLinkHover rounded w-fit p-1 my-2' onClick={() => save()}>Save</button>
        </div>
    )
}

export default HabitSummary
