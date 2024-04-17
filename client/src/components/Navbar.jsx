import { Link } from "react-router-dom"

function Navbar() {

    return (
        <nav className="bg-secondaryBg">
            <ul className="py-2 text-lg">
                <li className="p-1 ps-3 hover:text-highlight text-secondaryText">
                    <Link to={'/'}>Home</Link>
                </li>
                <li className="border-y p-1 ps-3 hover:text-highlight text-secondaryText">
                    <Link to={'/new-habit'}>New Habit</Link>
                </li>
                <li className="p-1 ps-3 hover:text-highlight text-secondaryText">
                    <Link to={'/login'}>Login</Link>
                </li>
                <li className="border-y p-1 ps-3 hover:text-highlight text-secondaryText">
                    <Link to={'/register'}>Register</Link>
                </li>
                <li className="p-1 ps-3 hover:text-highlight text-secondaryText">
                    Logout
                </li>
            </ul>
        </nav>
    )
  }
  
  export default Navbar
  