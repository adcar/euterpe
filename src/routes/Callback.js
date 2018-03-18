import React, { Component } from 'react'
import Cookie from 'js-cookie'
import { withRouter } from 'react-router-dom'

const queryString = require('query-string')

class Callback extends Component {
	componentDidMount() {
		if (this.props.location.hash.length > 0) {
			Cookie.set(
				'spotifyAccessToken',
				queryString.parse(this.props.location.hash).access_token,
				{ expires: 1 / 24 }
			)
			this.props.history.push('/') // Redirects back home
		} else {
		  console.log('No Access Token in callback ??')
		}
	}
	render() {
		return <h1>Redirecting...</h1>
	}
}

export default withRouter(Callback)
