import React from 'react'
import { Box } from '@material-ui/core'

const codes = {
    watch: '⌚',
    flower_playing_cards: '🎴',
    busts_in_silhouette: '👥'
}

const Emoji = props => (
    <Box
        component="span"
        role="img"
        aria-label={props.label || ""}
        aria-hidden={props.label ? "false" : "true"}
        {...props}
    >
        {props.code in codes ? codes[props.code] : String.fromCodePoint(props.hex)}
    </Box>
)

export default Emoji
