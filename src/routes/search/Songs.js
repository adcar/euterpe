import React, { Component } from 'react'
import getToken from '../../getToken'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import SongItem from '../../components/SongItem'
import PageLabel from '../../components/PageLabel'
import CardWrapper from '../../components/CardWrapper'

import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))
class Songs extends Component {
	constructor() {
		super()
		this.state = {
			songs: []
		}
	}
	componentDidMount() {
		const { term } = this.props.match.params
		this.props.search(term)
		spotifyApi.searchTracks(term).then(
			data => {
				this.setState({
					songs: data.body.tracks.items.map(item => (
						<SongItem
							type="track"
							key={item.id}
							id={item.id}
							name={item.name}
							artist={item.artists[0].name}
							image={item.album.images[0].url}
							duration={item.duration_ms}
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
		const { term } = this.props.match.params
		const { classes } = this.props

		if (this.state.songs.length > 0) {
			return (
				<div>
					<PageLabel>{term}</PageLabel>
					<CardWrapper>{this.state.songs}</CardWrapper>
				</div>
			)
		} else {
			return <CircularProgress />
		}
	}
}

export default Songs
