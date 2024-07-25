import { useState, React } from 'react'
import { Link } from 'react-router-dom'

function Header () {
    const [showMenu, setShowMenu] = useState(false)

    const handleNavBarClick = () => {
        setShowMenu(!showMenu)
    }

    return (
        <>
            <header className="bg-colorPrimary text-colorSecondary h-full ">
                {/* Menu Button and Title */}
                <div className="flex justify-between p-2 h-full">
                    <button onClick={() => handleNavBarClick()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-2 text-colorSecondary hover:text-colorSecondaryDark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <h1 className="text-colorSecondary hover:text-colorSecondaryDark text-2xl font-bold mx-2 my-auto ">
                        <Link to={'/'} onClick={() => setShowMenu(false)}>Habit Tracker</Link>
                    </h1>
                </div>
                {/* Nav Dropdown */}
                {showMenu && (
                    <div className="bg-colorBg text-colorLinktext-lg absolute w-full h-full z-50">
                        <nav>
                            <ul>
                                {document.cookie.includes('habitTrackerToken') &&
                                    <li className="border-b-2 border-colorBorder hover:text-colorLinkHover p-2">
                                        <Link to={'/'} onClick={() => handleNavBarClick()}>Home</Link>
                                    </li>
                                }
                                {document.cookie.includes('habitTrackerToken') &&
                                    <li className="border-b-2 border-colorBorder hover:text-colorLinkHover p-2">
                                        <Link to={'/profile'} onClick={() => handleNavBarClick()}>My Profile</Link>
                                    </li>
                                }
                                {document.cookie.includes('habitTrackerToken') &&
                                    <li className="border-b-2 border-colorBorder hover:text-colorLinkHover p-2">
                                        <Link to={'/progress'} onClick={() => handleNavBarClick()}>My Progress</Link>
                                    </li>
                                }
                                {document.cookie.includes('habitTrackerToken') &&
                                    <li className="border-b-2 border-colorBorder hover:text-colorLinkHover p-2">
                                        <Link to={'/new-habit'} onClick={() => handleNavBarClick()}>New Habit</Link>
                                    </li>
                                }
                                {document.cookie.includes('habitTrackerToken') &&
                                    <li className="border-b-2 border-colorBorder hover:text-colorLinkHover p-2">
                                        <Link to={'/logout'} onClick={() => handleNavBarClick()}>Logout</Link>
                                    </li>
                                }
                                {!document.cookie.includes('habitTrackerToken') &&
                                    <li className="border-b-2 border-colorBorder hover:text-colorLinkHover p-2">
                                        <Link to={'/register'} onClick={() => handleNavBarClick()}>Register</Link>
                                    </li>
                                }
                                {!document.cookie.includes('habitTrackerToken') &&
                                    <li className="border-b-2 border-colorBorder hover:text-colorLinkHover p-2">
                                        <Link to={'/login'} onClick={() => handleNavBarClick()}>Login</Link>
                                    </li>
                                }
                            </ul>
                        </nav>
                        <div className='text-center my-2'>
                            <p className=''>Made by Chase Seeberger</p>
                            <div className="flex justify-center">
                                <a className="px-2 text-colorLink hover:text-colorLinkHover" target='_blank' rel="noreferrer" href='https://github.com/ChaseLee21'>Github</a>
                                <a className="px-2 text-colorLink hover:text-colorLinkHover" target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/chaseseeberger/'>LinkedIn</a>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}

export default Header
