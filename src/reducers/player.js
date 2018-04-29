const initialState = {
	tracks: [
		{
			image: 'https://via.placeholder.com/120x120',
			name: '',
			artist: ''
		}
	],
	currentTrack: 0
}

const player = (state = initialState, action) => {
	console.log('player reducer called')
	console.log(state)
	switch (action.type) {
		case 'PLAY_TRACK':
			return {
				...state,
				tracks: action.payload,
				currentTrack: 0 // The current track is always zero since there is only one song
			}
		case 'PLAY_PLAYLIST':
			return {
				...state,
				tracks: action.payload.tracks,
				currentTrack: action.payload.currentTrack
			}
		case 'NEXT_SONG':
			if (state.currentTrack + 1 < state.tracks.length) {
				return {
					...state,
					currentTrack: state.currentTrack + 1
				}
			} else {
				return state
			}
		case 'PREV_SONG':
			if (state.currentTrack > 0) {
				return {
					...state,
					currentTrack: state.currentTrack - 1
				}
			} else {
				return state
			}

		default:
			return state
	}
}

export default player
