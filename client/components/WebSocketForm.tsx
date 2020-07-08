import React, { FormEvent, useState } from 'react'
import { Heading, InputStyled } from './styled'
import { TWSData } from '../api/types'
import { getTime } from 'date-fns'
import { useSelector } from 'react-redux'
import { TAppState } from '../store/types'
import { registeredUserIdState } from '../store/selectors'

type TWebSocketForm = {
	wsType: TWSData['type']
	placeholder: string
	successCallback?: (value: TWSData) => void
	errorCallback?: () => void
	ws: WebSocket
	label?: string
	isInEditMode?: boolean
}
export const WebSocketForm = ({
	wsType,
	placeholder,
	successCallback,
	errorCallback,
	ws,
	label,
	isInEditMode
}: TWebSocketForm) => {
	const [value, setValue] = useState<string>('')

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const { registeredUserId } = useSelector((state: TAppState) => ({
		registeredUserId: registeredUserIdState(state)
	}))

	const onSubmitError = (message: string | ErrorEvent) => {
		if (errorCallback) {
			errorCallback()
		}
		console.error(message)
	}

	const tryToSendValue = (ws: WebSocket, wsData: TWSData) => {
		try {
			const wsDataString = JSON.stringify(wsData)
			ws.send(wsDataString)
			setValue('')
			if (successCallback) {
				successCallback(wsData)
			}
		} catch (error) {
			onSubmitError(error)
		}
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		if (value.length > 0) {
			const valueTrimmed = value.trim()
			const timestamp = getTime(Date.now())
			const wsData: TWSData = {
				id: registeredUserId,
				type: wsType,
				value: valueTrimmed,
				timestamp
			}
			if (ws) {
				tryToSendValue(ws, wsData)
			} else {
				onSubmitError('websocket is not initialized')
			}
		} else {
			alert('input cannot be empty')
		}
		e.preventDefault()
	}

	return (
		<form onSubmit={onSubmit}>
			{label ? (
				<Heading as="label" withBottomSpacing>
					{label}
				</Heading>
			) : null}
			<InputStyled
				type="text"
				name={wsType}
				id={wsType}
				onChange={handleOnChange}
				placeholder={placeholder}
				value={value}
				isLikePara={isInEditMode}
			/>
		</form>
	)
}
