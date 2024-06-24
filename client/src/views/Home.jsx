import Day from '../components/Day'
import Habits from '../components/Habits'
// import Todos from '../components/Todos'
import Progress from '../components/Progress'
import React from 'react'

function Home (props) {
    return (
        <>
            <Day {...props}/>
            <Habits {...props} />
            {/* <Todos /> */}
            <Progress />
        </>
    )
}

export default Home
