import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography'
import { Route, Link, Redirect } from 'react-router-dom'
import Categories from './Categories'

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
		backgroundColor: theme.palette.background.default,
		zIndex: 1,
		position: 'relative'
	},
	appBar: {
		boxShadow: 'none'
	}
})

class Browse extends React.Component {
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
						<Tab label="Genres & Moods" component={Link} to="/browse/genres" />
					</Tabs>
				</AppBar>
				<Route
					exact
					path="/browse"
					render={() => <Redirect to="/browse/genres" />}
				/>
				<Route path="/browse/genres" component={Categories} />
			</div>
		)
	}
}

Browse.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Browse)
