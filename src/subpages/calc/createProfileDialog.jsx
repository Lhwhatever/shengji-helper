import { Box, DialogContentText, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import commonCls from '../../components/commonClasses'
import DialogWizard, { asWizardStep, asWizardStepStepPropTypes } from '../../components/dialogWizard'
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
    const onSelect = config => {
        dispatch('config', config)
        dispatch('error', false)
    }

    return (<>
        <DialogContentText>Select one of the following deck configurations.</DialogContentText>
        {state.error && <Typography variant="body1" color="error">You must select a deck configuration! Tap or click on the desired row.</Typography>}
        <DeckPlanner numOfPlayers={state.numOfPlayers} config={state.config} setConfig={onSelect} dense error={state.error} />
    </>)
}

DeckPlanningStep.propTypes = asWizardStepStepPropTypes

const PlayerNamingStep = ({ state, dispatch }) => {
    return (<>
        <DialogContentText>Set the nicknames of the players. Nicknames should be unique and be at most 4 characters long.</DialogContentText>
    </>)
}

const CreateProfileDialog = ({ open, setOpen, onFinish }) => {
    return (<DialogWizard
        open={open} setOpen={setOpen}
        title="Create new profile"
        initializerArg={{}}
        onFinish={onFinish}
        steps={[
            asWizardStep(
                BasicInfoStep, 'Set the game mode and number of players.',
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
                DeckPlanningStep, 'Decide on the number of decks.',
                {
                    setup: wizardState => ({
                        numOfPlayers: wizardState.numOfPlayers,
                        config: wizardState.config,
                    }),
                    validate(stepState) {
                        if (stepState.config) return {}
                        else return {
                            error: 1,
                            actionToFeedback: {
                                type: 'set',
                                key: 'error',
                                value: true
                            }
                        }
                    },
                    onNext: stepState => ({
                        type: 'merge',
                        value: {
                            config: {
                                decks: stepState.config.decks,
                                perPlayer: stepState.config.cardsPerPlayer,
                                spares: stepState.config.spareCards
                            }
                        }
                    })
                }
            ),
            asWizardStep(
                PlayerNamingStep, 'Set the nickname of the players.',
                {
                    setup: wizardState => ({
                        numOfPlayers: wizardState.numOfPlayers,
                        partnership: wizardState.partnership
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