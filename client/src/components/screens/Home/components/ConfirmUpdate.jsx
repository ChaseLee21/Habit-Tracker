import React from 'react'
import PropTypes from 'prop-types'

function ConfirmUpdate (props) {
    return (
        <div className='bg-colorBg m-2 p-2 rounded h-fit'>
            
        </div>
    )
}

ConfirmUpdate.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    habit: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired
}

export default ConfirmUpdate
