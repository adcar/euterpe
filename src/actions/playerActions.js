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
export const unshuffle = () => ({
	type: 'UNSHUFFLE'
})

export const changeVolume = volumeLvl => ({
	type: 'CHANGE_VOLUME',
	payload: volumeLvl
})

const getAudioSource = source => ({
	type: 'FETCH_AUDIO_SOURCE',
	payload: source
})

export const fetchAudioSource = (song, artist, duration) => dispatch => {
	if (song && artist && duration) {
		fetch(
			`https://euterpe-api.herokuapp.com/${encodeURIComponent(
				song
			)}/${encodeURIComponent(artist)}/${Math.round(duration / 1000)}`
		)
			.then(res => res.text())
			.then(url => dispatch(getAudioSource(url)))
	}
}
