import React, { FormEvent, useContext, useState } from 'react'
import { TWSData } from '../api/generated/types-common'
import { useSelector } from 'react-redux'
import { TAppState } from '../store/types'
import { registeredUserIdState } from '../store/selectors'
import { WebSocketContext } from './wsContext'
import { Form } from './forms/Form'
import { InputText } from './forms/InputText'
import { CANNOT_BE_EMPTY, SERVER_NOT_AVAILABLE } from '../constants'

type TForm = {
	wsType: TWSData['type']
	placeholder: string
	successCallback?: (value: TWSData) => void
	errorCallback?: () => void
	label?: string
	isInEditMode?: boolean
	initialValue?: string
	extraData?: Partial<TWSData>
	errorMessage?: string
}
export const ChatInput = ({
	wsType,
	placeholder,
	successCallback,
	errorCallback,
	label,
	isInEditMode,
	initialValue = '',
	extraData,
	errorMessage = SERVER_NOT_AVAILABLE
}: TForm) => {
	const { ws, isWsEnabled } = useContext(WebSocketContext)
	const [value, setValue] = useState<string>(initialValue)

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setValue(e.target.value)
	}

	const { registeredUserId } = useSelector((state: TAppState) => ({
		registeredUserId: registeredUserIdState(state)
	}))

	const onSubmitError = (): void => {
		alert(errorMessage)

		if (errorCallback) {
			errorCallback()
		}
	}

	const getWsData = (): TWSData => {
		const valueTrimmed = value.trim()
		const timestamp = Date.now()
		return {
			id: registeredUserId,
			type: wsType,
			value: valueTrimmed,
			timestamp,
			...extraData
		}
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		if (value.length > 0) {
			if (ws && isWsEnabled) {
				const wsData = getWsData()
				const wsDataString = JSON.stringify(wsData)
				ws.send(wsDataString)
				setValue('')
				if (successCallback) {
					successCallback(wsData)
				}
			} else {
				onSubmitError()
			}
		} else {
			alert(CANNOT_BE_EMPTY)
		}
		e.preventDefault()
	}

	return (
		<Form onSubmit={onSubmit}>
			<InputText
				label={label}
				onChange={handleOnChange}
				value={value}
				id={wsType}
				placeholder={placeholder}
				isInEditMode={isInEditMode}
			/>
		</Form>
	)
}
