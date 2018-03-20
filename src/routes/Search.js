import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import AlbumCard from '../components/AlbumCard'
import ArtistCard from '../components/ArtistCard'
import TrackCard from '../components/TrackCard'
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
		width: `calc(95vw - ${drawerWidth}px)`,
		[theme.breakpoints.down('md')]: {
			width: `calc(95vw)`
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
	}
	searchSpotify(props) {
		spotifyApi
			.search(props.match.params.query, ['album', 'track', 'artist'], {
				limit: 20,
				offset: 0
			})
			.then(data => {
				console.log(data)
				this.setState({
					albums: data.body.albums.items.map(item => (
						<AlbumCard
							image={item.images[1].url}
							name={item.name}
							id={item.id}
						/>
					)),
					artists: data.body.artists.items.map(item => {
						if (item.images.length > 0) {
							return (
								<ArtistCard
									image={item.images[0].url}
									name={item.name}
									id={item.id}
								/>
							)
						} else {
							return <div />
						}
					}),
					tracks: data.body.tracks.items.map(item => {
						if (item.album.images.length > 0) {
							return (
								<TrackCard
									image={item.album.images[0].url}
									name={item.name}
									id={item.id}
								/>
							)
						} else {
							return <div />
						}
					})
				})
			})
			.catch(err => console.log(err))
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
						Albums
					</Typography>
					<div className={classes.cardWrapper}>{this.state.albums}</div>
				</div>

				<div className={classes.category}>
					<Typography variant="display1" component="h2" align="center">
						Artists
					</Typography>
					<div className={classes.cardWrapper}>{this.state.artists}</div>
				</div>
				<div className={classes.category}>
					<Typography variant="display1" component="h2" align="center">
						Tracks
					</Typography>
					<div className={classes.cardWrapper}>{this.state.tracks}</div>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Search)
