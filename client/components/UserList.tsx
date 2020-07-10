import React from 'react'
import { List, ListItem, Paragraph } from './styled'
import { SimpleWrapper } from '@householdjs/elements'
import { THEME } from '../config/theme'
import { Spacing } from '@householdjs/utils'
import { useSelector } from 'react-redux'
import { TAppState } from '../store/types'
import { usersState } from '../store/selectors'
import { TWSData } from '../api/types'
import { useMediaQuery } from 'react-responsive'

export const UserList = () => {
	const { users } = useSelector((state: TAppState) => ({
		users: usersState(state)
	}))

	const isPhone = useMediaQuery({ query: THEME.mediaQueries.isPhone })
	const spacing = isPhone ? Spacing.default : Spacing.big

	return (
		<List>
			{users.map((participant: TWSData) => (
				<ListItem
					key={participant.id}
					withBorderBottom
					height={THEME.sizes.participantListItemHeight}
					withHoverEffect={!isPhone}
				>
					<SimpleWrapper
						horizontal={spacing}
						isRelative={!isPhone}
						zIndex={THEME.zIndex.user}
					>
						<Paragraph disableLineHeight>
							{participant.value}
						</Paragraph>
					</SimpleWrapper>
				</ListItem>
			))}
		</List>
	)
}
