import React from 'react'
import { List, ListItem } from './styled'
import { DUMMY_POSTS } from '../dummyData'
import { UserMessage } from './UserMessage'
import { TUserMessageDto } from '../api/types'

export const MessagesList = () => {
	return (
		<List>
			{DUMMY_POSTS.map((post: TUserMessageDto) => (
				<ListItem
					key={`${post.name}-${post.timestamp}`}
					withBottomSpacing
				>
					<UserMessage
						name={post.name}
						timestamp={post.timestamp}
						message={post.message}
					/>
				</ListItem>
			))}
		</List>
	)
}
