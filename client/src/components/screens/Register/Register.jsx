import { validateEmail, validatePassword, validateUsername } from '../../../util/helpers'
import React from 'react'
import { postUser } from '../../../util/axios'
import { Link } from 'react-router-dom'

function Register () {
    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const username = e.target.username.value
        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value
        if (validateForm(email, username, password, confirmPassword)) {
            const userData = { email, name: username, password }
            const user = await postUser(userData)
            console.log('User Created: ', user)
            window.location.href = '/'
        }
    }

    function validateForm (email, username, password, confirmPassword) {
        if (!validateEmail(email)) {
            alert('Invalid email')
            console.log('Invalid email')
            return false
        }
        if (!validateUsername(username)) {
            alert('Invalid username')
            console.log('Invalid username')
            return false
        }
        if (!validatePassword(password, confirmPassword)) {
            alert('Invalid password')
            console.log('Invalid password')
            return false
        }
        return true
    }

    return (
        <section className='bg-colorBg text-colorText rounded p-2 m-2 h-fit'>
            <h2 className="text-2xl">Register</h2>
            <form className="flex flex-col m-2 p-2 bg-colorBgAlt rounded shadow-md shadow-colorShadow text-lg" onSubmit={handleRegisterSubmit}>
                <label htmlFor="email" className="p-1 mx-2">Email:</label>
                <input type="email" id="email" name="email" autoComplete='email' className="p-1 m-1 rounded-md" />
                <label htmlFor="username" className="p-1 mx-2">Username:</label>
                <input type="text" id="username" name="username" autoComplete='username' className="p-1 m-1 rounded-md" />
                <label htmlFor="password" className="p-1 mx-2">Password:</label>
                <input type="password" id="password" name="password" autoComplete='new-password' className="p-1 m-1 rounded-md" />
                <label htmlFor="confirmPassword" className="p-1 mx-2">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" className="p-1 m-1 rounded-md" />
                <button type="submit" className="bg-colorButtonBgAlt text-colorButtonTextAlt w-fit p-2 rounded-md m-1">Register</button>
                <p className='m-2'>Already have an account? <Link to={'/login'} className='text-colorLink hover:text-colorLinkHover underline'>Click here to login</Link></p>
            </form>
        </section>
    )
}

export default Register
