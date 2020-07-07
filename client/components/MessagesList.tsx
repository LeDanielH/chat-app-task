import React from 'react'
import { List, ListItem } from './styled'
import { UserMessage } from './UserMessage'
import { useSelector } from 'react-redux'
import { TAppState } from '../store/types'
import { messagesSelector, TMessagesSelectorReturn } from '../store/selectors'

export const MessagesList = () => {
	const { messages } = useSelector((state: TAppState) => ({
		messages: messagesSelector(state)
	}))
	return (
		<List>
			{messages.map((post: TMessagesSelectorReturn) => (
				<ListItem
					key={`${post.username}-${post.timestamp}`}
					withBottomSpacing
				>
					<UserMessage
						name={post.username}
						timestamp={post.timestamp}
						message={post.value}
					/>
				</ListItem>
			))}
		</List>
	)
}
