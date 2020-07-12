import type { WebSocket } from './deps.ts'

export enum TWSActionEnum {
	messageBroadcasted = 'messageBroadcasted',
	register = 'register',
	join = 'join',
	leave = 'leave',
	online = 'online',
	messageRemoved = 'messageRemoved',
	messageUpdated = 'messageUpdated',
}

export type TWSData = {
	id: string // users and its messages will be matched by id
	type: TWSActionEnum
	value: string
	timestamp: number
	updated?: number
}

export type TConnection = {
	id: string
	value: TWSData['value']
	ws: WebSocket
	timestamp: TWSData['timestamp']
}
