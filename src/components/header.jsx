import React from "react"
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { InternalLink } from "./links";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    marginBottom: '1rem'
  }
}));

const Header = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}><AppBar position="static" className={classes.appBar} color='primary'>
      <Toolbar>
        <Typography variant="h6"><InternalLink>Shengji Helper</InternalLink></Typography>
      </Toolbar>
    </AppBar></div>
  )
}

export default Header
