import { TAction, TAppState, TMessage } from './types'
import { removeAt, updateAt } from '../utils/arrayAt'
import { TWSActionEnum, TWSData } from '../api/generated/types-common'
import { MEETING_BOT, CLIENT_PORT } from '../constants'

const meetingBot: TWSData = {
	id: MEETING_BOT,
	value: MEETING_BOT,
	timestamp: Date.now(),
	type: TWSActionEnum.online
}

const meetingBotMessage: TMessage = {
	id: meetingBot.id,
	value: `To add more users, click on http://localhost:${CLIENT_PORT}`,
	timestamp: meetingBot.timestamp,
	type: TWSActionEnum.messageBroadcasted,
	username: MEETING_BOT
}

const initialState: TAppState = {
	messages: [meetingBotMessage],
	users: [meetingBot],
	registeredUserId: ''
}

export const rootReducer = (
	state: TAppState = initialState,
	action: TAction
): TAppState => {
	switch (action.type) {
		case `MESSAGE_BROADCASTED`: {
			return {
				...state,
				messages: [...state.messages, action.payload]
			}
		}
		case `MESSAGE_UPDATED`: {
			return {
				...state,
				messages: updateAt(
					state.messages,
					action.payload.data,
					action.payload.index
				)
			}
		}
		case `USER_REGISTERED`: {
			return {
				...state,
				users: [...state.users, action.payload],
				registeredUserId: action.payload.id
			}
		}
		case `USER_JOINED`: {
			return {
				...state,
				users: [...state.users, action.payload]
			}
		}

		case 'USERS_ONLINE': {
			return {
				...state,
				users: [...state.users, action.payload]
			}
		}

		case 'USER_LEFT': {
			return {
				...state,
				users: removeAt(state.users, action.payload)
			}
		}
		default:
			return state
	}
}
