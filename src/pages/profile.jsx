import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { loadProfiles } from '../helper/profiles'

const activeProfileStorageKey = 'shengji-helper-active'
const redirectTo = (window, dest) => window.location.replace(dest)

const Profile = () => {
    const [profile, setProfile] = useState()
    useEffect(() => {
        const uuid = window.localStorage.getItem(activeProfileStorageKey)
        if (uuid === null) redirectTo(window, '/calc')

        let profileFound = false
        const profiles = loadProfiles(window)
        for (let profile of profiles) {
            if (profile.uuid === uuid) {
                setProfile(profile)
                profileFound = true
                break
            }
        }

        if (!profileFound) redirectTo(window, '/calc')
    }, [])


    return (<Layout>
        {profile.name}
    </Layout>)
}

export default Profile