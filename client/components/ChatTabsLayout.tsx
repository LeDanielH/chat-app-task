import React from 'react'
import { Tabs } from './tabs/Tabs'
import { TABS_LIST } from './tabs/Tabs.constants'

export const ChatTabsLayout = () => {
	return <Tabs tabsList={TABS_LIST} />
}
