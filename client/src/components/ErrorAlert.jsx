import React from 'react'
import propTypes from 'prop-types'

function ErrorAlert ({ message, handleCloseAlert }) {
    return (
        <div className="bg-red-500 text-white p-2 m-2 rounded-md shadow-xl flex justify-between">
            {message}
            <button type='button' className="text-white" onClick={() => handleCloseAlert()}>X</button>
        </div>
    )
}

ErrorAlert.propTypes = {
    message: propTypes.string.isRequired,
    handleCloseAlert: propTypes.func.isRequired
}

export default ErrorAlert
