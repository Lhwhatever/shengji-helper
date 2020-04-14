import { Box, Paper, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { LevelDisplay } from '../../../components/levels'
import { PlayerPropType } from '../../../components/player'
import { DarkTableHead, HighlightableRow, PaddedTable } from '../../../components/table'
import { HistoryPropType, ProfilePropType } from '../../../helper/profiles'

const RoundRow = ({ roundNum, round }) => (<TableRow>
    <TableCell align="center">{roundNum + 1}</TableCell>
    {round.playerLevels.map((level, i) => (<TableCell align="center" key={i}>
        <LevelDisplay level={level.level} active={level.active} />{round.leader === i && <sup>L</sup>}
    </TableCell>))}
    <TableCell align="center">{round.score === undefined ? '-' : round.score}</TableCell>
</TableRow>)

RoundRow.propTypes = {
    roundNum: PropTypes.number.isRequired,
    round: HistoryPropType.isRequired
}

const PresentRoundRow = ({ players }) => (<HighlightableRow highlight={1}>
    <TableCell align="center">Now</TableCell>
    {players.map(player => <TableCell align="center" key={player.name}><LevelDisplay player={player} /></TableCell>)}
    <TableCell></TableCell>
</HighlightableRow>)

PresentRoundRow.propTypes = {
    players: PropTypes.arrayOf(PlayerPropType).isRequired
}

const GameHistory = ({ profile }) => {
    const tableSize = 'small'

    return (<Paper><Box p={2}>
        <Typography variant="h5">History</Typography>
        <TableContainer component={Paper} variant="outlined">
            <PaddedTable size={tableSize}>
                <DarkTableHead>
                    <TableRow>
                        <TableCell align="center" color="inherit">Round</TableCell>
                        {profile.players.map(player => <TableCell key={player.name} align="center">{player.name}</TableCell>)}
                        <TableCell align="center">Score</TableCell>
                    </TableRow>
                </DarkTableHead>
                <TableBody>
                    {profile.history.map((round, i) => <RoundRow key={i} round={round} roundNum={i} />)}
                    <PresentRoundRow players={profile.players} />
                </TableBody>
            </PaddedTable>
        </TableContainer>
    </Box> </Paper>)

}

GameHistory.propTypes = {
    profile: ProfilePropType
}

export default GameHistory