import React, { ReactNode, useState } from 'react'
import { TabSelector } from './TabSelecor'
import { TabSelectorTitle } from './TabSelectorTitle'
import { TabSelectorTitleParticipants } from './TabSelectorParticipants'
import { FlexChild, FlexParent, SimpleWrapper } from '@householdjs/elements'
import { TABS } from './Tabs.constants'
import { THEME } from '../../config/theme'
import { TabParticipants } from './TabParticipants'
import { TabChat } from './TabChat'
import { ModalRegisterUser } from '../ModalRegisterUser'
import { useSelector } from 'react-redux'
import { isRegisteredSelector } from '../../store/selectors'
import { TAppState } from '../../store/types'
import { useMediaQuery } from 'react-responsive'
import { Spacing } from '@householdjs/utils'

type TTab = {
	name: string
	tabSelector: (centered: boolean) => ReactNode
	tabContent: ReactNode
}

const tabs: Array<TTab> = [
	{
		name: TABS.participants,
		tabSelector: (centered: boolean) => (
			<TabSelectorTitleParticipants centered={centered} />
		),
		tabContent: <TabParticipants />
	},
	{
		name: TABS.chat,
		tabSelector: (centered: boolean) => (
			<TabSelectorTitle title={TABS.chat} centered={centered} />
		),
		tabContent: <TabChat />
	}
]

export const Tabs = () => {
	const [selected, select] = useState<number>(0)
	const { isRegistered } = useSelector((state: TAppState) => ({
		isRegistered: isRegisteredSelector(state)
	}))

	const withTabs = useMediaQuery({ query: THEME.mediaQueries.withTabs })

	const selectFactory = (index: number) => () => {
		if (index !== selected) {
			select(index)
		}
	}

	return (
		<>
			{withTabs ? (
				<SimpleWrapper
					backgroundColor={THEME.colors.containerBackground}
				>
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
										{tab.tabSelector(true)}
									</TabSelector>
								</FlexChild>
							)
						})}
					</FlexParent>
					<SimpleWrapper
						isRelative
						backgroundColor={THEME.colors.tabActive}
						minHeight={THEME.sizes.containerMinHeight}
					>
						{tabs[selected].tabContent}
					</SimpleWrapper>
				</SimpleWrapper>
			) : (
				<FlexParent>
					{tabs.map((tab: TTab) => {
						const participants = tab.name === TABS.participants
						const grow = participants ? 1 : 5
						const backgroundColor = participants
							? THEME.colors.participantsDesktop
							: THEME.colors.tabActive

						return (
							<FlexChild
								grow={grow}
								backgroundColor={backgroundColor}
								key={tab.name}
							>
								<SimpleWrapper horizontal={Spacing.big}>
									{tab.tabSelector(false)}
								</SimpleWrapper>
								<SimpleWrapper
									minHeight={THEME.sizes.containerMinHeight}
								>
									{tab.tabContent}
								</SimpleWrapper>
							</FlexChild>
						)
					})}
				</FlexParent>
			)}
			<ModalRegisterUser isVisible={!isRegistered} />
		</>
	)
}
