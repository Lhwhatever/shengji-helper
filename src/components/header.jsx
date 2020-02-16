import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { InternalLink } from './links'

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  appBar: {
    marginBottom: '1rem'
  }
})

const Header = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}><AppBar position="static" className={classes.appBar} color='primary'>
      <Toolbar>
        <Typography variant="h6"><InternalLink to="/">Shengji Helper</InternalLink></Typography>
      </Toolbar>
    </AppBar></div>
  )
}

export default Header
