import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { playTrack } from '../../actions/playerActions'
import convertToSeconds from '../../convertToSeconds'
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
			isSelected: false,
			tracks: [
				{
					id: ''
				}
			]
		}
	}
	handleTrack() {
		this.props.dispatch(
			playTrack([
				{
					name: this.props.name,
					artist: this.props.artist,
					image: this.props.image,
					id: this.props.id,
					duration: this.props.duration
				}
			])
		)
	}
	handlePlaylist() {
		this.props.play(this.props.index)
	}

	static getDerivedStateFromProps(prevProps) {
		if (prevProps.isShuffled) {
			return {
				tracks: prevProps.shuffledTracks
			}
		} else if (!prevProps.isShuffled) {
			return {
				tracks: prevProps.tracks
			}
		}
	}
	render() {
		const { classes, artist } = this.props
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
								this.state.tracks[this.props.currentTrack].id === this.props.id
									? classes.selected
									: classes.listItem
							}
						>{`${this.props.name} (${convertToSeconds(
							this.props.duration
						)})`}</Typography>
						<Typography
							variant="caption"
							component={Link}
							to={`/artist/${artist.id}`}
							align="center"
							style={{
								display: 'inline-flex'
							}}
						>
							{artist.name}
						</Typography>
					</div>
				</ListItemText>
			</ListItem>
		)
	}
}

SongItem.propTypes = {
	name: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
	artist: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired,
	index: PropTypes.number,
	isShuffled: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	currentTrack: state.player.currentTrack,
	tracks: state.player.tracks,
	shuffledTracks: state.player.shuffledTracks,
	isShuffled: state.player.isShuffled
})
const SongItemWithStyles = withStyles(styles)(SongItem)
export default connect(mapStateToProps)(SongItemWithStyles)
