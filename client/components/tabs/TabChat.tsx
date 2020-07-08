import React from 'react'
import { Spacer } from '@householdjs/elements'
import { MessagesList } from '../MessagesList'
import { ScrollContainer } from '../styled'
import { Spacing } from '@householdjs/utils'
import { WebSocketForm } from '../WebSocketForm'
import { THEME } from '../../config/theme'
import { TWSActionEnum } from '../../api/types'
import { useMediaQuery } from 'react-responsive'

type TTabChatProps = {
	ws: WebSocket
}

export const TabChat = ({ ws }: TTabChatProps) => {
	const isPhone = useMediaQuery({ query: THEME.mediaQueries.isPhone });
	const spacing = isPhone ? Spacing.default : Spacing.big;
	return (
		<Spacer top={spacing} bottom={spacing} left={spacing}>
			<ScrollContainer>
				<MessagesList ws={ws} />
				<Spacer right={THEME.sizes.tabChatRightSpacingCompensation}>
					<WebSocketForm
						wsType={TWSActionEnum.messageBroadcasted}
						placeholder="enter your message"
						ws={ws}
					/>
				</Spacer>
			</ScrollContainer>
		</Spacer>
	)
}
