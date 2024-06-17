import { React, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function Logout () {
    const history = useHistory()

    useEffect(() => {
        document.title = 'Logout - Habit Tracker'
        document.cookie = 'habitTrackerToken =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        history.push('/login')
    }, [history])

    return (
        <>
            <section>
                <h1>Loading...</h1>
            </section>
        </>
    )
}

export default Logout
