import React, { Component } from 'react'
import getToken from '../getToken'

class MyPlaylists extends Component {
  componentDidMount() {
    console.log(getToken('spotifyAccessToken'))
  }
  render() {
    return (
      <h1>My Playlists</h1>
      )
  }
}

export default MyPlaylists