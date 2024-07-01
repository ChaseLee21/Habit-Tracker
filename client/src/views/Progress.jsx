import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

function Progress (props) {
    // const userId = props.user.user.id || ''

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
