import React from 'react'

function Footer () {
    return (
        <footer className="flex flex-col items-center justify-end text-colorText fixed bottom-0 bg-transparent w-full text-center">
            <p>Made by Chase Seeberger</p>
            <div className="flex">
                <a className="px-2 text-colorLink hover:text-colorLinkHover" target='_blank' rel="noreferrer" href='https://github.com/ChaseLee21'>Github</a>
                <a className="px-2 text-colorLink hover:text-colorLinkHover" target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/chaseseeberger/'>LinkedIn</a>
            </div>
        </footer>
    )
}

export default Footer
