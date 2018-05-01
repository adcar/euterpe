import React from 'react'
import PropTypes from 'prop-types'
import { ListItem, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'

const convertToSeconds = millis => {
	let minutes = Math.floor(millis / 60000)
	let seconds = ((millis % 60000) / 1000).toFixed(0)
	return `${minutes}:${(seconds < 10 ? '0' : '') + seconds}`
}

const SongItem = props => (
	<ListItem button onClick={() => console.log('dispatch an action here')}>
		<ListItemText>
			<div>
				<Typography>{`${props.name} (${convertToSeconds(
					props.duration
				)})`}</Typography>
				<Typography variant="caption">{props.artist}</Typography>
			</div>
		</ListItemText>
	</ListItem>
)

SongItem.propTypes = {
	name: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
	artist: PropTypes.string.isRequired
}
export default SongItem
