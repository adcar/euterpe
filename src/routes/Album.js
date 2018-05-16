import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'

import PlayArrow from 'material-ui-icons/PlayArrow'

import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import { playPlaylist } from '../actions/playerActions'
import SongItem from '../components/SongItem'
import Card, { CardMedia, CardContent } from 'material-ui/Card'
import SpotifyWebApi from 'spotify-web-api-node'
import Typography from 'material-ui/Typography'
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

const styles = theme => ({
	twoColumn: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		[theme.breakpoints.up('md')]: {
			justifyContent: 'space-around',
			flexDirection: 'row',
			alignItems: 'start'
		}
	},
	media: {
		width: 400,
		height: 400
	},
	title: {
		maxWidth: 300
	},
	subheading: {
		marginTop: theme.spacing.unit
	},
	card: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		top: 100,
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,

		[theme.breakpoints.up('xl')]: {
			position: 'fixed'
		}
	},
	center: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column'
	}
})

class Album extends Component {
	constructor() {
		super()
		this.state = {
			tracks: [],
			albumArt: 'https://via.placeholder.com/400x400',
			albumName: '',
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
					albumArt: data.body.images[0].url,
					albumName: data.body.name,
					albumArtist: data.body.artists[0].name
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
						artist: track.artists[0],
						image: track.album.images[1].url,
						id: track.id,
						duration: track.duration_ms
					})),
					tracks: data.body.tracks.map((item, index) => (
						<SongItem
							type="playlist"
							key={item.id}
							id={item.id}
							name={item.name}
							duration={item.duration_ms}
							artist={item.artists[0]}
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
			<div className={classes.twoColumn}>
				<div>
					<Card className={classes.card}>
						<CardMedia
							image={this.state.albumArt}
							className={classes.media}
							title={this.state.albumName}
						/>
						<CardContent className={classes.center}>
							<Typography
								className={classes.title}
								variant="headline"
								align="center"
							>
								{this.state.albumName}
							</Typography>
							<Typography
								align="center"
								className={classes.subheading}
								variant="subheading"
							>
								{this.state.albumArtist}
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
						</CardContent>
					</Card>
				</div>
				<div>
					<List className={classes.trackSelector}>{this.state.tracks}</List>
				</div>
			</div>
		)
	}
}

const AlbumWithStyles = withStyles(styles)(Album)
export default connect()(AlbumWithStyles)
