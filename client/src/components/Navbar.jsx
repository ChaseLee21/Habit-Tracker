function Navbar() {

    return (
        <nav className="bg-secondaryBg">
            <ul className="py-2 text-lg">
                <li className=" p-1 ps-3 hover:text-highlight text-secondaryText">Home</li>
                <li className="border-y p-1 ps-3 hover:text-highlight text-secondaryText">New Habit</li>
                <li className="p-1 ps-3 hover:text-highlight text-secondaryText">Login</li>
                <li className="border-y p-1 ps-3 hover:text-highlight text-secondaryText">Logout</li>
                <li className="p-1 ps-3 hover:text-highlight text-secondaryText">Register</li>
            </ul>
        </nav>
    )
  }
  
  export default Navbar
  