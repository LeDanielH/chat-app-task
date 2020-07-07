import type { WebSocket } from './deps.ts'

export type TWSData = {
	id: string,
	type: 'register' | 'message' | 'join'
	value: string,
	timestamp: number,
}

export type TConnection = {
	id: string,
	value: TWSData['value'],
	ws: WebSocket,
	timestamp: TWSData['timestamp'],
}

