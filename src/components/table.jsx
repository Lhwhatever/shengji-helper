import { makeStyles, Table as MuiTable, TableHead as MuiTableHeader, TableRow as MuiTableRow } from '@material-ui/core'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import React from 'react'
import { blueGrey } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
    paddedTable: props => ({
        '& td, & th': {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(props.size === 'small' ? 3 : 2)
        },
        marginBottom: theme.spacing(0)
    }),
    darkHeader: {
        backgroundColor: theme.palette.primary.main,
        '& th': {
            color: theme.palette.primary.contrastText
        }
    },
    highlightedRow: props => ({
        backgroundColor: props.highlight ? blueGrey[50] : 'inherit'
    })
}))

const makeStyledVariant = (defaultComponent, useStyles, classNameKey, propsToInject) => function ({ component, className, ...props }) {
    const classes = useStyles(props)
    return React.createElement(component || defaultComponent, {
        ...props,
        className: clsx(classes[classNameKey], className),
        ...(propsToInject || {})
    })
}


const PaddedTable = makeStyledVariant(MuiTable, useStyles, 'paddedTable')
PaddedTable.propTypes = {
    component: PropTypes.elementType,
    className: PropTypes.any
}

const DarkTableHead = makeStyledVariant(MuiTableHeader, useStyles, 'darkHeader')
DarkTableHead.propTypes = {
    component: PropTypes.elementType,
    className: PropTypes.any
}

const HighlightableRow = makeStyledVariant(MuiTableRow, useStyles, 'highlightedRow')
HighlightableRow.propTypes = {
    component: PropTypes.elementType,
    className: PropTypes.any,
    highlight: PropTypes.bool
}

export { PaddedTable, DarkTableHead, HighlightableRow }

