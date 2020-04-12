import React from 'react'
import PropTypes from 'prop-types'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import { Clear } from '@material-ui/icons'
import { useRef } from 'react'
import { useState } from 'react'

const ScoreInput = props => {
    const [value, setValue] = useState()

    const scoreRef = useRef(value === undefined ? '' : value.toString())
    const onScoreChange = props.onScoreChange || (() => { })
    const onChange = score => {
        onScoreChange(score)
        setValue(score)
    }

    const [doLabelShrink, setLabelShrink] = useState()

    const handleScoreFocus = () => {
        setLabelShrink(true)
    }

    const handleScoreChange = () => {
        if (!scoreRef.current.value.match(/^-?\d*$/))
            scoreRef.current.value = (value === undefined ? '' : value.toString())
        else {
            setValue(parseInt(scoreRef.current.value))
            onScoreChange(undefined)
        }
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
    onScoreChange: PropTypes.func,
    handleScoreClear: PropTypes.func
}

export default ScoreInput