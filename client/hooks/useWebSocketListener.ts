import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { TWSActionEnum, TWSData } from '../api/types'
import {
	messageBroadcasted,
	messageRemoved,
	userJoined,
	userLeft,
	userRegistered,
	usersOnline
} from '../store/actions'
import { WS_PORT } from '../constants'

const ws = new WebSocket(`ws://localhost:${WS_PORT}`)

ws.onerror = function (_e): void {
	alert(
		`Trying to initialize websocket, but the dev server is not available. Please run "npm run start:server" and refresh the page"`
	)
}

export const useWebSocketListener = (): WebSocket => {
	const dispatch = useDispatch()

	useEffect(() => {
		ws.addEventListener('message', (event: WebSocketMessageEvent) => {
			try {
				const wsData: TWSData = JSON.parse(event.data)

				switch (wsData.type) {
					case TWSActionEnum.join:
						dispatch(userJoined(wsData))
						break
					case TWSActionEnum.register:
						dispatch(userRegistered(wsData))
						break
					case TWSActionEnum.messageBroadcasted:
						dispatch(messageBroadcasted(wsData))
						break
					case TWSActionEnum.messageRemoved:
						dispatch(messageRemoved(wsData))
						break
					case TWSActionEnum.online:
						dispatch(usersOnline(wsData))
						break
					case TWSActionEnum.leave:
						dispatch(userLeft(wsData))
						break
					default:
						console.warn(`${wsData.type} not handled`)
				}
			} catch (e) {
				alert('server has not started yet')
				return false
			}
		})

		return () => {
			ws.removeEventListener(
				'message',
				(event: WebSocketMessageEvent) => {
					console.log(event)
				}
			)
		}
	}, [ws])

	return ws
}
