import { Svg } from '@householdjs/ui'
import { THEME } from '../../config/theme'
import React from 'react'

type TIconEdit = {
	color?: string
	size?: number
}

const VIEW_BOX_SIZE = 24 // do not edit, extracted from original svg

export const IconBin = ({
	size = THEME.sizes.iconSvg,
	color = THEME.colors.text
}: TIconEdit) => (
	<Svg viewBoxSize={VIEW_BOX_SIZE} size={size}>
		<path d="M0 0h24v24H0V0z" fill="none" />
		<path
			fill={color}
			d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
		/>
	</Svg>
)
