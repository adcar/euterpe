import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'

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
						<Tab label="Featured" />
						<Tab label="Genres & Moods" />
						<Tab label="New Releases" />
						<Tab label="Discover" href="#basic-tabs" />
					</Tabs>
				</AppBar>

				{value === 0 && <TabContainer>Item One</TabContainer>}
				{value === 1 && <TabContainer>Item Two</TabContainer>}
				{value === 2 && <TabContainer>Item Three</TabContainer>}
			</div>
		)
	}
}

Browse.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Browse)
