import { React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout () {
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Logout - Habit Tracker'
        document.cookie = 'habitTrackerToken =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        navigate('/login')
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
