import React from 'react'
import { Spacer } from '@householdjs/elements'
import { MessagesList } from '../MessagesList'
import { ScrollContainer } from '../styled'
import { Spacing } from '@householdjs/utils'
import { InputMessage } from '../InputMessage'

export const TabChat = () => {
	return (
		<Spacer top={Spacing.big} bottom={Spacing.big} left={Spacing.big}>
			<ScrollContainer>
				<MessagesList />
				<InputMessage />
			</ScrollContainer>
		</Spacer>
	)
}
