import React, { Component } from 'react'
import getToken from '../getToken'
import Typography from 'material-ui/Typography'
import Player from '../components/PlaylistPlayer'
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(getToken('spotifyAccessToken'))

class Album extends Component {
  constructor() {
    super()
    this.state = {
      tracks: [],
      tracksJson: [],
      albumInfo: {},
      currentTrack: 0
    }
  }
  trackChange(index, e) {
    console.log(index)
    this.setState({
      currentTrack: index
    })
  }
  componentDidMount() {
    spotifyApi.getAlbum(this.props.match.params.id)
  .then(data => {
    this.setState({
      albumInfo: data.body
    })
    return Array.from(data.body.tracks.items).map(function(t) { return t.id; });
  })
  .then(trackIds => spotifyApi.getTracks(trackIds))
  .then(data => {
    this.setState({
      tracks: data.body.tracks.map((item, index) => <li style={{cursor: 'pointer'}} key={item.id} onClick={e => this.trackChange(index, e)}>{item.name}</li>),
      tracksJson: data.body.tracks.map(track => ({name: track.name, artist: track.artists[0].name, image: track.album.images[1].url}))
    })
  })
  .catch(err => {
    console.error(err);
  });
  }
  render() {
    return (<div>
    <Typography component="h1" variant="display1" align="center">{this.state.albumInfo.name}</Typography>
    <ol>
      {this.state.tracks}
    </ol>
    <Player tracks={this.state.tracksJson} currentTrack={this.state.currentTrack}/>
    </div>)
  }
}

export default Album