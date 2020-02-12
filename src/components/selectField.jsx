import React from 'react'
import { TextField } from '@material-ui/core'

const SelectField = ({ children, ...props }) => (
    <TextField
        select
        SelectProps={{ native: props.native ? true : false }}
        {...props}
    >{children}
    </TextField>
)

export default SelectField