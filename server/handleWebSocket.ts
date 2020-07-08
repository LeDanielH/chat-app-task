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

				// for the sake of type simplicity and consistent client api, I post once per every connection
				for (const onlineUser of connections) {
					const userData: TWSData = {
						id: onlineUser.id,
						type: TWSActionEnum.online,
						value: onlineUser.value,
						timestamp: onlineUser.timestamp,
					}
					const onlineUserString = JSON.stringify(userData);
					ws.send(onlineUserString)
				}

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
