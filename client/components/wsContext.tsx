import React, { createContext, ReactNode } from 'react'
import { useWebSocket } from '../hooks/useWebSocket'
import { WS_PORT } from '../constants'

const webSocket = new WebSocket(`ws://localhost:${WS_PORT}`)

webSocket.onerror = function (_e): void {
	alert(
		`Trying to initialize websocket, but the dev server is not available. Please run "npm run start:server" and refresh the page"`
	)
}

const WebSocketContext = createContext(webSocket)

export { WebSocketContext }

type TWebScoketProvider = {
	children: ReactNode,
}

export const WebSocketProvider = ({ children }: TWebScoketProvider) => {
	const ws = useWebSocket(webSocket)

	return (
		<WebSocketContext.Provider value={ws}>
			{children}
		</WebSocketContext.Provider>
	)
}
