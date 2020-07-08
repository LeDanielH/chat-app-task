import React, { ReactNode, useEffect, useState } from 'react'
import { TabSelector } from './TabSelecor'
import { TabSelectorTitle } from './TabSelectorTitle'
import { TabSelectorTitleParticipants } from './TabSelectorParticipants'
import { FlexChild, FlexParent, SimpleWrapper } from '@householdjs/elements'
import { TABS } from './Tabs.constants'
import { THEME } from '../../config/theme'
import { TabParticipants } from './TabParticipants'
import { TabChat } from './TabChat'
import { ModalRegisterUser } from '../ModalRegisterUser'
import { useDispatch, useSelector } from 'react-redux'
import { isRegisteredSelector } from '../../store/selectors'
import { TAppState } from '../../store/types'
import { TWSActionEnum, TWSData } from '../../api/types'
import {
	messageSent,
	userJoined,
	userRegistered,
	usersOnline
} from '../../store/actions'

type TTab = {
	name: string
	tabSelector: ReactNode
	tabContent: (ws: WebSocket) => ReactNode
}

const tabs: Array<TTab> = [
	{
		name: TABS.participants,
		tabSelector: <TabSelectorTitleParticipants />,
		tabContent: (_ws: WebSocket) => <TabParticipants />
	},
	{
		name: TABS.chat,
		tabSelector: <TabSelectorTitle title={TABS.chat} />,
		tabContent: (ws: WebSocket) => <TabChat ws={ws} />
	}
]

export const Tabs = () => {
	const [selected, select] = useState<number>(0)
	const { isRegistered } = useSelector((state: TAppState) => ({
		isRegistered: isRegisteredSelector(state)
	}))

	const dispatch = useDispatch()

	const ws = new WebSocket('ws://localhost:1234')
	useEffect(() => {
		ws.addEventListener('message', (event: WebSocketMessageEvent) => {
			try {
				// getting usersOnline as list -> wanted to update store once
				const wsData: TWSData = JSON.parse(event.data)

				switch (wsData.type) {
					case TWSActionEnum.join:
						dispatch(userJoined(wsData))
						break
					case TWSActionEnum.register:
						dispatch(userRegistered(wsData))
						break
					case TWSActionEnum.message:
						dispatch(messageSent(wsData))
						break
					case TWSActionEnum.online:
						dispatch(usersOnline(wsData))
						break
					default:
						console.warn(`${wsData.type} not handled`)
				}
			} catch (e) {
				return false
			}
		})

		return () => {
			ws.removeEventListener(
				'message',
				(event: WebSocketMessageEvent) => {
					console.log(event)
				}
			)
		}
	}, [ws])

	const selectFactory = (index: number) => () => {
		if (index !== selected) {
			select(index)
		}
	}

	return (
		<>
			<SimpleWrapper height="100%">
				<FlexParent>
					{tabs.map((tab: TTab, index: number) => {
						const isSelected = selected === index
						return (
							<FlexChild
								onClick={selectFactory(index)}
								withPointer={!isSelected}
								key={tab.name}
								width={'100rem'}
							>
								<TabSelector isActive={isSelected}>
									{tab.tabSelector}
								</TabSelector>
							</FlexChild>
						)
					})}
				</FlexParent>
				<SimpleWrapper
					isRelative
					backgroundColor={THEME.colors.tabActive}
					height="100%"
				>
					{tabs[selected].tabContent(ws)}
				</SimpleWrapper>
			</SimpleWrapper>
			<ModalRegisterUser isVisible={!isRegistered} ws={ws} />
		</>
	)
}
