import React from 'react'
import { Paragraph } from './styled'
import { Tabs } from './tabs/Tabs'
import { SimpleWrapper } from '@householdjs/elements'
import { THEME } from '../config/theme'
import { Spacing } from '@householdjs/utils'
import { Spacer } from '@householdjs/elements'

export const Page = () => {
	return (
		<SimpleWrapper
			backgroundColor={THEME.colors.windowBackground}
			minHeight="100vh"
			horizontal={Spacing.big}
		>
			<Spacer all={Spacing.big}>
				<Paragraph
					textAlign="center"
					fontSize={THEME.typography.fsPageTitle}
					disableLineHeight
				>
					Status Meeting Standup
				</Paragraph>
			</Spacer>
			<Tabs />
		</SimpleWrapper>
	)
}
