import React from 'react'
import { UserMessage } from './userMessage/UserMessage'
import { useSelector } from 'react-redux'
import { TAppState } from '../store/types'
import { messagesState } from '../store/selectors'
import { TMessage } from '../store/types'
import { List } from './styled/List'
import { ListItem } from './styled/ListItem'

export const MessagesList = () => {
	const { messages } = useSelector((state: TAppState) => ({
		messages: messagesState(state)
	}))
	return (
		<List>
			{messages.map((post: TMessage) => (
				<ListItem
					key={`${post.id}-${post.timestamp}`}
					withBottomSpacing
				>
					<UserMessage {...post} />
				</ListItem>
			))}
		</List>
	)
}
