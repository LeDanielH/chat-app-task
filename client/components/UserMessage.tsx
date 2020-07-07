import React from 'react'
import { Heading, Paragraph } from './styled'
import { FlexParent, FlexChild, Spacer } from '@householdjs/elements'
import { THEME } from '../config/theme'
import { Spacing } from '@householdjs/utils'
import { TUserMessageDto } from '../api/types'
import { format } from 'date-fns'

export const UserMessage = ({
	name,
	timePostedTimestamp,
	message
}: TUserMessageDto) => {
	const timePretty = format(timePostedTimestamp, 'HH:MM')

	return (
		<Spacer right={THEME.sizes.tabChatRightSpacingCompensation}>
			<FlexParent fullWidth withBottomSpacing={Spacing.small}>
				<FlexChild>
					<Heading color={THEME.colors.heading} disableLineHeight>
						{name}
					</Heading>
				</FlexChild>
				<FlexChild left>
					<Paragraph color={THEME.colors.time} disableLineHeight>
						{timePretty}
					</Paragraph>
				</FlexChild>
			</FlexParent>
			<Paragraph>{message}</Paragraph>
		</Spacer>
	)
}
