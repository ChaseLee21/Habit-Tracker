import React from 'react'

function NewHabit () {
    const startingPoints = [
        {
            name: 'Exercise',
            icon: '🏋️‍♂️'
        },
        {
            name: 'Eat Healthy',
            icon: '🥗'
        },
        {
            name: 'Meditation',
            icon: '🧘‍♂️'
        },
        {
            name: 'Reading',
            icon: '📚'
        },
        {
            name: 'Writing',
            icon: '📝'
        },
        {
            name: 'Drawing',
            icon: '🎨'
        },
        {
            name: 'Coding',
            icon: '💻'
        },
        {
            name: 'Learning a new language',
            icon: '🌐'
        },
        {
            name: 'Playing an instrument',
            icon: '🎸'
        },
        {
            name: 'Create a new habit',
            icon: '🚀'
        }
    ]
    return (
        <section className="flex flex-col rounded-md m-2 bg-secondaryBg text-secondaryText p-2 shadow-xl">
            <h2 className='text-xl'>New Habit</h2>
            <p>To help accelerate the process of creating a new habit we gave you some starting points.</p>
            <ul>
                {startingPoints.map((point, index) => {
                    return (
                        <li key={index} className='m-2 p-2 bg-primaryBg text-primaryText rounded-md shadow-md'>
                            <span className='mx-2'>{point.icon}</span>
                            {point.name}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default NewHabit
