import { React, useEffect, useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import PropTypes from 'prop-types'
import { getUser } from '../util/axios'

function Profile (props) {
    const userId = props.user.user.id || ''
    const [user, setUser] = useState({})

    useEffect(() => {
        async function fetchUser () {
            try {
                console.log(userId)
                const userData = await getUser(userId)
                if (userData) {
                    console.log(userData)
                    setUser(userData)
                } else {
                    console.log('No user data found')
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchUser()
    }, [])

    return (
        <main>
            <section className="flex flex-col rounded-md m-2 bg-secondaryBg text-secondaryText p-2 text-xl shadow-xl">
                <SectionHeader title='Profile' />
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
        </main>
    )
}

Profile.propTypes = {
    user: PropTypes.shape({
        user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            timezone: PropTypes.string.isRequired,
            email: PropTypes.string,
            name: PropTypes.string
        })
    }).isRequired
}

export default Profile
