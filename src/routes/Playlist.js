import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from '@material-ui/core/styles'
import PlayArrow from '@material-ui/icons/PlayArrow'
import List from '@material-ui/core/List';
import { playPlaylist } from '../actions/playerActions'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import SongItem from '../containers/SongItem'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { clearPlaylistTracks } from '../actions/spotifyApiActions'
import SpotifyWebApi from 'spotify-web-api-node'
import { fetchPlaylistTracks } from '../actions/spotifyApiActions'
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
			playlistArt: 'https://via.placeholder.com/400x400',
			tracksInfo: [
				{
					artist: {
						id: ''
					}
				}
			],
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
	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.setState({
				tracksInfo: this.props.tracks.map(item => ({
					name: item.name,
					artist: item.artists[0],
					id: item.id,
					image: item.album.images[1].url,
					duration: item.duration_ms
				})),
				tracks: this.props.tracks.map((item, index) => (
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
		}
	}
	componentDidMount() {
		spotifyApi
			.getPlaylist(this.props.match.params.user, this.props.match.params.id)
			.then(data => {
				this.setState({
					playlistName: data.body.name,
					playlistArtist: data.body.owner.display_name,
					playlistArt: data.body.images[0].url
				})
				this.props.dispatch(clearPlaylistTracks())
				for (let i = 0; i < Math.ceil(data.body.tracks.total / 100); i++) {
					this.props.dispatch(
						fetchPlaylistTracks(
							this.props.match.params.user,
							this.props.match.params.id,
							i * 100
						)
					)
				}
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
const mapStateToProps = state => ({
	tracks: state.spotifyApi.playlistTracks
})
const PlaylistWithStyles = withStyles(styles)(Playlist)
export default connect(mapStateToProps)(PlaylistWithStyles)
