import type { WebSocket } from '../deps.ts'
import type { TWSData } from './types-common.ts'

export type TConnection = {
	id: string
	value: TWSData['value']
	ws: WebSocket
	timestamp: TWSData['timestamp']
}
