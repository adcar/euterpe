import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious'
import SkipNextIcon from 'material-ui-icons/SkipNext'
import PlayIcon from 'material-ui-icons/PlayArrow'
import PauseIcon from 'material-ui-icons/Pause'
import { connect } from 'react-redux'
import convertToSeconds from '../convertToSeconds'
import { prevSong, nextSong, play, pause } from '../actions/playerActions'
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
		marginRight: theme.spacing.unit * 2,
		marginTop: theme.spacing.unit * 2,
		height: 70
	},
	songLabel: {
		marginBottom: 10,
		height: 70,
		width: 400,
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	audio: {
		width: '100%'
	},
	icon: {
		height: 40,
		width: 40
	},
	playPauseIcon: {
		height: 50,
		width: 50
	},
	innerIcon: {
		width: '80%',
		height: '80%'
	},
	playerWrapper: {
		display: 'flex',
		width: '100%',
		height: '100%',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	card: {
		height: 130,
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
		justifyContent: 'center',
		paddingLeft: theme.spacing.unit,
		paddingBottom: theme.spacing.unit
	},
	progressInput: {
		width: 200
	},
	duration: {
		marginLeft: theme.spacing.unit * 2
	},
	currentTime: {
		marginRight: theme.spacing.unit * 2
	},
	truncate: {
		width: 250,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis'
	}
})

class PlaylistPlayer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sources: [],
			tracks: [],
			currentTime: 0,
			duration: 0,
			volumeLvl: 1,
			source: ''
		}
		this.audio = React.createRef()
		this.input = React.createRef()
		this.handleTimeUpdate = this.handleTimeUpdate.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleNext = this.handleNext.bind(this)
		this.handlePrev = this.handlePrev.bind(this)
		this.handlePlayPause = this.handlePlayPause.bind(this)
	}
	handlePrev() {
		this.props.dispatch(prevSong())
	}
	handleNext() {
		this.props.dispatch(nextSong())
	}
	handleTimeUpdate() {
		this.setState({
			currentTime: this.audio.current.currentTime,
			duration: this.audio.current.duration
		})
	}
	handleChange() {
		console.log(this.input.current.value)
		this.setState(
			{
				currentTime: this.input.current.value
			},
			() => (this.audio.current.currentTime = this.input.current.value)
		)
	}
	changeVolumeLvl(e) {
		this.setState(
			{
				volumeLvl: e.target.value
			},
			() => {
				this.audio.current.volume = this.state.volumeLvl
			}
		)
	}
	handlePlayPause() {
		if (this.props.isPlaying === false) {
			this.props.dispatch(play())
			this.audio.current.play()
		} else if (this.props.isPlaying === true) {
			this.props.dispatch(pause())
			this.audio.current.pause()
		}
	}
	handleOnPlay() {
		this.props.dispatch(play())
	}
	componentDidUpdate(prevProps) {
		if (
			prevProps.tracks[prevProps.currentTrack].id !==
			this.props.tracks[this.props.currentTrack].id
		) {
			fetch(
				`https://apolloapi.herokuapp.com/${encodeURIComponent(
					this.props.tracks[this.props.currentTrack].name
				)}/${encodeURIComponent(
					this.props.tracks[this.props.currentTrack].artist
				)}`
			)
				.then(res => res.text())
				.then(url => this.setState({ source: url }))
		}
	}
	render() {
		const { duration, currentTime, volumeLvl } = this.state
		const { classes, isPlaying } = this.props

		const player = (
			<Card className={classes.card}>
				<div className={classes.playerWrapper}>
					<div className={classes.songLabel}>
						<img
							className={classes.songArt}
							alt="Song Cover Art"
							src={this.props.tracks[this.props.currentTrack].image}
						/>

						<div>
							<Typography
								className={classes.truncate}
								variant="headline"
								component="h3"
								title={this.props.tracks[this.props.currentTrack].name}
							>
								{this.props.tracks[this.props.currentTrack].name}
							</Typography>

							<Typography
								className={classes.truncate}
								variant="subheading"
								title={this.props.tracks[this.props.currentTrack].artist}
							>
								{this.props.tracks[this.props.currentTrack].artist}
							</Typography>
						</div>
					</div>
					<div>
						<div className={classes.controls}>
							<IconButton
								disabled={this.props.id === '' ? true : false}
								className={classes.icon}
							>
								<SkipPreviousIcon
									onClick={this.handlePrev}
									className={classes.innerIcon}
								/>
							</IconButton>
							<IconButton
								disabled={this.props.id === '' ? true : false}
								className={classes.playPauseIcon}
							>
								{isPlaying ? (
									<PauseIcon
										onClick={this.handlePlayPause}
										className={classes.innerIcon}
									/>
								) : (
									<PlayIcon
										onClick={this.handlePlayPause}
										className={classes.innerIcon}
									/>
								)}
							</IconButton>
							<IconButton
								disabled={this.props.id === '' ? true : false}
								className={classes.icon}
							>
								<SkipNextIcon
									onClick={this.handleNext}
									className={classes.innerIcon}
								/>
							</IconButton>
						</div>
						<div className={classes.progress}>
							<Typography className={classes.currentTime} variant="caption">
								{convertToSeconds(this.state.currentTime * 1000)}
							</Typography>
							<audio
								autoPlay
								onPlay={this.handleOnPlay.bind(this)}
								ref={this.audio}
								src={this.state.source}
								onTimeUpdate={this.handleTimeUpdate}
								onEnded={this.handleNext}
								onError={this.handleNext}
							/>
							<input
								type="range"
								value={currentTime}
								max={duration}
								onChange={this.handleChange.bind(this)}
								ref={this.input}
								className={classes.progressInput}
							/>
							<Typography className={classes.duration} variant="caption">
								{convertToSeconds(this.state.duration * 1000)}
							</Typography>
						</div>
					</div>
					<div className={classes.volume}>
						<input
							type="range"
							step="0.1"
							max="1"
							min="0"
							value={volumeLvl}
							onChange={this.changeVolumeLvl.bind(this)}
						/>
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
		currentTrack: parseInt(state.player.currentTrack, 10),
		isPlaying: state.player.isPlaying,
		id: state.player.tracks[0].id
	}
}
PlaylistPlayer.propTypes = {
	tracks: PropTypes.array.isRequired,
	currentTrack: PropTypes.number.isRequired,
	isPlaying: PropTypes.bool.isRequired,
	id: PropTypes.string.isRequired
}
export default connect(mapStateToProps)(PlaylistPlayerWithStyles)
