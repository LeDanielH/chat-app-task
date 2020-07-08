import {dateFns, isWebSocketCloseEvent, WebSocket} from './deps.ts'
import {broadCastEvents} from './broadCastEvents.ts'
import {TConnection, TWSActionEnum, TWSData} from "./types.ts";

export const handleWebSocket = (connections: Array<TConnection>) => async(ws: WebSocket) => {
	console.log('websocket connection established')

	for await (const event of ws) {
		const isCloseEvent = isWebSocketCloseEvent(event)
		if (typeof event === 'string') {
			const data: TWSData = JSON.parse(event)
			const timestamp = dateFns.getTime(Date.now());

			if(data.type === TWSActionEnum.register) {
				const registeredUserConnection: TConnection = {
					id: `${timestamp}`, // TODO replace with uuid
					value: data.value,
					ws,
					timestamp,
				}

				connections.push(registeredUserConnection)

				const registeredUserData: TWSData = {
					id: `${timestamp}`, // TODO replace with uuid,
					type: data.type,
					value: data.value,
					timestamp,
				}

				const onlineUsers: Array<TWSData> = connections.map((connection: TConnection) => ({
					id: connection.id,
					type: TWSActionEnum.online,
					value: connection.value,
					timestamp: connection.timestamp,
				}))

				const onlineUsersString = JSON.stringify(onlineUsers);
				ws.send(onlineUsersString)

				const registeredUserString = JSON.stringify(registeredUserData);
				ws.send(registeredUserString) // registered

				const userJoinedData: TWSData = {
					id: `${timestamp}`, // TODO replace with uuid
					type: TWSActionEnum.join,
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
