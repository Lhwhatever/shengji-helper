import { Box, Checkbox, TableCell, TableRow } from '@material-ui/core'
import { Star } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { LevelDisplay } from '../../../components/levels'
import { PlayerPropType } from '../../../components/player'

const useStyles = makeStyles(theme => ({
    scoreInput: {
        minWidth: '25%',
        maxWidth: 135
    },
    outcomeBox: {
        flex: 2,
        padding: theme.spacing(1)
    },
    benefit: {
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    cost: {
        color: theme.palette.secondary.main,
        fontWeight: 'bold'
    },
    victory: {
        display: 'flex',
        alignItems: 'center'
    }
}))

const PlayerRow = props => {
    const handleDefenderChange = event => props.setAsDefender(event.target.checked)

    return (<TableRow>
        <TableCell>{props.player.name}</TableCell>
        <TableCell align="center"><LevelDisplay player={props.player} /></TableCell>
        <TableCell align="center">
            {props.leaderState !== 'not set' &&
                <Checkbox color="secondary" size={props.size}
                    checked={props.isDefender} onChange={handleDefenderChange}
                    disabled={props.isLeader || (props.maxedDefenders && !props.isDefender)}
                />}
        </TableCell>
        <TableCell>
            {props.delta === undefined ? '' : (props.newLevel.level > 14 ? <Victory size={props.size} /> : <>
                <LevelDisplay level={props.newLevel.level} active={props.newLevel.active} />{' '}
                {props.delta > 1 && <Benefit>{props.player.active ? `+${props.delta}` : `↑${props.delta - 1}`}</Benefit>}
                {props.delta === 1 && <Benefit>{props.player.active ? '+1' : '↑'}</Benefit>}
                {props.delta === 0 && props.player.active && <Cost>↓</Cost>}
            </>)}
        </TableCell>
    </TableRow>)
}


PlayerRow.propTypes = {
    size: PropTypes.oneOf(['small', 'medium']).isRequired,
    player: PlayerPropType.isRequired,
    leaderState: PropTypes.oneOf(['preset', 'set', 'not set']),
    isLeader: PropTypes.bool.isRequired,
    isDefender: PropTypes.bool.isRequired,
    setAsDefender: PropTypes.func.isRequired,
    maxedDefenders: PropTypes.bool.isRequired,
    newLevel: PropTypes.exact({ level: PropTypes.number.isRequired, active: PropTypes.bool.isRequired }),
    delta: PropTypes.number
}

const Benefit = ({ children }) => {
    const classes = useStyles()
    return <span className={classes.benefit}>({children})</span>
}

Benefit.propTypes = { children: PropTypes.node.isRequired }

const Cost = ({ children }) => {
    const classes = useStyles()
    return <span className={classes.cost}>({children})</span>
}

Cost.propTypes = { children: PropTypes.node.isRequired }

const Victory = ({ size }) => {
    const classes = useStyles()
    return <Box className={classes.victory}><Star fontSize={size || 'small'} /><Box component="span" ml={0.25} mt={0.25}>Victory</Box></Box>
}

Victory.propTypes = { size: PropTypes.oneOf(['small', 'medium']) }

export default PlayerRow
export { Benefit, Cost }

