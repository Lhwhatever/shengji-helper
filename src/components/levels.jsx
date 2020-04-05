import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import { PlayerPropType } from './player'

const useStyles = makeStyles({
    activeLevel: {
        textDecoration: 'underline'
    }
})

export const levels = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
export const normalDisplay = {
    [2]: 2, [3]: 3, [4]: 4, [5]: 5, [6]: 6, [7]: 7, [8]: 8, [9]: 9, [10]: 10,
    [11]: 11, [12]: 12, [13]: 13, [14]: 1
}

const LevelDisplay = props => {
    const active = props.active || (props.player && props.player.active) || false
    const level = props.level || props.player.level || false

    const classes = useStyles()
    return <span className={active ? classes.activeLevel : null}>{normalDisplay[level]}</span>
}

LevelDisplay.propTypes = {
    active: PropTypes.number,
    level: PropTypes.number,
    player: PlayerPropType
}

export { LevelDisplay }