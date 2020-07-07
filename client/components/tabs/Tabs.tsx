import React, { ReactNode, useState } from 'react'
import { TabSelector } from './TabSelecor'
import { TabSelectorTitle } from './TabSelectorTitle'
import { TabSelectorTitleParticipants } from './TabSelectorParticipants'
import { FlexParent, FlexChild, SimpleWrapper } from '@householdjs/elements'
import { TABS } from './Tabs.constants'
import { THEME } from '../../config/theme'
import { TabParticipants } from './TabParticipants'
import { TabChat } from './TabChat'
import { ModalRegisterUser } from '../ModalRegisterUser'

type TTab = {
	name: string
	tabSelector: ReactNode
	tabContent: ReactNode
}

const tabs: Array<TTab> = [
	{
		name: TABS.participants,
		tabSelector: <TabSelectorTitleParticipants participantCount={8} />,
		tabContent: <TabParticipants />
	},
	{
		name: TABS.chat,
		tabSelector: <TabSelectorTitle title={TABS.chat} />,
		tabContent: <TabChat />
	}
]

export const Tabs = () => {
	const [selected, select] = useState<number>(0)
	const [isRegistered, setIsRegistered] = useState<boolean>(false)

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
					{tabs[selected].tabContent}
				</SimpleWrapper>
			</SimpleWrapper>
			<ModalRegisterUser
				onSubmitCallback={setIsRegistered}
				isVisible={!isRegistered}
			/>
		</>
	)
}
