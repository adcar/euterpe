import React, { Component } from 'react'
import getToken from '../getToken'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Truncate from 'react-truncate'
import PageLabel from '../components/PageLabel'
import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

const styles = theme => ({
	genres: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
		justifyItems: 'center'
	},
	genreCard: {
		width: 150,
		transition: 'all 0.25s ease-out',
		margin: theme.spacing.unit,
		'&:hover': {
			boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
		}
	}
})

class Categories extends Component {
	constructor() {
		super()
		this.state = {
			genres: []
		}
	}
	componentDidMount() {
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
								<Typography title={item.name}>
									<Truncate lines={1} ellipsis="...">
										{item.name}
									</Truncate>
								</Typography>
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
				<PageLabel>Genres & Moods</PageLabel>
				<div className={classes.genres}>{this.state.genres}</div>
			</div>
		)
	}
}

export default withStyles(styles)(Categories)
