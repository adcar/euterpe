import React, { Component } from 'react'

class SearchAlbums extends Component {
	componentDidMount() {
		this.props.search(this.props.match.params.term)
	}
	render() {
		return (
			<div>
				<h1>hi</h1>
			</div>
		)
	}
}

export default SearchAlbums
