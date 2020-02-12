import React from "react"
import { Box, Container, Hidden, makeStyles, Typography } from '@material-ui/core'

import { ButtonLink } from '../components/links'
import Image from "../components/image"
import SEO from "../components/seo"

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
  btnLink: {
    marginBottom: theme.spacing(1)
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

const LinkSectionHeader = ({ className }) => (
  <Box className={className} m={1}><Typography variant="h5">Shengji Helper</Typography></Box>
)

const IndexPage = () => {
  const classes = useStyles()

  return (<Container className={classes.container}>
    <SEO title="Home" />
    <Hidden smDown>
      <Box className={classes.root}>
        <Box className={classes.linkCol}>
          <LinkSectionHeader className={classes.linksectheaderbox} />
          <ButtonLink className={classes.btnLink} variant="outlined" to="/calc">Calculator</ButtonLink>
          <ButtonLink className={classes.btnLink} variant="outlined" to="/planner">Game Planner</ButtonLink>
        </Box>
        <Box className={classes.image}><Image /></Box>
      </Box>
    </Hidden>
    <Hidden mdUp>
      <Box className={classes.smroot}>
        <Box><Image /></Box>
        <LinkSectionHeader className={classes.linksectheaderbox} />
      </Box>
    </Hidden>
  </Container>)
}

export default IndexPage
