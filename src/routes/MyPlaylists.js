import React, { Component } from 'react'
import getToken from '../getToken'

class MyPlaylists extends Component {
	componentDidMount() {
		console.log(getToken('spotifyAccessToken'))
	}
	render() {
		return (
			<div>
				<h2>My Playlists</h2>
				<h2>Playlists I'm Following</h2>
			</div>
		)
	}
}

export default MyPlaylists
