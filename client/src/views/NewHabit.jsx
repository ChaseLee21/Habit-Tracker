import { React, useState, useEffect } from 'react'
import HabitSelection from '../components/HabitSelection'
import DescriptionSelection from '../components/DescriptionSelection'
import SectionHeader from '../components/SectionHeader'
import WhySelection from '../components/WhySelection'
import GoalSelection from '../components/GoalSelection'
import FrequencySelection from '../components/FrequencySelection'
import RewardSelection from '../components/RewardSelection'
import HabitSummary from '../components/HabitSummary'

function NewHabit () {
    // Default Habits
    const defaultHabits = [
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

    // State Variables
    const [habit, setHabit] = useState(null)
    const [sectionHeader, setSectionHeader] = useState({
        title: 'Create a New Habit',
        subtext: 'To help accelerate the process of creating a new habit we gave you some starting points. You will make goals and define your habit soon, this is just a starting point to get you going!'
    })
    const [ShowHabitSelection, setShowHabitSelection] = useState(true)
    const [showDescriptionSelection, setShowDescriptionSelection] = useState(false)
    const [showWhySelection, setShowWhySelection] = useState(false)
    const [ShowGoalSelection, setShowGoalSelection] = useState(false)
    const [showFrequencySelection, setShowFrequencySelection] = useState(false)
    const [showRewardSelection, setShowRewardSelection] = useState(false)
    const [showHabitSummary, setShowHabitSummary] = useState(false)

    // Lifecycle Methods
    useEffect(() => {
        document.title = 'Create a New Habit - Habit Tracker'
        const localStorageHabit = JSON.parse(localStorage.getItem('newHabit'))
        if (localStorageHabit) {
            const contiueWithHabit = window.confirm(`You left off creating a new habit in progress. Do you want to continue with ${localStorageHabit.name}?`)
            if (contiueWithHabit) {
                setHabit(localStorageHabit)
                // TODO: when user confirms to continue, set the page to show the next step they were on
                ShowHabitSelection(false)
            } else {
                localStorage.removeItem('newHabit')
                ShowHabitSelection(true)
            }
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('newHabit', JSON.stringify(habit))
    }, [habit])

    // Event Handlers
    const setHabitSelection = (newHabit) => {
        setHabit(newHabit)
        setShowHabitSelection(false)
        setShowDescriptionSelection(true)
        setSectionHeader({
            title: newHabit.name,
            subtext: `You have taken the first step! Now let's define your habit. What will you do to ${newHabit.name}?`
        })
    }
    const setHabitDescription = (description) => {
        setHabit({ ...habit, description })
        setShowDescriptionSelection(false)
        setShowWhySelection(true)
        setSectionHeader({
            title: 'Why?',
            subtext: 'Why do you want to create this new habit?'
        })
    }
    const setHabitWhy = (why) => {
        setHabit({ ...habit, why })
        setShowWhySelection(false)
        setShowGoalSelection(true)
        setSectionHeader({
            title: 'Create a Goal',
            subtext: 'Remember when setting a new habit for the first time it is important to start small. A good rule of thumb when starting a new habit is to follow the 2 minute rule. Your goal should be so small that it takes less than 2 minutes to complete. In the future you will increase this goal.'
        })
    }
    const setHabitGoal = (goal) => {
        setHabit({ ...habit, goal })
        setShowGoalSelection(false)
        setShowFrequencySelection(true)
        setSectionHeader({
            title: 'How often will you do this habit?',
            subtext: ''
        })
    }
    const setHabitFrequency = (frequency) => {
        setHabit({ ...habit, frequency })
        setShowFrequencySelection(false)
        setShowRewardSelection(true)
        setSectionHeader({
            title: 'Reward',
            subtext: 'Optionally, you can set a reward for completing the habit a certain amount of times in a row.'
        })
    }
    const setHabitReward = (reward) => {
        setHabit({ ...habit, reward })
        setShowRewardSelection(false)
        setShowHabitSummary(true)
        setSectionHeader({
            title: 'Habit Summary',
            subtext: 'Review the following information and click save to create your new habit.'
        })
    }
    const saveHabit = () => {
        console.log('not implemented')
    }

    return (
        <section className="flex flex-col rounded-md m-2 bg-secondaryBg text-secondaryText p-2 shadow-xl">
            <SectionHeader title={sectionHeader.title} subtext={sectionHeader.subtext} />
            {ShowHabitSelection && <HabitSelection defaultHabits={defaultHabits} onItemClick={setHabitSelection} />}
            {showDescriptionSelection && <DescriptionSelection descriptions={habit.descriptionOptions} onItemClick={setHabitDescription} />}
            {showWhySelection && <WhySelection onItemClick={setHabitWhy} />}
            {ShowGoalSelection && <GoalSelection onItemClick={setHabitGoal} />}
            {showFrequencySelection && <FrequencySelection onItemClick={setHabitFrequency} />}
            {showRewardSelection && <RewardSelection onItemClick={setHabitReward} />}
            {showHabitSummary && <HabitSummary habit={habit} handleSaveHabit={saveHabit}/>}
        </section>
    )
}

export default NewHabit
