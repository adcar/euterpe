import React, { Component } from 'react'
import AlbumCard from '../containers/AlbumCard'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import PageLabel from '../components/PageLabel'
import SpotifyWebApi from 'spotify-web-api-node'
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
	}
	render() {
		const { classes } = this.props
		return (
			<div>
				<PageLabel>{this.state.name}</PageLabel>
				<div className={classes.cardWrapper}>{this.state.playlists}</div>
			</div>
		)
	}
}

export default withStyles(styles)(Category)
