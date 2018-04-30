import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import getToken from '../getToken'
import AlbumCard from '../containers/AlbumCard'
import TrackCard from '../containers/TrackCard'
import { withStyles } from 'material-ui/styles'
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))
const styles = theme => ({
	profile: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	profileImg: {
		height: 200,
		width: 200,
		borderRadius: '50%'
	},
	artistLabel: {
		marginTop: theme.spacing.unit
	},
	cardWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	section: {
		marginTop: theme.spacing.unit * 5,
		marginBottom: theme.spacing.unit * 5
	}
})

class Artist extends Component {
	constructor() {
		super()
		this.state = {
			artist: {
				images: [{ url: '' }, { url: '' }]
			}
		}
	}
	componentDidMount() {
		const { id } = this.props.match.params
		spotifyApi.getArtist(id).then(data => {
			this.setState({
				artist: data.body
			})
		})

		spotifyApi.getArtistAlbums(id).then(data => {
			this.setState({
				albums: data.body.items.map(item => (
					<AlbumCard
						key={item.id}
						image={item.images[1].url}
						name={item.name}
						id={item.id}
						artist={item.artists[0]}
					/>
				))
			})
		})
		spotifyApi.getArtistTopTracks(id, 'US').then(data => {
			console.log(data)
			this.setState({
				tracks: data.body.tracks.map(item => (
					<TrackCard
						key={item.id}
						image={item.album.images[1].url}
						name={item.name}
						id={item.id}
						artist={item.artists[0].name}
						play={e =>
							this.props.playSong({
								image: item.album.images[0].url,
								name: item.name,
								id: item.id,
								artist: item.artists[0].name
							})
						}
					/>
				))
			})
		})
	}
	render() {
		const { artist } = this.state
		const { classes } = this.props
		return (
			<div>
				<div className={classes.profile}>
					<img
						src={artist.images[1].url}
						alt={`${artist.name}`}
						className={classes.profileImg}
					/>
					<Typography
						variant="display2"
						align="center"
						className={classes.artistLabel}
					>
						{artist.name}
					</Typography>
				</div>
				<div className={classes.section}>
					<Typography variant="display1" align="center">
						Albums
					</Typography>
					<div className={classes.cardWrapper}>{this.state.albums}</div>
				</div>
				<div className={classes.section}>
					<Typography variant="display1" align="center">
						Top Tracks
					</Typography>
					<div className={classes.cardWrapper}>{this.state.tracks}</div>
				</div>
			</div>
		)
	}
}
Artist.propTypes = {
	match: PropTypes.object.isRequired
}
export default withStyles(styles)(Artist)
