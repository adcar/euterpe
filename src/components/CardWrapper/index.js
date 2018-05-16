import React from 'react'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
	cardWrapper: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
		justifyItems: 'center',
		alignItems: 'center'
	}
})

const CardWrapper = ({ classes, children }) => (
	<div className={classes.cardWrapper}>{children}</div>
)

export default withStyles(styles)(CardWrapper)
