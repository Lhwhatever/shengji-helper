import { Box, Container, Hidden, makeStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import Image from '../components/image'
import { ButtonLink } from '../components/links'
import SEO from '../components/seo'


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        height: '100vh'
    },
    linkCol: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    btnLinks: {
        display: 'flex',
        flexDirection: 'column',
        '& a': { marginBottom: theme.spacing(1) }
    },
    btnLinksCompact: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        '& a': {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        }
    },
    image: {
        flexGrow: 3
    },
    smroot: {
        display: 'flex',
        flexDirection: 'column'
    },
    linksectheaderbox: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

const LinkSectionHeader = props => (
    <Box {...props} m={1}><Typography variant="h5">Shengji Helper</Typography></Box>
)

const Links = ({ compact }) => {
    const classes = useStyles()

    return (<Box className={compact ? classes.btnLinksCompact : classes.btnLinks}>
        <ButtonLink variant="outlined" to="/calc">Calculator</ButtonLink>
        <ButtonLink variant="outlined" to="/planner">Game Planner</ButtonLink>
    </Box>)
}

Links.propTypes = {
    compact: PropTypes.bool
}


const IndexPage = () => {
    const classes = useStyles()

    return (<Container className={classes.container}>
        <SEO title="Home" />
        <Hidden xsDown>
            <Box className={classes.root}>
                <Box className={classes.linkCol}>
                    <LinkSectionHeader className={classes.linksectheaderbox} />
                    <Links />
                </Box>
                <Box className={classes.image}><Image /></Box>
            </Box>
        </Hidden>
        <Hidden smUp>
            <Box className={classes.smroot}>
                <Box><Image /></Box>
                <LinkSectionHeader className={classes.linksectheaderbox} />
                <Links compact />
            </Box>
        </Hidden>
    </Container>)
}

export default IndexPage
