import { combineReducers } from 'redux'
import player from './player'
import search from './search'
import spotifyApi from './spotifyApi'
import settings from './settings'

export default combineReducers({
	player,
	spotifyApi,
	search,
	settings
})
