import React from 'react'
import { Spacer } from '@householdjs/elements'
import { MessagesList } from '../MessagesList'
import { ScrollContainer } from '../styled'
import { Spacing } from '@householdjs/utils'
import { WebSocketForm } from '../WebSocketForm'
import { THEME } from '../../config/theme'
import { TWSData, TWSActionType } from '../../api/types'

export const TabChat = () => {
	const onMessageSubmitted = (wsData: TWSData) => {
		console.log(wsData)
	}
	return (
		<Spacer top={Spacing.big} bottom={Spacing.big} left={Spacing.big}>
			<ScrollContainer>
				<MessagesList />
				<Spacer right={THEME.sizes.tabChatRightSpacingCompensation}>
					<WebSocketForm
						wsType={TWSActionType.message}
						placeholder="enter your message"
						successCallback={onMessageSubmitted}
					/>
				</Spacer>
			</ScrollContainer>
		</Spacer>
	)
}
