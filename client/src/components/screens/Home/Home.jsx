import Day from './components/Day'
import Habits from './components/Habits'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useUser } from '../../../contexts/UserContext'
import UpdateGoal from './components/UpdateGoal'

function Home (props) {
    const { updateHabitGoalState, habitToUpdate, updateHabitToUpdate } = useUser()

    useEffect(() => {
        document.title = 'Home | Habit Tracker'
    }, [])
    
    async function handleUpdateGoalSubmit (habit) {
        await updateHabitGoalState(habit)
        updateHabitToUpdate(undefined)
    }

    function handleUpdateGoalCancel () {
        updateHabitToUpdate(undefined)
    }

    return (
        <main className="flex flex-col bg-colorBg text-colorText">
            <Day {...props}/>
            <Habits {...props} />
            {habitToUpdate && habitToUpdate !== undefined && <section className='h-full w-full fixed top-0 left-0 bg-gray-800 bg-opacity-50 grid grid-flow-col grid-cols-6'>
                <div className='col-span-6 md:col-span-4 md:col-start-2'>
                    <UpdateGoal habit={habitToUpdate} onCancel={handleUpdateGoalCancel} onConfirm={handleUpdateGoalSubmit} />
                </div>
            </section>}
        </main>
    )
}

export default Home
