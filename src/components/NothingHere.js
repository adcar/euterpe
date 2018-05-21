import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		height: '50vh',
		padding: theme.spacing.unit * 2
	},
	emoticon: {
		[theme.breakpoints.down('xs')]: {
			fontSize: 70
		}
	},
	errorText: {
		[theme.breakpoints.down('xs')]: {
			fontSize: 30
		}
	}
})

const NothingHere = ({ classes, type }) => (
	<div className={classes.root}>
		<Typography
			variant="display4"
			align="center"
			gutterBottom
			className={classes.emoticon}
		>
			¯\_(ツ)_/¯
		</Typography>
		<Typography
			className={classes.errorText}
			variant="display2"
			align="center"
		>{`Nothing's Here! Try saving some ${type}.`}</Typography>
	</div>
)

export default withStyles(styles)(NothingHere)
