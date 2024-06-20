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
                console.log(userId)
                const userData = await getUser(userId)
                if (userData) {
                    console.log(userData)
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

    function onEditCancel () {
        setEdit(false)
    }

    return (
        <div className="flex flex-col rounded-md m-2 bg-secondaryBg text-secondaryText p-2 text-xl shadow-xl">
            <header className='flex justify-between '>
                <h2>Profile</h2>
                <button className='bg-primaryBg text-primaryText rounded px-2 w-fit' onClick={() => setEdit(!edit)}>{edit ? 'Save' : 'Edit'}</button>
            </header>
            <main>
                {user.name && !edit && <ProfileSummary user={user} />}
                {user.name && edit && <ProfileEdit user={user} onEditCancel={onEditCancel} />}
            </main>
        </div>
    )
}

Profile.propTypes = {
    user: PropTypes.shape({
        user: PropTypes.shape({
            timezone: PropTypes.string.isRequired,
            email: PropTypes.string,
            name: PropTypes.string
        })
    }).isRequired
}

export default Profile
