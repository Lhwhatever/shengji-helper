import React from 'react'
import clsx from 'clsx'
import { Table as MuiTable, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
    paddedTable: props => ({
        '& td, & th': {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(props.size === 'small' ? 3 : 2)
        },
        marginBottom: theme.spacing(0)
    })
}))

const PaddedTable = ({ className, ...props }) => {
    const classes = useStyles(props)
    return <MuiTable className={clsx(classes.paddedTable, className)} {...props} />
}

PaddedTable.propTypes = {
    className: PropTypes.any
}

export { PaddedTable }
