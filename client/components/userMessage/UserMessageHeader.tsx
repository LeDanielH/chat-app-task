import { Spacing } from '@householdjs/utils'
import { FlexChild, FlexParent } from '@householdjs/elements'
import { Heading, Paragraph } from '../styled'
import { THEME } from '../../config/theme'
import React from 'react'

type TUserMessageHeader = {
	username: string
	timeFormatted: string
}
export const UserMessageHeader = ({
	username,
	timeFormatted
}: TUserMessageHeader) => {
	return (
		<FlexParent fullWidth withBottomSpacing={Spacing.small}>
			<FlexChild>
				<Heading color={THEME.colors.heading} disableLineHeight>
					{username}
				</Heading>
			</FlexChild>
			<FlexChild left>
				<Paragraph
					color={THEME.colors.time}
					disableLineHeight
					letterSpacing={THEME.typography.lsTime}
				>
					{timeFormatted}
				</Paragraph>
			</FlexChild>
		</FlexParent>
	)
}
