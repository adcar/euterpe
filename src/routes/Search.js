import React, { Component } from 'react'
import getToken from '../getToken'
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

class Search extends Component {
	constructor() {
		super()
		this.state = {
			albums: [],
			artists: [],
			tracks: []
		}
	}
	componentWillReceiveProps(nextProps) {
		console.log(nextProps.match.params.query)
		spotifyApi
			.search(nextProps.match.params.query, ['album', 'track', 'artist'], {
				limit: 10,
				offset: 0
			})
			.then(data => {
				this.setState({
					albums: data.albums,
					artists: data.artists,
					tracks: data.tracks
				})
			})
			.catch(err => console.log(err))
	}
	render() {
		return <div />
	}
}

export default Search
