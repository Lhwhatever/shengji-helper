import { Box, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Layout from '../components/layout'
import { ButtonLink } from '../components/links'
import { loadProfiles } from '../helper/profiles'

const activeProfileStorageKey = 'shengji-helper-active'
const redirectTo = (window, dest) => window.location.replace(dest)

const useStyles = makeStyles(() => ({
    loadingGrid: {
        height: '100vh'
    },
    profileHeaderTextBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
}))

const Loading = () => {
    const classes = useStyles()

    return (<Grid container justify="center" spacing={1} alignItems="center" direction="column" className={classes.loadingGrid}>
        <Grid item xs={12}><CircularProgress color="secondary" /></Grid>
        <Grid item xs={12}><Typography variant="body2">Loading...</Typography></Grid>
    </Grid>)
}

const ProfileHeader = ({ profile }) => {
    const classes = useStyles()

    return (<Header>
        <ButtonLink color="inherit" startIcon={<ChevronLeft />} to="/calc">Back</ButtonLink>
        <Box ml={3} className={classes.profileHeaderTextBox}>
            <Typography variant="h6">{profile.name}</Typography>
            <Box ml={2} />
            <Typography variant="body2">({profile.config.decks} decks, {profile.players.length} players)</Typography>
        </Box>
    </Header>)
}


ProfileHeader.propTypes = {
    profile: PropTypes.object
}


const Profile = ({ location }) => {

    const [uuid, setUuid] = useState()
    const [profileList, setProfileList] = useState()
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


    return (<Layout header={<ProfileHeader profile={profileList && profileList[uuid]} />}>
        {profileList ?
            <Box>
                <Typography variant="body2">Placeholder</Typography>
            </Box> : <Loading />
        }
    </Layout>)
}

Profile.propTypes = {
    location: PropTypes.object
}

export default Profile