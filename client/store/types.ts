import { TWSData } from '../api/types'

export type TMessage = TWSData & {
	username: string,
}

export type TMessageUpdatePayload = {
	data: TWSData
	index: number
}

export type TAction =
	| { type: 'USER_JOINED'; payload: TWSData }
	| { type: 'USERS_ONLINE'; payload: TWSData }
	| { type: 'USER_REGISTERED'; payload: TWSData }
	| { type: 'USER_LEFT'; payload: number }
	| { type: 'MESSAGE_BROADCASTED'; payload: TMessage }
	| { type: 'MESSAGE_UPDATED'; payload: TMessageUpdatePayload }

export interface TAppState {
	messages: Array<TMessage>
	users: Array<TWSData>
	registeredUserId: string
}
