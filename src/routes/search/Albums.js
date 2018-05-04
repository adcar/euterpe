import React, { Component } from 'react'
import getToken from '../../getToken'
import SpotifyWebApi from 'spotify-web-api-node'
import AlbumCard from '../../containers/AlbumCard'
import CardWrapper from '../../components/CardWrapper'
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

class Albums extends Component {
	state = {
		albums: []
	}
	componentDidMount() {
		const { term } = this.props.match.params
		this.props.search(term)
		spotifyApi.searchAlbums(term).then(res => {
			this.setState({
				albums: res.body.albums.items.map(item => (
					<AlbumCard
						type="album"
						image={item.images[1].url}
						name={item.name}
						id={item.id}
						artist={item.artists[0]}
						key={item.id}
					/>
				))
			})
		})
	}
	render() {
		return <CardWrapper>{this.state.albums}</CardWrapper>
	}
}

export default Albums
