import React from 'react'
import { MenuItem } from '@material-ui/core'

import range from '../../helper/range'
import SelectField from './selectField'

const NumOfPlayerField = props => (
    <SelectField
        fullWidth
        label={"No. of Players"}
        {...props}
    >{range(4, 11).map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}</SelectField>
)

export default NumOfPlayerField
