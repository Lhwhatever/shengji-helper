import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
    activeLevel: {
        textDecoration: 'underline'
    }
})

const LevelDisplay = props => {
    const active = props.active || props.player.active || false
    const level = props.level || props.player.level || false

    const classes = useStyles()
    return <span className={active ? classes.activeLevel : null}>{level}</span>
}

const PlayerPropType = PropTypes.exact({
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired
})

LevelDisplay.propTypes = {
    active: PropTypes.number,
    level: PropTypes.number,
    player: PlayerPropType
}

export { LevelDisplay, PlayerPropType }