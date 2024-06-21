import { React } from 'react'
import PropTypes from 'prop-types'

function HabitEdit (habit) {
    return (
        <section>
            <form>
                <label htmlFor='habitName'>Habit Name:</label>
                <input id='habitName' type='text' defaultValue={habit.name}></input>
                <label htmlFor='habitDescription'>Habit Description:</label>
                <input id='habitDescription' type='text' defaultValue={habit.description}></input>
                <label htmlFor='habitWhy'>Habit Why:</label>
                <input id='habitWhy' type='text' defaultValue={habit.why}></input>
                <label htmlFor='habitGoal'>Habit Goal:</label>
                <input id='habitGoal' type='text' defaultValue={habit.goal}></input>
                <label htmlFor='habitFrequency'>Habit Frequency:</label>
                <input id='habitFrequency' type='text' defaultValue={habit.frequency}></input>
                <label htmlFor='habitReward'>Habit Rewards:</label>
                <input id='habitReward' type='text' defaultValue={habit.reward}></input>
            </form>
        </section>
    )
}

HabitEdit.propTypes = {
    habit: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        why: PropTypes.string.isRequired,
        goal: PropTypes.string.isRequired,
        frequency: PropTypes.string.isRequired,
        reward: PropTypes.string
    }).isRequired
}

export default HabitEdit
