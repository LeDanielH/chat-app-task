import styled, { CSSObject } from 'styled-components'
import { THEME } from '../../config/theme'
import { getTypographyProps, TypographyProps } from './utils'

export const Paragraph = styled('p')<TypographyProps>(
	(props: TypographyProps): CSSObject => ({
		...getTypographyProps(props),
		fontFamily: THEME.typography.ffBody,
		fontWeight: THEME.typography.fwRegular
	})
)
