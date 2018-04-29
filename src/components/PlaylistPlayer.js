import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious'
import SkipNextIcon from 'material-ui-icons/SkipNext'
import { connect } from 'react-redux'
import { prevSong, nextSong } from '../actions/playerActions'

const styles = theme => ({
	root: {
		position: 'fixed',
		bottom: 0,
		left: 0,
		width: '100%',
		zIndex: 5000
	},
	progress: {
		width: '100%',
		height: '100%',
		display: 'flex',
		jusitfyContent: 'center',
		alignItems: 'center'
	},
	songArt: {
		marginLeft: theme.spacing.unit * 2,
		marginTop: theme.spacing.unit * 2,
		height: 70
	},
	songLabel: {
		marginBottom: 10,
		height: 70,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	audio: {
		width: '100%'
	},
	icon: {
		height: 30,
		width: 30,
		color: '#5A5A5A'
	},
	player: {
		backgroundColor: '#fafafa',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		flex: '1'
	},
	card: {
		display: 'flex',
		alignItems: 'stretch',
		flexDirection: 'column',
		justifyContent: 'center',
		height: 130,
		width: '100%',
		backgroundColor: '#fafafa'
	},
	cardContent: { marginTop: theme.spacing.unit * 2 },
	details: {
		display: 'flex',
		flexDirection: 'column'
	},
	content: {
		flex: '1 0 auto'
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing.unit,
		paddingBottom: theme.spacing.unit
	},
	playIcon: {
		height: 38,
		width: 38
	}
})

class PlaylistPlayer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sources: [],
			tracks: []
		}
	}
	handlePrev() {
		this.props.dispatch(prevSong())
	}
	handleNext() {
		this.props.dispatch(nextSong())
	}
	render() {
		const { classes } = this.props

		const player = (
			<Card className={classes.card}>
				<div>
					<div className={classes.songLabel}>
						<img
							className={classes.songArt}
							alt="Song Cover Art"
							src={this.props.tracks[this.props.currentTrack].image}
						/>
						<CardContent className={classes.cardContent}>
							<div>
								<Typography variant="headline" component="h3" align="right">
									{this.props.tracks[this.props.currentTrack].name}
								</Typography>
								<Typography variant="subheading" align="right">
									{this.props.tracks[this.props.currentTrack].artist}
								</Typography>
							</div>
						</CardContent>
					</div>
					<div className={classes.player}>
						<IconButton>
							<SkipPreviousIcon
								className={classes.icon}
								onClick={this.handlePrev.bind(this)}
							/>
						</IconButton>

						<audio
							onError={this.handleNext.bind(this)}
							onEnded={this.handleNext.bind(this)}
							ref={audio => {
								this.audio = audio
							}}
							autoPlay
							controls
							className={classes.audio}
							src={`https://apolloapi.herokuapp.com/${encodeURIComponent(
								this.props.tracks[this.props.currentTrack].name
							)}/${encodeURIComponent(
								this.props.tracks[this.props.currentTrack].artist
							)}`}
						/>
						<IconButton>
							<SkipNextIcon
								className={classes.icon}
								onClick={this.handleNext.bind(this)}
							/>
						</IconButton>
					</div>
				</div>
			</Card>
		)
		return <div className={classes.root}>{player}</div>
	}
}

const PlaylistPlayerWithStyles = withStyles(styles, { withTheme: true })(
	PlaylistPlayer
)

const mapStateToProps = state => {
	return {
		tracks: state.player.tracks,
		currentTrack: parseInt(state.player.currentTrack, 10)
	}
}
PlaylistPlayer.propTypes = {
	tracks: PropTypes.array.isRequired,
	currentTrack: PropTypes.number.isRequired
}
export default connect(mapStateToProps)(PlaylistPlayerWithStyles)
