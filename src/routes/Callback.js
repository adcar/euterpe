import React, { Component } from 'react'
import Cookie from 'js-cookie'
import { withRouter } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import qs from 'qs'

class Callback extends Component {
	componentDidMount() {
		if (this.props.location.hash.length > 0) {
			Cookie.set(
				'spotifyAccessToken',
				qs.parse(this.props.location.hash)['#access_token'],
				{ expires: 1 / 24 }
			)
			this.props.history.push('/') // Go back to home page
		} else {
			console.log('No Access Token in callback ??')
		}
	}
	render() {
		return <CircularProgress />
	}
}

export default withRouter(Callback)
