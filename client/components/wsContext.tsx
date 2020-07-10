import React, { createContext, ReactNode, useRef, useState } from 'react'
import { useWebSocketMessageListener } from '../hooks/useWebSocketMessageListener'
import { WS_PORT } from '../constants'

type TWsContext = {
	ws?: WebSocket
	isWsEnabled: boolean
}
const WebSocketContext = createContext<TWsContext>({
	ws: undefined,
	isWsEnabled: false
})

export { WebSocketContext }

type TWebScoketProvider = {
	children: ReactNode
}

export const WebSocketProvider = ({ children }: TWebScoketProvider) => {
	const webSocket = new WebSocket(`ws://localhost:${WS_PORT}`)
	const [isWsEnabled, toggleWs] = useState<boolean>(true)

	const webSocketRef = useRef(webSocket)

	webSocketRef.current.onerror = function (_e: Event) {
		toggleWs(false)
	}

	webSocketRef.current.onclose = function () {
		toggleWs(false)
	}

	const ws = useWebSocketMessageListener(webSocketRef.current)

	return (
		<WebSocketContext.Provider
			value={{
				ws,
				isWsEnabled
			}}
		>
			{children}
		</WebSocketContext.Provider>
	)
}
