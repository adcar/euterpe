import React, { Component } from 'react'
import getToken from '../getToken'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()


const styles = theme => ({
  cardWrapper: {
    display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
  },
  card: {
    width: 300,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing.unit
  }
})


class MyAlbums extends Component {
  constructor() {
    super()
    this.state = {
      token: '',
      albums: {},
      albumItems: []
    }
  }
  componentWillMount() {
    this.setState({
      token: getToken('spotifyAccessToken')
    })
  }
  componentDidMount() {
    const { classes } = this.props
    spotifyApi.setAccessToken(this.state.token)
    spotifyApi.getMySavedAlbums({
      limit: 10,
      offset: 0
    })
  .then(data => {
    this.setState({
      albums: data.body.items,
      albumItems: data.body.items.map(item => (
        
         <div>
      <Card className={classes.card}>
        <CardMedia
          style={{height: 200}}
          image={item.album.images[1].url}
          title="Album Cover"
        />
        <CardContent>
          <Typography variant="title" component="h2" style={{flex: 1, whiteSpace: 'nowrap', overflow: 'hidden',
  textOverflow: 'ellipsis'}}>
              {item.album.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Play
          </Button>
        </CardActions>
      </Card>
    </div>
        ))
    })
    
  }, function(err) {
    console.log('Something went wrong!', err);
    window.location = "/"
  });

    
  }
  render() {
    const { classes } = this.props
    return (
      <div>
        <h1>My Albums</h1>
        <div className={classes.cardWrapper}>
        {this.state.albumItems}
        </div>
      </div>

      )
  }
}

export default withStyles(styles)(MyAlbums)