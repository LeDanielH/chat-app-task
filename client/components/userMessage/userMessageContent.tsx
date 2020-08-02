import React from 'react'
import { MESSAGE_REMOVED, UPDATED_AT } from '../../constants'
import { CSSObject } from 'styled-components'
import { THEME } from '../../config/theme'
import { WithLink } from '../WithLink'
import { getPrettyTime } from '../../utils/getPretty'
import { Paragraph } from '../styled/Paragraph'

type TUserMessageProps = {
	value: string
	updatedAt?: number
}

export const UserMessageContent = ({ value, updatedAt }: TUserMessageProps) => {
	const isRemovedMessage = value === MESSAGE_REMOVED

	if (isRemovedMessage) {
		return (
			<Paragraph color={THEME.colors.updatedAt}>
				<em>{value}</em>
			</Paragraph>
		)
	}

	if (updatedAt) {
		const dateTimePretty = getPrettyTime(updatedAt)
		const emStyles: CSSObject = {
			color: THEME.colors.updatedAt,
			fontSize: THEME.typography.fsUpdatedAt
		}

		return (
			<Paragraph>
				<WithLink>{value}</WithLink>
				{'  '}
				<em style={emStyles}>({`${UPDATED_AT} ${dateTimePretty}`})</em>
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
