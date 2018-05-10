import { combineReducers } from 'redux'
import player from './player'
import search from './search'
import api from './api'

export default combineReducers({
	player,
	api,
	search
})
