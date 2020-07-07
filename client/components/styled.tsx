import * as React from 'react'
import styled, { CSSObject } from 'styled-components'
import { padding, margin } from 'polished'

import {
	Spacing,
	multiplyStringValue,
	withTransition
} from '@householdjs/utils'

import { getRem, THEME } from '../config/theme'

export interface TypographyProps {
	textAlign?: 'left' | 'center' | 'right'
	withBottomSpacing?: boolean
	lineHeight?: string
	fontSize?: string
	color?: string
	disableLineHeight?: boolean
}

export const List = styled('ul')({
	...padding(0),
	...margin(0, 0, Spacing.default, 0),
	listStyle: 'none'
})

type TListItemProps = {
	withBorderBottom?: boolean
	height?: string
	withBottomSpacing?: boolean
}

export const ListItem = styled('li')<TListItemProps>(
	({
		withBorderBottom,
		height,
		withBottomSpacing
	}: TListItemProps): CSSObject => ({
		...(withBorderBottom
			? {
					borderBottom: `${THEME.sizes.borderWidth} solid ${THEME.colors.windowBackground}`
			  }
			: {}),
		...(height
			? {
					height,
					lineHeight: height
			  }
			: {}),
		...(withBottomSpacing
			? {
					marginBottom: Spacing.default
			  }
			: {
					marginBottom: 0
			  })
	})
)

export const getTypographyProps = ({
	textAlign,
	withBottomSpacing,
	lineHeight = multiplyStringValue(THEME.typography.fsBody, 1.5),
	color = THEME.colors.text,
	fontSize = THEME.typography.fsBody,
	disableLineHeight = false
}: TypographyProps): CSSObject => ({
	margin: 0,
	letterSpacing: getRem(1),
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

export const Heading = styled('h3')<TypographyProps>(
	(props: TypographyProps) => ({
		fontSize: THEME.typography.fsHeading,
		...getTypographyProps(props),
		fontFamily: THEME.typography.ffBody,
		fontWeight: THEME.typography.fwBold
	})
)

export const Paragraph = styled('p')<TypographyProps>(
	(props: TypographyProps): CSSObject => ({
		...getTypographyProps(props),
		fontFamily: THEME.typography.ffBody,
		fontWeight: THEME.typography.fwRegular
	})
)

export interface InputStyledInterface {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type TInputProps = InputStyledInterface & React.HTMLProps<HTMLInputElement>

export const InputStyled = styled.input.attrs({ type: 'text' })<TInputProps>({
	border: `${THEME.sizes.borderWidth} solid ${THEME.colors.windowBackground}`,
	outline: 0,
	height: THEME.sizes.inputHeight,
	lineHeight: THEME.sizes.inputHeight,
	fontSize: THEME.typography.fsBody,
	fontFamily: THEME.typography.ffBody,
	...padding(0, Spacing.default),
	boxSizing: 'border-box',
	width: '100%',
	...withTransition(['border']),
	'&:focus, &:hover': {
		border: `${THEME.sizes.borderWidth} solid ${THEME.colors.border}`,
		outline: 0
	}
})

export const ScrollContainer = styled('div')({
	maxHeight: '100vh',
	overflow: 'auto'
})
