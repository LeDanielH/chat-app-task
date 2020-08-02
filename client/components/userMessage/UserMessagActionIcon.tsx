import React, { ReactNode } from 'react'
import { FlexChild } from '@householdjs/elements'
import { Spacing } from '@householdjs/utils'
import { Scaler } from '../styled'

type TActionIcon = {
	children: ReactNode
	onClick: () => void
}

export const ActionIcon = ({ children, onClick }: TActionIcon) => {
	return (
		<FlexChild sHorizontal={Spacing.small} withPointer onClick={onClick}>
			<Scaler>{children}</Scaler>
		</FlexChild>
	)
}
