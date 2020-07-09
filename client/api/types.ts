export enum TWSActionEnum {
	messageBroadcasted = 'messageBroadcasted',
	messageRemoved = 'messageRemoved',
	register = 'register',
	join = 'join',
	leave = 'leave',
	online = 'online'
}

export type TWSData = {
	id: string // users and its messages will be matched by id
	type: TWSActionEnum
	value: string
	timestamp: number
}
