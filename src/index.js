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

import red from 'material-ui/colors/red'
import amber from 'material-ui/colors/amber'


const theme = createMuiTheme({
	palette: {
		primary: red,
		secondary: amber
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
			</Navbar>
		</div>
	</Router>
	</MuiThemeProvider>,
	document.getElementById('root')
)
registerServiceWorker()
