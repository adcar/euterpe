import React, { Component } from 'react'
import AlbumCard from '../containers/AlbumCard'
import getToken from '../getToken'
import PageLabel from '../components/PageLabel'
import CardWrapper from '../components/CardWrapper'
import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

class MyPlaylists extends Component {
	constructor() {
		super()
		this.state = {
			playlists: []
		}
	}
	componentDidMount() {
		spotifyApi.getMe().then(res => {
			let userId = res.body.id
			spotifyApi.getUserPlaylists(userId).then(res => {
				this.setState({
					playlists: res.body.items.map(item => (
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
			})
		})
	}
	render() {
		return (
			<div>
				<PageLabel>My Playlists</PageLabel>
				<CardWrapper>{this.state.playlists}</CardWrapper>
			</div>
		)
	}
}

export default MyPlaylists
