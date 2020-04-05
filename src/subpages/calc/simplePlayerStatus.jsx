import { Box, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import commonCls from '../../components/commonClasses'
import { LevelDisplay } from '../../components/levels'
import { PlayerPropType } from '../../components/player'

const formatList = array => array.reduce((a, e) => (a === null ? [e] : [...a, ', ', e]), null)

const fixedPlayerNameList = (players, teamId, leaderId) =>
    players.map((player, i) => `${player.name}${(leaderId === i) ? ' (Leader)' : ''}`).filter((_, i) => (i % 2 === teamId))

const SimplePlayerStatus = ({ partnership, players, leader }) => {
    const classes = commonCls()

    if (partnership === 'floating') {
        return (<>
            <Typography variant="body2">
                {
                    formatList(players.map(
                        (player, i) => <span key={i}>{player.name} (<LevelDisplay player={player} />{i === leader ? ', Leader' : ''})</span>
                    ))
                }
            </Typography>
        </>)
    } else {
        return (<Box className={classes.vContainer}>
            <Typography variant="body2">
                Team 1 (<LevelDisplay player={players[0]} />): {formatList(fixedPlayerNameList(players, 0, leader))}
            </Typography>
            <Typography variant="body2">
                Team 2 (<LevelDisplay player={players[1]} />): {formatList(fixedPlayerNameList(players, 1, leader))}
            </Typography>
        </Box>)
    }

}


SimplePlayerStatus.propTypes = {
    partnership: PropTypes.oneOf(['fixed', 'floating']).isRequired,
    players: PropTypes.arrayOf(PlayerPropType).isRequired,
    leader: PropTypes.number.isRequired
}

export default SimplePlayerStatus