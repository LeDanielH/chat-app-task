import React, { ReactNode, useContext, useState } from 'react'
import { FlexChild, FlexParent, Spacer } from '@householdjs/elements'
import { THEME } from '../../config/theme'
import { TWSActionEnum, TWSData } from '../../api/generated/types-common'
import { useSelector } from 'react-redux'
import { ChatInput } from '../ChatInput'
import { TAppState, TMessage } from '../../store/types'
import { canEditMessageSelectorFactory } from '../../store/selectors'
import { IconBin } from '../icons/IconBin'

import { UserMessageContent } from './userMessageContent'
import { UserMessageHeader } from './UserMessageHeader'
import { IconEdit } from '../icons/IconEdit'
import { MESSAGE_REMOVED, UNABLE_TO_REMOVE } from '../../constants'
import { WebSocketContext } from '../wsContext'
import { ActionIcon } from './UserMessagActionIcon'

export const UserMessage = ({
	id,
	value,
	timestamp,
	username,
	updated
}: TMessage) => {
	const { ws, isWsEnabled } = useContext(WebSocketContext)

	const [isEditing, setIsEditing] = useState<boolean>(false)
	const { canEditMessage } = useSelector((state: TAppState) => {
		const canEditMessageSelector = canEditMessageSelectorFactory(id)
		return {
			canEditMessage: canEditMessageSelector(state)
		}
	})

	const toggleCanEdit = () => {
		setIsEditing(!isEditing)
	}

	const removeMessage = () => {
		const wsData: TWSData = {
			id,
			timestamp,
			type: TWSActionEnum.messageRemoved,
			value
		}
		const removedMessageString = JSON.stringify(wsData)
		if (ws && isWsEnabled) {
			ws.send(removedMessageString)
		} else {
			alert(UNABLE_TO_REMOVE)
		}
	}

	const renderEditMessageForm = (): ReactNode => {
		return (
			<ChatInput
				wsType={TWSActionEnum.messageUpdated}
				placeholder={value}
				initialValue={value}
				extraData={{
					timestamp
				}}
				successCallback={toggleCanEdit}
				isInEditMode
			/>
		)
	}

	const renderActionIcons = () => {
		return (
			<FlexChild shrink>
				<FlexParent>
					<ActionIcon onClick={removeMessage}>
						<IconBin />
					</ActionIcon>
					<ActionIcon onClick={toggleCanEdit}>
						<IconEdit />
					</ActionIcon>
				</FlexParent>
			</FlexChild>
		)
	}

	const renderMessage = (): ReactNode => {
		const isMessageRemoved = value === MESSAGE_REMOVED
		const canRenderActionIcons =
			canEditMessage && !isEditing && !isMessageRemoved

		return (
			<FlexParent
				alignItems="center"
				fullWidth
				justifyContent="space-between"
			>
				<FlexChild grow shrink>
					<UserMessageContent value={value} updatedAt={updated} />
				</FlexChild>
				{canRenderActionIcons ? renderActionIcons() : null}
			</FlexParent>
		)
	}

	return (
		<Spacer sRight={THEME.sizes.tabChatRightSpacingCompensation}>
			<UserMessageHeader timestamp={timestamp} username={username} />
			{isEditing ? renderEditMessageForm() : renderMessage()}
		</Spacer>
	)
}
