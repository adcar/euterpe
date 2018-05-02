import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import getToken from '../getToken'
import { playTrack } from '../actions/playerActions'
import { connect } from 'react-redux'
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

const styles = theme => ({
	card: {
		width: 300,
		height: 300,
		display: 'flex',
		flexDirection: 'column',
		margin: theme.spacing.unit
	}
})

class TrackCard extends Component {
	save() {
		spotifyApi
			.addToMySavedTracks({ ids: [this.props.id] })
			.then(data => console.log(data))
			.catch(err => console.log(err))
	}

	play() {
		this.props.dispatch(
			playTrack([
				{
					image: this.props.image,
					name: this.props.name,
					artist: this.props.artist,
					id: this.props.id
				}
			])
		)
	}
	render() {
		const saveBtn = !this.props.saved ? (
			<Button
				disabled
				size="small"
				color="primary"
				onClick={this.save.bind(this)}
			>
				Save
			</Button>
		) : null
		const { classes } = this.props
		if (this.props.image && this.props.name && this.props.id) {
			return (
				<Card className={classes.card} key={this.props.id}>
					<CardMedia
						style={{ height: 200 }}
						image={this.props.image}
						title="Album Cover"
					/>
					<CardContent>
						<Typography
							variant="title"
							component="h2"
							style={{
								flex: 1,
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis'
							}}
						>
							{this.props.name}
						</Typography>
						<Typography variant="subheading" style={{ marginTop: 10 }}>
							<Link
								style={{ color: 'inherit' }}
								to={`/artist/${this.props.artist.id}`}
							>
								{this.props.artist.name}
							</Link>
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small" color="primary" onClick={this.play.bind(this)}>
							Play
						</Button>
						{saveBtn}
					</CardActions>
				</Card>
			)
		} else {
			return <CircularProgress />
		}
	}
}
TrackCard.propTypes = {
	image: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	artist: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	play: PropTypes.func.isRequired
}

const TrackCardWithStyles = withStyles(styles)(TrackCard)
export default connect()(TrackCardWithStyles)
