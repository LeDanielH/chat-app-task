import React, { useState } from 'react'
import { TabSelector } from './TabSelecor'

import { FlexChild, FlexParent, SimpleWrapper } from '@householdjs/elements'
import { THEME } from '../../config/theme'
import { TTab } from './Tabs.types'

type TTabsProps = {
	tabsList: Array<TTab>
}

export const Tabs = ({ tabsList = [] }: TTabsProps) => {
	const [selected, select] = useState<number>(0)

	const selectFactory = (index: number) => () => {
		if (index !== selected) {
			select(index)
		}
	}

	return (
		<SimpleWrapper backgroundColor={THEME.colors.containerBackground}>
			<FlexParent>
				{tabsList.map((tab: TTab, index: number) => {
					const isSelected = selected === index
					return (
						<FlexChild
							onClick={selectFactory(index)}
							withPointer={!isSelected}
							key={tab.name}
							flexBasis={'100rem'}
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
				{tabsList[selected].tabContent}
			</SimpleWrapper>
		</SimpleWrapper>
	)
}
