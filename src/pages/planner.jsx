import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { DeckPlanner, NumOfPlayerField } from '../components/inputs'
import Layout from '../components/layout'


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

    const [numOfPlayers, setNumOfPlayers] = useState('')
    const [gameConfig, setGameConfig] = useState(null)

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
        {numOfPlayers && (<Box className={classes.deckPlanner}>
            <DeckPlanner numOfPlayers={numOfPlayers} config={gameConfig} setConfig={setGameConfig} dense />
        </Box>)}
    </Layout>)
}

export default Planner