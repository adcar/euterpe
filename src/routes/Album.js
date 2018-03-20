import React, { Component } from 'react'
import getToken from '../getToken'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import PlayArrow from 'material-ui-icons/PlayArrow'
import Pause from 'material-ui-icons/Pause'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Player from '../components/PlaylistPlayer'
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

const convertToSeconds = millis => {
	let minutes = Math.floor(millis / 60000)
	let seconds = ((millis % 60000) / 1000).toFixed(0)
	return `${minutes}:${(seconds < 10 ? '0' : '') + seconds}`
}

class Album extends Component {
	constructor() {
		super()
		this.state = {
			tracks: [],
			tracksJson: [],
			albumInfo: {},
			currentTrack: 0
		}
	}
	trackChange(index, e) {
		this.setState({
			currentTrack: index,
			played: true
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
					tracks: data.body.tracks.map((item, index) => {
						return (
							<ListItem
								key={item.id}
								button
								onClick={e => this.trackChange(index, e)}
							>
								<ListItemText>
									{item.name} ({convertToSeconds(item.duration_ms)})
								</ListItemText>
							</ListItem>
						)
					}),
					tracksJson: data.body.tracks.map(track => ({
						name: track.name,
						artist: track.artists[0].name,
						image: track.album.images[1].url
					}))
				})
			})
			.catch(err => {
				console.error(err)
			})
	}
	render() {
		return (
			<div>
				<Typography component="h1" variant="display1" align="center">
					{this.state.albumInfo.name}
				</Typography>
				<List>{this.state.tracks}</List>
				<Player
					tracks={this.state.tracksJson}
					currentTrack={this.state.currentTrack}
				/>
			</div>
		)
	}
}

export default Album
