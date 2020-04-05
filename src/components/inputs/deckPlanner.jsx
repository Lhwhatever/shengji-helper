import { makeStyles, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { blueGrey } from '@material-ui/core/colors'
import { Done } from '@material-ui/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import commonCls from '../commonClasses'
import { PaddedTable } from '../table'

const CARDS_PER_DECK = 54
const MIN_SPARE_RATIO = 0.2
const MAX_SPARE_RATIO = 0.5

const useStyles = makeStyles(theme => ({
    table: {
        '& td, & th': {
            textAlign: 'center',
        },
        '& table': {
            marginBottom: theme.spacing(0)
        }
    },
    thead(props) {
        const palette = props.error ? theme.palette.error : theme.palette.primary

        return {
            backgroundColor: palette.main,
            '& th': {
                color: palette.contrastText
            }
        }
    },
    tick: {
        display: 'flex',
        flex: '1 1 0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    clickable: {
        cursor: 'pointer'
    },
    selected: {
        backgroundColor: blueGrey[50]
    }
}))


const getRowData = numOfPlayers => {
    const rowData = []

    for (let decks = 2; decks <= 4; ++decks) {
        const totalCards = decks * CARDS_PER_DECK
        const getCardsPerPlayer = spareCards => (totalCards - spareCards) / numOfPlayers

        let spareCards = totalCards % numOfPlayers

        while (spareCards / getCardsPerPlayer(spareCards) <= MIN_SPARE_RATIO) spareCards += numOfPlayers
        while (spareCards / getCardsPerPlayer(spareCards) < MAX_SPARE_RATIO) {
            rowData.push({
                decks,
                totalCards,
                cardsPerPlayer: getCardsPerPlayer(spareCards),
                spareCards
            })
            spareCards += numOfPlayers
        }
    }

    return rowData
}

const configsEqual = (x, y) => (
    x && y && x.decks === y.decks && x.totalCards === y.totalCards &&
    x.cardsPerPlayer === y.cardsPerPlayer && x.spareCards === y.spareCards
)

const tick = <Done style={{ fontSize: 16 }} />

const DeckPlannerRow = ({ row, config, ...props }) => {
    const classes = { ...commonCls(), ...useStyles() }
    const active = configsEqual(row, config)

    return (<TableRow {...props} className={clsx(classes.clickable, active ? classes.selected : null)}>
        <TableCell><span className={classes.tick}>{active && tick}</span></TableCell>
        <TableCell>{row.decks}</TableCell>
        <TableCell>{row.totalCards}</TableCell>
        <TableCell>{row.cardsPerPlayer}</TableCell>
        <TableCell>{row.spareCards}</TableCell>
    </TableRow>)
}

DeckPlannerRow.propTypes = {
    row: PropTypes.exact({
        decks: PropTypes.number.isRequired,
        totalCards: PropTypes.number.isRequired,
        cardsPerPlayer: PropTypes.number.isRequired,
        spareCards: PropTypes.number.isRequired
    }).isRequired,
    config: PropTypes.object
}

const DeckPlanner = ({ config, setConfig, numOfPlayers, ...props }) => {
    const classes = { ...commonCls(), ...useStyles(props) }
    const rowData = getRowData(numOfPlayers)

    return (<TableContainer component={Paper} className={classes.table}>
        <PaddedTable aria-label="table of decks" size={props.dense ? 'small' : 'medium'}>
            <TableHead align="center" className={classes.thead}>
                <TableRow>
                    <TableCell align="center">
                        <span className={clsx(classes.tick, classes.invisible)}>{tick}</span>
                    </TableCell>
                    <TableCell>Decks</TableCell>
                    <TableCell>Total Cards</TableCell>
                    <TableCell>Cards per Player</TableCell>
                    <TableCell>Spare Cards</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{
                rowData.map(
                    (row, i) => <DeckPlannerRow row={row} config={config} key={i} onClick={() => setConfig(row)} />
                )
            }</TableBody>
        </PaddedTable>
    </TableContainer>)
}

DeckPlanner.propTypes = {
    numOfPlayers: PropTypes.number.isRequired,
    dense: PropTypes.bool,
    config: PropTypes.exact({
        decks: PropTypes.number.isRequired,
        totalCards: PropTypes.number.isRequired,
        cardsPerPlayer: PropTypes.number.isRequired,
        spareCards: PropTypes.number.isRequired
    }),
    setConfig: PropTypes.func.isRequired,
    error: PropTypes.bool
}

export default DeckPlanner