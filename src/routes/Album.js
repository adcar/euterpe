import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'

import Typography from 'material-ui/Typography'

import PlayArrow from 'material-ui-icons/PlayArrow'
import Pause from 'material-ui-icons/Pause'

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

class Album extends Component {
	constructor() {
		super()
		this.state = {
			tracks: [],
			tracksJson: [],
			albumInfo: {},
			tracksInfo: [],
			playing: true
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			currentTrack: nextProps.currentTrack
		})
	}

	componentDidMount() {
		spotifyApi
			.getAlbum(this.props.match.params.id)
			.then(data => {
				this.setState({
					albumInfo: data.body
				})
				return Array.from(data.body.tracks.items).map(function(t) {
					return t.id
				})
			})
			.then(trackIds => spotifyApi.getTracks(trackIds))
			.then(data => {
				this.setState({
					tracksInfo: data.body.tracks.map(track => ({
						name: track.name,
						artist: track.artists[0].name,
						image: track.album.images[1].url
					})),
					tracks: data.body.tracks.map((item, index) => {
						return (
							<ListItem
								key={item.id}
								button
								onClick={e => {
									this.props.getTracks(this.state.tracksInfo, e)
									this.props.trackChange(index, e)
									this.props.togglePlay('play')
								}}
							>
								<ListItemText>
									<Typography>
										{this.state.playing} {item.name} ({convertToSeconds(
											item.duration_ms
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
						{this.state.albumInfo.name}
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

export default withStyles(styles)(Album)
