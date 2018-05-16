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

export const play = () => ({
	type: 'PLAY'
})
export const pause = () => ({
	type: 'PAUSE'
})

export const shuffle = tracks => ({
	type: 'SHUFFLE',
	payload: tracks
})

const getAudioSource = source => ({
	type: 'FETCH_AUDIO_SOURCE',
	payload: source
})

export const fetchAudioSource = (song, artist, duration) => dispatch => {
	// fetch(
	// 	`https://euterpe-api.herokuapp.com/${encodeURIComponent(
	// 		song
	// 	)}/${encodeURIComponent(artist)}/${Math.round(duration / 1000)}`
	// )
	fetch(
		`https://euterpe-api.herokuapp.com/${encodeURIComponent(
			song
		)}/${encodeURIComponent(artist)}`
	)
		.then(res => res.text())
		.then(url => dispatch(getAudioSource(url)))
}
