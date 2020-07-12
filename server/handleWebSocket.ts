import { isWebSocketCloseEvent, WebSocket } from './deps.ts'
import { broadCastEvents } from './broadCastEvents.ts'
import { TConnection, TWSActionEnum, TWSData } from './types.ts'
import { handleRegister } from './handleRegister.ts'
import { handleWebSocketClose } from './handleWebSocketClose.ts'
import { handleUpdate } from "./handleUpdate.ts";

export const handleWebSocket = (connections: Array<TConnection>) => async (
	ws: WebSocket
) => {
	for await (const event of ws) {
		if (typeof event === 'string') {
			const data: TWSData = JSON.parse(event)

			switch (data.type) {
				case TWSActionEnum.register:
					handleRegister(connections, ws, data)
					break
				case TWSActionEnum.messageBroadcasted:
					broadCastEvents({ ws, event, connections }, true)
					break;
				case TWSActionEnum.messageRemoved:
					broadCastEvents({ ws, event, connections }, true)
					break;
				case TWSActionEnum.messageUpdated:
					handleUpdate(connections, ws, data)
					break;
				default:
					broadCastEvents({ ws, event, connections })
			}
		}

		const isCloseEvent = isWebSocketCloseEvent(event)

		if (isCloseEvent) {
			handleWebSocketClose(ws, connections)
		}
	}
}
