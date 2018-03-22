import React, { Component } from 'react'
import getToken from '../getToken'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

const styles = theme => ({
	genres: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	genreCard: {
		transition: 'all 0.25s ease-out',
		margin: theme.spacing.unit,
		'&:hover': {
			boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
		}
	}
})

class Home extends Component {
	constructor() {
		super()
		this.state = {
			genres: []
		}
	}
	componentWillMount() {
		const { classes } = this.props
		spotifyApi.getCategories().then(data => {
			this.setState({
				genres: data.body.categories.items.map(item => (
					<Link
						to={`/category/${item.id}`}
						style={{ textDecoration: 'none' }}
						key={item.id}
					>
						<Card className={classes.genreCard}>
							<CardMedia
								image={item.icons[0].url}
								title={item.name}
								style={{ width: 150, height: 150 }}
							/>
							<CardContent>
								<Typography>{item.name}</Typography>
							</CardContent>
						</Card>
					</Link>
				))
			})
		})
	}
	render() {
		const { classes } = this.props
		return (
			<div>
				<Typography variant="display2" align="center">
					Genres
				</Typography>
				<div className={classes.genres}>{this.state.genres}</div>
			</div>
		)
	}
}

export default withStyles(styles)(Home)
