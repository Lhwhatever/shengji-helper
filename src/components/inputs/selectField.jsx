import React from 'react'
import { TextField } from '@material-ui/core'

const SelectField = React.forwardRef(({ children, ...props }, ref) => (
    <TextField
        select
        SelectProps={{ native: props.native ? true : false }}
        ref={ref}
        {...props}
    >{children}
    </TextField>
))

export default SelectField