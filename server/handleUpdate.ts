import { TConnection, TWSData } from './types.ts'
import { broadCastEvents } from './broadCastEvents.ts'
import { WebSocket } from './deps.ts'

export function handleUpdate(
	connections: Array<TConnection>,
	ws: WebSocket,
	data: TWSData
) {
	const timestamp = Date.now()
	const messageToUpdate: TWSData = {
		...data,
		updated: timestamp
	}

	const messageToUpdateString = JSON.stringify(messageToUpdate)
	broadCastEvents({ ws, event: messageToUpdateString, connections }, true)
}
