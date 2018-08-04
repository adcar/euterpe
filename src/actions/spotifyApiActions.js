import SpotifyWebApi from 'spotify-web-api-node'
import getToken from '../getToken'
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

const getSavedAlbums = albums => ({
	type: 'FETCH_SAVED_ALBUMS',
	payload: albums
})
export const fetchSavedAlbums = () => dispatch => {
	spotifyApi
		.getMySavedAlbums({ limit: 50, offset: 0 })
		.then(res =>
			dispatch(getSavedAlbums(res.body.items.map(item => item.album)))
		)
}

const getFollowedPlaylists = playlists => ({
	type: 'FETCH_FOLLOWED_PLAYLISTS',
	payload: playlists
})
export const fetchFollowedPlaylists = () => dispatch => {
	spotifyApi.getMe().then(res => {
		let userId = res.body.id
		spotifyApi
			.getUserPlaylists(userId)
			.then(res => dispatch(getFollowedPlaylists(res.body.items)))
	})
}

const getPlaylistTracks = tracks => ({
	type: 'FETCH_PLAYLIST_TRACKS',
	payload: tracks
})
export const fetchPlaylistTracks = (user, id, offset = 0) => dispatch => {
	spotifyApi
		.getPlaylistTracks(user, id, { offset: offset })
		.then(res =>
			dispatch(getPlaylistTracks(res.body.items.map(item => item.track)))
		)
}


const getCategories = categories => ({
	type: 'FETCH_CATEGORIES',
	payload: categories
})
export const fetchCategories = () => dispatch => {
	spotifyApi.getCategories().then(
		res => dispatch(getCategories(res.body.categories.items))
	)
}

const getCategoryName = category => ({
	type: 'FETCH_CATEGORY_NAME',
	payload: category
})
export const fetchCategoryName = id => dispatch => {
	spotifyApi.getCategory(id).then(res => dispatch(getCategoryName(res.body.name)))
}

const getCategoryPlaylists = playlists => ({
	type: 'FETCH_CATEGORY_PLAYLISTS',
	payload: playlists
})
export const fetchCategoryPlaylists = id => dispatch => {
	spotifyApi.getPlaylistsForCategory(id).then(res => dispatch(getCategoryPlaylists(res.body.playlists.items)))
}

export const clearPlaylistTracks = () => ({
	type: 'CLEAR_PLAYLIST_TRACKS'
})
