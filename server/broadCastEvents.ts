import { WebSocket, WebSocketMessage } from './deps.ts'

export function broadCastEvents(ws: WebSocket, event: WebSocketMessage, connections: Array<WebSocket>) {
	for (const connection of connections) {
		if (connection != ws) {
			connection.send(event)
		}
	}
}
