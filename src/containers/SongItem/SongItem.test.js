import React from 'react'
import SongItem from './index.js'
import { shallow, mount, render } from 'enzyme'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import toJson from 'enzyme-to-json'
const middlewares = []
const mockStore = configureStore(middlewares)

test('SongItem renders correctly', () => {
	const initialState = {
		player: {
			tracks: [
				{
					image: 'https://via.placeholder.com/120x120',
					name: '',
					artist: {
						id: '',
						name: ''
					},
					id: ''
				}
			],
			currentTrack: 0,
			isPlaying: false,
			currentTracks: 'tracks',
			shuffledTracks: []
		}
	}
	const store = mockStore(initialState)
	let item = {
		id: 'abcdefg',
		name: 'Lose Yourself',
		duration_ms: 4000,
		artists: [
			{
				name: 'eminem',
				id: 'abcdefg'
			}
		]
	}
	let index = 1
	let playFunc = () => {}

	const wrapper = shallow(
		<MemoryRouter>
			<SongItem
				store={store}
				type="playlist"
				key={item.id}
				id={item.id}
				name={item.name}
				duration={item.duration_ms}
				artist={item.artists[0]}
				index={index}
				play={playFunc}
			/>
		</MemoryRouter>
	)
	expect(toJson(wrapper)).toBeTruthy()
})
