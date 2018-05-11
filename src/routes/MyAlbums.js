import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

import AlbumCard from '../containers/AlbumCard'
import PageLabel from '../components/PageLabel'
import CardWrapper from '../components/CardWrapper'
import NothingHere from '../components/NothingHere'
import { fetchSavedAlbums } from '../actions/spotifyApiActions'
import { connect } from 'react-redux'

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
		return (
			<div>
				<PageLabel>My Albums</PageLabel>
				{this.state.albums.length <= 0 ? <NothingHere type="albums" /> : null}
				<CardWrapper>{this.state.albumItems}</CardWrapper>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	albums: state.spotifyApi.savedAlbums
})

MyAlbums.propTypes = {
	albums: PropTypes.array.isRequired
}
export default connect(mapStateToProps)(withStyles(styles)(MyAlbums))
