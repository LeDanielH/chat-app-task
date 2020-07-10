import React, { FormEvent, useContext, useState } from 'react'
import { Heading, InputStyled } from './styled'
import { TWSActionEnum, TWSData } from '../api/types'
import { useSelector } from 'react-redux'
import { TAppState } from '../store/types'
import { registeredUserIdState } from '../store/selectors'
import { WebSocketContext } from './wsContext'
import {
	CANNOT_BE_EMPTY,
	SERVER_NOT_AVAILABLE,
	UNABLE_TO_REGISTER,
	UNABLE_TO_SEMD
} from '../constants'

type TForm = {
	wsType: TWSData['type']
	placeholder: string
	successCallback?: (value: TWSData) => void
	errorCallback?: () => void
	label?: string
	isInEditMode?: boolean
	initialValue?: string
	extraData?: Partial<TWSData>
}
export const Form = ({
	wsType,
	placeholder,
	successCallback,
	errorCallback,
	label,
	isInEditMode,
	initialValue = '',
	extraData
}: TForm) => {
	const { ws, isWsEnabled } = useContext(WebSocketContext)
	const [value, setValue] = useState<string>(initialValue)

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setValue(e.target.value)
	}

	const { registeredUserId } = useSelector((state: TAppState) => ({
		registeredUserId: registeredUserIdState(state)
	}))

	const getErrorMessage = (): string => {
		if (wsType === TWSActionEnum.messageBroadcasted) {
			return UNABLE_TO_SEMD
		} else if (wsType === TWSActionEnum.register) {
			return UNABLE_TO_REGISTER
		} else {
			return SERVER_NOT_AVAILABLE
		}
	}

	const onSubmitError = (): void => {
		let message = getErrorMessage()

		alert(message)

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
		<form onSubmit={onSubmit}>
			{label ? (
				<Heading as="label" withBottomSpacing>
					{label}
				</Heading>
			) : null}
			<InputStyled
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
