import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'
import getToken from '../getToken'
import { connect } from 'react-redux'
import {
	fetchSavedAlbums,
	fetchFollowedPlaylists
} from '../actions/spotifyApiActions'

import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

const styles = theme => ({
	card: {
		width: 300,
		height: 340,
		display: 'flex',
		flexDirection: 'column',
		margin: theme.spacing.unit
	}
})

class AlbumCard extends Component {
	state = {
		albumIds: []
	}

	// You have to wait (250?) miliseconds to re-fetch because spotify needs time to update its database
	waitTime = 250
	save() {
		if (this.props.type === 'album') {
			spotifyApi
				.addToMySavedAlbums([this.props.id])

				.then(
					setTimeout(
						() => this.props.dispatch(fetchSavedAlbums()),
						this.waitTime
					)
				)
				.catch(err => console.log(err))
		}
		if (this.props.type === 'playlist') {
			spotifyApi
				.followPlaylist(this.props.artist.id, this.props.id)
				.then(
					setTimeout(
						() => this.props.dispatch(fetchFollowedPlaylists()),
						this.waitTime
					)
				)
		}
	}

	remove() {
		if (this.props.type === 'album') {
			spotifyApi
				.removeFromMySavedAlbums([this.props.id])

				.then(
					setTimeout(
						() => this.props.dispatch(fetchSavedAlbums()),
						this.waitTime
					)
				)
				.catch(console.log)
		}
		if (this.props.type === 'playlist') {
			console.log('remove the playlist')
			spotifyApi
				.unfollowPlaylist(this.props.artist.id, this.props.id)
				.then(
					setTimeout(
						() => this.props.dispatch(fetchFollowedPlaylists()),
						this.waitTime
					)
				)
		}
	}

	static getDerivedStateFromProps(nextProps) {
		return {
			albumIds: nextProps.albums.map(album => album.id),
			playlistIds: nextProps.playlists.map(playlist => playlist.id)
		}
	}

	render() {
		const artist =
			this.props.type === 'album' ? (
				<Link
					style={{ color: 'inherit' }}
					to={`/artist/${this.props.artist.id}`}
				>
					{this.props.artist.name}
				</Link>
			) : (
				this.props.artist.display_name
			)
		const saveBtn =
			this.state.albumIds.includes(this.props.id) ||
			this.state.playlistIds.includes(this.props.id) ? (
				<Button size="small" color="primary" onClick={this.remove.bind(this)}>
					Remove
				</Button>
			) : (
				<Button size="small" color="primary" onClick={this.save.bind(this)}>
					Save
				</Button>
			)

		const linkBtn =
			this.props.type === 'playlist' ? (
				<Link
					to={`/playlist/${this.props.artist.id}/${this.props.id}`}
					style={{ textDecoration: 'none' }}
				>
					<Button size="small" color="primary">
						View
					</Button>
				</Link>
			) : (
				<Link to={`/album/${this.props.id}`} style={{ textDecoration: 'none' }}>
					<Button size="small" color="primary">
						View
					</Button>
				</Link>
			)

		const image =
			this.props.type === 'playlist' ? (
				<Link
					to={`/playlist/${this.props.artist.id}/${this.props.id}`}
					style={{ textDecoration: 'none', height: 'auto' }}
				>
					<CardMedia
						style={{ height: 200 }}
						image={this.props.image}
						title="Playlist Cover"
					/>
				</Link>
			) : (
				<Link to={`/album/${this.props.id}`} style={{ textDecoration: 'none' }}>
					<CardMedia
						style={{ height: 200 }}
						image={this.props.image}
						title="Album Cover"
					/>
				</Link>
			)
		const { classes } = this.props
		if (this.props.image && this.props.name && this.props.id) {
			return (
				<Card className={classes.card} key={this.props.id}>
					{image}
					<CardContent>
						<Typography
							variant="title"
							component="h2"
							style={{
								flex: 1,
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis'
							}}
						>
							{this.props.name}
						</Typography>
						<Typography
							variant="subheading"
							component="h3"
							style={{
								marginTop: 10,
								flex: 1,
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis'
							}}
						>
							{artist}
						</Typography>
					</CardContent>
					<CardActions>
						{linkBtn}
						{saveBtn}
					</CardActions>
				</Card>
			)
		} else {
			return <CircularProgress />
		}
	}
}

AlbumCard.propTypes = {
	image: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	artist: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
}
const mapStateToProps = state => ({
	albums: state.spotifyApi.savedAlbums,
	playlists: state.spotifyApi.followedPlaylists
})
const AlbumCardWithStyles = withStyles(styles)(AlbumCard)
export default connect(mapStateToProps)(AlbumCardWithStyles)
