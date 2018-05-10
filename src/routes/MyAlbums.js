import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'

import AlbumCard from '../containers/AlbumCard'
import PageLabel from '../components/PageLabel'
import CardWrapper from '../components/CardWrapper'
import SpotifyWebApi from 'spotify-web-api-node'

import { fetchSavedAlbums } from '../actions/apiActions'
import { connect } from 'react-redux'

const spotifyApi = new SpotifyWebApi()

const styles = theme => ({
	card: {
		width: 300,
		height: 300,
		display: 'flex',
		flexDirection: 'column',
		margin: theme.spacing.unit
	}
})

class MyAlbums extends Component {
	constructor() {
		super()
		this.state = {
			albums: {},
			albumItems: []
		}
	}
	componentDidMount() {
		this.props.dispatch(fetchSavedAlbums())
	}
	static getDerivedStateFromProps(nextProps) {
		return {
			albums: nextProps.albums,
			albumItems: nextProps.albums.map(album => (
				<AlbumCard
					type="album"
					image={album.images[1].url}
					name={album.name}
					id={album.id}
					artist={album.artists[0]}
					key={album.id}
				/>
			))
		}
	}
	render() {
		if (this.state.albumItems.length > 0) {
			return (
				<div>
					<PageLabel>My Albums</PageLabel>
					<CardWrapper>{this.state.albumItems}</CardWrapper>
				</div>
			)
		} else {
			return <CircularProgress />
		}
	}
}

const mapStateToProps = state => ({
	albums: state.api.savedAlbums
})
export default connect(mapStateToProps)(withStyles(styles)(MyAlbums))
