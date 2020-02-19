import { MenuItem } from '@material-ui/core'
import React from 'react'
import SelectField from './selectField'

export const levels = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1]

export const LevelInput = props => {
    return (<SelectField {...props}>
        {levels.map(level => <MenuItem value={level} key={level}>{level}</MenuItem>)}
    </SelectField>)
}
