import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListItem, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { playTrack } from '../actions/playerActions'

const convertToSeconds = millis => {
	let minutes = Math.floor(millis / 60000)
	let seconds = ((millis % 60000) / 1000).toFixed(0)
	return `${minutes}:${(seconds < 10 ? '0' : '') + seconds}`
}

const styles = theme => ({
	selected: {
		color: theme.palette.primary.main
	},
	listItem: {}
})

class SongItem extends Component {
	constructor() {
		super()
		this.handleTrack = this.handleTrack.bind(this)
		this.handlePlaylist = this.handlePlaylist.bind(this)
		this.state = {
			isSelected: false
		}
	}
	handleTrack() {
		this.props.dispatch(
			playTrack([
				{
					name: this.props.name,
					artist: this.props.artist,
					image: this.props.image,
					id: this.props.id
				}
			])
		)
	}
	handlePlaylist() {
		this.props.play(this.props.index)
	}

	render() {
		const { classes } = this.props
		return (
			<ListItem
				button
				onClick={
					this.props.type === 'track' ? this.handleTrack : this.handlePlaylist
				}
			>
				<ListItemText>
					<div>
						<Typography
							className={
								this.props.playingTracks[this.props.currentTrack].id ===
								this.props.id
									? classes.selected
									: classes.listItem
							}
						>{`${this.props.name} (${convertToSeconds(
							this.props.duration
						)})`}</Typography>
						<Typography variant="caption">{this.props.artist}</Typography>
					</div>
				</ListItemText>
			</ListItem>
		)
	}
}

SongItem.propTypes = {
	name: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
	artist: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	index: PropTypes.number
}

const mapStateToProps = state => ({
	currentTrack: state.player.currentTrack,
	playingTracks: state.player.tracks
})
const SongItemWithStyles = withStyles(styles)(SongItem)
export default connect(mapStateToProps)(SongItemWithStyles)
