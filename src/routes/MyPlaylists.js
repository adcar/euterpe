import React, { Component } from 'react'
import AlbumCard from '../containers/AlbumCard'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import PageLabel from '../components/PageLabel'
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

const styles = theme => ({
	cardWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
	}
})
class MyPlaylists extends Component {
	constructor() {
		super()
		this.state = {
			playlists: []
		}
	}
	componentDidMount() {
		spotifyApi.getMe().then(res => {
			let userId = res.body.id
			spotifyApi.getUserPlaylists(userId).then(res => {
				this.setState({
					playlists: res.body.items.map(item => (
						<AlbumCard
							type="playlist"
							name={item.name}
							image={item.images[0].url}
							id={item.id}
							artist={item.owner}
							key={item.id}
							playlist
						/>
					))
				})
			})
		})
	}
	render() {
		const { classes } = this.props
		return (
			<div>
				<PageLabel>My Playlists</PageLabel>
				<div className={classes.cardWrapper}>{this.state.playlists}</div>
			</div>
		)
	}
}

export default withStyles(styles)(MyPlaylists)
