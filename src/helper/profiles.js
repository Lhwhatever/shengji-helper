const localStorageKey = 'shengji-helper-profiles';

export const loadProfiles = window => {
    return JSON.parse(window.localStorage.getItem(localStorageKey) || "[]")
        .map(profile => ({
            name: decodeURIComponent(profile.name),
            uuid: profile.uuid,
            lastUsed: new Date(profile.lastUsed),
            partnership: (profile.floating ? 'floating' : 'fixed'),
            numOfDecks: profile.numOfDecks,
            players: profile.players.map(player => ({
                name: player.name,
                level: player.level >> 1,
                active: (player.level & 1) == 1
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
            numOfDecks: profile.numOfDecks,
            players: profile.players.map(
                player => [player.name, (player.level << 1) | (player.active ? 1 : 0)]
            )
        })))
    )
}

