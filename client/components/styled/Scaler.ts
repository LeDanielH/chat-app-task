import styled from 'styled-components'
import { withTransition } from '@householdjs/utils'
import { TRANSITION_DURATION_DEFAULT } from '@householdjs/utils/lib/constants'

export const Scaler = styled('div')({
	transform: 'scale(1)',
	...withTransition('transform', {
		durationInMs: TRANSITION_DURATION_DEFAULT * 0.5
	}),
	'&:hover': {
		transform: 'scale(1.1)'
	}
})
