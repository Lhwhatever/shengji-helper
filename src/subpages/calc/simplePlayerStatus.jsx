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
        active: PropTypes.bool.isRequired,
        level: PropTypes.number.isRequired
    })
}

const SimplePlayerStatus = ({ partnership, players }) => {
    const classes = commonCls()

    if (partnership === 'floating') {
        return (<>
            <Typography variant="body2">
                {
                    formatList(players.map(
                        player => <>{player.name} (<LevelDisplay player={player} />)</>
                    ))
                }
            </Typography>
        </>)
    } else {
        return (<Box className={classes.vContainer}>
            <Typography variant="body2">
                Team 1 (<LevelDisplay player={players[0]} />): {formatList(players.filter((e, i) => (i % 2 === 0)).map(player => player.name))}
            </Typography>
            <Typography variant="body2">
                Team 2 (<LevelDisplay player={players[1]} />): {formatList(players.filter((e, i) => (i % 2 === 1)).map(player => player.name))}
            </Typography>
        </Box>)
    }

}

SimplePlayerStatus.propTypes = {
    partnership: PropTypes.oneOf(['fixed', 'floating']).isRequired,
    players: PropTypes.arrayOf(PropTypes.exact({
        name: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        active: PropTypes.bool.isRequired
    })).isRequired
}

export default SimplePlayerStatus