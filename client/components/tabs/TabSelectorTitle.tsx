import React from 'react'
import { Paragraph } from '../styled'
import { TTabSelectorTitleProps } from './Tabs.constants'
import { THEME } from '../../config/theme'

export const TabSelectorTitle = ({ title }: TTabSelectorTitleProps) => {
	return (
		<Paragraph
			textAlign="center"
			lineHeight={THEME.sizes.tabSelectorHeight}
		>
			{title}
		</Paragraph>
	)
}
