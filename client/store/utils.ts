import { TAppState, TMessage } from './types'
import { TWSData } from '../api/generated/types-common'

export const getMessageWithUsername = (
	users: TAppState['users'],
	message: TWSData
) => {
	const user = users.find((user: TWSData) => user.id === message.id)
	const username = user ? user.value : 'unknown'
	return {
		...message,
		username
	}
}

export const getMessageToBeUpdatedIndex = (
	messages: TAppState['messages'],
	wsData: TWSData
) => {
	return messages.findIndex((message: TMessage) => {
		const isSameUser = message.id === wsData.id
		const isSameTimestamp = message.timestamp === wsData.timestamp
		return isSameUser && isSameTimestamp
	})
}
