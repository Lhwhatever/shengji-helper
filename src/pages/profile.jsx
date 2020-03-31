import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { loadProfiles } from '../helper/profiles'
import { Typography } from '@material-ui/core'

const activeProfileStorageKey = 'shengji-helper-active'
const redirectTo = (window, dest) => window.location.replace(dest)

const Profile = ({ location }) => {
    const [uuid, setUuid] = useState()
    const [, setProfileList] = useState()
    useEffect(() => {
        if (location && location.state && location.state.uuid)
            window.localStorage.setItem(activeProfileStorageKey, location.state.uuid)

        const uuid = window.localStorage.getItem(activeProfileStorageKey)
        if (!uuid) {
            redirectTo(window, '/calc')
            return
        }
        setUuid(uuid)

        const profiles = loadProfiles(window)
        if (!profiles[uuid]) {
            redirectTo(window, '/calc')
            return
        }
        setProfileList(profiles)
    }, [])


    return (<Layout>
        {uuid}
    </Layout>)
}

Profile.propTypes = {
    location: PropTypes.object
}

export default Profile