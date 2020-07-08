import { TWSData } from '../api/types'

export type TMessageUpdatePayload = { data: TWSData; index: number }

export type TAction =
	| { type: 'USER_JOINED'; payload: TWSData }
	| { type: 'USERS_ONLINE'; payload: Array<TWSData> }
	| { type: 'USER_REGISTERED'; payload: TWSData }
	| { type: 'USER_LEFT'; payload: number }
	| { type: 'MESSAGE_RECEIVED'; payload: TWSData }
	| { type: 'MESSAGE_SENT'; payload: TWSData }
	| { type: 'MESSAGE_UPDATED'; payload: TMessageUpdatePayload }

export interface TAppState {
	messages: Array<TWSData>
	users: Array<TWSData>
}
