import Day from './components/Day'
import Habits from './components/Habits'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useUser } from '../../../contexts/UserContext'
import ConfirmUpdate from './components/ConfirmUpdate'
import UpdateGoal from './components/UpdateGoal'

function Home (props) {
    const { updateHabitGoalState, habitToUpdate, updateHabitToUpdate } = useUser()
    const [showUpdateGoal, setShowUpdateGoal] = useState(false)
    const [showConfirmUpdate, setShowConfirmUpdate] = useState(false)

    useEffect(() => {
        document.title = 'Home | Habit Tracker'
    }, [])
    
    async function handleConfirmUpdate () {
        setShowConfirmUpdate(false)
        setShowUpdateGoal(true)
    }

    function handleCancelUpdate () {
        updateHabitToUpdate(undefined)
    }

    async function handleUpdateGoalSubmit (habit) {
        await updateHabitGoalState(habit)
        setShowUpdateGoal(false)
    }

    return (
        <main className="flex flex-col bg-colorBg text-colorText">
            <Day {...props}/>
            <Habits {...props} />
            {showUpdateGoal && <section className='h-full w-full fixed top-0 left-0 bg-gray-800 bg-opacity-50 grid grid-flow-col grid-cols-6'>
                <div className='col-span-6 md:col-span-4 md:col-start-2'>
                    <UpdateGoal habit={habitToUpdate} onCancel={() => setShowUpdateGoal(false)} onConfirm={handleUpdateGoalSubmit} />
                </div>
            </section>}
            {habitToUpdate && habitToUpdate !== undefined && <section className='h-full w-full fixed top-0 left-0 bg-gray-800 bg-opacity-50 grid grid-flow-col grid-cols-6'>
                <div className='col-span-6 md:col-span-4 md:col-start-2'>
                    <ConfirmUpdate habit={habitToUpdate} onConfirm={handleConfirmUpdate} onCancel={handleCancelUpdate} />
                </div>
            </section>}
        </main>
    )
}

export default Home
