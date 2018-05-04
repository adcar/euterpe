import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import { Route, Link } from 'react-router-dom'
import { search } from '../actions/searchActions'

import Albums from './SearchAlbums'
import { connect } from 'react-redux'
// import Playlists from './SearchPlaylists'
// import Artists from './SearchArtists'
// import Songs from './SearchTracks'

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
	componentDidMount() {
		// const { pathname } = this.props.location
		// // This is needed for showing the correct tab on refresh
		// switch (pathname) {
		// 	case '/collection/playlists':
		// 		this.setState({ value: 0 })
		// 		break
		// 	case '/collection/albums':
		// 		this.setState({ value: 1 })
		// 		break
		// 	case '/collection/songs':
		// 		this.setState({ value: 2 })
		// 		break
		// 	case '/collection/artists':
		// 		this.setState({ value: 3 })
		// 		break
		// }
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
							label="Songs"
							component={Link}
							to={`/search/songs/${searchTerm}`}
						/>
						<Tab
							label="Artists"
							component={Link}
							to={`/search/artists/${searchTerm}`}
						/>
					</Tabs>
				</AppBar>

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
	classes: PropTypes.object.isRequired,
	searchTerm: PropTypes.string.isRequired
}

const SearchWithStyles = withStyles(styles)(Search)

const mapStateToProps = state => ({
	searchTerm: state.search.searchTerm
})
export default connect(mapStateToProps)(SearchWithStyles)
