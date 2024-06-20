import { React } from 'react'
import PropTypes from 'prop-types'

function ProfileSummary (props) {
    const user = props.user

    return (
        <section>
            <p>Username: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Timezone: {user.timezone}</p>
            <p>Habits:</p>
            <ul>
                {user.habits && user.habits.map(habit => {
                    return <li className='bg-primaryBg text-primaryText rounded p-2 w-fit' key={habit._id}>
                        <p>{habit.name}</p>
                        <p>{habit.description}</p>
                        <p>{habit.why}</p>
                        <p>{habit.goal}</p>
                        <p>{habit.frequency} times a week</p>
                        {habit.reward && <p>Reward: {habit.reward}</p>}
                    </li>
                })}
            </ul>
        </section>
    )
}

ProfileSummary.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        timezone: PropTypes.string.isRequired,
        habits: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            why: PropTypes.string.isRequired,
            goal: PropTypes.string.isRequired,
            frequency: PropTypes.string.isRequired,
            reward: PropTypes.string
        }))
    }).isRequired
}

export default ProfileSummary
