import {isWebSocketCloseEvent, WebSocket} from './deps.ts'
import {broadCastEvents} from './broadCastEvents.ts'
import {TConnection, TWSActionEnum, TWSData} from "./types.ts";
import {handleRegister} from "./handleRegister.ts";
import {handleWebSocketClose} from "./handleWebSocketClose.ts";

export const handleWebSocket = (connections: Array<TConnection>) => async(ws: WebSocket) => {
	for await (const event of ws) {
		if (typeof event === 'string') {
			const data: TWSData = JSON.parse(event)

			if(data.type === TWSActionEnum.register) {
				handleRegister(connections, ws, data)
			} else if(data.type === TWSActionEnum.messageBroadcasted) {
				console.log('messageBroadcasted')
				broadCastEvents({ws, event, connections}, true)
			} else if (TWSActionEnum.messageRemoved) {
				broadCastEvents({ws, event, connections}, true)
			} else {
				broadCastEvents({ws, event, connections})
			}
		}

		const isCloseEvent = isWebSocketCloseEvent(event)

		if (isCloseEvent) {
			handleWebSocketClose(ws, connections)
		}
	}
}
