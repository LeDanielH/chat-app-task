import React from 'react'
import { Spacer } from '@householdjs/elements'
import { MessagesList } from '../MessagesList'
import { ScrollContainer } from '../styled'
import { Spacing } from '@householdjs/utils'
import { Form } from '../Form'
import { THEME } from '../../config/theme'
import { TWSActionEnum } from '../../api/types'
import { useMediaQuery } from 'react-responsive'


export const TabChat = () => {
	const isPhone = useMediaQuery({ query: THEME.mediaQueries.isPhone })
	const spacing = isPhone ? Spacing.default : Spacing.big
	return (
		<Spacer top={spacing} bottom={spacing} left={spacing}>
			<ScrollContainer>
				<MessagesList />
				<Spacer right={THEME.sizes.tabChatRightSpacingCompensation}>
					<Form
						wsType={TWSActionEnum.messageBroadcasted}
						placeholder="enter your message"
					/>
				</Spacer>
			</ScrollContainer>
		</Spacer>
	)
}
