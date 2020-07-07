import React, { FormEvent, useEffect, useState, useRef } from 'react'
import { Heading, InputStyled } from './styled'
import type { TWSData } from '../api/types'

type TWebSocketForm = {
	inputName: TWSData['type'],
	placeholder: string
	successCallback: (value: string) => void
	errorCallback?: () => void,
	dataToSend: WebSocketMessageEvent
}
export const WebSocketForm = ({
	inputName,
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

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		if (value.length > 0) {
			const valueTrimmed = value.trim()
			const wsData: TWSData = {
				type: inputName,
				value: valueTrimmed,
			}

			if (ws.current) {
				const wsDataString = JSON.stringify(wsData)
				ws.current.send(wsDataString)
				setValue('')
				successCallback(valueTrimmed)
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
				name={inputName}
				id={inputName}
				onChange={handleOnChange}
				placeholder={placeholder}
				value={value}
			/>
		</form>
	)
}
