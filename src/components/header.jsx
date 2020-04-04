import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { InternalLink } from './links'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    appBar: {
        marginBottom: '1rem'
    }
})

const Header = ({ children }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}><AppBar position="static" className={classes.appBar} color='primary'>
            <Toolbar>
                {children || <Typography variant="h6"><InternalLink to="/">Shengji Helper</InternalLink></Typography>}
            </Toolbar>
        </AppBar></div>
    )
}

Header.propTypes = {
    children: PropTypes.node
}

export default Header
