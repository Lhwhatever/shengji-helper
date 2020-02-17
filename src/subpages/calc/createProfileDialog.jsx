import { Box, DialogContentText, makeStyles, MenuItem, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import commonCls from '../../components/commonClasses'
import DialogWizard, { asWizardStep, asWizardStepStepPropTypes } from '../../components/dialogWizard'
import { NumOfPlayerField, SelectField, DeckPlanner } from '../../components/inputs'


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

    const [fixedPartnershipAllowed, setFixedPartnershipAllowed] = useState(true)

    const handleNumOfPlayerChange = event => {
        dispatch('numOfPlayers', event.target.value)
        if (event.target.value % 2) {
            setFixedPartnershipAllowed(false)
            dispatch('partnershipMode', 'floating')
        } else setFixedPartnershipAllowed(true)
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
                    onChange={event => dispatch('partnershipMode', event.target.value)}
                >
                    <MenuItem value="floating">Floating</MenuItem>
                    {fixedPartnershipAllowed &&
                        <MenuItem value="fixed">Fixed</MenuItem>}
                </SelectField>
            </Box>
        </Box>
    </>)
}

BasicInfoStep.propTypes = asWizardStepStepPropTypes

const DeckPlanningStep = ({ state, dispatch }) => {
    return (<>
        <DialogContentText>Select one of the following deck configurations by clicking/tapping on it.</DialogContentText>
        <DeckPlanner numOfPlayers={state.numOfPlayers} dense />
    </>)
}

DeckPlanningStep.propTypes = asWizardStepStepPropTypes

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
                    }),
                    setup: wizardState => ({
                        profileName: wizardState.name || '',
                        profileNameError: false,
                        numOfPlayers: wizardState.numOfPlayers || 4,
                        partnershipMode: wizardState.partnership || 'fixed'
                    })
                }
            ),
            asWizardStep(
                DeckPlanningStep,
                {
                    setup: wizardState => ({
                        numOfPlayers: wizardState.numOfPlayers
                    })
                }
            )
        ]}
    />)
}

CreateProfileDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    onFinish: PropTypes.func
}

export default CreateProfileDialog