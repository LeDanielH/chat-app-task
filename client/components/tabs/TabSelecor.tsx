import React, { ReactNode } from 'react'
import { SimpleWrapper } from '@householdjs/elements'
import { THEME } from '../../config/theme'
import { TAB_PROPS_TO_ANIMATE } from './Tabs.constants'
import { TTabCommonProps } from './Tabs.types'

type TTabSelecorProps = TTabCommonProps & {
	children: ReactNode
}

export const TabSelector = ({ isActive, children }: TTabSelecorProps) => {
	const backgroundColor = isActive
		? THEME.colors.tabActive
		: THEME.colors.tabInActive
	return (
		<SimpleWrapper
			backgroundColor={backgroundColor}
			height={THEME.sizes.tabSelectorHeight}
			withTransition={{
				transitionProperties: TAB_PROPS_TO_ANIMATE
			}}
			sHorizontal
		>
			{children}
		</SimpleWrapper>
	)
}
