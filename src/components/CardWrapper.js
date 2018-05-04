import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'

const styles = {
	cardWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
	}
}

const CardWrapper = ({ classes, children }) => (
	<div className={classes.cardWrapper}>{children}</div>
)

export default withStyles(styles)(CardWrapper)
