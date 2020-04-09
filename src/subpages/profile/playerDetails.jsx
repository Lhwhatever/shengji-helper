import { Box, Button, IconButton, InputAdornment, Paper, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, Grid, useMediaQuery, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import { ChevronRight, Clear, Done } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { navigate } from '@reach/router'
import PropTypes from 'prop-types'
import React, { useReducer, useRef, useState } from 'react'
import commonCls from '../../components/commonClasses'
import { DarkTableHead, PaddedTable } from '../../components/table'
import { ProfilePropType } from '../../helper/profiles'
import PlayerRow, { Benefit, Cost } from './playerRow'
import BiddingDialog from './biddingDialog'

const useStyles = makeStyles(theme => ({
    scoreInput: {
        minWidth: '25%',
        maxWidth: 135
    },
    outcomeBox: {
        padding: theme.spacing(1)
    },
    playerDetails: {
        'overflow-y': 'hidden'
    },
    scoreContainer: {
        alignItems: 'center'
    }
}))

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

const getVictors = playerList => playerList.reduce((partialList, player, i) => {
    if (player.level > 14) partialList.push(i)
    return partialList
}, [])


const PlayerDetails = ({ profile, onUpdate, ...props }) => {
    const classes = { ...commonCls(), ...useStyles() }

    const xs = useMediaQuery(useTheme().breakpoints.down('xs'))
    const tableSize = 'small'
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

    const handleLeaderChange = playerId => {
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

    const victors = getVictors(newLevels)

    const [biddingDialogOpen, setBiddingDialogOpen] = useState()
    const [bid, setBid] = useState({})

    const handleScoreSave = () => {
        onUpdate({
            ...profile,
            players: profile.players.map((player, i) => ({ ...player, ...newLevels[i] })),
            history: [...profile.history, {
                leader, score, playerLevels: profile.players.map(player => ({ level: player.level, active: player.active }))
            }]
        })
        handleScoreClear()
        setLeader(-1)
        dispatchDefenders({ type: 'clear' })
        setBid({})
    }

    const handleGameFinish = () => {
        onUpdate({
            ...profile,
            players: profile.players.map((player, i) => ({ ...player, ...newLevels[i] })),
            victors
        })

        navigate('/calc')
    }


    return (profile.victors.length <= 0 && <Box {...props}>
        <TableContainer component={Paper} className={classes.playerDetails} >
            <PaddedTable size={tableSize}>
                <DarkTableHead>
                    <TableRow>
                        <TableCell>Player</TableCell>
                        <TableCell align="center">Level</TableCell>
                        <TableCell align="center"><Box className={classes.vContainer}>
                            <Box>Defender</Box>
                            <Box mt={-1}><Typography variant="caption">(max {maxDefenders})</Typography></Box>
                        </Box></TableCell>
                        <TableCell>Next Game</TableCell>
                    </TableRow>
                </DarkTableHead>
                <TableBody>
                    {profile.players.map((player, i) =>
                        <PlayerRow key={i} size={tableSize}
                            player={player}
                            isLeader={leader === i}
                            isDefender={defenders.players[i]} setAsDefender={setAsDefenderFunc(i)}
                            leaderState={leaderState} maxedDefenders={defenders.count === maxDefenders}
                            newLevel={newLevels[i]} delta={defenders.players[i] ? defenderDelta : attackerDelta}
                        />)}
                </TableBody>
            </PaddedTable>
            <Box m={2}> <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                    <Box className={clsx(xs ? classes.hContainer : classes.vContainer, classes.scoreContainer)}>
                        <TextField variant="filled" size={tableSize} className={classes.scoreInput}
                            label="Score" type="number"
                            inputProps={{ step: 5 }}
                            inputRef={scoreRef}
                            onChange={handleScoreChange}
                            onBlur={handleScoreUnfocus}
                            disabled={leader === -1}
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
                        />
                        <Box m={1}>
                            <Button variant="contained" color="primary" onClick={() => setBiddingDialogOpen(true)}>Bidding</Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={9}>
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
                            {victors.length ?
                                <Button color="primary" variant="contained" endIcon={<Done />}
                                    onClick={handleGameFinish}
                                >Finish Game</Button> :
                                <Button color="primary" variant="contained" endIcon={<ChevronRight />}
                                    onClick={handleScoreSave}
                                >Next Round</Button>
                            }
                        </Box>
                    </Paper>
                    }
                </Grid>
            </Grid> </Box>
        </TableContainer>
        <BiddingDialog
            open={biddingDialogOpen} setOpen={setBiddingDialogOpen}
            bid={bid} setBid={setBid}
            playerList={profile.players}
            onLeaderChange={handleLeaderChange}
        />
    </Box>)
}

PlayerDetails.propTypes = {
    profile: ProfilePropType,
    onUpdate: PropTypes.func.isRequired
}

export default PlayerDetails