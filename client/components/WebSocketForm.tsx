import React, { FormEvent, useEffect, useState, useRef } from 'react'
import { Heading, InputStyled } from './styled'

type TWebSocketForm = {
	inputName: string
	placeholder: string
	successCallback: (value: string) => void
	errorCallback?: () => void
}
export const WebSocketForm = ({
	inputName,
	placeholder,
	successCallback,
	errorCallback
}: TWebSocketForm) => {
	const [message, setMessage] = useState<string>('')
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
		setMessage(e.target.value)
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		if (message.length > 0) {
			const messageTrimmed = message.trim()
			if (ws.current) {
				ws.current.send(messageTrimmed)
				setMessage('')
				successCallback(messageTrimmed)
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
				value={message}
			/>
		</form>
	)
}
