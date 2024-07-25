import { React, useState } from "react";
import { Link } from "react-router-dom";
import ErrorAlert from "../../common/ErrorAlert";
import SuccessAlert from "../../common/SuccessAlert";
import { resetPassword } from "../../../util/axios";

function ResetPassword() {
    // Variables
    const [error, setError] = useState('')
    const [alert, setAlert] = useState('')

    async function handleResetPasswordSubmit (e) {
        e.preventDefault()
        const email = { email: document.getElementById('email').value }
        const response = await resetPassword(email)
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

    return (
        <section className='bg-colorBg text-colorText rounded p-2 m-1 h-fit'>
            <h2 className="text-2xl m-1">Reset Password</h2>
            <p className="m-1">If you do not remember your password we will send you a one time password that you can use to login. When logged in you will be prompt to reset your password.</p>
            {error && <ErrorAlert message={error} handleCloseAlert={() => setError(null)}/>}
            {alert && <SuccessAlert message={alert} handleCloseAlert={() => setAlert(null)}/>}
            <form className="flex flex-col m-1 p-2 bg-colorBgAlt rounded shadow-md shadow-colorShadow text-lg" onSubmit={handleResetPasswordSubmit}>
                <label htmlFor="email" className="p-1 mx-1">Email:</label>
                <input type="email" id="email" name="email" autoComplete='email' className="p-1 m-1 rounded-md" />
                <button type="submit" className="bg-colorButtonBgAlt text-colorButtonTextAlt w-fit p-2 rounded-md m-1">Reset Password</button>
            </form>
            <p className="p-2 m-1"><Link to={'/login'} className='text-colorLink hover:text-colorLinkHover underline'>Back to Login</Link></p>
        </section>
    );
}

export default ResetPassword;
