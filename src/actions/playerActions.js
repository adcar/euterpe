// Player action creators
export const playTrack = tracks => ({
	type: 'PLAY_TRACK',
	payload: tracks
})

// playlist is an object
export const playPlaylist = playlist => ({
	type: 'PLAY_PLAYLIST',
	payload: playlist
})

export const prevSong = () => ({
	type: 'PREV_SONG'
})

export const nextSong = () => ({
	type: 'NEXT_SONG'
})
