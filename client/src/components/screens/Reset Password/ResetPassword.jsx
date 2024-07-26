import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorAlert from "../../common/ErrorAlert";
import SuccessAlert from "../../common/SuccessAlert";
import { resetPassword, sendResetPasswordEmail } from "../../../util/axios";
import { validatePassword } from "../../../util/helpers";

function ResetPassword() {
    // Variables
    const [error, setError] = useState('')
    const [alert, setAlert] = useState('')
    const { token } = useParams()

    async function handleSendEmailSubmit (e) {
        e.preventDefault()
        document.getElementById('sendEmailSubmitButton').disabled = true
        const email = { email: document.getElementById('email').value }
        const response = await sendResetPasswordEmail(email)
        console.log(response);
        if (response.status === 404) {
            setError(response.data.message)
            return
        }
        if (response.status === 200) {
            setAlert('Email sent!')
            return
        }
    }

    async function handleResetPasswordSubmit (e) {
        e.preventDefault()
        const newPassword = document.getElementById('newPassword').value
        const confirmPassword = document.getElementById('confirmPassword').value
        try {
            if (newPassword !== confirmPassword) {
                setError('Passwords do not match')
                return
            }
            if (!validatePassword(newPassword, confirmPassword)) {
                setError('Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one lowercase letter')
                return
            }
            const response = await resetPassword({newPassword}, token)
            console.log(response);
            if (response.status !== 200) {
                setError(response.data.message)
                return
            } else {
                setAlert('Password reset!')
                window.location.href = '/login'
                return
            }
        } catch (error) {
            console.log(error);
            setError('Error resetting password')
        }
    }

    useEffect(() => {
        if (token) {
            console.log('token found');
        }
    }, [token])

    return (
        <div>
            <h2 className="text-2xl m-1">Reset Password</h2>
            {error && <ErrorAlert message={error} handleCloseAlert={() => setError(null)}/>}
            {alert && <SuccessAlert message={alert} handleCloseAlert={() => setAlert(null)}/>}
            {!token && <section className='bg-colorBg text-colorText rounded p-2 m-1 h-fit'>
                <p className="m-1">If you do not remember your password we will send you a one time password that you can use to login. When logged in you will be prompt to reset your password.</p>
                <form className="flex flex-col m-1 p-2 bg-colorBgAlt rounded shadow-md shadow-colorShadow text-lg" onSubmit={handleSendEmailSubmit}>
                    <label htmlFor="email" className="p-1 mx-1">Email:</label>
                    <input type="email" id="email" name="email" autoComplete='email' className="p-1 m-1 rounded-md" />
                    <button type="submit" id="sendEmailSubmitButton" className="bg-colorButtonBgAlt text-colorButtonTextAlt w-fit p-2 rounded-md m-1">Send Email</button>
                </form>
                <p className="p-2 m-1"><Link to={'/login'} className='text-colorLink hover:text-colorLinkHover underline'>Back to Login</Link></p>
            </section>}
            {token && <section className='bg-colorBg text-colorText rounded p-2 m-1 h-fit'>
                <form className="flex flex-col m-1 p-2 bg-colorBgAlt rounded shadow-md shadow-colorShadow text-lg" onSubmit={handleResetPasswordSubmit}>
                    <label htmlFor="newPassword" className="p-1 mx-1">New Password:</label>
                    <input type="password" id="newPassword" name="newPassword" autoComplete='new-password' className="p-1 m-1 rounded-md" />
                    <label htmlFor="confirmPassword" className="p-1 mx-1">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" className="p-1 m-1 rounded-md" />
                    <button type="submit" id="resetPasswordSubmitButton" className="bg-colorButtonBgAlt text-colorButtonTextAlt w-fit p-2 rounded-md m-1">Reset Password</button>
                </form>
            </section>}  

        </div>
    );
}

export default ResetPassword;
