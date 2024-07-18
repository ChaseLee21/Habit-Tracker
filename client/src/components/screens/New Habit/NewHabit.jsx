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
    const { showHabitSelection, showNameSelection, showDescriptionSelection, showWhySelection, showGoalSelection, showFrequencySelection, showEmojiSelection, showHabitSummary } = useNewHabit()

    // Lifecycle Methods
    useEffect(() => {
        document.title = 'New Habit | Habit Tracker'
    }, [])

    return (
        <section className="flex flex-col rounded-md m-2 bg-colorBg text-colorText p-2">
            {showHabitSelection && <HabitSelection />}
            {showNameSelection && <NameSelection />}
            {showDescriptionSelection && <DescriptionSelection />}
            {showWhySelection && <WhySelection />}
            {showGoalSelection && <GoalSelection />}
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
