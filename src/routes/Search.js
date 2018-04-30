import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import AlbumCard from '../containers/AlbumCard'
import ArtistCard from '../components/ArtistCard'
import TrackCard from '../containers/TrackCard'
import drawerWidth from '../drawerWidth'

const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

const styles = theme => ({
	cardWrapper: {
		margin: '0 auto',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexWrap: 'nowrap',
		overflowX: 'auto',
		width: `calc(90vw - ${drawerWidth}px)`,
		[theme.breakpoints.down('sm')]: {
			width: `calc(80vw)`
		}
	},
	category: {
		marginTop: theme.spacing.unit * 5,
		marginBottom: theme.spacing.unit * 5
	}
})

class Search extends Component {
	constructor() {
		super()
		this.state = {
			albums: [],
			artists: [],
			tracks: []
		}
		this.play = this.play.bind(this)
	}
	play(object) {
		this.props.playSong(object)
	}
	searchSpotify(props) {
		spotifyApi
			.search(
				props.match.params.query,
				['album', 'track', 'playlist', 'artist'],
				{
					limit: 20,
					offset: 0
				}
			)
			.then(data => {
				this.setState({
					albums: data.body.albums.items.map(item => (
						<AlbumCard
							key={item.id}
							image={item.images[1].url}
							name={item.name}
							id={item.id}
							artist={item.artists[0]}
						/>
					)),
					artists: data.body.artists.items.map(item => {
						if (item.images.length > 0) {
							return (
								<ArtistCard
									key={item.id}
									image={item.images[0].url}
									name={item.name}
									id={item.id}
								/>
							)
						} else {
							return null
						}
					}),
					playlists: data.body.playlists.items.map(item => {
						if (item.images.length > 0) {
							return (
								<AlbumCard
									playlist
									key={item.id}
									image={item.images[0].url}
									id={item.id}
									name={item.name}
									artist={item.owner}
								/>
							)
						} else {
							return null
						}
					}),
					tracks: data.body.tracks.items.map(item => {
						if (item.album.images.length > 0) {
							return (
								<TrackCard
									key={item.id}
									image={item.album.images[0].url}
									name={item.name}
									id={item.id}
									artist={item.artists[0].name}
									play={e =>
										this.play({
											image: item.album.images[0].url,
											name: item.name,
											id: item.id,
											artist: item.artists[0].name
										})
									}
								/>
							)
						} else {
							return null
						}
					})
				})
			})
			.catch(console.log)
	}
	componentWillReceiveProps(nextProps) {
		this.searchSpotify(nextProps)
	}
	componentDidMount() {
		this.searchSpotify(this.props)
	}
	render() {
		const { classes } = this.props
		return (
			<div>
				<div className={classes.category}>
					<Typography variant="display1" component="h2" align="center">
						Tracks
					</Typography>
					<div className={classes.cardWrapper}>{this.state.tracks}</div>
				</div>
				<div className={classes.category}>
					<Typography variant="display1" component="h2" align="center">
						Albums
					</Typography>
					<div className={classes.cardWrapper}>{this.state.albums}</div>
				</div>
				<div className={classes.category}>
					<Typography variant="display1" component="h2" align="center">
						Playlists
					</Typography>
					<div className={classes.cardWrapper}>{this.state.playlists}</div>
				</div>
				<div className={classes.category}>
					<Typography variant="display1" component="h2" align="center">
						Artists
					</Typography>
					<div className={classes.cardWrapper}>{this.state.artists}</div>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Search)
