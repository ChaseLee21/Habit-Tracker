import React from 'react'

function Footer () {
    return (
        <footer className="flex flex-col items-center justify-end bg-colorBg text-colorText">
            <h3>Made by Chase Seeberger</h3>
            <div className="flex">
                <a className="px-2 text-colorLink hover:text-colorLinkHover" target='_blank' rel="noreferrer" href='https://github.com/ChaseLee21'>Github</a>
                <a className="px-2 text-colorLink hover:text-colorLinkHover" target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/chaseseeberger/'>LinkedIn</a>
            </div>
        </footer>
    )
}

export default Footer
