import React from 'react'
import { Paragraph } from './styled'
import { Tabs } from './tabs/Tabs'
import { Spacer, SimpleWrapper } from '@householdjs/elements'
import { THEME } from '../config/theme'
import { Spacing } from '@householdjs/utils'
import { useMediaQuery } from 'react-responsive'

export const Page = () => {
	const isPhone = useMediaQuery({ query: THEME.mediaQueries.isPhone })
	const spacing = isPhone ? Spacing.default : Spacing.big
	return (
		<SimpleWrapper
			backgroundColor={THEME.colors.windowBackground}
			minHeight="100vh"
			horizontal={spacing}
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
