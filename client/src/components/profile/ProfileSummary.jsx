import { React, useState } from 'react'
import PropTypes from 'prop-types'
import HabitEdit from './HabitEdit'
import { putHabit, deleteHabit } from '../../util/axios'

function ProfileSummary (props) {
    const user = props.user
    const [editHabit, setEditHabit] = useState(null)

    function handleEditHabit (habit) {
        setEditHabit(habit)
    }

    async function handleEditHabitSubmit (habit) {
        setEditHabit(null)
        await putHabit(habit)
        window.location.reload()
    }

    async function handleHabitDelete (habit) {
        setEditHabit(null)
        if (window.confirm('Are you sure you want to delete this habit?', habit.name)) {
            await deleteHabit(habit)
            window.location.reload()
        }
    }

    return (
        <section>
            {!editHabit &&
                <ul className='bg-colorBg text-colorText rounded w-fit'>
                    <li className='bg-colorBg text-colorText rounded p-2 me-2 w-full'>
                        <div className='flex justify-between'>
                            <h2 className='text-2xl'>My Profile</h2>
                            <button className='bg-colorButtonBg text-colorButtonText rounded px-2 w-fit hover:text-colorLinkHover' onClick={() => props.onEditClick()}>Edit</button>
                        </div>
                        <p>Username: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Timezone: {user.timezone}</p>
                    </li>
                    {user.habits && user.habits.map(habit => {
                        return <li className='bg-colorBg text-colorText rounded my-2 p-2 w-full' key={habit._id}>
                            <div className='flex justify-between'>
                                <h3 className='text-xl'>{habit.emoji} {habit.name}</h3>
                                <button className='bg-colorButtonBg text-colorButtonText rounded px-2 w-fit hover:text-colorLinkHover' onClick={() => handleEditHabit(habit)}>Edit</button>
                            </div>
                            <p className="text-base">I will {habit.description}</p>
                            <p className="text-base">Because {habit.why}</p>
                            <p className="text-base">I finish my habit for the day when {habit.goal}</p>
                            {habit.frequency === 1 && <p className="text-base">I will do this habit {habit.frequency} time this week</p>}
                            {habit.frequency > 1 && <p className="text-base">I will do this habit {habit.frequency} times this week</p>}
                        </li>
                    })}
                </ul>
            }
            {editHabit &&
            editHabit._id &&
            <HabitEdit habit={editHabit}
                onCancel={() => setEditHabit(null)}
                onSubmit={(habit) => handleEditHabitSubmit(habit)}
                onDelete={(habit) => handleHabitDelete(habit)}
            />}
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
            frequency: PropTypes.number.isRequired,
            reward: PropTypes.string,
            emoji: PropTypes.string
        }))
    }).isRequired,
    onEditClick: PropTypes.func.isRequired
}

export default ProfileSummary
