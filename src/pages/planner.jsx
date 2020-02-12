import React, { useState } from 'react'
import Layout from '../components/layout'
import { makeStyles, Typography, Box } from '@material-ui/core'
import NumOfPlayerField from '../components/inputs/numOfPlayerField'
import DeckPlanner from '../components/inputs/deckPlanner'

const useStyles = makeStyles(theme => ({
    numOfPlayerField: {
        width: 200,
        marginTop: theme.spacing(2)
    },
    deckPlanner: {
        marginTop: theme.spacing(4)
    }
}))

const Planner = () => {
    const classes = useStyles()

    const [numOfPlayers, setNumOfPlayers] = useState(null)

    const handleNumOfPlayerChange = event => {
        setNumOfPlayers(event.target.value)
    }

    return (<Layout>
        <Typography variant="h4">Game Planner</Typography>
        <Typography variant="body2">Use this tool to decide how many decks should you play your game with.</Typography>
        <NumOfPlayerField
            value={numOfPlayers} onChange={handleNumOfPlayerChange}
            className={classes.numOfPlayerField}
        />
        <Box className={classes.deckPlanner}><DeckPlanner /></Box>
    </Layout>)
}

export default Planner