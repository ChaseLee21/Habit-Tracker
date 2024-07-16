import React, { useState } from 'react'
import PropTypes from 'prop-types'

function UpdateGoal (props) {
    const [habit, setHabit] = useState(props.habit)

    const updateDescription = (e) => {
        setHabit({ ...habit, description: e.target.value })
    }

    const updateWhy = (e) => {
        setHabit({ ...habit, why: e.target.value })
    }

    const updateGoal = (e) => {
        setHabit({ ...habit, goal: e.target.value })
    }


    return (
        <div className='bg-colorBgAlt m-2 p-2 rounded h-fit'>
            <h2 className="text-2xl p-1 mx-2">{habit.name}</h2>
            <form className='flex flex-col'>
                <label htmlFor='habitDescription' className="p-1 mx-2">I will</label>
                <input id='habitDescription' type='text' defaultValue={habit.description} className="p-1 m-1 rounded-md" onChange={updateDescription}></input>
                <label htmlFor='habitWhy' className="p-1 mx-2">Because</label>
                <input id='habitWhy' type='text' defaultValue={habit.why} className="p-1 m-1 rounded-md" onChange={updateWhy}></input>
                <label htmlFor='habitGoal' className="p-1 mx-2">I finish my habit for the day when</label>
                <input id='habitGoal' type='text' defaultValue={habit.goal} className="p-1 m-1 rounded-md" onChange={updateGoal}></input>
            </form>
            <div className='flex justify-between'>
                <div>
                    <button type='button' onClick={() => props.onConfirm(habit)} className='bg-colorButtonBgAlt text-colorButtonTextAlt w-fit p-2 rounded-md m-1'>Save</button>
                    <button type='button' onClick={() => props.onCancel()} className='bg-colorButtonBgAlt text-colorButtonTextAlt w-fit p-2 rounded-md m-1'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

UpdateGoal.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
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
}

export default UpdateGoal
