import { Svg } from '@householdjs/ui'
import { THEME } from '../../config/theme'
import React from 'react'

type TIconEdit = {
	color?: string
	size?: number
}

const VIEW_BOX_SIZE = 24 // do not edit, extracted from original svg

export const IconEdit = ({
	size = THEME.sizes.icon,
	color = THEME.colors.text
}: TIconEdit) => (
	<Svg viewBoxSize={VIEW_BOX_SIZE} size={size}>
		<path d="M0 0h24v24H0z" fill="none" />
		<path
			fill={color}
			d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
		/>
	</Svg>
)
