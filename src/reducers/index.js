import { combineReducers } from 'redux'
import player from './player'
import search from './search'
import spotifyApi from './spotifyApi'

export default combineReducers({
	player,
	spotifyApi,
	search
})
