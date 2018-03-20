import React, { Component } from 'react'
import './index.css'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import CssBaseline from 'material-ui/CssBaseline'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Player from './components/PlaylistPlayer'

import Home from './routes/Home'
import MyTracks from './routes/MyTracks'
import MyAlbums from './routes/MyAlbums'
import MyPlaylists from './routes/MyPlaylists'
import Album from './routes/Album'
import Callback from './routes/Callback'
import Search from './routes/Search'

import blue from 'material-ui/colors/blue'
import amber from 'material-ui/colors/amber'

const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: amber,
		background: {
			default: 'white'
		}
	}
})

class App extends Component {
	constructor() {
		super()
		this.state = {
			tracks: []
		}
		this.trackChange = this.trackChange.bind(this)
		this.getTracks = this.getTracks.bind(this)
		this.playSong = this.playSong.bind(this)
	}
	trackChange(index, e) {
		this.setState({
			currentTrack: index,
			played: true
		})
	}
	getTracks(tracks) {
		this.setState({
			tracks
		})
	}
	playSong(object) {
		let e = ''
		console.log(object)
		this.getTracks([object])
		this.trackChange(0, e)
	}
	comp
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<Router>
					<div>
						<Navbar>
							<Route path="/" exact component={Home} />
							<Route path="/callback" component={Callback} />
							<Route
								path="/my-tracks"
								render={routeProps => (
									<MyTracks {...routeProps} playSong={this.playSong} />
								)}
							/>
							<Route path="/my-albums" component={MyAlbums} />
							<Route path="/my-playlists" component={MyPlaylists} />
							<Route
								path="/album/:id"
								render={routeProps => (
									<Album
										{...routeProps}
										trackChange={this.trackChange}
										getTracks={this.getTracks}
									/>
								)}
							/>
							<Route
								path="/search/:query"
								render={routeProps => (
									<Search {...routeProps} playSong={this.playSong} />
								)}
							/>
						</Navbar>
					</div>
				</Router>
				<Player
					tracks={this.state.tracks}
					currentTrack={this.state.currentTrack}
				/>
			</MuiThemeProvider>
		)
	}
}

export default App
