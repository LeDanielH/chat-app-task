import React  from 'react'
import { UPDATED_AT } from '../../constants'
import { CSSObject } from 'styled-components'
import { THEME } from '../../config/theme'
import { Paragraph } from '../styled'

type TUserMessageProps = {
	value: string
}

export const UserMessageContent = ({ value }: TUserMessageProps) => {
	const indexOfUpdated = value.indexOf(UPDATED_AT)
	const isUpdatedMessage = indexOfUpdated > -1

	if (isUpdatedMessage) {
		const message = value.substring(0, indexOfUpdated)
		const updatedAt = value.substring(message.length, value.length)
		const emStyles: CSSObject = {
			color: THEME.colors.updatedAt,
			fontSize: THEME.typography.fsUpdatedAt
		}

		return (
			<Paragraph>
				{message}
				{'  '}
				<em style={emStyles}>{updatedAt}</em>
			</Paragraph>
		)
	} else {
		return <Paragraph>{value}</Paragraph>
	}

}
