import { React } from 'react'
import { Link } from 'react-router-dom'

function Header () {
    return (
        <header className="bg-colorPrimary text-colorSecondary w-1/3 min-h-[100vh]">
            <div className="p-2">
                <h1 className="text-colorSecondary hover:text-colorSecondaryDark text-2xl text-center">
                    <Link to={'/'}>Habit Tracker</Link>
                </h1>
            </div>
            <nav>
                <ul className='flex flex-col items-center '>
                    {document.cookie.includes('habitTrackerToken') &&
                        <li className="p-2">
                            <Link to={'/'}>Home</Link>
                        </li>
                    }
                    {document.cookie.includes('habitTrackerToken') &&
                        <li className="p-2">
                            <Link to={'/profile'}>My Profile</Link>
                        </li>
                    }
                    {document.cookie.includes('habitTrackerToken') &&
                        <li className="p-2">
                            <Link to={'/new-habit'}>New Habit</Link>
                        </li>
                    }
                    {!document.cookie.includes('habitTrackerToken') &&
                        <li className="p-2">
                            <Link to={'/register'}>Register</Link>
                        </li>
                    }
                    {!document.cookie.includes('habitTrackerToken') &&
                        <li className="p-2">
                            <Link to={'/login'}>Login</Link>
                        </li>
                    }
                    {document.cookie.includes('habitTrackerToken') &&
                        <li className="p-2">
                            <Link to={'/logout'}>Logout</Link>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header
