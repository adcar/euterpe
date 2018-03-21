import React, { Component } from 'react'
import getToken from '../getToken'
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

class Home extends Component {
	render() {
		return <h1>Home</h1>
	}
}

export default Home
