import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import Navbar from './components/Navbar'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './routes/Home'
import MyTracks from './routes/MyTracks'
import MyAlbums from './routes/MyAlbums'
import MyPlaylists from './routes/MyPlaylists'
import Album from './routes/Album'

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

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Router>
			<div>
				<Navbar>
					<Route path="/" exact component={Home} />
					<Route path="/my-tracks" component={MyTracks} />
					<Route path="/my-albums" component={MyAlbums} />
					<Route path="/my-playlists" component={MyPlaylists} />
					<Route path="/album/:id" component={Album} />
				</Navbar>
			</div>
		</Router>
	</MuiThemeProvider>,
	document.getElementById('root')
)
registerServiceWorker()
