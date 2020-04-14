import PropTypes from 'prop-types'
import React from 'react'
import { ProfilePropType } from '../../helper/profiles'
import FixedGameHistory from './fixed/gameHistory'
import FixedPlayerDetails from './fixed/playerDetails'
import FloatingGameHistory from './floating/gameHistory'
import FloatingPlayerDetails from './floating/playerDetails'
import { Paper, Box, Typography } from '@material-ui/core'

const ProfileContent = ({ profile, onUpdate }) => (<>
    {profile.victors.length > 0 || React.createElement(
        profile.partnership === 'floating' ? FloatingPlayerDetails : FixedPlayerDetails,
        { profile, onUpdate, mb: 2, tableSize: 'small' }
    )}
    <Paper><Box p={2}>
        <Typography variant="h5">Game History</Typography>
        {React.createElement(
            profile.partnership === 'floating' ? FloatingGameHistory : FixedGameHistory,
            { profile, tableSize: 'small' }
        )}
    </Box></Paper>
</>)

ProfileContent.propTypes = {
    profile: ProfilePropType.isRequired,
    onUpdate: PropTypes.func.isRequired
}

export default ProfileContent