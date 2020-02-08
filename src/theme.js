import { blueGrey, red, lightGreen } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[900]
        },
        secondary: {
            main: red[500]
        },
        error: {
            main: lightGreen.A400
        }
    },
    typography: {
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'sans-serif'
        ].join(',')
    }
})

export default theme;