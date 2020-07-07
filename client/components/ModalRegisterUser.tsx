import React from 'react'
import { Modal } from './Modal'
import { WebSocketForm } from './WebSocketForm'
import { Image, SimpleWrapper } from '@householdjs/elements'
import { TWSActionType, TWSData } from '../api/types'

type TModalEnterUserName = {
	isVisible: boolean
	onSubmitCallback: (isRegistered: boolean) => void
}

export const ModalRegisterUser = ({
	onSubmitCallback,
	isVisible
}: TModalEnterUserName) => {
	const handleOnRegistered = (wsData: TWSData) => {
		console.log(wsData.value)
		onSubmitCallback(true)
	}

	const handleOnRegisterFail = () => {
		onSubmitCallback(false)
	}

	return (
		<Modal isVisible={isVisible}>
			<SimpleWrapper center bottom>
				<Image src='https://toughbyte.s3.amazonaws.com/uploads/client/logo/40/pexip_logo.png' />
			</SimpleWrapper>

			<WebSocketForm
				wsType={TWSActionType.register}
				placeholder="John Doe"
				successCallback={handleOnRegistered}
				errorCallback={handleOnRegisterFail}
			/>
		</Modal>
	)
}
