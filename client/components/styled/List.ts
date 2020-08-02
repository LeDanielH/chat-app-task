import styled from 'styled-components'
import { margin, padding } from 'polished'
import { Spacing } from '@householdjs/utils'

export const List = styled('ul')({
	...padding(0),
	...margin(0, 0, Spacing.default, 0),
	marginBlockStart: 0,
	listStyle: 'none'
})
