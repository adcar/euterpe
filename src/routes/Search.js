import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import AlbumCard from '../components/AlbumCard'

const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

const styles = theme => ({
	cardWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	card: {
		height: 300,
		display: 'flex',
		flexDirection: 'column',
		margin: theme.spacing.unit
	}
})

class Search extends Component {
	constructor() {
		super()
		this.state = {
			albums: [],
			artists: [],
			tracks: []
		}
	}
	searchSpotify(props) {
		spotifyApi
			.search(props.match.params.query, ['album', 'track', 'artist'], {
				limit: 5,
				offset: 0
			})
			.then(data => {
				console.log(data)
				this.setState({
					albums: data.body.albums.items.map(item => (
						<AlbumCard
							image={item.images[1].url}
							name={item.name}
							id={item.id}
						/>
					)),
					artists: data.body.artists,
					tracks: data.body.tracks
				})
			})
			.catch(err => console.log(err))
	}
	componentWillReceiveProps(nextProps) {
		this.searchSpotify(nextProps)
	}
	componentDidMount() {
		this.searchSpotify(this.props)
	}
	render() {
		const { classes } = this.props
		return (
			<div>
				<Typography variant="display1" component="h2" align="center">
					Albums
				</Typography>
				<div className={classes.cardWrapper}>{this.state.albums}</div>
			</div>
		)
	}
}

export default withStyles(styles)(Search)
