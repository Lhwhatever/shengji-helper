import { AppBar, Box, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { Settings } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import commonCls from './commonClasses'
import { InternalLink } from './links'
import SettingsDialog from './settings/SettingsDialog'

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    appBar: {
        marginBottom: '1rem'
    },
    settingsBtn: {
        position: 'relative'
    }
})

const Header = ({ children, onSettingsUpdate }) => {
    const classes = { ...commonCls(), ...useStyles() }
    const [settingsDialogOpen, openSettingsDialog] = useState(false)

    const handleCloseSettingsDialog = () => openSettingsDialog(false)

    return (<>
        <div className={classes.root}><AppBar position="static" className={classes.appBar} color='primary'>
            <Toolbar>
                {children || <Typography variant="h6"><InternalLink to="/">Shengji Helper</InternalLink></Typography>}
                <Box className={classes.hExpand} />
                <IconButton color="inherit" size="small" className={classes.settingsBtn} onClick={() => openSettingsDialog(true)}>
                    <Settings />
                </IconButton>
            </Toolbar>
        </AppBar></div>
        <SettingsDialog open={settingsDialogOpen} onClose={handleCloseSettingsDialog} onSettingsUpdate={onSettingsUpdate} />
    </>
    )
}

Header.propTypes = {
    children: PropTypes.node,
    onSettingsUpdate: PropTypes.func.isRequired
}

export default Header
