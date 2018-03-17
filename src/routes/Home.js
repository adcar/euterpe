import React, { Component } from 'react'
import Cookie from 'js-cookie'
const queryString = require('query-string')

class Home extends Component {
	componentDidMount() {
		if (this.props.location.hash.length > 0) {
			Cookie.set(
				'spotifyAccessToken',
				queryString.parse(this.props.location.hash).access_token,
				{ expires: 1 / 24 }
			)
		} else {
			window.location =
				'https://accounts.spotify.com:443/authorize?client_id=88ed4852708440e6908246065f5a7ca4&response_type=token&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email%20user-library-read'
		}
	}
	render() {
		return <h1>Home</h1>
	}
}

export default Home
