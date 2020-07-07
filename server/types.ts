import type { WebSocket } from './deps.ts'

export type TWSData = {
	type: 'register' | 'message'
	value: string,
}

export type TConnection = {
	value: TWSData['value'],
	ws: WebSocket
}

