import React from 'react'

function Footer () {
    return (
        <footer className="flex flex-col items-center rounded-md m-2 bg-colorBg text-colorText p-2 text-sm shadow-md shadow-colorShadow">
            <h3>Made by Chase Seeberger</h3>
            <div className="flex">
                <p className="px-2">Github</p>
                <p className="px-2">LinkedIn</p>
            </div>
        </footer>
    )
}

export default Footer
