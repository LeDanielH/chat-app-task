import React, { ReactNode, useState } from 'react'
import { SimpleWrapper, Spacer } from '@householdjs/elements'
import { THEME } from '../../config/theme'
import { TWSActionEnum } from '../../api/types'
import { useSelector } from 'react-redux'
import { WebSocketForm } from '../WebSocketForm'
import { TAppState, TMessage } from '../../store/types'
import { canEditMessageSelectorFactory } from '../../store/selectors'
import { timePretty } from '../../utils/timePretty'
import { getMessageWithoutTimeUpdated } from '../../store/utils'

import { UserMessageContent } from './userMessageContent'
import { UserMessageHeader } from './UserMessageHeader'

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

	const renderEditMessageForm = (): ReactNode => {
		const initialValue = getMessageWithoutTimeUpdated(value)

		return (
			<WebSocketForm
				ws={ws}
				wsType={TWSActionEnum.messageBroadcasted}
				placeholder={initialValue}
				initialValue={initialValue}
				extraData={{
					timestamp
				}}
				successCallback={toggleCanEdit}
				isInEditMode
			/>
		)
	}

	const renderMessageSection = (): ReactNode => {
		return (
			<SimpleWrapper
				onClick={handleMessageOnClick}
				withPointer={canEditMessage}
			>
				<UserMessageContent value={value} />
			</SimpleWrapper>
		)
	}

	const handleMessageOnClick = canEditMessage ? toggleCanEdit : undefined

	return (
		<Spacer right={THEME.sizes.tabChatRightSpacingCompensation}>
			<UserMessageHeader
				timeFormatted={timeFormatted}
				username={username}
			/>
			{isEditing ? renderEditMessageForm() : renderMessageSection()}
		</Spacer>
	)
}
