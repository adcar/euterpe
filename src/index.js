import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(
	<Router>
		<div>
			<Navbar>
				<Route path="/" exact component={Home} />
			</Navbar>
		</div>
	</Router>,
	document.getElementById('root')
)
registerServiceWorker()
