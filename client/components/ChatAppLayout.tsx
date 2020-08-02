import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { THEME } from '../config/theme'

import { ModalRegisterUser } from './ModalRegisterUser'
import { ChatTabsLayout } from './ChatTabsLayout'
import { ChatAppDesktopLayout } from './ChatAppDesktopLayout'
import { ChatAppTitle } from './ChatAppTitle'

export const ChatAppLayout = () => {
	const withTabs = useMediaQuery({ query: THEME.mediaQueries.withTabs })

	return (
		<>
			<ChatAppTitle />
			{withTabs ? <ChatTabsLayout /> : <ChatAppDesktopLayout />}
			<ModalRegisterUser />
		</>
	)
}
