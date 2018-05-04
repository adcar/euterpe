import React, { Component } from 'react'
import getToken from '../../getToken'
import SpotifyWebApi from 'spotify-web-api-node'
import ArtistCard from '../../components/ArtistCard'
import CardWrapper from '../../components/CardWrapper'
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

class Artists extends Component {
	state = {
		artists: []
	}
	componentDidMount() {
		const { term } = this.props.match.params
		this.props.search(term)
		spotifyApi.searchArtists(term).then(res => {
			console.log(res)
			this.setState({
				artists: res.body.artists.items.map(item => (
					<ArtistCard
						image={
							item.images[0]
								? item.images[0].url
								: 'http://via.placeholder.com/300x196'
						}
						name={item.name}
						id={item.id}
						key={item.id}
					/>
				))
			})
		})
	}
	render() {
		return <CardWrapper>{this.state.artists}</CardWrapper>
	}
}

export default Artists
