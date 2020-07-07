import React from 'react'
import { TabSelectorTitle } from './TabSelectorTitle'
import { TABS } from './Tabs.constants'
import { useSelector } from 'react-redux'
import { TAppState } from '../../store/types'
import { usersCountSelector } from '../../store/selectors'

export const TabSelectorTitleParticipants = () => {
	const { usersCount } = useSelector((state: TAppState) => ({
		usersCount: usersCountSelector(state)
	}))
	const titleWithCount = `${TABS.participants} (${usersCount})`

	return <TabSelectorTitle title={titleWithCount} />
}
