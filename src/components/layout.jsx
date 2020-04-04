
import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Container } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'

import Header from './header'
import theme from '../theme'
import './layout.css'

const Layout = ({ children, header }) => {
    const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

    return (
        <ThemeProvider theme={theme}>
            {header || <Header siteTitle={data.site.siteMetadata.title} />}
            <Container>
                {children}
            </Container>
        </ThemeProvider>
    )
}

Layout.propTypes = {
    children: PropTypes.node,
    header: PropTypes.node
}

export default Layout
