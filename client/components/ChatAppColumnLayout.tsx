import React, { ReactNode } from 'react'
import { THEME } from '../config/theme'
import { FlexChild, SimpleWrapper } from '@householdjs/elements'

import { Spacing } from '@householdjs/utils'

type TChatAppColumnLayout = {
	backgroundColor: string
	grow: boolean | number
	columnTitleComponent: ReactNode
	children: ReactNode
}

export const ChatAppColumnLayout = ({
	grow,
	backgroundColor,
	columnTitleComponent,
	children
}: TChatAppColumnLayout) => {
	return (
		<FlexChild grow={grow} backgroundColor={backgroundColor}>
			<SimpleWrapper sHorizontal={Spacing.big}>
				{columnTitleComponent}
			</SimpleWrapper>
			<SimpleWrapper minHeight={THEME.sizes.containerMinHeight}>
				{children}
			</SimpleWrapper>
		</FlexChild>
	)
}
