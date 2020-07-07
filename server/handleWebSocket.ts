import { isWebSocketCloseEvent, WebSocket, dateFns } from './deps.ts'
import { broadCastEvents } from './broadCastEvents.ts'
import { TConnection, TWSData } from "./types.ts";

export const handleWebSocket = (connections: Array<TConnection>) => async(ws: WebSocket) => {
	console.log('websocket connection established')

	for await (const event of ws) {
		const isCloseEvent = isWebSocketCloseEvent(event)
		if (typeof event === 'string') {
			const data: TWSData = JSON.parse(event)
			const timestamp = dateFns.getTime(Date.now());

			if(data.type === 'register') {
				connections.push({
					id: `${timestamp}`, // TODO replace with uuid
					value: data.value,
					ws,
					timestamp,
				})
				ws.send(`${data.value} you are registered`)
				const userJoinedData: TWSData = {
					id: `${timestamp}`, // TODO replace with uuid
					type: 'join',
					value: data.value,
					timestamp,
				}
				const userJoinedEvent = JSON.stringify(userJoinedData);
				broadCastEvents(ws, userJoinedEvent, connections)

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
