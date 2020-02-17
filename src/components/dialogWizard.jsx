import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme, IconButton } from '@material-ui/core'
import { Close, Done, NavigateBefore, NavigateNext } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useEffect, useReducer, useState } from 'react'
import { HExpander } from './structs'


export const asWizardStep = (Step, actions = {}) => {
    function WizardStep({ advance, retreat, first, last, onCancel, wizardState, wizardDispatch, mobile }) {

        const [stepState, stepDispatch] = useReducer(
            (state, action) => {
                switch (action.type) {
                    case 'set':
                        return { ...state, [action.key]: action.value }
                    case 'merge':
                        return { ...state, ...action.value }
                    default:
                        throw new Error(`Unknown action type ${action.type}.`)
                }
            }, ...(actions.setup ? [wizardState, actions.setup] : [])
        )

        const handleNext = () => {
            if (actions && actions.onNext) {
                if (actions.validate) {
                    const { error, actionToFeedback } = actions.validate(stepState)
                    if (error) {
                        stepDispatch(actionToFeedback)
                        return
                    }
                }
                wizardDispatch(actions.onNext(stepState))
            }
            advance()
        }

        return (<>
            <DialogContent>
                <Step
                    state={stepState} dispatch={(key, value) => stepDispatch({ type: 'set', key, value })}
                />
            </DialogContent>
            <DialogActions>
                {mobile}
                {mobile || <Button color="primary" endIcon={<Close />} onClick={onCancel}>Quit</Button>}
                <HExpander />
                <Button startIcon={<NavigateBefore />} onClick={retreat}
                    color="primary" disabled={first}
                >Previous</Button>
                <Button endIcon={last ? <Done /> : <NavigateNext />} onClick={handleNext}
                    color="primary" variant="contained"
                >{last ? 'Finish' : 'Next'}</Button>
            </DialogActions>
        </>)
    }

    WizardStep.propTypes = {
        advance: PropTypes.func.isRequired,
        retreat: PropTypes.func.isRequired,
        first: PropTypes.bool.isRequired,
        last: PropTypes.bool.isRequired,
        mobile: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired,
        wizardState: PropTypes.any.isRequired,
        wizardDispatch: PropTypes.func.isRequired
    }

    return WizardStep
}

export const asWizardStepStepPropTypes = {
    state: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

const DialogWizard = ({ open, setOpen, steps, title, initializerArg, initializer, onFinish }) => {
    const [stepIndex, setStepIndex] = useState(0)
    const [done, setDone] = useState(false)
    const [wizardState, wizardStateDispatcher] = useReducer((state, action) => {
        switch (action.type) {
            case 'merge':
                return { ...state, ...action.value }
            case 'add':
                return { ...state, [action.key]: action.value }
            case 'del': {
                const copyOfState = { ...state }
                if (action.key.map) action.key.map(key => delete copyOfState[key])
                else delete copyOfState[action.key]
                return copyOfState
            }
            case 'reset':
                if (initializer) return initializer(initializerArg)
                if (initializerArg) return initializerArg
                return null
            case 'none':
                return state
            default:
                throw new Error(`Unknown action type ${action.key}.`)
        }
    }, initializerArg, initializer)

    const theme = useTheme()
    const mobile = useMediaQuery(theme.breakpoints.down('xs'))

    const last = stepIndex === steps.length - 1

    const handleCancel = () => {
        setOpen(false)
        setStepIndex(0)
    }

    const handleRetreat = () => { setStepIndex(stepIndex - 1) }

    const handleAdvance = last ?
        () => { setDone(true) } :
        () => { setStepIndex(stepIndex + 1) }

    useEffect(() => {
        if (done) {
            if (onFinish) onFinish(wizardState)
            setOpen(false)
            setStepIndex(0)
            setDone(false)
        }
    }, [done, onFinish, wizardState, setOpen])

    return (<Dialog fullScreen={mobile} open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
        {mobile ?
            <DialogTitle><IconButton aria-label="quit" onClick={handleCancel}><Close /></IconButton>{title || 'Quit'}</DialogTitle> :
            (title && <DialogTitle>{title}</DialogTitle>)
        }
        {React.createElement(steps[stepIndex],
            {
                advance: handleAdvance,
                retreat: handleRetreat,
                wizardState,
                wizardDispatch: wizardStateDispatcher,
                onCancel: handleCancel,
                first: stepIndex === 0,
                last,
                mobile
            }
        )}
    </Dialog>)
}

DialogWizard.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    steps: PropTypes.arrayOf(PropTypes.elementType).isRequired,
    title: PropTypes.string,
    initializerArg: PropTypes.any,
    initializer: PropTypes.func,
    onFinish: PropTypes.func
}

export default DialogWizard