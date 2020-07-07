export type TUserMessageDto = {
	name: string
	timestamp: number // ms
	message: string
}

export enum TWSActionType {
	message = 'message',
	register = 'register',
	join = 'join',
	leave = 'leave',
}

export type TWSData = {
	id: string, // users and its messages will be matched by id
	type: TWSActionType,
	value: string,
	timestamp: number, // message to be edited will be matched by timestamp and first user
}
