import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import { Route, Link, Redirect } from 'react-router-dom'

import Albums from '../components/MyAlbums'
import Playlists from '../components/MyPlaylists'
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

const YourDailyMix = props => <h1>Your Daily Mix (not ready yet)</h1>

class Collection extends React.Component {
	state = {
		value: 0
	}

	handleChange = (event, value) => {
		this.setState({ value })
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
						<Tab
							label="Your Daily Mix"
							component={Link}
							to="/collection/your-daily-mix"
						/>
						<Tab label="Songs" component={Link} to="/collection/songs" />
						<Tab label="Albums" component={Link} to="/collection/albums" />
						<Tab label="Artists" component={Link} to="/collection/artists" />
					</Tabs>
				</AppBar>
				<Route
					exact
					path="/collection/"
					render={() => <Redirect to="/collection/playlists" />}
				/>
				<Route path="/collection/playlists" component={Playlists} />
				<Route path="/collection/your-daily-mix" component={YourDailyMix} />
				<Route path="/collection/songs" component={Songs} />
				<Route path="/collection/albums" component={Albums} />
			</div>
		)
	}
}

Collection.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Collection)
