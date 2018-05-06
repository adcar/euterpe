import React, { Component } from 'react'
import getToken from '../../getToken'
import SpotifyWebApi from 'spotify-web-api-node'
import AlbumCard from '../../containers/AlbumCard'
import CardWrapper from '../../components/CardWrapper'
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

class Playlists extends Component {
	state = {
		playlists: []
	}
	componentDidMount() {
		const { term } = this.props.match.params
		this.props.search(term)
		spotifyApi.searchPlaylists(term).then(res => {
			this.setState({
				playlists: res.body.playlists.items.map(item => (
					<AlbumCard
						type="playlist"
						image={item.images[0].url}
						name={item.name}
						id={item.id}
						artist={item.owner}
						key={item.id}
					/>
				))
			})
		})
	}
	render() {
		return <CardWrapper>{this.state.playlists}</CardWrapper>
	}
}

export default Playlists
