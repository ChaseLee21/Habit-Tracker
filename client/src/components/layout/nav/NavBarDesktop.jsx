import { React } from 'react'
import { Link } from 'react-router-dom'

function Header () {
    return (
        <header className="flex flex-col justify-between bg-colorPrimary text-colorSecondary min-h-[100vh] w-[20vw] shadow-md shadow-colorShadow">
            <div className="p-2">
                <h1 className="text-colorSecondary hover:text-colorSecondaryDark text-2xl text-center">
                    <Link to={'/'}>Habit Tracker</Link>
                </h1>
            </div>
            <nav>
                <ul className='flex flex-col items-center'>
                    {document.cookie.includes('habitTrackerToken') &&
                        <li className="p-2">
                            <Link className='hover:text-colorLinkHover' to={'/'}>Home</Link>
                        </li>
                    }
                    {document.cookie.includes('habitTrackerToken') &&
                        <li className="p-2">
                            <Link className='hover:text-colorLinkHover' to={'/profile'}>My Profile</Link>
                        </li>
                    }
                    {document.cookie.includes('habitTrackerToken') &&
                        <li className="p-2">
                            <Link className='hover:text-colorLinkHover' to={'/progress'}>My Progress</Link>
                        </li>
                    }
                    {document.cookie.includes('habitTrackerToken') &&
                        <li className="p-2">
                            <Link className='hover:text-colorLinkHover' to={'/new-habit'}>New Habit</Link>
                        </li>
                    }
                    {document.cookie.includes('habitTrackerToken') &&
                        <li className="p-2">
                            <Link className='hover:text-colorLinkHover' to={'/logout'}>Logout</Link>
                        </li>
                    }
                    {!document.cookie.includes('habitTrackerToken') &&
                        <li className="p-2">
                            <Link className='hover:text-colorLinkHover' to={'/register'}>Register</Link>
                        </li>
                    }
                    {!document.cookie.includes('habitTrackerToken') &&
                        <li className="p-2">
                            <Link className='hover:text-colorLinkHover' to={'/login'}>Login</Link>
                        </li>
                    }
                </ul>
            </nav>
            <div className='text-center'>
                <p className=''>Made by Chase Seeberger</p>
                <div className="flex justify-center">
                    <a className="px-2 text-colorLink hover:text-colorLinkHover" target='_blank' rel="noreferrer" href='https://github.com/ChaseLee21'>Github</a>
                    <a className="px-2 text-colorLink hover:text-colorLinkHover" target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/chaseseeberger/'>LinkedIn</a>
                </div>
            </div>
        </header>
    )
}

export default Header
