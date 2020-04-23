import { Box, makeStyles, Typography, IconButton, TextField, withStyles } from '@material-ui/core'
import { ChevronLeft, Edit, Done } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useEffect, useReducer, useState } from 'react'
import Header from '../components/header'
import Layout from '../components/layout'
import { ButtonLink } from '../components/links'
import Loading from '../components/loading'
import { loadProfiles, ProfilePropType, saveProfiles } from '../helper/profiles'
import ProfileContent from '../subpages/profile/content'
import { blueGrey } from '@material-ui/core/colors'

const activeProfileStorageKey = 'shengji-helper-active'
const redirectTo = (window, dest) => window.location.replace(dest)

const useStyles = makeStyles({
    profileHeaderTextBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
})

const ProfileNameField = withStyles(theme => ({
    root: {
        '& input': {
            color: theme.palette.primary.contrastText
        },
        '& label, & label.Mui-focused': {
            color: blueGrey[300]
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset, &:hover fieldset, &.Mui-focused fieldset': {
                borderColor: blueGrey[700]
            }
        },
        '& button': {
            color: blueGrey[300]
        }
    }
}))(TextField)

const ProfileHeader = ({ profile, onProfileNameChange, ...props }) => {
    const classes = useStyles()

    const [nameField, setNameField] = useState(null)

    const handleStartEdit = () => setNameField(profile.name)
    const handleEndEdit = () => {
        onProfileNameChange(nameField)
        setNameField(null)
    }
    const handleNameChange = event => setNameField(event.target.value)

    return (<Header {...props}>
        <ButtonLink color="inherit" startIcon={<ChevronLeft />} to="/calc">Back</ButtonLink>
        {profile && <Box ml={3} className={classes.profileHeaderTextBox}>
            {nameField === null ? (<>
                <Typography variant="h6">{profile.name} </Typography>
                <IconButton aria-label="edit" color="inherit" onClick={handleStartEdit}><Edit /></IconButton>
            </>) : (<ProfileNameField variant="outlined" size="small" label="Profile Name" value={nameField} InputProps={{
                endAdornment: (<IconButton size="small" color="inherit" onClick={handleEndEdit}><Done size="inherit" /></IconButton>)
            }} onChange={handleNameChange} />)}
            <Box ml={1} />
            <Typography variant="body2">({profile.config.decks} decks, {profile.players.length} players)</Typography>
        </Box>}
    </Header>)
}


ProfileHeader.propTypes = {
    profile: ProfilePropType,
    onProfileNameChange: PropTypes.func.isRequired
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

    const handleProfileNameChange = name => handleProfileUpdate({
        ...profileList[uuid], name
    })

    return (<Layout
        header={ProfileHeader} headerProps={{
            profile: profileList && profileList[uuid],
            onProfileNameChange: handleProfileNameChange
        }}>
        {(profileList && profileList[uuid]) ?
            <ProfileContent profile={profileList[uuid]} onUpdate={handleProfileUpdate} /> : <Loading />}
    </Layout>)
}

Profile.propTypes = {
    location: PropTypes.object
}

export default Profile