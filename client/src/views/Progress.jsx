import React, { useEffect } from 'react'

function Progress () {
    useEffect(() => {
        document.title = 'Progress | Habit Tracker'
    }, [])

    return (
        <>
            <h2>Your Habit Progress:</h2>
        </>
    )
}

export default Progress
