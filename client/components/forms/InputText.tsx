import React from 'react'
import { Label } from './Label'
import { TWSData } from '../../api/generated/types-common'
import { InputStyled } from '../styled/InputStyled'

type TInputText = {
	id: TWSData['type']
	placeholder: string
	label?: string
	isInEditMode?: boolean
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	value: string
}
export const InputText = ({
	id,
	placeholder,
	label,
	isInEditMode,
	onChange,
	value
}: TInputText) => {
	return (
		<>
			{label ? <Label>{label}</Label> : null}
			<InputStyled
				name={id}
				id={id}
				onChange={onChange}
				placeholder={placeholder}
				value={value}
				withParagraphStyles={isInEditMode}
			/>
		</>
	)
}
