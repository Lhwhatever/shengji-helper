import PropTypes from 'prop-types'
import React from 'react'
import { ProfilePropType } from '../../helper/profiles'
import FloatingGameHistory from './floating/gameHistory'
import FloatingPlayerDetails from './floating/playerDetails'


const ProfileContent = ({ profile, onUpdate }) => (
    profile.partnership === 'floating' && (<>
        <FloatingPlayerDetails profile={profile} onUpdate={onUpdate} mb={2} />
        <FloatingGameHistory profile={profile} />
    </>)
)

ProfileContent.propTypes = {
    profile: ProfilePropType.isRequired,
    onUpdate: PropTypes.func.isRequired
}

export default ProfileContent