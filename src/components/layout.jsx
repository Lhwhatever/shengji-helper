
import { Container } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { graphql, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import theme from '../theme'
import SettingsContext from './settings/SettingsContext'
import Header from './header'
import './layout.css'
import { useReducer } from 'react'


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

    const [settings, settingsDispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'update':
                return { ...state, [action.key]: action.value }
            default:
                throw `Unknown action.type ${action.type}`
        }
    }, { displayAce: 'A' })

    const handleSettingsUpdate = (key, value) => settingsDispatch({ type: 'update', key, value })

    return (
        <ThemeProvider theme={theme}>
            <SettingsContext.Provider value={settings}>
                {header || <Header siteTitle={data.site.siteMetadata.title} onSettingsUpdate={handleSettingsUpdate} />}
                <Container>
                    {children}
                </Container>
            </SettingsContext.Provider>
        </ThemeProvider>
    )
}

Layout.propTypes = {
    children: PropTypes.node,
    header: PropTypes.node
}

export default Layout
