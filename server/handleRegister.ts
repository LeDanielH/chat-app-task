import {TConnection, TWSData} from "./types.ts";
import {TWSActionEnum} from "./types.ts";
import {broadCastEvents} from "./broadCastEvents.ts";
import {v4, WebSocket} from './deps.ts'

export function handleRegister(
	connections: Array<TConnection>,
	ws: WebSocket,
	data: TWSData
) {

	const timestamp = Date.now();
	const registeredUserId = v4.generate();

	/* REGISTER USER */
	const registeredUserConnection: TConnection = {
		id: registeredUserId,
		value: data.value,
		ws,
		timestamp,
	}

	const registeredUserData: TWSData = {
		id: registeredUserConnection.id,
		type: data.type,
		value: registeredUserConnection.value,
		timestamp: registeredUserConnection.timestamp,
	}

	const registeredUserString = JSON.stringify(registeredUserData);
	ws.send(registeredUserString) // registered

	/* SEND ONLINE USERS */
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

	/* TRIGGER USER JOINED */
	const userJoinedData: TWSData = {
		id: registeredUserData.id, // TODO replace with uuid
		type: TWSActionEnum.join,
		value: registeredUserData.value,
		timestamp: registeredUserData.timestamp,
	}
	const userJoinedEvent = JSON.stringify(userJoinedData);
	broadCastEvents(ws, userJoinedEvent, connections)
}
