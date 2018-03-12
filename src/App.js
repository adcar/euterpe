import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import Main from './components/Main'
import OauthPopup from 'react-oauth-popup'
const queryString = require('query-string')
const SpotifyWebApi = require('spotify-web-api-node')

let scopes = ['user-read-private', 'user-read-email'],
	redirectUri = 'http://localhost:3000/callback',
	clientId = '88ed4852708440e6908246065f5a7ca4',
	state = 'state'

let spotifyApi = new SpotifyWebApi({
	redirectUri: redirectUri,
	clientId: clientId
})

class Auth extends Component {
	componentDidMount() {
		console.log(queryString.parse(this.props.location.hash).access_token)
	}
	render() {
		return <div />
	}
}

class Login extends Component {
	componentDidMount() {
		window.location =
			'https://accounts.spotify.com:443/authorize?client_id=88ed4852708440e6908246065f5a7ca4&response_type=token&redirect_uri=http://localhost:3000/callback&scope=user-read-private%20user-read-email'
		this.setState({ loggedIn: true })
	}
	render() {
		return <div />
	}
}

class Oauth extends Component {
	onCode(code) {
		console.log('wooooo a code', code)
	}
	render() {
		return (
			<OauthPopup
				url="https://accounts.spotify.com:443/authorize?client_id=88ed4852708440e6908246065f5a7ca4&response_type=token&redirect_uri=http://localhost:3000/callback&scope=user-read-private%20user-read-email"
				onCode={this.onCode}
			>
				<div>Click me to open a Popup</div>
			</OauthPopup>
		)
	}
}

const app = () => (
	<Router>
		<div>
			<Navbar />
			<Oauth />
		</div>
	</Router>
)

export default app
