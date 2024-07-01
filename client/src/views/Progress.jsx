import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getUser } from '../util/axios'

function Progress (props) {
    const userId = props.user.user.id || ''
    const [user, setUser] = useState({})

    useEffect(() => {
        async function fetchUser () {
            try {
                const userData = await getUser(userId)
                if (userData) {
                    setUser(userData)
                    console.log(userData)
                } else {
                    console.log('No user data found')
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchUser()
    }, [])

    useEffect(() => {
        document.title = 'Progress | Habit Tracker'
    }, [])

    return (
        <>
            <h2>Your Habit Progress:</h2>
        </>
    )
}

Progress.propTypes = {
    user: PropTypes.shape({
        user: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired
}

export default Progress
