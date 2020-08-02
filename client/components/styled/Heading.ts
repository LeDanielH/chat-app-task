import styled from 'styled-components'
import { THEME } from '../../config/theme'
import { getTypographyProps, TypographyProps } from './utils'

export const Heading = styled('h3')<TypographyProps>(
	(props: TypographyProps) => ({
		fontSize: THEME.typography.fsHeading,
		...getTypographyProps(props),
		fontFamily: THEME.typography.ffBody,
		fontWeight: THEME.typography.fwBold
	})
)
