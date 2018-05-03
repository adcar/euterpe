import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'

import PlayArrow from 'material-ui-icons/PlayArrow'

import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import { playPlaylist } from '../actions/playerActions'
import SongItem from '../components/SongItem'
import PageLabel from '../components/PageLabel'

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
			albumInfo: {},
			tracksInfo: []
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
						image: track.album.images[1].url,
						id: track.id
					})),
					tracks: data.body.tracks.map((item, index) => (
						<SongItem
							type="playlist"
							key={item.id}
							id={item.id}
							name={item.name}
							duration={item.duration_ms}
							artist={item.artists[0].name}
							index={index}
							play={this.play}
						/>
					))
				})
			})
			.catch(console.log)
	}
	render() {
		const { classes } = this.props
		return (
			<div>
				<div className={classes.title}>
					<PageLabel>{this.state.albumInfo.name}</PageLabel>
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

const AlbumWithStyles = withStyles(styles)(Album)
export default connect()(AlbumWithStyles)
