import React, { FormEvent, useEffect, useState, useRef } from 'react'
import { Heading, InputStyled } from './styled'
import { TWSData } from '../api/types'

type TWebSocketForm = {
	wsType: TWSData['type'],
	placeholder: string
	successCallback: (value: TWSData) => void
	errorCallback?: () => void,
}
export const WebSocketForm = ({
	wsType,
	placeholder,
	successCallback,
	errorCallback
}: TWebSocketForm) => {
	const [value, setValue] = useState<string>('')
	const ws = useRef<WebSocket>()

	useEffect(() => {
		ws.current = new WebSocket('ws://localhost:1234')
		ws.current.addEventListener(
			'message',
			(event: WebSocketMessageEvent) => {
				console.log(event.data)
			}
		)

		return () => {
			if (ws.current) {
				ws.current.removeEventListener('message', (event: any) => {
					console.log(event)
				})
				ws.current = undefined
			}
		}
	}, [ws])

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const tryToSendValue = (ws: WebSocket, wsData: TWSData) => {

		try {
			const wsDataString = JSON.stringify(wsData)
			ws.send(wsDataString)
			setValue('')
			successCallback(wsData)
		} catch (error) {
			// TODO add error handling
			console.log(error) // catch error
		}
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		if (value.length > 0) {
			const valueTrimmed = value.trim()
			const wsData: TWSData = {
				type: wsType,
				value: valueTrimmed,
			}
			if (ws.current) {
				tryToSendValue(ws.current, wsData);
			} else {
				if (errorCallback) {
					errorCallback()
				}
				console.error('websocket is not initialized')
			}
		} else {
			alert('input cannot be empty')
		}
		e.preventDefault()
	}

	return (
		<form onSubmit={onSubmit}>
			<Heading as="label" withBottomSpacing>
				Enter your name
			</Heading>
			<InputStyled
				type="text"
				name={wsType}
				id={wsType}
				onChange={handleOnChange}
				placeholder={placeholder}
				value={value}
			/>
		</form>
	)
}
