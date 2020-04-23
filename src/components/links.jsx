import { Button, Link as MuiLink } from '@material-ui/core'
import { Link as GatsbyLink } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const ButtonLinkBehavior = React.forwardRef(({ to, ...props }, ref) => (
    <GatsbyLink ref={ref} to={to} {...props} />
))

ButtonLinkBehavior.displayName = 'ButtonLinkBehaviour'
ButtonLinkBehavior.propTypes = {
    to: PropTypes.string.isRequired
}

export const ButtonLink = ({ children, ...props }) => (
    <Button {...props} component={ButtonLinkBehavior}>
        {children}
    </Button>
)

ButtonLink.propTypes = {
    children: PropTypes.node
}

export const InternalLink = ({ children, color, ...props }) => (
    <MuiLink
        component={GatsbyLink}
        color={color || 'inherit'}
        style={{ textDecoration: props.doUnderline ? 'inherit' : 'none' }}
        {...props}
    >
        {children}
    </MuiLink>
)

InternalLink.propTypes = {
    color: PropTypes.string,
    doUnderline: PropTypes.bool,
    to: PropTypes.string.isRequired,
    children: PropTypes.node
}
