import React from 'react'
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, makeStyles, TableBody } from '@material-ui/core'

const CARDS_PER_DECK = 54
const MIN_SPARE_RATIO = 0.2
const MAX_SPARE_RATIO = 0.5

const useStyles = makeStyles(theme => ({
    table: {
        '& td, & th': {
            padding: theme.spacing(2),
            textAlign: 'center'
        },
        '& table': {
            marginBottom: theme.spacing(0)
        }
    },
    thead: {
        '& th': {
            textAlign: 'center'
        }
    }
}))

const getRowData = numOfPlayers => {
    const rowData = [];

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

    return rowData;
}

const DeckPlanner = ({ numOfPlayers, ...props }) => {
    const classes = useStyles()
    const rowData = getRowData(numOfPlayers)

    return (<TableContainer component={Paper} className={classes.table}>
        <Table aria-label="table of decks" size={props.small ? 'small' : null}>
            <TableHead align="center">
                <TableRow>
                    <TableCell>Decks</TableCell>
                    <TableCell>Total Cards</TableCell>
                    <TableCell>Cards per Player</TableCell>
                    <TableCell>Spare Cards</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{
                rowData.map((row, i) => <TableRow key={i}>
                    <TableCell>{row.decks}</TableCell>
                    <TableCell>{row.totalCards}</TableCell>
                    <TableCell>{row.cardsPerPlayer}</TableCell>
                    <TableCell>{row.spareCards}</TableCell>
                </TableRow>)
            }</TableBody>
        </Table>
    </TableContainer>)
}

export default DeckPlanner