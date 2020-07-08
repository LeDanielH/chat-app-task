import React from 'react'
import { UPDATED_AT, MESSAGE_REMOVED } from '../../constants'
import { CSSObject } from 'styled-components'
import { THEME } from '../../config/theme'
import { Paragraph } from '../styled'
import { WithLink } from '../WithLink'

type TUserMessageProps = {
	value: string
}

export const UserMessageContent = ({ value }: TUserMessageProps) => {
	const isRemovedMessage = value === MESSAGE_REMOVED

	if (isRemovedMessage) {
		return (
			<Paragraph color={THEME.colors.updatedAt}>
				<em>{value}</em>
			</Paragraph>
		)
	}

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
				<WithLink>{message}</WithLink>
				{'  '}
				<em style={emStyles}>{updatedAt}</em>
			</Paragraph>
		)
	} else {
		return (
			<Paragraph>
				<WithLink>{value}</WithLink>
			</Paragraph>
		)
	}
}
