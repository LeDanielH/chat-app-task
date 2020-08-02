import { TWSActionEnum, TWSData } from './types/types-common.ts'
import { TConnection } from './types/types-deno.ts'
import { broadCastEvents } from './broadCastEvents.ts'
import { WebSocket } from './deps.ts'

export function handleWebSocketClose(
	ws: WebSocket,
	connections: TConnection[]
) {
	const currentConnectionIndex = connections.findIndex(
		(connection: TConnection) => connection.ws === ws
	)

	if (currentConnectionIndex > -1) {
		const leaveEvent: TWSData = {
			timestamp: connections[currentConnectionIndex].timestamp,
			type: TWSActionEnum.leave,
			value: connections[currentConnectionIndex].value,
			id: connections[currentConnectionIndex].id
		}

		const leaveEventString = JSON.stringify(leaveEvent)

		broadCastEvents({ ws, event: leaveEventString, connections })
		connections.splice(currentConnectionIndex, 1)
	}
}
