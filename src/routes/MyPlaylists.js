import React, { Component } from 'react'
import AlbumCard from '../containers/AlbumCard'
import PageLabel from '../components/PageLabel'
import CardWrapper from '../components/CardWrapper'
import { connect } from 'react-redux'
import { fetchFollowedPlaylists } from '../actions/spotifyApiActions'
import NothingHere from '../components/NothingHere'

class MyPlaylists extends Component {
	constructor() {
		super()
		this.state = {
			playlists: []
		}
	}
	componentDidMount() {
		this.props.dispatch(fetchFollowedPlaylists())
	}

	static getDerivedStateFromProps(nextProps) {
		return {
			playlists: nextProps.playlists.map(playlist => (
				<AlbumCard
					type="playlist"
					image={playlist.images[0].url}
					name={playlist.name}
					id={playlist.id}
					artist={playlist.owner}
					key={playlist.id}
				/>
			))
		}
	}
	render() {
		return (
			<div>
				<PageLabel>My Playlists</PageLabel>
				{this.state.playlists.length <= 0 ? (
					<NothingHere type="playlists" />
				) : null}
				<CardWrapper>{this.state.playlists}</CardWrapper>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	playlists: state.spotifyApi.followedPlaylists
})
export default connect(mapStateToProps)(MyPlaylists)
