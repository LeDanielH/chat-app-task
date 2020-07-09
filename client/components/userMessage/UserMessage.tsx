import React, { ReactNode, useContext, useState } from 'react'
import { FlexChild, FlexParent, Spacer } from '@householdjs/elements'
import { THEME } from '../../config/theme'
import { TWSActionEnum, TWSData } from '../../api/types'
import { useSelector } from 'react-redux'
import { Form } from '../Form'
import { TAppState, TMessage } from '../../store/types'
import { canEditMessageSelectorFactory } from '../../store/selectors'
import { getPrettyTime } from '../../utils/getPrettyTime'
import { getMessageWithoutTimeUpdated } from '../../store/utils'
import { IconBin } from '../icons/IconBin'

import { UserMessageContent } from './userMessageContent'
import { UserMessageHeader } from './UserMessageHeader'
import { Spacing } from '@householdjs/utils'
import { IconEdit } from '../icons/IconEdit'
import { MESSAGE_REMOVED } from '../../constants'
import { WebSocketContext } from '../wsContext'

export const UserMessage = ({
	id,
	value,
	timestamp,
	username
}: TMessage) => {
	const ws = useContext(WebSocketContext)

	const [isEditing, setIsEditing] = useState<boolean>(false)
	const { canEditMessage } = useSelector((state: TAppState) => {
		const canEditMessageSelector = canEditMessageSelectorFactory(id)
		return {
			canEditMessage: canEditMessageSelector(state)
		}
	})
	const timeFormatted = getPrettyTime(timestamp)

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
		ws.send(removedMessageString)
	}

	const renderEditMessageForm = (): ReactNode => {
		const initialValue = getMessageWithoutTimeUpdated(value)

		return (
			<Form
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

	const renderActionIcons = () => {
		return (
			<FlexChild shrink>
				<FlexParent>
					<FlexChild
						horizontal={Spacing.small}
						withPointer
						onClick={removeMessage}
					>
						<IconBin />
					</FlexChild>
					<FlexChild
						horizontal={Spacing.small}
						withPointer
						onClick={toggleCanEdit}
					>
						<IconEdit />
					</FlexChild>
				</FlexParent>
			</FlexChild>
		)
	}

	const renderMessage = () => {
		return (
			<FlexChild grow shrink>
				<UserMessageContent value={value} />
			</FlexChild>
		)
	}

	const renderMessageSection = (): ReactNode => {
		const isMessageRemoved = value === MESSAGE_REMOVED
		const canRenderActionIcons =
			canEditMessage && !isEditing && !isMessageRemoved

		return (
			<FlexParent
				alignItems="center"
				fullWidth
				justifyContent="space-between"
			>
				{renderMessage()}
				{canRenderActionIcons ? renderActionIcons() : null}
			</FlexParent>
		)
	}

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
