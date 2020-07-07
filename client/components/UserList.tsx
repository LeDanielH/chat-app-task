import React from 'react'
import { List, ListItem, Paragraph } from './styled'
import { Spacer } from '@householdjs/elements'
import { THEME } from '../config/theme'
import { Spacing } from '@householdjs/utils'
import { useSelector } from 'react-redux'
import { TAppState } from '../store/types'
import { usersState } from '../store/selectors'
import { TWSData } from '../api/types'

export const UserList = () => {
	const { users } = useSelector((state: TAppState) => ({
		users: usersState(state)
	}))
	return (
		<List>
			{users.map((participant: TWSData) => (
				<ListItem
					key={participant.id}
					withBorderBottom
					height={THEME.sizes.participantListItemHeight}
				>
					<Spacer horizontal={Spacing.big}>
						<Paragraph disableLineHeight>
							{participant.value}
						</Paragraph>
					</Spacer>
				</ListItem>
			))}
		</List>
	)
}
