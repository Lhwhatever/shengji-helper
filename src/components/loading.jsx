import { CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    loadingGrid: {
        height: '100vh'
    }
})

const Loading = () => {
    const classes = useStyles()

    return (<Grid container justify="center" spacing={1} alignItems="center" direction="column" className={classes.loadingGrid}>
        <Grid item xs={12}><CircularProgress color="secondary" /></Grid>
        <Grid item xs={12}><Typography variant="body2">Loading...</Typography></Grid>
    </Grid>)
}

export default Loading