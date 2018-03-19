import React, { Component } from 'react'

import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'
import getToken from '../getToken'
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

class AlbumCard extends Component {
	save() {
		console.log(this.props.id)
		spotifyApi
			.addToMySavedAlbums({ ids: [this.props.id] })
			.then(data => console.log(data))
			.catch(err => console.log(err))
	}
	render() {
		const saveBtn = !this.props.saved ? (
			<Button size="small" color="primary" onClick={this.save.bind(this)}>
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
					</CardContent>
					<CardActions>
						<Link
							to={`/album/${this.props.id}`}
							style={{ textDecoration: 'none' }}
						>
							<Button size="small" color="primary">
								Play
							</Button>
						</Link>
						{saveBtn}
					</CardActions>
				</Card>
			)
		} else {
			return <CircularProgress />
		}
	}
}

export default withStyles(styles)(AlbumCard)