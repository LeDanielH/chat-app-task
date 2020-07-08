import { isWebSocketCloseEvent, WebSocket} from './deps.ts'
import {broadCastEvents} from './broadCastEvents.ts'
import {TConnection, TWSActionEnum, TWSData} from "./types.ts";
import { handleRegister } from "./handleRegister.ts";

export const handleWebSocket = (connections: Array<TConnection>) => async(ws: WebSocket) => {
	console.log('websocket connection established')

	for await (const event of ws) {
		const isCloseEvent = isWebSocketCloseEvent(event)
		if (typeof event === 'string') {
			const data: TWSData = JSON.parse(event)

			if(data.type === TWSActionEnum.register) {
				handleRegister(connections, ws, data)
			} else {
				broadCastEvents(ws, event, connections)
			}
		}

		if (isCloseEvent) {
			console.log('websocket connection closed')
		}
		console.log(event)
	}
}
