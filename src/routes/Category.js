import React, { Component } from 'react'
import AlbumCard from '../components/AlbumCard'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
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
class Category extends Component {
	constructor() {
		super()
		this.state = {
			name: '',
			playlists: []
		}
	}
	componentDidMount() {
		const { id } = this.props.match.params
		spotifyApi.getCategory(id).then(res => {
			this.setState({
				name: res.body.name
			})
		})
		spotifyApi.getPlaylistsForCategory(id).then(res => {
			this.setState({
				playlists: res.body.playlists.items.map(item => (
					<AlbumCard
						name={item.name}
						image={item.images[0].url}
						id={item.id}
						artist={item.owner}
						playlist
					/>
				))
			})
		})
	}
	render() {
		const { classes } = this.props
		return (
			<div>
				<Typography component="h1" variant="display1" align="center">
					{this.state.name}
				</Typography>
				<div className={classes.cardWrapper}>{this.state.playlists}</div>
			</div>
		)
	}
}

export default withStyles(styles)(Category)
