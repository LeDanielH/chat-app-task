import React from 'react'
import { Modal } from './Modal'
import { ChatInput } from './ChatInput'
import { Image, SimpleWrapper } from '@householdjs/elements'
import { TWSActionEnum } from '../api/generated/types-common'
import { UNABLE_TO_REGISTER } from '../constants'

type TModalEnterUserName = {
	isVisible: boolean
}

export const ModalRegisterUser = ({ isVisible }: TModalEnterUserName) => {
	return (
		<Modal isVisible={isVisible}>
			<SimpleWrapper center sBottom>
				<Image src="https://toughbyte.s3.amazonaws.com/uploads/client/logo/40/pexip_logo.png" />
			</SimpleWrapper>
			<ChatInput
				wsType={TWSActionEnum.register}
				placeholder="John Doe"
				label={'Enter your name to join'}
				errorMessage={UNABLE_TO_REGISTER}
			/>
		</Modal>
	)
}
