import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { TWSActionEnum, TWSData } from '../api/types'
import {
	messageBroadcasted,
	userJoined,
	userLeft,
	userRegistered,
	usersOnline
} from '../store/actions'

export const useWebSocketListener = (): WebSocket => {
	const dispatch = useDispatch()

	const ws = new WebSocket('ws://localhost:1234')
	useEffect(() => {
		ws.addEventListener('message', (event: WebSocketMessageEvent) => {
			try {
				// getting usersOnline as list -> wanted to update store once
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
