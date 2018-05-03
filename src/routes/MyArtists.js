import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import ArtistCard from '../components/ArtistCard'
import { CircularProgress } from 'material-ui/Progress'
import PageLabel from '../components/PageLabel'

const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()

const styles = theme => ({
	cardWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
	}
})

class MyAlbums extends Component {
	constructor() {
		super()
		this.state = {
			artists: []
		}
	}

	componentDidMount() {
		spotifyApi.setAccessToken(getToken('spotifyAccessToken'))
		spotifyApi.getFollowedArtists({ limit: 50, offset: 0 }).then(
			data => {
				console.log(data)
				this.setState({
					artists: data.body.artists.items.map(artist => (
						<ArtistCard
							name={artist.name}
							image={artist.images[0].url}
							id={artist.id}
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

		if (this.state.artists.length > 0) {
			return (
				<div>
					<PageLabel>Artists</PageLabel>
					<div className={classes.cardWrapper}>{this.state.artists}</div>
				</div>
			)
		} else {
			return <CircularProgress />
		}
	}
}

export default withStyles(styles)(MyAlbums)
