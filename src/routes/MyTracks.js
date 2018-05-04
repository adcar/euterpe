import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import SongItem from '../components/SongItem'
import PageLabel from '../components/PageLabel'
import CardWrapper from '../components/CardWrapper'

import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi()

const styles = theme => ({
	card: {
		width: 300,
		height: 300,
		display: 'flex',
		flexDirection: 'column',
		margin: theme.spacing.unit
	}
})

class MyTracks extends Component {
	constructor() {
		super()
		this.state = {
			token: '',
			albums: {},
			albumItems: []
		}
	}

	componentWillMount() {
		this.setState({
			token: getToken('spotifyAccessToken')
		})
	}
	componentDidMount() {
		spotifyApi.setAccessToken(this.state.token)
		spotifyApi
			.getMyTopTracks({
				limit: 50,
				offset: 0
			})
			.then(
				data => {
					this.setState({
						albums: data.body.items,
						albumItems: data.body.items.map(item => (
							<SongItem
								type="track"
								key={item.id}
								id={item.id}
								name={item.name}
								artist={item.artists[0].name}
								image={item.album.images[0].url}
								duration={item.duration_ms}
							/>
						))
					})
				},
				function(err) {
					console.log('Something went wrong!', err)
				}
			)
	}
	render() {
		if (this.state.albumItems.length > 0) {
			return (
				<div>
					<PageLabel>My Top Tracks</PageLabel>
					<CardWrapper>{this.state.albumItems}</CardWrapper>
				</div>
			)
		} else {
			return <CircularProgress />
		}
	}
}

export default withStyles(styles)(MyTracks)
