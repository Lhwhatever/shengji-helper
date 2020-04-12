import React from 'react'
import PropTypes from 'prop-types'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import { Clear } from '@material-ui/icons'
import { useRef } from 'react'
import { useState } from 'react'

const ScoreInput = props => {
    const scoreRef = useRef(props.value === undefined ? '' : props.value.toString())
    const onChange = props.onScoreChange || (() => { })

    const [doLabelShrink, setLabelShrink] = useState()

    const handleScoreFocus = () => {
        setLabelShrink(true)
    }

    const handleScoreChange = () => {
        if (!scoreRef.current.value.match(/^-?\d*$/))
            scoreRef.current.value = (props.value === undefined ? '' : props.value.toString())
        else onChange(undefined)
    }

    const handleScoreUnfocus = () => {
        if (scoreRef.current.value === '' || scoreRef.current.value === undefined) {
            onChange(undefined)
            setLabelShrink(false)
        } else {
            const newScore = Math.round(parseInt(scoreRef.current.value) / 5) * 5
            scoreRef.current.value = newScore.toString()
            onChange(newScore)
        }
    }

    const handleScoreClear = () => {
        scoreRef.current.value = ''
        setLabelShrink(false)
        onChange(undefined)
    }

    return (<TextField
        label={props.label || 'Score'}
        inputRef={scoreRef}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton aria-label="clear score" onClick={handleScoreClear}><Clear /></IconButton>
                </InputAdornment>
            ),
            inputProps: {
                type: 'text',
                pattern: /\d*/,
                step: 5
            }
        }}
        type="number"
        onFocus={handleScoreFocus}
        onChange={handleScoreChange}
        onBlur={handleScoreUnfocus}
        InputLabelProps={{ shrink: doLabelShrink }}
        {...props}
    />)
}

ScoreInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    onScoreChange: PropTypes.func,
    handleScoreClear: PropTypes.func
}

export default ScoreInput