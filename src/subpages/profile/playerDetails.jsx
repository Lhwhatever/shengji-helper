import { Box, Checkbox, Paper, Radio, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme, TextField, InputAdornment, IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useReducer, useState } from 'react'
import commonCls from '../../components/commonClasses'
import { PlayerPropType } from '../../components/player'
import { LevelDisplay } from '../../components/levels'
import { PaddedTable } from '../../components/table'
import { ProfilePropType } from '../../helper/profiles'
import { useRef } from 'react'
import { Clear } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    scoreInput: {
        minWidth: '25%',
        maxWidth: 135
    }
})

const PlayerRow = ({ player, leaderState, isLeader, setAsLeader, isDefender, setAsDefender, maxedDefenders, size }) => {
    const handleDefenderChange = event => setAsDefender(event.target.checked)

    return (<TableRow>
        <TableCell>{player.name}</TableCell>
        <TableCell align="center"><LevelDisplay player={player} /></TableCell>
        <TableCell align="center">
            {player.active &&
                <Radio color="secondary" size={size}
                    checked={isLeader} onChange={setAsLeader}
                    name="set-leader-radio"
                    disabled={leaderState === 'preset'} />}
        </TableCell>
        <TableCell align="center">
            {leaderState !== 'not set' &&
                <Checkbox color="secondary" size={size}
                    checked={isDefender} onChange={handleDefenderChange}
                    disabled={isLeader || (maxedDefenders && !isDefender)}
                />}
        </TableCell>
        <TableCell>d</TableCell>
    </TableRow>)
}


PlayerRow.propTypes = {
    player: PlayerPropType.isRequired,
    leaderState: PropTypes.oneOf(['preset', 'set', 'not set']),
    isLeader: PropTypes.bool.isRequired,
    setAsLeader: PropTypes.func.isRequired,
    isDefender: PropTypes.bool.isRequired,
    setAsDefender: PropTypes.func.isRequired,
    maxedDefenders: PropTypes.bool.isRequired,
    size: PropTypes.oneOf(['small', 'medium']).isRequired
}

const PlayerDetails = ({ profile }) => {
    const classes = { ...commonCls(), ...useStyles() }

    const tableSize = useMediaQuery(useTheme().breakpoints.up('md')) ? 'medium' : 'small'
    const [leader, setLeader] = useState(profile.leader)

    const maxDefenders = Math.floor(profile.players.length / 2)
    const [defenders, dispatchDefenders] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'init': {
                    const players = new Array(profile.players.length).fill(false)
                    players[action.key] = true
                    return { players, count: 1 }
                }
                case 'update': {
                    const players = state.players
                    players[action.key] = action.value
                    return { players, count: state.count + (action.value ? 1 : -1) }
                }
                default:
                    throw `unknown dispatcher action.type ${action.type}`
            }
        },
        { players: new Array(profile.players.length).fill(false), count: 0 }
    )

    const setAsLeaderFunc = playerId => function () {
        setLeader(playerId)
        dispatchDefenders({ type: 'init', key: playerId })
    }

    const setAsDefenderFunc = playerId => function (isDefender) {
        dispatchDefenders({ type: 'update', key: playerId, value: isDefender })
    }

    const leaderState = profile.leader === -1 ? (leader === -1 ? 'not set' : 'set') : 'preset'

    const [defenderDelta, setDefenderDelta] = useState()
    const [attackerDelta, setAttackerDelta] = useState()

    const scoreRef = useRef()
    const handleScoreChange = () => {
        if (scoreRef.current.value === '') {
            setDefenderDelta(undefined)
            setAttackerDelta(undefined)
            return
        }

        const score = Math.round(scoreRef.current.value / 5) * 5
        scoreRef.current.value = score

        const defenderMultiplier = maxDefenders - defenders.count + 1

        if (score <= 0) {
            setDefenderDelta(3 * defenderMultiplier)
            setAttackerDelta(0)
        } else {
            const steps = Math.min(Math.floor(score / 20 / profile.config.decks), 5)
            setDefenderDelta(Math.max(2 - steps, 0) * defenderMultiplier)
            setAttackerDelta(Math.max(steps - 2, 0))
        }
    }

    const handleScoreClear = () => {
        scoreRef.current.value = ''
    }

    return (<Box>
        <TableContainer component={Paper}>
            <PaddedTable size={tableSize}>
                <TableHead>
                    <TableRow>
                        <TableCell>Player</TableCell>
                        <TableCell align="center">Level</TableCell>
                        <TableCell align="center">Leader</TableCell>
                        <TableCell align="center"><Box className={classes.vContainer}>
                            <Box>Defender</Box>
                            <Box mt={-1}><Typography variant="caption">(max {maxDefenders})</Typography></Box>
                        </Box></TableCell>
                        <TableCell>Next Game</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {profile.players.map((player, i) =>
                        <PlayerRow key={i}
                            player={player}
                            isLeader={leader === i} setAsLeader={setAsLeaderFunc(i)}
                            isDefender={defenders.players[i]} setAsDefender={setAsDefenderFunc(i)}
                            leaderState={leaderState} maxedDefenders={defenders.count === maxDefenders}
                            size={tableSize}
                        />)}
                </TableBody>
            </PaddedTable>
            <Box m={2}>
                <Typography variant="h6">Round Outcome</Typography>
                {defenderDelta} {attackerDelta}
                <Box className={classes.hContainer} mt={1}>
                    <TextField variant="filled" size={tableSize} className={classes.scoreInput}
                        label="Score" type="number"
                        inputProps={{ step: 5 }}
                        inputRef={scoreRef}
                        onBlur={handleScoreChange}
                        inputProps={{ inputmode: 'numeric' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="clear score" onClick={handleScoreClear}><Clear /></IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
            </Box>
        </TableContainer>
    </Box>)
}

PlayerDetails.propTypes = {
    profile: ProfilePropType
}

export default PlayerDetails