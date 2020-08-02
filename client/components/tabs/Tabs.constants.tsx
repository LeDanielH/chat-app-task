import React from 'react'
import { TabSelectorTitleParticipants } from './TabSelectorParticipants'
import { TabParticipants } from './TabParticipants'
import { TabSelectorTitle } from './TabSelectorTitle'
import { TabChat } from './TabChat'
import { TTab } from './Tabs.types'

export const TAB_PROPS_TO_ANIMATE = ['background-color']

export const TABS_NAMES = {
	participants: 'Participants',
	chat: 'Chat'
}

export const TABS_LIST: Array<TTab> = [
	{
		name: TABS_NAMES.participants,
		tabSelector: (centered: boolean) => (
			<TabSelectorTitleParticipants centered={centered} />
		),
		tabContent: <TabParticipants />
	},
	{
		name: TABS_NAMES.chat,
		tabSelector: (centered: boolean) => (
			<TabSelectorTitle title={TABS_NAMES.chat} centered={centered} />
		),
		tabContent: <TabChat />
	}
]
