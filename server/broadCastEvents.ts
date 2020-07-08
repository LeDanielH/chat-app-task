import { WebSocket, WebSocketMessage } from './deps.ts'
import {TConnection} from "./types.ts";

type TBroadCastEventParams = {
	ws: WebSocket, event: WebSocketMessage, connections: Array<TConnection>
}

export function broadCastEvents({ ws, event, connections }: TBroadCastEventParams, toAll?: boolean) {
	for (const connection of connections) {
		if(toAll) {
			connection.ws.send(event)
		} else if (connection.ws != ws) {
			console.log({event})
			connection.ws.send(event)
		}
	}
}
