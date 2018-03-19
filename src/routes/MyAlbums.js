import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import { CircularProgress } from 'material-ui/Progress'

import AlbumCard from '../components/AlbumCard'
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()

const styles = theme => ({
	cardWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
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
								image={item.album.images[1].url}
								name={item.album.name}
								id={item.album.id}
							/>
						))
					})
				},
				function(err) {
					console.log('Something went wrong!', err)
					window.location = '/'
				}
			)
	}
	render() {
		const { classes } = this.props

		if (this.state.albumItems.length > 0) {
			return (
				<div>
					<Typography component="h1" variant="display1" align="center">
						My Albums
					</Typography>
					<div className={classes.cardWrapper}>{this.state.albumItems}</div>
				</div>
			)
		} else {
			return <CircularProgress />
		}
	}
}

export default withStyles(styles)(MyAlbums)
