import React from 'react'
import { useNewHabit } from '../../../../contexts/NewHabitContext'

function HabitSelection () {
    const { habit, updateHabit } = useNewHabit()

    const defaultHabits = [
        {
            name: 'Exercise',
            descriptionOptions: [
                'go for a run, jog, or walk',
                'do exercises at home',
                'do yoga',
                'go to the gym'
            ],
            emoji: '🏋️‍♂️'
        },
        {
            name: 'Eat Healthy',
            descriptionOptions: [
                'cook more meals at home',
                'follow a meal plan or diet',
                'eat more fruits and vegetables'
            ],
            emoji: '🥗'
        },
        {
            name: 'Meditation & Mindfulness',
            descriptionOptions: [
                'practice guided meditation',
                'practice deep breathing',
                'practice mindfulness',
                'practice gratitude',
                'practice mantra meditation'
            ],
            emoji: '🧘‍♂️'
        },
        {
            name: 'Reading',
            descriptionOptions: [
                'spend time reading',
                'spend time reading a book',
                'spend time reading an article',
                'spend time reading a blog post'
            ],
            emoji: '📚'
        },
        {
            name: 'Writing',
            descriptionOptions: [
                'spend time writing',
                'spend time journaling',
                'spend time creative writing',
                'spend time writing poetry',
                'spend time writing a blog post',
                'spend time writing a short story'
            ],
            emoji: '📝'
        },
        {
            name: 'Art & Drawing',
            descriptionOptions: [
                'spend time drawing',
                'spend time painting',
                'spend time sketching',
                'spend time doodling',
                'spend time coloring',
                'create digital art',
                'spend time on pottery',
                'practice misc art forms'
            ],
            emoji: '🎨'
        },
        {
            name: 'Coding',
            descriptionOptions: [
                'spend time learning a new coding skill',
                'work on a project',
                'code for fun',
                'code for work',
                'code for school'
            ],
            emoji: '💻'
        },
        {
            name: 'Learning a new language',
            descriptionOptions: [
                'practice speaking',
                'practice writing',
                'practice reading',
                'practice listening',
                'practice vocabulary',
                'practice grammar',
                'practice pronunciation',
                'practice using apps'
            ],
            emoji: '🌐'
        },
        {
            name: 'Playing an instrument',
            descriptionOptions: [
                'practice playing an instrument',
                'spend time learning music theory',
                'practice playing with others'
            ],
            emoji: '🎸'
        },
        {
            name: 'Create a habit of your own',
            descriptionOptions: [],
            emoji: '🚀'
        }
    ]

    function handleHabitSelection (name) {
        updateHabit( ...habit, name )
    }

    return (
        <ul>
            {defaultHabits.map((point, index) => {
                return (
                    <li key={index} className='m-2 p-2 bg-colorButtonBg text-colorButtonText rounded-md cursor-pointer hover:text-colorLinkHover' onClick={handleHabitSelection(point.name)}>
                        <span className='mx-2 '>{point.emoji}</span>
                        {point.name}
                    </li>
                )
            })}
        </ul>
    )
}

export default HabitSelection
