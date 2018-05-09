import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import PlayArrow from 'material-ui-icons/PlayArrow'
import List from 'material-ui/List'
import { playPlaylist } from '../actions/playerActions'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import SongItem from '../components/SongItem'
import Typography from 'material-ui/Typography'
import Card, { CardMedia, CardContent } from 'material-ui/Card'
import SpotifyWebApi from 'spotify-web-api-node'
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

class Playlist extends Component {
	constructor() {
		super()
		this.state = {
			tracks: [],
			tracksJson: [],
			playlistName: '',
			playlistArtist: '',
			playlistArt: '',
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
			.then(data => {
				console.log(data)
				this.setState({
					playlistName: data.body.name,
					playlistArtist: data.body.owner.display_name,
					playlistArt: data.body.images[0].url
				})
			})
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
							artist={item.track.artists[0]}
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
			<div className={classes.twoColumn}>
				<div>
					<Card className={classes.card}>
						<CardMedia
							image={this.state.playlistArt}
							className={classes.media}
							title={this.state.playlistName}
						/>
						<CardContent className={classes.center}>
							<Typography
								className={classes.title}
								variant="headline"
								align="center"
							>
								{this.state.playlistName}
							</Typography>
							<Typography
								align="center"
								className={classes.subheading}
								variant="subheading"
							>
								{this.state.playlistArtist}
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

const PlaylistWithStyles = withStyles(styles)(Playlist)
export default connect()(PlaylistWithStyles)
