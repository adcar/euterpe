import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Input from 'material-ui/Input'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'
import MenuIcon from 'material-ui-icons/Menu'
import LibraryMusicIcon from 'material-ui-icons/LibraryMusic'
import HomeIcon from 'material-ui-icons/Home'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { isBrowser } from 'react-device-detect'
import drawerWidth from '../drawerWidth'
import getToken from '../getToken'
import Menu, { MenuItem } from 'material-ui/Menu'
import Cookie from 'js-cookie'

const SpotifyWebApi = require('spotify-web-api-node')
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
		zIndex: '0',
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
		height: 50,
		width: 50,
		borderRadius: '50%'
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
		this.props.history.push(`/search/${this.state.searchTerm}`)
	}

	redirect(location, e) {
		this.handleDrawerToggle()
		this.props.history.push(location)
	}
	handleChange(e) {
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
		this.searchInput.blur()
		this.updateHistory()
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
		var left = window.clientWidth / 2 - 450 / 2
		var top = window.clientHeight / 2 - 450 / 2
		Cookie.remove('spotifyAccessToken')
		let popup = window.open(
			'https://accounts.spotify.com/en/status',
			'_blank',
			`toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=450, height=450, top=${top}, left=${left}`
		)

		popup.onbeforeunload = () => {
			console.log('unloaded')
			window.location = '/'
		}
	}
	render() {
		const { classes, theme } = this.props
		const drawer = (
			<div>
				<div className={classes.toolbar} />
				<Divider />
				<ListItem>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<Input
							className={classes.searchInput}
							inputRef={input => {
								this.searchInput = input
							}}
							type="search"
							onChange={this.handleChange.bind(this)}
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
							<Typography variant="title" color="inherit" noWrap>
								{window.location.href.includes('collection')
									? 'Your Music'
									: 'Apollo'}
							</Typography>
						</Link>
						<IconButton
							color="inherit"
							aria-owns={Boolean(this.state.anchorEl) ? 'menu-appbar' : null}
							aria-haspopup="true"
							onClick={this.handleMenu}
							color="inherit"
						>
							<img
								className={classes.profileIcon}
								src={this.state.userInfo.images[0].url}
							/>
						</IconButton>
						<Menu
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
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={this.state.mobileOpen}
						onClose={this.handleDrawerToggle}
						classes={{ paper: classes.drawerPaper }}
						ModalProps={
							{ keepMounted: true } // Better open performance on mobile.
						}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
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
	theme: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles, { withTheme: true })(Navbar))
