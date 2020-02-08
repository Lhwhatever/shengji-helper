import React, { useState } from 'react'
import Moment from 'react-moment'
import { Box, Button, Card, CardActions, CardContent, makeStyles, Typography, IconButton } from '@material-ui/core'
import { Add, Delete, ExpandMore, ExpandLess } from '@material-ui/icons'
import PropTypes from 'prop-types'

import Layout from '../components/layout'
import Emoji from '../components/emoji'

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

const profiles = [
    {
        name: 'Profile 1',
        lastUsed: new Date('2020-02-07T12:00:00'),
        partnership: 'fixed',
        numOfDecks: 2,
        players: [
            {
                name: 'ABC',
                level: 5,
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
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired
}

let ProfileDisplay = ({ profile, ...props }) => {
    const classes = useStyles()
    const [playerListVisibility, setPlayerListVisibility] = useState(false)

    return (<Card variant="outlined" {...props}>
        <CardContent>
            <Typography variant="h5">{profile.name}</Typography>
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
        lastUsed: PropTypes.instanceOf(Date).isRequired,
        partnership: PropTypes.oneOf(['fixed', 'floating']).isRequired,
        numOfDecks: PropTypes.number.isRequired,
        players: PropTypes.arrayOf(PropTypes.exact(SimplePlayerStatus.propTypes)).isRequired
    }).isRequired
}

const Calculator = () => {
    const classes = useStyles()

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
                    profiles.map(e => <ProfileDisplay profile={e} key={e.name} />) :
                    <Typography variant="body2">No profiles to display!</Typography>
            }
        </Box>
    </Layout>)
}

export default Calculator
