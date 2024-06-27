import Day from '../components/Day'
import Habits from '../components/Habits'
// import Todos from '../components/Todos'
import Progress from '../components/Progress'
import React, { useEffect } from 'react'

function Home (props) {
    useEffect(() => {
        document.title = 'Home | Habit Tracker'
    }, [])

    return (
        <>
            <Day {...props}/>
            <Habits {...props} />
            {/* <Todos /> */}
            {/* <Progress /> */}
        </>
    )
}

export default Home
