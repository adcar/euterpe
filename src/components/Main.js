import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MyTracks from '../routes/MyTracks'

class Main extends Component {
	render() {
		return (
			<div>
				<h1>hi</h1>
				<Link to="/about">To /about</Link>
			</div>
		)
	}
}

export default Main
