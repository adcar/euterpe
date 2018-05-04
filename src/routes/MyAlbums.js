import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'

import AlbumCard from '../containers/AlbumCard'
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

class MyAlbums extends Component {
	constructor() {
		super()
		this.state = {
			albums: {},
			albumItems: []
		}
	}
	componentDidMount() {
		spotifyApi.setAccessToken(getToken('spotifyAccessToken'))
		spotifyApi
			.getMySavedAlbums({
				limit: 50,
				offset: 0
			})
			.then(
				data => {
					this.setState({
						albums: data.body.items,
						albumItems: data.body.items.map(item => (
							<AlbumCard
								type="album"
								image={item.album.images[1].url}
								name={item.album.name}
								id={item.album.id}
								artist={item.album.artists[0]}
								key={item.album.id}
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
		const { classes } = this.props

		if (this.state.albumItems.length > 0) {
			return (
				<div>
					<PageLabel>My Albums</PageLabel>
					<CardWrapper>{this.state.albumItems}</CardWrapper>
				</div>
			)
		} else {
			return <CircularProgress />
		}
	}
}

export default withStyles(styles)(MyAlbums)
