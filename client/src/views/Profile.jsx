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
        <div className="flex flex-col rounded-md m-2 p-2 bg-colorBg text-colorText">
            <header className='flex justify-between'>
                <h2 className='text-2xl'>My Profile</h2>
            </header>
            <main>
                {user.name && !edit && <ProfileSummary user={user} onEditClick={() => setEdit(!edit)} />}
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
