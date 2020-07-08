import React, { ReactNode } from 'react'
import Linkify, { Props as LinkifyProps } from 'react-linkify'

export const WithLink = ({
	children
}: Omit<LinkifyProps, 'componentDecorator'>) => {
	const componentDecorator = (
		decoratedHref: string,
		decoratedText: string,
		key: number
	): ReactNode => (
		<a href={decoratedHref} key={key} target="_blank">
			{decoratedText}
		</a>
	)

	return <Linkify componentDecorator={componentDecorator}>{children}</Linkify>
}
