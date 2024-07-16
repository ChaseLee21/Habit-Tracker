import React from 'react'
import PropTypes from 'prop-types'

function ConfirmUpdate (props) {
    return (
        <div className='bg-gray-800 bg-opacity-50 top-0 w-auto absolute h-full rounded '>
            <div className=' grid grid-flow-col grid-cols-6 w-fit'>
                <div className='col-span-4 col-start-2 bg-colorBg m-2 p-2 rounded'>
                    <h2>Congrats! You have met your goal for {props.habit.name} this week! Would you like to set a new goal for {props.habit.name}? You can change your goals anytime in your profile page.</h2>
                    <div className='flex p-1'>
                        <button className='bg-colorButtonBg px-2 m-2 rounded' onClick={props.onConfirm}>Yes</button>
                        <button className='bg-colorButtonBg px-2 m-2 rounded' onClick={props.onCancel}>No</button>
                    </div>
                </div>
            </div>
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
