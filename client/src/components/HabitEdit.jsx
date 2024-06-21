import { React } from 'react'
import PropTypes from 'prop-types'

function HabitEdit (habit) {
    return (
        <section>
            <ul>
                <li className='bg-primaryBg text-primaryText rounded p-2 my-2 w-fit'>
                    <p>{habit.name}</p>
                    <p>{habit.description}</p>
                    <p>{habit.why}</p>
                    <p>{habit.goal}</p>
                    <p>{habit.frequency} times a week</p>
                    {habit.reward && <p>Reward: {habit.reward}</p>}
                </li>
            </ul>
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
