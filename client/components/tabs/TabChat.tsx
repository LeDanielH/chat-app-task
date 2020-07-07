import React from 'react'
import { Spacer } from '@householdjs/elements'
import { MessagesList } from '../MessagesList'
import { ScrollContainer } from '../styled'
import { Spacing } from '@householdjs/utils'
import { WebSocketForm } from '../WebSocketForm'
import { THEME } from '../../config/theme'

export const TabChat = () => {
	const onMessageSubmitted = (message: string) => {
		console.log(message)
	}
	return (
		<Spacer top={Spacing.big} bottom={Spacing.big} left={Spacing.big}>
			<ScrollContainer>
				<MessagesList />
				<Spacer right={THEME.sizes.tabChatRightSpacingCompensation}>
					<WebSocketForm
						inputName="message"
						placeholder="enter your message"
						successCallback={onMessageSubmitted}
					/>
				</Spacer>
			</ScrollContainer>
		</Spacer>
	)
}
