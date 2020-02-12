import React from 'react'
import PropTypes from 'prop-types'
import { Button, Link as MuiLink } from '@material-ui/core'
import { Link as GatsbyLink } from 'gatsby'

const ButtonLinkBehavior = React.forwardRef(({ to, ...props }, ref) => (
    <GatsbyLink ref={ref} to={to} {...props} />
))

export const ButtonLink = ({ children, ...props }) => (
    <Button {...props} component={ButtonLinkBehavior}>
        {children}
    </Button>
)

ButtonLink.propTypes = {
    to: PropTypes.string,
    children: PropTypes.element
}

export const InternalLink = ({ children, color, doUnderline, ...props }) => (
    <MuiLink
        component={GatsbyLink}
        color={color || 'inherit'}
        style={{ textDecoration: doUnderline ? 'inherit' : 'none' }}
        {...props}
    >
        {children}
    </MuiLink>
)

