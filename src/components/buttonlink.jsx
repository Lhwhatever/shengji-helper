import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { Link } from 'gatsby'

const ButtonLinkBehavior = React.forwardRef(({ to, ...props }, ref) => (
    <Link ref={ref} to={to} {...props} />
))

const ButtonLink = ({ children, ...props }) => (
    <Button {...props} component={ButtonLinkBehavior}>
        {children}
    </Button>
)

ButtonLink.propTypes = {
    to: PropTypes.string,
    children: PropTypes.element
}

export default ButtonLink
