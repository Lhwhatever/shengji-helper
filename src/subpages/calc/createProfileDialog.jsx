import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, makeStyles, MenuItem, TextField } from '@material-ui/core'
import React, { useRef, useState } from 'react'

import commonCls from '../../components/commonClasses'
import { DeckPlanner, NumOfPlayerField, SelectField } from '../../components/inputs'


const useStyles = makeStyles(theme => ({
    profileNameField: {
        marginBottom: theme.spacing(2),
        width: 400
    },
    capitalize: {
        textTransform: 'capitalize'
    }
}))


const CreateProfileDialog = ({ open, setOpen, createProfile }) => {
    const classes = { ...commonCls(), ...useStyles() }

    const FF = ['floating', 'fixed']
    const F1 = ['floating']

    const profileNameFieldRef = useRef()
    const [numOfPlayers, setNumOfPlayers] = useState(4)
    const [partnershipModeList, setPartnershipModeList] = useState(FF)
    const [partnership, setPartnership] = useState('fixed')

    const handleNumOfPlayerChange = event => {
        setNumOfPlayers(event.target.value)
        if (event.target.value % 2) {
            setPartnershipModeList(F1)
            setPartnership('floating')
        } else setPartnershipModeList(FF)
    }

    return (<Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle>Create new profile</DialogTitle>
        <DialogContent>
            <DialogContentText>To create a new profile, fill in the following information.</DialogContentText>
            <Box className={classes.vContainer}>
                <TextField label="Profile Name" inputRef={profileNameFieldRef} className={classes.profileNameField} />
                <Box className={classes.hContainer}>
                    <NumOfPlayerField value={numOfPlayers} onChange={handleNumOfPlayerChange} />
                    <Box ml={2} />
                    <SelectField
                        fullWidth
                        label="Partnership"
                        value={partnership}
                        onChange={event => setPartnership(event.target.value)}
                    >
                        {partnershipModeList.map(e => <MenuItem key={e} value={e}><span className={classes.capitalize}>{e}</span></MenuItem>)}
                    </SelectField>
                </Box>
            </Box>
            <DeckPlanner numOfPlayers={numOfPlayers} fullWidth />
        </DialogContent>
    </Dialog>)
}

export default CreateProfileDialog