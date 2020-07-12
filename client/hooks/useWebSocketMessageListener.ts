import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { TWSActionEnum, TWSData } from '../api/types'
import {
	messageBroadcasted,
	messageRemoved,
	userJoined,
	userLeft,
	userRegistered,
	usersOnline,
	messageUpdated
} from '../store/actions'

export const useWebSocketMessageListener = (ws: WebSocket): WebSocket => {
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
					case TWSActionEnum.messageUpdated:
						dispatch(messageUpdated(wsData))
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
