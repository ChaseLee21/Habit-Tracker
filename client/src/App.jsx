import Footer from './components/Footer'
import Header from './components/NavBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

function App () {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default App
