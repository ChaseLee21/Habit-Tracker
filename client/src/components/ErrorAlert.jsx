import React from 'react'
import propTypes from 'prop-types'

function ErrorAlert ({ message }) {
    return (
        <div className="bg-red-500 text-white p-2 rounded-md shadow-xl">
            {message}
        </div>
    )
}

ErrorAlert.propTypes = {
    message: propTypes.string.isRequired
}

export default ErrorAlert
