import React, { Component } from 'react'
import './index.css'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import CssBaseline from 'material-ui/CssBaseline'
import Navbar from './components/Navbar'
import PlaylistPlayer from './containers/PlaylistPlayer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import rootReducer from './reducers'

import Collection from './routes/Collection'
import Artist from './routes/Artist'
import Home from './routes/Home'
import Album from './routes/Album'
import Playlist from './routes/Playlist'
import Category from './routes/Category'
import Callback from './routes/Callback'
import Search from './routes/Search'

import blue from 'material-ui/colors/blue'
import amber from 'material-ui/colors/amber'

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const theme = createMuiTheme({
	palette: {
		type: 'light',
		primary: blue,
		secondary: amber,
		background: {
			default: 'white'
		}
	}
})

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<MuiThemeProvider theme={theme}>
					<CssBaseline />
					<Router>
						<div>
							<Navbar>
								<Route path="/" exact component={Home} />
								<Route path="/callback" component={Callback} />
								<Route path="/artist/:id" component={Artist} />
								<Route path="/collection" component={Collection} />
								<Route path="/album/:id" component={Album} />
								<Route path="/playlist/:user/:id" component={Playlist} />
								<Route path="/category/:id" component={Category} />
								<Route path="/search/:query" component={Search} />
							</Navbar>
						</div>
					</Router>
					<PlaylistPlayer />
				</MuiThemeProvider>
			</Provider>
		)
	}
}
export default App
