import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import PlayArrow from 'material-ui-icons/PlayArrow'
import Pause from 'material-ui-icons/Pause'
import List, { ListItem, ListItemText } from 'material-ui/List'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

const convertToSeconds = millis => {
	let minutes = Math.floor(millis / 60000)
	let seconds = ((millis % 60000) / 1000).toFixed(0)
	return `${minutes}:${(seconds < 10 ? '0' : '') + seconds}`
}

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
	}
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
						image: item.track.album.images[1].url
					})),

					tracks: data.body.items.map((item, index) => {
						return (
							<ListItem
								key={item.track.id}
								button
								onClick={e => {
									this.props.togglePlay('play')
									this.props.getTracks(this.state.tracksInfo, e)
									this.props.trackChange(index, e)
								}}
							>
								<ListItemText>
									<Typography>
										{item.track.name} ({convertToSeconds(
											item.track.duration_ms
										)})
									</Typography>
								</ListItemText>
							</ListItem>
						)
					})
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
					{' '}
					<Typography component="h1" variant="display1" align="center">
						{this.state.playlistName}
					</Typography>
					{this.props.playing ? (
						<Button
							style={{ marginTop: 20 }}
							variant="raised"
							color="primary"
							onClick={e => {
								this.props.togglePlay()
								this.props.getTracks(this.state.tracksInfo, e)
								this.props.trackChange(0, e)
							}}
						>
							<Pause style={{ marginRight: 10 }} />
							Pause
						</Button>
					) : (
						<Button
							style={{ marginTop: 20 }}
							variant="raised"
							color="primary"
							onClick={e => {
								this.props.togglePlay()
								this.props.getTracks(this.state.tracksInfo, e)
								this.props.trackChange(0, e)
							}}
						>
							<PlayArrow style={{ marginRight: 10 }} />
							Play
						</Button>
					)}
				</div>

				<List className={classes.trackSelector}>{this.state.tracks}</List>
			</div>
		)
	}
}

export default withStyles(styles)(Playlist)
