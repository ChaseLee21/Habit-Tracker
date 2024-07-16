import NavBarMobile from './components/nav/NavBarMobile'
import NavBarDesktop from './components/nav/NavBarDesktop'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

function App () {
    const [width, setWidth] = useState(window.innerWidth)
    const [showMobile, setShowMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        if (width < 768) {
            setShowMobile(true)
        } else {
            setShowMobile(false)
        }
    }, [width])

    return (
        <div>
            {showMobile && <div className='grid grid-flow-row grid-rows-12 h-[100vh]'>
                <div className='row-span-1'>
                    <NavBarMobile />
                </div>
                <div className='row-span-11'>
                    <Outlet />
                </div>
            </div>}

            {!showMobile && <div className='grid grid-cols-5 h-[100vh]'>
                <div className='fixed col-span-1'>
                    <NavBarDesktop />
                </div>
                <div className='col-span-4 col-start-2'>
                    <Outlet />
                </div>
            </div>}
        </div>
    )
}

export default App
