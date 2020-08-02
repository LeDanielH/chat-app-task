import React from 'react'
import { Modal } from './Modal'
import { ChatInput } from './ChatInput'
import { Image, SimpleWrapper } from '@householdjs/elements'
import { TWSActionEnum } from '../api/generated/types-common'
import { UNABLE_TO_REGISTER } from '../constants'
import { useSelector } from 'react-redux'
import { TAppState } from '../store/types'
import { isRegisteredSelector } from '../store/selectors'

export const ModalRegisterUser = () => {
	const { isRegistered } = useSelector((state: TAppState) => ({
		isRegistered: isRegisteredSelector(state)
	}))

	return (
		<Modal isVisible={!isRegistered}>
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
