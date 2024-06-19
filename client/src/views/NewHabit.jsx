import React from 'react'
import StartingPointList from '../components/StartingPointList'

function NewHabit () {
    const startingPoints = [
        {
            name: 'Exercise',
            descriptionOptions: [
                'Go for a run, jog, or walk',
                'Do some exercises at home',
                'Do some yoga',
                'Go to the gym'
            ],
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

    const handleItemClick = (habit) => {
        console.log(habit)
    }

    return (
        <section className="flex flex-col rounded-md m-2 bg-secondaryBg text-secondaryText p-2 shadow-xl">
            <h2 className='text-xl'>New Habit</h2>
            <p>To help accelerate the process of creating a new habit we gave you some starting points.</p>
            <StartingPointList startingPoints={startingPoints} onItemClick={handleItemClick} />
        </section>
    )
}

export default NewHabit
