const initialState = {
	savedAlbums: [],
	followedPlaylists: [],
	playlistTracks: [],
	categories: []
}

const spotifyApi = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_SAVED_ALBUMS':
			return {
				...state,
				savedAlbums: action.payload
			}
		case 'FETCH_FOLLOWED_PLAYLISTS':
			return {
				...state,
				followedPlaylists: action.payload
			}
		case 'FETCH_PLAYLIST_TRACKS':
			return {
				...state,
				playlistTracks: [...state.playlistTracks, ...action.payload]
			}
		case 'FETCH_CATEGORIES':
			return {
				...state,
				categories: action.payload
			}
		case 'CLEAR_PLAYLIST_TRACKS':
			return {
				...state,
				playlistTracks: []
			}
		default:
			return state
	}
}

export default spotifyApi
