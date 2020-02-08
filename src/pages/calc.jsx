import React, { useReducer, useState } from 'react'
import Moment from 'react-moment'
import {
    Box, Button, FormControl, Input, Card, CardActions, CardContent, makeStyles,
    Typography, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogContentText,
    InputAdornment, InputLabel, Select, MenuItem
} from '@material-ui/core'
import { Add, Delete, Done, Edit, ExpandMore, ExpandLess } from '@material-ui/icons'
import PropTypes from 'prop-types'

import Layout from '../components/layout'
import Emoji from '../components/emoji'
import { useRef } from 'react'
import { useEffect } from 'react'
import range from '../helper/range'

const useStyles = makeStyles(theme => ({
    btn: {
        margin: theme.spacing(1)
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
    },
    profileNameField: {
        marginBottom: theme.spacing(2),
        width: 400
    },
    createProfileDialog: {
        display: 'flex',
        flexDirection: 'column'
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

let ProfileDisplay = ({ profile, setProfileName, deleteProfile, ...props }) => {
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
                    <FormControl className={classes.profileNameField}>
                        <InputLabel htmlFor={`profile-name-field-${profile.uuid}`}>Profile Name</InputLabel>
                        <Input
                            id={`profile-name-field-${profile.uuid}`}
                            inputRef={profileNameFieldRef}
                            defaultValue={profile.name}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="done" onClick={doneEditingProfileName}>
                                        <Done />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl> :
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
            <IconButton aria-label="delete" size="small" onClick={deleteProfile}><Delete /></IconButton>
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
        players: PropTypes.arrayOf(SimplePlayerStatus.propTypes.player).isRequired
    }).isRequired,
    setProfileName: PropTypes.func
}

const CreateProfileDialog = ({ open, setOpen, createProfile }) => {
    const classes = useStyles()
    const profileNameFieldRef = useRef()
    const [numOfPlayers, setNumOfPlayers] = useState()
    const [partnership, setPartnership] = useState()

    return (<Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle>Create new profile</DialogTitle>
        <DialogContent>
            <DialogContentText>To create a new profile, fill in the following information.</DialogContentText>
            <DialogContent className={classes.createProfileDialog}>
                <TextField label="Profile Name" inputRef={profileNameFieldRef} className={classes.profileNameField} />
                <FormControl>
                    <InputLabel id="new-profile-select-player-num-label">No. of Players</InputLabel>
                    <Select
                        labelId="new-profile-select-player-num-label"
                        inputRef={numOfPlayers}
                        value={numOfPlayers}
                        onChange={setNumOfPlayers}
                    >
                        {range(4, 10).map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl>

                </FormControl>
            </DialogContent>
        </DialogContent>
    </Dialog >)
}

const Calculator = () => {
    const classes = useStyles()
    const [createProfileDialogOpen, setCreateProfileDialogOpen] = useState(false)
    const [profiles, profileDispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'setProfileName':
                const i = state.findIndex(profile => profile.uuid === action.key)
                let profiles = state.slice()
                profiles[i].name = action.value
                return profiles;
            case 'setProfiles':
                return action.value;
            case 'deleteProfile':
                return state.filter(profile => profile.uuid !== action.key);
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
            onClick={() => setCreateProfileDialogOpen(true)}
        >Create Profile</Button>
        <CreateProfileDialog open={createProfileDialogOpen} setOpen={setCreateProfileDialogOpen} />
        <Box m={2}>
            {
                profiles.length ?
                    profiles.map(e => (
                        <Box mb={1} key={e.uuid}>
                            <ProfileDisplay profile={e} setProfileName={name => profileDispatch({
                                type: 'setProfileName',
                                key: e.uuid,
                                value: name
                            })} deleteProfile={() => profileDispatch({
                                type: 'deleteProfile',
                                key: e.uuid
                            })} />
                        </Box>
                    )) :
                    <Typography variant="body2">No profiles to display!</Typography>
            }
        </Box>
    </Layout>)
}

export default Calculator
