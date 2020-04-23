import { MenuItem } from '@material-ui/core'
import React from 'react'
import SelectField from './selectField'
import { levels, LevelDisplay } from '../levels'

export const LevelInput = props => {
    return (<SelectField variant="filled" {...props}>
        {levels.map(level => <MenuItem value={level} key={level}><LevelDisplay level={level} /></MenuItem>)}
    </SelectField>)
}
