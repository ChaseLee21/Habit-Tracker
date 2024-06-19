import { React, useState, useEffect } from 'react'
import StartingPointList from '../components/StartingPointList'
import DescriptionSelection from '../components/DescriptionSelection'
import SectionHeader from '../components/SectionHeader'
import WhySelection from '../components/WhySelection'

function NewHabit () {
    const [habit, setHabit] = useState(null)
    const [sectionHeader, setSectionHeader] = useState({
        title: 'Create a New Habit',
        subtext: 'To help accelerate the process of creating a new habit we gave you some starting points. You will make goals and define your habit soon, this is just a starting point to get you going!'
    })

    // useEffects
    // Check if there is a new habit in progress in local storage
    useEffect(() => {
        const localStorageHabit = JSON.parse(localStorage.getItem('newHabit'))
        if (localStorageHabit) {
            const contiueWithHabit = window.confirm(`You left off creating a new habit in progress. Do you want to continue with ${localStorageHabit.name}?`)
            if (contiueWithHabit) {
                setHabit(localStorageHabit)
                // TODO: when user confirms to continue, set the page to show the next step they were on
                setShowStartingPointList(false)
            } else {
                localStorage.removeItem('newHabit')
                setShowStartingPointList(true)
            }
        }
    }, [])
    // Save habit to local storage
    useEffect(() => {
        console.log(habit)
        localStorage.setItem('newHabit', JSON.stringify(habit))
    }, [habit])

    // Starting Points
    const [showStartingPointList, setShowStartingPointList] = useState(true)
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
            descriptionOptions: [
                'Cook more meals at home',
                'Follow a meal plan or diet',
                'Eat more fruits and vegetables'
            ],
            icon: '🥗'
        },
        {
            name: 'Meditation & Mindfulness',
            descriptionOptions: [
                'Practice guided meditation',
                'Practice deep breathing',
                'Practice mindfulness',
                'Practice gratitude',
                'Practice mantra meditation'
            ],
            icon: '🧘‍♂️'
        },
        {
            name: 'Reading',
            descriptionOptions: [
                'Read a book',
                'Read an article',
                'Read a blog post',
                'General reading time'
            ],
            icon: '📚'
        },
        {
            name: 'Writing',
            descriptionOptions: [
                'Journaling',
                'Creative writing',
                'General writing time',
                'Write poetry',
                'Write a blog post',
                'Write a short story'
            ],
            icon: '📝'
        },
        {
            name: 'Art & Drawing',
            descriptionOptions: [
                'Draw',
                'Paint',
                'Sketch',
                'Doodle',
                'Color',
                'Create digital art',
                'Pottery',
                'Other art forms'
            ],
            icon: '🎨'
        },
        {
            name: 'Coding',
            descriptionOptions: [
                'Learn to code',
                'Work on a project',
                'Practice coding',
                'Code for fun',
                'Code for work',
                'Code for school'
            ],
            icon: '💻'
        },
        {
            name: 'Learning a new language',
            descriptionOptions: [
                'Practice speaking',
                'Practice writing',
                'Practice reading',
                'Practice listening',
                'Practice vocabulary',
                'Practice grammar',
                'Practice pronunciation',
                'Practice via apps'
            ],
            icon: '🌐'
        },
        {
            name: 'Playing an instrument',
            descriptionOptions: [
                'Practice playing an instrument',
                'Learn a new song',
                'Learn a new chord',
                'Learn a new scale',
                'Learn a new technique',
                'Learn music theory',
                'Learn to read music',
                'Learn to play with others'
            ],
            icon: '🎸'
        },
        {
            name: 'Create a new habit',
            descriptionOptions: [],
            icon: '🚀'
        }
    ]
    const handleStartingPointSelection = (newHabit) => {
        setHabit(newHabit)
        setShowStartingPointList(false)
        setShowDescriptionSelection(true)
        setSectionHeader({
            title: newHabit.name,
            subtext: `You have taken the first step! Now let's define your habit. What will you do to ${newHabit.name}?`
        })
    }

    // Set Habit Description
    const setHabitDescription = (description) => {
        setHabit({ ...habit, description })
        setShowDescriptionSelection(false)
        setShowWhySelection(true)
        setSectionHeader({
            title: 'Why?',
            subtext: 'Why do you want to create this new habit?'
        })
    }
    const [showDescriptionSelection, setShowDescriptionSelection] = useState(false)

    // Set Habit Why
    const setHabitWhy = (why) => {
        setHabit({ ...habit, why })
    }
    const [showWhySelection, setShowWhySelection] = useState(false)

    // Set Habit Goal

    // Set Habit Frequency

    // Set Habit Reward

    return (
        <section className="flex flex-col rounded-md m-2 bg-secondaryBg text-secondaryText p-2 shadow-xl">
            <SectionHeader title={sectionHeader.title} subtext={sectionHeader.subtext} />
            {showStartingPointList && <StartingPointList startingPoints={startingPoints} onItemClick={handleStartingPointSelection} />}
            {showDescriptionSelection && <DescriptionSelection descriptions={habit.descriptionOptions} onItemClick={setHabitDescription} />}
            {showWhySelection && <WhySelection onItemClick={setHabitWhy} />}
        </section>
    )
}

export default NewHabit
