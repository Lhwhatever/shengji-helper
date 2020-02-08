import React from "react"
import { Box, Container, Hidden, makeStyles, Typography } from '@material-ui/core'

import ButtonLink from '../components/buttonlink'
import Image from "../components/image"
import SEO from "../components/seo"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    height: '100vh'
  },
  links: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
        <Box className={classes.links}>
          <LinkSectionHeader className={classes.linksectheaderbox} />
          <Box><ButtonLink variant="outlined" to="/calc">Calculator</ButtonLink></Box>
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
