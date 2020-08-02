import { THEME } from '../../config/theme'
import { CSSObject } from 'styled-components'
import { Spacing } from '@householdjs/utils'

export interface TypographyProps {
	textAlign?: 'left' | 'center' | 'right'
	withBottomSpacing?: boolean
	lineHeight?: string
	fontSize?: string
	color?: string
	disableLineHeight?: boolean
	letterSpacing?: string
}

export const getTypographyProps = ({
	textAlign,
	withBottomSpacing,
	lineHeight = THEME.typography.lhBody,
	color = THEME.colors.text,
	fontSize = THEME.typography.fsBody,
	disableLineHeight = false,
	letterSpacing = THEME.typography.lsBody
}: TypographyProps): CSSObject => ({
	margin: 0,
	letterSpacing,
	fontSize,
	color,
	...(disableLineHeight
		? {}
		: {
				lineHeight
		  }),
	...(textAlign
		? {
				textAlign
		  }
		: {}),
	...(withBottomSpacing
		? {
				marginBottom: Spacing.default,
				display: 'block'
		  }
		: {})
})
