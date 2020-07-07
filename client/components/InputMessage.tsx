import React, { FormEvent, useState } from 'react'
import { InputStyled } from './styled'
import { Spacer } from '@householdjs/elements'
import { THEME } from '../config/theme'

const INPUT_NAME = 'message'

export const InputMessage = () => {
	const [message, setMessage] = useState<string>('')

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value)
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		if (message.length > 0) {
			const messageTrimmed = message.trim()
			console.log(e, messageTrimmed, 'message submitted')
			setMessage('')
		} else {
			alert('cannot submit empty message')
		}
		e.preventDefault()
	}

	return (
		<Spacer right={THEME.sizes.tabChatRightSpacingCompensation}>
			<form onSubmit={onSubmit}>
				<InputStyled
					type="text"
					name={INPUT_NAME}
					id={INPUT_NAME}
					onChange={handleOnChange}
					placeholder="enter your message"
					value={message}
				/>
			</form>
		</Spacer>
	)
}
