import React from 'react'
import { SimpleWrapper } from '@householdjs/elements'
import { THEME } from '../config/theme'
import { Spacing } from '@householdjs/utils'
import { useMediaQuery } from 'react-responsive'
import { ChatAppLayout } from './ChatAppLayout'

export const Page = () => {
	const isPhone = useMediaQuery({ query: THEME.mediaQueries.isPhone })
	const spacing = isPhone ? Spacing.default : Spacing.big
	return (
		<SimpleWrapper
			backgroundColor={THEME.colors.windowBackground}
			minHeight="100vh"
			sHorizontal={spacing}
		>
			<ChatAppLayout />
		</SimpleWrapper>
	)
}
