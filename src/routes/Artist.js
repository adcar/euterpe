import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import getToken from '../getToken'
import CardWrapper from '../components/CardWrapper'
import AlbumCard from '../containers/AlbumCard'
import SongItem from '../containers/SongItem'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import SpotifyWebApi from 'spotify-web-api-node'
import { playPlaylist } from '../actions/playerActions'
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
	play(index) {
		this.props.dispatch(
			playPlaylist({
				currentTrack: index,
				tracks: this.state.tracksInfo
			})
		)
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
						type="album"
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
						name={item.name}
						id={item.id}
						index={index}
						duration={item.duration_ms}
						artist={item.artists[0]}
						play={this.play.bind(this)}
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
					<CardWrapper>{this.state.albums}</CardWrapper>
				</div>
				<div className={classes.section}>
					<Typography variant="display1" align="center">
						Top Tracks
					</Typography>
					<div>{this.state.tracks}</div>
				</div>
			</div>
		)
	}
}
Artist.propTypes = {
	match: PropTypes.object.isRequired
}

const ArtistWithStyles = withStyles(styles)(Artist)

export default connect()(ArtistWithStyles)
