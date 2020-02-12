import React from 'react'
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, makeStyles, TableBody } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    table: {
        padding: theme.spacing(2)
    },
    tabHead: {
        '& TableRow': {
            '& TableCell': {
                padding: theme.spacing(1)
            }
        }
    }
}))

const DeckPlanner = ({ numOfPlayers, ...props }) => {
    const classes = useStyles()

    return (<TableContainer component={Paper} className={classes.table}>
        <Table aria-label="table of decks" size={props.small ? 'small' : null}>
            <TableHead className={classes.tabHead}>
                <TableRow>
                    <TableCell>Players</TableCell>
                    <TableCell>Decks</TableCell>
                    <TableCell>Jokers</TableCell>
                    <TableCell>Total Cards</TableCell>
                    <TableCell>Cards per Player</TableCell>
                    <TableCell>Spare Cards</TableCell>
                </TableRow>
            </TableHead>
            <TableBody></TableBody>
        </Table>
    </TableContainer>)
}

export default DeckPlanner