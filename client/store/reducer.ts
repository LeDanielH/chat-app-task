import { TAction, TAppState } from './types'
import { removeAt, updateAt } from '../utils/arrayAt'

const initialState: TAppState = {
	messages: [],
	users: []
}

export const rootReducer = (
	state: TAppState = initialState,
	action: TAction
): TAppState => {
	switch (action.type) {
		case `MESSAGE_SENT`: {
			return {
				...state,
				messages: [...state.messages, action.payload]
			}
		}
		case `MESSAGE_RECEIVED`: {
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
				users: [action.payload, ...state.users]
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
				users: [...state.users, ...action.payload]
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
