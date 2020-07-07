import React from 'react'
import { TabSelectorTitle } from './TabSelectorTitle'
import { TABS } from './Tabs.constants'

type TConnectedProps = {
	participantCount: number
}

type TTabSelectorTitleParticipants = TConnectedProps

// TODO connect participantCount to redux
export const TabSelectorTitleParticipants = ({
	participantCount
}: TTabSelectorTitleParticipants) => {
	const titleWithCount = `${TABS.participants} (${participantCount})`

	return <TabSelectorTitle title={titleWithCount} />
}
