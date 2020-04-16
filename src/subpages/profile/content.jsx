import PropTypes from 'prop-types'
import React from 'react'
import { ProfilePropType } from '../../helper/profiles'
import FixedGameHistory from './fixed/gameHistory'
import FixedPlayerDetails from './fixed/playerDetails'
import FloatingGameHistory from './floating/gameHistory'
import FloatingPlayerDetails from './floating/playerDetails'
import { Paper, Box, Typography, TextField, Button, makeStyles, MenuItem } from '@material-ui/core'
import commonCls from '../../components/commonClasses'
import { useState } from 'react'
import { navigate } from 'gatsby'

const useStyles = makeStyles({
    roundNumField: { width: 135 }
})

const ProfileContent = ({ profile, onUpdate }) => {
    const classes = { ...commonCls(), ...useStyles() }

    const [revertRoundNum, setRevertRoundNum] = useState(profile.history.length ? profile.history.length - 1 : '')

    const handleRevert = () => {
        setRevertRoundNum(revertRoundNum ? revertRoundNum - 1 : '')
        onUpdate({
            ...profile,
            players: profile.players.map((player, i) => (
                { name: player.name, ...profile.history[revertRoundNum].playerLevels[i] }
            )),
            leader: profile.partnership === 'floating' ? -1 : profile.history[revertRoundNum].leader,
            victors: [],
            history: profile.history.filter((_, i) => i < revertRoundNum)
        })
        navigate('/profile')
    }

    const handleNewRound = ({ score, leader, nextLeader, playerLevels, newPlayerLevels, victors }) => {
        onUpdate({
            ...profile,
            players: profile.players.map((player, i) => ({
                name: player.name, ...newPlayerLevels[i]
            })),
            victors: victors || profile.victors,
            leader: nextLeader,
            history: [...profile.history, { score, leader, playerLevels }]
        })
    }

    return (<>
        {profile.victors.length > 0 || React.createElement(
            profile.partnership === 'floating' ? FloatingPlayerDetails : FixedPlayerDetails,
            { profile, onNewRound: handleNewRound, mb: 2, tableSize: 'small' }
        )}
        <Paper><Box p={2}>
            <Typography variant="h5">Game History</Typography>
            {React.createElement(
                profile.partnership === 'floating' ? FloatingGameHistory : FixedGameHistory,
                { profile, tableSize: 'small', onRevert: handleRevert }
            )}
            <Box className={classes.hContainer} mt={2}>
                <Box className={classes.hExpand} />
                <TextField select variant="outlined" size="small" className={classes.roundNumField}
                    disabled={revertRoundNum === ''}
                    label="Round No."
                    value={revertRoundNum} onChange={event => setRevertRoundNum(event.target.value)}
                >{[...new Array(profile.history.length)].map((_, i) => (
                    <MenuItem key={i} value={i}>{i + 1}</MenuItem>
                ))}</TextField>
                <Box mx={1} />
                <Button variant="outlined" onClick={handleRevert} disabled={revertRoundNum === ''}>Revert</Button>
            </Box>
        </Box></Paper>
    </>)
}

ProfileContent.propTypes = {
    profile: ProfilePropType.isRequired,
    onUpdate: PropTypes.func.isRequired
}

export default ProfileContent