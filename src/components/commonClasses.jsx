import { makeStyles } from '@material-ui/core'

const commonCls = makeStyles({
    vContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    hContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    invisible: {
        opacity: 0
    }
})

export default commonCls