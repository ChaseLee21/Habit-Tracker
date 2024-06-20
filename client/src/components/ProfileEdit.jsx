import { React } from 'react'
import PropTypes from 'prop-types'
import { putUser } from '../util/axios'
import { validateEmail, validateTimezone, validateUsername } from '../util/validate-helpers'

function ProfileEdit (props) {
    const user = props.user
    const handleUpdateProfileSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const username = e.target.username.value
        const timezone = e.target.timezone.value
        if (validateForm(email, username, timezone)) {
            const userData = { email, name: username, timezone }
            const updatedUser = await putUser(user._id, userData)
            console.log('User Updated: ', updatedUser)
            props.onEditSave()
        }
        props.onEditCancel()
    }

    function validateForm (email, username, timezone) {
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
        if (!validateTimezone(timezone)) {
            alert('Invalid timezone')
            console.log('Invalid timezone')
            return false
        }
        return true
    }

    return (
        <section>
            <form className="flex flex-col m-2 p-2 bg-secondaryBg rounded-md shadow-xl" onSubmit={handleUpdateProfileSubmit}>
                <label htmlFor="email" className="text-secondaryText">Email:</label>
                <input type="email" id="email" name="email" autoComplete='email' defaultValue={user.email} className="p-1 m-1 rounded-md" />
                <label htmlFor="username" className="text-secondaryText">Username:</label>
                <input type="text" id="username" name="username" autoComplete='username' defaultValue={user.name} className="p-1 m-1 rounded-md" />
                <label htmlFor="timezone" className="text-secondaryText">Timezone:</label>
                <select type="text" id="timezone" name="timezone" defaultValue={user.timezone} className="p-1 m-1 rounded-md">
                    <option value="Pacific/Midway">Pacific/Midway</option>
                    <option value="Pacific/Honolulu">Pacific/Honolulu</option>
                    <option value="America/Anchorage">America/Anchorage</option>
                    <option value="America/Los_Angeles">America/Los_Angeles</option>
                    <option value="America/Phoenix">America/Phoenix</option>
                    <option value="America/Denver">America/Denver</option>
                    <option value="America/Chicago">America/Chicago</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="America/Caracas">America/Caracas</option>
                    <option value="America/Halifax">America/Halifax</option>
                    <option value="America/St_Johns">America/St_Johns</option>
                    <option value="America/Argentina/Buenos_Aires">America/Argentina/Buenos_Aires</option>
                    <option value="America/Sao_Paulo">America/Sao_Paulo</option>
                    <option value="Atlantic/Azores">Atlantic/Azores</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="Europe/Paris">Europe/Paris</option>
                    <option value="Europe/Istanbul">Europe/Istanbul</option>
                    <option value="Europe/Moscow">Europe/Moscow</option>
                    <option value="Asia/Dubai">Asia/Dubai</option>
                    <option value="Asia/Karachi">Asia/Karachi</option>
                    <option value="Asia/Dhaka">Asia/Dhaka</option>
                    <option value="Asia/Jakarta">Asia/Jakarta</option>
                    <option value="Asia/Shanghai">Asia/Shanghai</option>
                    <option value="Asia/Tokyo">Asia/Tokyo</option>
                    <option value="Australia/Sydney">Australia/Sydney</option>
                    <option value="Pacific/Auckland">Pacific/Auckland</option>
                </select>
                <div className='flex'>
                    <button type="button" className="bg-primaryBg text-primaryText w-fit p-2 rounded-md m-1" onClick={() => props.onEditCancel()}>Cancel</button>
                    <button type="submit" className="bg-primaryBg text-primaryText w-fit p-2 rounded-md m-1">Update</button>
                </div>
            </form>
            <ul>
                {user.habits && user.habits.map(habit => {
                    return <li className='bg-primaryBg text-primaryText rounded p-2 w-fit' key={habit._id}>
                        <p>{habit.name}</p>
                        <p>{habit.description}</p>
                        <p>{habit.why}</p>
                        <p>{habit.goal}</p>
                        <p>{habit.frequency} times a week</p>
                        {habit.reward && <p>Reward: {habit.reward}</p>}
                    </li>
                })}
            </ul>
        </section>
    )
}

ProfileEdit.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        timezone: PropTypes.string.isRequired,
        habits: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            why: PropTypes.string.isRequired,
            goal: PropTypes.string.isRequired,
            frequency: PropTypes.string.isRequired,
            reward: PropTypes.string
        }))
    }).isRequired,
    onEditCancel: PropTypes.func.isRequired,
    onEditSave: PropTypes.func.isRequired
}

export default ProfileEdit
