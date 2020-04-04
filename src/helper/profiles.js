const localStorageKey = 'shengji-helper-profiles'

export const loadProfiles = window => Object.fromEntries(
    JSON.parse(window.localStorage.getItem(localStorageKey) || '[]')
        .map(profile => [profile.uuid, {
            name: decodeURIComponent(profile.name),
            lastUsed: new Date(profile.lastUsed),
            partnership: (profile.floating ? 'floating' : 'fixed'),
            config: profile.config,
            players: profile.players.map(player => ({
                name: player[0],
                level: player[1] >> 2,
                active: player[1] & 0b11
            }))
        }])
)

export const saveProfiles = (profiles, window) => {
    window.localStorage.setItem(
        localStorageKey,
        JSON.stringify(Object.entries(profiles).map(([uuid, profile]) => ({
            name: encodeURIComponent(profile.name),
            uuid: uuid,
            lastUsed: profile.lastUsed.valueOf(),
            floating: (profile.partnership === 'floating' ? 1 : 0),
            config: profile.config,
            players: profile.players.map(
                player => [player.name, (player.level << 2) | player.active]
            )
        })))
    )
}

