import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import PlayArrow from 'material-ui-icons/PlayArrow'
import List from 'material-ui/List'
import { playPlaylist } from '../actions/playerActions'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import SongItem from '../components/SongItem'

const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

const styles = theme => ({
	title: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		jusitfyContent: 'center',
		alignItems: 'center'
	}
})

class Playlist extends Component {
	constructor() {
		super()
		this.state = {
			tracks: [],
			tracksJson: [],
			playlistName: '',
			tracksInfo: [],
			song: ''
		}
		this.play = this.play.bind(this)
	}
	play(index) {
		this.props.dispatch(
			playPlaylist({
				currentTrack: index,
				tracks: this.state.tracksInfo
			})
		)
	}
	co
	componentDidMount() {
		spotifyApi
			.getPlaylist(this.props.match.params.user, this.props.match.params.id)
			.then(data =>
				this.setState({
					playlistName: data.body.name
				})
			)
		spotifyApi
			.getPlaylistTracks(
				this.props.match.params.user,
				this.props.match.params.id
			)
			.then(data => {
				this.setState({
					tracksInfo: data.body.items.map(item => ({
						name: item.track.name,
						artist: item.track.artists[0].name,
						image: item.track.album.images[1].url,
						id: item.track.id
					})),

					tracks: data.body.items.map((item, index) => (
						<SongItem
							type="playlist"
							key={item.track.id}
							id={item.track.id}
							name={item.track.name}
							duration={item.track.duration_ms}
							artist={item.track.artists[0].name}
							index={index}
							play={this.play}
						/>
					))
				})
			})
			.catch(err => {
				console.error(err)
			})
	}
	render() {
		const { classes } = this.props
		return (
			<div>
				<div className={classes.title}>
					<Typography component="h1" variant="display1" align="center">
						{this.state.playlistName}
					</Typography>
					<Button
						style={{ marginTop: 20 }}
						variant="raised"
						color="primary"
						onClick={() => this.play(0)}
					>
						<PlayArrow style={{ marginRight: 10 }} />
						Play
					</Button>
				</div>

				<List className={classes.trackSelector}>{this.state.tracks}</List>
			</div>
		)
	}
}

const PlaylistWithStyles = withStyles(styles)(Playlist)
export default connect()(PlaylistWithStyles)
