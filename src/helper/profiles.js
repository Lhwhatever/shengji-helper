const localStorageKey = 'shengji-helper-profiles'

export const loadProfiles = window => {
    return JSON.parse(window.localStorage.getItem(localStorageKey) || '[]')
        .map(profile => ({
            name: decodeURIComponent(profile.name),
            uuid: profile.uuid,
            lastUsed: new Date(profile.lastUsed),
            partnership: (profile.floating ? 'floating' : 'fixed'),
            config: profile.config,
            players: profile.players.map(player => ({
                name: player[0],
                level: player[1] >> 1,
                active: (player[1] & 1) === 1
            }))
        }))
}

export const saveProfiles = (profiles, window) => {
    window.localStorage.setItem(
        localStorageKey,
        JSON.stringify(profiles.map(profile => ({
            name: encodeURIComponent(profile.name),
            uuid: profile.uuid,
            lastUsed: profile.lastUsed,
            floating: (profile.partnership === 'floating' ? 1 : 0),
            config: profile.config,
            players: profile.players.map(
                player => [player.name, (player.level << 1) | (player.active ? 1 : 0)]
            )
        })))
    )
}

