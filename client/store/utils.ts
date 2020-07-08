import { TAppState } from './types'
import { TWSData } from '../api/types'
import { MEETING_BOT } from '../constants'

export const getMessageWithUsername = (
	users: TAppState['users'],
	message: TWSData
) => {
	const user = users.find((user: TWSData) => user.id === message.id)

	const isMeetingBot = message.id.startsWith(MEETING_BOT)

	const username = user ? user.value : isMeetingBot ? MEETING_BOT : 'unknown'
	return {
		...message,
		username
	}
}
