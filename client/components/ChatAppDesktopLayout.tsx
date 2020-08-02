import React from 'react'
import { THEME } from '../config/theme'
import { FlexParent } from '@householdjs/elements'
import { TTab } from './tabs/Tabs.types'
import { TABS_NAMES } from './tabs/Tabs.constants'
import { TABS_LIST } from './tabs/Tabs.constants'
import { ChatAppColumnLayout } from './ChatAppColumnLayout'

export const ChatAppDesktopLayout = () => {
	return (
		<FlexParent>
			{TABS_LIST.map((tab: TTab) => {
				const participants = tab.name === TABS_NAMES.participants
				const grow = participants ? 1 : 5
				const backgroundColor = participants
					? THEME.colors.participantsDesktop
					: THEME.colors.tabActive

				return (
					<ChatAppColumnLayout
						key={tab.name}
						grow={grow}
						columnTitleComponent={tab.tabSelector(false)}
						backgroundColor={backgroundColor}
					>
						{tab.tabContent}
					</ChatAppColumnLayout>
				)
			})}
		</FlexParent>
	)
}
