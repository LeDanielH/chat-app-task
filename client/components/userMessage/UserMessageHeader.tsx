import React from 'react'
import { Spacing } from '@householdjs/utils'
import { FlexChild, FlexParent } from '@householdjs/elements'
import { THEME } from '../../config/theme'
import { getPrettyDateTime } from '../../utils/getPretty'
import { Heading } from '../styled/Heading'
import { Paragraph } from '../styled/Paragraph'

type TUserMessageHeader = {
	username: string
	timestamp: number
}

export const UserMessageHeader = ({
	username,
	timestamp
}: TUserMessageHeader) => {
	const prettyDateTime = getPrettyDateTime(timestamp)

	return (
		<FlexParent fullWidth withBottomMargin={Spacing.small}>
			<FlexChild>
				<Heading color={THEME.colors.heading} disableLineHeight>
					{username}
				</Heading>
			</FlexChild>
			<FlexChild sLeft>
				<Paragraph
					color={THEME.colors.time}
					disableLineHeight
					letterSpacing={THEME.typography.lsTime}
				>
					{prettyDateTime}
				</Paragraph>
			</FlexChild>
		</FlexParent>
	)
}
