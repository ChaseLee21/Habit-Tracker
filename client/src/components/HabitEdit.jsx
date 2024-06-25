import { React, useState } from 'react'
import PropTypes from 'prop-types'
import { getEmojis } from '../util/emojis'

function HabitEdit (props) {
    const [habit, setHabit] = useState(props.habit)
    const [showEmojis, setShowEmojis] = useState('')
    const emojis = getEmojis()

    const updateName = (e) => {
        setHabit({ ...habit, name: e.target.value })
    }

    const updateDescription = (e) => {
        setHabit({ ...habit, description: e.target.value })
    }

    const updateWhy = (e) => {
        setHabit({ ...habit, why: e.target.value })
    }

    const updateGoal = (e) => {
        setHabit({ ...habit, goal: e.target.value })
    }

    const updateFrequency = (e) => {
        setHabit({ ...habit, frequency: e.target.value })
    }

    const updateReward = (e) => {
        setHabit({ ...habit, reward: e.target.value })
    }

    const updateEmoji = (emoji) => {
        setShowEmojis(false)
        setHabit({ ...habit, emoji })
    }

    return (
        <section>
            <form className='flex flex-col text-black'>
                <label htmlFor='habitName' className="text-secondaryText">Name of habit:</label>
                <input id='habitName' type='text' defaultValue={habit.name} className="p-1 m-1 rounded-md" onChange={updateName}></input>
                <label htmlFor='habitDescription' className="text-secondaryText">This habit is about:</label>
                <input id='habitDescription' type='text' defaultValue={habit.description} className="p-1 m-1 rounded-md" onChange={updateDescription}></input>
                <label htmlFor='habitWhy' className="text-secondaryText">I want to make this habit apart of my life so:</label>
                <input id='habitWhy' type='text' defaultValue={habit.why} className="p-1 m-1 rounded-md" onChange={updateWhy}></input>
                <label htmlFor='habitGoal' className="text-secondaryText">I finish my habit for the day when:</label>
                <input id='habitGoal' type='text' defaultValue={habit.goal} className="p-1 m-1 rounded-md" onChange={updateGoal}></input>
                <label htmlFor='habitFrequency' className="text-secondaryText">Times per week habit should be completed:</label>
                <input id='habitFrequency' type='text' defaultValue={habit.frequency} className="p-1 m-1 rounded-md" onChange={updateFrequency}></input>
                <label htmlFor='habitReward' className="text-secondaryText">Rewards:</label>
                <input id='habitReward' type='text' defaultValue={habit.reward} className="p-1 m-1 rounded-md" onChange={updateReward}></input>
                <button className='bg-primaryBg text-primaryText w-fit p-2 rounded-md m-1 hover:cursor-pointer' type='button' onClick={() => setShowEmojis(!showEmojis)}>Change Emoji: {habit.emoji}</button>
                {showEmojis && <div className='flex flex-wrap'>
                    {emojis.map((emoji, index) => (
                        <button key={index} type='button' className='text-4xl m-1' onClick={() => updateEmoji(emoji)}>
                            {emoji}
                        </button>
                    ))}
                </div>}
                <div className='flex justify-between'>
                    <div>
                        <button type='button' onClick={() => props.onSubmit(habit)} className='bg-primaryBg text-primaryText w-fit p-2 rounded-md m-1'>Save</button>
                        <button type='button' onClick={() => props.onCancel()} className='bg-primaryBg text-primaryText w-fit p-2 rounded-md m-1'>Cancel</button>
                    </div>
                    <button type='button' onClick={() => props.onDelete(habit)} className='bg-red-600 text-primaryText w-fit p-2 rounded-md m-1'>Delete</button>
                </div>
            </form>
        </section>
    )
}

HabitEdit.propTypes = {
    habit: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        why: PropTypes.string.isRequired,
        goal: PropTypes.string.isRequired,
        frequency: PropTypes.number.isRequired,
        reward: PropTypes.string,
        emoji: PropTypes.string
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default HabitEdit
