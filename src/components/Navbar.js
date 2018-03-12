import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'
import MenuIcon from 'material-ui-icons/Menu'
import AlbumIcon from 'material-ui-icons/Album'
import PlaylistPlayIcon from 'material-ui-icons/PlaylistPlay'
import LibraryMusicIcon from 'material-ui-icons/LibraryMusic'
import MusicNoteIcon from 'material-ui-icons/MusicNote'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

const drawerWidth = 240

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: 430,
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%'
	},
	appBar: {
		position: 'absolute',
		marginLeft: drawerWidth,
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`
		}
	},
	navIconHide: {
		marginRight: theme.spacing.unit,
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		[theme.breakpoints.up('md')]: {
			position: 'relative'
		}
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3
	}
})

class Navbar extends React.Component {
	state = {
		mobileOpen: false
	}

	handleDrawerToggle = () => {
		this.setState({ mobileOpen: !this.state.mobileOpen })
	}
	redirect(location, e) {
		console.log(location)
		console.log(this.router)
	}
	render() {
		const { classes, theme } = this.props

		const drawer = (
			<div>
				<div className={classes.toolbar} />
				<Divider />
				<List>
					<ListItem button>
						<ListItemIcon>
							<MusicNoteIcon />
						</ListItemIcon>
						<ListItemText primary="My Songs" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<AlbumIcon />
						</ListItemIcon>
						<ListItemText primary="My Albums" />
					</ListItem>
					<ListItem button onClick={e => this.redirect('/playlists', e)}>
						<ListItemIcon>
							<PlaylistPlayIcon />
						</ListItemIcon>
						<ListItemText primary="My Playlists" />
					</ListItem>
				</List>
				<Divider />
			</div>
		)

		return (
			<div className={classes.root}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawerToggle}
							className={classes.navIconHide}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="inherit" noWrap>
							Apollo
						</Typography>
					</Toolbar>
				</AppBar>
				<Hidden mdUp>
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={this.state.mobileOpen}
						onClose={this.handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						variant="permanent"
						open
						classes={{
							paper: classes.drawerPaper
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Typography noWrap>
						{'You think water moves fast? You should see ice.'}
					</Typography>
				</main>
			</div>
		)
	}
}

Navbar.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Navbar)
