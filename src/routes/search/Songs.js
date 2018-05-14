import React, { Component } from 'react'
import getToken from '../../getToken'
import { CircularProgress } from 'material-ui/Progress'
import SongItem from '../../components/SongItem'

import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))
class Songs extends Component {
	state = {
		songs: []
	}
	search() {
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
							artist={item.artists[0]}
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
	componentDidUpdate(prevProps) {
		if (prevProps.match.params.term !== this.props.match.params.term) {
			this.search()
		}
	}
	componentDidMount() {
		this.search()
	}
	render() {
		if (this.state.songs.length > 0) {
			return <div>{this.state.songs}</div>
		} else {
			return <CircularProgress />
		}
	}
}

export default Songs
