import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import { Route, Link, Redirect } from 'react-router-dom'

// import Albums from '../components/SearchAlbums'
// import Playlists from '../components/SearchPlaylists'
// import Artists from '../components/SearchArtists'
// import Songs from '../components/SearchTracks'

const Albums = () => <h1>test</h1>
const Playlists = ({ match }) => <h1>test: {match.params.term}</h1>
const Artists = () => <h1>test</h1>
const Songs = () => <h1>test</h1>

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	)
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
}

const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		zIndex: 1,
		position: 'relative'
	},
	appBar: {
		boxShadow: 'none'
	}
})

class Search extends Component {
	state = {
		value: 0
	}

	handleChange = (event, value) => {
		this.setState({ value })
	}
	componentDidMount() {
		const { pathname } = this.props.location
		// This is needed for showing the correct tab on refresh
		switch (pathname) {
			case '/collection/playlists':
				this.setState({ value: 0 })
				break
			case '/collection/albums':
				this.setState({ value: 1 })
				break
			case '/collection/songs':
				this.setState({ value: 2 })
				break
			case '/collection/artists':
				this.setState({ value: 3 })
				break
		}
	}

	render() {
		const { classes } = this.props
		const { value } = this.state
		console.log(this.props.match)
		const { term } = this.props.match.params
		console.log(term)
		return (
			<div className={classes.root}>
				<AppBar position="static" className={classes.appBar}>
					<Tabs value={value} onChange={this.handleChange} scrollable>
						<Tab
							label="Playlists"
							component={Link}
							to="/collection/playlists"
						/>
						<Tab label="Albums" component={Link} to="/search/albums" />
						<Tab label="Songs" component={Link} to="/search/songs" />
						<Tab label="Artists" component={Link} to="/search/artists" />
					</Tabs>
				</AppBar>

				<Route path="/search/playlists/:term" component={Playlists} />
				<Route path="/search/songs/:term" component={Songs} />
				<Route path="/search/albums/:term" component={Albums} />
				<Route path="/search/Artists/:term" component={Artists} />
			</div>
		)
	}
}

Search.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Search)
