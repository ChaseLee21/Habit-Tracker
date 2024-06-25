import { validateEmail, validateLoginPassword } from '../util/validate-helpers'
import { React, useEffect, useState } from 'react'
import { login, checkToken } from '../util/axios'
import { Link } from 'react-router-dom'
import ErrorAlert from '../components/ErrorAlert'

function Login () {
    // Variables
    const [error, setError] = useState('')

    // Lifecycle methods
    useEffect(() => {
        async function checkExpiredToken () {
            try {
                document.title = 'Login - Habit Tracker'
                if (document.cookie.includes('habitTrackerToken')) {
                    const response = await checkToken()
                    if (response.user) {
                        window.location.href = '/'
                    } else {
                        document.cookie = 'habitTrackerToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                        setError('Your session has expired. Please login again.')
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        checkExpiredToken()
    }, [])

    // Functions
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        if (validateForm(email, password)) {
            const userData = { email, password }
            const user = await login(userData)
            console.log(user)
            if (user.status === 401 || !user) {
                setError('Invalid email or password')
            } else if (user.status === 200 || user.statusText === 'OK') {
                window.location.href = '/'
            }
        }
    }

    function validateForm (email, password) {
        if (!validateEmail(email) || !validateLoginPassword(password)) {
            setError('Please input a valid email and password')
            return false
        }
        return true
    }

    return (
        <>
            <h2 className="flex rounded-md m-2 bg-secondaryBg text-secondaryText p-2 text-xl shadow-xl">Login</h2>
            {error && <ErrorAlert message={error} handleCloseAlert={() => setError(null)}/>}
            <form className="flex flex-col m-2 p-2 bg-secondaryBg rounded-md shadow-xl" onSubmit={handleLoginSubmit}>
                <label htmlFor="email" className="text-secondaryText">Email:</label>
                <input type="email" id="email" name="email" autoComplete='email' className="p-1 m-1 rounded-md" />
                <label htmlFor="password" className="text-secondaryText">Password:</label>
                <input type="password" id="password" name="password" autoComplete='current-password' className="p-1 m-1 rounded-md" />
                <button type="submit" className="bg-primaryBg text-primaryText w-fit p-2 rounded-md m-1">Login</button>
                <p>Do not have an account? <Link to={'/register'} className='text-blue-800 underline'>Click here to register</Link></p>
            </form>
        </>
    )
}

export default Login
