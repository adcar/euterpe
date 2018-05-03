import { combineReducers } from 'redux'
import player from './player'
import search from './search'

export default combineReducers({
	player,
	search
})
