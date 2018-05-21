import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
	root: {
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2
	}
})

const PageLabel = ({ classes, children }) => {
	return (
		<Typography
			className={classes.root}
			variant="display1"
			component="h1"
			align="center"
		>
			{children}
		</Typography>
	)
}

export default withStyles(styles)(PageLabel)
