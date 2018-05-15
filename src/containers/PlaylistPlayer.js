import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import Card from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Hidden from 'material-ui/Hidden'

import Drawer from 'material-ui/Drawer'
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious'
import ArrowUpIcon from 'material-ui-icons/KeyboardArrowUp'
import ArrowDownIcon from 'material-ui-icons/KeyboardArrowDown'
import SkipNextIcon from 'material-ui-icons/SkipNext'
import RepeatIcon from 'material-ui-icons/Repeat'
import RepeatOneIcon from 'material-ui-icons/RepeatOne'
import ShuffleIcon from 'material-ui-icons/Shuffle'
import PlayIcon from 'material-ui-icons/PlayArrow'
import PauseIcon from 'material-ui-icons/Pause'
import { connect } from 'react-redux'
import convertToSeconds from '../convertToSeconds'
import {
	prevSong,
	nextSong,
	play,
	pause,
	shuffle,
	playPlaylist,
	fetchAudioSource
} from '../actions/playerActions'
import './slider.css'
const styles = theme => ({
	root: {
		position: 'fixed',
		bottom: 0,
		left: 0,
		width: '100%',
		zIndex: 5000
	},
	progress: {
		margin: '0 auto',
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	songArt: {
		height: 130,
		marginRight: theme.spacing.unit * 2
	},
	songLabel: {
		alignSelf: 'start',
		justifySelf: 'start',
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
	extraIcon: {
		width: 20,
		height: 20
	},
	extraIconSelected: {
		height: 20,
		width: 20,
		color: theme.palette.primary.main
	},
	smallIcon: {
		height: 30,
		width: 30
	},
	playerWrapper: {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, minmax(350px, 1fr))',

		height: '100%',
		justifyContent: 'stretch',
		alignContent: 'center',
		alignItems: 'center',
		justifyItems: 'center'
	},
	card: {
		height: 130
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
		borderRadius: 7.5,
		backgroundColor: theme.palette.primary.main,
		width: 200,
		'&::-webkit-slider-thumb': {
			height: 15,
			width: 15,
			borderRadius: '50%',
			backgroundColor: 'white',
			boxShadow: theme.shadows[2]
		}
	},
	duration: {
		marginLeft: theme.spacing.unit * 2
	},
	currentTime: {
		marginRight: theme.spacing.unit * 2
	},
	truncate: {
		maxWidth: 270,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		[theme.breakpoints.up('xl')]: {
			maxWidth: 400
		}
	},
	volumeSelector: {
		borderRadius: 7.5,
		backgroundColor: theme.palette.primary.main,
		transform: 'rotate(-90deg)',
		width: 80,
		'&::-webkit-slider-thumb': {
			height: 15,
			width: 15,
			borderRadius: '50%',
			backgroundColor: 'white',
			boxShadow: theme.shadows[2]
		}
	},
	mobileVolumeSelector: {
		marginRight: theme.spacing.unit * 2,
		borderRadius: 7.5,
		backgroundColor: theme.palette.primary.main,
		width: 80,
		'&::-webkit-slider-thumb': {
			height: 15,
			width: 15,
			borderRadius: '50%',
			backgroundColor: 'white',
			boxShadow: theme.shadows[2]
		}
	},
	mobileCard: {
		position: 'fixed',
		zIndex: 5,
		bottom: 0,
		width: '100%',
		height: 50,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	mobileLaunch: {
		marginRight: 15,
		marginLeft: 15
	},
	mobileDrawer: {
		marginTop: 50,
		padding: theme.spacing.unit,
		height: 500,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: 50
	},
	mobileSongArt: {
		height: 200,
		width: 200,
		marginBottom: theme.spacing.unit
	},
	mobileSongInfo: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	row: {
		display: 'flex',
		width: '70%',
		marginRight: theme.spacing.unit
	}
})

class PlaylistPlayer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sources: [],
			tracks: [
				{
					name: ''
				}
			],
			currentTime: 0,
			duration: 100,
			volumeLvl: 1,
			source: '',
			isLaunched: false,
			isShuffled: false,
			isLooped: false,
			isSingleLooped: false
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
		if (this.state.isLooped) {
			if (
				// Arrays should start at 1 ;)
				this.state.tracks[this.state.tracks.length - 1].id ===
				this.state.tracks[this.props.currentTrack].id
			) {
				this.props.dispatch(
					playPlaylist({
						currentTrack: 0,
						tracks: this.state.tracks
					})
				)
			}
		} else if (this.state.isSingleLooped) {
			this.audio.current.currentTime = 0
			this.audio.current.play()
		} else {
			this.props.dispatch(nextSong())
		}
	}
	handleTimeUpdate() {
		this.setState({
			currentTime: this.audio.current.currentTime,
			duration: this.audio.current.duration
		})
	}
	handleChange() {
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
		// When audio starts playing...
		if ('mediaSession' in navigator) {
			/*eslint-disable */
			navigator.mediaSession.metadata = new MediaMetadata({
				/*eslint-enable */
				title: this.state.tracks[this.props.currentTrack].name,
				artist: this.state.tracks[this.props.currentTrack].artist.name,
				artwork: [
					{
						src: this.state.tracks[this.props.currentTrack].image,
						sizes: '300x300',
						type: 'image/jpeg'
					}
				]
			})
		}
	}
	fetchUrl() {
		this.props.dispatch(
			fetchAudioSource(
				this.state.tracks[this.props.currentTrack].name,
				this.state.tracks[this.props.currentTrack].artist.name
			)
		)
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.isShuffled) {
			if (
				prevState.tracks[prevProps.currentTrack].id !==
				this.state.tracks[this.props.currentTrack].id
			) {
				this.fetchUrl()
			}
		} else if (!this.state.isShuffled) {
			if (
				prevProps.tracks[prevProps.currentTrack].id !==
				this.props.tracks[this.props.currentTrack].id
			) {
				this.fetchUrl()
			}
		}
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.isShuffled) {
			return {
				tracks: nextProps.shuffledTracks
			}
		} else {
			return {
				tracks: nextProps.tracks
			}
		}
	}
	handleOpen() {
		this.setState({
			isLaunched: true
		})
	}
	handleClose() {
		this.setState({
			isLaunched: false
		})
	}
	handleLaunch() {
		console.log('launched')
		this.setState({
			isLaunched: !this.state.isLaunched
		})
	}
	handleShuffle() {
		if (!this.state.isShuffled) {
			console.log('shuffling...')
			this.props.dispatch(shuffle(this.state.tracks.slice(0)))
			this.setState(
				{
					tracks: this.props.shuffledTracks
				},
				() => this.fetchUrl()
			)
		} else if (this.state.isShuffled) {
			console.log('setting back to normal...')
			this.setState(
				{
					tracks: this.props.shuffledTracks // CHANGE THIS FIXME
				},
				() => this.fetchUrl()
			)
		}

		this.setState({
			isShuffled: !this.state.isShuffled
		})
	}
	handleRepeat() {
		console.log('repeat')
		if (!this.state.isLooped && !this.state.isSingleLooped) {
			this.setState({
				isLooped: true
			})
		}
		if (this.state.isLooped) {
			this.setState({
				isLooped: false,
				isSingleLooped: true
			})
		}
		if (this.state.isSingleLooped) {
			this.setState({
				isSingleLooped: false
			})
		}
	}
	render() {
		const { duration, currentTime, volumeLvl, isShuffled } = this.state
		const { classes, isPlaying } = this.props

		const title = this.state.tracks[this.props.currentTrack].name
		const artist = this.state.tracks[this.props.currentTrack].artist
		const controls = (
			<div className={classes.controls}>
				<IconButton
					disabled={this.props.id === '' ? true : false}
					className={classes.icon}
					onClick={this.handleShuffle.bind(this)}
				>
					{isShuffled ? (
						<ShuffleIcon className={classes.extraIconSelected} />
					) : (
						<ShuffleIcon className={classes.extraIcon} />
					)}
				</IconButton>
				<IconButton
					disabled={this.props.id === '' ? true : false}
					className={classes.icon}
					onClick={this.handlePrev}
				>
					<SkipPreviousIcon className={classes.innerIcon} />
				</IconButton>
				<IconButton
					disabled={this.props.id === '' ? true : false}
					className={classes.playPauseIcon}
					onClick={this.handlePlayPause}
				>
					{isPlaying ? (
						<PauseIcon className={classes.icon} />
					) : (
						<PlayIcon className={classes.icon} />
					)}
				</IconButton>
				<IconButton
					disabled={this.props.id === '' ? true : false}
					className={classes.icon}
					onClick={this.handleNext}
				>
					<SkipNextIcon className={classes.innerIcon} />
				</IconButton>
				<IconButton
					disabled={this.props.id === '' ? true : false}
					className={classes.icon}
					onClick={this.handleRepeat.bind(this)}
				>
					{this.state.isLooped ? (
						<RepeatIcon className={classes.extraIconSelected} />
					) : null}
					{this.state.isSingleLooped ? (
						<RepeatOneIcon className={classes.extraIconSelected} />
					) : null}
					{!this.state.isLooped && !this.state.isSingleLooped ? (
						<RepeatIcon className={classes.extraIcon} />
					) : null}
				</IconButton>
			</div>
		)
		const mobilePlayer = (
			<div>
				<Card className={classes.mobileCard}>
					<div className={classes.row}>
						<IconButton
							className={classes.mobileLaunch}
							onClick={this.handleLaunch.bind(this)}
						>
							{this.state.isLaunched ? <ArrowDownIcon /> : <ArrowUpIcon />}
						</IconButton>
						<div
							className={classes.mobileSongInfo}
							onClick={this.handleLaunch.bind(this)}
						>
							<Typography
								className={classes.truncate}
								component="h3"
								title={title}
							>
								{title}
							</Typography>
							<Typography
								component={Link}
								to={`/artist/${artist.id}`}
								className={classes.truncate}
								variant="caption"
								title={artist.name}
							>
								{artist.name}
							</Typography>
						</div>
					</div>
					<IconButton
						disabled={this.props.id === '' ? true : false}
						className={classes.playPauseIcon}
						onClick={this.handlePlayPause}
					>
						{isPlaying ? (
							<PauseIcon className={classes.smallIcon} />
						) : (
							<PlayIcon className={classes.smallIcon} />
						)}
					</IconButton>
				</Card>
				<Drawer
					anchor="bottom"
					open={this.state.isLaunched}
					ModalProps={{ onBackdropClick: this.handleLaunch.bind(this) }}
					variant="temporary"
				>
					<div>
						<div className={classes.mobileDrawer}>
							<img
								className={classes.mobileSongArt}
								alt="Song Cover Art"
								src={this.state.tracks[this.props.currentTrack].image}
							/>
							<div>
								<Typography
									align="center"
									className={classes.truncate}
									variant="headline"
									component="h3"
									title={title}
								>
									{title}
								</Typography>
								<Typography
									component={Link}
									to={`/artist/${artist.id}`}
									align="center"
									className={classes.truncate}
									variant="subheading"
									title={artist.name}
								>
									{artist.name}
								</Typography>
							</div>
							<div>
								<input
									type="range"
									value={currentTime}
									max={duration.toString()}
									onChange={this.handleChange.bind(this)}
									ref={this.input}
									className={classes.progressInput}
								/>
								<Typography
									className={classes.currentTime}
									variant="caption"
									align="center"
								>
									{`${convertToSeconds(
										this.state.currentTime * 1000
									)} / ${convertToSeconds(this.state.duration * 1000)}`}
								</Typography>
							</div>
							{controls}
						</div>
					</div>
				</Drawer>
			</div>
		)
		const player = (
			<Card className={classes.card}>
				<div className={classes.playerWrapper}>
					<div className={classes.songLabel}>
						<img
							className={classes.songArt}
							alt="Song Cover Art"
							src={this.state.tracks[this.props.currentTrack].image}
						/>

						<div>
							<Typography
								className={classes.truncate}
								variant="headline"
								component="h3"
								title={title}
							>
								{title}
							</Typography>
							<Typography
								component={Link}
								to={`/artist/${artist.id}`}
								className={classes.truncate}
								variant="subheading"
								title={artist.name}
							>
								{artist.name}
							</Typography>
						</div>
					</div>
					<div>
						{controls}
						<div className={classes.progress}>
							<Typography className={classes.currentTime} variant="caption">
								{convertToSeconds(this.state.currentTime * 1000)}
							</Typography>
							<audio
								autoPlay
								onPlay={this.handleOnPlay.bind(this)}
								ref={this.audio}
								src={this.props.audioSource}
								onTimeUpdate={this.handleTimeUpdate}
								onEnded={this.handleNext}
								onError={this.fetchUrl.bind(this)}
							/>
							<input
								type="range"
								value={currentTime}
								max={duration.toString()}
								onChange={this.handleChange.bind(this)}
								ref={this.input}
								className={classes.progressInput}
							/>
							<Typography className={classes.duration} variant="caption">
								{convertToSeconds(this.state.duration * 1000)}
							</Typography>
						</div>
					</div>
					<input
						type="range"
						step="0.1"
						max="1"
						min="0"
						value={volumeLvl}
						onChange={this.changeVolumeLvl.bind(this)}
						className={classes.volumeSelector}
					/>
				</div>
			</Card>
		)
		return (
			<div className={classes.root}>
				<Hidden smDown implementation="css">
					{player}
				</Hidden>
				<Hidden mdUp implementation="css">
					{mobilePlayer}
				</Hidden>
			</div>
		)
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
		id: state.player.tracks[0].id,
		shuffledTracks: state.player.shuffledTracks,
		audioSource: state.player.audioSource
	}
}
PlaylistPlayer.propTypes = {
	tracks: PropTypes.array.isRequired,
	currentTrack: PropTypes.number.isRequired,
	isPlaying: PropTypes.bool.isRequired,
	id: PropTypes.string.isRequired,
	shuffledTracks: PropTypes.array.isRequired,
	artist: PropTypes.object.isRequired
}
export default connect(mapStateToProps)(PlaylistPlayerWithStyles)
