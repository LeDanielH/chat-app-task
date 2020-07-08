import {TConnection, TWSData} from "./types.ts";
import {TWSActionEnum} from "./types.ts";
import {broadCastEvents} from "./broadCastEvents.ts";
import {WebSocket} from './deps.ts'

export function handleRegister(
	connections: Array<TConnection>,
	ws: WebSocket,
	data: TWSData
) {

	const timestamp = Date.now();
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

	const registeredUserString = JSON.stringify(registeredUserData);
	ws.send(registeredUserString) // registered

	// for the sake of type simplicity and consistent client api, I post once per every connection
	for (const onlineUser of connections) {
		const userData: TWSData = {
			id: onlineUser.id,
			type: TWSActionEnum.online,
			value: onlineUser.value,
			timestamp: onlineUser.timestamp,
		}
		const onlineUserString = JSON.stringify(userData);
		if(registeredUserData.id !== onlineUser.id) {
			ws.send(onlineUserString)
		}
	}

	const userJoinedData: TWSData = {
		id: `${timestamp}`, // TODO replace with uuid
		type: TWSActionEnum.join,
		value: data.value,
		timestamp,
	}
	const userJoinedEvent = JSON.stringify(userJoinedData);
	broadCastEvents(ws, userJoinedEvent, connections)
}
