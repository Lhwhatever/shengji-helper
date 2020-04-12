import { Box, makeStyles, Typography } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useEffect, useReducer, useState } from 'react'
import Header from '../components/header'
import Layout from '../components/layout'
import { ButtonLink } from '../components/links'
import Loading from '../components/loading'
import { loadProfiles, ProfilePropType, saveProfiles } from '../helper/profiles'
import ProfileContent from '../subpages/profile/content'

const activeProfileStorageKey = 'shengji-helper-active'
const redirectTo = (window, dest) => window.location.replace(dest)

const useStyles = makeStyles({
    profileHeaderTextBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
})


const ProfileHeader = ({ profile }) => {
    const classes = useStyles()

    return (<Header>
        <ButtonLink color="inherit" startIcon={<ChevronLeft />} to="/calc">Back</ButtonLink>
        {profile && <Box ml={3} className={classes.profileHeaderTextBox}>
            <Typography variant="h6">{profile.name}</Typography>
            <Box ml={2} />
            <Typography variant="body2">({profile.config.decks} decks, {profile.players.length} players)</Typography>
        </Box>}
    </Header>)
}


ProfileHeader.propTypes = {
    profile: ProfilePropType
}

const Profile = ({ location }) => {
    const [uuid, setUuid] = useState()
    const [profileList, profileListDispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'init':
                return action.value
            case 'update':
                return { ...state, [uuid]: { ...action.value, lastUsed: new Date() } }
            default:
                throw `unknown profileListDispatch action.type ${action.type}`
        }
    }, {})

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
        profileListDispatch({ type: 'init', value: profiles })
    }, [])

    useEffect(() => {
        saveProfiles(profileList, window)
    }, [profileList])

    const handleProfileUpdate = profile => profileListDispatch({
        type: 'update',
        value: profile
    })

    return (<Layout header={<ProfileHeader profile={profileList && profileList[uuid]} />}>
        {(profileList && profileList[uuid]) ?
            <ProfileContent profile={profileList[uuid]} onUpdate={handleProfileUpdate} /> : <Loading />}
    </Layout>)
}

Profile.propTypes = {
    location: PropTypes.object
}

export default Profile