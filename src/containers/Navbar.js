import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Input from '@material-ui/core/Input'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import HomeIcon from '@material-ui/icons/Home'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { isBrowser } from 'react-device-detect'
import drawerWidth from '../drawerWidth'
import getToken from '../getToken'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Cookie from 'js-cookie'
import { search } from '../actions/searchActions'
import { connect } from 'react-redux'

import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

const styles = theme => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		width: '100%',
		height: 'calc(100% - 130px)'
	},
	appBar: {
		zIndex: '99999',
		position: 'fixed',
		boxShadow: 'none',
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
		[theme.breakpoints.up('md')]: {
			marginLeft: drawerWidth
		},
		marginBottom: 138,
		flexGrow: 1,
		backgroundColor: theme.palette.background.default
	},
	underline: {
		'&:after': {
			backgroundColor: theme.palette.secondary.main
		}
	},
	profileIcon: {
		[theme.breakpoints.up('sm')]: {
			height: 50,
			width: 50
		},
		height: 40,
		width: 40,
		borderRadius: '50%'
	},
	drawer: {
		position: 'fixed',
		zIndex: 2
	},
	menu: {
		zIndex: 99999
	},
	logo: {
		height: 50,
		width: 50,
		marginRight: theme.spacing.unit * 2
	},
	logoAndText: {
		display: 'flex',
		alignItems: 'center'
	}
})

class Navbar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mobileOpen: false,
			searchTerm: '',
			url: this.props.match.url,
			userInfo: {
				images: [
					{
						url: ''
					}
				]
			}
		}
	}
	handleDrawerToggle = () => {
		this.setState({ mobileOpen: !this.state.mobileOpen })
	}
	updateHistory() {
		this.props.dispatch(search(this.state.searchTerm))
		this.props.history.push(`/search/songs/${this.state.searchTerm}`)
	}

	redirect(location, e) {
		this.handleDrawerToggle()
		this.props.history.push(location)
	}
	handleSearchChange(e) {
		// Only do live updates on desktop browser, where on mobile (or anything else) you have to hit your (virtual) enter key
		if (isBrowser && 1 === 2) {
			// temp disabled with 1 === 2 to get it to resolve to false
			this.setState({ searchTerm: e.target.value }, this.updateHistory)
		} else {
			this.setState({ searchTerm: e.target.value })
		}
	}
	handleSubmit(e) {
		e.preventDefault()
		this.updateHistory()
		this.handleDrawerToggle()
	}
	handleChange = (event, checked) => {
		this.setState({ auth: checked })
	}

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget })
	}

	handleClose = () => {
		this.setState({ anchorEl: null })
	}
	componentDidMount() {
		spotifyApi.getMe().then(res => {
			this.setState({
				userInfo: res.body
			})
		})
	}
	handleLogout() {
		let width = 450
		let height = 450
		let left = window.innerWidth / 2 - width / 2
		let top = window.innerHeight / 2 - height / 2
		let popup = window.open(
			'https://accounts.spotify.com/en/status',
			'Logout of Spotify',
			`toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
		)

		popup.focus()
		let timer = setInterval(() => {
			if (popup.closed) {
				clearInterval(timer)
				Cookie.remove('spotifyAccessToken')
				window.location = '/'
			}
		}, 500)
	}
	render() {
		const { classes } = this.props
		const drawer = (
			<div>
				<div className={classes.toolbar} />
				<Divider />
				<ListItem>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<Input
							type="search"
							onChange={this.handleSearchChange.bind(this)}
							placeholder="Search"
						/>
					</form>
				</ListItem>

				<Divider />
				<List>
					<ListItem button onClick={e => this.redirect('/', e)}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItem>
					<ListItem button onClick={e => this.redirect('/collection', e)}>
						<ListItemIcon>
							<LibraryMusicIcon />
						</ListItemIcon>
						<ListItemText primary="Your Music" />
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
							disableRipple
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawerToggle}
							className={classes.navIconHide}
						>
							<MenuIcon />
						</IconButton>
						<Link
							to="/"
							style={{ textDecoration: 'none', color: 'white', flex: 1 }}
						>
							<div className={classes.logoAndText}>
								<Typography variant="title" color="inherit" noWrap>
									Euterpe
								</Typography>
							</div>
						</Link>
						<IconButton
							color="inherit"
							aria-owns={Boolean(this.state.anchorEl) ? 'menu-appbar' : null}
							aria-haspopup="true"
							onClick={this.handleMenu}
						>
							<img
								className={classes.profileIcon}
								src={this.state.userInfo.images[0].url}
								alt="Profile Icon"
							/>
						</IconButton>
						<Menu
							className={classes.menu}
							id="menu-appbar"
							anchorEl={this.state.anchorEl}
							anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
							transformOrigin={{ vertical: 'top', horizontal: 'right' }}
							open={Boolean(this.state.anchorEl)}
							onClose={this.handleClose}
						>
							<MenuItem
								onClick={() => {
									this.handleClose()
									this.handleLogout()
								}}
							>
								Logout
							</MenuItem>
						</Menu>
					</Toolbar>
				</AppBar>
				<Hidden mdUp>
					<SwipeableDrawer
						className={classes.drawer}
						variant="temporary"
						anchor={'left'}
						open={this.state.mobileOpen}
						onClose={this.handleDrawerToggle}
						onOpen={this.handleDrawerToggle}
						classes={{ paper: classes.drawerPaper }}
						ModalProps={
							{ keepMounted: true } // Better open performance on mobile.
						}
					>
						{drawer}
					</SwipeableDrawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						className={classes.drawer}
						variant="permanent"
						open
						classes={{ paper: classes.drawerPaper }}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.props.children}
				</main>
			</div>
		)
	}
}

Navbar.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
}

const NavbarWithStyles = withStyles(styles, { withTheme: true })(Navbar)

export default withRouter(connect()(NavbarWithStyles))
