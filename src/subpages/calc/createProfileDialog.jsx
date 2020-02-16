import { Box, DialogContentText, makeStyles, MenuItem, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import commonCls from '../../components/commonClasses'
import DialogWizard, { asWizardStep } from '../../components/dialogWizard'
import { NumOfPlayerField, SelectField } from '../../components/inputs'


const useStyles = makeStyles(theme => ({
    profileNameField: {
        marginBottom: theme.spacing(2),
        width: 400
    },
    capitalize: {
        textTransform: 'capitalize'
    }
}))

const BasicInfoStep = ({ state, dispatch }) => {
    const classes = { ...commonCls(), ...useStyles() }

    const FF = ['floating', 'fixed']
    const F1 = ['floating']

    const [partnershipModeList, setPartnershipModeList] = useState(FF)

    const handleNumOfPlayerChange = event => {
        dispatch('numOfPlayers', event.target.value)
        if (event.target.value % 2) {
            setPartnershipModeList(F1)
            dispatch('partnershipMode', 'floating')
        } else setPartnershipModeList(FF)
    }

    const handleProfileNameFieldChange = event => {
        dispatch('profileName', event.target.value)
        dispatch('profileNameError', !event.target.value)
    }

    return (<>
        <DialogContentText>To create a new profile, fill in the following information.</DialogContentText>
        <Box className={classes.vContainer}>
            <TextField
                label="Profile Name"
                required
                value={state.profileName}
                error={state.profileNameError}
                helperText={state.profileNameError ? 'Enter a profile name.' : null}
                onChange={handleProfileNameFieldChange}
                className={classes.profileNameField}
            />
            <Box className={classes.hContainer}>
                <NumOfPlayerField value={state.numOfPlayers} onChange={handleNumOfPlayerChange} required />
                <Box ml={2} />
                <SelectField
                    fullWidth required
                    label="Partnership"
                    value={state.partnershipMode}
                    onChange={event => dispatch('setPartnershipMode', event.target.value)}
                >
                    {partnershipModeList.map(e => <MenuItem key={e} value={e}><span className={classes.capitalize}>{e}</span></MenuItem>)}
                </SelectField>
            </Box>
        </Box>
    </>)
}

BasicInfoStep.propTypes = {
    state: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

const CreateProfileDialog = ({ open, setOpen, onFinish }) => {
    return (<DialogWizard
        open={open} setOpen={setOpen}
        title="Create new profile"
        initializerArg={{}}
        onFinish={onFinish}
        steps={[
            asWizardStep(
                BasicInfoStep,
                {
                    validate(stepState) {
                        if (stepState.profileName) return {}
                        else return {
                            error: 1,
                            actionToFeedback: {
                                type: 'set',
                                key: 'profileNameError',
                                value: true
                            }
                        }
                    },
                    onNext: stepState => ({
                        type: 'merge',
                        value: {
                            name: stepState.profileName,
                            numOfPlayers: stepState.numOfPlayers,
                            partnership: stepState.partnershipMode
                        }
                    })
                },
                {
                    profileName: '',
                    profileNameError: false,
                    numOfPlayers: 4,
                    partnershipMode: 'fixed'
                }
            ),
            asWizardStep(() => 'Hello')
        ]}
    />)
}

CreateProfileDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    onFinish: PropTypes.func
}

export default CreateProfileDialog