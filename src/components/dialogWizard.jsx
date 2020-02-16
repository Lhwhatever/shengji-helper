import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { Close, Done, NavigateNext } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useEffect, useReducer, useState } from 'react'


export function asWizardStep(Step, actions, initializerArg, initializer) {
    return ({ advance, last, onCancel, wizardDispatch }) => {
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
            }, initializerArg, initializer
        )

        const handleNext = () => {
            if (actions && actions.onNext) {
                if (actions.validate) {
                    const { error, actionToFeedback } = actions.validate(stepState)
                    if (error) {
                        stepDispatch(actionToFeedback)
                        return;
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
                <Button color="primary" endIcon={<Close />} onClick={onCancel}>Cancel</Button>
                <Button endIcon={last ? <Done /> : <NavigateNext />} onClick={handleNext}
                    color="primary" variant="contained"
                >{last ? 'Finish' : 'Next'}</Button>
            </DialogActions>
        </>)
    }
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

    const last = stepIndex === steps.length - 1

    const handleCancel = () => {
        setOpen(false)
        setStepIndex(0)
    }

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
    }, [done])

    const Step = steps[stepIndex]

    return (<Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
        {title && <DialogTitle>{title}</DialogTitle>}
        {<Step
            advance={handleAdvance}
            wizardState={wizardState}
            wizardDispatch={wizardStateDispatcher}
            onCancel={handleCancel}
            last={last}
        />}
    </Dialog>)
}

DialogWizard.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    steps: PropTypes.arrayOf(PropTypes.element).isRequired,
    title: PropTypes.string,
    initializerArg: PropTypes.any,
    initializer: PropTypes.func,
    onFinish: PropTypes.func
}

export default DialogWizard