import React from 'react'
import { Spacer } from '@householdjs/elements'
import { MessagesList } from '../MessagesList'
import { Spacing } from '@householdjs/utils'
import { ChatInput } from '../ChatInput'
import { THEME } from '../../config/theme'
import { TWSActionEnum } from '../../api/generated/types-common'
import { useMediaQuery } from 'react-responsive'
import { UNABLE_TO_SEMD } from '../../constants'
import { ScrollContainer } from '../styled/ScrollContainer'

export const TabChat = () => {
	const isPhone = useMediaQuery({ query: THEME.mediaQueries.isPhone })
	const spacing = isPhone ? Spacing.default : Spacing.big
	return (
		<Spacer sTop={spacing} sBottom={spacing} sLeft={spacing}>
			<ScrollContainer>
				<MessagesList />
				<Spacer sRight={THEME.sizes.tabChatRightSpacingCompensation}>
					<ChatInput
						wsType={TWSActionEnum.messageBroadcasted}
						placeholder="enter your message"
						errorMessage={UNABLE_TO_SEMD}
					/>
				</Spacer>
			</ScrollContainer>
		</Spacer>
	)
}
