import { Box, Card, CardActions, CardContent, FormControl, IconButton, Input, InputAdornment, InputLabel, makeStyles, Typography } from '@material-ui/core'
import { Delete, Done, Edit, ExpandLess, ExpandMore } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import Moment from 'react-moment'

import commonCls from '../../components/commonClasses'
import Emoji from '../../components/emoji'
import SimplePlayerStatus from './simplePlayerStatus'


const useStyles = makeStyles(theme => ({
    profileNameField: {
        marginBottom: theme.spacing(2),
        width: 400
    },
    cardRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
}))

const ProfileDisplay = ({ profile, setProfileName, deleteProfile, ...props }) => {
    const classes = { ...commonCls(), ...useStyles() }
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
                    <SimplePlayerStatus players={profile.players} partnership={profile.partnership} />
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
        players: SimplePlayerStatus.propTypes.players
    }).isRequired,
    setProfileName: PropTypes.func
}

export default ProfileDisplay