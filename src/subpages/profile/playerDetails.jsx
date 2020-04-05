import { Box, Checkbox, Paper, Radio, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useReducer, useState } from 'react'
import commonCls from '../../components/commonClasses'
import { LevelDisplay, PlayerPropType } from '../../components/player'
import { PaddedTable } from '../../components/table'
import { ProfilePropType } from '../../helper/profiles'

const PlayerRow = ({ player, leaderState, isLeader, setAsLeader, isDefender, setAsDefender, maxedDefenders, size }) => {
    const handleDefenderChange = event => setAsDefender(event.target.checked)

    return (<TableRow>
        <TableCell>{player.name}</TableCell>
        <TableCell><LevelDisplay player={player} /></TableCell>
        <TableCell>
            {player.active &&
                <Radio color="primary" size={size}
                    checked={isLeader} onChange={setAsLeader}
                    name="set-leader-radio"
                    disabled={leaderState === 'preset'} />}
        </TableCell>
        <TableCell>
            {leaderState !== 'not set' &&
                <Checkbox color="primary" size={size}
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
    const classes = commonCls()

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

    return (<Box>
        <TableContainer component={Paper}>
            <PaddedTable size={tableSize}>
                <TableHead>
                    <TableRow>
                        <TableCell>Player</TableCell>
                        <TableCell>Level</TableCell>
                        <TableCell>Leader</TableCell>
                        <TableCell><Box className={classes.vContainer}>
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
            <Typography variant="h6">Hello</Typography>
        </TableContainer>
    </Box>)
}

PlayerDetails.propTypes = {
    profile: ProfilePropType
}

export default PlayerDetails