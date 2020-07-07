import { DUMMY_PARTICIPANTS } from '../dummyData'
import React from 'react'
import { List, ListItem, Paragraph } from './styled'
import { Spacer } from '@householdjs/elements'
import { THEME } from '../config/theme'
import { Spacing } from '@householdjs/utils'

export const UserList = () => {
	return (
		<List>
			{DUMMY_PARTICIPANTS.map((participant: string) => (
				<ListItem
					key={participant}
					withBorderBottom
					height={THEME.sizes.participantListItemHeight}
				>
					<Spacer horizontal={Spacing.big}>
						<Paragraph disableLineHeight>{participant}</Paragraph>
					</Spacer>
				</ListItem>
			))}
		</List>
	)
}
