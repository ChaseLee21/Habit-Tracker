import Day from '../components/Day'
import Habits from '../components/Habits'
import React, { useEffect } from 'react'

function Home (props) {
    useEffect(() => {
        document.title = 'Home | Habit Tracker'
    }, [])

    return (
        <main className='flex flex-col min-h-full'>
            <Day {...props}/>
            <Habits {...props} />
        </main>
    )
}

export default Home
