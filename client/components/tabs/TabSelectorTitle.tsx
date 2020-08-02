import React from 'react'
import { TTabSelectorTitleProps } from './Tabs.types'
import { THEME } from '../../config/theme'
import { Paragraph } from '../styled/Paragraph'

export const TabSelectorTitle = ({
	title,
	centered
}: TTabSelectorTitleProps) => {
	return (
		<Paragraph
			textAlign={centered ? 'center' : undefined}
			lineHeight={THEME.sizes.tabSelectorHeight}
		>
			{title}
		</Paragraph>
	)
}
