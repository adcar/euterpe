const initialState = {
	savedAlbums: []
}

const api = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_SAVED_ALBUMS':
			return {
				...state,
				savedAlbums: action.payload
			}
		default:
			return state
	}
}

export default api
