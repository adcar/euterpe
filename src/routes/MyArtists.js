import React, { Component } from 'react'
import getToken from '../getToken'
import ArtistCard from '../components/ArtistCard'
import { CircularProgress } from 'material-ui/Progress'
import PageLabel from '../components/PageLabel'
import CardWrapper from '../components/CardWrapper'

import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi()

class MyAlbums extends Component {
	constructor() {
		super()
		this.state = {
			artists: []
		}
	}

	componentDidMount() {
		spotifyApi.setAccessToken(getToken('spotifyAccessToken'))
		spotifyApi.getFollowedArtists({ limit: 50, offset: 0 }).then(
			data => {
				console.log(data)
				this.setState({
					artists: data.body.artists.items.map(artist => (
						<ArtistCard
							name={artist.name}
							image={artist.images[0].url}
							id={artist.id}
						/>
					))
				})
			},
			function(err) {
				console.log('Something went wrong!', err)
			}
		)
	}
	render() {
		if (this.state.artists.length > 0) {
			return (
				<div>
					<PageLabel>Artists</PageLabel>
					<CardWrapper>{this.state.artists}</CardWrapper>
				</div>
			)
		} else {
			return <CircularProgress />
		}
	}
}

export default MyAlbums
