import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import getToken from '../getToken'
import AlbumCard from '../components/AlbumCard'
import { withStyles } from 'material-ui/styles'
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))
const styles = theme => ({
	profile: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	profileImg: {
		height: 200,
		width: 200,
		borderRadius: '50%'
	},
	artistLabel: {
		marginTop: theme.spacing.unit
	},
	cardWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
	}
})

class Artist extends Component {
	constructor() {
		super()
		this.state = {
			artist: {
				images: [{ url: '' }, { url: '' }]
			}
		}
	}
	componentDidMount() {
		const { id } = this.props.match.params
		spotifyApi.getArtist(id).then(data => {
			this.setState({
				artist: data.body
			})
		})

		spotifyApi.getArtistAlbums(id).then(data => {
			console.log(data)
			this.setState({
				albums: data.body.items.map(item => (
					<AlbumCard image={item.images[1].url} name={item.name} id={item.id} />
				))
			})
		})
	}
	render() {
		const { artist } = this.state
		const { classes } = this.props
		return (
			<div>
				<div className={classes.profile}>
					<img
						src={artist.images[1].url}
						alt={`${artist.name}`}
						className={classes.profileImg}
					/>
					<Typography
						variant="display2"
						align="center"
						className={classes.artistLabel}
					>
						{artist.name}
					</Typography>
				</div>
				<Typography variant="display1" align="center">
					Albums
				</Typography>
				<div className={classes.cardWrapper}>{this.state.albums}</div>
			</div>
		)
	}
}
Artist.propTypes = {
	match: PropTypes.object.isRequired
}
export default withStyles(styles)(Artist)
