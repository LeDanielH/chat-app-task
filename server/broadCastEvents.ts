import { WebSocket, WebSocketMessage } from './deps.ts'
import { TConnection } from './types/types-deno.ts'

type TBroadCastEventParams = {
	ws: WebSocket
	event: WebSocketMessage
	connections: Array<TConnection>
}

export function broadCastEvents(
	{ ws, event, connections }: TBroadCastEventParams,
	toAll?: boolean
) {
	for (const connection of connections) {
		if (toAll) {
			connection.ws.send(event)
		} else if (connection.ws != ws) {
			connection.ws.send(event)
		}
	}
}
