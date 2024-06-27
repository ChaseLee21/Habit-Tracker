import { React, useState, useEffect } from 'react'
import { postHabit } from '../util/axios'
import PropTypes from 'prop-types'
import HabitSelection from '../components/new-habit/HabitSelection'
import NameSelection from '../components/new-habit/NameSelection'
import DescriptionSelection from '../components/new-habit/DescriptionSelection'
import SectionHeader from '../components/SectionHeader'
import WhySelection from '../components/new-habit/WhySelection'
import GoalSelection from '../components/new-habit/GoalSelection'
import FrequencySelection from '../components/new-habit/FrequencySelection'
import RewardSelection from '../components/new-habit/RewardSelection'
import EmojiSelection from '../components/new-habit/EmojiSelection'
import HabitSummary from '../components/new-habit/HabitSummary'

function NewHabit (props) {
    // Variables
    const userId = props.user.user.id || ''
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

    // State Variables
    const [habit, setHabit] = useState(null)
    const [sectionHeader, setSectionHeader] = useState({
        title: 'Create a New Habit',
        subtext: 'To help accelerate the process of creating a new habit we gave you some starting points. You will make goals and define your habit soon, this is just a starting point to get you going!'
    })
    const [ShowHabitSelection, setShowHabitSelection] = useState(true)
    const [showNameSelection, setShowNameSelection] = useState(false)
    const [showDescriptionSelection, setShowDescriptionSelection] = useState(false)
    const [showWhySelection, setShowWhySelection] = useState(false)
    const [ShowGoalSelection, setShowGoalSelection] = useState(false)
    const [showFrequencySelection, setShowFrequencySelection] = useState(false)
    const [showRewardSelection, setShowRewardSelection] = useState(false)
    const [showEmojiSelection, setShowEmojiSelection] = useState(false)
    const [showHabitSummary, setShowHabitSummary] = useState(false)

    // Lifecycle Methods
    useEffect(() => {
        document.title = 'Create Habit - Habit Tracker'
    }, [])

    // Event Handlers
    const setHabitSelection = (newHabit) => {
        setShowHabitSelection(false)
        if (newHabit.name === 'Create a habit of your own') {
            setShowNameSelection(true)
            setSectionHeader({
                title: 'Name Your Habit',
                subtext: 'Make it simple and easy to remember, like "Exercise" or "Read". What will you call your new habit?'
            })
        } else {
            setShowDescriptionSelection(true)
            setHabit(newHabit)
            setSectionHeader({
                title: newHabit.name,
                subtext: `Perfect, You've choosen ${newHabit.name.toLowerCase()}! Define the habit a little more. What will you do?`
            })
        }
    }
    const setHabitName = (name) => {
        setHabit({ ...habit, name })
        setShowNameSelection(false)
        setShowDescriptionSelection(true)
        setSectionHeader({
            title: name,
            subtext: `Perfect, You've choosen ${name.toLowerCase()}! Define the habit a little more. What will you do?`
        })
    }
    const setHabitDescription = (description) => {
        setHabit({ ...habit, description })
        setShowDescriptionSelection(false)
        setShowWhySelection(true)
        setSectionHeader({
            title: 'Why',
            subtext: `I will ${description} because... `
        })
    }
    const setHabitWhy = (why) => {
        setHabit({ ...habit, why })
        setShowWhySelection(false)
        setShowGoalSelection(true)
        setSectionHeader({
            title: 'Create a Goal',
            subtext: 'I finish my habit for the day when'
        })
    }
    const setHabitGoal = (goal) => {
        setHabit({ ...habit, goal })
        setShowGoalSelection(false)
        setShowFrequencySelection(true)
        setSectionHeader({
            title: 'How many times per week will you do this habit?',
            subtext: ''
        })
    }
    const setHabitFrequency = (frequency) => {
        frequency = parseInt(frequency)
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
        setShowEmojiSelection(true)
        setSectionHeader({
            title: 'Emoji',
            subtext: 'Choose an emoji to represent your new habit!'
        })
    }
    const setHabitEmoji = (emoji) => {
        setHabit({ ...habit, emoji })
        setShowEmojiSelection(false)
        setShowHabitSummary(true)
        setSectionHeader({
            title: 'Habit Summary',
            subtext: 'Review the following information and click save to create your new habit.'
        })
    }
    const saveHabit = async () => {
        const newHabit = await postHabit(userId, { ...habit, user: userId })
        if (newHabit !== null) {
            window.location.href = '/'
        }
    }

    return (
        <section className="flex flex-col rounded-md m-2 bg-colorBg text-colorText p-2">
            <SectionHeader title={sectionHeader.title} subtext={sectionHeader.subtext} />
            {ShowHabitSelection && <HabitSelection defaultHabits={defaultHabits} onItemClick={setHabitSelection} />}
            {showNameSelection && <NameSelection onItemClick={setHabitName} />}
            {showDescriptionSelection && <DescriptionSelection descriptions={habit.descriptionOptions} onItemClick={setHabitDescription} />}
            {showWhySelection && <WhySelection onItemClick={setHabitWhy} />}
            {ShowGoalSelection && <GoalSelection onItemClick={setHabitGoal} />}
            {showFrequencySelection && <FrequencySelection onItemClick={setHabitFrequency} />}
            {showRewardSelection && <RewardSelection onItemClick={setHabitReward} />}
            {showEmojiSelection && <EmojiSelection onItemClick={setHabitEmoji} />}
            {showHabitSummary && <HabitSummary habit={habit} handleSaveHabit={saveHabit}/>}
        </section>
    )
}

NewHabit.propTypes = {
    user: PropTypes.shape({
        user: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired
}

export default NewHabit
