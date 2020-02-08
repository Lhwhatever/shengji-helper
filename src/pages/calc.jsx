import React, { useReducer, useState } from 'react'
import Moment from 'react-moment'
import { Box, Button, Card, CardActions, CardContent, makeStyles, Typography, IconButton, TextField } from '@material-ui/core'
import { Add, Delete, Done, Edit, ExpandMore, ExpandLess } from '@material-ui/icons'
import PropTypes from 'prop-types'

import Layout from '../components/layout'
import Emoji from '../components/emoji'
import { useRef } from 'react'
import { useEffect } from 'react'

const useStyles = makeStyles(theme => ({
    btn: {
        margin: theme.spacing(1)
    },
    capitalized: {
        textTransform: 'capitalize'
    },
    cardRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    invisible: {
        opacity: 0
    },
    activeLevel: {
        textDecoration: 'underline'
    }
}))

const testProfiles = [
    {
        name: 'Profile 2',
        lastUsed: new Date('2020-02-07T12:00:00'),
        partnership: 'fixed',
        numOfDecks: 2,
        uuid: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        players: [
            {
                name: 'ABC',
                level: 5,
                active: true
            }
        ]
    },
    {
        name: 'Create Profile',
        lastUsed: new Date('2020-02-07T11:00:00'),
        partnership: 'floating',
        numOfDecks: 3,
        uuid: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bee',
        players: [
            {
                name: 'DEF',
                level: 2,
                active: true
            }
        ]
    }
]

let SimplePlayerStatus = ({ player }) => {
    const classes = useStyles()

    return (<>
        {player.name} (<Box component="span" className={player.active ? classes.activeLevel : null}>{player.level}</Box>)
    </>)
}

SimplePlayerStatus.propTypes = {
    player: PropTypes.exact({
        name: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        active: PropTypes.bool.isRequired
    })
}

let ProfileDisplay = ({ profile, setProfileName, ...props }) => {
    const classes = useStyles()
    const [profileNameEditMode, setProfileNameEditMode] = useState(false)
    const [playerListVisibility, setPlayerListVisibility] = useState(false)

    const profileNameFieldRef = useRef()

    const beginEditingProfileName = () => {
        profileNameFieldRef.current = profile.name
        setProfileNameEditMode(true)
    }

    const doneEditingProfileName = () => {
        setProfileName(profileNameFieldRef.current.value)
        setProfileNameEditMode(false)
    }

    return (<Card variant="outlined" {...props}>
        <CardContent>
            {
                profileNameEditMode ?
                    <Box className={classes.cardRow} mb={2}>
                        <TextField label="Profile Name" inputRef={profileNameFieldRef} defaultValue={profile.name}></TextField>
                        <Box ml={1}><IconButton aria-label="done" size="small" onClick={doneEditingProfileName}>
                            <Done />
                        </IconButton></Box>
                    </Box> :
                    <Box className={classes.cardRow}>
                        <Typography variant="h5" mr={1}>{profile.name}</Typography>
                        <Box ml={1}><IconButton aria-label="edit" size="small" onClick={beginEditingProfileName}>
                            <Edit />
                        </IconButton></Box>
                    </Box>
            }
            <Box className={classes.cardRow}>
                <Emoji code="watch" mr={1} />
                <Typography variant="body2"><Moment local format="DD MMM YYYY, HH:mm">{profile.lastUsed}</Moment></Typography>
            </Box>
            <Box className={classes.cardRow}>
                <Emoji code="flower_playing_cards" mr={1} />
                <Typography variant="body2">{profile.numOfDecks} decks</Typography>
            </Box>
            <Box className={classes.cardRow}>
                <Emoji code="busts_in_silhouette" mr={1} />
                <Typography variant="body2">{profile.players.length} players ({profile.partnership} partnership)</Typography>
                <Box ml={1}>
                    {
                        playerListVisibility ?
                            <IconButton aria-label="collapse" size="small" onClick={() => setPlayerListVisibility(false)}>
                                <ExpandLess />
                            </IconButton> :
                            <IconButton aria-label="expand" size="small" onClick={() => setPlayerListVisibility(true)}>
                                <ExpandMore />
                            </IconButton>
                    }
                </Box>
            </Box>
            {
                playerListVisibility && <Box className={classes.cardRow}>
                    <Emoji code="busts_in_silhouette" mr={1} className={classes.invisible} />
                    <Typography variant="body2">{
                        profile.players
                            .map(e => <SimplePlayerStatus key={e.name} player={e} />)
                            .reduce((a, e) => (a === null ? [e] : [...a, ', ', e]), null)
                    }</Typography>
                </Box>
            }
        </CardContent>
        <CardActions>
            <IconButton aria-label="delete"><Delete /></IconButton>
        </CardActions>
    </Card>)
}

ProfileDisplay.propTypes = {
    profile: PropTypes.exact({
        name: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
        lastUsed: PropTypes.instanceOf(Date).isRequired,
        partnership: PropTypes.oneOf(['fixed', 'floating']).isRequired,
        numOfDecks: PropTypes.number.isRequired,
        players: PropTypes.arrayOf(PropTypes.exact(SimplePlayerStatus.propTypes.player)).isRequired
    }).isRequired,
    setProfileName: PropTypes.func
}

const Calculator = () => {
    const classes = useStyles()
    const [profiles, profileDispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'setProfileName':
                const i = state.findIndex(profile => profile.uuid === action.key)
                let profiles = state.slice()
                profiles[i].name = action.value
                return profiles;
            case 'setProfiles':
                return action.value;
            default:
                throw new Error(`Unknown action type ${action.type}`)
        }
    }, [])

    useEffect(() => {
        profileDispatch({ type: 'setProfiles', value: testProfiles })
    })

    return (<Layout>
        <Typography variant="h4">Calculator</Typography>
        <Typography variant="body2">Select a profile below:</Typography>
        <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            startIcon={<Add />}
        >Create Profile</Button>
        <Box m={2}>
            {
                profiles.length ?
                    profiles.map(e => (
                        <Box mb={1} key={e.uuid}>
                            <ProfileDisplay profile={e} setProfileName={name => profileDispatch({
                                type: 'setProfileName',
                                key: e.uuid,
                                value: name
                            })} />
                        </Box>
                    )) :
                    <Typography variant="body2">No profiles to display!</Typography>
            }
        </Box>
    </Layout>)
}

export default Calculator
