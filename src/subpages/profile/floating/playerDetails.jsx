import { Box, Button, Paper, TableBody, TableCell, TableContainer, TableRow, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { ChevronRight, Done } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { navigate } from '@reach/router'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useReducer, useState } from 'react'
import commonCls from '../../../components/commonClasses'
import ScoreInput from '../../../components/inputs/scoreInput'
import { DarkTableHead, PaddedTable } from '../../../components/table'
import { ProfilePropType } from '../../../helper/profiles'
import BiddingDialog from './biddingDialog'
import PlayerRow, { Benefit, Cost } from './playerRow'

const useStyles = makeStyles(theme => ({
    scoreInput: {
        width: 115,
    },
    outcomeBox: {
        padding: theme.spacing(1)
    },
    scoreContainer: {
        flexBasis: 'fit-content'
    },
    biddingBtnContainer: props => ({
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(2),
            alignSelf: 'center'
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(props.leader === -1 ? 0 : 2),
            alignSelf: 'flex-end'
        }
    })
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


const PlayerDetails = ({ profile, onUpdate, tableSize, ...props }) => {

    const xs = useMediaQuery(useTheme().breakpoints.down('xs'))
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
    const handleScoreChange = score => {
        setScore(score)
    }

    const { defenderMult, attackerDelta, defenderDelta } =
        calculateOutcome(score, profile.config.decks, maxDefenders, defenders.count)

    const newLevels = profile.players.map(
        (player, i) => calculateNewLevel(player, defenders.players[i] ? defenderDelta : attackerDelta)
    )

    const victors = getVictors(newLevels)

    const [biddingDialogOpen, setBiddingDialogOpen] = useState(false)
    const [bid, setBid] = useState({})

    const handleScoreSave = () => {
        onUpdate({
            ...profile,
            players: profile.players.map((player, i) => ({ ...player, ...newLevels[i] })),
            history: [...profile.history, {
                leader, score, playerLevels: profile.players.map(player => ({ level: player.level, active: player.active }))
            }]
        })
        setScore(undefined)
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

    const classes = { ...commonCls(), ...useStyles({ leader }) }

    return (<Paper {...props}>
        <TableContainer component={Box}>
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
        </TableContainer>
        <Box m={2} className={xs ? classes.vContainer : classes.hContainer}>
            <Box mr={2} mb={2} className={clsx(xs ? classes.hContainer : classes.vContainer, classes.scoreContainer)}>
                {leader !== -1 && (<Box>
                    <ScoreInput variant="filled" size={tableSize} className={classes.scoreInput}
                        label="Score"
                        onScoreChange={handleScoreChange}
                    /></Box>)}
                <Box className={classes.biddingBtnContainer}>
                    <Button variant="contained" color="primary" onClick={() => setBiddingDialogOpen(true)}>Bidding</Button>
                </Box>
            </Box>
            {defenderMult && defenders.count > 0 && (<Box mb={2}><Paper variant="outlined" className={classes.outcomeBox}>
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
            </Paper></Box>)
            }
        </Box>
        <BiddingDialog
            open={biddingDialogOpen} setOpen={setBiddingDialogOpen}
            bid={bid} setBid={setBid}
            playerList={profile.players}
            onLeaderChange={handleLeaderChange}
        />
    </Paper>)
}

PlayerDetails.propTypes = {
    profile: ProfilePropType,
    onUpdate: PropTypes.func.isRequired,
    tableSize: PropTypes.oneOf(['small', 'medium'])
}

export default PlayerDetails