import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import { PlayerPropType } from './player'
import { Star } from '@material-ui/icons'

const useStyles = makeStyles({
    activeLevel: {
        textDecoration: 'underline'
    }
})

export const levels = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

export const normalDisplay = level => {
    if (level < 14) return level
    if (level === 14) return 1
    return undefined
}

const LevelDisplay = props => {
    const active = props.active || (props.player && props.player.active) || false
    const level = props.level || props.player.level || false

    const classes = useStyles()
    return <span className={active ? classes.activeLevel : null}>{normalDisplay(level) || <Star fontSize="inherit" />}</span>
}

LevelDisplay.propTypes = {
    active: PropTypes.bool,
    level: PropTypes.number,
    player: PlayerPropType
}

export { LevelDisplay }