import React from 'react'
import { Paragraph } from '../styled'
import { TTabSelectorTitleProps } from './Tabs.constants'
import { THEME } from '../../config/theme'

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
