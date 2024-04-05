function Navbar() {

    return (
      <>
        <nav className="bg-secondary">
            <ul className="m-2 py-2 text-lg">
                <li className=" p-1 ps-3 hover:text-highlight">Home</li>
                <li className="border-y p-1 ps-3 hover:text-highlight">New Habit</li>
                <li className=" p-1 ps-3 hover:text-highlight">Logout</li>
            </ul>
        </nav>
      </>
    )
  }
  
  export default Navbar
  