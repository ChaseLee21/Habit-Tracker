import { React, useState } from 'react'
import PropTypes from 'prop-types'

function RewardSelection ({ onItemClick }) {
    const [streakFrequency, setStreakFrequency] = useState(0)
    const [reward, setReward] = useState('')
    const handleRewardInputChange = (e) => {
        setReward(`After ${streakFrequency} consecutive times completing my habit I will reward myself with ${e.target.value}`)
    }
    const handleStreakInputChange = (e) => {
        setStreakFrequency(e.target.value)
    }
    const handleSubmit = () => {
        if (streakFrequency < 0) {
            alert('Please enter a number greater than 0')
            return
        }
        if (reward === '') {
            alert('Please fill in all fields or click skip if you do not want to set a reward.')
            return
        }
        onItemClick(reward)
    }

    return (
        <div className='flex flex-col'>
            <div className='flex flex-wrap'>
                <p className='text-lg mx-2'>After</p>
                <input className='rounded px-1 w-12' type='number' min={0} max={99} onInput={handleStreakInputChange}></input>
                <p className='text-lg mx-2'>consecutive time(s) completing my habit I will reward myself with</p>
            </div>
            <input className='rounded px-1 w-fit m-2' type='text' onInput={handleRewardInputChange}></input>
            <div className='flex'>
                <button className='bg-primaryBg text-primaryText rounded w-fit p-1 m-2' onClick={() => onItemClick('')}>Skip</button>
                <button className='bg-primaryBg text-primaryText rounded w-fit p-1 m-2' onClick={() => handleSubmit()}>Next</button>
            </div>
        </div>
    )
}

RewardSelection.propTypes = {
    onItemClick: PropTypes.func.isRequired
}

export default RewardSelection
