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
import { saveProfiles, loadProfiles } from '../helper/profiles'
import DeleteDialog from '../components/deleteDialog'

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
    },
    dialogRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    capitalize: {
        textTransform: 'capitalize'
    }
}))

//[{"name":"Profile%202","uuid":"1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed","lastUsed":"2020-02-07T04:00:00.000Z","floating":0,"numOfDecks":2,"players":[["DEF",8]]},{"name":"Create%20Profile","uuid":"1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bee","lastUsed":"2020-02-07T03:00:00.000Z","floating":1,"numOfDecks":3,"players":[["DEF",3]]}]

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
    const FF = ['floating', 'fixed']
    const F1 = ['floating']

    const classes = useStyles()
    const profileNameFieldRef = useRef()
    const [numOfPlayers, setNumOfPlayers] = useState(4)
    const [partnershipModeList, setPartnershipModeList] = useState(FF)
    const [partnership, setPartnership] = useState('fixed')

    const handleNumOfPlayerChange = event => {
        setNumOfPlayers(event.target.value)
        if (event.target.value % 2) {
            setPartnershipModeList(F1)
            setPartnership('floating')
        } else setPartnershipModeList(FF)
    }

    return (<Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle>Create new profile</DialogTitle>
        <DialogContent>
            <DialogContentText>To create a new profile, fill in the following information.</DialogContentText>
            <DialogContent className={classes.createProfileDialog}>
                <TextField label="Profile Name" inputRef={profileNameFieldRef} className={classes.profileNameField} />
                <Box className={classes.dialogRow}>
                    <FormControl fullWidth>
                        <InputLabel id="new-profile-select-player-num-label">No. of Players</InputLabel>
                        <Select
                            labelId="new-profile-select-player-num-label"
                            value={numOfPlayers}
                            onChange={handleNumOfPlayerChange}
                        >
                            {range(4, 11).map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Box ml={2} />
                    <FormControl fullWidth>
                        <InputLabel id="new-profile-select-partnership-label">Partnership Format</InputLabel>
                        <Select
                            labelId="new-profile-select-partnership-label"
                            value={partnership}
                            onChange={event => setPartnership(event.target.value)}
                        >
                            {partnershipModeList.map(e => <MenuItem key={e} value={e}><span className={classes.capitalize}>{e}</span></MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
        </DialogContent>
    </Dialog>)
}


const Calculator = () => {
    const classes = useStyles()
    const [createProfileDialogOpen, setCreateProfileDialogOpen] = useState(false)
    const [deleteProfileDialogOpen, setDeleteProfileDialogOpen] = useState([null, null])
    const [profiles, profileDispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'setProfileName': {
                const i = state.findIndex(profile => profile.uuid === action.key)
                let newProfiles = state.slice()
                newProfiles[i].name = action.value
                return newProfiles;
            }
            case 'deleteProfile':
                return (action.key === '') ? [] : state.filter(profile => profile.uuid !== action.key);
            default:
                throw new Error(`Unknown action type ${action.type}`)
        }
    }, [], () => loadProfiles(window))

    useEffect(() => {
        saveProfiles(profiles, window)
    }, [profiles])

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
        <Button
            variant="contained"
            color="secondary"
            className={classes.btn}
            startIcon={<Delete />}
            onClick={() => setDeleteProfileDialogOpen(['', 'all profiles'])}
            disabled={profiles.length === 0}
        >
            Delete All
        </Button>
        <CreateProfileDialog open={createProfileDialogOpen} setOpen={setCreateProfileDialogOpen} />
        <DeleteDialog
            open={deleteProfileDialogOpen}
            setOpen={setDeleteProfileDialogOpen}
            onDelete={target => profileDispatch({ type: 'deleteProfile', key: target })}
        />
        <Box m={2}>
            {
                profiles.length ?
                    profiles.map(e => (
                        <Box mb={1} key={e.uuid}>
                            <ProfileDisplay profile={e} setProfileName={name => profileDispatch({
                                type: 'setProfileName',
                                key: e.uuid,
                                value: name
                            })} deleteProfile={() => setDeleteProfileDialogOpen([e.uuid, e.name])} />
                        </Box>
                    )) : null
            }
        </Box>
    </Layout>)
}

export default Calculator
