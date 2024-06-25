import { React, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getUser } from '../util/axios'
import ProfileSummary from '../components/ProfileSummary'
import ProfileEdit from '../components/ProfileEdit'

function Profile (props) {
    const userId = props.user.user.id || ''
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        async function fetchUser () {
            try {
                const userData = await getUser(userId)
                if (userData) {
                    setUser(userData)
                } else {
                    console.log('No user data found')
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchUser()
    }, [])

    useEffect(() => {
        document.title = 'Profile | Habit Tracker'
    }, [])

    function onEditCancel () {
        setEdit(false)
    }

    function onEditSave () {
        setEdit(false)
    }

    return (
        <div className="flex flex-col rounded-md m-2 bg-secondaryBg text-secondaryText p-2 text-xl shadow-xl">
            <header className='flex justify-between '>
                <h2>Profile</h2>
                {!edit && <button className='bg-primaryBg text-primaryText rounded px-2 w-fit' onClick={() => setEdit(!edit)}>Edit</button>}
            </header>
            <main>
                {user.name && !edit && <ProfileSummary user={user} />}
                {user.name && edit && <ProfileEdit user={user} onEditCancel={onEditCancel} onEditSave={onEditSave} />}
            </main>
        </div>
    )
}

Profile.propTypes = {
    user: PropTypes.shape({
        user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            timezone: PropTypes.string.isRequired,
            email: PropTypes.string,
            name: PropTypes.string
        })
    }).isRequired
}

export default Profile
