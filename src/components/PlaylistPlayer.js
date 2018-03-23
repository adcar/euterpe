import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious'
import SkipNextIcon from 'material-ui-icons/SkipNext'

const styles = theme => ({
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
	componentWillReceiveProps(nextProps) {
		if (nextProps.tracks.length > 0) {
			this.setState({
				tracks: nextProps.tracks,
				sources: nextProps.tracks.map(
					track =>
						`https://apolloapi.herokuapp.com/${encodeURIComponent(
							track.name
						)}/${encodeURIComponent(track.artist)}`
				)
			})
			this.setState({
				currentSource: nextProps.currentTrack
			})
		}
		if (nextProps.playing === false) {
			this.audio.pause()
		}
		if (nextProps.playing === true) {
			this.audio.play()
		}
	}
	handlePrev() {
		if (this.state.currentSource > 0) {
			this.setState({
				currentSource: this.state.currentSource - 1
			})
		}
	}
	handleNext() {
		if (this.state.currentSource < this.state.sources.length) {
			this.setState({
				currentSource: this.state.currentSource + 1
			})
		}
	}
	render() {
		const { classes } = this.props

		const player = this.state.tracks[this.state.currentSource] ? (
			<Card className={classes.card}>
				<div>
					<div className={classes.songLabel}>
						<img
							className={classes.songArt}
							alt="Song Cover Art"
							src={this.state.tracks[this.state.currentSource].image}
						/>
						<CardContent className={classes.cardContent}>
							<div>
								{' '}
								<Typography variant="headline" component="h3" align="right">
									{this.state.tracks[this.state.currentSource].name}
								</Typography>
								<Typography variant="subheading" align="right">
									{this.state.tracks[this.state.currentSource].artist}
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
							onEnded={this.handleNext.bind(this)}
							onError={this.handleNext.bind(this)}
							ref={audio => {
								this.audio = audio
							}}
							autoPlay
							controls
							className={classes.audio}
							src={this.state.sources[this.state.currentSource]}
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
		) : (
			<div className={classes.progress}>
				<Card className={classes.card}>
					<div>
						<div className={classes.songLabel}>
							<img
								className={classes.songArt}
								alt="Song Cover Art"
								src="http://via.placeholder.com/120x120"
							/>
							<CardContent className={classes.cardContent}>
								<div>
									{' '}
									<Typography variant="headline" component="h3" align="right" />
									<Typography variant="subheading" align="right" />
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
								onEnded={this.handleNext.bind(this)}
								onError={this.handleNext.bind(this)}
								ref={audio => {
									this.audio = audio
								}}
								autoPlay
								controls
								className={classes.audio}
								src={this.state.sources[this.state.currentSource]}
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
			</div>
		)
		return <div>{player}</div>
	}
}
PlaylistPlayer.propTypes = {
	tracks: PropTypes.array,
	currentTrack: PropTypes.number
}

export default withStyles(styles, { withTheme: true })(PlaylistPlayer)
