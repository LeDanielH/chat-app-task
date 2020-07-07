import { isWebSocketCloseEvent, WebSocket } from './deps.ts'
import { broadCastEvents } from './broadCastEvents.ts'

export const handleWebSocket = (connections: Array<WebSocket>) => async(ws: WebSocket) => {
	console.log('websocket connection established')
	connections.push(ws)

	for await (const event of ws) {
		const isCloseEvent = isWebSocketCloseEvent(event)
		if (typeof event === 'string') {
			broadCastEvents(ws, event, connections)
		}

		if (isCloseEvent) {
			console.log('websocket connection closed')
		}
		console.log(event)
	}
}
