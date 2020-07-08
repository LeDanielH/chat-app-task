import React, { useState } from 'react'
import { Heading, Paragraph } from './styled'
import { FlexChild, FlexParent, Spacer } from '@householdjs/elements'
import { THEME } from '../config/theme'
import { Spacing } from '@householdjs/utils'
import { TWSActionEnum } from '../api/types'
import { useSelector } from 'react-redux'
import { WebSocketForm } from './WebSocketForm'
import { TAppState, TMessage } from '../store/types'
import { canEditMessageSelectorFactory } from '../store/selectors'
import { timePretty } from '../utils/timePretty'

type TUserMessage = TMessage & { ws: WebSocket }

export const UserMessage = ({
	id,
	value,
	timestamp,
	ws,
	username
}: TUserMessage) => {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const { canEditMessage } = useSelector((state: TAppState) => {
		const canEditMessageSelector = canEditMessageSelectorFactory(id)
		return {
			canEditMessage: canEditMessageSelector(state)
		}
	})
	const timeFormatted = timePretty(timestamp)

	const toggleCanEdit = () => {
		setIsEditing(!isEditing)
	}

	const handleMessageOnClick = canEditMessage ? toggleCanEdit : undefined

	return (
		<Spacer right={THEME.sizes.tabChatRightSpacingCompensation}>
			<FlexParent fullWidth withBottomSpacing={Spacing.small}>
				<FlexChild>
					<Heading color={THEME.colors.heading} disableLineHeight>
						{username}
					</Heading>
				</FlexChild>
				<FlexChild left onClick={handleMessageOnClick}>
					{isEditing ? (
						<WebSocketForm
							ws={ws}
							wsType={TWSActionEnum.messageBroadcasted}
							placeholder={value}
						/>
					) : (
						<Paragraph color={THEME.colors.time} disableLineHeight>
							{timeFormatted}
						</Paragraph>
					)}
				</FlexChild>
			</FlexParent>
			<Paragraph>{value}</Paragraph>
		</Spacer>
	)
}
