import { Box, DialogContentText, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import commonCls from '../../components/commonClasses'
import DialogWizard, { asWizardStep, asWizardStepStepPropTypes } from '../../components/dialogWizard'
import { DeckPlanner, NumOfPlayerField, SelectField } from '../../components/inputs'
import { LevelInput } from '../../components/inputs/levels'


const useStyles = makeStyles(theme => ({
    profileNameField: {
        marginBottom: theme.spacing(2),
        width: 400
    },
    capitalize: {
        textTransform: 'capitalize'
    },
    levelField: {
        width: 125
    },
    fixedPartnershipNaming: {
        display: 'flex'
    },
    nicknameField: {
        minWidth: 170
    },
    playerSetting: {
        minWidth: 300,
        marginBottom: theme.spacing(3)
    },
    settingsContainer: {
        display: 'flex',
        flexWrap: 'wrap'
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

const PlayerSetting = ({ player, set, index }) => {
    const classes = useStyles()
    const handleNameChange = event => {
        if (event.target.value.length <= 4) {
            set('name', event.target.value)
        }
    }

    return (<Box mb={1}>
        <TextField required
            label={`Player ${index} Nickname`}
            value={player.name}
            onChange={handleNameChange}
            className={classes.nicknameField}
        />
        <LevelInput required
            label="Starting Level"
            value={player.level}
            onChange={event => set('level', event.target.value)}
            className={classes.levelField}
        />
    </Box>)
}

PlayerSetting.propTypes = {
    player: PropTypes.exact({
        name: PropTypes.string,
        level: PropTypes.number.isRequired
    }).isRequired,
    set: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
}

const PlayerNamingStep = ({ state, dispatch }) => {
    const classes = useStyles()

    const PlayerSettingWrapped = (player, i) => (<PlayerSetting
        key={i} player={player} index={i + 1}
        set={(key, value) => dispatch(['players', i, key], value)}
    />)

    return (<>
        <DialogContentText>Set the nicknames of the players. Nicknames should be unique and be at most 4 characters long.</DialogContentText>
        <Box className={classes.settingsContainer}>
            {state.partnership === 'floating' ?
                state.players.map((player, i) => PlayerSettingWrapped(player, i)) :
                [0, 1].map(i => (<Box className={classes.playerSetting} key={i}>
                    <Typography variant="h6">Team {i + 1}</Typography>
                    {state.players.map((player, j) => (j % 2 === i ? PlayerSettingWrapped(player, j) : null))}
                </Box>))
            }
        </Box>
    </>)
}

PlayerNamingStep.propTypes = {
    state: PropTypes.exact({
        players: PropTypes.arrayOf(PlayerSetting.propTypes.player).isRequired,
        partnership: PropTypes.oneOf(['fixed', 'floating'])
    }).isRequired,
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
                        partnership: wizardState.partnership,
                        players: wizardState.players || (new Array(wizardState.numOfPlayers).fill({
                            name: '', level: 2
                        }))
                    }),
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