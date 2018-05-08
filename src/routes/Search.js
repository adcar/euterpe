import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import PageLabel from '../components/PageLabel'
import { Route, Link } from 'react-router-dom'
import { search } from '../actions/searchActions'

import Albums from './search/Albums'
import Playlists from './search/Playlists'
import Artists from './search/Artists'
import Songs from './search/Songs'
import { connect } from 'react-redux'

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
	constructor() {
		super()
		this.search = this.search.bind(this)
		this.state = {
			value: 0
		}
	}

	handleChange = (event, value) => {
		this.setState({ value })
	}
	static getDerivedStateFromProps(nextProps) {
		const { pathname } = nextProps.location
		// // This is needed for showing the correct tab on refresh
		if (pathname.includes('songs')) {
			return { value: 0 }
		}
		if (pathname.includes('albums')) {
			return { value: 1 }
		}
		if (pathname.includes('playlists')) {
			return { value: 2 }
		}

		if (pathname.includes('artists')) {
			return { value: 3 }
		}
	}
	search(query) {
		this.props.dispatch(search(query))
	}
	render() {
		const { classes, searchTerm } = this.props
		const { value } = this.state

		return (
			<div className={classes.root}>
				<AppBar position="static" className={classes.appBar}>
					<Tabs value={value} onChange={this.handleChange} scrollable>
						<Tab
							label="Songs"
							component={Link}
							to={`/search/songs/${searchTerm}`}
						/>
						<Tab
							label="Playlists"
							component={Link}
							to={`/search/playlists/${searchTerm}`}
						/>
						<Tab
							label="Albums"
							component={Link}
							to={`/search/albums/${searchTerm}`}
						/>

						<Tab
							label="Artists"
							component={Link}
							to={`/search/artists/${searchTerm}`}
						/>
					</Tabs>
				</AppBar>
				<PageLabel>
					Results for <strong>{searchTerm}</strong>
				</PageLabel>
				<Route
					path="/search/playlists/:term"
					render={routeProps => (
						<Playlists search={this.search} {...routeProps} />
					)}
				/>
				<Route
					path="/search/songs/:term"
					render={routeProps => <Songs search={this.search} {...routeProps} />}
				/>
				<Route
					path="/search/albums/:term"
					render={routeProps => <Albums search={this.search} {...routeProps} />}
				/>
				<Route
					path="/search/artists/:term"
					render={routeProps => (
						<Artists search={this.search} {...routeProps} />
					)}
				/>
			</div>
		)
	}
}

Search.propTypes = {
	classes: PropTypes.object.isRequired
}

const SearchWithStyles = withStyles(styles)(Search)

const mapStateToProps = state => ({
	searchTerm: state.search.searchTerm
})
export default connect(mapStateToProps)(SearchWithStyles)
