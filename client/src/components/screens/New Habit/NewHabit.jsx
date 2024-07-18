import { React, useEffect } from 'react'
import { useNewHabit } from '../../../contexts/NewHabitContext'
import HabitSelection from './components/HabitSelection'
import NameSelection from './components/NameSelection'
import DescriptionSelection from './components/DescriptionSelection'
import WhySelection from './components/WhySelection'
import GoalSelection from './components/GoalSelection'
import FrequencySelection from './components/FrequencySelection'
import EmojiSelection from './components/EmojiSelection'
import HabitSummary from './components/HabitSummary'

function NewHabit (props) {
    // Variables
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

export default NewHabit
