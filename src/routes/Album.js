import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'

import Typography from 'material-ui/Typography'

import PlayArrow from 'material-ui-icons/PlayArrow'

import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import { playPlaylist } from '../actions/playerActions'
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
		this.togglePlay = this.togglePlay.bind(this)
	}
	togglePlay(index) {
		this.props.dispatch(
			playPlaylist({
				currentTrack: index,
				tracks: this.state.tracksInfo
			})
		)
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
							<SongItem
								key={item.id}
								name={item.name}
								duration={item.duration_ms}
								artist={item.artists[0].name}
							/>
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
					<Button
						style={{ marginTop: 20 }}
						variant="raised"
						color="primary"
						onClick={() => this.togglePlay(0)}
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
const AlbumWithStyles = withStyles(styles)(Album)
export default connect()(AlbumWithStyles)
