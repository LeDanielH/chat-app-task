import React from 'react'
import { List, ListItem } from './styled'
import { UserMessage } from './UserMessage'
import { useSelector } from 'react-redux'
import { TAppState } from '../store/types'
import { messagesState } from '../store/selectors'
import { TMessage } from '../store/types'

export const MessagesList = () => {
	const { messages } = useSelector((state: TAppState) => ({
		messages: messagesState(state)
	}))
	return (
		<List>
			{messages.map((post: TMessage) => (
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
