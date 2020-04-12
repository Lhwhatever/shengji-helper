import PropTypes from 'prop-types'
import React from 'react'
import { ProfilePropType } from '../../helper/profiles'
import FloatingGameHistory from './floating/gameHistory'
import FloatingPlayerDetails from './floating/playerDetails'
import FixedPlayerDetails from './fixed/playerDetails'


const ProfileContent = ({ profile, onUpdate }) => (
    profile.partnership === 'floating' ? (<>
        {profile.victors.length > 0 || <FloatingPlayerDetails profile={profile} onUpdate={onUpdate} mb={2} tableSize="small" />}
        <FloatingGameHistory profile={profile} />
    </>) : (
            <FixedPlayerDetails profile={profile} onUpdate={onUpdate} tableSize="small" />
        )
)

ProfileContent.propTypes = {
    profile: ProfilePropType.isRequired,
    onUpdate: PropTypes.func.isRequired
}

export default ProfileContent