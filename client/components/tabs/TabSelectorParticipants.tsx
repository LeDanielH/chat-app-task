import React from 'react'
import { TabSelectorTitle } from './TabSelectorTitle'
import { TABS_NAMES } from './Tabs.constants'
import { useSelector } from 'react-redux'
import { TAppState } from '../../store/types'
import { usersCountSelector } from '../../store/selectors'

type TTabSelectorTitleParticipants = {
	centered: boolean
}

export const TabSelectorTitleParticipants = ({
	centered
}: TTabSelectorTitleParticipants) => {
	const { usersCount } = useSelector((state: TAppState) => ({
		usersCount: usersCountSelector(state)
	}))
	const titleWithCount = `${TABS_NAMES.participants} (${usersCount})`

	return <TabSelectorTitle title={titleWithCount} centered={centered} />
}
