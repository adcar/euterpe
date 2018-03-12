import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'

const app = () => (
	<Router>
		<div>
			<Navbar />
		</div>
	</Router>
)

export default app
