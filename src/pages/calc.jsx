import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'
import React, { useEffect, useReducer, useState } from 'react'

import DeleteDialog from '../components/deleteDialog'
import Layout from '../components/layout'
import { loadProfiles, saveProfiles } from '../helper/profiles'
import CreateProfileDialog from '../subpages/calc/createProfileDialog'
import ProfileDisplay from '../subpages/calc/profileDisplay'
import { v4 as uuidv4 } from 'uuid'

const useStyles = makeStyles(theme => ({
    btn: {
        margin: theme.spacing(1)
    }
}))

const Calculator = () => {
    const classes = useStyles()
    const [createProfileWizardOpen, setCreateProfileWizardOpen] = useState(false)
    const [deleteProfileDialogOpen, setDeleteProfileDialogOpen] = useState([null, null])
    const [profiles, profileDispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'setProfileName':
                state[action.key].name = action.value
                state[action.key].lastUsed = new Date()
                return state
            case 'createProfile':
                return {
                    ...state,
                    [action.key]: { ...action.value, lastUsed: new Date() }
                }
            case 'deleteProfile': {
                if (action.key === '*') return {}
                let newState = state
                delete state[action.key]
                return newState
            }
            default:
                throw new Error(`Unknown action type ${action.type}`)
        }
    }, {}, () => loadProfiles(window))

    useEffect(() => {
        saveProfiles(profiles, window)
    }, [profiles])

    return (<Layout>
        <Typography variant="h4">Calculator</Typography>
        <Typography variant="body2">Select a profile below:</Typography>
        <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            startIcon={<Add />}
            onClick={() => setCreateProfileWizardOpen(true)}
        >Create Profile</Button>
        <Button
            variant="contained"
            color="secondary"
            className={classes.btn}
            startIcon={<Delete />}
            onClick={() => setDeleteProfileDialogOpen(['*', 'all profiles'])}
            disabled={profiles.length === 0}
        >
            Delete All
        </Button>
        <CreateProfileDialog
            open={createProfileWizardOpen}
            setOpen={setCreateProfileWizardOpen}
            onFinish={
                newProfile => {
                    const uuid = uuidv4()
                    newProfile.leader = -1
                    profileDispatch({ type: 'createProfile', key: uuid, value: newProfile })
                }
            }
        />
        <DeleteDialog
            open={deleteProfileDialogOpen}
            setOpen={setDeleteProfileDialogOpen}
            onDelete={target => profileDispatch({ type: 'deleteProfile', key: target })}
        />
        <Box m={2}>
            {
                Object.values(profiles).length ?
                    Object.entries(profiles).map(([uuid, e]) => (
                        <Box mb={1} key={uuid}>
                            <ProfileDisplay uuid={uuid} profile={e} setProfileName={name => profileDispatch({
                                type: 'setProfileName',
                                key: uuid,
                                value: name
                            })} deleteProfile={() => setDeleteProfileDialogOpen([uuid, e.name])} />
                        </Box>
                    )) : []
            }
        </Box>
    </Layout>)
}

export default Calculator
