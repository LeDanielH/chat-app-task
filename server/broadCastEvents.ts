import { WebSocket, WebSocketMessage } from './deps.ts'
import {TConnection} from "./types.ts";

export function broadCastEvents(ws: WebSocket, event: WebSocketMessage, connections: Array<TConnection>) {
	for (const connection of connections) {
		if (connection.ws != ws) {
			connection.ws.send(event)
		}
	}
}