export type TUserMessageDto = {
	name: string
	timestamp: number // ms
	message: string
}

export enum TWSActionType {
	message = 'message',
	register = 'register',
	join = 'join'
}

export type TWSData = {
	id: string,
	type: TWSActionType,
	value: string,
	timestamp: number,
}
