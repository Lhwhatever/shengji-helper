import { Box, CircularProgress, Grid, makeStyles, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Layout from '../components/layout'
import { ButtonLink } from '../components/links'
import { PlayerPropType, LevelDisplay } from '../components/player'
import { PaddedTable } from '../components/table'
import { loadProfiles } from '../helper/profiles'
import ProfileDisplay from '../subpages/calc/profileDisplay'

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
        {profile && <Box ml={3} className={classes.profileHeaderTextBox}>
            <Typography variant="h6">{profile.name}</Typography>
            <Box ml={2} />
            <Typography variant="body2">({profile.config.decks} decks, {profile.players.length} players)</Typography>
        </Box>}
    </Header>)
}


ProfileHeader.propTypes = {
    profile: ProfileDisplay.propTypes.profile
}

const PlayerRow = ({ player }) => (<TableRow>
    <TableCell>{player.name}</TableCell>
    <TableCell><LevelDisplay player={player} /></TableCell>
    <TableCell>c</TableCell>
    <TableCell>d</TableCell>
</TableRow>)

PlayerRow.propTypes = {
    player: PlayerPropType.isRequired
}


const Profile = ({ location }) => {
    const [uuid, setUuid] = useState()
    const [profileList, setProfileList] = useState()
    const tableSize = useMediaQuery(useTheme().breakpoints.up('md')) ? 'medium' : 'small'

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
        {(profileList && profileList[uuid]) ?
            <Box>
                <TableContainer component={Paper}>
                    <PaddedTable size={tableSize}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Player</TableCell>
                                <TableCell>Level</TableCell>
                                <TableCell>Leader</TableCell>
                                <TableCell>New Level</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {profileList[uuid].players.map((player, i) => <PlayerRow key={i} player={player} />)}
                        </TableBody>
                    </PaddedTable>
                </TableContainer>
            </Box> : <Loading />
        }
    </Layout>)
}

Profile.propTypes = {
    location: PropTypes.object
}

export default Profile