import styled, { CSSObject } from 'styled-components'
import { THEME } from '../../config/theme'
import { Spacing, withAfter, withTransition } from '@householdjs/utils'
import { position } from 'polished'

type TListItemProps = {
	withBorderBottom?: boolean
	height?: string
	withBottomSpacing?: boolean
	withHoverEffect?: boolean
}

export const ListItem = styled('li')<TListItemProps>(
	({
		withBorderBottom,
		height,
		withBottomSpacing,
		withHoverEffect
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
			  }),
		...(withHoverEffect
			? {
					position: 'relative',
					...withAfter({
						...position('absolute', 0),
						...withTransition(['transform']),
						transform: 'scaleX(0)',
						backgroundColor: THEME.colors.tabActive,
						transformOrigin: 'right',
						zIndex: 0
					}),
					'&:hover': {
						'&:after': {
							transform: 'scaleX(1)'
						}
					}
					// cursor: 'pointer'
			  }
			: {})
	})
)
