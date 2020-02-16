import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'
import React, { useEffect, useReducer, useState } from 'react'

import DeleteDialog from '../components/deleteDialog'
import Layout from '../components/layout'
import { loadProfiles, saveProfiles } from '../helper/profiles'
import CreateProfileDialog from '../subpages/calc/createProfileDialog'
import ProfileDisplay from '../subpages/calc/profileDisplay'

const useStyles = makeStyles(theme => ({
    btn: {
        margin: theme.spacing(1)
    }
}))

//[{"name":"Profile%202","uuid":"1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed","lastUsed":"2020-02-07T04:00:00.000Z","floating":0,"numOfDecks":2,"players":[["DEF",8],["KBC",2]]},{"name":"Create%20Profile","uuid":"1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bee","lastUsed":"2020-02-07T03:00:00.000Z","floating":1,"numOfDecks":3,"players":[["DEF",3],["GHI",10]]}]

const Calculator = () => {
    const classes = useStyles()
    const [createProfileWizardOpen, setCreateProfileWizardOpen] = useState(false)
    const [deleteProfileDialogOpen, setDeleteProfileDialogOpen] = useState([null, null])
    const [profiles, profileDispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'setProfileName': {
                const i = state.findIndex(profile => profile.uuid === action.key)
                let newProfiles = state.slice()
                newProfiles[i].name = action.value
                return newProfiles;
            }
            case 'deleteProfile':
                return (action.key === '') ? [] : state.filter(profile => profile.uuid !== action.key);
            default:
                throw new Error(`Unknown action type ${action.type}`)
        }
    }, [], () => loadProfiles(window))

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
            onClick={() => setDeleteProfileDialogOpen(['', 'all profiles'])}
            disabled={profiles.length === 0}
        >
            Delete All
        </Button>
        <CreateProfileDialog
            open={createProfileWizardOpen}
            setOpen={setCreateProfileWizardOpen}
            onFinish={console.log}
        />
        <DeleteDialog
            open={deleteProfileDialogOpen}
            setOpen={setDeleteProfileDialogOpen}
            onDelete={target => profileDispatch({ type: 'deleteProfile', key: target })}
        />
        <Box m={2}>
            {
                profiles.length ?
                    profiles.map(e => (
                        <Box mb={1} key={e.uuid}>
                            <ProfileDisplay profile={e} setProfileName={name => profileDispatch({
                                type: 'setProfileName',
                                key: e.uuid,
                                value: name
                            })} deleteProfile={() => setDeleteProfileDialogOpen([e.uuid, e.name])} />
                        </Box>
                    )) : null
            }
        </Box>
    </Layout>)
}

export default Calculator
