import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import { Route, Link, Redirect } from 'react-router-dom'

import Albums from '../components/MyAlbums'
import Playlists from '../components/MyPlaylists'
import Artists from '../components/MyArtists'
import Songs from '../components/MyTracks'

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

class Collection extends React.Component {
	state = {
		value: 0
	}

	handleChange = (event, value) => {
		this.setState({ value })
	}
	componentDidMount() {
		// This is needed for showing the correct tab on refresh
		switch (this.props.location.pathname) {
			case '/collection/playlists':
				this.setState({
					value: 0
				})
			case '/collection/albums':
				this.setState({
					value: 1
				})
			case '/collection/songs':
				this.setState({
					value: 2
				})
			case '/collection/artists':
				this.setState({
					value: 3
				})
		}
	}

	render() {
		const { classes } = this.props
		const { value } = this.state

		return (
			<div className={classes.root}>
				<AppBar position="static" className={classes.appBar}>
					<Tabs value={value} onChange={this.handleChange} scrollable>
						<Tab
							label="Playlists"
							component={Link}
							to="/collection/playlists"
						/>
						<Tab label="Albums" component={Link} to="/collection/albums" />
						<Tab label="Songs" component={Link} to="/collection/songs" />
						<Tab label="Artists" component={Link} to="/collection/artists" />
					</Tabs>
				</AppBar>
				<Route
					exact
					path="/collection/"
					render={() => <Redirect to="/collection/playlists" />}
				/>
				<Route path="/collection/playlists" component={Playlists} />
				<Route path="/collection/songs" component={Songs} />
				<Route path="/collection/albums" component={Albums} />
				<Route path="/collection/Artists" component={Artists} />
			</div>
		)
	}
}

Collection.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Collection)
