import React from 'react'
import { Heading } from '../styled/Heading'

type TLabelProps = {
	children: string
}

export const Label = ({ children }: TLabelProps) => {
	return (
		<Heading as="label" withBottomSpacing>
			{children}
		</Heading>
	)
}
