import Navbar from "./Navbar"
import { useState } from "react";

function Header() {

  const [showMenu, setShowMenu] = useState(false);

    return (
      <>
        <header className="bg-primaryBg">
          <div className="flex justify-between items-center p-2">
            <button onClick={() => setShowMenu(!showMenu)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <h1 className="text-primaryText text-2xl mx-2">Habit Builder</h1>
          </div>
          {showMenu && <Navbar />}
        </header>
      </>
    )
  }
  
  export default Header
  