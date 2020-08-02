import * as React from 'react'
import styled from 'styled-components'
import { THEME } from '../../config/theme'
import { padding } from 'polished'
import { Spacing, withTransition } from '@householdjs/utils'

export interface InputStyledInterface {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type TInputProps = InputStyledInterface &
	React.HTMLProps<HTMLInputElement> & {
		withParagraphStyles?: boolean
	}

export const InputStyled = styled.input.attrs({ type: 'text' })<TInputProps>(
	({ withParagraphStyles }: TInputProps) => ({
		border: `${THEME.sizes.borderWidth} solid ${THEME.colors.windowBackground}`,
		outline: 0,
		...(withParagraphStyles
			? {
					height: THEME.typography.lhBody,
					lineHeight: THEME.typography.lhBody
			  }
			: {
					height: THEME.sizes.inputHeight,
					lineHeight: THEME.sizes.inputHeight,
					...padding(0, Spacing.default)
			  }),

		fontSize: THEME.typography.fsBody,
		fontFamily: THEME.typography.ffBody,
		boxSizing: 'border-box',
		width: '100%',
		letterSpacing: THEME.typography.lsBody,
		...withTransition(['border']),
		'&:focus, &:hover': {
			border: `${THEME.sizes.borderWidth} solid ${THEME.colors.border}`,
			outline: 0
		}
	})
)
