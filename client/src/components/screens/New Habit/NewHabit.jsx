import { React, useState, useEffect } from 'react'
import { useNewHabit } from '../../../contexts/NewHabitContext'
import { postHabit } from '../../../util/axios'
import PropTypes from 'prop-types'
import HabitSelection from './components/HabitSelection'
import NameSelection from './components/NameSelection'
import DescriptionSelection from './components/DescriptionSelection'
import SectionHeader from './components/SectionHeader'
import WhySelection from './components/WhySelection'
import GoalSelection from './components/GoalSelection'
import FrequencySelection from './components/FrequencySelection'
import EmojiSelection from './components/EmojiSelection'
import HabitSummary from './components/HabitSummary'

function NewHabit (props) {
    // Variables
    const userId = props.user.user.id || ''
    const { habit, updateHabit } = useNewHabit()

    // State Variables
    const [ShowHabitSelection, setShowHabitSelection] = useState(true)
    const [showNameSelection, setShowNameSelection] = useState(false)
    const [showDescriptionSelection, setShowDescriptionSelection] = useState(false)
    const [showWhySelection, setShowWhySelection] = useState(false)
    const [ShowGoalSelection, setShowGoalSelection] = useState(false)
    const [showFrequencySelection, setShowFrequencySelection] = useState(false)
    const [showEmojiSelection, setShowEmojiSelection] = useState(false)
    const [showHabitSummary, setShowHabitSummary] = useState(false)

    // Lifecycle Methods
    useEffect(() => {
        document.title = 'New Habit | Habit Tracker'
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
            updateHabit(newHabit)
            setSectionHeader({
                title: newHabit.name,
                subtext: `Perfect, You've choosen ${newHabit.name.toLowerCase()}! Define the habit a little more. What will you do?`
            })
        }
    }
    const setHabitName = (name) => {
        updateHabit({ ...habit, name })
        setShowNameSelection(false)
        setShowDescriptionSelection(true)
        setSectionHeader({
            title: name,
            subtext: `Perfect, You've choosen ${name.toLowerCase()}! Define the habit a little more. What will you do?`
        })
    }
    const setHabitDescription = (description) => {
        updateHabit({ ...habit, description })
        setShowDescriptionSelection(false)
        setShowWhySelection(true)
        setSectionHeader({
            title: 'Why',
            subtext: `I will ${description} because... `
        })
    }
    const setHabitWhy = (why) => {
        updateHabit({ ...habit, why })
        setShowWhySelection(false)
        setShowGoalSelection(true)
        setSectionHeader({
            title: 'Create a Goal',
            subtext: 'I finish my habit for the day when'
        })
    }
    const setHabitGoal = (goal) => {
        updateHabit({ ...habit, goal })
        setShowGoalSelection(false)
        setShowFrequencySelection(true)
        setSectionHeader({
            title: 'How many times per week will you do this habit?',
            subtext: ''
        })
    }
    const setHabitFrequency = (frequency) => {
        frequency = parseInt(frequency)
        updateHabit({ ...habit, frequency })
        setShowFrequencySelection(false)
        setShowEmojiSelection(true)
        setSectionHeader({
            title: 'Emoji',
            subtext: 'Select an emoji to represent your habit. This will be represent your habit.'
        })
    }
    const setHabitEmoji = (emoji) => {
        updateHabit({ ...habit, emoji })
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
            {ShowHabitSelection && <HabitSelection />}
            {showNameSelection && <NameSelection />}
            {showDescriptionSelection && <DescriptionSelection />}
            {showWhySelection && <WhySelection />}
            {ShowGoalSelection && <GoalSelection />}
            {showFrequencySelection && <FrequencySelection />}
            {showEmojiSelection && <EmojiSelection />}
            {showHabitSummary && <HabitSummary />}
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
