import Day from '../components/Day'
import Habits from '../components/Habits'
import Todos from '../components/Todos'
import Progress from '../components/Progress'
import React from 'react'

function Home () {
  return (
      <>
        <Day />
        <Habits />
        <Todos />
        <Progress />
      </>
  )
}

export default Home
