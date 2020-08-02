import { Spacing } from '@householdjs/utils'
import { THEME } from '../config/theme'
import { Spacer } from '@householdjs/elements'
import React from 'react'
import { Paragraph } from './styled/Paragraph'

export const ChatAppTitle = () => (
	<Spacer sAll={Spacing.big}>
		<Paragraph
			textAlign="center"
			fontSize={THEME.typography.fsPageTitle}
			disableLineHeight
		>
			Status Meeting Standup
		</Paragraph>
	</Spacer>
)
