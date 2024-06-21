import { React, useState } from 'react'
import PropTypes from 'prop-types'

function HabitEdit (props) {
    const [habit] = useState(props.habit)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Submit habit edit')
    }

    const handleDelete = (e) => {
        e.preventDefault()
        console.log('Delete habit')
    }

    return (
        <section>
            <form className='flex flex-col text-black'>
                <label htmlFor='habitName' className="text-secondaryText">Habit Name:</label>
                <input id='habitName' type='text' defaultValue={habit.name} className="p-1 m-1 rounded-md"></input>
                <label htmlFor='habitDescription' className="text-secondaryText">Habit Description:</label>
                <input id='habitDescription' type='text' defaultValue={habit.description} className="p-1 m-1 rounded-md"></input>
                <label htmlFor='habitWhy' className="text-secondaryText">Habit Why:</label>
                <input id='habitWhy' type='text' defaultValue={habit.why} className="p-1 m-1 rounded-md"></input>
                <label htmlFor='habitGoal' className="text-secondaryText">Habit Goal:</label>
                <input id='habitGoal' type='text' defaultValue={habit.goal} className="p-1 m-1 rounded-md"></input>
                <label htmlFor='habitFrequency' className="text-secondaryText">Habit Frequency:</label>
                <input id='habitFrequency' type='text' defaultValue={habit.frequency} className="p-1 m-1 rounded-md"></input>
                <label htmlFor='habitReward' className="text-secondaryText">Habit Rewards:</label>
                <input id='habitReward' type='text' defaultValue={habit.reward} className="p-1 m-1 rounded-md"></input>
                <div className='flex'>
                    <button type='submit' onClick={handleSubmit} className='bg-primaryBg text-primaryText rounded px-2 w-fit hover:underline mx-2'>Save</button>
                    <button type='button' onClick={() => props.onCancel()} className='bg-primaryBg text-primaryText rounded px-2 w-fit hover:underline mx-2'>Cancel</button>
                    <button type='button' onClick={handleDelete} className='bg-red-600 text-primaryText rounded px-2 w-fit hover:underline mx-2'>Delete</button>
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
        frequency: PropTypes.string.isRequired,
        reward: PropTypes.string
    }).isRequired,
    onCancel: PropTypes.func.isRequired
}

export default HabitEdit
