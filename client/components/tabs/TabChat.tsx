import React from 'react'
import { Spacer } from '@householdjs/elements'
import { MessagesList } from '../MessagesList'
import { ScrollContainer } from '../styled'
import { Spacing } from '@householdjs/utils'
import { WebSocketForm } from '../WebSocketForm'
import { THEME } from '../../config/theme'
import { TWSData, TWSActionEnum } from '../../api/types'

type TTabChatProps = {
	ws: WebSocket
}

export const TabChat = ({ ws }: TTabChatProps) => {
	// TODO remove, handled in Tabs
	const onMessageSubmitted = (wsData: TWSData) => {
		console.info(wsData)
	}

	return (
		<Spacer top={Spacing.big} bottom={Spacing.big} left={Spacing.big}>
			<ScrollContainer>
				<MessagesList />
				<Spacer right={THEME.sizes.tabChatRightSpacingCompensation}>
					<WebSocketForm
						wsType={TWSActionEnum.message}
						placeholder="enter your message"
						successCallback={onMessageSubmitted}
						ws={ws}
					/>
				</Spacer>
			</ScrollContainer>
		</Spacer>
	)
}
