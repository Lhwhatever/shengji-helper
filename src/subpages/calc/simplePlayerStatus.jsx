import React from 'react'
import PropTypes from 'prop-types'

import commonCls from '../../components/commonClasses'
import { Typography, Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    activeLevel: {
        textDecoration: 'underline'
    }
})

const formatList = array => array.reduce((a, e) => (a === null ? [e] : [...a, ', ', e]), null)

const LevelDisplay = props => {
    const active = props.active || props.player.active || false
    const level = props.level || props.player.level || false

    const classes = useStyles()
    return <span className={active ? classes.activeLevel : null}>{level}</span>
}

LevelDisplay.propTypes = {
    active: PropTypes.bool,
    level: PropTypes.number,
    player: PropTypes.exact({
        active: PropTypes.number.isRequired,
        level: PropTypes.number.isRequired
    })
}

const fixedPlayerNameList = (players, teamId) =>
    players.filter((_, i) => (i & 2 === teamId)).map(player => `${player.name}${(player.active & 0b10) ? ' (Leader)' : ''}`)

const SimplePlayerStatus = ({ partnership, players }) => {
    const classes = commonCls()

    if (partnership === 'floating') {
        return (<>
            <Typography variant="body2">
                {
                    formatList(players.map(
                        player => <>{player.name} (<LevelDisplay player={player} />{(player.active & 0b10) ? ', Leader' : ''})</>
                    ))
                }
            </Typography>
        </>)
    } else {
        return (<Box className={classes.vContainer}>
            <Typography variant="body2">
                Team 1 (<LevelDisplay player={players[0]} />): {formatList(fixedPlayerNameList(players, 0))}
            </Typography>
            <Typography variant="body2">
                Team 2 (<LevelDisplay player={players[1]} />): {formatList(fixedPlayerNameList(players, 1))}
            </Typography>
        </Box>)
    }

}

SimplePlayerStatus.propTypes = {
    partnership: PropTypes.oneOf(['fixed', 'floating']).isRequired,
    players: PropTypes.arrayOf(PropTypes.exact({
        name: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        active: PropTypes.number.isRequired
    })).isRequired
}

export default SimplePlayerStatus