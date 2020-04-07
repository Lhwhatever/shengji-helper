import { Box, Checkbox, IconButton, InputAdornment, Paper, Radio, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery, useTheme, Button } from '@material-ui/core'
import { Clear, Star, ChevronRight } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import React, { useReducer, useRef, useState } from 'react'
import commonCls from '../../components/commonClasses'
import { LevelDisplay } from '../../components/levels'
import { PlayerPropType } from '../../components/player'
import { PaddedTable } from '../../components/table'
import { ProfilePropType } from '../../helper/profiles'

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
    }
}))

const PlayerRow = props => {
    const handleDefenderChange = event => props.setAsDefender(event.target.checked)

    return (<TableRow>
        <TableCell>{props.player.name}</TableCell>
        <TableCell align="center"><LevelDisplay player={props.player} /></TableCell>
        <TableCell align="center">
            {props.player.active &&
                <Radio color="secondary" size={props.size}
                    checked={props.isLeader} onChange={props.setAsLeader}
                    name="set-leader-radio"
                    disabled={props.leaderState === 'preset'} />}
        </TableCell>
        <TableCell align="center">
            {props.leaderState !== 'not set' &&
                <Checkbox color="secondary" size={props.size}
                    checked={props.isDefender} onChange={handleDefenderChange}
                    disabled={props.isLeader || (props.maxedDefenders && !props.isDefender)}
                />}
        </TableCell>
        <TableCell>
            {props.delta === undefined || (props.newLevel.level > 14 ? <><Star /> Victory</> : <>
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
    setAsLeader: PropTypes.func.isRequired,
    isDefender: PropTypes.bool.isRequired,
    setAsDefender: PropTypes.func.isRequired,
    maxedDefenders: PropTypes.bool.isRequired,
    newLevel: PropTypes.exact({ level: PropTypes.number.isRequired, active: PropTypes.bool.isRequired }),
    delta: PropTypes.number
}

const calculateOutcome = (score, deckCount, maxDefenders, defenderCount) => {
    if (score === undefined)
        return { defenderMult: undefined, attackerDelta: undefined, defenderDelta: undefined }

    const scoreSteps = (score <= 0) ? 0 : Math.min(Math.floor(score / 20 / deckCount) + 1, 6)
    const defenderMult = maxDefenders - defenderCount + 1

    return {
        defenderMult,
        attackerDelta: Math.max(scoreSteps - 2, 0),
        defenderDelta: Math.max(3 - scoreSteps, 0) * defenderMult
    }
}

const calculateNewLevel = (player, delta) => {
    const won = delta > 0
    let level = player.level + (won ? (delta - (player.active ? 0 : 1)) : 0)

    if (player.level < 14 && level > 14) level = 14
    return { active: won, level }
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

const anyoneWon = playerList => {
    for (let { level } of playerList) {
        if (level > 14) return true
    }

    return false
}

const PlayerDetails = ({ profile, onUpdate }) => {
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
                case 'clear':
                    return { players: new Array(profile.players.length).fill(false), count: 0 }
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

    const [score, setScore] = useState(undefined)

    const scoreRef = useRef()
    const handleScoreChange = () => {
        if (!scoreRef.current.value.match(/^-?\d*$/))
            scoreRef.current.value = (score === undefined ? '' : score.toString())

        setScore(undefined)
    }

    const handleScoreUnfocus = () => {
        if (scoreRef.current.value === '' || scoreRef.current.value === undefined)
            setScore(undefined)
        else {
            const newScore = Math.round(parseInt(scoreRef.current.value) / 5) * 5
            scoreRef.current.value = newScore.toString()
            setScore(newScore)
        }
    }

    const handleScoreClear = () => {
        scoreRef.current.value = ''
        setScore(undefined)
    }

    const { defenderMult, attackerDelta, defenderDelta } =
        calculateOutcome(score, profile.config.decks, maxDefenders, defenders.count)

    const newLevels = profile.players.map(
        (player, i) => calculateNewLevel(player, defenders.players[i] ? defenderDelta : attackerDelta)
    )

    const gameOver = anyoneWon(newLevels)

    const handleScoreSave = () => {
        onUpdate({ ...profile, players: profile.players.map((player, i) => ({ ...player, ...newLevels[i] })) })
        handleScoreClear()
        setLeader(-1)
        dispatchDefenders({ type: 'clear' })
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
                        <PlayerRow key={i} size={tableSize}
                            player={player}
                            isLeader={leader === i} setAsLeader={setAsLeaderFunc(i)}
                            isDefender={defenders.players[i]} setAsDefender={setAsDefenderFunc(i)}
                            leaderState={leaderState} maxedDefenders={defenders.count === maxDefenders}
                            newLevel={newLevels[i]} delta={defenders.players[i] ? defenderDelta : attackerDelta}
                        />)}
                </TableBody>
            </PaddedTable>
            <Box m={2} className={classes.hContainer}>
                <Box className={classes.scoreInputContainer} mr={1}>
                    <TextField variant="filled" size={tableSize} className={classes.scoreInput}
                        label="Score" type="number"
                        inputProps={{ step: 5 }}
                        inputRef={scoreRef}
                        onChange={handleScoreChange}
                        onBlur={handleScoreUnfocus}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="clear score" onClick={handleScoreClear}><Clear /></IconButton>
                                </InputAdornment>
                            ),
                            inputProps: {
                                type: 'text',
                                pattern: /\d*/
                            }
                        }}
                    /></Box>
                {defenderMult && defenders.count > 0 && <Paper variant="outlined" className={classes.outcomeBox}>
                    <Typography variant="h6">Round Outcome</Typography>
                    {defenderDelta > 0 && <>
                        <Typography variant="body2">Score {'<'}{profile.config.decks * 40} points <Benefit>Defenders win, +1 level</Benefit> <Cost>Attackers inactive</Cost></Typography>
                        {defenderDelta > defenderMult &&
                            <Typography variant="body2">Score {'<'}{profile.config.decks * 20} points <Benefit>Defenders +1 level</Benefit></Typography>
                        }
                        {score <= 0 &&
                            <Typography variant="body2">Score 0 points <Benefit>Defenders +1 level</Benefit></Typography>
                        }
                        {defenderMult == 2 &&
                            <Typography variant="body2">1 less defender than usual <Benefit>Level gain ×2</Benefit></Typography>
                        }
                        {defenderMult > 2 &&
                            <Typography variant="body2">{defenderMult - 1} less defenders than usual <Benefit>Level gain ×{defenderMult}</Benefit></Typography>
                        }
                        <Typography variant="body2">Inactive defenders become active <Cost>-1 level gain if inactive</Cost></Typography>
                    </>}
                    {attackerDelta > 0 && <>
                        <Typography variant="body2">Score ≥{profile.config.decks * 40} points <Benefit>Attackers win, +1 level</Benefit> <Cost>Defenders inactive</Cost></Typography>
                        {attackerDelta > 1 &&
                            <Typography variant="body2">Score ≥{profile.config.decks * 60} points <Benefit>Attackers +1 level</Benefit></Typography>
                        }
                        {attackerDelta > 2 &&
                            <Typography variant="body2">Score ≥{profile.config.decks * 80} points <Benefit>Attackers +1 level</Benefit></Typography>
                        }
                        {attackerDelta > 3 &&
                            <Typography variant="body2">Score ≥{profile.config.decks * 100} points <Benefit>Attackers +1 level</Benefit></Typography>
                        }
                        <Typography variant="body2">Inactive attackers become active <Cost>-1 level gain if inactive</Cost></Typography>
                    </>}
                    <Box className={classes.hContainer} mt={1}>
                        <Box className={classes.hExpand} />
                        <Button color="primary" variant="contained" endIcon={<ChevronRight />}
                            onClick={handleScoreSave}
                        >Next Round</Button>
                    </Box>
                </Paper>
                }
            </Box>
        </TableContainer>
    </Box>)
}

PlayerDetails.propTypes = {
    profile: ProfilePropType,
    onUpdate: PropTypes.func.isRequired
}

export default PlayerDetails