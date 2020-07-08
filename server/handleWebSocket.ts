import {isWebSocketCloseEvent, WebSocket} from './deps.ts'
import {broadCastEvents} from './broadCastEvents.ts'
import {TConnection, TWSActionEnum, TWSData} from "./types.ts";
import {handleRegister} from "./handleRegister.ts";
import { removeAt } from "./utils.ts";

export const handleWebSocket = (connections: Array<TConnection>) => async(ws: WebSocket) => {
	for await (const event of ws) {
		if (typeof event === 'string') {
			const data: TWSData = JSON.parse(event)

			if(data.type === TWSActionEnum.register) {
				handleRegister(connections, ws, data)
			} else {
				broadCastEvents(ws, event, connections)
			}
		}

		const isCloseEvent = isWebSocketCloseEvent(event)

		if (isCloseEvent) {
			const currentConnectionIndex = connections.findIndex((connection : TConnection) => connection.ws === ws);

			if(currentConnectionIndex > -1) {
				const leaveEvent: TWSData = {
					timestamp: connections[currentConnectionIndex].timestamp,
					type: TWSActionEnum.leave,
					value: connections[currentConnectionIndex].value,
					id: connections[currentConnectionIndex].id,
				}

				const leaveEventString = JSON.stringify(leaveEvent);

				broadCastEvents(ws, leaveEventString, connections)
				connections.splice(currentConnectionIndex, 1)
			}

		}
	}
}
