import React, { Component } from 'react'
import AlbumCard from '../containers/AlbumCard'
import PageLabel from '../components/PageLabel'
import CardWrapper from '../components/CardWrapper'
import { connect } from 'react-redux'
import {fetchCategoryName, fetchCategoryPlaylists} from '../actions/spotifyApiActions'

class Category extends Component {
	constructor() {
		super()
		this.state = {
			name: '',
			playlists: []
		}
	}
	componentDidUpdate(prevProps) {
		if (prevProps.categoryName !== this.props.categoryName) {
			this.setState({
				name: this.props.categoryName
			})
		}
		if (prevProps.categoryPlaylists !== this.props.categoryPlaylists) {
			this.setState({
				playlists: this.props.categoryPlaylists.map(item => (
					<AlbumCard
						type="playlist"
						name={item.name}
						image={item.images[0].url}
						id={item.id}
						artist={item.owner}
						key={item.id}
						playlist
					/>
				))
			})
		}
	}
	componentDidMount() {
		const { id } = this.props.match.params
		this.props.dispatch(fetchCategoryName(id))
		this.props.dispatch(fetchCategoryPlaylists(id))
	}
	render() {
		return (
			<div>
				<PageLabel>{this.state.name}</PageLabel>
				<CardWrapper>{this.state.playlists}</CardWrapper>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	categoryName: state.spotifyApi.categoryName,
	categoryPlaylists: state.spotifyApi.categoryPlaylists
})
export default connect(mapStateToProps)(Category)
