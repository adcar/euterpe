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
